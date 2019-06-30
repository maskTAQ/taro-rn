import React from 'react';
import { Component, connect } from '../../platform';

import { View, Text, Image, TButton, } from '../../ui';
import { productTypesLabel } from '../../constants';
import { call, asyncActionWrapper, navigate } from '../../actions';
import { addShoppingCar, getShoppingCarList } from '../../api';
import { Tip, Storage } from '../../utils';
import { offerKeyMap } from '../../config';
import './index.scss'
import carImg from './img/car.png';
const list = [
    { label: "年度", key: "年份", includes: ['进口棉￥', '进口棉$'] },
    { label: "产地", key: "产地", includes: ['进口棉￥', '进口棉$'] },
    { label: "等级", key: "颜色级" },
    { label: "长度", key: "长度" },
    { label: "强力", key: "强力" },
    { label: "马值", key: "马克隆值" },
    { label: "叶屑", key: "叶屑", includes: ['进口棉￥', '进口棉$'] },
    {
        label: "含杂",
        key: "平均含杂",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "回潮",
        key: "回潮",
        noInclude: ['进口棉￥', '进口棉$']
    }, {
        label: "长整",
        key: "整齐度",
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
    g = k => {
        const { data,map } = this.props;
        const m = map || offerKeyMap;
        if (data) {
            return data[m[k]] || '';
        } else {
            return ''
        }
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
                            routeName: 'shopping-car-tab'
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
        const { g } = this;
        const { isHome } = this.props;
        if (isHome) {
            this.saveToHistory(g('主键'))
                .then(this.goDetailCore)
        } else {
            this.goDetailCore()
        }
    }
    goDetailCore = () => {
        const { g } = this;
        const { data,map } = this.props;
        navigate({
            routeName: 'cotton-detail', params: {
                key: map,
                cottonType: productTypesLabel[g('棉花云报价类型')],
                id: g('批号') || g('报价号'),
                userId: g('用户ID'),
                defaultData: data,
                type: g('仓单')
            }
        });
    }
    render() {
        const { g, split } = this;
        const { showShoppinCar, isHome } = this.props;
        let key = '仓库';
        let pihao = '批号'
        let type = productTypesLabel[g('棉花云报价类型')];
        if (['地产棉', '进口棉￥'].includes(type)) {
            key = '仓库';
        }
        let tidanhao;
        //是否显示包数
        let isShowBS = true;
        if (['进口棉$', '进口棉￥'].includes(type)) {
            pihao = '报价号'
            tidanhao = g('提单号');
            isShowBS = false
        }
        const offerType = g('报价类型');
        const peie = Number(g('配额比'));
        return (
            <TButton onClick={this.goDetail}>
                <View className="container">
                    <View className="content">
                        <View className="top">
                            <View className="top-left">
                                <Text className="title">{pihao}({g(pihao)}) {tidanhao ? `提单号(${tidanhao})` : ''} {g('产地')} {g('类型')} {isShowBS ? '   ' + g('包数') : ''}</Text>
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
                                        const { label, key } = item;
                                        return (
                                            <View key={key} className="item">
                                                <Text className="item-label">{label}</Text>
                                                <Text className="item-value">{g(key)}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View className="center-right">
                                {
                                    ['0', '2'].includes(g('仓单')) && (
                                        <TButton>
                                            <View className="tag xh">
                                                <Text className="tag-text">现货</Text>
                                            </View>
                                        </TButton>
                                    )
                                }
                                {
                                    ['1', '2'].includes(g('仓单')) && (
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
                                <Text className="row-text">{key}:{split(g('交货仓库或方式'), 6)}</Text>

                            </View>
                            <View className="row-right">
                                <Text className="row-text">卖家:{split(g('公司'), 6)}</Text>
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
                                                <Text className="jc-label">{g('基差类型')}</Text>
                                                <Text className="jc-value">{g('基差值')}</Text>
                                            </View>
                                            <View className="offer-left-bottom">
                                                <Text className="jc-label">基   差</Text>
                                                <Text className="jc-value">{g('基差值升贴水')}</Text>
                                            </View>
                                        </View>

                                    )
                            }

                            <View className="offer-right">
                                <View className="row-right-row-left">
                                    <Text className="price">{type === '进口棉$' ? '$' : '￥'}{g('报价')} {type === '进口棉$' ? '  即期' : '元/吨'}</Text>
                                    <Text className="weight">{g('重量')} {g('重量类型')}</Text>
                                </View>
                                {
                                    showShoppinCar !== false && (
                                        <TButton onClick={this.handleClickShoppingCar.bind(this, g('主键'))}>
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