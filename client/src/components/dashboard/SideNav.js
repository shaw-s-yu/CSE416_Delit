import React from 'react';
import { Collection, CollectionItem } from 'react-materialize'

class SideNav extends React.Component {

  state = {
    all: true,
    create: false,
    share: false,
    tileset: false,
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


  createNewProject = () => {

  }


  render() {
    const { open } = this.props;
    const width = open ? 17 : 0;
    return (

      <div className='dashboard-sidebar' style={{ width: width + "%", whiteSpace: "nowrap" }}>
        <Collection>

          <CollectionItem><div className='item-text'>Create New Project</div></CollectionItem>

          <CollectionItem className={this.getClassName("all")} onClick={this.handleAllProjectsSelected}><div className='item-text'>All Projects</div></CollectionItem>
          <CollectionItem className={this.getClassName("create")} onClick={this.handleProjectCreatedByMeSelected}><div className='item-text'>Project Created By Me</div></CollectionItem>
          <CollectionItem className={this.getClassName("share")} onClick={this.handleProjectSharedWithMeSelected}><div className='item-text'>Project Shared With Me</div></CollectionItem>
          <CollectionItem className={this.getClassName("tileset")} onClick={this.handleManageMyTilesetsSelected}><div className='item-text'>Manage My Tilesets</div></CollectionItem>

        </Collection>

      </div>

    )
  }

}

export default SideNav;
