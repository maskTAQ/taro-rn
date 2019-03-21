

import React from 'react';
import { Component, connect } from '../../platform';



import { View, TButton, Text, Image, TModal, ScrollView } from '../../ui'
import { login, asyncActionWrapper } from '../../actions';
import { getShoppingCarList, removeFromCart } from '../../api';
import ShoppingCarItem from './item';
import userIcon from '../../img/user.png';
import groupIcon from '../../img/group.png';
import cottonMarketIcon from '../../img/cotton-market.png';
import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
import './main.scss';
import { Tip } from '../../utils';


const ddata = {
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

const modalList = [
    {
        label: '联系供应商',
        icon: userIcon
    },
    {
        label: '对接全国棉花交易市场',
        icon: cottonMarketIcon
    },
    {
        label: '指定交易商',
        icon: groupIcon
    }
];
@connect(({ data }) => ({ data }))
export default class ShoppingCart extends Component {
    state = {
        isAllChecked: false,
        modalVisible: false,
        checkedOfferList: []
    };
    componentWillMount() {
        this.getData();
    }
    componentWillReceiveProps(nextProps) {
        this.getData(nextProps);
    }

    login() {
        login();
    }
    getData(props) {
        const { data: { shoppingCarList, user } } = props || this.props;
        const { status: dataStatus, loading: dataLoading } = shoppingCarList;
        //获取列表数据
        if (dataStatus !== 'success' && !dataLoading) {
            if (user.status === 'success') {
                asyncActionWrapper({
                    call: getShoppingCarList,
                    params: { '用户ID': user.data.id },
                    type: 'data',
                    key: 'shoppingCarList'
                });
            }
        }
    }
    toggleCheckedStatus = () => {
        const { shoppingCarList } = this.props.data;
        if (this.state.isAllChecked) {
            this.setState({
                isAllChecked: false,
                checkedOfferList: []
            });
        } else {
            if (shoppingCarList.status === 'success') {
                this.setState({
                    isAllChecked: true,
                    checkedOfferList: shoppingCarList.data.list.map(item => item[shoppingCarList.data.key['主键']])
                });
            } else {
                this.setState({
                    isAllChecked: true,
                    checkedOfferList: []
                });
            }

        }

    }
    handleCheckedChange = (d) => {
        this.setState({
            checkedOfferList: d
        });
    }
    removeFromCart = () => {
        const { checkedOfferList } = this.state;
        const { data } = this.props.data.user;
        if (checkedOfferList.length) {
            removeFromCart({
                '云报价主键': checkedOfferList,
                '用户ID': data.id
            })
                .then(res => {
                    this.setState({
                        checkedOfferList: []
                    });
                    Tip.success('移除成功!');
                    asyncActionWrapper({
                        call: getShoppingCarList,
                        params: { '用户ID': data.id },
                        type: 'data',
                        key: 'shoppingCarList'
                    });
                })
        } else {
            Tip.fail('请选择要移除的');
        }

    }
    settlement = () => {
        this.setState({
            modalVisible: true
        });
    }
    submit = () => {

    }
    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    }
    render() {
        const { modalVisible, isAllChecked } = this.state;
        const { shoppingCarList, user } = this.props.data;
        const { status: loginStatus } = user;
        return (
            <View className="container">
                <View className="list">
                    {
                        shoppingCarList.status === 'success' && (

                            <ScrollView scrollY>
                                {
                                    shoppingCarList.data.list.map(data => {
                                        return (
                                            <ShoppingCarItem
                                                key={data.id}
                                                item={ddata}
                                                data={data}
                                                checkedOfferList={checkedOfferList}
                                                onCheckedChange={this.handleCheckedChange}
                                                map={shoppingCarList.data.key}
                                            />
                                        )
                                    })
                                }
                            </ScrollView>

                        )
                    }
                </View>
                <View className="bottom">
                    <View className="checked-box">
                        <TButton onClick={this.toggleCheckedStatus}>
                            <Image className="checked-icon" src={isAllChecked ? checkedImg : uncheckedImg} />
                        </TButton>
                        <Text className="checked-text">全选</Text>
                    </View>
                    <View className="bottom-right">
                        <TButton onClick={this.removeFromCart}>
                            <View className="button delete-button">
                                <Text className="button-text">移除</Text>
                            </View>
                        </TButton>
                        <TButton onClick={this.settlement}>
                            <View className="button">
                                <Text className="button-text">结算</Text>
                            </View>
                        </TButton>
                    </View>
                </View>
                <TModal visible={modalVisible} title="" onClose={this.closeModal} onCancel={this.closeModal} onConfirm={this.submit}>
                    {
                        modalList.map(item => {
                            const { label, icon } = item;
                            return (
                                <View className="modal-item" key={label}>
                                    <Image className="modal-icon" src={icon} />
                                    <Text className="modal-label">{label}</Text>
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

