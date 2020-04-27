import React from 'react'
import './tools.css'

class Card extends React.Component {

    render() {

        const { className, style, name, modifiedBy, img, handleOpen, onClick } = this.props
        return (
            <div >
                <div className={className} style={style} onClick={onClick}>
                    <img src={img} className='card-preview-img' alt='preview'></img>
                    <div className="card-info-box">
                        <span className="card-info-name">Name: {name}</span>
                        <span className="card-info-last-modify">Last modified By: {modifiedBy}</span>
                    </div>
                </div>
                <div className="card-info-btn-box" style={style}>
                    <div className="card-info-btn-tl card-info-btn">Rename</div>
                    <div className="card-info-btn-tr card-info-btn">Dupliate</div>
                    <div className="card-info-btn-bl card-info-btn" onClick={handleOpen.bind(this, 'team')}>Team</div>
                    <div className="card-info-btn-br card-info-btn">Delete</div>
                    <div className="card-info-btn-center card-info-btn">EDIT</div>
                </div>
            </div>
        )
    }
}

export default Card;