import React from 'react';
import TextField from '@material-ui/core/TextField';


class Searchbar extends React.Component {

    render() {
        return (
            <div>
                <div className="dashboard-search">
                    <TextField
                        id="outlined-basic"
                        className="dashboard-input"
                        label="Enter Project Name to Search"
                        variant="outlined"
                        size="small"
                        onChange={this.handleChange} />
                </div>
            </div>

        )
    }

}

export default Searchbar;
