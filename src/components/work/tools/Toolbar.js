import React from 'react';

class Titlebar extends React.Component {

    stopPropagation = e => {
        e.stopPropagation();
    }

    render() {
        const { content, rightContent, className } = this.props;
        return (
            <div className={className}>
                {
                    content && content.map((c, i) => {
                        return (
                            <div className="toolbar-cell" key={i} onMouseDown={this.stopPropagation}>
                                {c}
                            </div>
                        )
                    })
                }
                {
                    rightContent && rightContent.map((c, i) => {
                        return (
                            <div className="toolbar-right-cell" key={i} onMouseDown={this.stopPropagation}>
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

