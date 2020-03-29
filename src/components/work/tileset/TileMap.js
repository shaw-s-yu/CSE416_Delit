import React from 'react';
import Canvas from '../canvas/Canvas'
import { connect } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Scrollbars } from 'react-custom-scrollbars'
import squirtle from '../../../img/squirtle.jpg'

class TileMap extends React.Component {

    state = {
        scale: 1,
        x: 0,
        y: 0,
    }

    canvas = React.createRef();
    scrollbar = React.createRef();
    scrollLeft = 0.5
    scrollTop = 0.5

    handleZoomIn = (e) => {
        e.stopPropagation()
        let { scale } = this.state;
        scale = scale * 2;
        this.setState({ scale: scale })
    }

    handleZoomOut = (e) => {
        e.stopPropagation()
        let { scale } = this.state;
        scale = scale / 2;
        this.setState({ scale: scale })
    }

    // handleCenterZoomIn = () => {
    //     const { scrollLeftMax, scrollTopMax } = this.scrollbar._container
    //     this.scrollbar._container.scrollLeft = this.scrollLeft * scrollLeftMax
    //     this.scrollbar._container.scrollTop = this.scrollTop * scrollTopMax
    //     this.scrollbar.updateScroll();
    // }

    // handleCenterZoomOut = () => {
    //     this.scrollbar._container.scrollLeft = 0
    //     this.scrollbar._container.scrollTop = 0
    //     this.scrollLeft = 0.5
    //     this.scrollTop = 0.5
    // }

    // handleOnScrollX = (container) => {
    //     this.scrollLeft = container.scrollLeft / container.scrollLeftMax;
    // }

    // handleOnScrollY = (container) => {
    //     this.scrollTop = container.scrollTop / container.scrollTopMax;
    // }

    componentDidMount() {
        this.props.childRef(this)
    }

    // componentDidUpdate() {
    //     if (this.state.scale > 1)
    //         this.handleCenterZoomIn();
    //     else if (this.state.scale < 1)
    //         this.handleCenterZoomOut();
    // }

    render() {
        const { style, width, imgWidth, height, imgHeight, window } = this.props;
        const { scale } = this.state;
        const totalStyle = {
            ...style,
            marginLeft: imgWidth ? imgWidth * scale >= width ? "auto" : (width - imgWidth * scale) / 2 : "auto",
            marginTop: imgHeight ? imgHeight * scale >= height ? "auto" : (height - imgHeight * scale) / 2 : "auto",
            transform: "scale(" + scale + ") translate(0,0)",
        }
        return (

            <Scrollbars style={{ ...style, width, height }}
                renderThumbHorizontal={props => <div {...props} className="thumb" />}
                renderThumbVertical={props => <div {...props} className="thumb" />} >
                <div className="display-place" style={totalStyle}>
                    <Canvas canvas={this.canvas} squirtle={squirtle} window={window} />
                </div>
            </ Scrollbars>
        )
    }

}

const mapStateToProps = (state) => {
    const { squirtle } = state.tileset.imgs
    if (!squirtle) return {}
    const { imgWidth, imgHeight } = squirtle
    return {
        imgWidth, imgHeight
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TileMap)
