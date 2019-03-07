import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class QuotationList extends Component {
  config = {
    navigationBarTitleText: 'xxx批号|报价单'
  }
  render() {
    return <Main />
  }
}

