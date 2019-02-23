
import { Component } from '@tarojs/taro';
import classnames from 'classnames';

import { View, Text, Image, TTag, TButton, Visible } from '../../components'
import config from '../../config';
import './item.scss';
import { navigate ,call} from '../../actions';
import mobileImg from './img/mobile.png';
import carImg from './img/car.png';
const map = config.map.main;
export default class Item extends Component {
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    handleDelete() {
        console.log('点击删除');
    }
    call(mobile) {
        call(mobile)
    }
    goShoppingCart(params) {
        console.log('点击购物车');
        navigate({
            routeName: 'shopping-car',
            params
        })
    }
    render() {
        const { item, itemKeyList, itemDescList } = this.props;
        const { itemValueList } = this.state;
        const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
        return (
            <View className='item-box'>
                <View className='item-title'>
                    <View className='item-title-left'>
                        <Text className='item-name'>需求编号</Text>
                        <Text className='item-value'>({item.id})</Text>
                    </View>
                    <View className='item-title-right'>
                        <Text className='item-time'>2019-01-01</Text>
                    </View>
                </View>
                <View className="TTag-list">
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
                <View className='item-info-list'>
                    {
                        itemValueList.map((itemI, index) => (
                            <View className="item-info-item">
                                <View className='item-info-item-content'>
                                    <Text className='item-info-item-title'>{map[itemI]}</Text>
                                    <Text className='item-info-item-value'>{item[itemI]}</Text>
                                </View>
                                <Visible show={index !== itemValueList.length - 1}>
                                    <View className='item-info-item-border'></View>
                                </Visible>
                            </View>
                        ))
                    }
                </View>
                <View className='item-desc-list'>
                    {
                        itemDescList.map(itemI => (
                            <View className="item-desc-item">
                                <Text className='item-desc-item-label'>{map[itemI]}:</Text>
                                <Text className='item-desc-item-text'>{item[itemI]}</Text>
                            </View>
                        ))
                    }

                </View>
                <View className='btn-group'>
                    <TButton onClick={() => this.call('13888888888')}>
                        <View className='btn'>
                            <Image className='btn-icon' src={mobileImg}></Image>
                            <Text className='btn-text'>电话</Text>
                        </View>
                    </TButton>
                    <TButton onClick={() => this.goShoppingCart(item)}>
                        <View className='btn'>
                            <Image className='btn-icon' src={carImg}></Image>
                            <Text className='btn-text'>购物车</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}