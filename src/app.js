import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'


import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/quotation-list/index',
      'pages/map-detail/index',      
      'pages/cotton-detail/index',
      'pages/package-detail/index',
      'pages/cotton-information/index',
      'pages/add-batch/index',
      'pages/publish-import-cotton/index',      
      'pages/notice-details/index',
      'pages/share/index',
      'pages/user/index',
      'pages/home/index',
      'pages/my-demand/index',
      'pages/offer-hint/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "usingComponents": {
      // "t-tag": "components/t-tag/index",
      // "t-button": "components/t-button/index",
      // "t-tabs": "components/t-tabs/index",
      // "t-tab-pane": "components/t-tab-pane/index"
    },
    permission:{
      "scope.userLocation":{
        "desc":"asdad"
      }
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
