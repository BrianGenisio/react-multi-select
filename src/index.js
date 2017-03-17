// @flow
import React, {Component} from 'react';

import Dropdown from './dropdown.jsx';
import SelectPanel from './select-panel.jsx';

import type {
    Option,
} from './select-item.jsx';

class MultiSelect extends Component {
    props: {
        options: Array<Option>,
        selected: Array<any>,
        onSelectedChanged: (selected: Array<any>) => void,
        noneSelectedText?: string,
        allSelectedText?: string,
    }

    renderHeader() {
        const {
            options,
            selected,
            noneSelectedText,
            allSelectedText
        } = this.props;

        const noneSelected = selected.length === 0;
        const allSelected = selected.length === options.length;

        if (noneSelected) {
            return <span style={styles.noneSelected}>
                {noneSelectedText || "Select some items..."}
            </span>;
        }

        if (allSelected) {
            return <span>
                {allSelectedText || "ALL"}
            </span>;
        }

        return <span>
            Selected {selected.length} items
        </span>;
    }

    render() {
        const {options, selected, onSelectedChanged} = this.props;

        return <Dropdown
            contentComponent={SelectPanel}
            contentProps={{options, selected, onSelectedChanged}}
        >
            {this.renderHeader()}
        </Dropdown>;
    }
}

const styles = {
    noneSelected: {
        color: "#aaa",
    },
};

export default MultiSelect;
