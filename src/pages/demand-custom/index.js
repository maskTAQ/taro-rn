import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class DemandCustom extends Component {
  config = {
    navigationBarTitleText: '我要定制'
  }
  render() {
    return <Main />
  }
}
