import React,{ Component } from "react";
import classnames from 'classnames';

import { View, Text } from '../../components';
import cardStyleSheet from "./card_styles";

var _styleSheet = cardStyleSheet;

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
  a: '186包',
  b: '--',
  c: '41.11',
  d: '4.4',
  e: '214.1kg',
  f: '2.1',
  i: '41.23',
  j: '32.21',

  t1: '白棉四级',
  a1: '44.6',
  b1: '55.4',

  t2: '',
  a2: '10.8',
  b2: '55.4',
  c2: '20.2',

  t3: 'A',
  a3: '3.6',
  b3: '10.2',
  c3: '85.5',
  d3: '0.5',

  t4: '',
  a4: '77.8',
  b4: '84.3',
  c4: '80.5',

  t5: '',
  a5: '26',
  b5: '84.3',
  c5: '80.5',
  d5: '77.6'
};
const cardList = [{
  title: '总览',
  key: 't',
  list: [[{
    key: 'a',
    label: '合计包数'
  }, {
    key: 'b',
    label: '质量标识'
  }], [{
    key: 'c',
    label: '合计毛重'
  }, {
    key: 'd',
    label: '平均回潮'
  }], [{
    key: 'e',
    label: '合计皮重'
  }, {
    key: 'f',
    label: '平均含杂'
  }], [{
    key: 'i',
    label: '合计净重'
  }, {
    key: 'j',
    label: '合计公重'
  }]]
}, {
  title: '主体颜色级',
  key: 't1',
  list: [[{
    key: 'a1',
    label: '白棉3级'
  }, {
    key: 'b1',
    label: '白棉4级'
  }]]
}, {
  title: '主体颜色级',
  key: 't2',
  list: [[{
    key: 'a',
    label: '27mm'
  }, {
    key: 'b',
    label: '白棉4级'
  }], [{
    key: 'c',
    label: '29mm'
  }, {
    key: '',
    label: ''
  }]]
}, {
  title: '马克隆主体级',
  key: 't3',
  list: [[{
    key: 'a3',
    label: 'C1'
  }, {
    key: 'b3',
    label: 'B1'
  }], [{
    key: 'c3',
    label: 'A'
  }, {
    key: 'd3',
    label: 'B2'
  }]]
}, {
  title: '长度整齐度(%)',
  key: 't4',
  list: [[{
    key: 'a',
    label: '最小值'
  }, {
    key: 'b',
    label: '最大值'
  }], [{
    key: 'c',
    label: '平均值'
  }, {
    key: '',
    label: ''
  }]]
}, {
  title: '断裂比例度(CN/tex)',
  key: 't5',
  list: [[{
    key: 'a5',
    label: '最小值'
  }, {
    key: 'b5',
    label: '最大值'
  }], [{
    key: 'c5',
    label: '平均值'
  }, {
    key: '',
    label: ''
  }], [{
    key: 'd5',
    label: '平均值(Rd)'
  }, {
    key: 'e5',
    label: '平均值'
  }]]
}];

let Card = class Card extends Component {

  render() {
    return <View>
                {cardList.map(card => {
        const { key, title, list } = card;
        return <View style={_styleSheet["card"]}>
                                {key && <View style={_styleSheet["card-title"]}>
                                        <Text style={_styleSheet["card-title-text"]}>{title}:{data[key]}</Text>
                                    </View>}
                                <View style={_styleSheet["card-list"]}>
                                    {list.map((row, index) => {
              return <View style={_getStyle(classnames("card-list-row", { 'card-list-row-border': index !== card.list.length - 1 }))}>
                                                    {row.map(item => {
                  //为什么取一个别名 用key taro编译会报错
                  const { key: a, label } = item;
                  return <View style={_styleSheet["card-list-item"]}>
                                                                    <Text style={_styleSheet["card-list-item-label"]}>{label}{label ? ':' : ''}</Text>
                                                                    <Text style={_styleSheet["card-list-item-value"]}>{data[a]}</Text>
                                                                </View>;
                })}
                                                </View>;
            })}
                                </View>
                            </View>;
      })}
            </View>;
  }
};
export { Card as default };