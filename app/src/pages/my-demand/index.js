import React, { Component, PureComponent } from 'react';

import { View, ScrollView } from '../../components';
import Item from './item';
import indexStyleSheet from "./index_styles";

var _styleSheet = indexStyleSheet;
const item = {
  id: '562781322',

  ysj: '21+',
  cd: '12',
  ql: 21.2,
  mz: 1,
  cz: '0.0',
  hc: '0.0',
  hz: '0.0',
  jg: '<15003',

  shd: '盐城',
  mj: '盐城捷多纺织品有限公司',
  zwjhsj: '2019-01-01',
  cgjs: '200d吨',

  sl: '12',
  ztj: '1231',
  dcj: '1331',

  xqbh: '12132987130'
};

export default class MyDemand extends PureComponent {
  state = {
    activeKey: 'offer',
    list: [item, item, item, item, item],
    itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hz', 'jg'],
    offerItemKeyList: ['sl', 'ztj', 'dcj'],
    itemDescList: ['mj', 'cgjs', 'shd', 'zwjhsj'],
    offerItemDescList: ['xqbh', 'mj']
  }

  render() {
    const { list, itemDescList, itemKeyList } = this.state;
    return (
      <View style={_styleSheet["container"]}>
        <ScrollView>
          {list.map((item, index) => {
            return <Item item={item} index={index} itemDescList={itemDescList} itemKeyList={itemKeyList} />;
          })}
        </ScrollView>
      </View>
    )
  }
}