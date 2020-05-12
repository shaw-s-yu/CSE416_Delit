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
        publish: false,
        item: null,
        refetch: null,

    };

    handleSetItem = (item, refetch) => {
        this.setState({ item, refetch })
    }

    handleDialogsOpen = (type) => {
        this.setState({ [type]: true });
    };

    handleDialogsClose = (type) => {
        this.setState({ [type]: false, item: null, refetch: null })
    };

    handleGoEdit = (item) => {
        if (!item || !this.props.type) return;
        const { _id } = item;
        const type = this.props.type === 'project' ? 'project' : item.published ? 'tilesetviewer' : 'tileseteditor'
        this.props.history.push(`/${type}/${_id}`)
    };

    handleDelete = (callback, _id) => {
        callback({
            variables: {
                id: _id
            }
        })
    }

    render() {
        const { items, refetch, user, type } = this.props;
        const numItem = items.length;
        const style = {
            height: numItem > 3 ? 600 : 300
        };
        const showPublishBt = type === 'tileset';
        return (
            <div className="dashboard-itemlist">
                <div className="dashboard-itemlist-wrapper" style={style}>
                    {
                        items && items.map((item, index) => {
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
                            };
                            const { _id } = item;
                            return (

                                <Card
                                    className='item-card'
                                    item={item}
                                    style={cardStyle}
                                    handleOpen={this.handleDialogsOpen}
                                    onClick={this.handleGoEdit}
                                    key={_id}
                                    handleSetItem={this.handleSetItem}
                                    refetch={refetch}
                                    showPublishBt={showPublishBt}
                                />

                            );
                        })
                    }
                </div>
                {this.state.item ?
                    <Dialogs
                        {...this.state}
                        handleOpen={this.handleDialogsOpen}
                        handleClose={this.handleDialogsClose}
                        handleSetItem={this.handleSetItem}
                        user={user}
                        type={type}
                    /> : null
                }
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