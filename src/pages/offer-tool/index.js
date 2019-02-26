import React from 'react';
import { Component } from '../../platform';

import Main from './main';
import './component.scss'

export default class OfferTool extends Component {
  config = {
    navigationBarTitleText: '选择发布'
  }
  render() {
    return <Main />
  }
}

