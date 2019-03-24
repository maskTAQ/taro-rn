import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import { login } from './actions';
import Index from './pages/index'
import store from './store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {
  config = {
    pages: [
      
     
      'pages/home/index',
      'pages/demand/index',
      'pages/user/index',
      'pages/auth/index',
      'pages/shopping-car/index',

      'pages/my-cloud-offer/index',
      'pages/cotton-detail/index',


      'pages/offer-tool/index',
      'pages/demand-custom/index',

      'pages/share/index',
      'pages/quotation-list/index',
      'pages/publish-import-cotton/index',
      'pages/package-detail/index',

      'pages/offer-hint/index',
      'pages/notice-details/index',
      'pages/my-demand/index',
      'pages/map-detail/index',
      'pages/demand-detail/index',


      'pages/cotton-information/index',

      'pages/add-batch/index',

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
          "text": "棉花资源",
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
  componentWillMount() {
    login();
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
