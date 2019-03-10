import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
class ComponentWraper extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        //super.componentDidShow();
    }

}
export default Taro;
export { Component, connect };