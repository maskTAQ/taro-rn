import Taro, { Component } from '@tarojs/taro'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

export default class TModal extends Component {
    static options = {
        addGlobalClass: true
    }
    render() {
        const { visible, title, onClose, onCancel, hasCancalButton = true, onConfirm, confirmText = '确定' } = this.props;
        return (
            <AtModal
                isOpened={visible}
                onClose={onClose}
            >
                {title && <AtModalHeader>{title}</AtModalHeader>}
                <AtModalContent>
                    {this.props.children}
                </AtModalContent>
                <AtModalAction>
                    <Button onClick={onCancel}>取消</Button>
                    <Button onClick={onConfirm}>{confirmText || '确定'}</Button>
                </AtModalAction>
            </AtModal>
        )
    }
}


