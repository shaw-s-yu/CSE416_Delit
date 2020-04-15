import React from 'react'
import './tools.css'

class Card extends React.Component {

    render() {

        const { className, style } = this.props
        return (
            <div className={className} style={style}>

            </div>
        )
    }
}

export default Card;