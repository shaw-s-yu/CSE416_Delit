import React from 'react'
import { Button } from "react-bootstrap";
import Dialog from '../../tools/Dialog'
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import QueryList from '../../../graphql/Query';
import Searchbar from "../../dashboard/Searchbar";
import CircularProgress from "@material-ui/core/CircularProgress";
class SelectTilesetDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: '',
            sortBy: 'lastUpdate',
            lastUpdate: -1,
            name: -1,
        }
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
    };

    handleSortBy = (e, type) => {
        this.setState({ sortBy: type })
    };

    handleSortOrder = (e, type) => {
        const order = this.state[type]
        this.setState({ [type]: order === 1 ? -1 : 1 })
    };
    handlePagination = (e, value) => {
        this.setState({ page: value })
    };

    getSelected = (type) => {
        const { sortBy } = this.state
        return sortBy === type ? 'dashboard-sort-btn-selected' : ''
    };

    getSortOrder = (type) => {
        return this.state[type] === -1 ? 'fa-arrow-down' : 'fa-arrow-up'
    };
    render() {
        const { open, close, user } = this.props;
        const { page, search, sortBy } = this.state;
        const query = QueryList.GET_SELECTABLE_TILESETS;
        const pageSkip = (page - 1) * 6;
        const sortOrder = this.state[sortBy];
        return (
            <>

                <Query query={query} variables={{ userId: user._id, pageSkip: pageSkip, search: search, sortBy: sortBy, sortOrder: sortOrder }} fetchPolicy={"no-cache"}>
                    {({ loading, error, data }) => {
                        if (loading)
                            return <CircularProgress className="workscreen-loading" />;
                        if (error) return 'error';
                        if (query === QueryList.EMPTY_QUERY)
                            return 'Empty';
                        if (!data) return 'error';
                        console.log("data: ", data);
                        return(
                            <Dialog
                                header='Select Tileset'
                                open={open}
                                fullWidth={true}
                                maxWidth="lg"
                                actions={[
                                    <Button variant="primary" size="sm"  key='1' >Confirm</Button>,
                                    <Button variant="primary" size="sm" key='2' onClick={close}>Cancel</Button>
                                ]}
                                content={
                                    <>
                                        <div>
                                            <Searchbar value={search} onChange={this.handleSearchChange} />
                                            <div className="workscreen-sort-btn-group">
                                                <button className={"workscreen-sort-btn " + this.getSelected('name')} onClick={e => this.handleSortBy(e, 'name')}>Name </button>
                                                <i className={"fa workscreen-sort-icon " + this.getSortOrder('name')} onClick={e => this.handleSortOrder(e, 'name')} />
                                                <button className={"workscreen-sort-btn " + this.getSelected('lastUpdate')} onClick={e => this.handleSortBy(e, 'lastUpdate')}>Last Modified </button>
                                                <i className={"fa workscreen-sort-icon " + this.getSortOrder('lastUpdate')} onClick={e => this.handleSortOrder(e, 'lastUpdate')} />
                                            </div>
                                        </div>
                                    </>}
                            />
                        )
                    }}
                </Query>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return { user };
};

export default connect(mapStateToProps)(SelectTilesetDialog);