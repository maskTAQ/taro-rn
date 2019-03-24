

import React from 'react';
import Taro from '@tarojs/taro';
import { Component, connect } from '../../platform';
import classnames from 'classnames';

import { View, Image, TButton, Text, ScrollView, TModal } from '../../ui';
import Card from './card';
import { authInfo } from '../../api';
import './main.scss';
import './component.scss';
import { navigate, login } from '../../actions';
import { authStatusMap } from '../../constants';

const topList = [
    {
        label: '负责人',
        placeholder: '请输入负责人',
        key: 'a',
    },
    {
        label: '手机号码',
        placeholder: '请输入负责人',
        key: 'a',
    },
    {
        label: '行业',
        placeholder: '请输入负责人',
        key: 'a',
    },
    {
        label: '企业名称',
        placeholder: '请输入负责人',
        key: 'a',
    },
    {
        label: '企业代码(执照号)',
        placeholder: '请输入负责人',
        key: 'a',
    },
    {
        label: '单位地址',
        placeholder: '请输入负责人',
        key: 'a',
    }
];
const kfInfoGroup = [
    {
        label: '客服名称'
    },
    {
        label: '客服电话'
    }
]
const imgList = [
    {
        label: '营业执照',
        key: 'a'
    },
    {
        label: '法人身份证',
        key: 'b'
    }
]
@connect(({ data }) => ({ data }))
export default class Auth extends Component {
    state = {
        auth: {
            state: 3
        },
        isAuth: false,
        hasClickAuthBtn: false,
        kfInfoList: [...kfInfoGroup]
    };
    g(e) {
        const { encryptedData, iv } = e.detail;
        const { id } = this.props.data.user.data;
        console.log({

            encrypdata: encryptedData,

            ivdata: iv,

            sessionkey: 'session_key需要我登录返回openid时一起返回跟我'

        })
    }
    startAuth = () => {
        this.setState({
            hasClickAuthBtn: true,
        });
    }
    submit = () => {
        authInfo()
            .then(res => {
                console.log(res, 'res');
            })
    }
    handleAddKf = () => {
        const next = [...this.state.kfInfoList];
        this.setState({
            kfInfoList: next.concat(kfInfoGroup)
        });
    }
    render() {
        const { isAuth, hasClickAuthBtn, kfInfoList, auth: { state } } = this.state;
        const { status: loginStatus, data: userData = {} } = this.props.data.user;
        const authStatus = isAuth ? '已认证' : hasClickAuthBtn ? '认证中' : '企业未认证';
        const authStatusClassName = isAuth ? 'has-auth' : hasClickAuthBtn ? 'auth' : 'no-auth';
        const showCard = hasClickAuthBtn || state === 2;
        console.log(showCard, 'showCard')
        return (

            <View className="container">
                <ScrollView>
                    {!hasClickAuthBtn && (<View className="auth-status-box">
                        <View className="auth-status-header">
                            <Text className="auth-status-header-text">
                                认证状态
                            </Text>
                        </View>
                        <View className="auth-status-value">
                            <Text className={classnames("auth-status-value-text", authStatusClassName)}>
                                {authStatusMap[auth.state]}
                            </Text>
                        </View>
                    </View>)}
                    {
                        [0, 3].includes(state) && !hasClickAuthBtn && (
                            <TButton onClick={this.startAuth}>
                                <View className="btn auth">
                                    <Text className="btn-text">{auth.state ? '重新认证' : '认证'}</Text>
                                </View>
                            </TButton>
                        )
                    }
                    {
                        showCard && (
                            <View className="a">
                                <Card option={topList} title="认证信息" type="input" state={state} data={auth} />
                                <Card onRequestAddKf={this.handleAddKf} option={kfInfoList} title="客服信息" type="kf" state={state} data={auth} />
                                <Card option={imgList} title="图片信息" type="img" state={state} data={auth} />
                            </View>
                        )
                    }
                    {
                        isAuth && (
                            <Text className="btn-text">已认证</Text>
                        )
                    }
                    {
                        hasClickAuthBtn && (
                            <TButton onClick={this.submit}>
                                <View className="btn auth">
                                    <Text className="btn-text">提交申请</Text>
                                </View>
                            </TButton>
                        )
                    }
                </ScrollView>
            </View>

        )
    }
}

