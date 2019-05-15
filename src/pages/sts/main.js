

import React from 'react';
import { Component } from '../../platform';
import { View, TWebView } from '../../ui'

import './main.scss';

export default class STS extends Component {

    render() {
        return (
            <View className='container'>
                <TWebView url="https://www.emiancang.com/work/litres/litres.jsp" />
            </View>
        )
    }
}

