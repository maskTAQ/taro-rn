import Taro, { Component } from '@tarojs/taro'
import { AtActionSheet, AtActionSheetItem } from "taro-ui";
import { ScrollView, Text } from '../index';
import classnames from 'classnames';

export default class TPicker extends Component {
    static options = {
        addGlobalClass: true
    }
    getItemByLabel(l) {
        const { option } = this.props;
        for (let i = 0; i < option.length; i++) {
            const { label } = option[i];
            if (String(label) === String(l)) {
                return option[i];
            }

        }
        return null
    }
    handleClick(label, value) {
        const { onClick } = this.props;
        onClick && onClick({ label, value });
    }
    render() {
        const { show, onCancel, onClose, option } = this.props;
        return (

            <AtActionSheet isOpened={show} onCancel={onCancel} onClose={onClose} cancelText='取消' >
                <ScrollView>
                    {
                        option.map(item => {
                            const { label, value } = item;
                            return (
                                <View className="item" key={value} onClick={this.handleClick.bind(this, label, value)}>
                                    <Text className="item-text">
                                        {label}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </AtActionSheet>

        )
    }
}


