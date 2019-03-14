import React from 'react';
import { Component } from '../../platform';

import { TButton, View, Text } from '../../ui';
import checkedImg from '../../img/checked.png';
import unCheckedImg from '../../img/unchecked.png';
import './index.scss'
//圆形单选
export default class CRadio extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { k, value, onChange, option = [] } = this.props;
        return (
            <View className="container">
                {
                    option.map(item => {
                        return (
                            <TButton onClick={() => {
                                onChange({ key: k, value: item });
                            }}>
                                <View className="item">
                                    <Image className="toogle-img" src={value === item ? checkedImg : unCheckedImg} />
                                    <Text className="label">{item}</Text>
                                </View>
                            </TButton>
                        )
                    })
                }
            </View>

        )
    }
}






