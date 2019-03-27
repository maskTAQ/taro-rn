import Taro from '@tarojs/taro';
import { Tip } from '../utils';
import { MQTT, Public, clientId } from '../utils'


var Publisher = new Public();

let serverStatus = {
    connected: false,
    msg: '初始化'
};
const mpClientId = clientId;
//建立客户端实例  
const client = new MQTT.Client("skybcc.com", 8084, mpClientId);
client.connect({
    onSuccess() {
        serverStatus = {
            connected: true,
            msg: '连接成功'
        };
        client.subscribe(mpClientId);//订阅主题 
    }
});//连接服务器并注册连接成功处理事件  

client.onConnectionLost = onConnectionLost;//注册连接断开处理事件  
client.onMessageArrived = onMessageArrived;//注册消息接收处理事件  
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        serverStatus = {
            connected: false,
            msg: '连接断开'
        };
    }
}
function onMessageArrived(message) {
    const data = JSON.parse(message.payloadString);
    const { action, messageId } = data;
    console.log("收到服务器消息:", data);
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
        message.destinationName = pcClientId;
    }
    if (action === 'verifyBatchNumber') {
        const { number, userId } = data;
        const jsonstr = {
            msg: "请求验证批号",
            action,
            messageId,
            clientId: mpClientId,
            data: {
                url: "https://s.chncot.com/app/index.php?i=6&t=0&v=9.4&from=wxapp&m=zh_dianc&sign=8fe61a41cf15856e716943ef239ca1f2&c=entry&a=wxapp&do=",
                do: "QCDataAdd",
                number: number,
                device: 6,
                carry: { userId, time: Date.now() },
            },
        };
        message = new MQTT.Message(JSON.stringify(jsonstr));
        message.destinationName = "/topic/zmw/ccqsc/test/";
    }
    client.send(message);

    return new Promise((resolve, reject) => {
        Taro.showLoading({ title: action === 'login' ? '登录中' : '验证中' });
        let isCall = false
        Publisher.on(messageId, (data) => {
            isCall = true
            Taro.hideLoading();
            const { code, msg } = data;
            Publisher.off(messageId);
            if (code == 200) {
                resolve(data.data)
            }
            else {
                Tip.fail(msg)
                reject(msg);
            }

        });

        setTimeout(() => {
            if (!isCall) {
                Taro.hideLoading();
                Tip.fail(action === 'login' ? '登录超时' : '批号验证超时,请重试')
                reject(action === 'login' ? '登录超时' : '批号验证超时,请重试');
            }
        }, 5000);
    })
}