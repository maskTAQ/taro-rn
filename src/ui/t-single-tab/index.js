import Taro, { Component } from '@tarojs/taro'
import { AtSwitch } from 'taro-ui'

import { Text, Image, TButton } from '../index';
import './index.scss';
export default class TSingleTab extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { list, active, tag, onTabChange } = this.props;
        const t = tag || {};
        return (
            <View className="container">
                {
                    list.map(item => {
                        return (
                            <View
                                key={item}
                                onClick={() => onTabChange(item)}
                                className="item"
                                style={{ borderBottom: active === item ? '2px solid #44bdf7' : '2px solid transparent' }}>
                                <Text className="item-text" style={{ color: active === item ? '#44bdf7' : '#000' }}>{item}{t[item] || ''}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}


