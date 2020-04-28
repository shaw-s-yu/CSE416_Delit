import React from 'react';
import Card from '../tools/Card';
import { graphql } from "react-apollo";
import { getProjectsQuery } from "../../graphql/Query";

class ItemList extends React.Component {

    state = {
        modelActive1: false,
        modelActive2: false,

    };

    handleGoEdit = () => {
        this.props.history.push('/project/fwef')
    };

    displayProjects() {
        var data = this.props.data;
        if(data.loading) {
            return (
                <div>Loading projects......</div>
            )
        }else {
            console.log(this.props);
            const { projects } = this.props.data;
            const numItem = projects.length;
            const style = {
                height: numItem > 3 ? 600 : 300
            }
            return (
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
                            const { name, lastModified, img } = project;

                            return (
                                <Card
                                    className='item-card'
                                    modifiedBy={lastModified}
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
            )
        }
    }

    render() {
        return (
            <div className="dashboard-itemlist">
                {this.displayProjects()}
            </div>
        )
    }

}

export default graphql(getProjectsQuery)(ItemList);