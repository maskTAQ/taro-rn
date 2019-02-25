var _class, _temp;

import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import indexStyleSheet from "./index_styles";

var _styleSheet = indexStyleSheet;
let Home = (_temp = _class = class Home extends Component {
  render() {
    return <Main />;
  }
}, _class.config = {
  navigationBarTitleText: '首页'
}, _temp);
export { Home as default };