import React from 'react';
import TextField from '@material-ui/core/TextField';


class Searchbar extends React.Component {

    render() {
        const { onChange, value } = this.props
        return (
            <div>
                <div className="dashboard-search">
                    <TextField
                        id="outlined-basic"
                        className="dashboard-input"
                        label="Enter Item Name to Search"
                        variant="outlined"
                        size="small"
                        value={value}
                        onChange={onChange} />
                </div>
            </div>

        )
    }

}

export default Searchbar;
