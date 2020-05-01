import React from 'react';
import { connect } from 'react-redux';
import Card from '../tools/Card'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';
import QueryList from "../../graphql/Query";
import '../tools/tools.css'
class ItemList extends React.Component {

    state = {
        modelActive1: false,
        modelActive2: false,

    };

    handleGoEdit = () => {
        this.props.history.push('/project/fwef')
    };



    render() {
        const { projects, query, userId ,pageSkip } = this.props;
        const numItem = projects.length;
        const style = {
            height: numItem > 3 ? 600 : 300
        };
        const mutation = MutationList.REMOVE_PROJECT;
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
                            const { name, ownerInfo, img, _id } = project;

                            return (
                                <Mutation mutation={mutation} key={_id}>
                                    {(removeProject, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeProject({
                                                        variables: { id: _id },
                                                        refetchQueries: [{
                                                            query: query,
                                                            variables:{
                                                                userId: userId,
                                                                pageSkip:pageSkip}
                                                        }]
                                                    });
                                                }}>
                                                <Card
                                                    className='item-card'
                                                    owner={ownerInfo.username}
                                                    name={name}
                                                    style={cardStyle}
                                                    img={img}
                                                    handleOpen={this.props.handleOpen}
                                                    onClick={this.handleGoEdit}
                                                    key={_id}
                                                />
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);