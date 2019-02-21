

import { Component } from '@tarojs/taro';

import { View, TButton, Text, Image, Visible, ScrollView, TTag, TModal, TInput, TRadio } from '../../components'
import Item from './item';
import config from '../../config';
import './main.scss';
import mobileImg from '../../img/mobile.png';

const map = config.map.main;

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
const item = {
    ...data
};
const list = [item, item, item, item];
export default class DemandDetail extends Component {
    state = {
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
        itemDescList: ['cd', 'mj', 'shd', 'zwjhsj'],
    };

    render() {
        const { itemDescList, itemKeyList } = this.state;
        const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
        return (
            <View className="container">
                <ScrollView>
                    <Item onHandleOffer={this.handleOffer} item={data} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                    <View className="list-title">
                        <Text className="list-title-box">供应商报价</Text>
                    </View>
                    <View className="list">
                        {
                            list.map(item => {
                                return (
                                    <View className='list-item'>
                                        <View className='item-title'>
                                            <View className='item-title-left'>
                                                <Text className='item-name'>需求编号</Text>
                                                <Text className='item-value'>({item.id})</Text>
                                            </View>
                                            <View className='item-title-right'>
                                                <Text className='item-time'>2019-01-01</Text>
                                            </View>
                                        </View>
                                        <View className="tag-list">
                                            {
                                                tagList.map((tag, index) => {
                                                    return (
                                                        <TTag
                                                            className={index === tagList.length - 1 ? 'tag-end' : 'tag-mr'}>
                                                            {tag}
                                                        </TTag>
                                                    )
                                                })
                                            }

                                        </View>
                                        <View className='item-info-list'>
                                            {
                                                itemKeyList.map((itemI, index) => (
                                                    <View className="item-info-item">
                                                        <View className='item-info-item-content'>
                                                            <Text className='item-info-item-title'>{map[itemI]}</Text>
                                                            <Text className='item-info-item-value'>{item[itemI]}</Text>
                                                        </View>
                                                        <Visible show={index !== itemKeyList.length - 1}>
                                                            <View className='item-info-item-border'></View>
                                                        </Visible>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                        <View className='item-desc-list'>
                                            <View className="item-desc-item">
                                                <Text className='item-desc-item-label'>供应商:</Text>
                                                <View className="item-desc-item-right">
                                                    <Text className='item-desc-item-text'>xx有限公司</Text>
                                                    <TButton>
                                                        <View className="button">
                                                            <Text className="button-text">详情</Text>
                                                        </View>
                                                    </TButton>
                                                </View>

                                            </View>
                                        </View>
                                        <View className="btn-group">
                                            <TButton>
                                                <View className="btn">
                                                    <Image className="btn-icon" src={mobileImg}></Image>
                                                    <Text className="btn-text">电话</Text>
                                                </View>
                                            </TButton>
                                        </View>
                                    </View>

                                )
                            })
                        }
                    </View>
                    <TButton>
                        <View className="offer-button">
                            <Text className="offer-button-text">我要报价</Text>
                        </View>
                    </TButton>
                </ScrollView>
            </View>
        )
    }
}

