import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class CottonInformation extends Component {
  config = {
    navigationBarTitleText: '棉讯'
  }
  render() {
    return <Main />
  }
}

