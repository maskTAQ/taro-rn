
import Taro from '@tarojs/taro';
import { getOpenId, login } from '../api';
import asyncActionWrapper from './asyncActionWrapper';
const tabPages = ['home', 'demand', 'offer-tool', 'shopping-car', 'user'];
const paramsToUrl = params => {
    let u = [];
    for (const key in params) {
        u.push(`${key}=${params[key]}`)
    }
    if (u.length) {
        return '?' + u.join('&')
    } else {
        return '';
    }
}
const stringify = d => {
    const result = {};
    for (const key in d) {
        try {
            result[key] = JSON.stringify(d[key]);
        } catch (e) {
            result[key] = d[key];
        }
    }
    return result;
}
const navigate = ({ routeName, params }) => {
    if (tabPages.includes(routeName)) {
        Taro.switchTab({
            url: `/pages/${routeName}/index` + paramsToUrl(stringify(params))
        });
    } else {
        Taro.navigateTo({
            url: `/pages/${routeName}/index` + paramsToUrl(stringify(params))
        });
    }
};
const call = (phoneNumber) => {
    Taro.makePhoneCall({ phoneNumber })
}
const back = Taro.navigateBack;
const loginAction = () => {
    Taro.login()
        .then(getOpenId)
        .then(res => {
            const { openid, code } = res;
            asyncActionWrapper({
                call: login,
                params: {
                    i: 6,
                    t: 0,
                    //from:'wxapp',
                    m: 'zh_dianc',
                    sign: code,
                    openid
                },
                type: 'data',
                key: 'user'
            });
        })
        .catch(e => {
            console.log(e, 'login e')
        })
}
export {
    navigate, call, loginAction as login, asyncActionWrapper,back
}