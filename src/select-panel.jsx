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
        return <div style={styles.panel}>
            <div style={styles.searchContainer}>
                <input
                    placeholder="Search"
                    type="text"
                    onChange={this.handleSearchChange}
                    style={styles.search}
                />
            </div>
            <div style={styles.metaContainer}>
                <span
                    style={styles.metaButton}
                    onClick={this.selectAll}
                >
                    Select All
                </span>
                <span
                    style={styles.metaButton}
                    onClick={this.selectNone}
                >
                    Select None
                </span>
            </div>
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
    metaContainer: {
        margin: "0.25em 0em"
    },
    metaButton: {
        backgroundColor: "#eee",
        padding: ".25em .5em",
        margin: "0.5em",
        cursor: "pointer",
    },
};

export default SelectPanel;
