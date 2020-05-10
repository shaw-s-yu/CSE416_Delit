import React from 'react'
import './tools.css'
import { connect } from 'react-redux';
import axios from 'axios'
import CircularProgress from "@material-ui/core/CircularProgress";
import { arrayBufferToBase64 } from '../controller/ImageController'
class Card extends React.Component {

    state = {
        imageData: ''
    };

    handleOpen = (name, item, refetch) => {
        this.props.handleSetItem(item, refetch);
        this.props.handleOpen(name);
    };

    componentDidMount() {
        const { imageId } = this.props.item;
        if (imageId !== '')
            axios.get(`/data/image?imageId=${imageId}`).then(res => {
                const { err, msg, data } = res;
                if (err)
                    console.log(msg);
                else {
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = arrayBufferToBase64(data.data.data);
                    this.setState({ imageData: base64Flag + imageStr })
                }
            })

    }

    render() {
        const { imageData } = this.state;
        const { className, style, onClick, item, refetch, showEditeBts } = this.props;
        const { name, ownerInfo } = item;
        const owner = ownerInfo.username;
        console.log("item: ", item);
        return (
            <div>
                <div className={className} style={style} onClick={onClick.bind(this, item)}>
                    {
                        imageData === '' ?
                            <div className='card-preview-img'><CircularProgress className="image-loading" /></div> :
                            <img src={imageData} className='card-preview-img' alt='Loading' />
                    }
                    <div className="card-info-box">
                        <span className="card-info-name"><b>Name:</b> {name}</span>
                        <span className="card-owner"><b>Owner:</b> {owner}</span>
                    </div>
                </div>
                {
                    showEditeBts ?
                        <div className="card-info-btn-box" style={style}>
                            <div className="card-info-btn-tl card-info-btn" onClick={this.handleOpen.bind(this, 'rename', item, refetch)}>Rename</div>
                            <div className="card-info-btn-tr card-info-btn" onClick={this.handleOpen.bind(this, 'duplicate', item, refetch)}>Dupliate</div>
                            <div className="card-info-btn-bl card-info-btn" onClick={this.handleOpen.bind(this, 'team', item, refetch)}>Team</div>
                            <div className="card-info-btn-br card-info-btn" onClick={this.handleOpen.bind(this, 'remove', item, refetch)}>Delete</div>
                            <div className="card-info-btn-center card-info-btn" >Edit</div>
                        </div>
                        :
                        <div className="card-info-btn-box" style={style}>
                            <div className="card-info-btn-center card-info-btn" >View</div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(Card);