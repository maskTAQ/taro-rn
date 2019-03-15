

import React from 'react';
import { Component } from '../../platform';
import update from 'immutability-helper';

import { View, TButton, Text, Image, Visible, ScrollView, TTag, TModal, TInput, TRadio, TLoading, TSTab } from '../../ui';
import { getDemandList } from '../../api';
import config from '../../config';
import Item from './item';
import bj from './img/bj.png';
import editImg from '../../img/edit.png'
import deleteImg from '../../img/delete.png';
import { navigate } from '../../actions';
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
        data: {
            status: 'init',
            loading: false,
            key: {},
            list: []
        }
    };
    componentWillMount() {
        this.getData();
    }
    getData() {
        const { activeTab } = this.state;
        this.setState(update(this.state, {
            data: {
                status: {
                    $set: 'loading'
                },
                loading: {
                    $set: true
                }
            }
        }));
        getDemandList({ '棉花云供需类型': tabList.indexOf(activeTab) + 1 })
            .then(({ key, list }) => {
                this.setState(update(this.state, {
                    data: {
                        status: {
                            $set: 'success'
                        },
                        loading: {
                            $set: false
                        },
                        key: {
                            $set: key
                        },
                        list: {
                            $set: list
                        }
                    }
                }));
            })
            .catch(e => {
                this.setState(update(this.state, {
                    data: {
                        status: {
                            $set: 'error'
                        },
                        loading: {
                            $set: false
                        }
                    }
                }));
            })
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
        const { itemKeyList, modal, unit, data, activeTab } = this.state;
        const item = list[0];
        return (
            <View className="container">
                <ScrollView>
                    <View className="condition">
                        <View className="condition-title">
                            <Text className="condition-title-text">定制牌价</Text>
                        </View>
                        <View className='condition-content'>
                            <View className='item-title'>
                                <View className='item-title-left'>
                                    <Text className='item-name'>需求编号</Text>
                                    <Text className='item-value'>({item.id})</Text>
                                </View>
                                <View className='item-title-right'>
                                    <Text className='item-time'>2019-01-01</Text>
                                </View>
                            </View>
                            <View className="tag-list">
                                {
                                    tagList.map((tag, index) => {
                                        return (
                                            <TTag
                                                className={index === tagList.length - 1 ? 'tag-end' : 'tag-mr'}>
                                                {tag}
                                            </TTag>
                                        )
                                    })
                                }

                            </View>
                            <View className='item-info-list'>
                                {
                                    itemKeyList.map((itemI, index) => (
                                        <View className="item-info-item">
                                            <View className='item-info-item-content'>
                                                <Text className='item-info-item-title'>{map[itemI]}</Text>
                                                <Text className='item-info-item-value'>{item[itemI]}</Text>
                                            </View>
                                            <Visible show={index !== itemKeyList.length - 1}>
                                                <View className='item-info-item-border'></View>
                                            </Visible>
                                        </View>
                                    ))
                                }
                            </View>
                            <View className="bottom">
                                <View className="bottom-left">
                                    <TButton onClick={this.goDemandCustom}>
                                        <View className="btn">
                                            <Image src={editImg} className="btn-icon" />
                                            <Text className="btn-text">修改</Text>
                                        </View>
                                    </TButton>
                                    <TButton>
                                        <View className="btn">
                                            <Image src={deleteImg} className="btn-icon" />
                                            <Text className="btn-text">删除</Text>
                                        </View>
                                    </TButton>
                                </View>
                                <View className="bottom-right">
                                    <View className="best-price">
                                        <Text className="best-price-value">15003</Text>
                                        <Text className="best-price-label">平台最优价格</Text>
                                    </View>
                                    <TButton onClick={this.goDemandDetail}>
                                        <View className="btn">
                                            <Image src={bj} className="btn-icon" />
                                            <Text className="btn-text">查看资源</Text>
                                        </View>
                                    </TButton>
                                </View>
                            </View>
                        </View>

                    </View>
                    {
                        data.status === 'loading' && <TLoading />
                    }
                    {
                        data.status === 'success' && (
                            <View className="demand-list">
                                <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                                {
                                    data.list.map(item => {
                                        return (
                                            <Item map={data.key} item={item} onHandleOffer={this.handleOffer} />
                                        )
                                    })
                                }
                            </View>
                        )
                    }


                </ScrollView>
                <TButton onClick={this.goDemandCustom}>
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

