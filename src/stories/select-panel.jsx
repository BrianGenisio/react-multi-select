// @flow
import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';
import SelectPanel from '../select-panel';

const options = [
    {label: "one", value: 1},
    {label: "two", value: 2},
    {label: "three", value: 3},
];

class StatefulSelectPanel extends Component {
    state = {
        selected: [],
    }

    handleSelectedChanged = selected => {
        this.setState({selected});
    }

    render() {
        const {selected} = this.state;

        return <div>
            <SelectPanel
                options={options}
                onSelectedChanged={this.handleSelectedChanged}
                selected={selected}
            />

        <h2>Selected:</h2>
        {selected.join(', ')}
        </div>;
    }
}



storiesOf('SelectPanel', module)
    .add('default view', () => <StatefulSelectPanel />);
