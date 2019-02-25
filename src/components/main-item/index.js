import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';

import { View, Text, Image, TButton } from '../../ui';
import { navigate, call } from '../../actions';
import config from '../../config';
import './index.scss'
import callImg from './img/call.png';
import carImg from './img/car.png';
const map = config.map.main;
const data = {
    id: '562781322',
    dj: '21',
    ysj: '21+',
    cd: '12',
    ql: 21.2,
    mz: 1,
    cz: '0.0',
    hc: '0.0',
    hz: '0.0',
    jg: '<15003',

    shd: '盐城',
    mj: '盐城捷多纺织品有限公司',
    zwjhsj: '2019-01-01',
    cgjs: '200d吨',

    sl: '12',
    ztj: '1231',
    dcj: '1331',

    xqbh: '12132987130',

    jc: '+120',
    'y/d': '15720',
    gz: '45.455',

    ph: "454212552",
    ck: '中储棉库存厄尔',
    mj: '河北星宇纺织原料'
};
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
    render() {
        const list = ["dj", "cd", "ql", "mz", "cz", "hz", 'cz'];
        const { border = true } = this.props;
        return (
            <View className={classnames("container", { border: border })}>
                <View className="content">
                    <View className="top">
                        <View className="top-left">
                            <Text className="title">批号(23131298) 北疆伊犁 机采棉</Text>
                        </View>
                        <View className="top-right">
                            <Text className="time">编号(31212) 19/01/12</Text>
                        </View>
                    </View>
                    <View className="center">
                        <View className="center-left">
                            {
                                list.map(item => {
                                    return (
                                        <View className="item">
                                            <Text className="item-label">{map[item]}</Text>
                                            <Text className="item-value">{data[item]}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View className="center-right">
                            <TButton>
                                <View className="tag xh">
                                    <Text className="tag-text">现货</Text>
                                </View>
                            </TButton>
                            <TButton>
                                <View className="tag cd">
                                    <Text className="tag-text">仓单</Text>
                                </View>
                            </TButton>
                        </View>
                    </View>

                    <View className="bottom">
                        <View className="bottom-left">
                            <View className="bottom-text-box">
                                <Text className="bottom-text">仓库:{data.ck}</Text>
                            </View>
                            <View className="bottom-text-box">
                                <Text className="bottom-text">郑棉1905(15400)</Text>
                            </View>
                            <View className="bottom-text-box">
                                <Text className="bottom-text">基  差:(+500)</Text>
                            </View>
                        </View>
                        <View className="bottom-right">
                            <View className="bottom-text-box">
                                <Text className="bottom-text">卖家:{data.mj}</Text>
                            </View>
                            <View className="bottom-right-bottom">
                                <View className="bottom-right-bottom-left">
                                    <Text className="price">￥12334</Text>
                                    <Text className="weight">43.6吨/公重</Text>
                                </View>
                                <View className="btn-group">
                                    <TButton onClick={() => this.call('1388888888')}>
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


