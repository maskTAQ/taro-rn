import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class History extends Component {
  config = {
    navigationBarTitleText: '浏览历史'
  }
  render() {
    return <Main />
  }
}

