import React from 'react';
import { Card, Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux';
import Dialog from '../modal/Dialog'

const images = [
    { src: 'https://lh3.googleusercontent.com/proxy/a_RvrbhOTRCQe37Z0gSzJ-W16jTIUChEvaq_rAhKai1pqr79tI0nqeFYKFeVX-GGonJe6jgtpCSQJEQ-cZpg7YDJ870GDXkgVjkpbpyBZG8', 
    alt: 'This is Shen' }, 
    { src: 'https://p.ssl.qhimg.com/t01b357e9d64b111e8a.png',
     alt: 'This is DJ' }
]

class ItemList extends React.Component {

    state = {
        modelActive1: false,
        modelActive2: false,
        
    }

    handleTeamOpen1 = (e) => {
        e.stopPropagation();
        this.setState({ modelActive1: true });
    }

    handleTeamOpen2 = () => {
        this.setState({ modelActive2: true });
    }

    handleTeamClose1 = () => {
        this.setState({ modelActive1: false });
    }

    handleTeamClose2 = () => {
        this.setState({ modelActive2: false });
        this.setState({ modelActive1: true });
    }

    handleGoEdit = () => {
        this.props.history.push('/project/fwef')
    }

    render() {
        const projects = this.props.projects;
        return (
            <div className="dashboard-itemlist">
                {
                    projects && projects.map(project => {
                        return (
                            <Card
                                className="dashboard-itemcard waves-red waves-effect"
                                textClassName="white-text"
                                title={project.name}
                                onClick={this.handleGoEdit}
                                key={project.id}
                            >
                                Last Modified By: {project.lastModified}
                                <Button waves='orange' className="dashboard-itemcard-btn right" onClick={this.handleTeamOpen1}>Team</Button>
                                <Button waves='orange' className="dashboard-itemcard-btn right">Edit</Button>         
                            </Card>
                        );
                    })
                }

                <Dialog
                    header={<div className="dialogHeader">Project1</div>}
                    open={this.state.modelActive1}
                    actions={[
                        <Button waves="orange" onClick={this.handleTeamOpen2}>invite</Button>,
                        <Button waves="orange" onClick={this.handleTeamClose1}>Close</Button>
                    ]}
                    content={
                            <div className="members">
                                <ul className="product-gallery-thumbs__list">
                                    {images.map(function (image, imageIndex) {
                                        return (
                                            <div className="imageContainer">
                                                <li key={image.src}>
                                                    <img className="img" src={image.src} alt={image.alt} />
                                                    <div className="imageDescription">{image.alt}</div>
                                                </li>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </div>

                    } />

                <Dialog
                    header="Project1"
                    open={this.state.modelActive2}
                    actions={[
                        <Button waves="orange" onClick={this.handleTeamClose2}>Close</Button>
                    ]}
                    content={
                        <section className="dialog_content">
                            <p><strong>Please Enter The Email You Want To Invite</strong></p>
                            <TextInput label="Enter The Email" id='vemail'/>
                        </section>
                    } />
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
        },
        {
            name: "Project2",
            lastModified: "cringe squirtle",
            id: "sdfsd"
        }
    ]

    return {
        projects: projects
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);;
