import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import './index.scss'
const isVisible = ({ visible = true, params }) => {
    let isVisible = true;
    if (typeof visible === 'string') {
        if (visible.includes('=')) {
            const [key, value] = visible.split('=');
            if (Array.isArray(params[key])) {
                isVisible = params[key].some(item => item === value);
            } else {
                isVisible = params[key] === value;
            }

        }
        if (visible.includes('!=')) {
            const [key, value] = visible.split('!=');
            if (Array.isArray(params[key])) {
                isVisible = params[key].every(item => item !== value);
            } else {
                isVisible = params[key] !== value;
            }
        }
    }
    if (typeof visible === 'boolean') {
        isVisible = visible;
    }
    return isVisible;
}
export default class TextSelect extends Component {
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
        const { value:v, option = [],params } = this.props;
        const value = v||[];
        const showOption = option.filter(item=>isVisible({visible:item.visible,params}));
        return (
            <View className="container">
                {
                    showOption.map(item => {
                        const isActive = value.includes(item.label);
                        return (
                            <TButton key={item} onClick={this.handeChange.bind(this, item.label)}>
                                <View className={classnames("item", {
                                    "active-item": isActive
                                })}>
                                    <Text className={classnames("item-text", {
                                        "active-item-text": isActive
                                    })}>
                                        {item.label}
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