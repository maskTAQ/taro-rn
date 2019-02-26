import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import configStore from './store'
import homeImg from './tab-img/home.png';
// import homeActiveImg from './tab-img/home-active.png';
// import demandImg from './tab-img/demand.png';
// import demandActiveImg from './tab-img/demand-active.png';
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
      
      'pages/user/index',
      'pages/home/index',
      'pages/offer-tool/index',
      'pages/shopping-car/index',
      'pages/demand-custom/index',
      'pages/demand-detail/index',
      'pages/demand/index',
      'pages/map-detail/index',
      'pages/cotton-detail/index',
      'pages/quotation-list/index',
      'pages/package-detail/index',
      'pages/cotton-information/index',
      'pages/add-batch/index',
      'pages/publish-import-cotton/index',
      'pages/notice-details/index',
      'pages/share/index',
      'pages/my-demand/index',
      'pages/offer-hint/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "color": "#000000",
      "selectedColor": "#44bdf7",
      "backgroundColor": "#fff",
      "list": [
        {
          "pagePath": "pages/home/index",
          "text": "首页",
          "iconPath": './tab-img/home.png',
          "selectedIconPath": './tab-img/home-active.png',
        },

        {
          "pagePath": "pages/demand/index",
          "text": "供需",
          "iconPath": './tab-img/demand.png',
          "selectedIconPath": './tab-img/demand-active.png',
        },
        {
          "pagePath": "pages/offer-tool/index",
          "text": "云报价工具",
          "iconPath": './tab-img/ybj.png',
          "selectedIconPath": './tab-img/ybj-active.png',
        },
        {
          "pagePath": "pages/shopping-car/index",
          "text": "购物车",
          "iconPath": './tab-img/gwc.png',
          "selectedIconPath": './tab-img/gwc-active.png',
        },
        {
          "pagePath": 'pages/user/index',
          "text": "个人",
          "iconPath": './tab-img/user.png',
          "selectedIconPath": './tab-img/user-active.png',
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": "asdad"
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
