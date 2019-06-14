

import React from 'react';
import { Component, setPageTitle, connect } from '../../platform';
import classnames from 'classnames';

import { View, TButton, Text, TSTab, Image, ScrollView } from '../../ui';
import { FixedTool } from '../../components';
import { getSpotIndicators, getCertificate, addShoppingCar, getShoppingCarList, getKFList } from '../../api';
import Card from './card';
import Item from './item';
import { Tip } from '../../utils';
import './main.scss';
import { terms } from '../../constants';
import carImg from './img/car.png';
import { navigate, asyncActionWrapper } from '../../actions';

const tabList = ["现货指标", "仓单证书"];
const includeList = ['新疆棉', '拍储棉'];
@connect(({ data }) => ({ user: data.user }))
export default class CottonDetail extends Component {
    state = {
        activeTab: '',
        list: [],
        key: {},
        defaultData: {},
        kfContact: []
    };
    componentDidMount() {
        const { id, defaultData, type } = this.props.navigation.state.params;
        this.setState({
            defaultData,
            type,
            activeTab: type === '1' ? '仓单证书' : '现货指标'
        }, this.getData);
        setPageTitle(`${id}|详情`);
        this.getKf();
    }
    getKf() {
        const userId = this.g('用户ID');
        getKFList({ '用户ID': userId })
            .then(res => {
                const { key, list } = res;
                const arr = list || []
                if (list && list[0]) {
                    this.setState({
                        kfContact: arr.map(item => (
                            {
                                label: item[key['客服名称']],
                                mobile: item[key['客服电话']],
                            }
                        ))
                    })
                }
            })
        //console.log(userId,'id')
    }
    onShareAppMessage() {
        // const { thread } = this.state
        // const url='/pages/thread_detail/thread_detail?tid='+ thread.tid;
        // console.log("url="+url);
        return {
            title: 'a',
            //url: url
        }
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        }, this.getData);
    }
    getData() {
        const { activeTab } = this.state;
        const { id, cottonType } = this.props.navigation.state.params;
        //(进口棉，地产棉)详细列表信息 不需要去获取一检数据，数据都从列表信息里面获取
        // if (['地产棉', '进口棉￥', '进口棉$'].includes(cottonType)) {
        //     return
        // }
        if ((this.g('仓单') === '0' || activeTab === '现货指标') && !['地产棉', '进口棉$', '进口棉￥'].includes(cottonType)) {
            getSpotIndicators({
                '加工批号': id
            })
                .then(res => {
                    this.setState(res);
                })
        }

        if ((this.g('仓单') === '1' || activeTab === '仓单证书') && !['进口棉$', '进口棉￥'].includes(cottonType)) {
            getCertificate({
                '加工批号': id
            })
                .then(res => {
                    this.setState(res);
                })
        }
    }
    handleClick = (current) => {
        this.setState({
            current
        });
    }
    goQuotationList(data) {
        const { key = {} } = this.state;
        navigate({ routeName: 'quotation-list', params: { data, key } });
    }
    goPackageDetail() {
        navigate({ routeName: 'package-detail' });
    }
    g(k) {
        const { key, defaultData } = this.props.navigation.state.params;
        return defaultData[key[k]];
    }
    goShoppingCar() {
        const { key, defaultData } = this.props.navigation.state.params;
        const { data } = this.props.user;
        addShoppingCar({
            '云报价主键': defaultData[key['主键']],
            '用户ID': data.id
        })
            .then(res => {
                asyncActionWrapper({
                    call: getShoppingCarList,
                    params: { '用户ID': data.id },
                    type: 'data',
                    key: 'shoppingCarList'
                });

                navigate({ routeName: 'shopping-car' });
                setTimeout(Tip.success, 0, '添加成功!');
            })

    }
    getFullConfig() {
        const { list, defaultData, key } = this.state;
        const { key: k } = this.props.navigation.state.params;
        //console.log(k,'defaultData');//
        return {
            fullData: Object.assign({}, defaultData, list[0]),
            fullKey: Object.assign({}, k, key)
        };
    }
    getContactMobile = () => {
        const { key, defaultData } = this.props.navigation.state.params;
        if (key['客服']) {
            return this.g('客服');
        }
        return false;
    }
    render() {
        const { type, activeTab, kfContact } = this.state;
        const { cottonType } = this.props.navigation.state.params;
        const { fullData, fullKey } = this.getFullConfig();
        let isShowDetail = false;
        if (includeList.includes(cottonType) || (cottonType === '地产棉') && activeTab === '仓单证书') {
            isShowDetail = true;
        }

        return (
            <View className="container">
                <ScrollView>
                    {type === '2' && <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />}
                    <Item data={fullData} map={fullKey} cottonType={cottonType} activeTab={activeTab} kfContact={kfContact} />
                    <View className="terms">
                        <View className="terms-label">
                            <Text className="terms-label-text">条款</Text>
                        </View>
                        <View className="terms-list">
                            {
                                terms[cottonType].map(item => {
                                    return (
                                        <View className="terms-item">
                                            <Text className="terms-item-text">
                                                {item}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    {isShowDetail && <Card data={fullData} map={key} />}
                    {
                        isShowDetail && (
                            <View className={classnames('link-btn-group')}>
                                <TButton onClick={() => this.goPackageDetail(fullData)}>
                                    <View className='link-button'>
                                        <Text className='link-button-text'>点击查看186包棉包详情</Text>
                                    </View>
                                </TButton>
                                <TButton onClick={() => this.goQuotationList(fullData)}>
                                    <View className='link-button'>
                                        <Text className='link-button-text'>点击查看完整现货指标</Text>
                                    </View>
                                </TButton>
                            </View>
                        )
                    }
                    <View className="btn-group">
                        <TButton onClick={this.goShoppingCar}>
                            <View className='button'>
                                <Image className='button-icon' src={carImg}></Image>
                                <Text className='button-text'>加入购物车</Text>
                            </View>
                        </TButton>
                        {
                            /*
                             <TButton onClick={() => call(fullData[fullKey['手机号']])}>
                                <View className='btn'>
                                 <Image className='btn-icon' src={mobileImg}></Image>
                                     <Text className='btn-text'>联系供应商</Text>
                                 </View>
                             </TButton>
                            */
                        }
                    </View>
                </ScrollView>
                <FixedTool />
            </View>
        )
    }
}

