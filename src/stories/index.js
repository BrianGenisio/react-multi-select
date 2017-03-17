// @flow
import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';
import MultiSelect from '../index';

const options = [
    {label: "Brian Genisio", value: 1},
    {label: "John Doe", value: 2},
    {label: "Jane Doe", value: 3},
];

class StatefulMultiSelect extends Component {
    constructor() {
        super();
        this.state = {
            selected: [],
        };
    }

    handleSelectedChanged(selected) {
        this.setState({selected});
    }

    render() {
        const {selected} = this.state;

        return <div>
            <MultiSelect
                options={options}
                onSelectedChanged={this.handleSelectedChanged.bind(this)}
                selected={selected}
            />

        <h2>Selected:</h2>
        {selected.join(', ')}
        </div>;
    }
}

storiesOf('MultiSelect', module)
    .add('default view', () => <StatefulMultiSelect />);
