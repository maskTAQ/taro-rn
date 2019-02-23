import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { TInput, TButton, Image } from '../index';

import searchImg from './img/search.png';
import qrImg from './img/qr.png';
import './index.scss'
export default class SearchTool extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { onClick, className } = this.props;
        return (
            <View className="container">
                <View className="content">
                    <View className="input-box">
                        <TInput className="search-input" placeholder="通过批号/工厂/仓库搜索" />
                    </View>

                    <View className="icon-btn-group">
                        <TButton>
                            <Image className="icon-btn mr" src={searchImg}></Image>
                        </TButton>
                        <TButton>
                            <Image className="icon-btn" src={qrImg}></Image>
                        </TButton>
                    </View>
                </View>
            </View>
        )
    }
}


