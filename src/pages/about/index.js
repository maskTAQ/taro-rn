import React from 'react';
import { Component } from '../../platform';


import Main from './main';
import './component.scss'


export default class About extends Component {
  config = {
    navigationBarTitleText: '关于我们'
  }
  render() {
    return <Main />
  }
}

