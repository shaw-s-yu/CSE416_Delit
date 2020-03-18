import React from 'react';
import { Collection, CollectionItem } from 'react-materialize'
class SideNav extends React.Component {

  state = {
    allProjects: true,
    projectCreatedByMe: false,
    projectSharedWithMe: false,
    manageMyTilesets: false,
  }

  handleAllProjectsSelected = () =>{
    this.setState({ allProjects: true });
    document.getElementById("AP").style.background = 'salmon'

    this.handleProjectCreatedByMeUnselected()
    this.handleProjectSharedWithMeUnselected()
    this.handleManageMyTilesetsUnselected()
  }

  handleAllProjectsUnselected = () =>{
    document.getElementById("AP").style.background = ''
    this.setState({ allProjects: false });
  }

//////////////////////////

  handleProjectCreatedByMeSelected = () =>{
    this.setState({ projectCreatedByMe: true });
    document.getElementById("PCBM").style.background = 'salmon'
    
    this.handleAllProjectsUnselected()
    this.handleProjectSharedWithMeUnselected()
    this.handleManageMyTilesetsUnselected()
  }

  handleProjectCreatedByMeUnselected = () =>{
    document.getElementById("PCBM").style.background = ''
    this.setState({ projectCreatedByMe: false });
  }

//////////////////////////

  handleProjectSharedWithMeSelected = () =>{
    this.setState({ projectSharedWithMe: true });
    document.getElementById("PSWM").style.background = 'salmon'

    this.handleAllProjectsUnselected()
    this.handleProjectCreatedByMeUnselected()
    this.handleManageMyTilesetsUnselected()
  }

  handleProjectSharedWithMeUnselected = () =>{
    document.getElementById("PSWM").style.background = ''
    this.setState({ projectSharedWithMe: false });
  }

////////////////////////

  handleManageMyTilesetsSelected = () =>{
    this.setState({ projectSharedWithMe: true });
    document.getElementById("MMT").style.background = 'salmon'

    this.handleAllProjectsUnselected()
    this.handleProjectCreatedByMeUnselected()
    this.handleProjectSharedWithMeUnselected()
  }

  handleManageMyTilesetsUnselected = () =>{
    document.getElementById("MMT").style.background = ''
    this.setState({ projectSharedWithMe: false });
  }



  render() {
    const { open } = this.props;
    const width = open ? 17 : 0;
    return (

      <div className='dashboard-sidebar' style={{ width: width + "%", whiteSpace: "nowrap" }}>
        <Collection>

          <CollectionItem><div className='item-text'>Create New Project</div></CollectionItem>

          <CollectionItem id='AP' onClick={this.handleAllProjectsSelected}><div className='item-text'>All Projects</div></CollectionItem>
          <CollectionItem id='PCBM' onClick={this.handleProjectCreatedByMeSelected}><div className='item-text'>Project Created By Me</div></CollectionItem>
          <CollectionItem id='PSWM' onClick={this.handleProjectSharedWithMeSelected}><div className='item-text'>Project Shared With Me</div></CollectionItem>
          <CollectionItem id='MMT' onClick={this.handleManageMyTilesetsSelected}><div className='item-text'>Manage My Tilesets</div></CollectionItem>

        </Collection>

      </div>

    )
  }

}

export default SideNav;
