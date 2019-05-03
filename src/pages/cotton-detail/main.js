

import React from 'react';
import { Component, setPageTitle ,connect} from '../../platform';
import classnames from 'classnames';

import { View, TButton, Text, TSTab, Image, ScrollView } from '../../ui';
import { FixedTool } from '../../components';
import { getSpotIndicators, getCertificate,addShoppingCar,getShoppingCarList } from '../../api';
import Card from './card';
import Item from './item';
import { Tip } from '../../utils';
import './main.scss';
import mobileImg from './img/mobile.png';
import scImg from './img/sc.png';
import { navigate, call,asyncActionWrapper } from '../../actions';

const tabList = ["现货指标", "仓单证书"];

@connect(({ data }) => ({ user: data.user }))
export default class CottonDetail extends Component {
    state = {
        activeTab: '',
        list: [],
        key: {},
        defaultData: {}
    };
    componentWillMount() {
        const { id, defaultData, type } = this.props.navigation.state.params;
        this.setState({
            defaultData,
            type,
            activeTab: type === '1' ? '仓单证书' : '现货指标'
        },this.getData);
        setPageTitle(`${id}|详情`);
    }
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        }, this.getData);
    }
    getData() {
        const { activeTab } = this.state;
        const { id } = this.props.navigation.state.params;
        if (tabList.indexOf(activeTab) === 0) {
            //'65551171001'
            getSpotIndicators({
                '加工批号': id
            })
                .then(res => {
                    this.setState(res);
                })
        } else {
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
    baojia() {
        console.log('报价')
    }
    goQuotationList(data) {
        const { key = {} } = this.state;
        navigate({ routeName: 'quotation-list', params: { data, key } });
    }
    goPackageDetail() {
        navigate({ routeName: 'package-detail' });
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
                setTimeout(Tip.success,0,'添加成功!');
            })
       
    }
    getDataByList() {
        const { list, defaultData } = this.state;
        return list[0] || defaultData;
    }
    render() {
        const { key = {}, type } = this.state;
        const data = this.getDataByList();
        return (
            <View className="container">
                <ScrollView>
                    {type === '2' && <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />}
                    <Item data={data} map={key} activeTab={activeTab}/>
                    <Card data={data} map={key} />
                    <View className={classnames('link-btn-group')}>
                        <TButton onClick={() => this.goPackageDetail(data)}>
                            <View className='link-button'>
                                <Text className='link-button-text'>点击查看186包棉包详情</Text>
                            </View>
                        </TButton>
                        <TButton onClick={() => this.goQuotationList(data)}>
                            <View className='link-button'>
                                <Text className='link-button-text'>点击查看完整现货指标</Text>
                            </View>
                        </TButton>
                    </View>
                    <View className={classnames('btn-group', 'margin')}>
                        <TButton onClick={this.goShoppingCar}>
                            <View className='btn'>
                                <Image className='btn-icon' src={scImg}></Image>
                                <Text className='btn-text'>收藏</Text>
                            </View>
                        </TButton>
                        <TButton onClick={() => call('1388888888')}>
                            <View className='btn'>
                                <Image className='btn-icon' src={mobileImg}></Image>
                                <Text className='btn-text'>联系供应商</Text>
                            </View>
                        </TButton>
                    </View>


                </ScrollView>
                <FixedTool />
            </View>
        )
    }
}

