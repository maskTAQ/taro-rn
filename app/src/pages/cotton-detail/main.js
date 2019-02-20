
import React from 'react';
import { Component } from 'react';
import classnames from 'classnames';

import { View, TButton, Text, TTabs, Image, TTabPane, ScrollView, FixedTool } from '../../components';

import Item from './item';
import Card from './card';
import mainStyleSheet from "./main_styles";
import mobileImg from './img/mobile.png';
import scImg from './img/sc.png';

var _styleSheet = mainStyleSheet;

function _getClassName() {
  var className = [];
  var args = arguments[0];
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase();

  if (type === 'string') {
    args = args.trim();
    args && className.push(args);
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim();
      cls && className.push(cls);
    });
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim();

      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k);
      }
    }
  }

  return className.join(' ').trim();
}

function _getStyle(classNameExpression) {
  var className = _getClassName(classNameExpression);

  var classNameArr = className.split(/\s+/);
  var style = [];

  if (classNameArr.length === 1) {
    style.push(_styleSheet[classNameArr[0].trim()]);
  } else {
    classNameArr.forEach(function (cls) {
      style.push(_styleSheet[cls.trim()]);
    });
  }

  return style;
}

const data = {
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

  xqbh: '12132987130',

  jc: '+120',
  'y/d': '15720',
  gz: '45.455',

  zhc: "巴州亿成棉业有限公司",
  ck: '中储棉库存厄尔有限责任公司',
  gys: '河北星宇纺织原料有限责任公司'
};

let CottonDetail = class CottonDetail extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
      offerItemKeyList: ['sl', 'ztj', 'dcj'],
      itemDescList: ['zhc', 'ck', 'gys'],
      current: 0
    }, this.handleClick = current => {
      this.setState({
        current
      });
    }, _temp;
  }

  componentDidShow() {
    Taro.setNavigationBarTitle({ title: "218937123|详情" });
  }

  componentDidHide() {}

  baojia() {
    console.log('报价');
  }
  render() {
    const { itemDescList, itemKeyList, current } = this.state;
    const tabList = ["现货指标", "仓单证书"];
    return <View style={_styleSheet["container"]}>
                <ScrollView>
                    <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
                        {tabList.map((item, index) => {
            return <TTabPane key={item} tabLabel={item} current={current} index={index}>
                                        <View style={_styleSheet["a"]}>
                                            <Item item={data} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                                            <Card />
                                            <View style={_getStyle(classnames('link-btn-group'))}>
                                                <TButton onClick={() => this.handleEdit(item)}>
                                                    <View style={_styleSheet["link-button"]}>
                                                        <Text style={_styleSheet["link-button-text"]}>点击查看186包棉包详情</Text>
                                                    </View>
                                                </TButton>
                                                <TButton onClick={() => this.handleDelete(item)}>
                                                    <View style={_styleSheet["link-button"]}>
                                                        <Text style={_styleSheet["link-button-text"]}>点击查看完整现货指标</Text>
                                                    </View>
                                                </TButton>
                                            </View>
                                            <View style={_getStyle(classnames('btn-group', 'margin'))}>
                                                <TButton onClick={() => this.handleEdit(item)}>
                                                    <View style={_styleSheet["btn"]}>
                                                        <Image src={scImg} style={_styleSheet["btn-icon"]}></Image>
                                                        <Text style={_styleSheet["btn-text"]}>收藏</Text>
                                                    </View>
                                                </TButton>
                                                <TButton onClick={() => this.handleDelete(item)}>
                                                    <View style={_styleSheet["btn"]}>
                                                        <Image src={mobileImg} style={_styleSheet["btn-icon"]}></Image>
                                                        <Text style={_styleSheet["btn-text"]}>联系供应商</Text>
                                                    </View>
                                                </TButton>
                                            </View>
                                        </View>
                                    </TTabPane>;
          })}
                    </TTabs>
                </ScrollView>
                <FixedTool />
            </View>;
  }
};
export { CottonDetail as default };