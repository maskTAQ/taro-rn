
import React from 'react';
import { Component } from '../../platform';


import { View, Text, Image } from '../../ui'
import './item.scss';
export default class Item extends Component {
    render() {
        const { item } = this.props;
        return (
            <View className='item'>
                <View className="item-icon-box">
                    <Image src={item.imgSrc} className="item-icon" />
                </View>
                <View className="item-content">
                    <Text className="item-title">{item.title}</Text>
                    <View className="item-content-bottom">
                        <Text className="item-time">{item.time}</Text>
                        <Text className="item-readme">已有{item.readme}人次阅读</Text>
                    </View>
                </View>
            </View>
        )
    }
}