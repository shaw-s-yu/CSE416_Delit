import React from 'react'
import './tools.css'

class Card extends React.Component {

    render() {

        const { className, style, name, owner, img, handleOpen, onClick } = this.props
        const image = img ? img : dummyImg
        return (
            <div >
                <div className={className} style={style} onClick={onClick}>
                    <img src={image} className='card-preview-img' alt='preview'></img>
                    <div className="card-info-box">
                        <span className="card-info-name">Name: {name}</span>
                        <span className="card-info-last-modify">Owner: {owner}</span>
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

const dummyImg = "https://image.winudf.com/v2/image/Y29tLmROdWdnZXRzLnBva2Vtb25fc2NyZWVuXzFfMTUzMzE5NDQ3NF8wMTI/screen-1.jpg?fakeurl=1&type=.jpg"
