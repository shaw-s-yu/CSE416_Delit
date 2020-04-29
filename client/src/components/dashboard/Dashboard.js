import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'
import { connect } from 'react-redux';
import Sidebar from "./Sidebar";
import Dialogs from './Dialogs'
import ProjectDialog from "./ProjectDialog";
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import axios from 'axios'
import * as handler from '../../store/database/HomeScreenHandler';

class Dashboard extends React.Component {
    state = {
        showSidebar: true,
        project: false,
        team: false,
        invite: false,
        selected: 'all',
    };

    handleSelectSide = (type) => {
        this.setState({ selected: type })
    }

    handleDialogsOpen = (type) => {
        this.setState({ [type]: true })
    }

    handleDialogsClose = (type) => {
        this.setState({ [type]: false })
    }

    handleSidebarOpen = () => {
        let { showSidebar } = this.state;
        showSidebar = !showSidebar;
        this.setState({ showSidebar: showSidebar });
    };

    getQuery = () => {
        const { selected } = this.state
        if (selected === 'all')
            return QueryList.GET_MY_RELATED_PROJECTS
        if (selected === 'create')
            return QueryList.GET_MY_OWNED_PROJECTS
        if (selected === 'share')
            return QueryList.GET_MY_SHARED_PROJECTS

        return QueryList.EMPTY_QUERY
    }

    getProjects = (data) => {
        const { selected } = this.state
        if (selected === 'all')
            return data.user.projectsRelated
        if (selected === 'create')
            return data.user.projectsOwned
        if (selected === 'share')
            return data.user.projectsShared
        return null
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
        const { showSidebar, selected, user } = this.state;
        const { history } = this.props;
        const left = showSidebar ? 19 : 0;
        const width = showSidebar ? 81 : 100;
        if (!user) return 'loading'
        const query = this.getQuery();
        const displayStyle = {
            marginLeft: left + "%",
            width: width + "%",
        }

        return (

            <div>
                <TopNavbar handleSidebarOpen={this.handleSidebarOpen} site='dashboard' history={history} />
                <Sidebar
                    showSidebar={showSidebar}
                    handleOpen={this.handleDialogsOpen}
                    handleClose={this.handleDialogsClose}
                    handleSelect={this.handleSelectSide}
                    selected={selected}
                />
                <Query query={query} variables={{ userId: user._id }}>
                    {({ loading, error, data }) => {
                        if (loading) return 'loading'
                        if (error) return 'error'
                        if (query === QueryList.EMPTY_QUERY)
                            return (
                                <div className="dashboard-display" style={displayStyle}>
                                    'Wrong Sidebar Selection or needs to be developped
                                </div>
                            )
                        if (!data) return 'error'

                        const projects = this.getProjects(data)
                        return (
                            <div className="dashboard-display" style={displayStyle}>
                                <Searchbar />
                                <ItemList
                                    history={this.props.history}
                                    handleOpen={this.handleDialogsOpen}
                                    handleClose={this.handleDialogsClose}
                                    selected={selected}
                                    projects={projects}
                                />
                                <Pagination className="dashboard-pagination center" size="large" color="secondary" />

                            </div>
                        )
                    }}
                </Query>
                <ProjectDialog project={this.state.project} handleClose={this.handleDialogsClose} />
                <Dialogs
                    {...this.state}
                    handleOpen={this.handleDialogsOpen}
                    handleClose={this.handleDialogsClose}
                />
            </div >

        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps;
    const { user } = state.auth
    return { history, user };
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

