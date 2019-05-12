
import React from 'react';
import { Component } from '../../platform';

import { View, Text, Image, TButton } from '../../ui';
import offerIcon from './img/offer.png';
import './part.scss';

export default class SelfPart extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    render() {
        const { g } = this;
        const { onHandleOffer,data } = this.props;
        return (
            <View>
                <View className="desc-list">
                    <View className="desc-text-box">
                        <Text className="desc-text">交货地:{g('交货仓库或方式')}</Text>
                    </View>
                    <View className="desc-text-box">
                        <Text className="desc-text">买家:{g('交货仓库或方式')}</Text>
                    </View>
                </View>
                <View className="bottom">
                    <View className="bottom-left">
                        <Text className="jiaohuo-label">最晚交货时间</Text>
                        <Text className="jiaohuo-value">2019-04-02</Text>
                    </View>
                    <View className="btn-group-center">
                        <Text className="buy-label">采购中</Text>
                        <Text className="buy-value">1000吨</Text>
                    </View>
                    <View className="btn-group-right">
                        <TButton onClick={onHandleOffer.bind(this, data)}>
                            <View className="offer-btn">
                                <Image src={offerIcon} className="btn-icon" />
                                <Text className="offer-btn-text">我要报价</Text>
                            </View>
                        </TButton>
                    </View>
                </View>
            </View>
        )

    }
}