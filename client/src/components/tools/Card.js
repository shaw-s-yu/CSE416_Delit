import React from 'react'
import './tools.css'
import { connect } from 'react-redux';
import * as handler from "../../store/database/DashboardHandler";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

class Card extends React.Component {

    state = {
        imageData: ''
    }

    handleOnClick = (type, id) => {
        const { handleOpen } = this.props;
        handleOpen.bind(this, type);
        this.props.passProjectId(id);
    }

    handleOpen = (name, project, refetch) => {
        this.props.handleSetProject(project, refetch)
        this.props.handleOpen(name)
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    componentDidMount() {
        const { imageId } = this.props.project
        if (imageId !== '')
            axios.get(`/data/image?imageId=${this.props.project.imageId}`).then(res => {
                const { err, msg, data } = res
                if (err)
                    console.log(msg)
                else {
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = this.arrayBufferToBase64(data.data.data)
                    this.setState({ imageData: base64Flag + imageStr })
                }
            })

    }

    render() {
        const { imageData } = this.state
        const { className, style, onClick, project, refetch } = this.props;
        const { name, ownerInfo } = project;
        const owner = ownerInfo.username;

        return (
            <div >
                <div className={className} style={style} onClick={onClick}>
                    {
                        imageData === '' ?
                            <div className='card-preview-img'><CircularProgress className="image-loading" /></div> :
                            <img src={imageData} className='card-preview-img' alt='Loading' />
                    }
                    <div className="card-info-box">
                        <span className="card-info-name">Name: {name}</span>
                        <span className="card-info-last-modify">Owner: {owner}</span>
                    </div>
                </div>

                <div className="card-info-btn-box" style={style}>
                    <div className="card-info-btn-tl card-info-btn" onClick={this.handleOpen.bind(this, 'rename', project, refetch)}>Rename</div>
                    <div className="card-info-btn-tr card-info-btn" onClick={this.handleOpen.bind(this, 'duplicate', project, refetch)}>Dupliate</div>
                    <div className="card-info-btn-bl card-info-btn" onClick={this.handleOpen.bind(this, 'team', project, refetch)}>Team</div>
                    <div className="card-info-btn-br card-info-btn" onClick={this.handleOpen.bind(this, 'remove', project, refetch)}>Delete</div>
                    <div className="card-info-btn-center card-info-btn" >edit</div>
                </div>
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
    passProjectId: (id) => dispatch(handler.passProjectIdHandler(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(Card);