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

        return <div style={styles.dropdownContainer}>
            <div style={styles.dropdownHeader}>
                <span style={styles.dropdownChildren}>{children}</span>
                <span
                    style={styles.dropdownArrow}
                    onClick={this.toggleExpanded}
                >
                    {expanded
                        ? <span style={styles.dropdownArrowUp} />
                        : <span style={styles.dropdownArrowDown} />
                    }
                </span>
            </div>
            {expanded ? <div
                style={styles.panelContainer}
            >
                {this.renderPanel()}
            </div>
            : ""
            }
        </div>;
    }
}

const styles = {
    dropdownContainer: {
        position: 'relative',
        boxSizing: 'border-box',
    },
    dropdownHeader: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        borderColor: '#d9d9d9 #ccc #b3b3b3',
        borderRadius: 4,
        border: '1px solid #ccc',
        color: '#333',
        cursor: 'default',
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: 36,
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
    dropdownChildren: {
        boxSizing: 'border-box',
        bottom: 0,
        color: '#333',
        left: 0,
        lineHeight: '34px',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteWpace: 'nowrap',
    },
    dropdownArrow: {
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 25,
        paddingRight: 5,
    },
    dropdownArrowDown: {
        boxSizing: 'border-box',
        borderColor: '#999 transparent transparent',
        borderStyle: 'solid',
        borderWidth: '5px 5px 2.5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative',
    },
    dropdownArrowUp: {
        boxSizing: 'border-box',
        top: '-2px',
        borderColor: 'transparent transparent #999',
        borderStyle: 'solid',
        borderWidth: '0px 5px 5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative',
    },
    panelContainer: {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderTopColor: '#e6e6e6',
        boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
        boxSizing: 'border-box',
        marginTop: '-1px',
        maxHeight: '200px',
        position: 'absolute',
        top: '100%',
        width: '100%',
        zIndex: 1,
    },
};

export default Dropdown;
