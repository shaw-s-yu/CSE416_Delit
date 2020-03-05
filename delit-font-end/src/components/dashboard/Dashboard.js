import React from 'react';
import TopNavbar from './TopNavbar'
import Sidebar from './Sidebar'
import Searchbar from './Searchbar'

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <TopNavbar />
                <Sidebar />
                <Searchbar />

            </div>

        )
    }

}

export default Dashboard;
