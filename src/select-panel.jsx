import React, {Component} from 'react';

import {filterOptions} from './fuzzy-string-matching.js';
import SelectList from './select-list.jsx';

import type {
    Option,
} from './select-item.jsx';

class SelectPanel extends Component {
    state = {
        searchText: "",
    }

    props: {
        options: Array<Option>,
        selected: Array<any>,
        onSelectedChanged: (selected: Array<any>) => void,
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

    handleSearchChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    clearSearch = () => {
        this.setState({searchText: ""});
    }

    filteredOptions() {
        const {searchText} = this.state;
        const {options} = this.props;

        return filterOptions(options, searchText);
    }

    render() {
        return <div>
            <input type="text" onChange={this.handleSearchChange} />
            <button onClick={this.clearSearch}>x</button>
            <div>
                <button onClick={this.selectAll}>Select All</button>
                <button onClick={this.selectNone}>Select None</button>
            </div>
            <SelectList {...this.props} options={this.filteredOptions()} />
        </div>;
    }
}

export default SelectPanel;
