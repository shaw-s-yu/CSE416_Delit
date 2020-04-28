import React from 'react';
import { TextInput } from 'react-materialize'
import { connect } from 'react-redux';
import Card from '../tools/Card';

import { gql } from 'apollo-boost';
import { graphql } from "react-apollo";

const getProjectsQuery = gql`
    {
        projects {
            id
            name
            img
            editors
            ownerId
            ownerInfo {
                username
            }
        }
    }
`

class ItemList extends React.Component {

    state = {
        modelActive1: false,
        modelActive2: false,

    };

    handleGoEdit = () => {
        this.props.history.push('/project/fwef')
    };


    addTextBox = () => {
        let textBox = document.createElement(TextInput);
        document.getElementById("textBoxes").appendChild(textBox);
    };

    removeTextBox = () => {
        let textBoxesContainer = document.getElementById("textBoxes")
        textBoxesContainer.children().last().remove()

    };

    displayprojects() {
        var data = this.props.data;
        if(data.loading) {
            return (
                <div>Loading projects......</div>
            )
        }else {
            const { projects } = this.props.data;
            const numItem = projects.length
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
        console.log(this.props)
        return (
            <div className="dashboard-itemlist">
                {this.displayprojects()}
            </div>
        )
    }

}

const mapStateToProps = () => {
    //to be modified in future benchmarks
    const projects = [
        {
            name: "Project1",
            lastModified: "123@123.com",
            id: "123213",
            img: "https://image.winudf.com/v2/image/Y29tLmROdWdnZXRzLnBva2Vtb25fc2NyZWVuXzFfMTUzMzE5NDQ3NF8wMTI/screen-1.jpg?fakeurl=1&type=.jpg"
        },
        {
            name: "Project2",
            lastModified: "cringe squirtle",
            id: "sdfsd",
            img: "https://i.ytimg.com/vi/SoNt-Osw_es/maxresdefault.jpg"
        },
        {
            name: "Project1",
            lastModified: "123@123.com",
            id: "123213",
            img: "https://static.planetminecraft.com/files/resource_media/screenshot/1205/2012-02-06_011135_1377666.jpg"
        },
        {
            name: "Project2",
            lastModified: "cringe squirtle",
            id: "1ffew",
            img: "https://static.planetminecraft.com/files/resource_media/screenshot/1231/2012-08-02_132558_3109017.jpg",
        },
        {
            name: "Project1ddddddddddddddd",
            lastModified: "123@123.com",
            id: "123213",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefbyjs2LNO7_liF8vU9epErtpKsFJlllDk-Mbp1n5lYJF8QaWSw&s"
        },
    ]

    return {
        projects: projects
    }
};

const mapDispatchToProps = (dispatch) => ({

})

// export default connect(mapStateToProps, mapDispatchToProps)(ItemList);;
export default graphql(getProjectsQuery)(ItemList);