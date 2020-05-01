import React from 'react'
import Slider from '@material-ui/core/Slider';
import ColorPicker from './ColorPicker'

class PropertyBar extends React.Component {

    render() {
        const { sliderValue, sliderOnChange, borderColor, borderColorOnChange, fillColor, fillColorOnChange } = this.props
        return (
            <div className="propertybar-wrapper">
                <div className='property-box'>
                    <div className="property-title">Border Thickness:</div>
                    <div className='ranger'>
                        <Slider
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            marks
                            value={sliderValue}
                            onChange={sliderOnChange}
                            min={1}
                            max={20}
                            onMouseDown={e => e.stopPropagation()}
                        />
                    </div>
                </div>
                <div className='property-box'>
                    <div className="property-title">Border Color:</div>
                    <ColorPicker color={borderColor} onChange={borderColorOnChange} />
                </div>
                <div className='property-box'>
                    <div className="property-title">Fill Color:</div>
                    <ColorPicker color={fillColor} onChange={fillColorOnChange} />
                </div>
                <div className='property-box'>
                    <div className="property-title">Flip</div>
                    <div className="property-flip-btn" onClick={this.props.handleHorizontalFlip}>Horizontally</div>
                    <div className="property-flip-btn" onClick={this.props.handleVerticalFlip}>Vertically</div>
                </div>
                <div className='property-box'>
                    <div className="property-center" onClick={this.props.handleClear}>Clear</div>
                </div>
            </div>
        )
    }
}

export default PropertyBar