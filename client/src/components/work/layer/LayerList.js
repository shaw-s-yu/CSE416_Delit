import React from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable'
import * as handler from '../../../store/database/WorkScreenHandler';
import LayerTransaction from '../../controller/LayerTransaction'
import LayerRenameTransaction from '../../controller/LayerRenameTransaction'


class LayerWindow extends React.Component {

    handleRename = (e, id) => {
        this.props.transactions.addTransaction(
            new LayerRenameTransaction(e.target.value, id, this.props.layerList, this.props.handleRename, this.props.restoreLayers)
        )
    };

    handleSelect = (id, e) => {
        e.stopPropagation()
        this.props.handleSelect(id)
    }

    handleDelete = (id, e) => {
        e.stopPropagation()
        this.props.transactions.addTransaction(
            new LayerTransaction(id, this.props.layerList, this.props.handleDelete, this.props.restoreLayers)
        )
    }

    handleVisibilityClick = (id, e) => {
        e.stopPropagation()

        this.props.transactions.addTransaction(
            new LayerTransaction(id, this.props.layerList, this.props.handleVisibilityClick, this.props.restoreLayers)
        )
    };

    handleLockClick = (id, e) => {
        e.stopPropagation()
        this.props.transactions.addTransaction(
            new LayerTransaction(id, this.props.layerList, this.props.handleLockClick, this.props.restoreLayers)
        )
    }

    handleMoveUp = (id, e) => {
        e.stopPropagation()
        this.props.transactions.addTransaction(
            new LayerTransaction(id, this.props.layerList, this.props.handleMoveUp, this.props.restoreLayers)
        )
    }

    handleMoveDown = (id, e) => {
        e.stopPropagation();
        this.props.transactions.addTransaction(
            new LayerTransaction(id, this.props.layerList, this.props.handleMoveDown, this.props.restoreLayers)
        )
    }

    handleOnMouseDown = (e, index) => {
        e.stopPropagation()
        this.props.handleSelectProperty('layers', index)
    }

    handleUnselect = e => {
        this.props.handleUnselect()
    }


    getClassName = (id) => {
        const { selected } = this.props;
        if (selected === null)
            return 'layer-list-item'
        else if (selected !== id)
            return 'layer-list-item'
        else
            return 'layer-list-item layer-list-item-selected'
    }

    render() {
        const { layerList, maxWidth } = this.props
        const style = { maxWidth }
        return (
            <div className="layer-list" onClick={this.handleUnselect}>
                {layerList && layerList.map((layer, index) => {
                    return (
                        <div key={index}>
                            <div className={this.getClassName(layer._id)} onMouseDown={e => this.handleOnMouseDown(e, index)} onClick={this.handleSelect.bind(this, layer._id)}>
                                <ContentEditable
                                    innerRef={layer.ref}
                                    onChange={e => this.handleRename(e, index)}
                                    onMouseDown={e => this.handleOnMouseDown(e, index)}
                                    html={layer.name}
                                    disabled={false}
                                    className="layer-input"
                                    style={style}
                                />


                            </div>
                            <div className="layer-item-btn-fixedbox">
                                <i className={"fas better-btn layer-item-btn-eye " + (layer.visible ? 'fa-eye' : 'fa-eye-slash')} onClick={this.handleVisibilityClick.bind(this, index)} />
                                <i className={"fas better-btn layer-item-btn " + (layer.locked ? 'fa-lock' : 'fa-unlock')} onClick={this.handleLockClick.bind(this, layer._id)} />
                            </div>
                            <div className="layer-item-btn-box">
                                <i className="fas fa-edit better-btn layer-item-btn" />
                                <i className={"fas fa-trash-alt better-btn layer-item-btn"} onClick={this.handleDelete.bind(this, index)} />
                                <i className={"fas fa-arrow-down better-btn layer-item-btn " + (index === layerList.length - 1 ? 'layer-btn-disabled' : '')} onClick={this.handleMoveDown.bind(this, layer._id)} />
                                <i className={"fas fa-arrow-up better-btn layer-item-btn " + (index === 0 ? 'layer-btn-disabled' : '')} onClick={this.handleMoveUp.bind(this, layer._id)} />
                            </div>

                        </div>
                    )
                })
                }
            </div >

        )
    }

}

const mapStateToProps = (state) => {
    const { layerList, selected } = state.layer;
    return {
        layerList,
        selected
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleRename: (name, id) => dispatch(handler.layerRenameHandler(name, id)),
    handleSelect: (id) => dispatch(handler.layerSelectHandler(id)),
    handleUnselect: () => dispatch(handler.layerUnselectHandler()),
    handleDelete: (id) => dispatch(handler.layerDeleteHandler(id)),
    handleMoveUp: (id) => dispatch(handler.layerMoveUpHandler(id)),
    handleMoveDown: (id) => dispatch(handler.layerMoveDownHandler(id)),
    handleSelectProperty: (window, index) => dispatch(handler.propertySelectDisplay(window, index)),
    handleVisibilityClick: (id) => dispatch(handler.layerVisibilityClick(id)),
    handleLockClick: (id) => dispatch(handler.layerLockClick(id)),
    restoreLayers: (layerList) => dispatch(handler.restoreLayers(layerList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
