

import React from 'react';
import { Component } from '../../platform';

import update from 'immutability-helper';
import { View, TButton, Text, Image, Visible, ScrollView, TTag, TModal, TInput, TRadio } from '../../ui';
import config from '../../config';
import Item from './item';
import bj from './img/bj.png';
import editImg from '../../img/edit.png';
import deleteImg from '../../img/delete.png';
import { navigate } from '../../actions';
import mainStyleSheet from "./main_styles";

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

const map = config.map.main;

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
const list = [data, data, data, data];
const modalList = [{
  label: '数量',
  type: 'input',
  placeholder: '请输入数量'
}, {
  label: '单位',
  type: 'radio',
  option: [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }]
}, {
  label: '自提价',
  type: 'input',
  placeholder: '请输入自提价'
}, {
  label: '到厂家',
  type: 'input',
  placeholder: '请输入到厂家'
}];
let Demand = class Demand extends Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
      offerItemKeyList: ['sl', 'ztj', 'dcj'],
      itemDescList: ['zhc', 'ck', 'gys'],
      modal: {
        visible: false,
        data: null
      },
      unit: '吨'
    }, this.handleClick = current => {
      this.setState({
        current
      });
    }, this.handleUnitChange = item => {
      this.setState({
        unit: item.value
      });
    }, this.closeModal = () => {
      this.setState(update(this.state, {
        modal: {
          visible: {
            $set: false
          }
        }
      }));
    }, this.submit = () => {
      this.closeModal();
    }, _temp;
  }

  componentDidHide() {}

  handleOffer(data) {
    this.setState(update(this.state, {
      modal: {
        visible: {
          $set: true
        },
        data: {
          $set: data
        }
      }
    }));
  }

  goDemandDetail() {
    navigate({ routeName: 'demand-detail' });
  }
  goDemandCustom() {
    navigate({ routeName: 'demand-custom' });
  }
  render() {
    const { itemDescList, itemKeyList, modal, unit } = this.state;
    const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
    const item = list[0];
    return <View style={_styleSheet["container"]}>
                <View style={_styleSheet["condition"]}>
                    <View style={_styleSheet["condition-title"]}>
                        <Text style={_styleSheet["condition-title-text"]}>定制牌价</Text>
                    </View>
                    <View style={_styleSheet["condition-content"]}>
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
                        <View style={_styleSheet["bottom"]}>
                            <View style={_styleSheet["bottom-left"]}>
                                <TButton onClick={this.goDemandCustom}>
                                    <View style={_styleSheet["btn"]}>
                                        <Image src={editImg} style={_styleSheet["btn-icon"]} />
                                        <Text style={_styleSheet["btn-text"]}>修改</Text>
                                    </View>
                                </TButton>
                                <TButton>
                                    <View style={_styleSheet["btn"]}>
                                        <Image src={deleteImg} style={_styleSheet["btn-icon"]} />
                                        <Text style={_styleSheet["btn-text"]}>删除</Text>
                                    </View>
                                </TButton>
                            </View>
                            <View style={_styleSheet["bottom-right"]}>
                                <View style={_styleSheet["best-price"]}>
                                    <Text style={_styleSheet["best-price-value"]}>15003</Text>
                                    <Text style={_styleSheet["best-price-label"]}>平台最优价格</Text>
                                </View>
                                <TButton onClick={this.goDemandDetail}>
                                    <View style={_styleSheet["btn"]}>
                                        <Image src={bj} style={_styleSheet["btn-icon"]} />
                                        <Text style={_styleSheet["btn-text"]}>查看资源</Text>
                                    </View>
                                </TButton>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={_styleSheet["demand-list"]}>
                    <ScrollView>
                        {list.map(data => {
            return <Item onHandleOffer={this.handleOffer} item={data} itemDescList={itemDescList} itemKeyList={itemKeyList} />;
          })}
                    </ScrollView>
                </View>
                <TModal visible={modal.visible} title="我要报价" onClose={this.closeModal} onCancel={this.closeModal} onConfirm={this.submit}>
                    {modalList.map(item => {
          const { label, type, placeholder, option } = item;
          return <View style={_styleSheet["item"]}>
                                    <Text style={_styleSheet["item-label"]}>{label}</Text>
                                    {type === 'input' ? <TInput placeholder={placeholder} style={_styleSheet["item-input"]} /> : <TRadio option={option} checkd={unit} onCheckdChange={this.handleUnitChange} />}
                                </View>;
        })}
                </TModal>
            </View>;
  }
};
export { Demand as default };