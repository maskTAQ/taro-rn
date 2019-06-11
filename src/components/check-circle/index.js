import React from 'react';
import { Component } from '../../platform';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import activeImg from './img/radio-active.png';
import unactiveImg from './img/radio.png';
import './index.scss'
//圆形多选
export default class CheckCircle extends Component {
    static options = {
        addGlobalClass: true
    }
    handeChange(v) {
        const { k, value, onChange } = this.props;
        const valueWrapper =  value ? Array.isArray(value) ? value : [value] : [];
        const i = valueWrapper.indexOf(v);
        let nextValue = valueWrapper;
        if (i > -1) {
            nextValue = update(nextValue, {
                $splice: [[i, 1]]
            });
        } else {
            nextValue = update(nextValue, {
                $push: [v]
            });
        }
        onChange({ key: k, value: nextValue });
    }
    render() {
        const { value: v, option = [] } = this.props;
        const value = v || [];
        let list;
        if (Array.isArray(option)) {
            list = option;
        } else {
            list = [option]
        }
        return (
            <View className="container">
                {
                    list.map(item => {
                        const isActive = value.includes(item);
                        return (
                            <TButton key={item} onClick={this.handeChange.bind(this, item)}>
                                <View className={"item"}>
                                    <Image className="item-icon" src={isActive ? activeImg : unactiveImg} />
                                    <Text className={"item-text"}>
                                        {item}
                                    </Text>
                                </View>
                            </TButton>
                        )
                    })
                }
            </View>
        )
    }
}


