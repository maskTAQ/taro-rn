

import React from 'react';
import { Component ,setPageTitle} from '../../platform';
import classnames from 'classnames';

import { View, TButton, Text, TSTab, Image, ScrollView } from '../../ui';
import { FixedTool, MainItem } from '../../components';;
import { getSpotIndicators, getCertificate } from '../../api';
import Card from './card';
import './main.scss';
import mobileImg from './img/mobile.png';
import scImg from './img/sc.png';
import { navigate, call } from '../../actions';

const tabList = ["现货指标", "仓单证书"];
export default class CottonDetail extends Component {
    state = {
        activeTab: '现货指标',
        list: [],
        key: {},
    };
    componentWillMount() {
        const { id } = this.props.navigation.state.params;
        setPageTitle(`${id}|详情`);
        this.getData();
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
    goQuotationList() {
        navigate({ routeName: 'quotation-list' });
    }
    goPackageDetail() {
        navigate({ routeName: 'package-detail' });
    }
    goShoppingCar() {
        navigate({ routeName: 'shopping-car' });
    }
    render() {
        const { list = [], key = {} } = this.state;
        return (
            <View className="container">
                <ScrollView>
                    <TSTab list={tabList} active={activeTab} onTabChange={this.handleTabChange} />
                    {list.map((item, i) => {
                        return (
                            <MainItem border={false} data={item} map={key} key={i} />
                        )
                    })}



                    <Card />
                    <View className={classnames('link-btn-group')}>
                        <TButton onClick={() => this.goPackageDetail(item)}>
                            <View className='link-button'>
                                <Text className='link-button-text'>点击查看186包棉包详情</Text>
                            </View>
                        </TButton>
                        <TButton onClick={() => this.goQuotationList(item)}>
                            <View className='link-button'>
                                <Text className='link-button-text'>点击查看完整现货指标</Text>
                            </View>
                        </TButton>
                    </View>
                    <View className={classnames('btn-group', 'margin')}>
                        <TButton onClick={() => this.goShoppingCar(item)}>
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

