import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class Recommend extends Component {
  config = {
    navigationBarTitleText: '推荐二维码'
  }
  render() {
    return <Main />
  }
}

