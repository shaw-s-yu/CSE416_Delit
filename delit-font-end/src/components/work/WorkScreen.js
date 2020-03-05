import React from 'react';
import TopNavbar from './TopNavbar'
import PropertyWindow from './PropertyWindow'


class WorkScreen extends React.Component {

    render() {
        return (
            <div>
                <TopNavbar />
                <div className="workscreen-workplace">
                    <PropertyWindow />
                </div>
            </div>

        )
    }

}

export default WorkScreen;
