

import React from 'react';
import { Component } from '../../platform';

import { View, Image, TButton,Text } from '../../ui';
import './main.scss';
import cloudImg from '../../img/cloud.png';
import {navigate} from '../../actions';
export default class OfferTool extends Component {
    goAddBatch(){
        navigate({routeName:'add-batch'});
    }
    goImportCotton(){
        navigate({routeName:'publish-import-cotton'});
    }
    render() {
        return (
            <View className='container'>
                <View className="content mb">
                    <TButton className="btn" onClick={this.goAddBatch}>
                        <View className="item">
                            <View className="item-icon-box item-bg-1">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">国产棉-新疆棉</Text>
                        </View>
                    </TButton>
                    <TButton className="btn"  onClick={this.goImportCotton}>
                        <View className="item">
                            <View className="item-icon-box item-bg-2">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">进口棉</Text>
                        </View>
                    </TButton>
                </View>
                <View className="content">
                    <TButton className="btn"  onClick={this.goAddBatch}>
                        <View className="item">
                            <View className="item-icon-box item-bg-3">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">国产棉-内地棉</Text>
                        </View>
                    </TButton>
                    <TButton className="btn" onClick={this.goAddBatch}>
                        <View className="item">
                            <View className="item-icon-box item-bg-4">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">拍储棉</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}

