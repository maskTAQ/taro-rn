

import { Component } from '@tarojs/taro';
import classnames from 'classnames';

import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import { View, TButton, Text, Image, Visible, ScrollView, TTag, TInput, TRadio } from '../../components'
import config from '../../config';
import Item from './item';
import bj from './img/bj.png';
import editImg from '../../img/edit.png'
import deleteImg from '../../img/delete.png';
import './main.scss';


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
const list = [data, data, data, data];
const modalList = [
    {
        label: '数量',
        type: 'input',
        placeholder: '请输入数量'
    },
    {
        label: '单位',
        type: 'radio',
        option: [{ label: '吨', value: '吨' }, { label: '批', value: '批' }, { label: '柜', value: '柜' }]
    },
    {
        label: '自提价',
        type: 'input',
        placeholder: '请输入自提价'
    },
    {
        label: '到厂家',
        type: 'input',
        placeholder: '请输入到厂家'
    },
];
export default class Demand extends Component {
    state = {
        itemKeyList: ['ysj', 'cd', 'ql', 'mz', 'cz', 'hc', 'hz'],
        offerItemKeyList: ['sl', 'ztj', 'dcj'],
        itemDescList: ['zhc', 'ck', 'gys'],
        modal: {
            visible: true,
            data: null
        },
        unit: '吨'
    };
    componentDidHide() { }
    handleClick = (current) => {
        this.setState({
            current
        });
    }
    baojia() {
        console.log('报价')
    }
    handleOffer(data) {
        console.log(data, 'handleOffer');
    }
    handleUnitChange = item => {
        this.setState({
            unit: item.value
        });
    }
    render() {
        const { itemDescList, itemKeyList, modal, unit } = this.state;
        const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
        const item = list[0];
        return (
            <View className="container">
                <View className="condition">
                    <View className="condition-title">
                        <Text className="condition-title-text">定制牌价</Text>
                    </View>
                    <View className='condition-content'>
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
                        <View className="bottom">
                            <View className="bottom-left">
                                <TButton>
                                    <View className="btn">
                                        <Image src={editImg} className="btn-icon" />
                                        <Text className="btn-text">修改</Text>
                                    </View>
                                </TButton>
                                <TButton>
                                    <View className="btn">
                                        <Image src={deleteImg} className="btn-icon" />
                                        <Text className="btn-text">删除</Text>
                                    </View>
                                </TButton>
                            </View>
                            <View className="bottom-right">
                                <View className="best-price">
                                    <Text className="best-price-value">15003</Text>
                                    <Text className="best-price-label">平台最优价格</Text>
                                </View>
                                <TButton>
                                    <View className="btn">
                                        <Image src={bj} className="btn-icon" />
                                        <Text className="btn-text">查看资源</Text>
                                    </View>
                                </TButton>
                            </View>
                        </View>
                    </View>

                </View>

                <View className="demand-list">
                    <ScrollView>
                        {
                            list.map(data => {
                                return (
                                    <Item onHandleOffer={this.handleOffer} item={data} itemDescList={itemDescList} itemKeyList={itemKeyList} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <AtModal
                    isOpened={modal.visible}
                    onClose={this.handleClose}
                >
                    <AtModalHeader>我要报价</AtModalHeader>
                    <AtModalContent>
                        {
                            modalList.map((item) => {
                                const { label, type, placeholder, option } = item;
                                return (
                                    <View className="item">
                                        <Text className="item-label">{label}</Text>
                                        {
                                            type === 'input' ? (
                                                <TInput className="item-input" />
                                            ) : (
                                                <TRadio option={option} checkd={unit} onCheckdChange={this.handleUnitChange} />
                                                )
                                        }
                                    </View>
                                )
                            })
                        }
                    </AtModalContent>
                    <AtModalAction> <Button onClick={this.handleClose}>取消</Button> <Button onClick={this.submitFeedBack}>确定</Button> </AtModalAction>
                </AtModal>
            </View>
        )
    }
}

