import React from 'react';

import { Component } from "react";

import { View, Text, Image, TTag, TButton, Visible } from '../../components';
import config from '../../config';
import itemStyleSheet from "./item_styles";
import deleteImg from './img/delete.png';
import editImg from './img/edit.png';
var _styleSheet = itemStyleSheet;
const map = config.map.main;
let Item = class Item extends Component {
  handleDelete() {
    console.log('点击删除');
  }
  handleEdit() {
    console.log('点击编辑');
  }
  render() {
    const { item, index, itemKeyList, itemDescList } = this.props;
    return <View style={_styleSheet["item-box"]}>
                <View style={_styleSheet["item-title"]}>
                    <View style={_styleSheet["item-title-left"]}>
                        <Text style={_styleSheet["item-name"]}>需求编号</Text>
                        <Text style={_styleSheet["item-value"]}>({item.id})</Text>
                    </View>
                    <View style={_styleSheet["item-title-right"]}>
                        <TTag style={_styleSheet["item-tag-mr"]}>长绒棉</TTag>
                        <TTag>新疆全省</TTag>
                    </View>
                </View>
                <View style={_styleSheet["item-info-list"]}>
                    {itemKeyList.map(itemI => <View style={_styleSheet["item-info-item"]}>
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
                    <TButton onClick={() => this.handleDelete(item)}>
                        <View style={_styleSheet["btn"]}>
                            <Image src={deleteImg} style={_styleSheet["btn-icon"]}></Image>
                            <Text style={_styleSheet["btn-text"]}>删除</Text>
                        </View>
                    </TButton>
                    <TButton onClick={() => this.handleEdit(item)}>
                        <View style={_styleSheet["btn"]}>
                            <Image src={editImg} style={_styleSheet["btn-icon"]}></Image>
                            <Text style={_styleSheet["btn-text"]}>编辑</Text>
                        </View>
                    </TButton>
                </View>
            </View>;
  }
};
export { Item as default };