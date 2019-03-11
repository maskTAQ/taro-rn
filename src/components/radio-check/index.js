import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';

import { TButton, View, Text } from '../../ui';
import './index.scss'
export default class RadioCheck extends Component {
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
        onChange({ key: k, value: value === v ? '' : v });
    }
    render() {
        const { option = [], value } = this.props;
        const group = this.formateData(option);
        return (
            <View className="container">
                {
                    group.map((row, rowI) => {
                        return (
                            <View className="row" key={rowI}>
                                {
                                    row.map(item => {
                                        const isActive = value === item;
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
                    })
                }
            </View>
        )
    }
}


