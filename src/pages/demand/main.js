

import React from 'react';
import { Component, connect } from '../../platform';
import update from 'immutability-helper';

import { View, TButton, Text, Image, Visible, ScrollView, TTag, TModal, TInput, TRadio, TLoading, TSTab } from '../../ui';
import { getDemandList } from '../../api';
import config from '../../config';
import Item from './item';
import DemandItem from './demand-item';
import { navigate, asyncActionWrapper } from '../../actions';
import './main.scss';


const map = config.map.main;

const data = {
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

    xqbh: '12132987130',

    jc: '+120',
    'y/d': '15720',
    gz: '45.455',

    zhc: "巴州亿成棉业有限公司",
    ck: '中储棉库存厄尔有限责任公司',
    gys: '河北星宇纺织原料有限责任公司'
};
const list = [data, data, data, data];
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
const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
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
        this.getData();
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
        const { itemKeyList, modal, unit, activeTab } = this.state;
        const { status: dataStatus, data } = this.props.data[`demand_list_${activeTab}`];
        const item = list[0];
        return (
            <View className="container">
                <ScrollView>
                    <View className="condition">
                        <View className="condition-title">
                            <Text className="condition-title-text">定制牌价</Text>
                        </View>
                        <DemandItem data={{}} map={{}} type="self" />
                    </View>
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
            </View>
        )
    }
}

