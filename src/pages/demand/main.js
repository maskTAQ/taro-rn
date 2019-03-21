

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, TButton, Text, ScrollView, TModal, TInput, TRadio, TLoading, TSTab } from '../../ui';
import { getDemandList, getMySelfDemandList } from '../../api';
import DemandItem from './demand-item';
import { navigate, asyncActionWrapper, login } from '../../actions';
import './main.scss';

const modalList = [
    {
        label: '数量',
        type: 'input',
        placeholder: '请输入数量'
    },
    {
        label: '单位',
        type: 'radio',
        option: [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }]
    },
    {
        label: '自提价',
        type: 'input',
        placeholder: '请输入自提价'
    },
    {
        label: '到厂家',
        type: 'input',
        placeholder: '请输入到厂家'
    },
];
const tabList = ['新疆棉', '进口棉￥', '进口棉$', '地产棉'];

@connect(({ data }) => ({ data }))
export default class Demand extends Component {
    state = {
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['zhc', 'ck', 'gys'],
        modal: {
            visible: false,
            data: null
        },
        unit: '吨',

        activeTab: '新疆棉',

    };
    componentWillMount() {
        asyncActionWrapper({
            call: getMySelfDemandList,
            params: { 'ID': 1 },
            type: 'data',
            key: `my_demand_list`
        });
        this.getData();
    }
    login() {
        login();
    }
    getData() {
        const { activeTab } = this.state;
        const { status: dataStatus, loading: dataLoading } = this.props.data[`demand_list_${activeTab}`];

        if (dataStatus !== 'success' && !dataLoading) {
            asyncActionWrapper({
                call: getDemandList,
                params: { '棉花云供需类型': tabList.indexOf(activeTab) + 1 },
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
    handleOffer(data) {
        this.setState(update(this.state, {
            modal: {
                visible: {
                    $set: true
                },
                data: {
                    $set: data
                }
            }
        }));
    }
    handleUnitChange = item => {
        this.setState({
            unit: item.value
        });
    }
    closeModal = () => {
        this.setState(update(this.state, {
            modal: {
                visible: {
                    $set: false
                }
            }
        }));
    }
    submit = () => {
        this.closeModal();
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
        const { status: loginStatus} = this.props.data.user;
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
                                    mySelfData.list.length === 0 && <Text className="no-data">暂无数据</Text>
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

                    {
                        dataStatus === 'loading' && <TLoading />
                    }
                    {
                        dataStatus === 'success' && (
                            <View className="demand-list">
                                <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
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
                </ScrollView>
                <TButton className="fixed-button" onClick={this.goDemandCustom}>
                    <View className="submit">
                        <Text className="submit-text">发布需求</Text>
                    </View>
                </TButton>
                <TModal visible={modal.visible} title="我要报价" onClose={this.closeModal} onCancel={this.closeModal} onConfirm={this.submit}>
                    {
                        modalList.map((item) => {
                            const { label, type, placeholder, option } = item;
                            return (
                                <View className="item">
                                    <Text className="item-label">{label}</Text>
                                    {
                                        type === 'input' ? (
                                            <TInput className="item-input" placeholder={placeholder} />
                                        ) : (
                                                <TRadio option={option} checkd={unit} onCheckdChange={this.handleUnitChange} />
                                            )
                                    }
                                </View>
                            )
                        })
                    }
                </TModal>
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

