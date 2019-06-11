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
        const valueWrapper = value ? Array.isArray(value) ? value : [value] : [];
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
        const { k, value, onChange, option = [] } = this.props;
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
                        const isActive = value === item;
                        return (
                            <TButton key={item} onClick={() => {
                                onChange({ key: k, value: item });
                            }}>
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


