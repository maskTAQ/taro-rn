

import React from 'react';
import { Component, connect } from '../../platform';

import { View, ScrollView, TSTab, TButton, Image } from '../../ui';
import { MainItem, ListWrapper } from '../../components';
import { getMyOfferList, getMySelfDemandList, deleteMyDemand, deleteMyOffer } from '../../api';
import { asyncActionWrapper } from '../../actions';
import { Tip } from '../../utils';
import './main.scss';
import refreshImg from './img/refresh.png';
import editImg from './img/edit.png';
import MyOfferItem from './my-offer-item.js';



@connect(({ data }) => ({ data }))
export default class MyDemand extends Component {


    state = {
        activeTab: '我的需求',
    };
    componentWillMount() {
        this.getData();
    }
    getData() {
        this.getMyOffer();
        this.getMyDemand();
    }
    getMyOffer = () => {
        const { data } = this.props.data.user;
        const userId = data.id;
        //获取我的报价
        asyncActionWrapper({
            call: getMyOfferList,
            params: { '用户ID': userId },
            type: 'data',
            key: `my_offer_list`
        });
    }
    getMyDemand = () => {
        const { data } = this.props.data.user;
        const userId = data.id;
        //获取我的需求
        asyncActionWrapper({
            call: getMySelfDemandList,
            params: { '用户ID': userId },
            type: 'data',
            key: `my_demand_list`
        });
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        });
    }
    delete = (id) => {
        const { activeTab } = this.state;
        const { data } = this.props.data.user;
        const userId = data.id;
        if (activeTab === '我的需求') {
            deleteMyDemand({
                '主键': id,
                '用户ID': userId
            })
                .then(res => {
                    Tip.success('删除成功');
                    setTimeout(this.getMyDemand, 1000);
                })
        } else {
            deleteMyOffer({
                '主键': id
            })
                .then(res => {

                    Tip.success('删除成功');
                    setTimeout(this.getMyOffer, 1000);
                })
        }
    }
    render() {
        const { activeTab } = this.state;
        const tabList = ["我的需求", "我的报价"];
        const { my_demand_list, my_offer_list } = this.props.data;
        const { status: my_offer_list_status, data: my_offer_list_data } = my_offer_list;
        const { status: my_demand_list_status, data: my_demand_list_data } = my_demand_list;

        const data = activeTab === '我的需求' ? my_demand_list_data : my_offer_list_data;
        const status = activeTab === '我的需求' ? my_demand_list_status : my_offer_list_status;

        return (
            <View className='container'>

                <ScrollView>
                    <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                    <ListWrapper data={data} status={status}>
                        {
                            status === 'success' && data.list.map((item) => {
                                return (
                                    <View>
                                        {
                                            activeTab === '我的需求' ? (
                                                <MainItem border={false} data={item} map={data.key} key={item.id}>
                                                    <View className="tool-btn-group">
                                                        <TButton onClick={this.delete.bind(this, item[data.key['主键']])}>
                                                            <View className="btn">
                                                                <Text className="btn-text">删除</Text>
                                                            </View>
                                                        </TButton>
                                                        <View className="btn-group-right">
                                                            <TButton onClick={this.getData}>
                                                                <View className="btn mr">
                                                                    <Image className="btn-icon" src={refreshImg} />
                                                                    <Text className="btn-text">刷新</Text>
                                                                </View>
                                                            </TButton>
                                                            <TButton onClick={this.edit}>
                                                                <View className="btn">
                                                                    <Image className="btn-icon" src={editImg} />
                                                                    <Text className="btn-text">编辑</Text>
                                                                </View>
                                                            </TButton>
                                                        </View>
                                                    </View>
                                                </MainItem>
                                            ) : (<MyOfferItem data={item} map={data.key} key={item.id}>
                                                <View className="tool-btn-group">
                                                    <TButton onClick={this.delete.bind(this, item[data.key['主键']])}>
                                                        <View className="btn">
                                                            <Text className="btn-text">删除</Text>
                                                        </View>
                                                    </TButton>
                                                    <View className="btn-group-right">
                                                        <TButton onClick={this.getData}>
                                                            <View className="btn mr">
                                                                <Image className="btn-icon" src={refreshImg} />
                                                                <Text className="btn-text">刷新</Text>
                                                            </View>
                                                        </TButton>
                                                        <TButton onClick={this.edit}>
                                                            <View className="btn">
                                                                <Image className="btn-icon" src={editImg} />
                                                                <Text className="btn-text">编辑</Text>
                                                            </View>
                                                        </TButton>
                                                    </View>
                                                </View>
                                            </MyOfferItem>)
                                        }


                                    </View>
                                )
                            })
                        }
                    </ListWrapper>
                </ScrollView>
            </View>
        )
    }
}

