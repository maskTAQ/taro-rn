

import { Component } from '@tarojs/taro';


import { View, Text, TMap, TInput, TSTab } from '../../components';
import { Button, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './main.scss';

import icon from './img/icon.png'


export default class DemandCustom extends Component {
    state = {
        activeTab: '国产棉花'
    };
    handleTabChange = activeTab => {
        this.setState({
            activeTab
        });
    }

    render() {
        const { activeTab } = this.state;
        return (
            <View className='container'>
                <TSTab list={['国产棉花', '进口棉花']} active={activeTab} onTabChange={this.handleTabChange} />
                {activeTab}
            </View>
        )
    }
}

