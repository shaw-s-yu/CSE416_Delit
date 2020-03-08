import React from 'react';
import { Collection, CollectionItem } from 'react-materialize'


class Sidebar extends React.Component {

  render() {
    return (


      <Collection className='dashboard-sidebar'>
        <CollectionItem className='dashboard-sideItem'><p className="text-center">Create A New Project</p></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><p className="text-center">All Projects</p></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><p className="text-center">Projects Created By Me</p></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><p className="text-center">Projects Shared With Me</p></CollectionItem>
        <CollectionItem className='dashboard-sideItem'><p className="text-center">Manage My Tilesets</p></CollectionItem>
      </Collection>
    )
  }

}

export default Sidebar;
