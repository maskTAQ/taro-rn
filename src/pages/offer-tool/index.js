import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class OfferTool extends Component {
  config = {
    navigationBarTitleText: '选择发布'
  }
  render() {
    return <Main />
  }
}

