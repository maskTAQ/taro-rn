import React from './node_modules/react';
import { Component,injectNavParams } from '../../platform';
import Main from './main';
import './component.scss'

export default class EditLogistics extends Component {
  config = {
    navigationBarTitleText: '编辑物流信息'
  }
  render() {
    const navigation = injectNavParams(this.$router);
    return <Main navigation={navigation}/>
  }
}

