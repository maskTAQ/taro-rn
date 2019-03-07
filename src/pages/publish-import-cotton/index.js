import React from 'react';
import { Component } from '../../platform';
import Main from './main';
import './component.scss'

export default class publishImportCotton extends Component {
  config = {
    navigationBarTitleText: '进口棉'
  }
  render() {
    return <Main />
  }
}

