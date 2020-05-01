import React from 'react'
import './tools.css'
import { connect } from 'react-redux';
import * as handler from "../../store/database/DashboardHandler";

class Card extends React.Component {

    handleOnClick = (type, id) => {
        const { handleOpen } = this.props;
        handleOpen.bind(this, type);
        this.props.passProjectId(id);
    }
    render() {

        const { className, style, handleOpen, onClick, project, handleDelete, res } = this.props;
        const { name, ownerInfo, img } = project;
        const owner = ownerInfo.username;
        const image = img ? img : dummyImg;
        return (
            <div >
                <div className={className} style={style} onClick={onClick}>
                    <img src={image} className='card-preview-img' alt='preview' />
                    <div className="card-info-box">
                        <span className="card-info-name">Name: {name}</span>
                        <span className="card-info-last-modify">Owner: {owner}</span>
                    </div>
                </div>
                {
                    res.loading ? 'loading' : res.error ? res.error.message : null
                }
                <div className="card-info-btn-box" style={style}>
                    <div className="card-info-btn-tl card-info-btn" onClick={handleOpen.bind(this, 'rename')}>Rename</div>
                    <div className="card-info-btn-tr card-info-btn">Dupliate</div>
                    <div className="card-info-btn-bl card-info-btn" onClick={handleOpen.bind(this, 'team')}>Team</div>
                    <div className="card-info-btn-br card-info-btn" onClick={handleDelete}>Delete</div>
                    <div className="card-info-btn-center card-info-btn" >edit</div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    passProjectId: (id) => dispatch(handler.passProjectIdHandler(id))
});
export default connect(null, mapDispatchToProps)(Card);

const dummyImg = "https://image.winudf.com/v2/image/Y29tLmROdWdnZXRzLnBva2Vtb25fc2NyZWVuXzFfMTUzMzE5NDQ3NF8wMTI/screen-1.jpg?fakeurl=1&type=.jpg";
