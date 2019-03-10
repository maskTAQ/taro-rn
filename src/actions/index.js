
import Taro from '@tarojs/taro';
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
const navigate = ({ routeName, params }) => {
    if (tabPages.includes(routeName)) {
        Taro.switchTab({
            url: `/pages/${routeName}/index` + paramsToUrl(params)
        });
    } else {
        console.log(`/pages/${routeName}/index` + paramsToUrl(params))
        Taro.navigateTo({
            url: `/pages/${routeName}/index` + paramsToUrl(params)
        });
    }
};
const call = (phoneNumber) => {
    Taro.makePhoneCall({ phoneNumber })
}
export { default as asyncActionWrapper } from './asyncActionWrapper';
export {
    navigate, call
}