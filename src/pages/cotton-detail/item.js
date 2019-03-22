import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Text, Image, TButton, } from '../../ui';
import { Tip } from '../../utils';
import { navigate } from '../../actions';
import './item.scss'


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
        key: "平均回潮"
    }, {
        label: "整度",
        key: "整齐度"
    }];

const descList = [
    { label: "扎花厂", key: "扎花厂" },
    { label: "库存", key: "仓库" },
    { label: "供应商", key: "供应商" },
    {
        label: "联系供应商", key: "用户ID"
    }
];

export default class Item extends Component {
    static options = {
        addGlobalClass: true
    }

    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
    }
    goMapDetail = () => {
        navigate({ routeName: 'map-detail' });
    }
    getList = l => {
        const { activeTab } = this.props;
        //activeTab 为仓单证书去掉最后一项
        if (activeTab === '仓单证书') {
            const a = [...l];
            a.length = 3;
            return a;
        } else {
            return l;
        }
    }
    render() {
        const { g } = this;
        return (
            <View className="container">
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            <Text className="title">批号({g('批号')}) {g('产地')} {g('类型')}</Text>
                        </View>
                        <View className="top-right">
                            <Text className="time">编号({g('编号')}) {g('发布日期')}</Text>
                        </View>
                    </View>
                    <View className="center">
                        <View className="center-left">
                            {
                                list.map(item => {
                                    const { label, key } = item;
                                    return (
                                        <View className="item">
                                            <Text className="item-label">{label}</Text>
                                            <Text className="item-value">{g(key)}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View className="center-right">
                            {
                                ['0', '2'].includes(g('仓单')) && (
                                    <TButton>
                                        <View className="tag xh">
                                            <Text className="tag-text">现货</Text>
                                        </View>
                                    </TButton>
                                )
                            }
                            {
                                ['1', '2'].includes(g('仓单')) && (
                                    <TButton>
                                        <View className="tag cd">
                                            <Text className="tag-text">仓单</Text>
                                        </View>
                                    </TButton>
                                )
                            }

                        </View>
                    </View>

                    <View className="bottom">
                        {
                            this.getList(descList).map(item => {
                                const { label, key } = item;
                                return (
                                    <View className="desc-item">
                                        <View className="desc-left">
                                            <Text className="desc-item-label">{label}:</Text>
                                            <Text className="desc-item-value">{g(key)}</Text>
                                        </View>
                                        <View className="desc-right">
                                            {
                                                label !== '联系供应商' && (
                                                    <TButton onClick={this.goMapDetail}>
                                                        <View className="detail-btn">
                                                            <Text className="detail-btn-text">详情</Text>
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
            </View>
        )
    }
}


