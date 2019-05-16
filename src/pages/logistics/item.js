
import React from 'react';
import { Component } from '../../platform';

import { View, Text, Image, TButton, Visible } from '../../ui'
import { call } from '../../actions';
import callIcon from './img/call.png';
import './item.scss';

export default class Item extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    render() {
        const { g } = this;
        return (
            <View className="container">
                <View className="row">
                    <View className="label">
                        <Text className="label-text">发货地</Text>
                    </View>
                    <View className="value">
                        <Text className="value-text">{g('发货地')}</Text>
                    </View>
                </View>
                <View className="row">
                    <View className="label">
                        <Text className="label-text">收货地</Text>
                    </View>
                    <View className="value">
                        <Text className="value-text">{g('收货地')}</Text>
                    </View>
                </View>
                <View className="row">
                    <View className="label">
                        <Text className="label-text">货物信息</Text>
                    </View>
                    <View className="value">
                        <Text className="value-text">{g('重量') + g('件数') + g('货物类型')}</Text>
                    </View>
                </View>
                <View className="row">
                    <View className="label">
                        <Text className="label-text">发货时间</Text>
                    </View>
                    <View className="value">
                        <Text className="value-text">{g('发货时间开始') + ' 至 ' + g('发货时间结束')}</Text>
                    </View>
                </View>
                <View className="row">
                    <View className="label">
                        <Text className="label-text">运输价格</Text>
                    </View>
                    <View className="value">
                        <Text className="value-text price">{g('发货价格')}</Text>
                    </View>
                </View>

                <TButton onClick={() => {
                    call(g('联系电话'));
                }}>
                    <View className="button">
                        <Image src={callIcon} className="button-icon" />
                        <Text className="button-text">联系发货人</Text>
                    </View>
                </TButton>

            </View>
        )
    }
}