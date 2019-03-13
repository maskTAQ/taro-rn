import React from 'react';
import { Component, injectNavParams } from '../../platform';

import Main from './main';
import './component.scss'
export default class CottonDetail extends Component {
  config = {
    navigationBarTitleText: '|详情'
  }
  render() {
    const navigation = injectNavParams(this.$router);
    return <Main navigation={navigation} />
  }
}

