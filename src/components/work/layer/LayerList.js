import React from 'react';
import { connect } from 'react-redux';


class LayerWindow extends React.Component {



    render() {
        return (
            <div className="layer-list">

            </div>

        )
    }

}

const mapStateToProps = (state) => {
    const { layer } = state.workScreen
    return {
        window: layer,
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
