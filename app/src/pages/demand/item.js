
import React from 'react';
import { Component } from '../../platform';

import { View, Text, TTag, TButton, Visible, Image } from '../../ui';
import config from '../../config';
import itemStyleSheet from "./item_styles";
import bj from './img/bj.png';
var _styleSheet = itemStyleSheet;

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
let Item = class Item extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      itemValueList: ['jc', 'y/d', 'gz']
    }, _temp;
  }

  handleDelete() {
    console.log('点击删除');
  }
  handleEdit() {
    console.log('点击编辑');
  }
  render() {
    const { onHandleOffer, item, itemKeyList, itemDescList } = this.props;
    const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
    return <View style={_styleSheet["item"]}>
                <View style={_styleSheet["item-title"]}>
                    <View style={_styleSheet["item-title-left"]}>
                        <Text style={_styleSheet["item-name"]}>需求编号</Text>
                        <Text style={_styleSheet["item-value"]}>({item.id})</Text>
                    </View>
                    <View style={_styleSheet["item-title-right"]}>
                        <Text style={_styleSheet["item-time"]}>2019-01-01</Text>
                    </View>
                </View>
                <View style={_styleSheet["tag-list"]}>
                    {tagList.map((tag, index) => {
          return <TTag style={_getStyle(index === tagList.length - 1 ? 'tag-end' : 'tag-mr')}>
                                    {tag}
                                </TTag>;
        })}

                </View>
                <View style={_styleSheet["item-info-list"]}>
                    {itemKeyList.map((itemI, index) => <View style={_styleSheet["item-info-item"]}>
                                <View style={_styleSheet["item-info-item-content"]}>
                                    <Text style={_styleSheet["item-info-item-title"]}>{map[itemI]}</Text>
                                    <Text style={_styleSheet["item-info-item-value"]}>{item[itemI]}</Text>
                                </View>
                                <Visible show={index !== itemKeyList.length - 1}>
                                    <View style={_styleSheet["item-info-item-border"]}></View>
                                </Visible>
                            </View>)}
                </View>

                <View style={_styleSheet["item-desc-list"]}>
                    {itemDescList.map(itemI => <View style={_styleSheet["item-desc-item"]}>
                                <Text style={_styleSheet["item-desc-item-label"]}>{map[itemI]}:</Text>
                                <Text style={_styleSheet["item-desc-item-text"]}>{item[itemI]}</Text>
                            </View>)}

                </View>
                <View style={_styleSheet["btn-group"]}>
                    <TButton onClick={() => onHandleOffer(item)}>
                        <View style={_styleSheet["btn"]}>
                            <Image src={bj} style={_styleSheet["btn-icon"]} />
                            <Text style={_styleSheet["btn-text"]}>我要报价</Text>
                        </View>
                    </TButton>
                </View>
            </View>;
  }
};
export { Item as default };