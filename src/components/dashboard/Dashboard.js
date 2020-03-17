import React from 'react';
import TopNavbar from './TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import { Pagination, Icon } from 'react-materialize'


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
        const width = sidebarActive ? 80 : 100;
        return (
            <div>
                <TopNavbar open={sidebarActive} handleSidebarOpen={this.handleSidebarOpen} />
                <div className="dashboard-display" style={
                    {
                        marginLeft: left + "%",
                        width: width + "%",
                    }
                }>
                    <ItemList history={this.props.history} />
                    <Pagination
                        activePage={2}
                        items={10}
                        leftBtn={<Icon>chevron_left</Icon>}
                        maxButtons={8}
                        rightBtn={<Icon>chevron_right</Icon>}
                        className="dashboard-pagination center"
                    />
                </div>
                <Searchbar open={sidebarActive} />

            </div>

        )
    }

}

export default Dashboard;
