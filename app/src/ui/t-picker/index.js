import React, { Component } from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { TButton } from "../";
import styles from "./style";

export default class Picker extends Component {
  static defaultProps = {
    option: [],
    onClick() { },
    onClose() { }
  };
  static propTypes = {
    option: PropTypes.array,
    onClick: PropTypes.func,
    show: PropTypes.bool,
    onClose: PropTypes.func
  };
  cancel = () => {
    this.props.onClose();
  };
  formatData(option) {
    const nextData = Object.assign([], option);
    option.forEach((item, i) => {
      if (i % 2 === 0 && i === option.length - 1) {
        return;
      }
      nextData.splice(i + (i + 1), 0, "border");
    });
    return nextData;
  }
  render() {
    const { show, onClick, option } = this.props;
    return (
      <Modal
        transparent={true}
        onRequestClose={() => { }}
        visible={show}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={this.cancel}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.list}>
                {this.formatData(option).map((item, i) => {
                  if (item === "border") {
                    return <View style={styles.itemBorder} key={i} />;
                  }
                  const { label, value } = item;
                  return (
                    <TButton
                      onClick={() => onClick(item)}
                      style={styles.item}
                      key={label}
                    >
                      {label}
                    </TButton>
                  );
                })}
              </View>
              <TButton
                onPress={()=>{
                  console.log('this.cancel')
                }}
                style={styles.cancel}
              >
                取消
              </TButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
