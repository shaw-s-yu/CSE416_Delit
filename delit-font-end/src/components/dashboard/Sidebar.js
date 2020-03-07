import React from 'react';
import { Collection, CollectionItem, Button } from 'react-materialize'


class Sidebar extends React.Component {

  render() {
    return (


      <Collection className='dashboard-sidebar'>
        <CollectionItem className='dashboard-sideItem'><Button waves="orange" className="text-center dashboard-btn">Create A New Project</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves="orange" className="text-center dashboard-btn">All Projects</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves="orange" className="text-center dashboard-btn">Projects Created By Me</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves="orange" className="text-center dashboard-btn">Projects Shared With Me</Button></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><Button waves="orange" className="text-center dashboard-btn">Manage My Tilesets</Button></CollectionItem>
      </Collection>
    )
  }

}

export default Sidebar;
