import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'

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
        const left = sidebarActive ? 19 : 0;
        const width = sidebarActive ? 81 : 100;
        return (
            <div>
                <TopNavbar open={sidebarActive} handleSidebarOpen={this.handleSidebarOpen} side={true} />
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

export default Dashboard;
