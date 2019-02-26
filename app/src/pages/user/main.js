

import React from 'react';
import { Component } from '../../platform';

import classnames from 'classnames';
import { View, Image, TButton, Text, ScrollView } from '../../ui';
import rightImg from '../../img/right.png';
import publishImg from '../../img/publish.png';
import mobileImg from '../../img/mobile.png';
import scImg from '../../img/sc.png';
import demandImg from '../../img/demand.png';
import tjImg from '../../img/tj.png';
import feedbackImg from '../../img/feedback.png';
import aboutImg from '../../img/about.png';
import hmdImg from '../../img/hmd.png';
import bjImg from '../../img/bj.png';
import historyImg from '../../img/history.png';
import jsqImg from '../../img/jsq.png';
import logoImg from '../../img/logo.png';
import mainStyleSheet from "./main_styles";

import { navigate } from '../../actions';
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

const toolList = [{
  icon: scImg,
  label: '收藏'
}, {
  icon: historyImg,
  label: '历史'
}, {
  icon: jsqImg,
  label: '升贴水'
}];
const listTop = [{
  icon: publishImg,
  label: '我的发布',
  value: '',
  routeName: 'publish-import-cotton'

}, {
  icon: mobileImg,
  label: '手机号',
  value: '13888888888',
  routeName: ''
}];
const listBottom = [{
  icon: scImg,
  label: '收藏的棉讯',
  value: '',
  routeName: 'cotton-information'
}, {
  icon: demandImg,
  label: '我的需求',
  value: '',
  routeName: 'my-demand'
}, {
  icon: bjImg,
  label: '我的报价',
  value: '',
  routeName: 'my-demand'
}, {
  icon: tjImg,
  label: '推荐二维码',
  value: '',
  routeName: ''
}, {
  icon: feedbackImg,
  label: '用户反馈',
  value: '',
  routeName: ''
}, {
  icon: aboutImg,
  label: '关于我们',
  value: '',
  routeName: ''
}, {
  icon: hmdImg,
  label: '企业黑名单',
  value: '',
  routeName: ''
}];

let User = class User extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {}, _temp;
  }

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  handleClick(current) {
    this.setState({
      current
    });
  }
  render() {
    return <ScrollView>
                <View style={_styleSheet["container"]}>
                    <View style={_styleSheet["user-card"]}>
                        <View style={_styleSheet["user-info"]}>
                            <Image src={logoImg} style={_styleSheet["user-icon"]} />
                            <View style={_styleSheet["user-info-detail"]}>
                                <Text style={_styleSheet["company-name"]}>苏州易贸通进出口有限公司</Text>
                                <Text style={_styleSheet["mobile"]}>135****2591</Text>
                            </View>
                        </View>
                        <View style={_styleSheet["tool"]}>
                            {toolList.map(item => {
              const { icon, label } = item;
              return <View style={_styleSheet["tool-item"]}>
                                            <Image src={icon} style={_styleSheet["tool-item-icon"]} />
                                            <Text style={_styleSheet["tool-item-label"]}>{label}</Text>
                                        </View>;
            })}
                        </View>
                    </View>
                    <View style={_styleSheet["list-group"]}>
                        <View style={[_styleSheet["list"], _styleSheet["mb"]]}>
                            {listTop.map((item, i) => {
              const { icon, label, value, routeName } = item;
              return <TButton onClick={() => {
                routeName && navigate({ routeName: item.routeName });
              }}>
                                            <View style={_getStyle(classnames('item', {
                  'item-border': i !== listTop.length - 1
                }))}>
                                                <View style={_styleSheet["item-left"]}>
                                                    <Image src={icon} style={_styleSheet["item-icon"]} />
                                                    <Text style={_styleSheet["item-label"]}>{label}</Text>
                                                </View>
                                                <View style={_styleSheet["item-right"]}>
                                                    {value ? <Text style={_styleSheet["item-value"]}>{value}</Text> : null}
                                                    <Image src={rightImg} style={_styleSheet["item-right-icon"]} />
                                                </View>
                                            </View>
                                        </TButton>;
            })}
                        </View>
                        <View style={_styleSheet["list"]}>
                            {listBottom.map((item, i) => {
              const { icon, label, value, routeName } = item;
              return <TButton onClick={() => {
                routeName && navigate({ routeName: item.routeName });
              }}>
                                            <View style={_getStyle(classnames('item', {
                  'item-border': i !== listBottom.length - 1
                }))}>
                                                <View style={_styleSheet["item-left"]}>
                                                    <Image src={icon} style={_styleSheet["item-icon"]} />
                                                    <Text style={_styleSheet["item-label"]}>{label}</Text>
                                                </View>
                                                <View style={_styleSheet["item-right"]}>
                                                    {value ? <Text style={_styleSheet["item-value"]}>{value}</Text> : null}
                                                    <Image src={rightImg} style={_styleSheet["item-right-icon"]} />
                                                </View>
                                            </View>
                                        </TButton>;
            })}
                        </View>
                    </View>
                </View>
            </ScrollView>;
  }
};
export { User as default };