import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'
import { connect } from 'react-redux';
import Sidebar from "./Sidebar";
import AddDialog from "./AddDialog";
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import axios from 'axios'
import * as handler from '../../store/database/HomeScreenHandler';
import CircularProgress from '@material-ui/core/CircularProgress';


class Dashboard extends React.Component {
    state = {
        showSidebar: true,
        dialogOpen: false,
        dialogType: 'project',
        selected: 'all',
        page: 1,
        search: '',
    };

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value })
    }

    handleSelectSide = (type) => {
        this.setState({ selected: type })
    };

    handleDialogOpen = (dialogType) => {
        this.setState({ dialogOpen: true, dialogType });
    };

    handleDialogClose = (type) => {
        const { dialogType, selected } = this.state
        this.setState({
            dialogOpen: false,
            selected: type === 'cancel' ?
                selected : dialogType === 'project' ?
                    'create' : 'tileset'
        })
    };

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
        if (selected === 'tileset')
            return QueryList.GET_TILESETS;

        return QueryList.EMPTY_QUERY
    };

    getProjects = (data) => {
        const { selected } = this.state;
        if (selected === 'all')
            return {
                items: data.user.projectsRelated,
                amount: data.user.projectsRelatedAmount
            };
        if (selected === 'create')
            return {
                items: data.user.projectsOwned,
                amount: data.user.projectsOwnedAmount
            };
        if (selected === 'share')
            return {
                items: data.user.projectsShared,
                amount: data.user.projectsSharedAmount
            };
        if (selected === 'tileset')
            return {
                items: data.user.tilesets,
                amount: data.user.tilesetsAmount
            };
        return null
    };

    handlePagination = (e, value) => {
        this.setState({ page: value })
    };


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
        const { showSidebar, selected, user, page, search, dialogOpen, dialogType } = this.state;
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

        return (

            <div>
                <TopNavbar handleSidebarOpen={this.handleSidebarOpen} site='dashboard' history={history} />
                <Sidebar
                    showSidebar={showSidebar}
                    handleOpen={this.handleDialogOpen}
                    handleSelect={this.handleSelectSide}
                    selected={selected}
                />

                <div className="dashboard-display" style={displayStyle}>
                    <Searchbar value={search} onChange={this.handleSearchChange} />
                    <Query query={query} variables={{ userId: user._id, pageSkip: pageSkip, search: search }} fetchPolicy={'network-only'}>
                        {({ loading, error, data }) => {
                            if (loading)
                                return <CircularProgress className="dashboard-loading" />;
                            if (error) return 'error';
                            if (query === QueryList.EMPTY_QUERY)
                                return 'Wrong Sidebar Selection or needs to be developped';
                            if (!data) return 'error';

                            const { items, amount } = this.getProjects(data);
                            const pageAmount = amount % 6 === 0 ? amount / 6 : Math.floor(amount / 6) + 1;
                            const refetch = {
                                query: query,
                                variables: { userId: user._id, pageSkip: pageSkip, search: search }
                            }
                            return (
                                <>
                                    <ItemList
                                        history={history}
                                        selected={selected}
                                        items={items}
                                        refetch={refetch}
                                    />
                                    <Pagination
                                        className="dashboard-pagination center"
                                        size="large"
                                        color="secondary"
                                        count={pageAmount}
                                        handlePagination={this.handlePagination}
                                        defaultPage={page}
                                    />
                                    <AddDialog
                                        type={dialogType}
                                        open={dialogOpen}
                                        handleClose={this.handleDialogClose}
                                        refetch={refetch}
                                        userId={user._id}
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

