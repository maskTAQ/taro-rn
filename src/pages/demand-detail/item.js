
import { Component } from '@tarojs/taro';

import { View, Text, TTag, TButton, Visible } from '../../components'
import config from '../../config';
import './item.scss';
const map = config.map.main;
export default class Item extends Component {
    state = {
        itemValueList: ['jc', 'y/d', 'gz'],
    }
    handleDelete() {
        console.log('点击删除');
    }
    handleEdit() {
        console.log('点击编辑');
    }
    render() {
        const { item, itemKeyList, itemDescList } = this.props;
        const tagList = ['颜色级21', '黄染棉2级', '长绒棉', '格斯', '现货'];
        return (
            <View className='item'>
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
                    {
                        itemDescList.map(itemI => (
                            <View className="item-desc-item">
                                <Text className='item-desc-item-label'>{map[itemI]}:</Text>
                                <View className="item-desc-item-right">

                                    <Text className='item-desc-item-text'>{item[itemI]}</Text>
                                    {
                                        itemI === 'mj' && (
                                            <TButton>
                                                <View className="button">
                                                    <Text className="button-text">详情</Text>
                                                </View>
                                            </TButton>
                                        )
                                    }
                                </View>

                            </View>
                        ))
                    }

                </View>
            </View>
        )
    }
}