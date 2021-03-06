import React from "react";
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text
} from "react-native";
import PropTypes from "prop-types";

import createStyle from "./style";
let styles = null;
const renderChildren = (children, textStyle, disabled, disabledTextStyle) => {
    const childrenType = typeof children;
    if (childrenType === "object") {
        return children;
    }
    return (
        <Text
            style={[
                styles.text,
                textStyle,
                disabled
                    ? Object.assign(styles.disabledText, disabledTextStyle)
                    : null
            ]}
        >
            {children}
        </Text>
    );
};

const CreatedWrapper = feedback =>
    feedback
        ? TouchableOpacity
        : ({ onPress, disabled, ...props }) => (
            <TouchableWithoutFeedback {...{ onPress, disabled }}>
                <View {...props} />
            </TouchableWithoutFeedback>
        );
const Button = (
    {
        children,
        style,
        onClick,
        //textStyle,
        feedback = true,
        disabled = false,
        disabledButtonStyle,
        disabledTextStyle
    },
    context
) => {
    styles = createStyle(context.theme);
    const { color, fontSize, ...wrapperStyle } = style || {};
    const textStyle = { color, fontSize };
    const Wrapper = CreatedWrapper(feedback);
    return (
        <Wrapper
            style={[
                wrapperStyle,
                disabled
                    ? Object.assign(styles.disabledButton, disabledButtonStyle)
                    : null
            ]}
            onPress={onClick}
            disabled={disabled}
        >
            {renderChildren(children, textStyle, disabled, disabledTextStyle)}
        </Wrapper>
    );
};

Button.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    disabled: PropTypes.bool,
    feedback: PropTypes.bool,
    disabledButtonStyle: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    disabledTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
Button.contextTypes = {
    theme: PropTypes.object
};
export default Button;
