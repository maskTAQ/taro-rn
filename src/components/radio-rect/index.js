import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import './index.scss'
//方形单选
export default class RadioRect extends Component {
    static options = {
        addGlobalClass: true
    }
    formateData(d) {
        const data = [].concat(d);
        const result = [];

        while (data.length) {
            if (result.length === 0) {
                result.push([])
            }
            if (result[result.length - 1].length > 3) {
                result.push([data.shift()]);
            } else {
                result[result.length - 1].push(data.shift());
            }
        }
        return result;
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
        const { option = [], value: v } = this.props;
        const value = v || [];
        return (
            <View className="container">
                {
                    option.map(item => {
                        const isActive = value.includes(item);
                        return (
                            <TButton key={item} onClick={this.handeChange.bind(this, item)}>
                                <View className={classnames("check-item", {
                                    "active-check-item": isActive
                                })}>
                                    <Text className={classnames("check-item-text", {
                                        "active-check-item-text": isActive
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


