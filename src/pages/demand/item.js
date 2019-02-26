
import React from 'react';
import { Component } from '../../platform';

import { View, Text, TTag, TButton, Visible,Image } from '../../ui'
import config from '../../config';
import './item.scss';
import bj from './img/bj.png';
const map = config.map.main;
export default class Item extends Component {
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
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
        return (
            <View className='item'>
                <View className='item-title'>
                    <View className='item-title-left'>
                        <Text className='item-name'>需求编号</Text>
                        <Text className='item-value'>({item.id})</Text>
                    </View>
                    <View className='item-title-right'>
                        <Text className='item-time'>2019-01-01</Text>
                    </View>
                </View>
                <View className="tag-list">
                    {
                        tagList.map((tag, index) => {
                            return (
                                <TTag
                                    className={index === tagList.length - 1 ? 'tag-end' : 'tag-mr'}>
                                    {tag}
                                </TTag>
                            )
                        })
                    }

                </View>
                <View className='item-info-list'>
                    {
                        itemKeyList.map((itemI, index) => (
                            <View className="item-info-item">
                                <View className='item-info-item-content'>
                                    <Text className='item-info-item-title'>{map[itemI]}</Text>
                                    <Text className='item-info-item-value'>{item[itemI]}</Text>
                                </View>
                                <Visible show={index !== itemKeyList.length - 1}>
                                    <View className='item-info-item-border'></View>
                                </Visible>
                            </View>
                        ))
                    }
                </View>

                <View className='item-desc-list'>
                    {
                        itemDescList.map(itemI => (
                            <View className="item-desc-item">
                                <Text className='item-desc-item-label'>{map[itemI]}:</Text>
                                <Text className='item-desc-item-text'>{item[itemI]}</Text>
                            </View>
                        ))
                    }

                </View>
                <View className="btn-group">
                    <TButton onClick={() => onHandleOffer(item)}>
                        <View className="btn">
                            <Image src={bj} className="btn-icon" />
                            <Text className="btn-text">我要报价</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}