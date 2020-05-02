import React from 'react';
import { connect } from 'react-redux';
import Card from '../tools/Card'

import '../tools/tools.css'
import Dialogs from './Dialogs'


class ItemList extends React.Component {

    state = {
        rename: false,
        delete: false,
        team: false,
        invite: false,
        duplicate: false,
        remove: false,
        project: null,
        refetch: null,

    };

    handleSetProject = (project, refetch) => {
        this.setState({ project, refetch })
    }

    handleDialogsOpen = (type) => {
        this.setState({ [type]: true });
    };

    handleDialogsClose = (type) => {
        this.setState({ [type]: false })
    };

    handleGoEdit = () => {
        this.props.history.push('/project/fwef')
    };

    handleDelete = (callback, _id) => {
        callback({
            variables: {
                id: _id
            }
        })
    }

    render() {
        const { projects, refetch, user } = this.props;
        const numItem = projects.length;
        const style = {
            height: numItem > 3 ? 600 : 300
        };
        return (
            <div className="dashboard-itemlist">
                <div className="dashboard-itemlist-wrapper" style={style}>
                    {
                        projects && projects.map((project, index) => {
                            const col = index % 3;
                            const row = Math.floor(index / 3);
                            const left1s = 'calc(25% - 135px)';
                            const left2s = 'calc(50% - 90px)';
                            const left3s = 'calc(75% - 45px)';
                            const top1s1 = 50;
                            const top1s2 = 200 / 3;
                            const top2s2 = top1s2 * 2 + 200;
                            const cardStyle = {
                                top: numItem > 3 ? row === 0 ? top1s2 : top2s2 : top1s1,
                                left: col === 0 ? left1s : col === 1 ? left2s : left3s,
                            }
                            const { _id } = project;
                            return (

                                <Card
                                    className='item-card'
                                    project={project}
                                    style={cardStyle}
                                    handleOpen={this.handleDialogsOpen}
                                    onClick={this.handleGoEdit}
                                    key={_id}
                                    handleSetProject={this.handleSetProject}
                                    refetch={refetch}
                                />

                            );
                        })
                    }
                </div>
                <Dialogs
                    {...this.state}
                    handleOpen={this.handleDialogsOpen}
                    handleClose={this.handleDialogsClose}
                    user={user}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return {
        user
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);