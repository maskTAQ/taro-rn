import React from 'react';
import { Component } from '../../platform';


import Main from './main';
import './component.scss'


export default class User extends Component {
  config = {
    navigationBarTitleText: '个人'
  }
  render() {
    console.log(this.props);
    return <Main />
  }
}

