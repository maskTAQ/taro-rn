import Taro, { Component } from '@tarojs/taro'
import { Input } from '@tarojs/components'

export default class TInput extends Component {
    static options = {
        addGlobalClass: true
    }
    filter(e) {
        this.props.onInput && this.props.onInput(e.target.value);
    }
    
    render() {
        const { className, placeholder, value } = this.props;
        return (
            <Input
                className={className}
                placeholder={placeholder}
                value={value}
                onInput={this.filter}
            >{this.props.children}
            </Input>
        )
    }
}


