import React from 'react';
import { Collection, CollectionItem, Button } from 'react-materialize'

class SideNav extends React.Component {


  render() {
    const { open } = this.props;
    const width = open ? 250 : 0;
    return (

      <div className='dashboard-sidebar' style={{ width: width + "px" }}>
        <ul class="collection">
          <li class="collection-item">Alvin</li>
          <li class="collection-item">Alvin</li>
          <li class="collection-item">Alvin</li>
          <li class="collection-item">Alvin</li>
        </ul>
      </div>

    )
  }

}

export default SideNav;
