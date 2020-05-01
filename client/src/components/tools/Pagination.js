import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

class BetterPagination extends React.Component {



    componentDidUpdate() {
        const { width } = this.refs.pagination.getBoundingClientRect()
        this.refs.pagination.style.marginLeft = `calc(50% - ${width / 2}px)`
    }

    componentDidMount() {
        const { width } = this.refs.pagination.getBoundingClientRect()
        this.refs.pagination.style.marginLeft = `calc(50% - ${width / 2}px)`
    }

    UNSAFE_componentWillMount() {
        this.defaultPage = this.props.defaultPage
    }

    render() {
        const { className, color, size, handlePagination, count } = this.props
        return (
            <div className={className} ref='pagination'>
                <Pagination
                    count={count}
                    color={color}
                    size={size}
                    siblingCount={0}
                    onChange={handlePagination}
                    defaultPage={this.defaultPage}
                />
            </div>
        );
    }
}

export default BetterPagination;