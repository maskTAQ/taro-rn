import Taro from '@tarojs/taro';
import successIcon from './img/success.png';
import errorIcon from './img/error.png';

//调用loading次数
let callNumber = 0;
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
    },
    loading(message = '') {
        callNumber++;
        Taro.showLoading({
            title: message
        });
    },
    dismiss() {
        callNumber--;
        if (callNumber === 0) {
            Taro.hideLoading();
        }
    },
    reset(){
        callNumber = 0;
        Taro.hideLoading();
    }
}