

import React from 'react';
import Taro from '@tarojs/taro';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Image, TButton, Text, ScrollView, TModal } from '../../ui';
import { getAuthInfo, getMobile, getKFList } from '../../api';
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
import { navigate, login, asyncActionWrapper } from '../../actions';
import { authStatusMap } from '../../constants';

const toolList = [
    {
        icon: scImg,
        label: '物流',
        routeName: 'logistics'
    },
    {
        icon: historyImg,
        label: '历史',
        routeName: 'history'
    },
    {
        icon: jsqImg,
        label: '升贴水',
        routeName: 'sts'
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
        routeName: 'recommend'
    },
    {
        icon: feedbackImg,
        label: '用户反馈',
        value: '',
        routeName: 'feedback'
    },
    {
        icon: aboutImg,
        label: '关于我们',
        value: '',
        routeName: 'about'
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
    state = {
        mobile: ''
    }
    componentWillMount() {
        this.getAuthData();
    }
    componentWillUpdate(nextProps) {
        // const { status: prevUserStatus } = this.props.data.user;
        // const { status: nextUserStatus } = nextProps.data.user;
        // console.log(prevUserStatus ,nextUserStatus,'prevUserStatus !== nextUserStatus')
        // if (prevUserStatus !== nextUserStatus && nextUserStatus === 'success' && prevUserStatus!=='success') {
        //     this.getAuthData(nextProps);
        // }

    }
    login() {
        login();
    }

    getAuthData(props) {
        const { data } = props || this.props;
        const { status: userStatus, data: userData } = data.user;
        const { status: authStatus, loading: authLoading } = this.props.data.auth;
        if (userStatus === 'success') {
            if (authStatus !== 'success' && !authLoading) {
                asyncActionWrapper({
                    call: getAuthInfo,
                    params: { 'user_id': userData.id },
                    type: 'data',
                    key: 'auth'
                });
                asyncActionWrapper({
                    call: getKFList,
                    params: { '用户ID': userData.id },
                    type: 'data',
                    key: 'kfList'
                });
            }
        }

    }
    handleClick(current) {
        this.setState({
            current
        });
    }
    getMobile(e) {
        const { encryptedData, iv } = e.detail;
        const { id } = this.props.data.user.data;
        getMobile({
            encrypdata: encryptedData,
            ivdata: iv,
            sessionkey: 'session_key需要我登录返回openid时一起返回跟我'
        })
            .then(res => {
                this.setState({
                    mobile: res.phone
                });
            })
    }
    goAuth = () => {
        const { status: authStatus, data: authData } = this.props.data.auth;
        if (authStatus !== 'success') {
            this.getAuthData();
        } else {
            navigate({
                routeName: 'auth'
            })
        }

    }
    getAuthLabel() {
        const { status: authStatus, data: authData } = this.props.data.auth;

        switch (authStatus) {
            case 'init':
                return '点我获取认证信息';
            case 'loading':
                return '获取中...';
            case 'error':
                return '获取失败';
            default:
                return authData ? authStatusMap[authData.state] : '无数据';
        }
    }
    getCompanyName() {
        const { status: authStatus, data: authData } = this.props.data.auth;
        const { data } = this.props.data.user || {};
        switch (authStatus) {
            case 'init':
                return '点我获取认证信息';
            case 'loading':
                return '获取中...';
            case 'error':
                return '获取失败';
            default:
                return authData ? authData.store_name || data.name : '';
        }
    }
    getMobileLabel() {
        //{}
        const { mobile } = this.state;
        const { status: authStatus, data: authData } = this.props.data.auth;
        const { data } = this.props.data.user || {};
        const myMobile = mobile || data.uer_tel;
        switch (authStatus) {
            case 'init':
                return '请先认证';
            case 'loading':
                return '...';
            case 'error':
                return '请先认证';
            default:
                return authData.state ? myMobile || '请授权获取手机号' : '请先认证';
        }
    }
    go(routeName) {
        if (routeName) {
            navigate({ routeName });
        }
    }
    render() {
        const { mobile } = this.state;
        const { status: loginStatus, data: userData = {} } = this.props.data.user;
        const myMobile = mobile || userData.uer_tel;
        return (
            <ScrollView>
                <View className="container">
                    <View className="user-card">
                        <View className="user-info">
                            <Image className="user-icon" src={userData.img} />
                            <View className="user-info-detail">
                                <View className="auth">
                                    <Text className="company-name">{this.getCompanyName()}</Text>
                                    <TButton onClick={this.goAuth}>
                                        <View className="auth-btn">
                                            <Text className="auth-text">{this.getAuthLabel()}</Text>
                                        </View>
                                    </TButton>
                                </View>
                                <Text className="mobile">{this.getMobileLabel()}</Text>
                            </View>
                        </View>
                        <View className="tool">
                            {
                                toolList.map(item => {
                                    const { icon, label, routeName } = item;
                                    return (
                                        <View className="tool-item-wrapper">
                                            <TButton onClick={this.go.bind(this, routeName)}>
                                                <View className="tool-item">
                                                    <Image src={icon} className="tool-item-icon" />
                                                    <Text className="tool-item-label">{label}</Text>
                                                </View>
                                            </TButton>
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
                                                            {myMobile ?
                                                                (<Text className="item-value">{mobile || userData.uer_tel}</Text>) :
                                                                (
                                                                    <button class='getPhoneNumber' plain="true" open-type='getPhoneNumber' onClick={this.getMobile} bindgetphonenumber={this.getMobile}>点我获取用户手机号</button>
                                                                )
                                                            }
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

