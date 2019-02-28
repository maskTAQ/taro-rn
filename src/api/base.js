import Taro, { Component } from '@tarojs/taro';

const request = ({ url, type, data, config: { loading } = { loading: true } }) => {
    loading && Taro.showLoading();
    return new Promise((resolve, reject) => {
        Taro.request({
            url,
            method: type,
            data,
            success(d) {
                Taro.hideLoading();
                resolve(d);
            },
            fail(e) {
                Taro.hideLoading();
                reject(e);
            }
        });
    })
}
const post = (params) => {
    return request({ type: 'POST', ...params });
}
const get = (params) => {
    return request({ type: 'GET', ...params });
}
export {
    post, get
}