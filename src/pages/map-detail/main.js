

import { Component } from '@tarojs/taro';
import { View, Text, TInput, Image, TButton } from '../../components';
import { Map } from '@tarojs/components'

import './main.scss';
import imgs from './img/logo.png'

export default class MapDetail extends Component {


    state = {

    };


    render() {
        const { } = this.state;

        return (
            <View className='container'>
                <View className="title-name">
                    <Text className="title">我是标题中棉库存有限责任公司</Text>
                </View>
                <View className="line-container">
                    <Text className="laber">地址：</Text>
                    <Text className="content">我是标题中棉库存有限责任公司</Text></View>
                <View className="line-container">
                    <Text className="laber">联系方式：</Text>
                    <Text className="content">我是标题中棉库存有限责任公司</Text></View>
                <view className="map">
                    <Map className="maps" onClick={this.onTap} />
                </view>
            </View>
        )
    }
}

