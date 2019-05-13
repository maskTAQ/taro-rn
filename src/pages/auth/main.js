

import React from 'react';
import Taro from '@tarojs/taro';
import { Component, connect } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { View, TButton, Text, ScrollView } from '../../ui';
import { StatusBox } from '../../components';
import Card from './card';
import { authInfo, getAuthInfo, getKFList, addKF, deleteKF } from '../../api';
import './main.scss';
import './component.scss';
import { asyncActionWrapper } from '../../actions';
import { authStatusMap } from '../../constants';
import { Tip } from '../../utils';

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
        key: "客服名称",
        label: "客服名称"
    },
    {
        key: "客服电话",
        label: "客服电话"
    }
];
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
        newAddKfInfo: {},
        kfInfoList: kfInfoGroup,
    };
    componentWillMount() {
        const { user, kfList } = this.props.data;
        const { status, data } = kfList;
        if (!['loading', 'success'].includes(status)) {
            asyncActionWrapper({
                call: getKFList,
                params: { '用户ID': user.data.id },
                type: 'data',
                key: 'kfList'
            });
        }
    }
    getKFList = () => {
        asyncActionWrapper({
            call: getKFList,
            params: { '用户ID': this.props.data.user.data.id },
            type: 'data',
            key: 'kfList'
        });
    }
    startAuth = () => {
        this.setState({
            hasClickAuthBtn: true,
        });
    }
    submit = () => {
        const { params } = this.state;
        const { id } = this.props.data.user.data;
        authInfo({ ...params, 'user_id': id })
            .then(res => {
                asyncActionWrapper({
                    call: getAuthInfo,
                    params: { 'user_id': id },
                    type: 'data',
                    key: 'auth'
                });
                this.setState({
                    hasClickAuthBtn: false
                });
                Tip.success('提交成功');
            })
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
    computedKFList() {
        const { status, data } = this.props.data.kfList;
        if (status === "success") {
            const { key, list } = data;
            const result = [];
            list.forEach(item => {
                result.push({
                    '客服名称': item[key["客服名称"]],
                    '客服电话': item[key["客服电话"]],
                    id: item[key["主键"]]
                });
            });
            return result;
        } else {
            return [];
        }
    }
    handleKfInfoChange({ key, value }) {
        const next = { ...this.state.newAddKfInfo };
        next[key] = value;
        this.setState({
            newAddKfInfo: next
        })
    }
    handleAddKf() {
        const { id } = this.props.data.user.data;
        addKF({
            '用户ID': id,
            ...this.state.newAddKfInfo
        }).then(res => {
            this.getKFList();
            Tip.success("添加成功");
        });
    }
    deleteKf(i) {
        const { id } = this.props.data.user.data;
        deleteKF({
            '用户ID': id,
            "客服列表的主键": i
        }).then(res => {
            this.getKFList();
            Tip.success("删除成功成功");
        });
    }
    render() {
        const { isAuth, hasClickAuthBtn, kfInfoList, params, newAddKfInfo } = this.state;
        const { auth, kfList } = this.props.data;
        const { status, data } = auth;//auth, auth: { state },
        const authStatusClassName = isAuth ? 'has-auth' : hasClickAuthBtn ? 'auth' : 'no-auth';
        const state = data ? +data.state : NaN;
        const showCard = hasClickAuthBtn || state === 2;
        const value = state === 2 ? data : params;
        return (
            <View className="container">
                <StatusBox status={status}>
                    {
                        status === 'success' && (
                            <ScrollView>
                                {!hasClickAuthBtn && (<View className="auth-status-box">
                                    <View className="auth-status-header">
                                        <Text className="auth-status-header-text">
                                            认证状态
                            </Text>
                                    </View>
                                    <View className="auth-status-value">
                                        <Text className={classnames("auth-status-value-text", authStatusClassName)}>
                                            {authStatusMap[state]}
                                        </Text>
                                    </View>
                                </View>)}
                                {
                                    [0, 3].includes(state) && !hasClickAuthBtn && (
                                        <TButton onClick={this.startAuth}>
                                            <View className="btn auth">
                                                <Text className="btn-text">{state ? '重新认证' : '认证'}</Text>
                                            </View>
                                        </TButton>
                                    )
                                }
                                {
                                    showCard && (
                                        <View>
                                            <Card option={topList} title="认证信息" type="input" data={value} state={state} onChange={this.handleChange} />
                                            <Card
                                                onRequestAddKf={this.handleAddKf}
                                                onRequestDeleteKf={this.deleteKf}
                                                option={kfInfoList}
                                                kfList={this.computedKFList()}
                                                title="客服信息" type="kf"
                                                data={newAddKfInfo}
                                                state={state}
                                                onChange={this.handleKfInfoChange} />
                                            <Card option={imgList} title="图片信息" type="img" data={value} state={state} onChange={this.handleChange} />
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

                        )
                    }
                </StatusBox>
            </View>

        )
    }
}

