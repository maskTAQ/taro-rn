

import React from 'react';
import { Component, connect } from '../../platform';

import { View, TButton, Text, ScrollView, TModal, TSTab } from '../../ui';
import { ListWrapper, CapsuleChoose, DemandItem } from '../../components';
import { productTypesValue, authStatusMap } from '../../constants';
import { getDemandList, getMySelfDemandList } from '../../api';

import SelfPart from './self-part';
import AllPart from './all-part';
import { navigate, asyncActionWrapper, login } from '../../actions';
import './main.scss';
import { Tip } from '../../utils';

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
        const { status, data } = this.props.data.auth;
        switch (status) {
            case "success": {
                if (data.state === '2') {
                    navigate({ routeName: 'demand-custom' });
                } else {
                    Tip.fail(authStatusMap[data.state]);
                }
                break;
            }
            case 'loading':
                Tip.fail('获取信息中...');
                break;
            case 'error':
                Tip.fail('获取信息失败');
                break;
        }
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
    handleEdit = data => {
        const { key } = this.props.data.my_demand_list.data;
        const result = {
            isEdit: true
        };
        for (const field in key) {
            const v = data[key[field]];
            if (v && v !== 'undefined') {
                result[field] = v;
            }
        }
        navigate({
            routeName: 'demand-custom',
            params: result
        });
    }
    render() {
        const { activeTab, activeList } = this.state;
        const { status: dataStatus, data } = this.props.data[`demand_list_${activeTab}`];
        const { status: mySelfDataStatus, data: mySelfData } = this.props.data.my_demand_list;
        const { status: loginStatus, data: userData } = this.props.data.user;
        return (
            <View className="container">
                <ScrollView>
                    <CapsuleChoose option={['供需对接', '我的需求']} value={activeList} onChange={this.handleActiveListChange} />
                    {
                        activeList === '我的需求' && (
                            <View>
                                <ListWrapper status={mySelfDataStatus} data={mySelfData}>
                                    {
                                        dataStatus === 'success' && (
                                            <View className="demand-list">

                                                {
                                                    mySelfData.list.map(item => {

                                                        return (
                                                            <DemandItem data={item} map={mySelfData.key} cottonType={activeTab}>
                                                                <SelfPart user={userData} onEdit={this.handleEdit} data={item} map={mySelfData.key} cottonType={activeTab} dispatch={this.props.dispatch} />
                                                            </DemandItem>
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
                                                            <DemandItem map={data.key} data={item} cottonType={activeTab}>
                                                                <AllPart map={data.key} data={item} cottonType={activeTab} onHandleOffer={this.handleOffer} />
                                                            </DemandItem>
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    }
                                </ListWrapper>


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

