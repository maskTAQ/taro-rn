import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class Feedback extends Component {
  config = {
    navigationBarTitleText: '意见反馈'
  }
  render() {
    return <Main />
  }
}

