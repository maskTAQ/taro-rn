import { Component, Children } from "react";
import PropTypes from "prop-types";

export function createProvider() {
    class Provider extends Component {
        static propTypes = {
            platform: PropTypes.string.isRequired,
            children: PropTypes.element.isRequired
        };
        static childContextTypes = {
            platform: PropTypes.object
        };
        getChildContext() {
            return { platform: this.props.string };
        }

        render() {
            return Children.only(this.props.children);
        }
    }

    return Provider;
}

export default createProvider();
