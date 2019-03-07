

import React from 'react';
import { Component } from '../../platform';


import { View, TButton, Text, Image, ScrollView } from '../../ui'
import ShoppingCarItem from './item';
import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
import './main.scss';


const data = {
    id: '562781322',

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

    zhc: "巴州亿成棉业有限公司",
    ck: '中储棉库存厄尔有限责任公司',
    gys: '河北星宇纺织原料有限责任公司'
};
const list = [data, data, data, data];
const modalList = [
    {
        label: '数量',
        type: 'input',
        placeholder: '请输入数量'
    },
    {
        label: '单位',
        type: 'radio',
        option: [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }]
    },
    {
        label: '自提价',
        type: 'input',
        placeholder: '请输入自提价'
    },
    {
        label: '到厂家',
        type: 'input',
        placeholder: '请输入到厂家'
    },
];
export default class ShoppingCart extends Component {
    state = {
        itemKeyList: ['cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
        itemDescList: ['zhc', 'ck', 'gys'],
        isAllChecked: false
    };
    componentDidHide() { }
    toggleCheckedStatus = () => {
        this.setState({
            isAllChecked: !this.state.isAllChecked
        });
    }

    render() {
        const { itemDescList, itemKeyList, isAllChecked } = this.state;
        return (
            <View className="container">
                <View className="list">
                    <ScrollView scrollY>
                        {
                            list.map(data => {
                                return (
                                    <ShoppingCarItem onHandleOffer={this.handleOffer} item={data} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View className="bottom">
                    <View className="checked-box">
                        <TButton onClick={this.toggleCheckedStatus}>
                            <Image className="checked-icon" src={isAllChecked ? checkedImg : uncheckedImg} />
                        </TButton>
                        <Text className="checked-text">全选</Text>
                    </View>
                    <TButton>
                        <View className="button">
                            <Text className="button-text">删除</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}

