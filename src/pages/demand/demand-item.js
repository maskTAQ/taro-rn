import React from 'react';
import { Component, connect } from '../../platform';

import { View, Text, Image, TButton } from '../../ui';
import { deleteMyDemand, getMySelfDemandList } from '../../api';
import { asyncActionWrapper } from '../../actions';
import {Tip} from '../../utils';
import editIcon from './img/edit.png';
import deleteIcon from './img/close.png';
import viewIcon from './img/view.png';
import offerIcon from './img/offer.png';
import './demand-item.scss'

const list = [
    { label: "等级", key: "颜色级" },
    { label: "长度", key: "长度" },
    { label: "强力", key: "强力" }, {
        label: "马值", key: "马克隆值"
    }, {
        label: "含杂",
        key: "平均含杂"
    }, {
        label: "回潮",
        key: "回潮"
    }, {
        label: "长整",
        key: "整齐度"
    }];

@connect(({ data }) => ({ user: data.user }))
export default class DemanidItem extends Component {
    static options = {
        addGlobalClass: true
    }
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '-';
    }
    delete = (id) => {
        const { data } = this.props.user;
        const userId = data.id;
        deleteMyDemand({
            '主键': id,
            '用户ID': userId
        })
            .then(res => {
                Tip.success('删除成功');
                setTimeout(this.getMyDemand, 1000);
            })
    }
    getMyDemand = () => {
        const { data } = this.props.user;
        const userId = data.id;
        //获取我的需求
        asyncActionWrapper({
            call: getMySelfDemandList,
            params: { '用户ID': userId },
            type: 'data',
            key: `my_demand_list`
        });
    }
    render() {
        const { g } = this;

        const { type = 'other', onHandleOffer, data } = this.props;
        return (
            <View className="container">
                <View className="content">
                    <View className="top">
                        <Text className="title">{g('需求号')} {g('类型')}</Text>
                    </View>
                    <View className="center">
                        {
                            list.map(item => {
                                const { label, key } = item;
                                return (
                                    <View className="item">
                                        <Text className="item-label">{label}</Text>
                                        <Text className="item-value">{g(key)}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    {
                        type === 'self' ? (
                            <View className="desc-list">
                                <View className="desc-text-box">
                                    <Text className="desc-text">交货地:{g('交货仓库或方式')}</Text>
                                </View>
                            </View>
                        ) : (
                                <View className="desc-list">
                                    <View className="desc-text-box">
                                        <Text className="desc-text">交货地:{g('交货仓库或方式')}</Text>
                                    </View>
                                    <View className="desc-text-box">
                                        <Text className="desc-text">买家:{g('交货仓库或方式')}</Text>
                                    </View>
                                </View>
                            )
                    }
                    {
                        type === 'self' ? (
                            <View className="bottom">
                                <View className="btn-group-left">
                                    <TButton>
                                        <View className="btn-column">
                                            <Image src={editIcon} className="btn-icon" />
                                            <Text className="btn-text edit-btn-text">修改</Text>
                                        </View>
                                    </TButton>
                                    <TButton onClick={this.delete.bind(this, g('主键'))}>
                                        <View className="btn-column">
                                            <Image src={deleteIcon} className="btn-icon" />
                                            <Text className="btn-text delete-btn-text">删除</Text>
                                        </View>
                                    </TButton>
                                </View>
                                <View className="btn-group-center">
                                    <Text className="price-value">15257</Text>
                                    <Text className="price-label">平台最优价格</Text>
                                </View>
                                <View className="btn-group-right">
                                    <TButton>
                                        <View className="view-resource-btn">
                                            <Image src={viewIcon} className="btn-icon" />
                                            <Text className="view-resource-btn-text">查看资源</Text>
                                        </View>
                                    </TButton>
                                </View>
                            </View>
                        ) : (
                                <View className="bottom">
                                    <View className="bottom-left">
                                        <Text className="jiaohuo-label">最晚交货时间</Text>
                                        <Text className="jiaohuo-value">2019-04-02</Text>
                                    </View>
                                    <View className="btn-group-center">
                                        <Text className="buy-label">采购中</Text>
                                        <Text className="buy-value">1000吨</Text>
                                    </View>
                                    <View className="btn-group-right">
                                        <TButton onClick={onHandleOffer.bind(this, data)}>
                                            <View className="offer-btn">
                                                <Image src={offerIcon} className="btn-icon" />
                                                <Text className="offer-btn-text">我要报价</Text>
                                            </View>
                                        </TButton>
                                    </View>
                                </View>

                            )
                    }
                </View>
            </View>
        )
    }
}


