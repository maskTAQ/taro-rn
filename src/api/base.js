import Taro, { Component } from '@tarojs/taro';

const host = 'https://s.chncot.com/app/index.php';
const splitPath = (p) => {
    const [c, a, doP] = p.split('/');
    return { c, a, do: doP };
}
const request = (url, data, { type, config: { loading } = { loading: true } }) => {
    loading && Taro.showLoading();
    return new Promise((resolve, reject) => {
        Taro.request({
            url: host,
            method: type,
            data: Object.assign(splitPath(url), data),
            success(d) {
                Taro.hideLoading();
                resolve(d.data);
            },
            fail(e) {
                Taro.hideLoading();
                reject(e);
            }
        });
    })
}
const post = (url, data) => {
    return request(url, data, { type: 'POST', });
}
const get = (url, data) => {
    return request(url, data, { type: 'GET', });
}
export {
    post, get
}