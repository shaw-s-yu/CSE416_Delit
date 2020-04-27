import React from 'react';
import Dialog from "../tools/Dialog";
import {Button, TextInput} from "react-materialize";

class Sidebar extends React.Component {

  state = {
    all: true,
    create: false,
    share: false,
    tileset: false,
    addProjectDialog: false,
  }

  handleAllProjectsSelected = () => {
    this.setState({
      all: true,
      create: false,
      share: false,
      tileset: false,
    })
  }

  handleProjectCreatedByMeSelected = () => {
    this.setState({
      all: false,
      create: true,
      share: false,
      tileset: false,
    })
  }

  handleProjectSharedWithMeSelected = () => {
    this.setState({
      all: false,
      create: false,
      share: true,
      tileset: false,
    })
  }


  handleManageMyTilesetsSelected = () => {
    this.setState({
      all: false,
      create: false,
      share: false,
      tileset: true,
    })
  }

  getClassName = (name) => {
    return this.state[name] ? "dashboard-sidebar-selected" : "";
  }

  handleAddProjectDialogOpen = () => {
      this.setState({ addProjectDialog: true });
  }

  handleAddProjectDialogClose = () => {
      this.setState({ addProjectDialog: false });
  }

  createNewProject = () => {

  }


  render() {
    const { showSidebar} = this.props;
    const width = showSidebar ? 17 : 0;
    return (
      <div className='dashboard-sidebar' style={{ width: width + "%", whiteSpace: "nowrap" }}>
        <div className='sidebar-wrapper'>
          <div className={'sidebar-item '} onClick={this.handleAddProjectDialogOpen}><div className='item-text'>Create New Project</div></div>
          <div className={'sidebar-item ' + this.getClassName("all")} onClick={this.handleAllProjectsSelected}><div className='item-text'>All Projects</div></div>
          <div className={'sidebar-item ' + this.getClassName("create")} onClick={this.handleProjectCreatedByMeSelected}><div className='item-text'>Project Created By Me</div></div>
          <div className={'sidebar-item ' + this.getClassName("share")} onClick={this.handleProjectSharedWithMeSelected}><div className='item-text'>Project Shared With Me</div></div>
          <div className={'sidebar-item ' + this.getClassName("tileset")} onClick={this.handleManageMyTilesetsSelected}><div className='item-text'>Manage My Tilesets</div></div>
        </div>
          <Dialog
              header="Add Project"
              open={this.state.addProjectDialog}
              actions={[
                  <Button waves="orange" >Add Project</Button>,
                  <Button waves="orange" onClick={this.handleAddProjectDialogClose}>Cancel</Button>
              ]}
              content={
                  <section className="dialog_content" id="textBoxes">
                      <TextInput label="Enter The New Project Name" class="input_textbox" />
                  </section>
              } />
      </div>

    )
  }

}

export default Sidebar;
