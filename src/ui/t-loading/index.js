import { Component } from '@tarojs/taro'
import { AtActivityIndicator } from 'taro-ui';
import './index.scss';

export default class TLoading extends Component {
    static options = {
        addGlobalClass: true
    }
    filter(e) {
        this.props.onInput && this.props.onInput(e.target.value);
    }

    render() {
        const { className, placeholder, value } = this.props;
        return (
            <View className="container">
            <AtActivityIndicator size={32}></AtActivityIndicator>
            <AtActivityIndicator content='加载中...'></AtActivityIndicator>
            </View>
        )
    }
}


