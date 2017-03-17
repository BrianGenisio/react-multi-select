// @flow
import React, {Component} from 'react';

class Dropdown extends Component {
    state = {
        expanded: false,
    }

    props: {
        children: any,
        contentComponent: Object,
        contentProps: Object,
    }

    toggleExpanded = () => {
        const {expanded} = this.state;

        this.setState({expanded: !expanded});
    }

    renderPanel() {
        const {contentComponent, contentProps} = this.props;
        return React.createElement(contentComponent, contentProps);
    }

    render() {
        const {expanded} = this.state;
        const {children} = this.props;

        return <div>
            <span>{children}</span>
            <button onClick={this.toggleExpanded}>
                {expanded ? "^" : "v"}
            </button>
            {expanded ? <div>{this.renderPanel()}</div> : ""}
        </div>;
    }
}

export default Dropdown;
