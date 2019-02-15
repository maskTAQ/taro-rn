
import Taro, { Component } from '@tarojs/taro'
import { AtTabsPane } from 'taro-ui';
import "taro-ui/dist/style/components/tabs.scss";
//import "~taro-ui/dist/style/components/tabs.scss";
export default class TTabPane extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { current, index} = this.props;
        return (
            <AtTabsPane current={current} index={index}>
                {this.props.children}
            </AtTabsPane>
        )
    }
}