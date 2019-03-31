import React from 'react';
import { Component } from '../../platform';

import { TLoading } from '../../ui';
import './index.scss'

export default class StatusBox extends Component {
    render() {
        const { status } = this.props;
        return (
            <View className="container">
                {
                    status === 'success' && this.props.children
                }
               
                {
                    status === 'loading' && <TLoading />
                }
                {
                    status === 'error' && (
                        <Text className="error">加载失败</Text>
                    )
                }
            </View>
        )
    }
}