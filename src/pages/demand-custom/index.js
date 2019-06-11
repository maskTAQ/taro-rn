import React from 'react';
import { Component ,injectNavParams} from '../../platform';
import Main from './main';
import './component.scss'

export default class DemandCustom extends Component {
  config = {
    navigationBarTitleText: '我要定制'
  }
  render() {
    const navigation = injectNavParams(this.$router);
    return <Main navigation={navigation}/>
  }
}

