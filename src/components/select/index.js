import React from 'react';
import { Component } from '../../platform';

import { TButton, View, Text } from '../../ui';
import './index.scss'
export default class Select extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { label, value, onClick, className } = this.props;
        return (
            <TButton className={className} onClick={onClick}>
                <View className="select-box">
                    <View className="label">
                        <Text className="label-text">{label}:</Text>
                    </View>
                    <View className="value">
                        <Text className="value-text">{value || '请选择'}</Text>
                    </View>
                </View>
            </TButton>

        )
    }
}


