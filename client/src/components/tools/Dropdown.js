import React from 'react'
import './tools.css'

class Dropdown extends React.Component {


    // handleMouseLeave = e => {
    //     const { open } = this.props
    //     if (open) {
    //         this.setState({ show: false })
    //     }
    // }

    handleMouseEnter = e => {
        const { target } = e
        if (target === this.refs.wrapper) {
            this.props.handleCloseDropDown(this.props.title.toLowerCase())
        }
    }

    handleClick = e => {
        this.setState({ show: true })
    }

    componentDidMount() {
        this.props.childRef(this.refs.wrapper)
    }

    render() {
        const { title, items, width, open } = this.props;
        const style = {
            maxHeight: items.length * 32,
            outline: '2px solid gray',
        }
        const wrapperStyle = {
            outline: '2px solid gray',
            width,
        }

        return (
            <div className={"dropdown-wrapper"}
                style={wrapperStyle}
                ref='wrapper'
                onMouseEnter={this.handleMouseEnter}
            >
                {title} <i className="fas fa-chevron-down dropdown-icon"></i>
                <div className='dropdown-item-box' style={open ? style : null}>
                    {items && items.map(item => {
                        return item
                    })}
                </div>
            </div>

        );
    }
}

export default Dropdown