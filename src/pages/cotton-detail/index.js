import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class CottonDetail extends Component {
  config = {
    navigationBarTitleText: 'xx|详情'
  }
  render() {
    return <Main />
  }
}

