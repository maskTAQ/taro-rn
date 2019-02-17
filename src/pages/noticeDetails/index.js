import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class noticeDetails extends Component {
  config = {
    navigationBarTitleText: '棉讯详情'
  }
  render() {
    return <Main />
  }
}

