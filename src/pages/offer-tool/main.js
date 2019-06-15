

import React from 'react';
import { Component, connect } from '../../platform';

import { View, Image, TButton, Text, TModal } from '../../ui';
import { productTypesValue, authStatusMap } from '../../constants';
import './main.scss';
import cloudImg from '../../img/cloud.png';
import { navigate, login } from '../../actions';
import { Tip } from '../../utils';

@connect(({ data }) => ({ data }))
export default class OfferTool extends Component {
    state = {
        hasClick: false
    }
    checkAuth() {
        const { status, data } = this.props.data.auth;
        switch (status) {
            case "success": {
                if (data.state === '2') {
                    return {
                        ok: true,
                    }
                } else {
                    navigate({
                        routeName: 'auth'
                    })
                    return {
                        ok: false,
                        msg: authStatusMap[data.state]
                    }
                }
            }
            case 'loading':
                return {
                    ok: false,
                    msg: '获取信息中...'
                }

            case 'error':
                return {
                    ok: false,
                    msg: '获取信息失败'
                }
        }
    }
    goAddBatch(type) {
        const result = this.canJump();
        const { ok, msg } = this.checkAuth();
        if (!ok) {
            return Tip.fail(msg);
        }
        result && navigate({ routeName: 'add-batch', params: { '棉花云报价类型': productTypesValue[type], type } });
    }
    goImportCotton() {
        const result = this.canJump();
        const { ok, msg } = this.checkAuth();
        if (!ok) {
            return Tip.fail(msg);
        }
        result && navigate({ routeName: 'publish-import-cotton' });
    }
    canJump = () => {
        const { status: loginStatus } = this.props.data.user;
        this.setState({
            hasClick: true
        });
        return loginStatus === 'success';
    }
    login() {
        login();
    }
    render() {
        const { hasClick } = this.state;
        const { status: loginStatus } = this.props.data.user;
        return (
            <View className='container'>
                <View className="content mb">
                    <TButton className="btn" onClick={this.goAddBatch.bind(this, '新疆棉')}>
                        <View className="item">
                            <View className="item-icon-box item-bg-1">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">新疆棉</Text>
                        </View>
                    </TButton>
                    <TButton className="btn" onClick={this.goImportCotton}>
                        <View className="item">
                            <View className="item-icon-box item-bg-2">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">进口棉(￥/$)</Text>
                        </View>
                    </TButton>
                </View>
                <View className="content">
                    <TButton className="btn" onClick={this.goAddBatch.bind(this, '地产棉')}>
                        <View className="item">
                            <View className="item-icon-box item-bg-3">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">地产棉</Text>
                        </View>
                    </TButton>
                    <TButton className="btn" onClick={this.goAddBatch.bind(this, '拍储')}>
                        <View className="item">
                            <View className="item-icon-box item-bg-4">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">拍储棉</Text>
                        </View>
                    </TButton>
                </View>
                <TModal
                    visible={loginStatus !== 'success' && hasClick}
                    onConfirm={this.login}
                    confirmText="授权登录"
                    onClose={this.login}
                    hasCancalButton={false}
                >
                    <View className="authorization">
                        <Text className="authorization-text">请先授权登录</Text>
                    </View>
                </TModal>
            </View>
        )
    }
}

