

import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';

import { View, TButton, Text, TTabs, Image, TTabPane, ScrollView, FixedTool } from '../../components'

import Item from './item';
import Card from './card';
import './main.scss';
import mobileImg from './img/mobile.png';
import scImg from './img/sc.png';



const data = {
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

export default class CottonDetail extends Component {
    state = {
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['zhc', 'ck', 'gys'],
        current: 0,
    };
    componentDidShow() {
        Taro.setNavigationBarTitle({ title: '218937123' + '|详情' });
    }

    componentDidHide() { }
    handleClick=(current)=>{
        this.setState({
            current
        });
    }
    baojia() {
        console.log('报价')
    }
    render() {
        const { itemDescList, itemKeyList, current } = this.state;
        const tabList = ["现货指标", "仓单证书"];
        return (
            <View className="container">
                <ScrollView>
                    <TTabs scroll={false} current={current} tabList={tabList} onClick={this.handleClick}>
                        {
                            tabList.map((item, index) => {
                                return (
                                    <TTabPane key={item} tabLabel={item} current={current} index={index}>
                                        <View className="a">
                                            <Item item={data} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                                            <Card />
                                            <View className={classnames('link-btn-group')}>
                                                <TButton onClick={() => this.handleEdit(item)}>
                                                    <View className='link-button'>
                                                        <Text className='link-button-text'>点击查看186包棉包详情</Text>
                                                    </View>
                                                </TButton>
                                                <TButton onClick={() => this.handleDelete(item)}>
                                                    <View className='link-button'>
                                                        <Text className='link-button-text'>点击查看完整现货指标</Text>
                                                    </View>
                                                </TButton>
                                            </View>
                                            <View className={classnames('btn-group', 'margin')}>
                                                <TButton onClick={() => this.handleEdit(item)}>
                                                    <View className='btn'>
                                                        <Image className='btn-icon' src={scImg}></Image>
                                                        <Text className='btn-text'>收藏</Text>
                                                    </View>
                                                </TButton>
                                                <TButton onClick={() => this.handleDelete(item)}>
                                                    <View className='btn'>
                                                        <Image className='btn-icon' src={mobileImg}></Image>
                                                        <Text className='btn-text'>联系供应商</Text>
                                                    </View>
                                                </TButton>
                                            </View>
                                        </View>
                                    </TTabPane>
                                )
                            })
                        }
                    </TTabs>
                </ScrollView>
                <FixedTool />
            </View>
        )
    }
}

