

import React from 'react';
import Taro from '@tarojs/taro';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Image, TButton, Text, ScrollView, TModal } from '../../ui';
import rightImg from '../../img/right.png';
import publishImg from '../../img/publish.png';
import mobileImg from '../../img/mobile.png';
import scImg from '../../img/sc.png';
import demandImg from '../../img/demand.png';
import tjImg from '../../img/tj.png';
import feedbackImg from '../../img/feedback.png';
import aboutImg from '../../img/about.png';
import hmdImg from '../../img/hmd.png';
import bjImg from '../../img/bj.png';
import historyImg from '../../img/history.png';
import jsqImg from '../../img/jsq.png';
import logoImg from '../../img/logo.png';
import './main.scss';
import './component.scss';
import { navigate, login } from '../../actions';

const toolList = [
    {
        icon: scImg,
        label: '物流'
    },
    {
        icon: historyImg,
        label: '历史'
    },
    {
        icon: jsqImg,
        label: '升贴水'
    },
];
const listTop = [
    {
        icon: publishImg,
        label: '我的云报价',
        value: '',
        routeName: 'my-cloud-offer'

    },
    {
        icon: mobileImg,
        label: '手机号',
        value: '13888888888',
        routeName: ''
    }
];
const listBottom = [
    {
        icon: scImg,
        label: '收藏的棉讯',
        value: '',
        routeName: 'cotton-information'
    },
    {
        icon: demandImg,
        label: '我的需求',
        value: '',
        routeName: 'my-demand'
    },
    {
        icon: tjImg,
        label: '推荐二维码',
        value: '',
        routeName: ''
    },
    {
        icon: feedbackImg,
        label: '用户反馈',
        value: '',
        routeName: ''
    },
    {
        icon: aboutImg,
        label: '关于我们',
        value: '',
        routeName: ''
    },
    {
        icon: hmdImg,
        label: '企业黑名单',
        value: '',
        routeName: ''
    }
];
@connect(({ data }) => ({ data }))
export default class User extends Component {
    componentWillMount() {

    }

    login() {
        login();
    }

    componentDidHide() { }
    handleClick(current) {
        this.setState({
            current
        });
    }
    g(e) {
        const {encryptedData,iv} = e.detail;
        const {id} = this.props.data.user.data;
        console.log({

            encrypdata:encryptedData,

            ivdata: iv,

            sessionkey: 'session_key需要我登录返回openid时一起返回跟我'

        })
    }
    render() {
        const { status: loginStatus, data: userData = {} } = this.props.data.user;
        console.log(loginStatus, userData, 'loginStatus,userData');
        return (
            <ScrollView>
                <View className="container">
                    <View className="user-card">
                        <View className="user-info">
                            <Image className="user-icon" src={userData.img} />
                            <View className="user-info-detail">
                                <Text className="company-name">苏州易贸通进出口有限公司</Text>
                                <Text className="mobile">135****2591</Text>
                            </View>
                        </View>
                        <View className="tool">
                            {
                                toolList.map(item => {
                                    const { icon, label } = item;
                                    return (
                                        <View className="tool-item">
                                            <Image src={icon} className="tool-item-icon" />
                                            <Text className="tool-item-label">{label}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View className="list-group">
                        <View className="list mb" >
                            {
                                listTop.map((item, i) => {
                                    const { icon, label, value, routeName } = item;
                                    return (
                                        <TButton onClick={() => {
                                            routeName && navigate({ routeName: item.routeName })
                                        }}>
                                            <View className={classnames('item', {
                                                'item-border': i !== listTop.length - 1
                                            })}>
                                                <View className="item-left">
                                                    <Image className="item-icon" src={icon} />
                                                    <Text className="item-label">{label}</Text>
                                                </View>
                                                {
                                                    label === '手机号' && (
                                                        <View className="item-right">
                                                            <button class='getPhoneNumber' plain="true" open-type='getPhoneNumber' onClick={this.g} bindgetphonenumber={this.g}>点我获取用户手机号</button>
                                                        </View>
                                                    )
                                                }
                                                {
                                                    label !== '手机号' && (
                                                        <View className="item-right">
                                                            {value ? <Text className="item-value">{value}</Text> : null}
                                                            <Image src={rightImg} className="item-right-icon" />
                                                        </View>
                                                    )
                                                }

                                            </View>
                                        </TButton>
                                    )
                                })
                            }
                        </View>
                        <View className="list" >
                            {
                                listBottom.map((item, i) => {
                                    const { icon, label, value, routeName } = item;
                                    return (
                                        <TButton onClick={() => {
                                            routeName && navigate({ routeName: item.routeName })
                                        }}>
                                            <View className={classnames('item', {
                                                'item-border': i !== listBottom.length - 1
                                            })}>
                                                <View className="item-left">
                                                    <Image className="item-icon" src={icon} />
                                                    <Text className="item-label">{label}</Text>
                                                </View>
                                                <View className="item-right">
                                                    {value ? <Text className="item-value">{value}</Text> : null}
                                                    <Image src={rightImg} className="item-right-icon" />
                                                </View>
                                            </View>
                                        </TButton>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <TModal
                    visible={loginStatus !== 'success'}
                    onConfirm={this.login}
                    confirmText="授权登录"
                    onClose={this.login}
                    hasCancalButton={false}
                >
                    <View className="authorization">
                        <Text className="authorization-text">请先授权登录</Text>
                    </View>
                </TModal>
            </ScrollView>
        )
    }
}

