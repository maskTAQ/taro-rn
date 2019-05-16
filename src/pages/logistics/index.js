import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class Logistics extends Component {
  config = {
    navigationBarTitleText: '中棉物流'
  }
  render() {
    return <Main />
  }
}

