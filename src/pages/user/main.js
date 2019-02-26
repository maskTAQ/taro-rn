

import React from 'react';
import { Component } from '../../platform';

import classnames from 'classnames';
import { View, Image, TButton, Text, ScrollView } from '../../ui';
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
import { navigate } from '../../actions';
const toolList = [
    {
        icon: scImg,
        label: '收藏'
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
        label: '我的发布',
        value: '',
        routeName: 'publish-import-cotton'

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
        icon: bjImg,
        label: '我的报价',
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

export default class User extends Component {


    state = {

    };
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleClick(current) {
        this.setState({
            current
        });
    }
    render() {
        return (
            <ScrollView>
                <View className="container">
                    <View className="user-card">
                        <View className="user-info">
                            <Image className="user-icon" src={logoImg} />
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
                                                <View className="item-right">
                                                    {value ? <Text className="item-value">{value}</Text>:null}
                                                    <Image src={rightImg} className="item-right-icon" />
                                                </View>
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
                                                    {value ? <Text className="item-value">{value}</Text>:null}
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
            </ScrollView>
        )
    }
}

