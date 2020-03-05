import React from 'react';
import TopNavbar from './TopNavbar'
import PropertyWindow from './PropertyWindow'
import LayerWindow from './LayerWindow'
import TilesetWindow from './TilesetWindow'

class WorkScreen extends React.Component {

    state = {
        width: 0,
        height: 0,
    }

    componentDidMount = () => {
        const rect = document.getElementById('workplace').getBoundingClientRect();
        console.log(rect)
        this.setState({
            width: rect.width,
            height: rect.height
        })
    }

    render() {
        return (
            <div>
                <TopNavbar />
                <div className="workscreen-workplace" id="workplace">
                    <PropertyWindow width={this.state.width} height={this.state.height} />
                    <LayerWindow width={this.state.width} height={this.state.height} />
                    <TilesetWindow width={this.state.width} height={this.state.height} />
                </div>
            </div>

        )
    }

}

export default WorkScreen;
