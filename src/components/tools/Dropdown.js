import React from 'react'
import './tools.css'

class Dropdown extends React.Component {

    state = {
        hovering: false,
    }

    handleOpen = () => {
        this.setState({ hovering: true })
    }

    handleClose = () => {
        this.setState({ hovering: false })
    }

    render() {

        const { title, items, width } = this.props;
        const { hovering } = this.state
        const style = {
            maxHeight: items.length * 32,
        }
        const wrapperStyle = {
            width,
        }
        return (
            <div className={"dropdown-wrapper"} onClick={this.handleClose} style={wrapperStyle} onMouseOver={this.handleOpen} onMouseOut={this.handleClose}>
                {title} <i className="fas fa-chevron-down dropdown-icon"></i>
                <div className='dropdown-item-box' style={hovering ? style : null}>
                    {items && items.map(item => {
                        return item
                    })}
                </div>
            </div>

        );
    }
}

export default Dropdown