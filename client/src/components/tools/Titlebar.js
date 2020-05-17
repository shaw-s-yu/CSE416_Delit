import React from 'react';
import { TitleBar } from 'react-desktop/macOs';

class Titlebar extends React.Component {

    render() {
        return (
            <TitleBar
                title={this.props.title}
                controls
                isFullscreen={this.state.isFullscreen}
                onCloseClick={this.props.handleClose}
                onMinimizeClick={this.props.handleResetWindow}
                onMaximizeClick={this.props.handleMaxWindow}
                onResizeClick={this.props.handleMaxWindow}
            />
        )
    }
}

export default Titlebar;

