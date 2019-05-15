import Taro, { Component } from '@tarojs/taro'
export default class TWebView extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { url } = this.props;
        return (
            <web-view src={url} className="navigator"></web-view>
        )
    }
}


