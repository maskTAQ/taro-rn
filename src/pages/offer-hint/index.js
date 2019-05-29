import React from 'react';
import { Component } from '../../platform';

import { View, Text,TButton } from '../../ui'
import './index.scss'



export default class OfferHint extends Component {

    config = {
        navigationBarTitleText: '提示'
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    render() {
        return (
            <View className='container'>
                <View className="top"></View>
                <View className="bottom">
                    <View className="desc-list">
                        <View className="desc-item mb">
                            <Text className="desc-text">如需批量上传 请您使用英文“,”或者“空格”将批号隔开</Text>
                        </View>
                        <View className="desc-item">
                            <Text className="desc-text">上传仓单证书请你使用电脑版用户端，</Text>
                        </View>
                        <View className="desc-item">
                            <Text className="desc-text">复制www.chncot.com链接访问或直接百度搜索“中棉网”</Text>
                        </View>
                    </View>

                    <View className="copy">
                        <View className="copy-text-wrapper">
                            <Text className="copy-text">
                                https://www.chncot.com
                            </Text>
                        </View>
                        <TButton className="copy-btn" onClick={this.copy}>复制</TButton>
                    </View>
                </View>
            </View>
        )
    }
}

