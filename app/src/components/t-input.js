import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";

const Input = ({ value,onInput,placeholder,style }) => {
    return (
        <TextInput
            clearButtonMode="while-editing"
            autoCapitalize={"none"}
            autoCorrect={false}
            underlineColorAndroid="transparent"
            value={value}
            placeholder={placeholder}
            onChangeText={onInput}
            style={[{ margin: 0, padding: 0 }, style]}
        />
    );
};

Input.propTypes = {
    style: PropTypes.object
};

export default Input;
