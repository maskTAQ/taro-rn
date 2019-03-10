import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';

const injectNavParams = data => {
    //navigation.state.params
    return {
        state: {
            params: data.params
        }
    }
}
export default Taro;
export { Component, connect, injectNavParams };