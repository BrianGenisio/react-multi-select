// @flow
import React, {Component} from 'react';

import SelectItem from './select-item.jsx';

import type {
    Option,
} from './select-item.jsx';

class SelectList extends Component {
    props: {
        options: Array<Option>,
        selected: Array<Object>,
        onSelectedChanged: (selected: any) => void,
    }

    handleSelectionChanged = (option: Option, checked: bool) => {
        const {selected, onSelectedChanged} = this.props;

        if (checked) {
            onSelectedChanged([...selected, option.value]);
        } else {
            const index = selected.indexOf(option.value);
            const removed = [
                ...selected.slice(0, index),
                ...selected.slice(index + 1),
            ];
            onSelectedChanged(removed);
        }
    }

    renderItems() {
        const {options, selected} = this.props;

        const isSelected = value => selected.includes(value);

        return options.map((o, i) =>
            <SelectItem
                key={i}
                option={o}
                onSelectionChanged={c => this.handleSelectionChanged(o, c)}
                checked={isSelected(o.value)}
            />
        );
    }

    render() {
        return <div>
            {this.renderItems()}
        </div>;
    }
}

export default SelectList;
