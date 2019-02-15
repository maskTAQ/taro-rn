
import { Component } from '@tarojs/taro';


import { View, Text, Image, TTag, TButton, Visible } from '../../components'
import config from '../../config';
import './item.scss';
import deleteImg from './img/delete.png';
import editImg from './img/edit.png';
const map = config.map.main;
export default class Item extends Component {
    handleDelete() {
        console.log('点击删除');
    }
    handleEdit() {
        console.log('点击编辑');
    }
    render() {
        const { item, index, itemKeyList, itemDescList } = this.props;
        return (
            <View className='item-box'>
                <View className='item-title'>
                    <View className='item-title-left'>
                        <Text className='item-name'>需求编号</Text>
                        <Text className='item-value'>({item.id})</Text>
                    </View>
                    <View className='item-title-right'>
                        <TTag className="item-tag-mr">长绒棉</TTag>
                        <TTag>新疆全省</TTag>
                    </View>
                </View>
                <View className='item-info-list'>
                    {
                        itemKeyList.map(itemI => (
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
                                <Text className='item-desc-item-text'>{item[itemI]}</Text>
                            </View>
                        ))
                    }

                </View>
                <View className='btn-group'>
                    <TButton onClick={() => this.handleDelete(item)}>
                        <View className='btn'>
                            <Image className='btn-icon' src={deleteImg}></Image>
                            <Text className='btn-text'>删除</Text>
                        </View>
                    </TButton>
                    <TButton onClick={() => this.handleEdit(item)}>
                        <View className='btn'>
                            <Image className='btn-icon' src={editImg}></Image>
                            <Text className='btn-text'>编辑</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}