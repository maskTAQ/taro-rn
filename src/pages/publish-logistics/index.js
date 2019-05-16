import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class PublishLogistics extends Component {
  config = {
    navigationBarTitleText: '发布物流信息'
  }
  render() {
    return <Main />
  }
}

