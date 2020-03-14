import React from 'react';
import { Collection, CollectionItem, Button } from 'react-materialize'


class Sidebar extends React.Component {

  render() {
    return (


      <Collection className='dashboard-sidebar'>
        <CollectionItem className='dashboard-sideItem'><Button waves='red' className="dashboard-sidebtn" style={{ borderTop: '3px solid black' }}>Create A New Project</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves='red' className="dashboard-sidebtn">All Projects</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves='red' className="dashboard-sidebtn">Projects Created By Me</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves='red' className="dashboard-sidebtn">Projects Shared With Me</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves='red' className="dashboard-sidebtn">Manage My Tilesets</Button></CollectionItem>
      </Collection>
    )
  }

}

export default Sidebar;
