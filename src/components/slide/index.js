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
const padding = (windowWidth - 20) * 1 / 10;
const maxLeft = (windowWidth - 20) * 8 / 10 - ballWidth / 2;
export default class Slide extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        left: 0
    }
    componentWillMount() {
        this.onChange();
    }
    handleMove = (e) => {
        e.stopPropagation();
        const { clientX } = e.changedTouches[0];
        const nextValue = clientX - padding;
        if (nextValue >= 0 && nextValue <= maxLeft) {
            this.setState({
                left: nextValue
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
        const { left } = this.state;
        const { option } = this.props;
        const starting = Number(option ? option[0] : 0);
        const ending = Number(option ? option[option.length - 1] : 0);
        const range = ending - starting;
        return (left / maxLeft * range + starting).toFixed(1) || 0;
    }
    render() {
        const { left } = this.state;
        const { option = [], value } = this.props;
        //const { min, max } = this.getValue();
        return (
            <View className="container">
                <Text className="tag">{`[${option[0]}~${option[1]}] : ${this.getValue()}`}</Text>
                <View className="pathway-box">
                    <View className="pathway">
                        <View
                            className="dot"
                            onTouchMove={this.handleMove}
                            onTouchEnd={this.onChange}
                            style={{ left: left + 'px' }}
                        >
                            <View className="ball" />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


