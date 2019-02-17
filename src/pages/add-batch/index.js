import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class AddBatch extends Component {
  config = {
    navigationBarTitleText: '增加批次信息'
  }
  render() {
    return <Main />
  }
}

