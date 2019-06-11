

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
export default class ShoppingCartTab extends Component {
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
    handleClick = label => {
        if (label === '指定交易商') {
            call('13822222233');
        }
        if(label === '对接全国棉花交易市场'){
            Tip.success('正在建设中');
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
                            const { label, icon } = item;
                            return (
                                <TButton onClick={this.handleClick.bind(this,label)}>
                                    <View className="modal-item" key={label}>
                                        <Image className="modal-icon" src={icon} />
                                        <Text className="modal-label">{label}</Text>
                                    </View>
                                </TButton>
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

