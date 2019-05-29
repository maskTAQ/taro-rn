
import React from 'react';
import { Component } from '../../platform';

import { View, Text, TTag, TButton, Visible } from '../../ui'
import { DemandItem } from '../../components'
import config from '../../config';
import './item.scss';
import { navigate } from '../../actions';
const map = config.map.main;

const list = [
    { label: "等级", key: "颜色级" },
    { label: "长度", key: "长度" },
    { label: "强力", key: "强力" }, {
        label: "马值", key: "马克隆值"
    }, {
        label: "含杂",
        key: "平均含杂"
    }, {
        label: "回潮",
        key: "回潮"
    }, {
        label: "整度",
        key: "整齐度"
    }];

const descList = [
    {
        label: "产地",
        key: "产地"
    },
    {
        label: "买家",
        key: "买家"
    },
    {
        label: "收货地",
        key: "收货地"
    },
    {
        label: "最晚交货时间",
        key: "最晚交货时间"
    },
    {
        label: "联系方式",
        key: "显示联系方式"
    }
];
export default class Item extends Component {
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    goMapDetail() {
        navigate({ routeName: 'map-detail' });
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    render() {
        const { g, map, data } = this;
        return (
            <View className='item'>
                <DemandItem map={map} data={data} co>
                </DemandItem>
                <View className='item-desc-list'>
                    {
                        descList.map(item => {
                            const { label, key } = item;
                            return (
                                <View className="item-desc-item">
                                    <Text className='item-desc-item-label'>{label}:</Text>
                                    <View className="item-desc-item-right">

                                        <Text className='item-desc-item-text'>{g(key)}</Text>
                                        {
                                            label === '买家' && (
                                                <TButton onClick={this.goMapDetail}>
                                                    <View className="button">
                                                        <Text className="button-text">详情</Text>
                                                    </View>
                                                </TButton>
                                            )
                                        }
                                    </View>

                                </View>
                            )
                        })
                    }

                </View>
            </View>
        )
    }
}