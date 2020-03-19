import React from 'react';
import { connect } from 'react-redux';


class LayerWindow extends React.Component {



    render() {
        const { layers } = this.props

        return (
            <div className="layer-list">
                {layers && layers.map((layer, index) => {
                    return (
                        <div key={index}>
                            <div className='layer-list-item' onMouseDown={e => e.stopPropagation()}>
                                <span>{layer.name}</span>


                            </div>
                            <div className="layer-item-btn-box" onMouseDown={e => e.stopPropagation()}>
                                <i className="fas fa-trash-alt better-btn layer-item-up-btn" />
                                <i className="fas fa-arrow-down better-btn layer-item-down-btn" />
                                <i className="fas fa-arrow-up better-btn layer-item-delete-btn" />
                            </div>

                        </div>
                    )
                })}
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    const layers = [
        { name: "backgroud layer", },
        { name: "block layer", },
        { name: "dummy layer", },
    ]
    return {
        layers: layers
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
