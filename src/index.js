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
    }

    render() {
        const {options, selected, onSelectedChanged} = this.props;

        return <Dropdown
            contentComponent={SelectPanel}
            contentProps={{options, selected, onSelectedChanged}}
        >
            How many do you want?
        </Dropdown>;
    }
}

export default MultiSelect;
