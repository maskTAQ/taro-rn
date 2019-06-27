

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
const defaultTabData = {
    default: true,
    list: [],
    key: {}
};
@connect(({ data }) => ({ user: data.user }))
export default class CottonDetail extends Component {
    state = {
        activeTab: '',
        //列表页携带来的数据
        defaultData: {},
        kfContact: [],
        //现货指标
        xhzb: defaultTabData,
        //仓单证书
        cdzs: defaultTabData
    };
    getParams() {
        return this.props.navigation.state.params;
    }
    componentWillMount() {
        //console.log(this.getParams(),'getParams');
        const { id, defaultData, type } = this.getParams();
        //0为只有 现货 1为只有仓单 2 全有
        const activeTab = type === '1' ? '仓单证书' : '现货指标';
        this.setState({
            defaultData,
            type,
            activeTab
        }, this.getData);
        setPageTitle(`${id}|详情`);

        this.getKf();
    }
    getKf() {
        const { userId } = this.getParams();
        getKFList({ '用户ID': userId })
            .then(res => {
                const { key, list } = res;
                const arr = list || []
                if (arr && arr[0]) {
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
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        }, this.getData);
    }

    getData() {
        const { activeTab, xhzb, cdzs } = this.state;
        const { id, cottonType,defaultData } = this.getParams();
        const cd = defaultData.c_ybj22;
        console.log(cd,'cd')
        if (['0', '2'].includes(cd) && activeTab === '现货指标' && xhzb.default && !['地产棉', '进口棉$', '进口棉￥'].includes(cottonType)) {
            getSpotIndicators({
                '加工批号': id
            })
                .then(res => {
                    this.setState({
                        xhzb: res
                    });
                })
        }
        if (['1', '2'].includes(cd) && activeTab === '仓单证书' && cdzs.default && !['进口棉$', '进口棉￥'].includes(cottonType)) {
            getCertificate({
                '加工批号': id
            })
                .then(res => {
                    this.setState({
                        cdzs: res
                    });
                })
        }
    }
    getTabData(tab) {
        const { activeTab, xhzb, cdzs } = this.state;
        return (tab || activeTab) === '仓单证书' ? cdzs : xhzb
    }
    handleClick = (current) => {
        this.setState({
            current
        });
    }
    goQuotationList(data,key) {
        console.log({ data, key })
        navigate({ routeName: 'quotation-list', params: { data, key } });
    }
    goPackageDetail() {
        navigate({ routeName: 'package-detail' });
    }

    goShoppingCar() {
        const { key, defaultData } = this.getParams();
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

                navigate({ routeName: 'shopping-car-tab' });
                setTimeout(Tip.success, 0, '添加成功!');
            })

    }
    //当为仓单证书 只采用二检数据
    assign(tab = '现货指标', o = {}, t = {}) {
        if (tab === '现货指标') {
            const result = {};
            for (const key in o) {
                result[key] = t[key] || o[key];
            }
            return Object.assign({}, t, result);
        }
        return t;

    }
    getFullConfig(tab) {
        const { defaultData, } = this.state;
        const { list, key } = this.getTabData(tab);
        const { key: k } = this.getParams();
        return {
            fullData: this.assign(tab, defaultData, list[0]),
            fullKey: Object.assign({}, k, key)
        };
    }
    getContactMobile = () => {
        const { key } = this.getParams();
        if (key['客服']) {
            return this.gTab('客服');
        }
        return false;
    }
   gTab = (k, tab) => {
        const { fullData, fullKey } = this.getFullConfig(tab || this.state.activeTab);
        return fullData[fullKey[k]];
    }
    toFixed(n) {
        const v = Number(n);
        return v.toFixed(2);
    }
    getDiff = () => {
        const { gTab } = this;
        const { cottonType } = this.getParams();
        const { activeTab } = this.state;
        if (cottonType === '新疆棉') {
            if (activeTab === '现货指标') {
                return {
                    price: gTab('报价'),
                    weight: gTab(`合计${gTab('重量类型')}`),
                }
            }
            if (activeTab === '仓单证书') {
                const weightType = gTab('重量类型', '现货指标');
                return {
                    price: this.toFixed(weightType === '公重' ?
                        gTab('报价', '现货指标') / gTab('合计公重', '现货指标') * gTab('合计公重') :
                        gTab('合计毛重', '现货指标') / gTab('报价', '现货指标') * gTab('合计毛重'))
                    ,
                    weight: gTab(`合计${weightType}`),
                }
            }
        }
        return {
            price: gTab('报价'),
            weight: gTab(`合计公重`),
        }
    }
    render() {
        const { type, activeTab, kfContact } = this.state;
        const { cottonType } = this.getParams();
        const { fullData, fullKey } = this.getFullConfig();
        const { price, weight } = this.getDiff();
        let isShowDetail = false;

        if (includeList.includes(cottonType) || (cottonType === '地产棉') && activeTab === '仓单证书') {
            isShowDetail = true;
        }
        return (
            <View className="container">
                <ScrollView>
                    {type === '2' && <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />}
                    <Item data={fullData} map={fullKey} cottonType={cottonType} activeTab={activeTab} kfContact={kfContact} price={price} weight={weight} />
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
                    {isShowDetail && <Card data={fullData} map={fullKey} />}
                    {
                        isShowDetail && (
                            <View className={classnames('link-btn-group')}>
                                <TButton onClick={() => this.goPackageDetail(fullData)}>
                                    <View className='link-button'>
                                        <Text className='link-button-text'>点击查看186包棉包详情</Text>
                                    </View>
                                </TButton>
                                <TButton onClick={() => this.goQuotationList(fullData,fullKey)}>
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

