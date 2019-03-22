

import React from 'react';
import { Component,connect } from '../../platform';
import update from 'immutability-helper';

import { View, TButton, Text, Image, Visible, ScrollView, TModal, TInput, TRadio, } from '../../ui'
import { ListWrapper } from '../../components';
import { getOfferByDemand, offer } from '../../api';
import Item from './item';
import config from '../../config';
import './main.scss';
import mobileImg from '../../img/mobile.png';
import { navigate, call } from '../../actions';


const cardList = [
    {
        label: '数量',
        key: '数量'
    },
    {
        label: '自提价',
        key: '自提价'
    },
    {
        label: '到厂价',
        key: '到厂价'
    },
];
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
@connect(({data})=>({data}))
export default class DemandDetail extends Component {
    state = {
        modal: {
            visible: false,
            data: null
        },
        unit: '吨',
        list: {
            status: 'loading',
            data: null
        }
    };
    componentWillMount() {
        this.getData();
    }
    getData() {
        const { params: { data, map } } = this.props.navigation.state;
        getOfferByDemand({ '云供需主键': data[map['主键']] })
            .then(res => {
                this.setState(update(this.state, {
                    list: {
                        $set: {
                            status: 'success',
                            data: res,
                        }
                    }
                }))
            })
            .catch(e => {
                this.setState(update(this.state, {
                    list: {
                        $set: {
                            status: 'error',
                        }
                    }
                }))
            })
    }
    handleOffer() {
        this.setState(update(this.state, {
            modal: {
                visible: {
                    $set: true
                }
            }
        }));
    }
    goMapDetail() {
        navigate({ routeName: 'map-detail' });
    }
    call() {
        call('1388888888');
    }
    g = (k, i) => {
        const { map, data } = this.state.list;
        return data[i][map[k]] || '-';
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
    handleChangeValue = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    submit = v => {
        const { state } = this;
        const { params } = this.props.navigation.state;
        const { id } = this.props.data.user.data;

        offer({
            '云供需主键': params.data[params.map['主键']],
            '用户ID': id,
            '单位': state.unit,
            '数量': state['数量'],
            '自提价': state['自提价'],
            '到厂家': state['到厂家'],
        })
            .then(res => {
                Tip.success('报价成功！');
                this.getData();
            })
        this.closeModal();
    }
    render() {
        const { list, modal } = this.state;
        const { params } = this.props.navigation.state;
        console.log(list, 'detail params')
        return (
            <View className="container">
                <ScrollView>
                    <Item onHandleOffer={this.handleOffer} data={params.data} map={params.map} />
                    <View className="list-title">
                        <Text className="list-title-box">供应商报价</Text>
                    </View>
                    <ListWrapper status={list.status} data={list.data}>
                        {
                            list.status === 'success' && list.data.list.map((item, i) => {
                                return (
                                    <View className='list-item'>
                                        <View className='item-title'>
                                            <View className='item-title-left'>
                                                <Text className='item-name'>报价编号</Text>
                                                <Text className='item-value'>({g('报价号', i)})</Text>
                                            </View>
                                            <View className='item-title-right'>
                                                <Text className='item-time'>{g('报价时间', i)}</Text>
                                            </View>
                                        </View>
                                        <View className='item-info-list'>
                                            {
                                                cardList.map((item, index) => {
                                                    const { label, key } = item;
                                                    return (
                                                        <View className="item-info-item">
                                                            <View className='item-info-item-content'>
                                                                <Text className='item-info-item-title'>{label}</Text>
                                                                <Text className='item-info-item-value'>{g(key, i)}</Text>
                                                            </View>
                                                            <Visible show={index !== list.length - 1}>
                                                                <View className='item-info-item-border'></View>
                                                            </Visible>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>

                                        <View className="btn-group">
                                            <TButton onClick={this.call}>
                                                <View className="btn">
                                                    <Image className="btn-icon" src={mobileImg}></Image>
                                                    <Text className="btn-text">电话</Text>
                                                </View>
                                            </TButton>
                                        </View>
                                    </View>

                                )
                            })
                        }
                    </ListWrapper>
                    <TButton onClick={this.handleOffer}>
                        <View className="offer-button">
                            <Text className="offer-button-text">我要报价</Text>
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
                                                <TInput className="item-input" placeholder={placeholder} onInput={handleChangeValue.bind(this, label)} />
                                            ) : (
                                                    <TRadio option={option} checkd={unit} onCheckdChange={this.handleUnitChange} />
                                                )
                                        }
                                    </View>
                                )
                            })
                        }
                    </TModal>
                </ScrollView>
            </View>
        )
    }
}

