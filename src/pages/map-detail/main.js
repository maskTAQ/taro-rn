

import { Component } from '@tarojs/taro';
import { View, Text, TInput, Image, TButton } from '../../components';
import { Map } from '@tarojs/components'

import './main.scss';
import ip from './img/ip.png'
import fk from './img/fk.png'
import icon from './img/icon.png'


export default class MapDetail extends Component {


    state = {
        latitude: 23.099994,
        longitude: 113.324520,
        markers: [{
            iconPath: icon,
            id: 0,
            latitude: 23.099994,
            longitude: 113.324520,
            width: 30,
            height: 30
        }],
    };

    moveToLocation = () => {
        console.log('回到初始位置')
        this.mapCtx.moveToLocation()
        
       // let mpCtx = wx.createMapContext("myMap");
            // mpCtx.showToLocation();
 
        // this.setState({
        //     latitude:23.099994,
        //     longitude:113.324520,
        //     // markers:[
        //     //     {
        //     //         latitude:23.099994,
        //     //         longitude:113.324520,
        //     //     }
        //     // ],
        // });

    }

    render() {
        const { longitude, latitude, markers } = this.state;

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
                <View className="map">

                    <Map longitude={longitude} id="myMap" 
                        latitude={latitude} markers={markers} className="maps" showLocation />
                    <View className="map-btn">
                        <TButton onClick={this.moveToLocation}>
                            <Image className="map-img" src={ip}></Image>
                        </TButton>
                        <TButton>
                            <Image className="map-img" src={fk}></Image>
                        </TButton>

                    </View>
                </View>
            </View>
        )
    }
}

