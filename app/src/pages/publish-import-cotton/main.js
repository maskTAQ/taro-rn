import React from 'react';


import { Component } from "react";
import { View, ScrollView, TTabs, TTabPane } from '../../components';

import Content from './content';
import mainStyleSheet from "./main_styles";

var _styleSheet = mainStyleSheet;
let publishImportCotton = class publishImportCotton extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      current: 0
    }, this.handleClick = current => {
      this.setState({
        current
      });
    }, _temp;
  }

  render() {
    const { current } = this.state;
    const tabList = ["人民币", "美元"];
    return <View style={_styleSheet["container"]}>
      
        <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
          {tabList.map((item, index) => {
            return <TTabPane tabLabel={item} current={current} index={index}>
              <ScrollView>
                <Content current={current} />
              </ScrollView>
            </TTabPane>;
          })}
        </TTabs>
      

    </View>;
  }
};
export { publishImportCotton as default };