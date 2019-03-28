

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, TButton, Text, ScrollView, TModal, TInput, TRadio, TLoading, TSTab } from '../../ui';
import { ListWrapper } from '../../components';
import {productTypesValue} from '../../constants';
import { getDemandList, getMySelfDemandList } from '../../api';

import DemandItem from './demand-item';
import { navigate, asyncActionWrapper, login } from '../../actions';
import './main.scss';


const tabList = ['全部','新疆棉', '地产棉', '进口棉$', '进口棉￥'];

@connect(({ data }) => ({ data }))
export default class Demand extends Component {
    state = {
        activeTab: '新疆棉',
    };
    componentWillMount() {
        //this.getMyDemand();
        this.getData();
    }
    login() {
        login();
    }
    getMyDemand=()=>{
        const { data } = this.props.data.user;
        const userId = data.id;
        console.log({
            call: getMySelfDemandList,
            params: { '用户ID': userId },
            type: 'data',
            key: `my_demand_list`
        });
         //获取我的需求
         asyncActionWrapper({
            call: getMySelfDemandList,
            params: { '用户ID': userId },
            type: 'data',
            key: `my_demand_list`
        });
    }
    getData() {
        const { activeTab } = this.state;
        const { status: dataStatus, loading: dataLoading } = this.props.data[`demand_list_${activeTab}`];

        if (dataStatus !== 'success' && !dataLoading) {
            asyncActionWrapper({
                call: getDemandList,
                params: { '棉花云供需类型': productTypesValue[activeTab] },
                type: 'data',
                key: `demand_list_${activeTab}`
            });
        }
    }
    handleClick = (current) => {
        this.setState({
            current
        });
    }
    handleOffer(item) {
        const { activeTab } = this.state;
        const { data } = this.props.data[`demand_list_${activeTab}`];
        navigate({ routeName: 'demand-detail', params: { data: item, map: data.key } });
    }

    goDemandDetail() {
        navigate({ routeName: 'demand-detail' });
    }
    goDemandCustom() {
        navigate({ routeName: 'demand-custom' });
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        }, this.getData);
    }
    render() {
        const { modal, unit, activeTab } = this.state;
        const { status: dataStatus, data } = this.props.data[`demand_list_${activeTab}`];
        const { status: mySelfDataStatus, data: mySelfData } = this.props.data.my_demand_list;
        const { status: loginStatus } = this.props.data.user;
        return (
            <View className="container">
                <ScrollView>
                    {
                        mySelfDataStatus === 'success' && (
                            <View className="condition">
                                <View className="condition-title">
                                    <Text className="condition-title-text">定制牌价</Text>
                                </View>
                                {
                                    mySelfData.list.length === 0 && (
                                        <View className="no-data">
                                            <Text className="no-data-text">暂无牌价,请发布</Text>
                                        </View>
                                    )
                                }
                                {
                                    mySelfData.list.map(item => {
                                        return (
                                            <DemandItem data={item} map={mySelfData.key} type="self" />
                                        )
                                    })
                                }
                            </View>
                        )
                    }
                    <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                    <ListWrapper status={dataStatus} data={data}>
                        {
                            dataStatus === 'success' && (
                                <View className="demand-list">

                                    {
                                        data.list.map(item => {
                                            return (
                                                <DemandItem map={data.key} data={item} onHandleOffer={this.handleOffer} />
                                            )
                                        })
                                    }
                                </View>
                            )
                        }
                    </ListWrapper>

                </ScrollView>
                <TButton className="fixed-button" onClick={this.goDemandCustom}>
                    <View className="submit">
                        <Text className="submit-text">发布需求</Text>
                    </View>
                </TButton>

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
            </View>
        )
    }
}

