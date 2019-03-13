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
const setPageTitle = title=>{
    Taro.setNavigationBarTitle({title});
}
export default Taro;
export { Component, connect, injectNavParams,setPageTitle };