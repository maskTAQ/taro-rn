import React from 'react';
import { Component } from '../../platform';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import checkedImg from './img/radio-active.png';
import unCheckedImg from './img/radio.png';
import './plateform-select.scss'
//方形多选
export default class PlateformSelect extends Component {
    static options = {
        addGlobalClass: true
    }
    handeChange(v) {
        const { value, onChange } = this.props;
        const valueWrapper = value || [];
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
        onChange(nextValue);
    }
    render() {
        const { value: v, option = [] } = this.props;
        const value = v || [];
        return (
            <View className="container">
                {
                    option.map(item => {
                        const { label, icon } = item;
                        const isActive = value.includes(label);
                        return (
                            <TButton key={label} onClick={this.handeChange.bind(this, label)}>
                                <View className="item">
                                    <Image className="toogle-img" src={isActive ? checkedImg : unCheckedImg} />
                                    <Text className="item-text">
                                        {label}
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