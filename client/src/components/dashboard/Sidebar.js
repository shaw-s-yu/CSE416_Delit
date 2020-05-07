import React from 'react';

class Sidebar extends React.Component {
	getClassName = (name) => {
		return this.props.selected === name ? "dashboard-sidebar-selected" : "";
	}

	render() {
		const { showSidebar, handleSelect, handleOpen } = this.props;
		const width = showSidebar ? 17 : 0;

		return (
			<div className='dashboard-sidebar' style={{ width: width + "%", whiteSpace: "nowrap" }}>
				<div className='sidebar-wrapper'>
					<div className={'sidebar-item '} onClick={handleOpen.bind(this, 'project')}><div className='item-text'>Create New Project</div></div>
					<div className={'sidebar-item '} onClick={handleOpen.bind(this, 'tileset')}><div className='item-text'>Create New Tileset</div></div>
					<div className={'sidebar-item ' + this.getClassName("all")} onClick={handleSelect.bind(this, 'all')}><div className='item-text'>All Projects</div></div>
					<div className={'sidebar-item ' + this.getClassName("create")} onClick={handleSelect.bind(this, 'create')}><div className='item-text'>Project Created By Me</div></div>
					<div className={'sidebar-item ' + this.getClassName("share")} onClick={handleSelect.bind(this, 'share')}><div className='item-text'>Project Shared With Me</div></div>
					<div className={'sidebar-item ' + this.getClassName("Tilesets")} onClick={handleSelect.bind(this, 'Tilesets')}><div className='item-text'>Manage Tilesets</div></div>
					<div className={'sidebar-item ' + this.getClassName("tilesetsOwned")} onClick={handleSelect.bind(this, 'tilesetsOwned')}><div className='item-text'>Tilesets Created By Me</div></div>
					<div className={'sidebar-item ' + this.getClassName("tilesetsShared")} onClick={handleSelect.bind(this, 'tilesetsShared')}><div className='item-text'>Tilesets Shared With Me</div></div>
				</div>
			</div>

		)
	}

}

export default Sidebar;
