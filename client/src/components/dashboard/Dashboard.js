import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'
import { connect } from 'react-redux';


class Dashboard extends React.Component {
    state = {
        sidebarActive: true,
    }

    handleSidebarOpen = () => {
        let { sidebarActive } = this.state;
        sidebarActive = !sidebarActive;
        console.log(sidebarActive)
        this.setState({ sidebarActive: sidebarActive });
    }


    render() {
        const { sidebarActive } = this.state;
        const { history } = this.props
        const left = sidebarActive ? 19 : 0;
        const width = sidebarActive ? 81 : 100;
        return (
            <div>
                <TopNavbar open={sidebarActive} handleSidebarOpen={this.handleSidebarOpen} side={true} history={history} />
                <div className="dashboard-display" style={
                    {
                        marginLeft: left + "%",
                        width: width + "%",
                    }
                }>
                    <ItemList history={this.props.history} />
                    <Pagination className="dashboard-pagination center" size="large" color="secondary" />
                </div>
                <Searchbar open={sidebarActive} />

            </div>

        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps
    return { history }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

