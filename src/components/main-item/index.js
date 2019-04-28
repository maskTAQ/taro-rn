import React from 'react';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Text, Image, TButton, } from '../../ui';
import { navigate, call, asyncActionWrapper } from '../../actions';
import { addShoppingCar, getShoppingCarList } from '../../api';
import { Tip } from '../../utils';
import './index.scss'
import callImg from './img/call.png';
import carImg from './img/car.png';
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
@connect(({ data }) => ({ user: data.user }))
export default class MainItem extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    handleDelete() {
        console.log('点击删除');
    }
    call(mobile) {
        call(mobile)
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
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
        const { border = true, showShoppinCar, type = '新疆棉' } = this.props;
        let key = '仓库';
        if(['地产棉','进口棉￥'].includes(type)){
            key = '目的港';
        }
        return (
            <View className={classnames("container", { border: border })}>
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            <Text className="title">批号({g('批号')}) {g('产地')} {g('类型')}</Text>
                        </View>
                        <View className="top-right">
                            <Text className="time">编号({g('编号')}) {g('发布日期')}</Text>
                        </View>
                    </View>
                    {
                        type === '进口棉￥' && (
                            <View className="peie-box">
                            <Text className="peie">自带配额{g('配额')}%</Text>
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

                    <View className="bottom">
                        <View className="bottom-left">
                            <View className="bottom-text-box">
                                <Text className="bottom-text">{key}:{split(g(key), 6)}</Text>
                            </View>
                            <View className="bottom-text-box">
                                <Text className="bottom-text">{g('基差类型')}</Text>
                            </View>
                            <View className="bottom-text-box">
                                <Text className="bottom-text">基  差:(+{g('基差值')})</Text>
                            </View>
                        </View>
                        <View className="bottom-right">
                            <View className="bottom-text-box">
                                <Text className="bottom-text">卖家:{g('供应商')}</Text>
                            </View>
                            <View className="bottom-right-bottom">
                                <View className="bottom-right-bottom-left">
                                    <Text className="price">￥{g('报价')}</Text>
                                    <Text className="weight">{g('重量')}</Text>
                                </View>
                                <View className="btn-group">
                                    <TButton onClick={() => this.call(g('电话'))}>
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


