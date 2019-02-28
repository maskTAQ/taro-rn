import React from 'react';
import { Component } from '../../platform';


import Main from './main';
import './component.scss'


export default class Home extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  render() {
    return <Main />
  }
}

