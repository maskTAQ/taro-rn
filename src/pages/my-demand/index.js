import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class MyDemand extends Component {
  config = {
    navigationBarTitleText: '我的供需'
  }
  render() {
    return <Main />
  }
}

