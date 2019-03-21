

import React from 'react';
import { Component, connect } from '../../platform';

import { View, ScrollView, TTabs, TTabPane, TButton, Image } from '../../ui';
import { MainItem, ListWrapper } from '../../components';
import { getMyCloudOfferList } from '../../api';
import { asyncActionWrapper } from '../../actions';

import './main.scss';
import refreshImg from './img/refresh.png';
import editImg from './img/edit.png';


const item = {
    id: '562781322',

    ysj: '21+',
    cd: '12',
    ql: 21.2,
    mz: 1,
    cz: '0.0',
    hc: '0.0',
    hz: '0.0',
    jg: '<15003',

    shd: '盐城',
    mj: '盐城捷多纺织品有限公司',
    zwjhsj: '2019-01-01',
    cgjs: '200d吨',

    sl: '12',
    ztj: '1231',
    dcj: '1331',

    xqbh: '12132987130'
};

@connect(({ data }) => ({ data }))
export default class MyCloudOffer extends Component {


    state = {
        list: [item, item, item, item, item],
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hz', 'jg'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['mj', 'cgjs', 'shd', 'zwjhsj'],
        offerItemDescList: ['xqbh', 'mj'],
        current: 0,
    };
    componentWillMount() {
        this.getData();
    }
    getData() {
        const { data } = this.props.data.user;
        const userId = data.id;
        asyncActionWrapper({
            call: getMyCloudOfferList,
            params: { '用户ID': userId },
            type: 'data',
            key: `my_cloud_offer_list`
        });

    }

    render() {
        const { status: my_offer_list_status, data: my_offer_list_data } = this.props.data.my_cloud_offer_list;
        return (
            <View className='container'>
                <ScrollView>
                    <ListWrapper status={my_offer_list_status} data={my_offer_list_data}>
                        {
                            my_offer_list_status === 'success' && my_offer_list_data.list.map((item) => {
                                return (
                                    <MainItem border={false} data={item} map={my_offer_list_data.key} key={item.id}>
                                        <View className="tool-btn-group">
                                            <TButton>
                                                <View className="btn">
                                                    <Text className="btn-text">删除</Text>
                                                </View>
                                            </TButton>
                                            <View className="btn-group-right">
                                                <TButton>
                                                    <View className="btn mr">
                                                        <Image className="btn-icon" src={refreshImg} />
                                                        <Text className="btn-text">刷新</Text>
                                                    </View>
                                                </TButton>
                                                <TButton>
                                                    <View className="btn">
                                                        <Image className="btn-icon" src={editImg} />
                                                        <Text className="btn-text">编辑</Text>
                                                    </View>
                                                </TButton>
                                            </View>
                                        </View>
                                    </MainItem>
                                )
                            })
                        }
                    </ListWrapper>

                </ScrollView>
            </View>
        )
    }
}

