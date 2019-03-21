import React from 'react';
import { Component } from '../../platform';

import { View, TButton, Text, ScrollView, TLoading } from '../../ui';
import './index.scss';
export default class ListWrapper extends Component {
    render() {
        const { status, data } = this.props;
        return (
            <ScrollView>
                <View className="container">
                    {
                        status === 'loading' && <TLoading />
                    }
                    {
                        status === 'error' && (
                            <TButton>
                                <View className="try-btn">
                                    <Text className="try-btn-text">数据加载失败,点我重试</Text>
                                </View>
                            </TButton>
                        )
                    }
                    {
                        status === 'success' && this.props.children
                    }
                    {
                        status === 'success' && data.list.length === 0 && (
                            <View className="no-data">
                                <Text className="no-data-text">暂无数据</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        )
    }
}