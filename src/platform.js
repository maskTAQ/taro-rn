import Taro, { Component, getLaunchOptionsSync } from '@tarojs/taro';
import { connect } from '@tarojs/redux';

const parse = d => {
    const result = {};
    for (const key in d) {
        try {
            result[key] = JSON.parse(d[key]);
        } catch (e) {
            result[key] = d[key];
        }
    }
    return result;
}
const injectNavParams = data => {
    return {
        state: {
            params: parse(data.params)
        }
    }
}
const setPageTitle = title => {
    Taro.setNavigationBarTitle({ title });
}
const getSystemInfo = () => {
    return Taro.getSystemInfo();
}
export default Taro;
export { Component, connect, injectNavParams, setPageTitle, getSystemInfo, getLaunchOptionsSync };