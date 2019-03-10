import Taro  from '@tarojs/taro';

const host = 'https://s.chncot.com/app/index.php';
const commonParmas = {
    c: 'entry',
    a: 'wxapp',
    i:6,
    t:0,
    //from:'wxapp',
    m:'zh_dianc',
    sign:'0a382e9b7fa70f12a3301fa1ceb39ea0',
    openid:'oc7pZ5K0I9Ild3lh6Zjj1Zu4TFec'
};
const request = (url, data, { type, config: { loading } = { loading: true } }) => {
    loading && Taro.showLoading();
    return new Promise((resolve, reject) => {
        Taro.request({
            url: host,
            method: type,
            data: Object.assign({ do: url }, commonParmas, data),
            success(d) {
                Taro.hideLoading();
                const {code,data,msg} = d.data;
                if(code === 200){
                    resolve(data);
                }else{
                    reject(msg);
                }
               
            },
            fail(e) {
                Taro.hideLoading();
                reject(e);
            }
        });
    })
}
const post = (url, data={}) => {
    return request(url, data, { type: 'POST', });
}
const get = (url, data={}) => {
    return request(url, data, { type: 'GET', });
}
export {
    post, get
}