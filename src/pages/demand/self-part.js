
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

export default class SelfPart extends Component {
    g = k => {
        const { map, data } = this.props;
        return data[map[k]] || '';
    }
    delete = (id) => {
        const { user } = this.props;
        const userId = user.id;
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
        const { user } = this.props;
        const userId = user.id;
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
        const { data, onEdit } = this.props;
        return (
            <View>
                <View className="desc-list">
                    <View className="desc-text-box">
                        <Text className="desc-text">交货地:{g('交货地')}</Text>
                    </View>
                    <View className="desc-text-box">
                        <Text className="desc-text">买家:{g('买家')}</Text>
                    </View>
                </View>
                <View className="bottom">
                    <View className="bottom-left">
                        <Text className="jiaohuo-label">最晚交货时间</Text>
                        <Text className="jiaohuo-value">{g('最晚交货时间')}</Text>

                    </View>
                    <View className="btn-group-center">
                        <Text className="buy-label">{g('价格最低')}元-{g('价格最高')}元</Text>
                        <Text className="buy-value">{g('数量')}{g('数量单位')}</Text>
                    </View>
                    <View className="btn-group-right">
                        {
                            /*
                            <TButton onClick={this.goHome.bind(this, g('主键'))}>
                            <View className="btn-column">
                                <Image src={viewIcon} className="btn-icon" />
                                <Text className="btn-text view-btn-text">查看</Text>
                            </View>
                        </TButton>
                            */
                        }
                        <TButton>
                            <View className="btn-column" onClick={onEdit.bind(this, data)}>
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
                </View>
            </View>
        )

    }
}