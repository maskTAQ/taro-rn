import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class STS extends Component {
  config = {
    navigationBarTitleText: '升贴水'
  }
  render() {
    return <Main />
  }
}

