import React from 'react';
import { Button, TextInput } from 'react-materialize'
import { connect } from 'react-redux';
import Dialog from '../tools/Dialog'
import { Grid, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from '../tools/Card'

const images = [
    {
        src: 'https://cn.portal-pokemon.com/play/resources/pokedex/img/pm/5794f0251b1180998d72d1f8568239620ff5279c.png',
        alt: 'This is Shen'
    },
    {
        src: 'https://p.ssl.qhimg.com/t01b357e9d64b111e8a.png',
        alt: 'This is DJ'
    }
];

class ItemList extends React.Component {

    state = {
        modelActive1: false,
        modelActive2: false,

    };

    handleTeamOpen1 = (e) => {
        e.stopPropagation();
        this.setState({ modelActive1: true });
    };

    handleTeamOpen2 = () => {
        this.setState({ modelActive2: true });
    };

    handleTeamClose1 = () => {
        this.setState({ modelActive1: false });
    };

    handleTeamClose2 = () => {
        this.setState({ modelActive2: false });
        this.setState({ modelActive1: true });
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


    render() {
        const { projects } = this.props;
        const numItem = projects.length
        const style = {
            height: numItem > 3 ? '160%' : '80%'
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
                            const top1s1 = 'calc(50% - 100px)';
                            const top1s2 = 'calc(33% - 133px)';
                            const top2s2 = 'calc(66% - 66px)'
                            const cardStyle = {
                                top: numItem > 3 ? row === 0 ? top1s2 : top2s2 : top1s1,
                                left: col === 0 ? left1s : col === 1 ? left2s : left3s,
                            }

                            return (
                                <>
                                    <Card
                                        className='item-card'
                                        actions={[
                                            <Button waves='orange' className="dashboard-itemcard-edit-btn" onClick={this.handleTeamOpen1}>Team</Button>,
                                            <Button waves='orange' className="dashboard-itemcard-team-btn">Edit</Button>
                                        ]}
                                        modifiedBy={project.lastModified}
                                        name={project.name}
                                        style={cardStyle}
                                    />
                                </>
                            );
                        })
                    }
                </div>

                <Dialog
                    header={
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Typography variant="h4" gutterBottom align="justify">
                                Project1
                            </Typography>
                        </Grid>
                    }
                    open={this.state.modelActive1}
                    fullWidth={true}
                    maxWidth="xs"
                    actions={[
                        <Button waves="orange" onClick={this.handleTeamOpen2}>invite</Button>,
                        <Button waves="orange" onClick={this.handleTeamClose1}>Close</Button>
                    ]}
                    content={
                        <Grid
                            container
                            direction="column"
                            spacing={3}
                        >
                            {
                                images.map(function (image) {
                                    return (
                                        <Grid item>
                                            <Paper elevation={3} className="paper">
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar alt={image.alt} src={image.src} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={image.alt}
                                                    />
                                                </ListItem>
                                                <Divider variant="inset" />
                                            </Paper>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>


                    } />

                <Dialog
                    header="Add Teammate"
                    open={this.state.modelActive2}
                    actions={[
                        <Button waves="orange" onclik={this.addTextBox}>Add More?</Button>,
                        <Button waves="orange" onclik={this.removeTextBox}>Remove?</Button>,
                        <Button waves="orange" onClick={this.handleTeamClose2}>Close</Button>
                    ]}
                    var totalTextbox='1'
                    content={
                        <section className="dialog_content" id="textBoxes">
                            <p><strong>Please enter the Email to add your teammate</strong></p>
                            <TextInput label="Enter The Email" class="input_textbox" />
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
        },
        {
            name: "Project1",
            lastModified: "123@123.com",
            id: "123213",
        },
        {
            name: "Project2",
            lastModified: "cringe squirtle",
            id: "sdfsd"
        },
        {
            name: "Project1",
            lastModified: "123@123.com",
            id: "123213",
        },
        {
            name: "Project2",
            lastModified: "cringe squirtle",
            id: "sdfsd"
        },
    ]

    return {
        projects: projects
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);;