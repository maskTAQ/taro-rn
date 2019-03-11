import { Component } from '@tarojs/taro'
import { AtActivityIndicator } from 'taro-ui';

import "taro-ui/dist/style/components/activity-indicator.scss";
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
                <AtActivityIndicator />
            </View>
        )
    }
}


