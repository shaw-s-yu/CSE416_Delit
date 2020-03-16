import React from 'react';

class Titlebar extends React.Component {

    render() {
        const { content } = this.props;
        return (
            <div className='toolbar'>
                {
                    content && content.map(c => {
                        return (
                            <div className="toolbar-cell">
                                {c}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Titlebar;

