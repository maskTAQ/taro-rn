import React from 'react';
import Taro from '@tarojs/taro';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import './index.scss';
const ballWidth = 30 / 2;
const { windowWidth } = Taro.getSystemInfoSync();
const padding = 20 / 2;
const maxLeft = windowWidth - ballWidth - padding * 2;
export default class Slidebothway extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        start: 0,
        end: maxLeft
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
    handleMove = (tick, e) => {
        e.stopPropagation();
        const { start, end } = this.state;
        const { clientX } = e.changedTouches[0];
        const nextValue = clientX - padding;
        if (tick === 'start' && nextValue >= 0 && nextValue <= end) {
            this.setState({
                [tick]: nextValue
            });
        }
        if (tick === 'end' && nextValue <= maxLeft && nextValue >= start) {
            this.setState({
                [tick]: nextValue
            });
        }

    }
    getValue() {
        const { start, end } = this.state;
        const { option } = this.props;
        const starting = Number(option[0]);
        const ending = Number(option[option.length - 1]);
        const range = ending - starting;
        return {
            min: (start / maxLeft * range + starting).toFixed(1),
            max: (end / maxLeft * range + starting).toFixed(1),
        }
    }
    render() {
        const { start, end } = this.state;
        const { option = [], value: v, } = this.props;
        const { min, max } = this.getValue();
        const value = v || [];
        return (
            <View className="container">
                <Text className="tag">{min === max ? min : `${min}~${max}`}</Text>
                <View className="pathway">

                    <View className="start" onTouchMove={this.handleMove.bind(this, 'start')} style={{ left: start + 'px' }}>
                        <View className="ball" />
                    </View>


                    <View className="end" onTouchMove={this.handleMove.bind(this, 'end')} style={{ left: start + 'px' }} style={{ left: end + 'px' }}>
                        <View className="ball" />
                    </View>

                </View>
                <View className="content">
                    {
                        option.map(item => {
                            const isActive = value.includes(item);
                            return (
                                <TButton key={item} onClick={this.handeChange.bind(this, item)}>
                                    <View className={classnames("item", {
                                        "active-check-item": isActive
                                    })}>
                                        <Text className={classnames("item-text", {
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
            </View>
        )
    }
}


