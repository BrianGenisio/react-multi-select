// @flow
import {StyleSheet, css} from 'aphrodite';
import React, {Component} from 'react';

export type Option = {
    value: any,
    label: string,
};

class SelectItem extends Component {
    props: {
        option: Option,
        checked: boolean,
        onSelectionChanged: (checked: bool) => void,
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

    render() {
        const {option, checked} = this.props;

        return <div
            className={css(styles.itemContainer)}
            onClick={this.toggleChecked}
        >
            <input
                type="checkbox"
                onChange={this.onChecked}
                checked={checked}
            />
            <span className={css(styles.label)}>
                {option.label}
            </span>
        </div>;
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 10px',

        ':hover': {
            backgroundColor: '#f0f0f0',
        },
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
