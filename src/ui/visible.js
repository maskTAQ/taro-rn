import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

export default class TButton extends Component {
    render() {
        const { show } = this.props;
        return (
            <View>
                {show ? this.props.children : ''}
            </View>
        )
    }
}


