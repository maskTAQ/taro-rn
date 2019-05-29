import React from 'react';
import { Component } from '../../platform';

import { View, Text, Image, } from '../index';
import './index.scss'
import shareImg from './img/share.png';
import homeIcon from './img/home.png';
import kfImg from './img/kf.png';
import { TButton } from '../../ui';
import { back } from '../../actions';
const toolMenu = [
    {
        icon: homeIcon,
        label: '主页',
        routeName: 'home',
    },
    {
        icon: shareImg,
        label: '分享',
        type: 'share'
    },

    {
        icon: kfImg,
        label: '客服',
        type: 'contact'
    }
];
export default class FixedTool extends Component {
    static options = {
        addGlobalClass: true
    }
    back() {
        back();
    }
    render() {
        const { home } = this.props;
        return (
            <View className="tool-bar">
                {
                    toolMenu.map(item => {
                        const { label, icon, type, routeName } = item;
                        return type ? (
                            <button open-type={type} class="tool-item" key={label}>
                                <Image className="tool-item-icon" src={icon}></Image>
                                <Text className="tool-item-text">
                                    {label}
                                </Text>
                            </button>
                        ) : !home ? (
                            <TButton onClick={this.back} key={label}>
                                <View className="tool-item">
                                    <Image className="tool-item-icon" src={icon}></Image>
                                    <Text className="tool-item-text">
                                        {label}
                                    </Text>
                                </View>
                            </TButton>
                        ) : null
                    })
                }
            </View>
        )
    }
}


