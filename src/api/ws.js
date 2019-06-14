import { Tip } from '../utils';
import { MQTT, Public, clientId } from '../utils'
var Publisher = new Public();

let serverStatus = {
    connected: false,
    msg: '初始化'
};
const mpClientId = clientId;
//建立客户端实例  
const client = new MQTT.Client("s.chncot.com", 443, mpClientId);
function connect() {
    console.log('连接mqtt')
    serverStatus = {
        connected: false,
        msg: '连接中'
    };
    client.connect({
        useSSL: true,
        onSuccess() {
            const topic = mpClientId;//mpClientId
            serverStatus = {
                connected: true,
                msg: '连接成功'
            };
            console.log(`订阅:${topic}`);
            client.subscribe(topic);//订阅主题 
        },
        onFailure(e) {
            console.log(e, '连接失败');
            serverStatus = {
                connected: false,
                msg: '连接失败'
            };
        }
    });//连接服务器并注册连接成功处理事件 
}
connect();
client.onConnectionLost = onConnectionLost;//注册连接断开处理事件  
client.onMessageArrived = onMessageArrived;//注册消息接收处理事件  
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        serverStatus = {
            connected: false,
            msg: '连接断开'
        };
        connect();
    }
}
function onMessageArrived(message) {
    const data = JSON.parse(message.payloadString);
    console.log(data, '收到消息');
    const { action, messageId } = data;
    messageId && Publisher.emit(messageId, data)
}


export function send({ action, pcClientId = '', data }) {
    if (!serverStatus.connected) {
        Tip.fail(serverStatus.msg)
        return Promise.reject(serverStatus.msg);
    }
    let message;
    const messageId = Date.now();
    if (action === 'login') {

        const jsonstr = {
            action: "login",
            code: 200,
            msg: "小程序授权成功!",
            messageId,
            mpClientId,
            pcClientId,
            data: data
        }
        message = new MQTT.Message(JSON.stringify(jsonstr));
        const to = pcClientId;//pc
        console.log(`发送到：${to}`)
        message.destinationName = to;
    }
    if (action === 'verifyBatchNumber') {
        const { number, url, carry } = data;
        const jsonstr = {
            msg: "请求验证批号",
            action,
            messageId,
            clientId: mpClientId,
            data: {
                url,
                do: "QCDataAdd",
                number: number,
                device: 6,
                carry,
            },
        }
        console.log(jsonstr, '验证批号')
        message = new MQTT.Message(JSON.stringify(jsonstr));
        message.destinationName = "/topic/zmw/ccqsc/test/";
    }
    client.send(message);

    return new Promise((resolve, reject) => {
        Tip.loading(action === 'login' ? '登录中' : '验证中');
        let isCall = false;
        const callback = (data) => {
            isCall = true
            Tip.dismiss();
            const { code, msg } = data;
            Publisher.off(messageId, callback);
            if (code == 200) {
                resolve(data.data)
            }
            else {
                Tip.fail(msg)
                reject(msg);
            }

        };
        Publisher.on(messageId, callback);
        setTimeout(() => {
            if (!isCall) {
                Tip.dismiss();
                Tip.fail(action === 'login' ? '登录超时' : '批号验证超时,请重试')
                reject(action === 'login' ? '登录超时' : '批号验证超时,请重试');
            }
        }, 50000);
    })
}