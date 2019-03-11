import Taro from '@tarojs/taro';
import successIcon from './img/success.png';
import errorIcon from './img/error.png';
export default {
    success(message) {
        Taro.showToast({
            title: message,
            image: successIcon
        });
    },
    fail(message) {
        Taro.showToast({
            title: message,
            image: errorIcon
        });
    }
}