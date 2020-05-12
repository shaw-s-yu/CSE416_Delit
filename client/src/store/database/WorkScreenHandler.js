import * as actionCreators from '../actions/actionCreators.js'

export const tilsetImgInitHandler = (name, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_IMG_INIT, name: name, value: value });
};

export const unselectTilesetHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_UNSELECT });
};

export const selectTilesetHandler = (selected) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_SELECT, value: selected });
};

export const moveWindowHandler = (name, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_MOVE, name: name, value: value });
};

export const selectPropertyHandler = (window, index) => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_SELECT, window: window, index: index });
};

export const unselectPropertyHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_UNSELECT });
};

export const changePropertyHandler = (index, type, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_CHANGE, index: index, name: type, value: value });
};

export const deletePropertyHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_DELETE });
};

export const scrollXHandler = (window, data) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SCROLL_X, window: window, data: data });
};

export const scrollYHandler = (window, data) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SCROLL_Y, window: window, data: data });
};

export const handleSelectTool = (tool) => (dispatch, getState) => {
    dispatch({ type: actionCreators.MAP_SELECT_TOOL, tool: tool });
};

export const layerSelectHandler = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_SELECT, id });
};

export const layerUnselectHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_UNSELECT });
};

export const layerRenameHandler = (name, id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_RENAME, name, id });
};

export const layerDeleteHandler = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_DELETE, id });
};

export const layerMoveUpHandler = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_MOVE_UP, id });
};

export const layerMoveDownHandler = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_MOVE_DOWN, id });
};

export const toolbarSelectHandler = (name) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TOOLBAR_SELECT, name });
};

export const toolbarUnselectHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.TOOLBAR_UNSELECT });
};

export const formatProjectPack = (project) => (dispatch, getState) => {
    dispatch({ type: actionCreators.FORMAT_PROJECT, project });
};

export const propertySelectDisplay = (window, index) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SELECT_PROPERTY_WINDOW, window, index });
};

export const propertySelectTile = (window, id, index) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SELECT_PROPERTY_TILE, window, id, index });
};

export const handleTilesetLoaded = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_LOADED });
};

export const tilesetIdApplier = (id, index) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_ID_APPLIER, id, index });
}

export const layerVisibilityClick = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_VISIBILITY_TOGGLE, id });

};

export const layerLockClick = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_LOCK_TOGGLE, id });
};

export const passOpacityHandler = (value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_PASS_OPACITY, value });
};

export const layerAddHandler = (layer) => (dispatch, getState) => {
    dispatch({ type: actionCreators.ADD_LAYER, layer });
};

export const tilesetSelectGrids = (selectedGrids) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SELECT_TILESET_GRIDS, selectedGrids });
};

export const mapStampClick = (data) => (dispatch, getState) => {
    dispatch({ type: actionCreators.MAP_STAMP_CLICK, data });
};

export const mapFillClick = (data) => (dispatch, getState) => {
    dispatch({ type: actionCreators.MAP_FILL_CLICK, data });
};

export const restoreLayers = (layerList) => (dispatch, getState) => {
    dispatch({ type: actionCreators.LAYER_RESTORE, layerList });
};

export const updateTilesetsHandler = (tilesets) => (dispatch, getState) => {
    dispatch({ type: actionCreators.UPDATE_TILESETS, tilesets });
};

export const handleAddProperty = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.ADD_PROPERTY });
};

export const restoreCustomProperty = (custom) => (dispatch, getState) => {
    dispatch({ type: actionCreators.RESTORE_CUSTOM_PROPERTY, custom });
};
