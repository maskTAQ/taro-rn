import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class Demand extends Component {
  config = {
    navigationBarTitleText: '需求'
  }
  render() {
    return <Main />
  }
}

