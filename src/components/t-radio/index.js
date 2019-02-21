import Taro, { Component } from '@tarojs/taro'
import { AtSwitch } from 'taro-ui'

import { Text, Image, TButton } from '../index';
import activeImg from './img/radio-active.png';
import unactiveImg from './img/radio.png';
import './index.scss';
export default class TRadio extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { option, checkd, onCheckdChange } = this.props;
        return (
            <View className="container">
                {
                    option.map(item => {
                        const { value, label } = item
                        return (
                            <TButton onClick={() => onCheckdChange(item)}>
                                <View className="item">
                                    <Image className="item-icon" src={value === checkd ? activeImg : unactiveImg} />
                                    <Text className="item-text">{label}</Text>
                                </View>
                            </TButton>

                        )
                    })
                }
            </View>
        )
    }
}


