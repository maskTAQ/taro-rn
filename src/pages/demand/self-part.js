
import React from 'react';
import { Component } from '../../platform';
import { deleteMyDemand, getMySelfDemandList, getOfferList } from '../../api';
import { asyncActionWrapper, navigate } from '../../actions';
import { Tip } from '../../utils';

import { View, Text, Image, TButton } from '../../ui';
import editIcon from './img/edit.png';
import deleteIcon from './img/close.png';
import viewIcon from './img/view.png';
import './part.scss';
import offerIcon from './img/offer.png';

export default class SelfPart extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
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
    goHome(id) {
        const { cottonType } = this.props;
        console.log(id, 'id')
        asyncActionWrapper({
            call: getOfferList,
            params: { '云需求主键': id, '棉花云报价类型': this.g('棉花云供需类型') },
            type: 'data',
            key: `offer_list_${cottonType}`,
        });
        this.props.dispatch({
            type: 'setHomeActiveTab',
            payload: cottonType
        });
        navigate({ routeName: 'home' });
    }
    render() {
        const { g } = this;
        return (
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
                    <TButton onClick={this.goHome.bind(this, g('主键'))}>
                        <View className="view-resource-btn">
                            <Image src={viewIcon} className="btn-icon" />
                            <Text className="view-resource-btn-text">查看资源</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )

    }
}