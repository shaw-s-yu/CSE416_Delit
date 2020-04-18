import React from 'react'
import Slider from '@material-ui/core/Slider';
import ColorPicker from './ColorPicker'

class PropertyBar extends React.Component {

    render() {
        return (
            <div className="propertybar-wrapper">
                <div className='property-box'>
                    <div className="property-title">Size:</div>
                    <div className='ranger'>
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
                </div>
                <div className='property-box'>
                    <div className="property-title">Border Color:</div>
                    <ColorPicker />
                </div>
                <div className='property-box'>
                    <div className="property-title">Fill Color:</div>
                    <ColorPicker />
                </div>
                <div className='property-box'>
                    <div className="property-center">Clear</div>
                </div>
            </div>
        )
    }
}

export default PropertyBar