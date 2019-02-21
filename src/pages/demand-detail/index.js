import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class DemandDetail extends Component {
  config = {
    navigationBarTitleText: '需求详情'
  }
  render() {
    return <Main />
  }
}

