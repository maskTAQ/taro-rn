import React from 'react';
import { Component, connect } from '../../platform';

import { View, Text, Image, TButton, } from '../../ui';
import { productTypesLabel } from '../../constants';
import { call, asyncActionWrapper, navigate } from '../../actions';
import { addShoppingCar, getShoppingCarList } from '../../api';
import { Tip, Storage } from '../../utils';
import './index.scss'
import carImg from './img/car.png';
const list = [
    { label: "年度", key: "c_ybj24", includes: ['进口棉￥', '进口棉$'] },
    { label: "产地", key: "c_ybj23", includes: ['进口棉￥', '进口棉$'] },
    { label: "等级", key: "c_ybj26" },
    { label: "长度", key: "c_ybj28" },
    { label: "强力", key: "c_ybj29" },
    { label: "马值", key: "c_ybj30" },
    { label: "叶屑", key: "c_ybj34", includes: ['进口棉￥', '进口棉$'] },
    {
        label: "含杂",
        key: "c_ybj32",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "回潮",
        key: "c_ybj31",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "长整",
        key: "c_ybj33",
        noInclude: ['进口棉￥', '进口棉$']
    }];
@connect(({ data }) => ({ user: data.user }))
export default class OfferItem extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    call(mobile) {
        call(mobile)
    }
    handleClickShoppingCar = (v) => {
        const { status, data } = this.props.user;
        if (status !== 'success') {
            Tip.fail('请等待用户数据');
        } else {
            addShoppingCar({
                '云报价主键': v,
                '用户ID': data.id
            })
                .then(res => {
                    asyncActionWrapper({
                        call: getShoppingCarList,
                        params: { '用户ID': data.id },
                        type: 'data',
                        key: 'shoppingCarList'
                    });
                    Tip.success('添加成功!');
                    setTimeout(() => {
                        navigate({
                            routeName: 'shopping-car'
                        });
                    }, 1000);
                })
        }

    }
    split(s = '', n) {
        if (s.length < n) {
            return s;
        } else {
            return s.substring(0, n) + '...';
        }
    }
    saveToHistory(id) {
        return Storage.get('history')
            .then(res => {
                const prev = JSON.parse(res || '[]');
                if (!prev.includes(id)) {
                    prev.push(id);
                }
                Storage.setJson('history', prev);
                return Promise.resolve();
            })
            .catch(e => {
                return Promise.resolve();
            })
    }
    goDetail() {
        const { data, isHome } = this.props;
        if (isHome) {
            this.saveToHistory(data.c_ybj1)
                .then(res => {
                    navigate({
                        routeName: 'cotton-detail', params: {
                            cottonType: productTypesLabel[data.c_ybj19],
                            id: data.c_ybj4 || data.c_ybj2,
                            userId: data.c_ybj21,
                            defaultData: data,
                            type: data.c_ybj40
                        }
                    });
                })
        } else {
            navigate({
                routeName: 'cotton-detail', params: {
                    cottonType: productTypesLabel[data.c_ybj19],
                    id: data.c_ybj4,
                    userId: data.c_ybj21,
                    defaultData: data,
                    type: data.c_ybj22
                }
            });
        }
    }
    render() {
        const { split } = this;
        const { showShoppinCar, data } = this.props;
        let key = '仓库';
        let pihao = '批号'
        let pihaoKey = 'c_ybj4'
        let type = productTypesLabel[data.c_ybj19];
        if (['地产棉', '进口棉￥'].includes(type)) {
            key = '仓库';
        }
        let tidanhao;
        //是否显示包数
        let isShowBS = true;
        if (['进口棉$', '进口棉￥'].includes(type)) {
            pihao = '报价号';
            pihaoKey = 'c_ybj2';
            tidanhao = data.c_ybj47;
            isShowBS = false
        }
        const offerType = data.c_ybj11;
        const peie = Number(data.c_ybj48);
        return (
            <TButton onClick={this.goDetail}>
                <View className="container">
                    <View className="content">
                        <View className="top">
                            <View className="top-left">
                                <Text className="title">{pihao}({data[pihaoKey]}) {tidanhao ? `提单号(${tidanhao})` : ''} {data.c_ybj23} {data.c_ybj25} {isShowBS ? '   ' + data.c_ybj6 : ''}</Text>
                            </View>
                            <View className="top-right">
                                {
                                    /*
                                     <Text className="time">编号({g('编号')}) {g('发布日期')}</Text>
                                    */
                                }
                            </View>
                        </View>
                        {
                            type === '进口棉$' && peie && (
                                <View className="peie-box">
                                    <Text className="peie">自带配额{peie}%</Text>
                                </View>
                            )
                        }
                        <View className="center">
                            <View className="center-left">
                                {
                                    list.filter(({ noInclude = [], includes = 'all' }) => {
                                        if (includes === 'all') {
                                            return !noInclude.includes(type)
                                        } else {
                                            return !noInclude.includes(type) && includes.includes(type)
                                        }

                                    }).map(item => {
                                        const { label, key: itemKey } = item;
                                        return (
                                            <View key={itemKey} className="item">
                                                <Text className="item-label">{label}</Text>
                                                <Text className="item-value">{data[itemKey]}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View className="center-right">
                                {
                                    ['0', '2'].includes(data.c_ybj22) && (
                                        <TButton>
                                            <View className="tag xh">
                                                <Text className="tag-text">现货</Text>
                                            </View>
                                        </TButton>
                                    )
                                }
                                {
                                    ['1', '2'].includes(data.c_ybj22) && (
                                        <TButton>
                                            <View className="tag cd">
                                                <Text className="tag-text">仓单</Text>
                                            </View>
                                        </TButton>
                                    )
                                }

                            </View>
                        </View>

                        <View className="row">
                            <View className="row-left">
                                <Text className="row-text">{key}:{split(data.c_ybj40, 6)}</Text>

                            </View>
                            <View className="row-right">
                                <Text className="row-text">卖家:{split(data.c_ybj15, 6)}</Text>
                            </View>
                        </View>
                        <View className="offer">
                            {
                                offerType === '一口价' ? (
                                    <View className="offer-left">
                                        <Text className="ykj-text">一口价</Text>
                                    </View>
                                ) :
                                    (
                                        <View className="offer-left">

                                            <View className="offer-left-top">
                                                <Text className="jc-label">{data.c_ybj12}</Text>
                                                <Text className="jc-value">{data.c_ybj13}</Text>
                                            </View>
                                            <View className="offer-left-bottom">
                                                <Text className="jc-label">基   差</Text>
                                                <Text className="jc-value">{data.c_ybj50}</Text>
                                            </View>
                                        </View>

                                    )
                            }

                            <View className="offer-right">
                                <View className="row-right-row-left">
                                    <Text className="price">{type === '进口棉$' ? '$' : '￥'}{data.c_ybj14} {type === '进口棉$' ? '  即期' : '元/吨'}</Text>
                                    <Text className="weight">{data.c_ybj37} {data.c_ybj39}</Text>
                                </View>
                                {
                                    showShoppinCar !== false && (
                                        <TButton onClick={this.handleClickShoppingCar.bind(this, data.c_ybj1)}>
                                            <View className="btn">
                                                <Image className="btn-icon" src={carImg} />

                                                <Text className="btn-text">加入购物车</Text>
                                            </View>
                                        </TButton>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    {this.props.children}
                </View>
            </TButton>
        )
    }
}


