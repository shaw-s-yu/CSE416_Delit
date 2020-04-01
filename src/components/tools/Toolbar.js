import React from 'react';

class Titlebar extends React.Component {

    stopPropagation = e => {
        e.stopPropagation();
    }


    getSelected = (name) => {
        const { selected } = this.props;
        return selected === name ? "map-tool-selected" : "";
    }

    render() {
        const { content, rightContent, className } = this.props;
        return (
            <div className={className}>
                {
                    content && content.map((c, i) => {
                        return (
                            <div className={"toolbar-cell " + this.getSelected(c.name)} key={i} onMouseDown={this.stopPropagation}>
                                {c.item}
                            </div>
                        )
                    })
                }
                {
                    rightContent && rightContent.map((c, i) => {
                        return (
                            <div className={"toolbar-right-cell " + this.getSelected(c.name)} key={i} onMouseDown={this.stopPropagation}>
                                {c.item}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Titlebar;

