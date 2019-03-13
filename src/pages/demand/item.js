
import React from 'react';
import { Component } from '../../platform';

import { View, Text, TTag, TButton, Visible, Image } from '../../ui'
import config from '../../config';
import './item.scss';
import bj from './img/bj.png';
const map = config.map.main;
const descMap = [
    {
        label: '仓库',
        key: '交货地'
    },
    {
        label: '供应商',
        key: '需求单位'
    }
];
//itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz']
const infoMap = [
    {
        label: '颜色级',
        key: '颜色级'
    },
    {
        label: '长度',
        key: '长度'
    },
    {
        label: '强力',
        key: '强力'
    },
    {
        label: '马值',
        key: '马克隆值'
    },
    {
        label: '长度',
        key: '整齐度'
    },
    {
        label: '回潮',
        key: '回潮'
    },
    {
        label: '含杂',
        key: '平均含杂'
    }
]
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
    g = k => {
        const { map, item } = this.props;
        return item[map[k]] || '-';
    }
    render() {
        const { onHandleOffer, item } = this.props;
        const { g } = this;
        const tagList = ['颜色级' + g('颜色级'), g('类型'), g('产地')];
        return (
            <View className='item'>
                <View className='item-title'>
                    <View className='item-title-left'>
                        <Text className='item-name'>需求编号</Text>
                        <Text className='item-value'>({g('需求号')})</Text>
                    </View>
                    <View className='item-title-right'>
                        <Text className='item-time'>{g('发布日期')}</Text>
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
                        infoMap.map((item, index) => {
                            const { label, key } = item;
                            return (
                                <View className="item-info-item">
                                    <View className='item-info-item-content'>
                                        <Text className='item-info-item-title'>{label}</Text>
                                        <Text className='item-info-item-value'>{g(key)}</Text>
                                    </View>
                                    <Visible show={index !== infoMap.length - 1}>
                                        <View className='item-info-item-border'></View>
                                    </Visible>
                                </View>
                            )
                        })
                    }
                </View>

                <View className='item-desc-list'>
                    {
                        descMap.map((item) => {
                            const { label, key } = item;
                            return (
                                (
                                    <View className="item-desc-item">
                                        <Text className='item-desc-item-label'>{label}:</Text>
                                        <Text className='item-desc-item-text'>{g(key)}</Text>
                                    </View>
                                )
                            )
                        })
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