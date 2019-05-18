import React from 'react';
import { Component } from '../../platform';

import { View, Text, Image, } from '../index';
import './index.scss'
import shareImg from './img/share.png';
import bjImg from './img/bj.png';
import kfImg from './img/kf.png';
import { TButton } from '../../ui';
import { navigate } from '../../actions';
const toolMenu = [
    {
        icon: shareImg,
        label: '分享',
        type: 'share'
    },
    {
        icon: bjImg,
        label: '报价',
        routeName: 'offer-tool',
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
    goCloudOffer() {
        navigate({
            routeName: 'offer-tool'
        });
    }
    render() {
        const { onClick, className } = this.props;
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
                        ) : (
                                <TButton onClick={this.goCloudOffer}>
                                    <View className="tool-item" onClick={this.baojia} key={label}>
                                        <Image className="tool-item-icon" src={icon}></Image>
                                        <Text className="tool-item-text">
                                            {label}
                                        </Text>
                                    </View>
                                </TButton>
                            )
                    })
                }
            </View>
        )
    }
}


