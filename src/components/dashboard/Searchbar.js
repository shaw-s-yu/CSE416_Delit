import React from 'react';
import { TextInput, Button } from 'react-materialize'


class Searchbar extends React.Component {

    render() {
        const left = this.props.open ? 23 : 5;
        const width = this.props.open ? 64 : 83;
        return (
            <div>
                <div className="dashboard-search" style={
                    {
                        marginLeft: left + "%",
                        width: width + "%",
                    }}>
                    <TextInput label="Enter search" />
                    <Button type="submit" waves='orange' className="dashboard-searchbutton">Search</Button>
                </div>
            </div>

        )
    }

}

export default Searchbar;
