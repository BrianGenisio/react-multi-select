// @flow
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
            style={styles.itemContainer}
            onClick={this.toggleChecked}
        >
            <input
                type="checkbox"
                onChange={this.onChecked}
                checked={checked}
            />
            <span type={styles.label}>{option.label}</span>
        </div>;
    }
}

const styles = {
    itemContainer: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 10px',
    },
    label: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderBottomRightRadius: '2px',
        borderTopRightRadius: '2px',
        cursor: 'default',
        padding: '2px 5px',
    },
};

export default SelectItem;
