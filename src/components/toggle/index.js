import Taro, { Component } from '@tarojs/taro';

import { TButton, View, Text } from '../../ui';
import checkedImg from '../../img/checked.png';
import unCheckedImg from '../../img/unchecked.png';
import './index.scss'
export default class Toggle extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { label = '显示', k, value, onChange } = this.props;
        return (
            <TButton onClick={() => {
                onChange({ key: k, value: !value });
            }}>
                <View className="container">
                    <Text className="label">{label}</Text>
                    <Image className="toogle-img" src={value ? checkedImg : unCheckedImg} />
                </View>
            </TButton>
        )
    }
}


