import React, { Component } from 'react'
import { View } from 'react-native'
import { TButton, Text } from "components";
import { connect } from 'react-redux'

import { } from 'actions';

import _styleSheet from "./index_styles";

export default class OfferHint extends Component {

    config = {
        navigationBarTitleText: 'title'
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    copy() {
        //
        console.log('copy')
    }
    render() {
        return (
            <View style={_styleSheet["container"]}>
                <View style={_styleSheet["top"]}></View>
                <View style={_styleSheet["bottom"]}>
                    <View style={_styleSheet["desc-list"]}>
                        <View style={[_styleSheet["desc-item"], _styleSheet["mb"]]}>
                            <Text style={_styleSheet["desc-text"]}>如需批量上传 请您使用英文“,”或者“空格”将批号隔开</Text>
                        </View>
                        <View style={_styleSheet["desc-item"]}>
                            <Text style={_styleSheet["desc-text"]}>上传仓单证书请你使用电脑版用户端，</Text>
                        </View>
                        <View style={_styleSheet["desc-item"]}>
                            <Text style={_styleSheet["desc-text"]}>复制www.chncot.com链接访问或直接百度搜索“中棉网”</Text>
                        </View>
                    </View>

                    <View style={_styleSheet["copy"]}>
                        <View style={_styleSheet["copy-text-wrapper"]}>
                            <Text style={_styleSheet["copy-text"]}>
                                https://www.chncot.com
                                </Text>
                        </View>
                        <TButton onClick={this.copy} style={_styleSheet["copy-btn"]}>复制</TButton>
                    </View>
                </View>
            </View>
        )
    }
}



