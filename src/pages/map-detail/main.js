

import React from 'react';
import { Component } from '../../platform';


import { View, Text } from '../../ui';
import TInput from '../../ui/t-input';
import TModal from '../../ui/t-modal';
import { TMap } from '../../components';
import './main.scss';
import icon from './img/icon.png'

export default class MapDetail extends Component {
    state = {
        isModalVisible: false,
        feedback: '',
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
    handleClickLocation = () => {
        wx.getLocation({
            type: 'gcj02',
            success: (res) => {
                var latitude = res.latitude + (Math.random() * 0.01).toFixed();
                var longitude = res.longitude + (Math.random() * 0.01).toFixed();
                this.setState({
                    latitude,
                    longitude,
                    key: Date.now()
                });
                let mpCtx = wx.createMapContext("myMap");
                mpCtx.moveToLocation(true);
            }
        })
    }
    handleClickFeedback = () => {
        this.setState({
            isModalVisible: true
        });
    }
    handleClose = () => {
        this.setState({
            isModalVisible: false
        });
    }
    submitFeedBack = () => {
        this.handleClose();
    }
    changeFeedback = v => {
        this.setState({
            feedback: v
        });
    }
    render() {
        const { longitude, latitude, markers, isModalVisible, feedback } = this.state;
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
                    {
                        !isModalVisible && (
                            <TMap
                                onClickLocation={this.handleClickLocation}
                                onClickFeedback={this.handleClickFeedback}
                                longitude={longitude}
                                latitude={latitude}
                                markers={markers}
                                id="myMap" showLocation />
                        )
                    }

                </View>
                <TModal title="投诉建议" visible={isModalVisible} onClose={this.handleClose} onCancel={this.handleClose} onConfirm={this.this.submitFeedBack}>
                    <TInput className="input" value={feedback} onInput={this.changeFeedback} />
                </TModal>

            </View>
        )
    }
}

