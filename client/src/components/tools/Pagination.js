import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

class BetterPagination extends React.Component {

    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <Pagination count={10} color={this.props.color} size={this.props.size} showFirstButton showLastButton siblingCount={0} />
            </div>
        );
    }
}

export default BetterPagination;