import React from 'react';
import { Component } from '../../platform';
import classnames from 'classnames';

import { View, Text } from '../../ui';
import dateImg from '../../img/date.png';
import './index.scss'
export default class DatePicker extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { date,className } = this.props;
        return (
            <View className={classnames('container',className)}>
                <Text className="label">{date ? date : '年-月-日'}</Text>
                <Image className="date-img" src={dateImg} />
            </View>
        )
    }
}


