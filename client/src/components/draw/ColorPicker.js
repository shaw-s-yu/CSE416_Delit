import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color';
import React, { Component } from 'react';


class ColorPicker extends Component {

    state = {
        displayColorPicker: false,
        color: "#c17de8",
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {

        this.setState({ color: color.hex })
    };

    render() {

        const { color, onChange } = this.props

        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '100%',
                    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '100%',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                    right: "1%",
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div className="color-btn">
                <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker
                        color={color}
                        onChange={onChange}
                        className="left"
                    />
                </div> : null}
            </div>
        );
    }
}

export default ColorPicker;

