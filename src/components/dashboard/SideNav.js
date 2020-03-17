import React from 'react';
import { Collection, CollectionItem } from 'react-materialize'
class SideNav extends React.Component {


  render() {
    const { open } = this.props;
    const width = open ? 270 : 0;
    return (

      <div className='dashboard-sidebar' style={{ width: width + "px", whiteSpace: "nowrap" }}>
        <Collection>

          <CollectionItem><div className='item-text'>Create New Project</div></CollectionItem>

          <CollectionItem><div className='item-text'>All Projects</div></CollectionItem>
          <CollectionItem><div className='item-text'>Project Created By Me</div></CollectionItem>
          <CollectionItem><div className='item-text'>Project Shared With Me</div></CollectionItem>
          <CollectionItem><div className='item-text'>Manage My Tilesets</div></CollectionItem>
        </Collection>

      </div>

    )
  }

}

export default SideNav;
