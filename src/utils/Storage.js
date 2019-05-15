import Taro, { Component } from '@tarojs/taro'

/**
 * 系统本地存储
 */
const Storage = {
    /**
     * 从本地存储获取
     * @param key
     * @param async, default true
     * @returns {Promise.<*>}
     */
    async get(key, async = true) {
        return new Promise((resolve, reject) => {
            Taro.getStorage({
                key,
                success(res) {
                    resolve(res.data)
                },
                fail(e) {
                    const { errMsg } = e;
                    if (errMsg.includes('fail data not found')) {
                        resolve('');
                    } else {
                        reject(e);
                    }
                }
            })
        })
    },
    /**
     * 设置到本地存储
     * @param key
     * @param value 只能是String
     * @returns {Promise.<*>}
     */
    set(key, data) {
        return new Promise((resolve, reject) => {
            Taro.setStorage({
                key,
                data,
                success(res) {
                    const { errMsg } = res;
                    if (errMsg.includes('ok')) {
                        resolve(res);
                    } else {
                        reject(res);
                    }

                },
                fail(e) {
                    reject(e)
                }
            })
        })
    },
    setJson(key, data) {
        return new Promise((resolve, reject) => {
            Taro.setStorage({
                key,
                data: JSON.stringify(data),
                success(res) {
                    const { errMsg } = res;
                    if (errMsg.includes('ok')) {
                        resolve(res);
                    } else {
                        reject(res);
                    }

                },
                fail(e) {
                    reject(e)
                }
            })
        })
    },
    /**
     * 从本地存储删除
     * @param key
     */
    remove(key) {
        return Taro.removeStorageSync(key);
    },

};

export default Storage;
