import Taro, { Component } from '@tarojs/taro'
import { Input } from '@tarojs/components'
import classnames from 'classnames';
import './index.scss'
export default class TInput extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { className, placeholder, value, onInput } = this.props;
        return (
            <Input
                className={classnames('input', className)}
                placeholder={placeholder}
                value={value}
                onInput={onInput}
            >{this.props.children}
            </Input>
        )
    }
}


