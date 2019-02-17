


import Taro, { Component } from '@tarojs/taro'
import { AtTabs } from 'taro-ui';
export default class TTabs extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const {scroll, current, tabList, onClick } = this.props;
        return (
            <AtTabs scroll={scroll} current={current} tabList={tabList.map(title=>({title}))} onClick={onClick}>
                {this.props.children}
            </AtTabs>
        )
    }
}