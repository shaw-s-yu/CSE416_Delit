import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import LayerList from './LayerList'
import Slider from '@material-ui/core/Slider';
import QueryList from '../../../graphql/Query';
import { Query} from "@apollo/react-components";
import CircularProgress from "@material-ui/core/CircularProgress";

class LayerWindow extends React.Component {


    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ size: { width, height } })
    }

    handleChange = (e) => {

    }


    render() {
        const { open, dimension, projectId } = this.props;
        const { width } = dimension.size;
        const maxWidth = width - 142;

        return (
                        <Rnd
                            className={"workscreen-window " + (open ? '' : 'invisible')}
                            size={dimension.size}
                            position={dimension.position}
                            onMouseDown={() => { this.props.handleToTop('layer') }}
                            onResize={this.handleOnResize}
                            onResizeStop={this.handleOnResize}
                            onResizeStart={() => this.props.handleToTop('layer')}
                            id='layer'
                            onDragStop={(e, d) => this.props.handleOnDragStop(e, d, 'layer')}
                            style={{ zIndex: dimension.zIndex }}
                        >
                            <Titlebar title="Layer Window" />
                            <Query query={QueryList.GET_LAYERS_FROM_PROJECT} variables={{projectId: projectId}} >
                                {(res) => {
                                    console.log(res)
                                    console.log(projectId)
                                    // if (loading)
                                    //     return <CircularProgress className="dashboard-loading" />;
                                    // if (error) return 'error';
                                    // return(
                                    //     <LayerList maxWidth={maxWidth} layerList={data.getLayers}/>
                                    // )}
                                    return <div></div>
                                }}
                            </Query>

                            <i className="fas fa-plus layer-add-btn better-btn" onMouseDown={e => e.stopPropagation()} />
                            <span className="opacity-text">OPACITY:</span>
                            <div className="layer-range">
                                <Slider
                                    defaultValue={30}
                                    getAriaValueText={value => value + "%"}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    marks
                                    min={0}
                                    max={100}
                                    onMouseDown={e => e.stopPropagation()}
                                />
                            </div>
                        </Rnd>
        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
