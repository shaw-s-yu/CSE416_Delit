import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import Searchbar from '../tools/Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'
import { connect } from 'react-redux';
import Sidebar from "./Sidebar";
import AddProjectDialog from "./AddProjectDialog";
import AddTilesetDialog from "./AddTilesetDialog";
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import axios from 'axios'
import * as handler from '../../store/database/HomeScreenHandler';
import CircularProgress from '@material-ui/core/CircularProgress';


class Dashboard extends React.Component {
    state = {
        showSidebar: true,
        projectDialogOpen: false,
        tilesetDialogOpen: false,
        selected: 'all',
        page: 1,
        search: '',
        sortBy: 'lastUpdate',
        lastUpdate: -1,
        name: -1,
    };

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
    };

    handleSortBy = (e, type) => {
        this.setState({ sortBy: type })
    }

    handleSortOrder = (e, type) => {
        const order = this.state[type]
        this.setState({ [type]: order === 1 ? -1 : 1 })
    }

    handleSelectSide = (type) => {
        this.setState({ selected: type })
    };

    handleProjectDialogOpen = () => {
        this.setState({ projectDialogOpen: true })
    }

    handleProjectDialogClose = () => {
        this.setState({ projectDialogOpen: false })
    }

    handleTilesetDialogOpen = () => {
        this.setState({ tilesetDialogOpen: true })
    }

    handleTilesetDialogClose = () => {
        this.setState({ tilesetDialogOpen: false })
    }

    handleSidebarOpen = () => {
        let { showSidebar } = this.state;
        showSidebar = !showSidebar;
        this.setState({ showSidebar: showSidebar });
    };

    getQuery = () => {
        const { selected } = this.state;
        if (selected === 'all')
            return QueryList.GET_MY_RELATED_PROJECTS;
        if (selected === 'create')
            return QueryList.GET_MY_OWNED_PROJECTS;
        if (selected === 'share')
            return QueryList.GET_MY_SHARED_PROJECTS;
        if (selected === 'tilesets')
            return QueryList.GET_TILESETS;
        if (selected === 'tilesetsOwned')
            return QueryList.GET_MY_OWNED_TILESETS;
        if (selected === 'tilesetsShared')
            return QueryList.GET_MY_SHARED_TILESETS;
        // if (selected === 'publishedTilesets')
        //     return QueryList.GET_PUBLISHED_TILESETS;
        return QueryList.EMPTY_QUERY;
    };

    getProjects = (data) => {
        const { selected } = this.state;
        if (selected === 'all') {
            return {
                items: data.user.projectsRelated,
                amount: data.user.projectsRelatedAmount,
                type: "project",
            };
        }
        if (selected === 'create') {
            return {
                items: data.user.projectsOwned,
                amount: data.user.projectsOwnedAmount,
                type: "project",
            };
        }
        if (selected === 'share') {
            return {
                items: data.user.projectsShared,
                amount: data.user.projectsSharedAmount,
                type: "project",
            };
        }
        if (selected === 'tilesets') {
            return {
                items: data.user.tilesets,
                amount: data.user.tilesetsAmount,
                type: "tileset",
            };
        }
        if (selected === 'tilesetsOwned') {
            return {
                items: data.user.tilesetsOwned,
                amount: data.user.tilesetsOwnedAmount,
                type: "tileset",
            };
        }
        if (selected === 'tilesetsShared') {
            return {
                items: data.user.tilesetsShared,
                amount: data.user.tilesetsSharedAmount,
                type: "tileset",
            };
        }
        // if (selected === 'publishedTilesets') {
        //     return {
        //         items: data.user.publishedTilesets,
        //         amount: data.user.publishedTilesetsAmount,
        //         type: "tileset",
        //     };
        // }


        return null
    };


    handlePagination = (e, value) => {
        this.setState({ page: value })
    };

    getSelected = (type) => {
        const { sortBy } = this.state
        return sortBy === type ? 'dashboard-sort-btn-selected' : ''
    }

    getSortOrder = (type) => {
        return this.state[type] === -1 ? 'fa-arrow-down' : 'fa-arrow-up'
    }

    componentDidMount() {
        axios.get('/auth/current').then(res => {
            if (!res.data)
                this.props.history.push('/');
            else {
                this.setState({ user: res.data });
                this.props.handleLoginSuccess(res.data);
            }
        })
    }

    render() {
        const { showSidebar, selected, user, page, search, projectDialogOpen, tilesetDialogOpen, sortBy } = this.state;
        const { history } = this.props;
        const left = showSidebar ? 19 : 0;
        const width = showSidebar ? 81 : 100;
        if (!user) return 'loading';
        const query = this.getQuery();
        const displayStyle = {
            marginLeft: left + "%",
            width: width + "%",
            height: 'calc(100% - 88px)'
        };

        const pageSkip = (page - 1) * 6;
        const sortOrder = this.state[sortBy]
        return (

            <div>
                <TopNavbar handleSidebarOpen={this.handleSidebarOpen} site='dashboard' history={history} />
                <Sidebar
                    showSidebar={showSidebar}
                    handleProjectDialogOpen={this.handleProjectDialogOpen}
                    handleTilesetDialogOpen={this.handleTilesetDialogOpen}
                    handleSelect={this.handleSelectSide}
                    selected={selected}
                />

                <div className="dashboard-display" style={displayStyle}>
                    <Searchbar value={search} onChange={this.handleSearchChange} />
                    <div className="dashboard-sort-btn-group">
                        <button className={"dashboard-sort-btn " + this.getSelected('name')} onClick={e => this.handleSortBy(e, 'name')}>Name </button>
                        <i className={"fa dashboard-sort-icon " + this.getSortOrder('name')} onClick={e => this.handleSortOrder(e, 'name')} />
                        <button className={"dashboard-sort-btn " + this.getSelected('lastUpdate')} onClick={e => this.handleSortBy(e, 'lastUpdate')}>Last Modified </button>
                        <i className={"fa dashboard-sort-icon " + this.getSortOrder('lastUpdate')} onClick={e => this.handleSortOrder(e, 'lastUpdate')} />
                    </div>
                    <Query query={query} variables={{ userId: user._id, pageSkip: pageSkip, search: search, sortBy: sortBy, sortOrder: sortOrder }} fetchPolicy={'network-only'}>
                        {({ loading, error, data }) => {
                            if (loading)
                                return <CircularProgress className="dashboard-loading" />;
                            if (error) return 'error';
                            if (query === QueryList.EMPTY_QUERY)
                                return 'Wrong Sidebar Selection or needs to be developed';
                            if (!data) return 'error';

                            const { items, amount, type } = this.getProjects(data);
                            const pageAmount = amount % 6 === 0 ? amount / 6 : Math.floor(amount / 6) + 1;
                            const refetch = {
                                query: query,
                                variables: { userId: user._id, pageSkip: pageSkip, search: search, sortBy: sortBy, sortOrder: sortOrder }
                            };
                            return (
                                <>
                                    <ItemList
                                        history={history}
                                        items={items}
                                        refetch={refetch}
                                        type={type}
                                        selected={selected}
                                    />
                                    <Pagination
                                        className="dashboard-pagination center"
                                        size="large"
                                        color="secondary"
                                        count={pageAmount}
                                        handlePagination={this.handlePagination}
                                        defaultPage={page}
                                    />
                                    <AddProjectDialog
                                        open={projectDialogOpen}
                                        handleClose={this.handleProjectDialogClose}
                                        refetch={refetch}
                                        userId={user._id}
                                        handleSelectSide={this.handleSelectSide}
                                    />
                                    <AddTilesetDialog
                                        open={tilesetDialogOpen}
                                        handleClose={this.handleTilesetDialogClose}
                                        refetch={refetch}
                                        userId={user._id}
                                        handleSelectSide={this.handleSelectSide}
                                    />
                                </>
                            )
                        }}
                    </Query>

                </div>
            </div>

        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps;
    const { user } = state.auth;
    return { history, user };
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

