import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class Share extends Component {
  config = {
    navigationBarTitleText: '中棉网|资源分享'
  }
  render() {
    return <Main />
  }
}

