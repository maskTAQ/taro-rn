import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class MapDetail extends Component {
  config = {
    navigationBarTitleText: '机构详情页面分享'
  }
  render() {
    return <Main />
  }
}

