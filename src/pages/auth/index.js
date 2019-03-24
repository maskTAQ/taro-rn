import React from 'react';
import { Component } from '../../platform';


import Main from './main';
import './component.scss'


export default class Auth extends Component {
  config = {
    navigationBarTitleText: '企业认证'
  }
  render() {
    return <Main />
  }
}

