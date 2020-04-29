import React from 'react';
import { connect } from 'react-redux';
import Card from '../tools/Card'


class ItemList extends React.Component {

    state = {
        modelActive1: false,
        modelActive2: false,

    };

    handleGoEdit = () => {
        this.props.history.push('/project/fwef')
    };



    render() {
        const { projects } = this.props;
        const numItem = projects.length
        const style = {
            height: numItem > 3 ? 600 : 300
        }

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
                            const { name, ownerInfo, img } = project;

                            return (
                                <Card
                                    className='item-card'
                                    owner={ownerInfo.username}
                                    name={name}
                                    style={cardStyle}
                                    img={img}
                                    handleOpen={this.props.handleOpen}
                                    onClick={this.handleGoEdit}
                                    key={index}
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
    const { user } = state.auth
    return {
        user
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);;