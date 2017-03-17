import React, {Component} from 'react';

export type Option = {
    value: any,
    label: string,
};

class SelectItem extends Component {
    props: {
        option: Option,
        checked: boolean,
        onSelectionChanged: (option: Option, checked: bool) => void,
    }

    onChecked = (e) => {
        const {option, onSelectionChanged} = this.props;

        const checked = e.target.checked;
        onSelectionChanged(option, checked);
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

class SelectPanel extends Component {
    props: {
        options: [Option],
        selected: [any],
        onSelectedChanged: (selected: [any]) => void,
    }

    handleSelectionChanged = (option, checked) => {
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

    selectAll = () => {
        const {onSelectedChanged, options} = this.props;
        const allValues = options.map(o => o.value);

        onSelectedChanged(allValues);
    }

    selectNone = () => {
        const {onSelectedChanged} = this.props;

        onSelectedChanged([]);
    }

    renderItems() {
        const {options, selected} = this.props;

        const isSelected = value => selected.includes(value);

        return options.map(o =>
            <SelectItem
                key={o.value}
                option={o}
                onSelectionChanged={this.handleSelectionChanged}
                checked={isSelected(o.value)}
            />
        );
    }

    render() {
        return <div>
            <div>
                <button onClick={this.selectAll}>Select All</button>
                <button onClick={this.selectNone}>Select None</button>
            </div>
            {this.renderItems()}
        </div>;
    }
}

export default SelectPanel;
