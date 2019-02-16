

import { Component } from '@tarojs/taro';

import { View, Image, TButton, TTabs, TTabPane, Text } from '../../components'
import './main.scss';
import './component.scss';
const toolList = [
    {
        icon: '',
        label: '收藏'
    },
    {
        icon: '',
        label: '历史'
    },
    {
        icon: '',
        label: '升贴水'
    },
];

export default class User extends Component {


    state = {

    };
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleClick(current) {
        this.setState({
            current
        });
    }
    render() {
        return (
            <View className="container">
                <View className="user-card">
                    <View className="user-info">
                        <Image className="user-icon" />
                        <View className="user-info-detail">
                            <Text className="company-name">苏州易贸通进出口有限公司</Text>
                            <Text className="mobile">135****2591</Text>
                        </View>
                    </View>
                    <View className="tool">
                        {
                            toolList.map(item => {
                                const { icon, label } = item;
                                return (
                                    <View className="tool-item">
                                        <Image className="tool-item-icon"/>
                                        <Text className="tool-item-label">{label}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}

