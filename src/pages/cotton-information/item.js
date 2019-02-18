
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
        const { item } = this.props;
        return (
            <View className='item'>
                <Image src={item.imgSrc} className="item-icon" />
                <View className="item-content">
                    <Text className="item-title">{item.title}</Text>
                    <View className="item-content-bottom">
                        <Text className="item-time">{item.time}</Text>
                        <Text className="item-readme">已有{item.readme}人次阅读</Text>
                    </View>
                </View>
            </View>
        )
    }
}