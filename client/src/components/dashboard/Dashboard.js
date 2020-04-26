import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'
import { connect } from 'react-redux';
import Sidebar from "./Sidebar";


class Dashboard extends React.Component {
    state = {
        showSidebar: true,
    };

    handleSidebarOpen = () => {
        let { showSidebar } = this.state;
        showSidebar = !showSidebar;
        this.setState({ showSidebar : showSidebar});
    };

    render() {
        const { showSidebar } = this.state;
        const { history } = this.props;
        const left = showSidebar ? 19 : 0;
        const width = showSidebar ? 81 : 100;
        return (
            <div>
                <TopNavbar handleSidebarOpen={this.handleSidebarOpen} showTopNavBt={true} history={history} />
                { showSidebar ? <Sidebar showSidebar={showSidebar} /> : null}
                <div className="dashboard-display" style={
                    {
                        marginLeft: left + "%",
                        width: width + "%",
                    }
                }>
                    <Searchbar/>
                    <ItemList history={this.props.history} />
                    <Pagination className="dashboard-pagination center" size="large" color="secondary" />
                </div>
            </div >
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps;
    return { history };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

