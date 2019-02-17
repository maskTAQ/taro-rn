import { Component } from '@tarojs/taro'
import Main from './main';
import './component.scss'

export default class publishImportCotton extends Component {
  config = {
    navigationBarTitleText: '进口棉'
  }
  render() {
    return <Main />
  }
}

