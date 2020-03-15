import React from 'react';
import { TextInput, Button } from 'react-materialize'


class Searchbar extends React.Component {

    render() {
        const left = this.props.open ? 350 : 100;
        const width = this.props.open ? 65 : 85;
        return (
            <div>
                <div className="dashboard-search" style={
                    {
                        marginLeft: left + "px",
                        width: width + "%",
                    }}>
                    <TextInput label="Enter search" />
                </div>
                <Button type="submit" waves='orange' className="dashboard-searchbutton blue">Search</Button>
            </div >

        )
    }

}

export default Searchbar;
