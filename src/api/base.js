import Taro from '@tarojs/taro';
import { Tip } from '../utils';
const host = 'https://s.chncot.com/app/index.php';
const commonParmas = {
    c: 'entry',
    a: 'wxapp',
    i: 6,
    t: 0,
    //from:'wxapp',
    m: 'zh_dianc',
    sign: '0a382e9b7fa70f12a3301fa1ceb39ea0',
    openid: 'oc7pZ5K0I9Ild3lh6Zjj1Zu4TFec',
    device: '3',
    appname: 'zmw'
};
const parseErrMsg = (e = '') => {
    // if (e.includes('fail')) {
    //     return String(e);
    // } else {
    //     return e;
    // }
    return e;
}
const request = (url, data, { type, config: { loading } = { loading: true } }) => {
    loading && Tip.loading();
    return new Promise((resolve, reject) => {
        Taro.request({
            url: host,
            method: type,
            data: Object.assign({ do: url }, commonParmas, data),
            success(d) {
                loading && Tip.dismiss();
                if (d.errMsg.includes('ok')) {
                    if (['openid', 'Login'].includes(url)) {
                        resolve(Object.assign({}, d.data, data));
                    } else {
                        const { code, data, msg } = d.data;
                        if (code === 200) {
                            resolve(data);
                        } else {
                            Tip.fail(parseErrMsg(msg));
                            reject(d);
                        }
                    }


                } else {
                    Tip.fail(parseErrMsg(d.errMsg));
                    reject(d);
                }
            },
            fail(e) {
                console.log(e, 'e');
                loading && Tip.dismiss();
                Tip.fail(parseErrMsg(e.errMsg));
                reject(e);
            }
        });
    })
}
const post = (url, data = {}, config) => {
    return request(url, data, { type: 'POST', config });
}
const get = (url, data = {}, config) => {
    return request(url, data, { type: 'GET', config });
}
const file = (url, data, config = { loading: true }) => {
    return new Promise((resolve, reject) => {
        Taro.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (o) {
                var e = o.tempFilePaths;
                Taro.showLoading();
                wx.uploadFile({
                    url: `${host}?i=6&c=entry&a=wxapp&do=${url}&m=zh_dianc`,
                    filePath: o.tempFilePaths[0],
                    name: "upfile",
                    success: function (o) {
                        loading && Tip.dismiss();
                        resolve(o);

                    },
                    fail: function (o) {

                        Tip.fail(e.errMsg + '文件上传错');
                        reject(e);
                    },
                    complete: function () {
                        // Taro.hideLoading();
                    }
                });
            }
        })
    })
}
export {
    post, get, file
}