import React from 'react';
import {connect} from "react-redux";
import Card from "../../tools/Card";
class TilesetList extends React.Component {
    state = {

    };

    handleGoView = (item) => {
        if (!item || !this.props.type) return;
        const { _id } = item;
        const type = 'tilesetviewer';
        this.props.history.push(`/${type}/${_id}`);
    };
    render() {
        const { items } = this.props;
        const numItem = items.length;
        const style = {
            height: numItem > 3 ? 600 : 300
        };
        return (
            <div className="workscreen-tilesetList">
                <div className="workscreen-tilesetList-wrapper" style={style}>
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
                                    key={_id}
                                    onClick={this.handleGoView}
                                    handleSetItem={this.handleSetItem}
                                />

                            );
                        })
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TilesetList);