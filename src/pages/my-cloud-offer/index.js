import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class MyCloudOffer extends Component {
  config = {
    navigationBarTitleText: '我的云报价'
  }
  render() {
    return <Main />
  }
}

