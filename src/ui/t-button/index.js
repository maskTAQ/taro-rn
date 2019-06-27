import React from 'react';
import { Component } from '../../platform';
import { View } from '../index'
import classnames from 'classnames';
import './index.scss'
export default class TButton extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { onClick, className } = this.props;
        return (
            <View className={classnames('button', className)} onClick={e => {
                e.stopPropagation();
                onClick();
            }}>
                {this.props.children}
            </View>
        )
    }
}


