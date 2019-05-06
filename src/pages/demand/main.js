

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, TButton, Text, ScrollView, TModal, TSTab } from '../../ui';
import { ListWrapper, CapsuleChoose } from '../../components';
import { productTypesValue } from '../../constants';
import { getDemandList, getMySelfDemandList } from '../../api';

import DemandItem from './demand-item';
import { navigate, asyncActionWrapper, login } from '../../actions';
import './main.scss';


const tabList = ['全部', '新疆棉', '地产棉', '进口棉$', '进口棉￥'];

@connect(({ data }) => ({ data }))
export default class Demand extends Component {
    state = {
        activeList: '供需对接',
        activeTab: '新疆棉',
    };
    componentWillMount() {
        this.getData();
    }
    componentWillReceiveProps(nextProps) {
        const { status, data } = this.props.data.user;
        if (status !== nextProps.data.user.status) {
            this.getData(nextProps);
        }
    }
    login() {
        login();
    }
    getMyDemand = (props) => {
        const useProps = props || this.props;
        const { status, data } = useProps.data.user;
        const { status: mySelfDataStatus } = useProps.data.my_demand_list;
        if (status === 'success' && mySelfDataStatus !== 'success' && mySelfDataStatus !== 'loading') {
            //获取我的需求
            asyncActionWrapper({
                call: getMySelfDemandList,
                params: { '用户ID': data.id },
                type: 'data',
                key: `my_demand_list`
            });
        }

    }
    getData(props) {
        const useProps = props || this.props;
        const { activeTab } = this.state;
        const { status: dataStatus, loading: dataLoading } = useProps.data[`demand_list_${activeTab}`];

        if (dataStatus !== 'success' && !dataLoading) {
            asyncActionWrapper({
                call: getDemandList,
                params: { '棉花云供需类型': productTypesValue[activeTab] },
                type: 'data',
                key: `demand_list_${activeTab}`
            });
        }
        this.getMyDemand(props);
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
    handleActiveListChange = activeList => {
        this.setState({
            activeList
        });
    }
    render() {
        const { activeTab, activeList } = this.state;
        const { status: dataStatus, data } = this.props.data[`demand_list_${activeTab}`];
        const { status: mySelfDataStatus, data: mySelfData } = this.props.data.my_demand_list;
        const { status: loginStatus } = this.props.data.user;
        return (
            <View className="container">
                <ScrollView>
                    <CapsuleChoose option={['供需对接', '我的需求']} value={activeList} onChange={this.handleActiveListChange} />
                    {
                        activeList === '我的需求' && (
                            <ListWrapper status={mySelfDataStatus} data={mySelfData}>
                                {
                                    dataStatus === 'success' && (
                                        <View className="demand-list">

                                            {
                                                mySelfData.list.map(item => {
                                                    return (
                                                        <DemandItem data={item} map={mySelfData.key} type="self" cottonType={activeTab} />
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                }
                            </ListWrapper>
                        )
                    }
                    {
                        activeList === '供需对接' && (
                            <View>
                                <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                                <ListWrapper status={dataStatus} data={data}>
                                    {
                                        dataStatus === 'success' && (
                                            <View className="demand-list">

                                                {
                                                    data.list.map(item => {
                                                        return (
                                                            <DemandItem map={data.key} data={item} onHandleOffer={this.handleOffer} cottonType={activeTab} />
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    }
                                </ListWrapper>
                                <TButton className="fixed-button" onClick={this.goDemandCustom}>
                                    <View className="submit">
                                        <Text className="submit-text">发布需求</Text>
                                    </View>
                                </TButton>
                            </View>
                        )
                    }


                </ScrollView>

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

