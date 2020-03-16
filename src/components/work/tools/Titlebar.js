import React from 'react';
import { TitleBar } from 'react-desktop/macOs';

class Titlebar extends React.Component {

    state = { isFullscreen: false }

    render() {
        return (
            <TitleBar
                title={this.props.title}
                controls
                isFullscreen={this.state.isFullscreen}
                onCloseClick={() => console.log('Close window')}
                onMinimizeClick={() => console.log('Minimize window')}
                onMaximizeClick={() => console.log('Mazimize window')}
                onResizeClick={() => this.setState({ isFullscreen: !this.state.isFullscreen })}
            />
        )
    }
}

export default Titlebar;

