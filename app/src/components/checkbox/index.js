import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import { Icon } from "../";
import createStyle from "./style";
let styles = null;
export default class Checkbox extends Component {
    static defaultProps = {
        checked: false,
        multiple: false, //
        label: "",
        checkedImg: require("./img/checkbox-checked.png"),
        unCheckedImg: require("./img/checkbox-unchecked.png"),
        onChange() { }
    };
    static contextTypes = {
        theme: PropTypes.object
    };
    static propTypes = {
        checked: PropTypes.bool,
        label: PropTypes.string,
        labelStyle: PropTypes.object,
        onChange: PropTypes.func,
        checkedImg: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        unCheckedImg: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        multiple: PropTypes.bool,
        options: PropTypes.array
    };
    handleChange = (i, checked) => {
        if (typeof i === "number") {
            const { options, multiple } = this.props;
            let nextOptions = Object.assign([], options);
            if (!multiple) {
                nextOptions = nextOptions.map(item => {
                    item.checked = false;
                    return item;
                });
            }
            nextOptions[i].checked = !checked;
            //当为多项时 最少保存一项选中
            if (!checked && nextOptions.some(item => item.checked)) {
                this.props.onChange(nextOptions, i);
            }


        } else {
            const { checked } = this.props;
            this.props.onChange(!checked);
        }
    };
    renderSingle = (item, i) => {
        const { checked, label } = item;
        const { checkedImg, unCheckedImg, labelStyle } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.handleChange(i, checked)}
                key={label}
                style={styles.checkboxWrapper}
            >
                <View style={styles.checkboxImgWrapper}>
                    {checked ? (
                        <Icon size={15} source={checkedImg} />
                    ) : (
                            <Icon size={15} source={unCheckedImg} />
                        )}
                </View>
                <Text style={[styles.label, labelStyle]}>{label}</Text>
            </TouchableOpacity>
        );
    };
    render() {
        const { checked, label, options } = this.props;
        styles = createStyle(this.context.theme);
        if (Array.isArray(options)) {
            return (
                <View style={styles.checkboxGroup}>
                    {options.map(this.renderSingle)}
                </View>
            );
        } else {
            return this.renderSingle({
                checked,
                label
            });
        }
    }
}
