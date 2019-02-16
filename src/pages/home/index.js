import { Component } from '@tarojs/taro'
import Main from './main';
import './index.scss'

export default class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  render() {
    return <Main />
  }
}
