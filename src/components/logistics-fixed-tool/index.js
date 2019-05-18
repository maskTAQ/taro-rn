import React from 'react';
import { Component } from '../../platform';

import { View, Text, Image } from '../index';
import { TButton } from '../../ui';
import './index.scss'
import yfbImg from './img/yfb.png';
import publishImg from './img/publish.png';
import kfImg from './img/kf.png';
const toolMenu = [
    {
        icon: publishImg,
        label: '发布',
    },
    {
        icon: yfbImg,
        label: '已发布',
    },
    {
        icon: kfImg,
        label: '客服',
        type: 'contact'
    }
];
export default class LogisticsFixedTool extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { onClick, showPublish = true } = this.props;
        console.log(toolMenu.filter(({ label }) => label !== '发布' || (label === '发布' && showPublish)))
        return (
            <View className="tool-bar">
                {
                    toolMenu.filter(({ label }) => label !== '发布' || (label === '发布' && showPublish)).map(item => {
                        const { label, icon, type } = item;
                        return type ? (
                            <button open-type={type} class="tool-item" key={label}>
                                <Image className="tool-item-icon" src={icon}></Image>
                                <Text className="tool-item-text">
                                    {label}
                                </Text>
                            </button>
                        ) : (
                                <TButton>
                                    <View className="tool-item" onClick={onClick.bind(this, label)} key={label}>
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


