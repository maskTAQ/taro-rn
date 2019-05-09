import React from 'react';
import moment from 'moment';
import { Component } from '../../platform';

import { View, Text, TButton, } from '../../ui';
import { navigate } from '../../actions';
import './item.scss'


const list = [
    { label: "年度", key: "年度", includes: ['进口棉￥', '进口棉$'] },
    { label: "产地", key: "产地", includes: ['进口棉￥', '进口棉$'] },
    { label: "等级", key: "颜色级" },
    { label: "长度", key: "长度" },
    { label: "强力", key: "强力" },
    { label: "马值", key: "马克隆值" },
    { label: "叶屑", key: "叶屑", includes: ['进口棉￥', '进口棉$'] },
    {
        label: "含杂",
        key: "平均含杂",
        noInclude: ['地产棉', '进口棉￥', '进口棉$']
    }, {
        label: "回潮",
        key: "回潮",
        noInclude: ['地产棉', '进口棉￥', '进口棉$']
    }, {
        label: "长整",
        key: "整齐度",
        noInclude: ['地产棉', '进口棉￥', '进口棉$']
    }];

const descList = [
    { label: "轧花厂", key: "加工单位" },
    { label: "库存", key: "仓库" },
    { label: "供应商", key: "公司" },
    {
        label: "联系供应商", key: "联系供应商"
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
    formatTime(t){
        if(String(t).length>=10){
            return moment(t*1000).format('YYYY/MM/DD HH:mm:ss')
        }
        return ''
    }
    render() {
        const { g } = this;
        const { cottonType, map ,data} = this.props;
        console.log( map ,data)
        const offerType = g('报价类型');
        return (
            <View className="container">
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            {
                                ['进口棉￥', '进口棉$'].includes(cottonType) ?
                                    (
                                        <Text className="title">报价号({g('报价号')})</Text>
                                    ) :
                                    (
                                        <Text className="title">批号({g('加工批号')}) {g('产地')} {g('类型')}</Text>
                                    )
                            }

                        </View>
                        {
                            !['进口棉￥', '进口棉$'].includes(cottonType) && (
                                <View className="top-right">
                                    <Text className="time">编号({g('质量结果证书编号')}) {this.formatTime(g('发布日期'))}</Text>
                                </View>
                            )
                        }

                    </View>
                    <View className="center">
                        <View className="center-left">
                            {
                                list.filter(({ noInclude = [], includes = 'all' }) => {
                                    if (includes === 'all') {
                                        return !noInclude.includes(cottonType)
                                    } else {
                                        return !noInclude.includes(cottonType) && includes.includes(cottonType)
                                    }

                                }).map(item => {
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
                        <View className="origin">
                            <Text className="origin-text">{g('产地')} {g('类型')}</Text>
                            <Text className="origin-text">{this.formatTime(g('发布日期'))}</Text>
                        </View>
                        {
                            cottonType === '进口棉￥' && (
                                <View className="peie-box">
                                    <Text className="origin-text">自带配额{g('配额')}%</Text>
                                </View>
                            )
                        }
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
                        <View className="offer">
                            {
                                offerType === '一口价' ? (
                                    <View className="offer-left">
                                        <Text className="ykj-text">一口价</Text>
                                    </View>
                                ) :
                                    (
                                        <View className="offer-left">

                                            <View className="offer-left-top">
                                                <Text className="jc-label">{g('基差类型')}</Text>
                                                <Text className="jc-value">{g('基差值')}</Text>
                                            </View>
                                            <View className="offer-left-bottom">
                                                <Text className="jc-label">基   差</Text>
                                                <Text className="jc-value">{g('基差值升贴水')}</Text>
                                            </View>
                                        </View>

                                    )
                            }
                            <View className="offer-right">
                                <View className="offer-right-top">
                                    <Text className="price-value">{g('报价')}</Text>
                                    <Text className="price-label">元/吨</Text>
                                </View>
                                <View className="offer-right-bottom">
                                    <Text className="weight-label">{g('重量类型')}</Text>
                                    <Text className="weight-value">{g('重量')}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}


