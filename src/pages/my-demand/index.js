import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class MyDemand extends Component {
  config = {
    navigationBarTitleText: '我的报价'
  }
  render() {
    return <Main />
  }
}

