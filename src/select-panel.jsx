import React, {Component} from 'react';

import {filterOptions} from './fuzzy-string-matching.js';
import SelectItem from './select-item.jsx';
import SelectList from './select-list.jsx';

import type {
    Option,
} from './select-item.jsx';

class SelectPanel extends Component {
    state = {
        searchText: "",
        selectAll: false,
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

    selectAllChanged = (checked) => {
        this.setState({selectAll: checked});

        if (checked) {
            this.selectAll();
        } else {
            this.selectNone();
        }
    };

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
        const {selectAll} = this.state;

        const selectAllOption = {
            label: "Select All",
            value: "",
        };

        return <div style={styles.panel}>
            <div style={styles.searchContainer}>
                <input
                    placeholder="Search"
                    type="text"
                    onChange={this.handleSearchChange}
                    style={styles.search}
                />
            </div>

            <SelectItem
                checked={selectAll}
                option={selectAllOption}
                onSelectionChanged={this.selectAllChanged}
            />

            <SelectList {...this.props} options={this.filteredOptions()} />
        </div>;
    }
}

const styles = {
    panel: {
        boxSizing : 'border-box',
    },
    searchContainer: {
        width: "100%",
        boxSizing : 'border-box',
        margin: "0.5em 0.5em 0.5em 0.5em",
    },
    search: {
        display: "block",

        maxWidth: "100%",
        borderRadius: "3px",

        boxSizing : 'border-box',
        height: '30px',
        lineHeight: '24px',
        border: '1px solid #dee2e4',
        padding: '10px',
        width: "100%",
    },
};

export default SelectPanel;
