import React from 'react';
import { TextInput, Button } from 'react-materialize'


class Searchbar extends React.Component {

    render() {
        const left = this.props.open ? 360 : 75;
        const width = this.props.open ? 64 : 83;
        return (
            <div>
                <div className="dashboard-search" style={
                    {
                        marginLeft: left + "px",
                        width: width + "%",
                    }}>
                    <TextInput label="Enter search" />
                </div>
                <Button type="submit" waves='orange' className="dashboard-searchbutton">Search</Button>
            </div >

        )
    }

}

export default Searchbar;
