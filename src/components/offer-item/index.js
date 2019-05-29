import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Text, Image, TButton, } from '../../ui';
import { productTypesLabel } from '../../constants';
import { call, asyncActionWrapper } from '../../actions';
import { addShoppingCar, getShoppingCarList } from '../../api';
import { Tip } from '../../utils';
import './index.scss'
import callImg from './img/call.png';
import carImg from './img/car.png';
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
@connect(({ data }) => ({ user: data.user }))
export default class OfferItem extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    call(mobile) {
        call(mobile)
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    handleClickShoppingCar = (v) => {
        const { data } = this.props.user;
        addShoppingCar({
            '云报价主键': v,
            '用户ID': data.id
        })
            .then(res => {
                asyncActionWrapper({
                    call: getShoppingCarList,
                    params: { '用户ID': data.id },
                    type: 'data',
                    key: 'shoppingCarList'
                });
                Tip.success('添加成功!');
            })
    }
    split(s = '', n) {
        if (s.length < n) {
            return s;
        } else {
            return s.substring(0, n) + '...';
        }
    }
    render() {
        const { g, split } = this;
        const { showShoppinCar } = this.props;
        let key = '仓库';
        let pihao = '批号'
        let type = productTypesLabel[g('棉花云报价类型')];
        if (['地产棉', '进口棉￥'].includes(type)) {
            key = '目的港';
        }
        let tidanhao;
        if (['进口棉$', '进口棉￥'].includes(type)) {
            pihao = '报价号'
            tidanhao = g('提单号');
        }
        const offerType = g('报价类型');
        return (
            <View className="container">
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            <Text className="title">{pihao}({g(pihao)}) {tidanhao ? `提单号(${tidanhao})` : ''} {g('产地')} {g('类型')}</Text>
                        </View>
                        <View className="top-right">
                            {
                                /*
                                 <Text className="time">编号({g('编号')}) {g('发布日期')}</Text>
                                */
                            }
                        </View>
                    </View>
                    {
                        type === '进口棉￥' && (
                            <View className="peie-box">
                                <Text className="peie">自带配额{g('配额比')}%</Text>
                            </View>
                        )
                    }
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

                    <View className="row">
                        <View className="row-left">
                            <Text className="row-text">{key}:{split(g('交货仓库或方式'), 6)}</Text>

                        </View>
                        <View className="row-right">
                            <Text className="row-text">卖家:{g('公司')}</Text>
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
                            <View className="row-right-bottom">
                                <View className="row-right-row-left">
                                    <Text className="price">￥{g('报价')}</Text>
                                    <Text className="weight">{g('重量')} {g('重量类型')}</Text>
                                </View>
                                <View className="btn-group">
                                    <TButton onClick={() => this.call(g('手机号'))}>
                                        <View className="btn">
                                            <View className="item-icon-box">
                                                <Image className="btn-icon" src={callImg} />
                                            </View>
                                            <Text className="btn-text">电话</Text>
                                        </View>
                                    </TButton>
                                    {
                                        showShoppinCar !== false && (
                                            <TButton onClick={this.handleClickShoppingCar.bind(this, g('主键'))}>
                                                <View className="btn">
                                                    <View className="item-icon-box">
                                                        <Image className="btn-icon" src={carImg} />
                                                    </View>

                                                    <Text className="btn-text">购物车</Text>
                                                </View>
                                            </TButton>
                                        )
                                    }
                                </View>
                            </View>
                        </View>

                    </View>
                </View>
                {this.props.children}
            </View>
        )
    }
}


