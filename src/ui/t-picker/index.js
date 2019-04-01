import Taro, { Component } from '@tarojs/taro'
import { PickerView, PickerViewColumn } from '@tarojs/components'
import { ScrollView, Text, View } from '../index';
import classnames from 'classnames';


export default class TPicker extends Component {
    static options = {
        addGlobalClass: true,

    }
    state = {
        nextValue: null
    }
    getItemByLabel(l) {
        const { option } = this.props;
        for (let i = 0; i < option.length; i++) {
            const { label } = option[i];
            if (String(label) === String(l)) {
                return option[i];
            }

        }
        return null
    }
    handleClose = () => {
        this.setState({
            nextValue: null
        });
        this.props.onClose();
    }
    handleCancle = () => {
        this.setState({
            nextValue: null
        });
        this.props.onCancel()
    }
    handleConfirm = () => {
        const { nextValue } = this.state;
        const { onClick } = this.props;
        if (nextValue) {
            onClick(nextValue);
        } else {
            this.handleCancle();
        }
    }
    handleChange = e => {
        const { option } = this.props;
        const { value } = e.detail;
        this.setState({
            nextValue: option[value[0] - 1]
        });
    }
    getOption = option => {
        //return option;
        return [{ label: '请选择', value: '请选择' }].concat(option);
    }
    render() {
        const { show, option, value } = this.props;
        //const i = option.findIndex(item => item.value === value);
        // const v = [i];
        return (
            <View >
                {
                    show && (
                        <View className="layer">
                            <View className="hot" onClick={this.handleClose}></View>
                            <View className="content" >
                                <View className="tool-bar">
                                    <View className="btn cancel" onClick={this.handleCancle}>取消</View>
                                    <View className="btn comfirm" onClick={this.handleConfirm}>确定</View>
                                </View>
                                <PickerView
                                    style="width: 100%; height:100%;"
                                    className="picker-box"
                                    //value={v}
                                    onChange={this.handleChange}
                                >

                                    <PickerViewColumn>

                                        {
                                            this.getOption(option).map(item => {
                                                const { label, value } = item;
                                                return (
                                                    <View key={value} className="item">{label}</View>
                                                )
                                            })
                                        }

                                    </PickerViewColumn>

                                </PickerView>
                            </View>
                        </View>
                    )
                }
            </View>
        )
        // return (

        //     <AtActionSheet isOpened={show} onCancel={onCancel} onClose={onClose} cancelText='取消' >
        //         <ScrollView>

        //             {
        //                 option.map(item => {
        //                     const { label, value } = item;
        //                     return (
        //                         <View className="item" key={value} onClick={this.handleClick.bind(this, label, value)}>
        //                             <Text className="item-text">
        //                                 {label}
        //                             </Text>
        //                         </View>
        //                     )
        //                 })
        //             }
        //         </ScrollView>
        //     </AtActionSheet>

        // )
    }
}


