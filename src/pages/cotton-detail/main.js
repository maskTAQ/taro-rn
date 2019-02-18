

import Taro, { Component } from '@tarojs/taro';
import classnames from 'classnames';

import { View, TButton, Text } from '../../components'

import Item from './item';
import Card from './card';
import './main.scss';
import mobileImg from './img/mobile.png';
import scImg from './img/sc.png';


const item = {
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
        current: 0,
    };
    componentDidShow() {
        Taro.setNavigationBarTitle({ title: item.id + '|详情' });
    }

    componentDidHide() { }
    handleClick(current) {
        this.setState({
            current
        });
    }
    render() {
        const { itemDescList, itemKeyList } = this.state;
        return (
            <View className="container">
                <Item item={item} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                <Card />
                <View className={classnames('btn-group','margin')}>
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
        )
    }
}

