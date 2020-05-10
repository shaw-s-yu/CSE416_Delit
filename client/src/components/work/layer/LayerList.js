import React from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable'
import * as handler from '../../../store/database/WorkScreenHandler';

class LayerWindow extends React.Component {

    handleRename = (id, e) => {
        this.props.handleRename(id, e.target.value)
        this.setState({ nothing: 'nothing' })
    };

    handleSelect = (id, e) => {
        e.stopPropagation()
        this.props.handleSelect(id)
        this.setState({ nothing: 'nothing' })
    }

    handleDelete = (id, e) => {
        e.stopPropagation()
        this.props.handleDelete(id)
        this.setState({ nothing: 'nothing' })
    }

    handleVisibilityClick = e => {
        this.props.handleVisibilityClick(e.target);
    }

    handleLockClick = e => {
        this.props.handleLockClick(e.target);
    }

    handleMoveUp = (id, e) => {
        e.stopPropagation()
        this.props.handleMoveUp(id);
        this.setState({ nothing: 'nothing' });
    }

    handleMoveDown = (id, e) => {
        e.stopPropagation();
        this.props.handleMoveDown(id);
        this.setState({ nothing: 'nothing' });
    }

    handleOnMouseDown = (e, index) => {
        e.stopPropagation()
        this.props.handleSelectProperty('layers', index)
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
            <div className="layer-list" onClick={this.props.handleUnselect}>
                {layerList && layerList.map((layer, index) => {
                    return (
                        <div key={index}>
                            <div className={this.getClassName(layer._id)} onMouseDown={e => e.stopPropagation()} onClick={this.handleSelect.bind(this, layer._id)}>
                                <ContentEditable
                                    innerRef={layer.ref}
                                    onChange={this.handleRename.bind(this, layer._id)}
                                    onMouseDown={e => this.handleOnMouseDown(e, index)}
                                    html={layer.name}
                                    disabled={false}
                                    className="layer-input"
                                    style={style}
                                />


                            </div>
                            <div className="layer-item-btn-fixedbox">
                                <i className="fas fa-eye better-btn layer-item-btn-eye" onClick={this.handleVisibilityClick} />
                                <i className="fas fa-unlock better-btn layer-item-btn" onClick={this.handleLockClick} />
                            </div>
                            <div className="layer-item-btn-box">
                                <i className="fas fa-edit better-btn layer-item-btn" />
                                <i className="fas fa-trash-alt better-btn layer-item-btn" onClick={this.handleDelete.bind(this, layer._id)} />
                                <i className="fas fa-arrow-down better-btn layer-item-btn" onClick={this.handleMoveDown.bind(this, layer._id)} />
                                <i className="fas fa-arrow-up better-btn layer-item-btn" onClick={this.handleMoveUp.bind(this, layer._id)} />
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
    const { layerList, selected } = state.layer
    return {
        layerList,
        selected
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleRename: (id, name) => dispatch(handler.layerRenameHandler(id, name)),
    handleSelect: (id) => dispatch(handler.layerSelectHandler(id)),
    handleUnselect: () => dispatch(handler.layerUnselectHandler()),
    handleDelete: (id) => dispatch(handler.layerDeleteHandler(id)),
    handleMoveUp: (id) => dispatch(handler.layerMoveUpHandler(id)),
    handleMoveDown: (id) => dispatch(handler.layerMoveDownHandler(id)),
    handleSelectProperty: (window, index) => dispatch(handler.propertySelectDisplay(window, index)),
    handleVisibilityClick: (target) => dispatch(handler.layerVisibilityClick(target)),
    handleLockClick: (target) => dispatch(handler.layerLockClick(target)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
