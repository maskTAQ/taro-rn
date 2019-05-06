import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import './index.scss'
//方形多选
export default class CapsuleChoose extends Component {
    static options = {
        addGlobalClass: true
    }
    handeChange(v) {
        const { k, value, onChange } = this.props;
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
        onChange({ key: k, value: nextValue });
    }
    render() {
        const { value, option = [], onChange } = this.props;
        return (
            <View className="container">
                {
                    option.map(item => {
                        const isActive = value === item;
                        return (
                            <TButton key={item} onClick={() => onChange(item)}>
                                <View className={classnames("item", {
                                    "active-item": isActive
                                })}>
                                    <Text className={classnames("item-text", {
                                        "active-item-text": isActive
                                    })}>
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