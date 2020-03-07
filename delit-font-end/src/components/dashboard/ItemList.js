import React from 'react';
import { Card, Icon, Button } from 'react-materialize'
import { connect } from 'react-redux';


class ItemList extends React.Component {


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
                                className="pointer project-card"
                                closeIcon={<Icon>close</Icon>}
                                revealIcon={<Icon>more_vert</Icon>}
                                textClassName="white-text"
                                title={project.name}
                                onClick={this.handleGoEdit}
                                key={project.id}
                            >
                                Last Modified By: {project.lastModified}
                                <Button waves='orange' className="dashboard-itemcard-btn right">Team</Button>
                                <Button waves='orange' className="dashboard-itemcard-btn right">Edit</Button>
                            </Card>
                        );
                    })
                }



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
