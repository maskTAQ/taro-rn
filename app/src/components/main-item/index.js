var _class, _temp2;

import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';

import { View, Text, Image, TButton } from '../index';
import { navigate, call } from '../../actions';
import config from '../../config';
import indexStyleSheet from "./index_styles";
import callImg from './img/call.png';
import carImg from './img/car.png';
var _styleSheet = indexStyleSheet;

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

const map = config.map.main;

const data = {
  id: '562781322',
  dj: '21',
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

  ph: "454212552",
  ck: '中储棉库存厄尔',
  mj: '河北星宇纺织原料'
};
let MainItem = (_temp2 = _class = class MainItem extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      itemValueList: ['jc', 'y/d', 'gz']
    }, _temp;
  }

  handleDelete() {
    console.log('点击删除');
  }
  call(mobile) {
    call(mobile);
  }
  goShoppingCart(params) {
    console.log('点击购物车');
    navigate({
      routeName: 'shopping-car',
      params
    });
  }
  render() {
    const list = ["dj", "cd", "ql", "mz", "cz", "hz", 'cz'];
    const { border = true } = this.props;
    return <View style={_getStyle(classnames("container", { border: border }))}>
                <View style={_styleSheet["content"]}>
                    <View style={_styleSheet["top"]}>
                        <View style={_styleSheet["top-left"]}>
                            <Text style={_styleSheet["title"]}>批号(23131298) 北疆伊犁 机采棉</Text>
                        </View>
                        <View style={_styleSheet["top-right"]}>
                            <Text style={_styleSheet["time"]}>编号(31212) 19/01/12</Text>
                        </View>
                    </View>
                    <View style={_styleSheet["center"]}>
                        <View style={_styleSheet["center-left"]}>
                            {list.map(item => {
              return <View style={_styleSheet["item"]}>
                                            <Text style={_styleSheet["item-label"]}>{map[item]}</Text>
                                            <Text style={_styleSheet["item-value"]}>{data[item]}</Text>
                                        </View>;
            })}
                        </View>
                        <View style={_styleSheet["center-right"]}>
                            <TButton>
                                <View style={[_styleSheet["tag"], _styleSheet["xh"]]}>
                                    <Text style={_styleSheet["tag-text"]}>现货</Text>
                                </View>
                            </TButton>
                            <TButton>
                                <View style={[_styleSheet["tag"], _styleSheet["cd"]]}>
                                    <Text style={_styleSheet["tag-text"]}>仓单</Text>
                                </View>
                            </TButton>
                        </View>
                    </View>

                    <View style={_styleSheet["bottom"]}>
                        <View style={_styleSheet["bottom-left"]}>
                            <View style={_styleSheet["bottom-text-box"]}>
                                <Text style={_styleSheet["bottom-text"]}>仓库:{data.ck}</Text>
                            </View>
                            <View style={_styleSheet["bottom-text-box"]}>
                                <Text style={_styleSheet["bottom-text"]}>郑棉1905(15400)</Text>
                            </View>
                            <View style={_styleSheet["bottom-text-box"]}>
                                <Text style={_styleSheet["bottom-text"]}>基  差:(+500)</Text>
                            </View>
                        </View>
                        <View style={_styleSheet["bottom-right"]}>
                            <View style={_styleSheet["bottom-text-box"]}>
                                <Text style={_styleSheet["bottom-text"]}>卖家:{data.mj}</Text>
                            </View>
                            <View style={_styleSheet["bottom-right-bottom"]}>
                                <View style={_styleSheet["bottom-right-bottom-left"]}>
                                    <Text style={_styleSheet["price"]}>￥12334</Text>
                                    <Text style={_styleSheet["weight"]}>43.6吨/公重</Text>
                                </View>
                                <View style={_styleSheet["btn-group"]}>
                                    <TButton onClick={() => this.call('1388888888')}>
                                        <View style={_styleSheet["btn"]}>
                                            <View style={_styleSheet["item-icon-box"]}>
                                                <Image src={callImg} style={_styleSheet["btn-icon"]} />
                                            </View>
                                            <Text style={_styleSheet["btn-text"]}>电话</Text>
                                        </View>
                                    </TButton>
                                    <TButton onClick={this.goShoppingCart}>
                                        <View style={_styleSheet["btn"]}>
                                            <View style={_styleSheet["item-icon-box"]}>
                                                <Image src={carImg} style={_styleSheet["btn-icon"]} />
                                            </View>

                                            <Text style={_styleSheet["btn-text"]}>购物车</Text>
                                        </View>
                                    </TButton>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
                {this.props.children}
            </View>;
  }
}, _class.options = {
  addGlobalClass: true
}, _temp2);
export { MainItem as default };