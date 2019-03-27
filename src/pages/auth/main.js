

import React from 'react';
import Taro from '@tarojs/taro';
import { Component, connect } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { View, Image, TButton, Text, ScrollView, TModal } from '../../ui';
import Card from './card';
import { authInfo } from '../../api';
import './main.scss';
import './component.scss';
import { navigate, login } from '../../actions';
import { authStatusMap } from '../../constants';

const topList = [
    {
        label: "负责人",
        placeholder: "请输入负责人",
        key: "user_name"
    },
    {
        label: "手机号码",
        placeholder: "请输入负责人",
        key: "tel"
    },
    {
        label: "行业",
        placeholder: "请输入负责人",
        key: "sfz_img2"
    },
    {
        label: "企业名称",
        placeholder: "请输入负责人",
        key: "store_name"
    },
    {
        label: "企业代码(执照号)",
        placeholder: "请输入负责人",
        key: "sp_img"
    },
    {
        label: "单位地址",
        placeholder: "请输入负责人",
        key: "address"
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
        label: "营业执照",
        key: "img"
    },
    {
        label: "法人身份证",
        key: "fsz_img"
    }
]
@connect(({ data }) => ({ data }))
export default class Auth extends Component {
    state = {
        auth: {
            state: 0
        },
        isAuth: false,
        hasClickAuthBtn: false,
        params: {},
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
        const { params } = this.state;
        authInfo(params)
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
    handleChange = ({ key, value }) => {
        this.setState(update(this.state, {
            params: {
                [key]: {
                    $set: value
                }
            }
        }));
    }
    render() {
        const { isAuth, hasClickAuthBtn, kfInfoList, auth, auth: { state }, params } = this.state;
        const authStatusClassName = isAuth ? 'has-auth' : hasClickAuthBtn ? 'auth' : 'no-auth';
        const showCard = hasClickAuthBtn || state === 2;
        console.log(params,'params');
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
                            <View>
                                <Card option={topList} title="认证信息" type="input" data={params} state={auth.state} onChange={this.handleChange} />
                                <Card onRequestAddKf={this.handleAddKf} option={kfInfoList} title="客服信息" type="kf" data={params} state={auth.state} onChange={this.handleChange} />
                                <Card option={imgList} title="图片信息" type="img" data={params} state={auth.state} onChange={this.handleChange} />
                            </View>
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
