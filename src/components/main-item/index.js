import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';

import { View, Text, Image, TButton } from '../../ui';
import { navigate, call } from '../../actions';
import './index.scss'
import callImg from './img/call.png';
import carImg from './img/car.png';

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
    goShoppingCart(params) {
        console.log('点击购物车');
        navigate({
            routeName: 'shopping-car',
            params
        })
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
    }
    render() {
        const { g } = this;
        const list = [
            { label: "等级级", key: "颜色级" },
            { label: "长度", key: "长度" },
            { label: "强力", key: "强力" }, {
                label: "马值", key: "马克隆值"
            }, {
                label: "整度",
                key: "整齐度"
            }, {
                label: "含杂",
                key: "平均含杂"
            }];
        const { border = true } = this.props;
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
                        <View className="bottom-left">
                            <View className="bottom-text-box">
                                <Text className="bottom-text">仓库:{g('交货仓库或方式')}</Text>
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
                                    <TButton onClick={this.goShoppingCart}>
                                        <View className="btn">
                                            <View className="item-icon-box">
                                                <Image className="btn-icon" src={carImg} />
                                            </View>

                                            <Text className="btn-text">购物车</Text>
                                        </View>
                                    </TButton>
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


