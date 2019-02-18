import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class QuotationList extends Component {
  config = {
    navigationBarTitleText: 'xxx批号|报价单'
  }
  render() {
    return <Main />
  }
}

