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

    render() {
        const {option, checked} = this.props;

        return <div>
            <input
                type="checkbox"
                onChange={this.onChecked}
                checked={checked}
            />
            {option.label}
        </div>;
    }
}

export default SelectItem;
