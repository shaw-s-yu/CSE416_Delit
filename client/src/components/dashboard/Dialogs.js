import React from 'react'
import Dialog from '../tools/Dialog'
import TextField from '@material-ui/core/TextField';
import { Button } from "react-bootstrap";
import { Grid, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { TextInput } from 'react-materialize'
import { v1 } from 'uuid'

class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            tileWidth: "",
            tileHeight: "",
            mapWidth: "",
            mapHeight: "",
        }
    }

    submitAddProjectForm(e) {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
        const { project, team, invite, handleOpen, handleClose } = this.props;
        return (
            <>
                <Dialog
                    header="Add Project"
                    open={project}
                    maxWidth="xs"
                    fullWidth={true}
                    actions={[
                        <Button variant="primary" size="sm" key='1' onClick={this.submitAddProjectForm.bind(this)} >Add</Button>,
                        <Button variant="primary" size="sm" key='2' onClick={handleClose.bind(this, 'project')}>Cancel</Button>
                    ]}
                    content={[
                        <TextField
                            className="dashboard-add-project"
                            label="Enter New Project Name"
                            variant="outlined"
                            size="small"
                            key={v1()}
                            value={this.state.projectName}
                            onChange={(e) => this.setState({projectName: e.target.value})}
                        />,
                        <TextField
                            className="dashboard-add-project"
                            label="Enter New Project tile width"
                            variant="outlined"
                            size="small"
                            key={v1()}
                            value={this.state.tileWidth}
                            onChange={(e) => this.setState({tileWidth: e.target.value})}
                        />,
                        <TextField
                            className="dashboard-add-project"
                            label="Enter New Project tile height"
                            variant="outlined"
                            size="small"
                            key={v1()}
                            value={this.state.tileHeight}
                            onChange={(e) => this.setState({tileHeight: e.target.value})}
                        />,
                        <TextField
                            className="dashboard-add-project"
                            label="Enter New Project map width"
                            variant="outlined"
                            size="small"
                            key={v1()}
                            value={this.state.mapWidth}
                            onChange={(e) => this.setState({mapWidth: e.target.value})}
                        />,
                        <TextField
                            className="dashboard-add-project"
                            label="Enter New Project map height"
                            variant="outlined"
                            size="small"
                            key={v1()}
                            value={this.state.mapHeight}
                            onChange={(e) => this.setState({mapHeight: e.target.value})}
                        />]
                    }
                />
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
                    open={team}
                    fullWidth={true}
                    maxWidth="xs"
                    actions={[
                        <Button key='1' waves="orange" onClick={handleOpen.bind(this, 'invite')}>invite</Button>,
                        <Button key='2' waves="orange" onClick={handleClose.bind(this, 'team')}>Close</Button>
                    ]}
                    content={
                        <Grid
                            container
                            direction="column"
                            spacing={3}
                        >
                            {
                                images.map(function (image, index) {
                                    return (
                                        <Grid item key={index}>
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
                    open={invite}
                    actions={[
                        <Button key='1' waves="orange">Add More?</Button>,
                        <Button key='2' waves="orange">Remove?</Button>,
                        <Button key='3' waves="orange" onClick={handleClose.bind(this, 'invite')}>Close</Button>
                    ]}
                    var totalTextbox='1'
                    content={
                        <section className="dialog_content" id="textBoxes">
                            <p><strong>Please enter the Email to add your teammate</strong></p>
                            <TextInput label="Enter The Email" className="input_textbox" />
                        </section>
                    } />
            </>
        )
    }
}

export default Dialogs
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