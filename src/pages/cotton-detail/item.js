import React from 'react';
import moment from 'moment';
import { Component } from '../../platform';

import { View, Text, TButton, } from '../../ui';
import { navigate, call } from '../../actions';
import { productTypesLabel } from '../../constants';
import { split } from '../../utils';
import './item.scss'


const list = [
    { label: "年度", key: "c_ybj24", includes: ['进口棉￥', '进口棉$'] },
    { label: "产地", key: "c_ybj23", includes: ['进口棉￥', '进口棉$'] },
    { label: "等级", key: "c_ybj26" },
    { label: "长度", key: "c_ybj28" },
    { label: "强力", key: "c_ybj29" },
    { label: "马值", key: "c_ybj30" },
    { label: "叶屑", key: "c_ybj34", includes: ['进口棉￥', '进口棉$'] },
    {
        label: "含杂",
        key: "c_ybj32",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "回潮",
        key: "c_ybj31",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "长整",
        key: "c_ybj33",
        noInclude: ['进口棉￥', '进口棉$']
    }];

const descList = {
    '新疆棉': [
        { label: "轧花厂", key: "c_ybj3", hasDetail: true },
        { label: "仓库", key: "c_ybj40", hasDetail: true },
        { label: "供应商", key: "c_ybj15", hasDetail: true }
    ],
    '进口棉$': [
        { label: "仓库", key: "c_ybj44", hasDetail: true },
        { label: "船期", key: "c_ybj46", hasDetail: false },
        { label: "供应商", key: "c_ybj15", hasDetail: false }
    ],
    '进口棉￥': [
        { label: "仓库", key: "c_ybj44", hasDetail: true },
        { label: "供应商", key: "c_ybj15", hasDetail: false }
    ],
    '地产棉': [
        { label: "轧花厂", key: "c_ybj3", hasDetail: true },
        { label: "仓库", key: "c_ybj40", hasDetail: true },
        { label: "供应商", key: "c_ybj15", hasDetail: true }
    ],
    '拍储': [
        { label: "轧花厂", key: "c_ybj3", hasDetail: true },
        { label: "仓库", key: "c_ybj40", hasDetail: true },
        { label: "供应商", key: "c_ybj15", hasDetail: true }
    ]

};

export default class Item extends Component {
    static options = {
        addGlobalClass: true
    }
    goMapDetail = () => {
        navigate({ routeName: 'map-detail' });
    }
    getList = (key) => {
        //const { activeTab } = this.props;
        //activeTab 为仓单证书去掉最后一项
        return descList[key]
    }
    formatTime(t) {
        if (String(t).length >= 10) {
            return moment(t * 1000).format('YYYY/MM/DD HH:mm:ss')
        }
        return ''
    }
    call(mobile) {
        if (mobile) {
            call(mobile);
        }
    }

    render() {
        const { cottonType, price, kfContact, weight, data } = this.props;
        let pihao = '批号'
        let pihaoKey = 'c_ybj4'
        let type = productTypesLabel[data.c_ybj19];
        if (['地产棉', '进口棉￥'].includes(type)) {
            key = '仓库';
        }
        let tidanhao;
        //是否显示包数
        let isShowBS = true;
        if (['进口棉$', '进口棉￥'].includes(type)) {
            pihao = '报价号';
            pihaoKey = 'c_ybj2';
            tidanhao = data.c_ybj47;
            isShowBS = false
        }
        const offerType = data.c_ybj11;
        const peie = Number(data.c_ybj48);
        return (
            <View className="container">
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            <Text className="title">{pihao}({data[pihaoKey]}) {tidanhao ? `提单号(${tidanhao})` : ''} {data.c_ybj23} {data.c_ybj25} {isShowBS ? '   ' + data.c_ybj6 : ''}</Text>
                        </View>
                        <View className="top-right">

                        </View>
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
                                    const { label, key: itemKey } = item;
                                    return (
                                        <View key={itemKey} className="item">
                                            <Text className="item-label">{label}</Text>
                                            <Text className="item-value">{data[itemKey]}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View className="center-right">
                            {
                                ['0', '2'].includes(data.c_ybj22) && (
                                    <TButton>
                                        <View className="tag xh">
                                            <Text className="tag-text">现货</Text>
                                        </View>
                                    </TButton>
                                )
                            }
                            {
                                ['1', '2'].includes(data.c_ybj22) && (
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
                            <Text className="origin-text">{data.c_ybj23} {data.c_ybj25}</Text>
                            <Text className="origin-text">{this.formatTime(data.c_ybj20)}</Text>
                        </View>
                        {
                            cottonType === '进口棉$' && peie && (
                                <View className="peie-box">
                                    <Text className="origin-text">自带配额{peie}%</Text>
                                </View>
                            )
                        }
                        {
                            this.getList(cottonType).map(item => {
                                const { label, key: itemKey, hasDetail } = item;
                                return (
                                    <View className="desc-item">
                                        <View className="desc-left">
                                            <Text className="desc-item-label">{label}:</Text>
                                            <Text className="desc-item-value">{split(data[itemKey], 20)}</Text>
                                        </View>
                                        <View className="desc-right">
                                            {
                                                hasDetail && (
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
                        <View className="desc-item">
                            <View className="desc-left">
                                <Text className="desc-item-label">联系供应商:</Text>
                                {
                                    kfContact.map(item => {
                                        const { mobile, label } = item;
                                        return (
                                            <TButton onClick={this.call.bind(this, mobile)}>
                                                <View className="call-button">
                                                    <Text className="call-button-value">{label}</Text>
                                                </View>
                                            </TButton>
                                        )
                                    })
                                }

                            </View>
                            <View className="desc-right">

                            </View>
                        </View>

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
                                                <Text className="jc-label">{data.c_ybj12}</Text>
                                                <Text className="jc-value">{data.c_ybj13}</Text>
                                            </View>
                                            <View className="offer-left-bottom">
                                                <Text className="jc-label">基   差</Text>
                                                <Text className="jc-value">{data.c_ybj50}</Text>
                                            </View>
                                        </View>

                                    )
                            }
                            <View className="offer-right">
                                <View className="offer-right-top">
                                    <Text className="price-value">{price}</Text>
                                    <Text className="price-label">{cottonType === '进口棉$' ? '美元/吨' : '元/吨'}</Text>
                                </View>
                                <View className="offer-right-bottom">
                                    <Text className="weight-label">{data.c_ybj39}</Text>
                                    <Text className="weight-value">{weight}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
        )
    }
}


