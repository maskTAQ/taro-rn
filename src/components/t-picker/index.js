import Taro, { Component } from '@tarojs/taro'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import classnames from 'classnames';

export default class TPicker extends Component {
    static options = {
        addGlobalClass: true
    }
    filter(e) {
        this.props.onInput && this.props.onInput(e.target.value);
    }
    getItemByLabel(l){
         const { option } = this.props;
        
        for(let i=0;i<option.length;i++){
            const {label} = option[i];
            if(String(label) === String(l)){
                return option[i];
            }
           
        }
        console.log(l,'---',option)
        return null
    }
    handleClick(e) {
        const { onClick } = this.props;
        onClick && onClick(this.getItemByLabel(e._relatedInfo.anchorTargetText));
    }
    render() {
        const { show, onCancel, onClose, option } = this.props;
        return (
            <AtActionSheet isOpened={show} onCancel={onCancel} onClose={onClose} cancelText='取消' >
                {
                    option.map(item => {
                        const {label,value} = item;
                        return (
                            <AtActionSheetItem data-value={value} key={item} onClick={this.handleClick}>
                                {label}
                            </AtActionSheetItem>
                        )
                    })
                }
            </AtActionSheet>
        )
    }
}


