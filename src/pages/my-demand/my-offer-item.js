
import React from 'react';
import { Component } from '../../platform';

import { View, Text, TTag, TButton, Visible } from '../../ui'
import './my-offer-item.scss';
import mobileImg from '../../img/mobile.png';


const cardList = [
    {
        label: '数量',
        key: '数量'
    },
    {
        label: '自提价',
        key: '自提价'
    },
    {
        label: '到厂价',
        key: '到厂价'
    },
];

export default class MyOfferItem extends Component {
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    call(){

    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
    }
    render() {
        const { g } = this;
        return (
            <View className='item'>
                <View className='item-title'>
                    <View className='item-title-left'>
                        <Text className='item-name'>报价编号</Text>
                        <Text className='item-value'>({g('报价号')})</Text>
                    </View>
                    <View className='item-title-right'>
                        <Text className='item-time'>{g('报价时间')}</Text>
                    </View>
                </View>
                <View className='item-info-list'>
                    {
                        cardList.map((e, index) => {
                            const { label, key } = e;
                            return (
                                <View className="item-info-item">
                                    <View className='item-info-item-content'>
                                        <Text className='item-info-item-title'>{label}</Text>
                                        <Text className='item-info-item-value'>{g(key)}</Text>
                                    </View>
                                    <Visible show={index !== cardList.length - 1}>
                                        <View className='item-info-item-border'></View>
                                    </Visible>
                                </View>
                            )
                        })
                    }
                </View>

                <View className="btn-group">
                    <TButton onClick={this.call}>
                        <View className="btn">
                            <Image className="btn-icon" src={mobileImg}></Image>
                            <Text className="btn-text">电话</Text>
                        </View>
                    </TButton>
                </View>
                {this.props.children}
            </View>
        )
    }
}