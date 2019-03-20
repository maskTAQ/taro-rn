

import React from 'react';
import { Component } from '../../platform';


import { View, TButton, Text, Image, TModal, ScrollView } from '../../ui'
import ShoppingCarItem from './item';
import userIcon from '../../img/user.png';
import groupIcon from '../../img/group.png';
import cottonMarketIcon from '../../img/cotton-market.png';
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
        label: '联系供应商',
        icon: userIcon
    },
    {
        label: '对接全国棉花交易市场',
        icon: cottonMarketIcon
    },
    {
        label: '指定交易商',
        icon: groupIcon
    }
];
export default class ShoppingCart extends Component {
    state = {
        itemKeyList: ['cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
        itemDescList: ['zhc', 'ck', 'gys'],
        isAllChecked: false,
        modalVisible: false
    };
    componentDidHide() { }
    toggleCheckedStatus = () => {
        this.setState({
            isAllChecked: !this.state.isAllChecked
        });
    }
    settlement = () => {
        this.setState({
            modalVisible: true
        });
    }
    submit = () => {

    }
    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    }
    render() {
        const { modalVisible, itemDescList, itemKeyList, isAllChecked } = this.state;
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
                    <View className="bottom-right">
                        <TButton>
                            <View className="button delete-button">
                                <Text className="button-text">删除</Text>
                            </View>
                        </TButton>
                        <TButton onClick={this.settlement}>
                            <View className="button">
                                <Text className="button-text">结算</Text>
                            </View>
                        </TButton>
                    </View>
                </View>
                <TModal visible={modalVisible} title="" onClose={this.closeModal} onCancel={this.closeModal} onConfirm={this.submit}>
                    {
                        modalList.map(item => {
                            const { label, icon } = item;
                            return (
                                <View className="modal-item" key={label}>
                                    <Image className="modal-icon" src={icon} />
                                    <Text className="modal-label">{label}</Text>
                                </View>
                            )
                        })
                    }
                </TModal>
            </View>
        )
    }
}

