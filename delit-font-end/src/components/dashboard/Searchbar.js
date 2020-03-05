import React from 'react';
import { TextInput, Button } from 'react-materialize'


class Searchbar extends React.Component {

    render() {
        return (
            <div>
                <div className="dashboard-search" >
                    <TextInput label="Enter search" />
                </div>
                <Button type="submit" waves='orange' className="dashboard-searchbutton blue">Search</Button>
            </div>

        )
    }

}

export default Searchbar;
