import React from 'react';
import { Collection, CollectionItem, Icon, Button } from 'react-materialize'
class SideNav extends React.Component {


  render() {
    const { open } = this.props;
    const width = open ? 17 : 0;
    return (

      <div className='dashboard-sidebar' style={{ width: width + "%", whiteSpace: "nowrap" }}>
        <Collection>

          {/* <Button className="side-create-btn" node="button" waves="light">Create New Project</Button> */}

          <CollectionItem><div className='item-text'>Create New Project</div></CollectionItem>

          <CollectionItem><div className='item-text'>All Projects</div></CollectionItem>
          <CollectionItem><div className='item-text'>Project Created By Me</div></CollectionItem>
          <CollectionItem><div className='item-text'>Project Shared With Me</div></CollectionItem>
          <CollectionItem><div className='item-text'>Manage My Tilesets</div></CollectionItem>
        </Collection>
        {/* <Button
            className="side-clear-btn"
            floating
            icon={<Icon>clear</Icon>}
            small
            node="button"
            waves="light"
            onClick={this.props.handleSidebarOpen}
          /> */}
      </div>

    )
  }

}

export default SideNav;
