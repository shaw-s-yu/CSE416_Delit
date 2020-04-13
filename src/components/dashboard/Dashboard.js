import React from 'react';
import TopNavbar from './TopNavbar'
import Searchbar from './Searchbar'
import ItemList from './ItemList'
import './dashboard.css'
import Pagination from '../tools/Pagination'
import axios from 'axios'


class Dashboard extends React.Component {
    state = {
        sidebarActive: true,
        username: null,
        profileImg: null,
    }

    handleSidebarOpen = () => {
        let { sidebarActive } = this.state;
        sidebarActive = !sidebarActive;
        console.log(sidebarActive)
        this.setState({ sidebarActive: sidebarActive });
    }

    componentDidMount() {
        axios.get('/auth/current_user').then(res => {
            console.log('backend profile:')
            console.dir(res.data)
            this.setState({
                username: res.data.username,
                profileImg: res.data.picture
            })
        })
    }


    render() {
        const { sidebarActive, username, profileImg } = this.state;
        const left = sidebarActive ? 19 : 0;
        const width = sidebarActive ? 81 : 100;
        return (
            <div>
                <TopNavbar open={sidebarActive} handleSidebarOpen={this.handleSidebarOpen} username={username} profileImg={profileImg} />
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
