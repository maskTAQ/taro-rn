import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class User extends Component {
  config = {
    navigationBarTitleText: '个人'
  }
  render() {
    return <Main />
  }
}

