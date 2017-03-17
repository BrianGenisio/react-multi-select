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
        const {options, selected, onSelectedChanged} = this.props;

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
        const {options} = this.props;

        return options.map(o =>
            <SelectItem
                key={o.value}
                option={o}
                onSelectionChanged={this.handleSelectionChanged}
            />
        );
    }

    render() {
        return <div>
            {this.renderItems()}
        </div>;
    }
}

export default SelectPanel;
