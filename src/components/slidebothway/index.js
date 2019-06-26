import React from 'react';
import Taro from '@tarojs/taro';
import { Component } from '../../platform';
import classnames from 'classnames';
import update from 'immutability-helper';

import { TButton, View, Text } from '../../ui';
import './index.scss';
const ballWidth = 30 / 2;
const { windowWidth } = Taro.getSystemInfoSync();
//20为父容器的padding 滑轨离屏幕左侧的距离为 屏幕的十分之一
const padding = (windowWidth-20) * 1 / 10;
const maxLeft = (windowWidth-20) * 8 /10 - ballWidth/2;
export default class Slidebothway extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        start:0,
        end: maxLeft
    }
    componentWillMount() {
        this.onChange();
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
    onChange = () => {
        const { onChange, k } = this.props;
        onChange({
            key: k,
            value: this.getValue()
        });
    }
    getValue() {
        const { start, end } = this.state;
        const { option } = this.props;
        const starting = Number(option ? option[0] : 0);
        const ending = Number(option ? option[option.length - 1] : 0);
        const range = ending - starting;
        return {
            min: (start / maxLeft * range + starting).toFixed(1),
            max: (end / maxLeft * range + starting).toFixed(1),
        }
    }
    render() {
        const { start, end } = this.state;
        const { option = [], value } = this.props;
        const { min, max } = this.getValue();
        return (
            <View className="container">
                <Text className="tag">{min === max ? min : `${min}~${max}`}</Text>
                <View className="pathway-box">
                    <View className="pathway">
                        <View
                            className="start"
                            onTouchMove={this.handleMove.bind(this, 'start')}
                            onTouchEnd={this.onChange}
                            style={{ left: start + 'px' }}
                        >
                            <View className="ball" />
                        </View>
                        <View
                            className="end"
                            onTouchMove={this.handleMove.bind(this, 'end')}
                            onTouchEnd={this.onChange}
                            style={{ left: end + 'px' }}>
                            <View className="ball" />
                        </View>

                    </View>
                </View>
                <View className="content">
                    {
                        option.map(item => {
                            return (
                                <TButton key={item} onClick={this.handeChange.bind(this, item)}>
                                    <View className="item">
                                        <Text className="item-text">
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


