
import React from 'react';
import moment from 'moment';
import { Component } from '../../platform';

import { View, Text, TButton, } from '../../ui';
import { navigate, call } from '../../actions';
import { productTypesLabel } from '../../constants';
import { split } from '../../utils';
import { g } from '../../config';
import './item.scss'


const list = [
    { label: "年度", key: "年份", includes: ['进口棉￥', '进口棉$'] },
    { label: "产地", key: "产地", includes: ['进口棉￥', '进口棉$'] },
    { label: "等级", key: "颜色级" },
    { label: "长度", key: "长度" },
    { label: "强力", key: "强力" },
    { label: "马值", key: "马克隆值" },
    { label: "叶屑", key: "叶屑", includes: ['进口棉￥', '进口棉$'] },
    {
        label: "含杂",
        key: "平均含杂",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "回潮",
        key: "回潮",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "长整",
        key: "整齐度",
        noInclude: ['进口棉￥', '进口棉$']
    }];

const descList = {
    '新疆棉': [
        { label: "轧花厂", key: "加工单位", hasDetail: true },
        { label: "仓库", key: "仓库", hasDetail: true },
        { label: "供应商", key: "公司", hasDetail: true }
    ],
    '进口棉$': [
        { label: "仓库", key: "目的港", hasDetail: true },
        { label: "船期", key: "船期", hasDetail: false },
        { label: "供应商", key: "公司", hasDetail: false }
    ],
    '进口棉￥': [
        { label: "仓库", key: "目的港", hasDetail: true },
        { label: "供应商", key: "公司", hasDetail: false }
    ],
    '地产棉': [
        { label: "轧花厂", key: "加工单位", hasDetail: true },
        { label: "仓库", key: "仓库", hasDetail: true },
        { label: "供应商", key: "公司", hasDetail: true }
    ],
    '拍储': [
        { label: "轧花厂", key: "加工单位", hasDetail: true },
        { label: "仓库", key: "仓库", hasDetail: true },
        { label: "供应商", key: "公司", hasDetail: true }
    ]

};

export default class Item extends Component {
    static options = {
        addGlobalClass: true
    }
    g = k => {
        const { data, type } = this.props;
        return g({data,type,k});
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
        const { g } = this;
        const { price, kfContact, weight } = this.props;
        let type = productTypesLabel[g('棉花云报价类型')];
        let pihao = '批号';
        let tidanhao;
        //是否显示包数
        let isShowBS = true;
        if (['进口棉$', '进口棉￥'].includes(type)) {
            pihao = '报价号'
            tidanhao = g('提单号');
            isShowBS = false;
        }
        const offerType = g('报价类型');
        const peie = Number(g('配额比'));
        return (
            <View className="container">
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            <Text className="title">{pihao}({g(pihao)}) {tidanhao ? `提单号(${tidanhao})` : ''} {g('产地')} {g('类型')} {isShowBS ? '  ' + g('包数') : ''}</Text>
                        </View>
                        <View className="top-right">
                            {
                                /*
                                 <Text className="time">编号({g('编号')}) {g('发布日期')}</Text>
                                */
                            }
                        </View>
                    </View>
                    <View className="center">
                        <View className="center-left">
                            {
                                list.filter(({ noInclude = [], includes = 'all' }) => {
                                    if (includes === 'all') {
                                        return !noInclude.includes(type)
                                    } else {
                                        return !noInclude.includes(type) && includes.includes(type)
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
                            
                        </View>
                    </View>

                    <View className="bottom">
                        <View className="origin">
                            <Text className="origin-text">{g('产地')} {g('类型')}</Text>
                            <Text className="origin-text">{this.formatTime(g('发布日期'))}</Text>
                        </View>
                        {
                            type === '进口棉$' && peie && (
                                <View className="peie-box">
                                    <Text className="origin-text">自带配额{g('peie')}%</Text>
                                </View>
                            )
                        }
                        {
                            this.getList(type).map(item => {
                                const { label, key, hasDetail } = item;
                                return (
                                    <View className="desc-item">
                                        <View className="desc-left">
                                            <Text className="desc-item-label">{label}:</Text>
                                            <Text className="desc-item-value">{split(g(key), 20)}</Text>
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
                                    <Text className="price-value">{price}</Text>
                                    <Text className="price-label">{type === '进口棉$' ? '美元/吨' : '元/吨'}</Text>
                                </View>
                                <View className="offer-right-bottom">
                                    <Text className="weight-label">{g('重量类型')}</Text>
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