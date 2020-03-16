import React from 'react';
import { Card, Button } from 'react-materialize'
import { connect } from 'react-redux';
import Dialog from '../modal/Dialog'

const images = [
    { src: 'https://lh3.googleusercontent.com/proxy/a_RvrbhOTRCQe37Z0gSzJ-W16jTIUChEvaq_rAhKai1pqr79tI0nqeFYKFeVX-GGonJe6jgtpCSQJEQ-cZpg7YDJ870GDXkgVjkpbpyBZG8', 
    alt: 'This is Shen' }, 
    { src: 'data:image/jpeg;base64,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',
     alt: 'This is DJ' }
]

class ItemList extends React.Component {

    state = {
        modelActive1: false,
    }

    handleTeamOpen1 = (e) => {
        e.stopPropagation();
        this.setState({ modelActive1: true });
    }

    handleTeamClose1 = () => {
        this.setState({ modelActive1: false });
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
                                    header="Project1"
                                    open={this.state.modelActive1}
                                    actions={[
                                        <Button waves="orange" onClick={this.handleTeamClose1}>Submit</Button>,
                                        <Button waves="orange" onClick={this.handleTeamClose1}>Close</Button>
                                    ]}
                                    content={
                                        <div className="dd-wrapper">
                                            <div className="dd-header">
                                                <div className="dd-header-title">Project1</div>
                                            </div>
                                            <ul className="product-gallery-thumbs__list">
                                                {images.map(function (image, imageIndex) {
                                                    return (
                                                        <li key={images.src}>
                                                            <img src={images.src} alt={images.alt} />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
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
