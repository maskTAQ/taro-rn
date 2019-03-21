import React from 'react';
import Taro from '@tarojs/taro';
import { Component, connect } from '../../platform';

import { login } from '../../actions';
import { View, Image, TButton, Text, ScrollView, TModal } from '../../ui';
import img from './img/icon-login-index.png';
export default class Authorization extends Component {
    state = {
        visible: false
    }
    auth(e) {
        const { errMsg } = e.detail;
        if (errMsg.includes('ok')) {
            this.setState({
                visible: false
            })
        } else {
            this.setState({
                visible: true
            })
        }
    }
    componentWillMount() {
        Taro.getSetting()
            .then(res => {
                const { authSetting } = res;
                if (authSetting['scope.userInfo']) {
                    this.setState({
                        visible: false
                    })
                } else {
                    this.setState({
                        visible: true
                    })
                }
                console.log(res, 'res')
            })
    }
    render() {
        const { visible } = this.state;

        return visible ? (
            <View className="layer">
                <View className="modal">
                    <View className="title">
                        <Text className="title-text">需要您的授权</Text>
                    </View>
                    <View className="content">
                        <Text className="desc">为了提高更好的服务</Text>
                        <Text className="desc">请在稍后的提示框点击”允许“</Text>
                        <Image className="img" src={img} />

                        <button class='getPhoneNumber'
                            onClick={this.auth}
                            class="button"
                            open-type="getUserInfo" lang="zh_CN"
                            bindgetuserinfo={this.auth}>我知道了</button>
                    </View>
                </View>
            </View>
        ) : null
    }
}