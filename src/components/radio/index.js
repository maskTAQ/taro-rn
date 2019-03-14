import React from 'react';
import { Component } from '../../platform';

import { TButton, View, Text } from '../../ui';
import checkedImg from '../../img/checked.png';
import unCheckedImg from '../../img/unchecked.png';
import './index.scss'
//圆形单选
export default class Radio extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { label, k, value, onChange } = this.props;
        const v = label || [];
        return (
            <TButton onClick={() => {
                onChange({ key: k, value: !value });
            }}>
                <View className="container">
                    <Text className="label">{v[Number(!!value)] || ''}</Text>
                    <Image className="toogle-img" src={value ? checkedImg : unCheckedImg} />
                </View>
            </TButton>
        )
    }
}


