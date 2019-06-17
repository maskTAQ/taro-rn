

import React from 'react';
import { Component, connect } from '../../platform';



import { View, TButton, Text, Image, TModal, ScrollView } from '../../ui'
import { login, asyncActionWrapper, call } from '../../actions';
import { getShoppingCarList, removeFromCart } from '../../api';
import ShoppingCarItem from './item';
import userIcon from '../../img/user.png';
import groupIcon from '../../img/group.png';
import cottonMarketIcon from '../../img/cotton-market.png';
import checkedImg from '../../img/checked.png';
import uncheckedImg from '../../img/unchecked.png';
import './main.scss';
import { Tip } from '../../utils';

const modalList = [
    {
        components: [
            {
                type: 'text',
                label: '联系供应商'
            }
        ],
        icon: userIcon
    },
    {
        components: [
            {
                type: 'button',
                label: '棉花交易市场南京办事处',
                call: '025-86800560'
            },
            {
                type: 'button',
                label: '-王兆荣',
                call: '13952096610'
            }
        ],
        icon: cottonMarketIcon
    },
    {
        components: [
            {
                type: 'button',
                label: '棉花交易市场北京总部',
                call: '010-59338631'
            },
            {
                type: 'button',
                label: '-孙冰',
                call: '010-15001022998'
            }
        ],
        icon: cottonMarketIcon
    },
    {
        components: [
            {
                type: 'button',
                label: '指定交易商',
                call:'0512-58707332'
            }
        ],
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
    handleClick = data => {
        const { type, call: m } = data;
        if (type === 'button') {
            call(m);
        }
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
                            const { components, icon } = item;
                            return (
                                <View className="modal-item" key={icon}>
                                    <Image className="modal-icon" src={icon} />
                                    {
                                        components.map(component => {
                                            return (
                                                <TButton onClick={this.handleClick.bind(this, component)}>
                                                    <Text className="modal-label">{component.label}</Text>
                                                </TButton>
                                            )
                                        })
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

