import Taro, { Component } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import classnames from 'classnames';
import './index.scss'
export default class TTag extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { onClick, className } = this.props;
        console.log(classnames('tag', className),'sadads')
        return (
            <Text className={classnames('tag', className)} onClick={onClick}>{this.props.children}</Text>
        )
    }
}


