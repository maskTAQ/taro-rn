
import Taro from '@tarojs/taro';
const tabPages = ['home', 'demand', 'offer-tool', 'shopping-car', 'user'];
const navigate = ({ routeName, params }) => {
    if (tabPages.includes(routeName)) {
        Taro.switchTab({
            url: `/pages/${routeName}/index`
        });
    } else {
        Taro.navigateTo({
            url: `/pages/${routeName}/index`
        });
    }
};
const call = (phoneNumber) => {
    Taro.makePhoneCall({ phoneNumber })
}
export {
    navigate, call
}