import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class ShoppingCart extends Component {
  config = {
    navigationBarTitleText: '购物车'
  }
  render() {
    return <Main />
  }
}

