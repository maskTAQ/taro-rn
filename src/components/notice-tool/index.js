import React from 'react';
import { Component } from '../../platform';

import { View, Text } from '../../ui';
import './index.scss';
const placeholderNew = { title: '暂无最新资讯' };
export default class NoticeTool extends Component {
    static options = {
        addGlobalClass: true
    }
    state = {
        currentIndex: 0,
        list: ['二胎妈妈为什么要都做孕前检查?', '二胎妈妈为什么要都做孕前检查as!']
    }
    componentDidMount() {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            const { currentIndex, list } = this.state;
            if (list.length === 1) {
                return
            }
            if (currentIndex === list.length - 1) {
                return this.setState({
                    currentIndex: 0
                })
            }
            this.setState({
                currentIndex: currentIndex + 1
            });
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        const { currentIndex, list } = this.state;
        const { data = [] } = this.props;
        const currentNew = data[currentIndex] || placeholderNew;
        return (
            <View className="container">
                <Text className="label">棉讯</Text>
                <View className="border"></View>
                <View className="content">
                    <Text className="content-text">{currentNew.title}</Text>
                </View>
            </View>
        )
    }
}


