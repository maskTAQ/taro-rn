


import Taro, { Component } from '@tarojs/taro'
import { AtTabs } from 'taro-ui';
import './index.scss';
export default class TTabs extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { current, tabList, onClick } = this.props;
        return (
            <AtTabs current={current} tabList={tabList.map(title=>({title}))} onClick={onClick}>
                {this.props.children}
            </AtTabs>
        )
    }
}