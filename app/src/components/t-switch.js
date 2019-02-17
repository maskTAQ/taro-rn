import React from "react";
import { Switch } from "react-native";
import PropTypes from "prop-types";

const TSwitch = ({ color, checked, disabled, onChange }) => {
    return (
        <Switch thumbColor={color} disabled={disabled} value={checked} onValueChange={onChange} />
    );
};

TSwitch.propTypes = {
    onChange: PropTypes.func
};

export default TSwitch;
