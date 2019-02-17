import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class NoticeDetails extends Component {
  config = {
    navigationBarTitleText: '棉讯详情'
  }
  render() {
    return <Main />
  }
}

