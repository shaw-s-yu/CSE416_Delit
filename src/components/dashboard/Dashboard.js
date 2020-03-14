import React from 'react';
import TopNavbar from './TopNavbar'
import Sidebar from './Sidebar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import { Pagination, Icon } from 'react-materialize'


class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <TopNavbar />
                <Sidebar />
                <div className="dashboard-display">
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
                <Searchbar />

            </div>

        )
    }

}

export default Dashboard;
