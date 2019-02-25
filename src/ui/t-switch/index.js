import Taro, { Component } from '@tarojs/taro'
import { AtSwitch } from 'taro-ui'

export default class TSwitch extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { color, checked, disabled, border, onChange } = this.props;
        return (
            <AtSwitch color={color} border={border} disabled={disabled} checked={checked} onChange={onChange} />
        )
    }
}


