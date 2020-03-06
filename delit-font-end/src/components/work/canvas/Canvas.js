import React from 'react';
import squirtle from '../../../img/squirtle.jpg'
const params = {
    sx: 150,
    sy: 0,
    sWidth: 300,
    sHeight: 300,
    dx: 0,
    dy: 0,
    dWidth: 150,
    dHeight: 150
}

class Canvas extends React.Component {

    state = {
        x: 0,
        y: 0,
        tileWidth: 150,
        tileHeight: 150,
    }

    canvas = React.createRef()

    componentDidMount = () => {
        let ctx = this.canvas.current.getContext('2d');
        const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = params
        let img = new Image();
        img.src = squirtle;
        img.onload = () => {
            ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
    }


    render = () => {
        return (
            <div style={this.props.style} className={this.props.className}>
                <canvas ref={this.canvas} className="canvas"></canvas>
            </div>
        )
    }
}


export default Canvas;