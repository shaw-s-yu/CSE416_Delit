import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import Dropdown from './Dropdown'
import { v1 } from 'uuid'
import Checkbox from '@material-ui/core/Checkbox';
import * as handler from '../../store/database/HomeScreenHandler';
import './tools.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../config'
import ReactFileReader from 'react-file-reader';

class TopNavbar extends React.Component {

    state = {
        username: '',
        picture: '',
        file: false,
        edit: false,
        view: false
    };

    file = React.createRef()
    edit = React.createRef()
    view = React.createRef()

    handleCloseDropDown = (type) => {
        const { file, edit, view } = this.state
        if (type === 'all')
            this.setState({
                file: false,
                edit: false,
                view: false
            })
        else {
            if (!file && !edit && !view) return
            this.setState({
                file: false,
                edit: false,
                view: false,
                [type]: true,
            })
        }
    }

    componentDidMount() {
        axios.get('/auth/current').then(res => {
            const { username, picture } = res.data;
            if (!username || !picture)
                this.props.history.push('/');
            else {
                this.setState({ username, picture });
                this.props.handleLoginSuccess(res.data);
            }
        })

        window.onclick = e => {
            const { target } = e
            const { file, edit, view } = this.state
            if (file || edit || view) {
                this.handleCloseDropDown('all')
            } else if (target === this.file) {
                this.setState({ file: true })
            } else if (target === this.edit) {
                this.setState({ edit: true })
            } else if (target === this.view) {
                this.setState({ view: true })
            }
        }
    }

    UNSAFE_componentWillMount() {
        const { hash } = this.props.history.location;
        if (hash === "#_=_")
            this.props.history.push('/dashboard')
    }

    render() {
        const { site, propertyOpen, layerOpen, mapOpen, tilesetOpen, handleWindowOpen } = this.props;
        const { username, picture, file, edit, view } = this.state;
        return (
            <div>
                <Navbar className="dashboard-top-navbar" bg="white" expand="lg">
                    {site === 'dashboard' ? <Navbar.Brand onClick={this.props.handleSidebarOpen} style={{ cursor: "pointer" }}><i className="fas fa-list" /></Navbar.Brand> : null}
                    <Navbar.Brand href="/dashboard"> <div className="logo" >Delit</div></Navbar.Brand>
                    {site === 'workspace' || site === 'tileset' ? <>
                        <Dropdown title="FILE" width={96} childRef={ref => this.file = ref} open={file} handleCloseDropDown={this.handleCloseDropDown}
                            items={[
                                site === 'workspace' ? null : <ReactFileReader key='o' ref='fileUploader' handleFiles={this.props.handleImport} base64={true}>
                                    <div className="better-dropdown-item">Import</div>
                                </ReactFileReader>,
                                <div className="better-dropdown-item" key={v1()} onClick={this.props.handleExport}>Export</div>,
                                <div className="better-dropdown-item" key={v1()} onClick={this.props.handleSave}>Save</div>,
                                site === 'workspace' ? null : <div className="better-dropdown-item" key={v1()} onClick={this.props.handleDuplicate}>Duplicate</div>,
                            ]} />
                        <Dropdown title="EDIT" width={128} childRef={ref => this.edit = ref} open={edit} handleCloseDropDown={this.handleCloseDropDown}
                            items={[
                                <div className="better-dropdown-item" key={v1()} onClick={this.props.handleUndoTransaction}>{"Undo   CTRL+Z"}</div>,
                                <div className="better-dropdown-item" key={v1()} onClick={this.props.handleDoTransaction}>{"Redo   CTRL+Y"}</div>,
                                site === 'workspace' ? null : <div className="better-dropdown-item" key={v1()} onClick={this.props.handleCopy}>{"Copy   CTRL+C"}</div>,
                                site === 'workspace' ? null : <div className="better-dropdown-item" key={v1()} onClick={this.props.handlePaste}>{"Paste  CTRL+V"}</div>,
                            ]} />
                        {site === 'workspace' ? <Dropdown title="VIEW" width={196} childRef={ref => this.view = ref} open={view} handleCloseDropDown={this.handleCloseDropDown}
                            items={[
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'mapOpen')}>
                                    <Checkbox
                                        checked={mapOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Map Window
                            </div>,
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'propertyOpen')}>
                                    <Checkbox
                                        checked={propertyOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Property Window
                            </div>,
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'layerOpen')}>
                                    <Checkbox
                                        checked={layerOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Layer Window
                            </div>,
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'tilesetOpen')}>
                                    <Checkbox
                                        checked={tilesetOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Tileset Window
                            </div>,
                            ]} /> : null}
                    </> : null}

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>
                        <Navbar.Brand><a href='/test'>Test</a></Navbar.Brand>
                        <Navbar.Brand><img src={picture} className="profile-img" alt="logo" /></Navbar.Brand>
                        <Navbar.Brand>{username}</Navbar.Brand>
                        <Navbar.Brand href={`${API_URL}/auth/logout`} >Log Out</Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
