import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class MyDemand extends Component {
  config = {
    navigationBarTitleText: '我的供需1'
  }
  render() {
    return <Main />
  }
}

