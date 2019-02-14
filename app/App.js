/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  BackHandler,
  View,
  Text,
  ToastAndroid,
  Platform,
  Vibration
} from "react-native";
import { Provider, connect } from "react-redux";
import { Page } from "components";
import { reduxifyNavigator } from "react-navigation-redux-helpers";

import { iconSource } from 'commons';
import { Tip } from 'components';
import store from 'store/index'
//import { back, login, navigate } from "actions";
import { serviceStatusMap } from 'src/config';
import { get } from 'apis/base';
//import Loading from "./loading";
import Router from "./src/Router";


//注册页面返回句柄
//Page.registerReturnEventlistener(back);
Page.setLeftIconSource(iconSource.left);
//将state.nav注入路由
const Navigation = reduxifyNavigator(Router, "root");
const mapStateToProps = ({ nav }) => ({ state: nav });
const AppWithNavigationState = connect(mapStateToProps)(Navigation);


/* eslint-disable */
if (!__DEV__) {
  global.console = {
    info: () => { },
    log: () => { },
    warn: () => { },
    debug: () => { },
    error: () => { }
  };
}

export default class App extends Component {
  state = {
    statusBallVisible: false,
    statusHintVisible: false,
    serviceStatus: 'connecting',
    notif: {
      visible: false,
      date: null,
      data: null
    },

  };
  UNSAFE_componentWillMount() {
    // store.runSaga(sage);
    // store.subscribe(() => {
    //   const { nav: { index, routes = [] }, data: { serviceStatus } = {}, data } = store.getState();
    //   let statusBallVisible = true;
    //   if (routes[index] && routes[index].routeName === 'Login') {
    //     statusBallVisible = false;
    //   }
    //   if (statusBallVisible !== this.state.statusBallVisible) {
    //     this.setState({
    //       statusBallVisible
    //     });
    //   }
    //   if (serviceStatus !== this.state.serviceStatus && serviceStatus) {
    //     this.setState({
    //       serviceStatus
    //     });
    //   }
    // });
    //监听工单推送
    //ws.addListener(this.handleReceiveOrder);
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", this.handleBack);
    }

  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.handleBack);
    }
  }


  handleAppStateChange = nextAppState => {
    switch (nextAppState) {
      case "active":
        console.log("app state will be active");
        break;
      case "inactive":
        console.log("app state will be inactive");
        break;
      case "background":
        console.log("app state will be background");
        break;
      default:
        break;
    }
  };

  lastBack = null;

  handleBack = () => {
    const { nav } = store.getState();
    const routeName = nav.routes[nav.index].routeName;
    if (["TabNavigator", 'Login'].includes(routeName)) {
      if (this.lastBack && new Date().getTime() - this.lastBack < 2000) {
        BackHandler.exitApp();
      } else {
        this.lastBack = new Date().getTime();
        ToastAndroid.show("再按一次返回键退出程序", 2000);
      }
      return true;
    }
    if (nav.routes.length > 1) {
      //back();
      return true;
    }
    return false;
  };

  render() {
    return (
      <Provider store={store}>
        
          <View style={{ flex: 1 }}>
            <AppWithNavigationState />
            <Tip />
          </View>
        
      </Provider>
    );
  }
}
