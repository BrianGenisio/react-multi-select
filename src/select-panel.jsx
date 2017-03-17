import React, {Component} from 'react';

import SelectList from './select-list.jsx';

import type {
    Option,
} from './select-item.jsx';

class SelectPanel extends Component {
    props: {
        options: [Option],
        selected: [any],
        onSelectedChanged: (selected: [any]) => void,
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

    render() {
        return <div>
            <div>
                <button onClick={this.selectAll}>Select All</button>
                <button onClick={this.selectNone}>Select None</button>
            </div>
            <SelectList {...this.props} />
        </div>;
    }
}

export default SelectPanel;
