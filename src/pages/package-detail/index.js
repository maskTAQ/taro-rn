import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class PackageDetail extends Component {
  config = {
    navigationBarTitleText: '包详情'
  }
  render() {
    return <Main />
  }
}

