

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

        //this.mapCtx.moveToLocation()




        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                var latitude = res.latitude

                var longitude = res.longitude
                this.setState({
                    latitude: 23.0999941+Date.now(),
                    longitude: 113.3245201+Date.now(),
                    key: Date.now()
                });
                let mpCtx = wx.createMapContext("myMap");
                mpCtx.moveToLocation(true);
            }
        })


    }

    render() {
        const { longitude, latitude, markers } = this.state;
        console.log('render')
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

                    <Map longitude={longitude}
                        latitude={latitude} markers={markers} className="maps" id="myMap" showLocation />
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

