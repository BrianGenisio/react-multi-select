// @flow
import {StyleSheet, css} from 'aphrodite';
import React, {Component} from 'react';

export type Option = {
    value: any,
    label: string,
};

class SelectItem extends Component {
    componentDidMount() {
        this.updateFocus();
    }

    componentDidUpdate() {
        this.updateFocus();
    }

    itemRef: HTMLElement

    props: {
        option: Option,
        checked: boolean,
        focused?: boolean,
        onSelectionChanged: (checked: bool) => void,
        onClick: (event: MouseEvent) => void,
    }

    onChecked = (e: {target: {checked: bool}}) => {
        const {onSelectionChanged} = this.props;

        const checked = e.target.checked;
        onSelectionChanged(checked);
    }

    toggleChecked = () => {
        const {checked, onSelectionChanged} = this.props;
        onSelectionChanged(!checked);
    }

    updateFocus() {
        const {focused} = this.props;

        if (focused && this.itemRef) {
            this.itemRef.focus();
        }
    }

    handleKeypress = (e: KeyboardEvent) => {
        switch (e.which) {
            case 13: // Enter
            case 32: // Space
                this.toggleChecked();
                break;
            default:
                return;
        }

        e.preventDefault();
    }

    render() {
        const {option, checked, focused, onClick} = this.props;

        const focusStyle = focused && styles.itemContainerHover;

        return <div
            role="option"
            aria-selected={checked}
            selected={checked}
            tabIndex="-1"
            className={css(styles.itemContainer, focusStyle)}
            onClick={e => this.toggleChecked() && onClick(e)}
            ref={ref => this.itemRef = ref}
            onKeyDown={this.handleKeypress}
        >
            <input
                type="checkbox"
                onChange={this.onChecked}
                checked={checked}
                tabIndex="-1"
            />
            <span className={css(styles.label)}>
                {option.label}
            </span>
        </div>;
    }
}

const hover = {
    backgroundColor: '#f0f0f0',
    outline: 0,
};

const styles = StyleSheet.create({
    itemContainer: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 10px',

        ':hover': {
            ...hover,
        },
    },
    itemContainerHover: {
        ...hover,
    },
    label: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderBottomRightRadius: '2px',
        borderTopRightRadius: '2px',
        cursor: 'default',
        padding: '2px 5px',
    },
});

export default SelectItem;
