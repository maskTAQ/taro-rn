import Taro, { Component } from '@tarojs/taro'
import { Picker } from '@tarojs/components';

export default class TDatePicker extends Component {
    handleChange = e => {
        const { onChange } = this.props;
        onChange(e.detail.value);
    }
    render() {
        return (
            <Picker mode='date' onChange={this.handleChange}>
                {this.props.children}
            </Picker>
        )
    }
}