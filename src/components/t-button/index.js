import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classnames from 'classnames';
import './index.scss'
export default class TButton extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { onClick, className } = this.props;
        return (
            <View className={classnames('button', className)} onClick={onClick}>
                {this.props.children}
            </View>
        )
    }
}


