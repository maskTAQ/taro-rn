

import { Component } from '@tarojs/taro';


import { View, Image, TButton } from '../../components';
import './main.scss';
import cloudImg from '../../img/cloud.png';
export default class OfferTool extends Component {

    render() {
        return (
            <View className='container'>
                <View className="content">
                    <TButton className="btn">
                        <View className="item">
                            <View className="item-icon-box item-gc">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">国产棉</Text>
                        </View>
                    </TButton>
                    <TButton className="btn">
                        <View className="item">
                            <View className="item-icon-box item-import">
                                <Image src={cloudImg} className="item-icon"></Image>
                            </View>
                            <Text className="item-label">进口棉</Text>
                        </View>
                    </TButton>
                </View>
            </View>
        )
    }
}

