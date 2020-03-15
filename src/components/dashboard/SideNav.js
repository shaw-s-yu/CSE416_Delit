import React from 'react';
import { Collection, CollectionItem, Icon, Button } from 'react-materialize'
class SideNav extends React.Component {


  render() {
    const { open } = this.props;
    const width = open ? 250 : 0;
    return (

      <div className='dashboard-sidebar' style={{ width: width + "px", whiteSpace: "nowrap" }}>
        <Collection>
          <Button
            className="red right"
            floating
            icon={<Icon>clear</Icon>}
            small
            node="button"
            waves="light"
            onClick={this.props.handleSidebarOpen}
          />
          <Button className="red" node="button" waves="light">Create New Project</Button>

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
