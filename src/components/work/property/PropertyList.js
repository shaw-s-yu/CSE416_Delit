import React from 'react';



class PropertyList extends React.Component {

    state = {
        properties: [
            { name: "width", value: "332", nselected: false, vselected: false },
            { name: "height", value: "223", nselected: false, vselected: false },
            { name: "tile width", value: "12", nselected: false, vselected: false },
            { name: "tile height", value: "12", nselected: false, vselected: false }
        ],
    }

    handleUnselect = (e) => {
        if (e) e.stopPropagation()
        console.log('fe')
        let { properties } = this.state;
        properties.map(p => {
            p.nselected = false;
            p.vselected = false;
            return p;
        })
        this.setState({ properties: properties })
    }

    handleSelect = (index, type, e) => {
        e.persist()
        e.stopPropagation();
        let { properties } = this.state;
        this.handleUnselect();
        properties[index][type] = true
        console.log(properties)
        this.setState({ properties: properties })
    }

    showName = (data, index) => {
        const { properties } = this.state;
        if (properties[index].nselected === true)
            return (<input className="property-input" onMouseDown={e => e.stopPropagation()} key={data} autoFocus />)
        else
            return (<div onClick={this.handleUnselect} onDoubleClick={this.handleSelect.bind(this, index, "nselected")} key={data}>{data}</div>)
    }

    showValue = (data, index) => {
        const { properties } = this.state;
        if (properties[index].vselected === true)
            return (<input className="property-input" onMouseDown={e => e.stopPropagation()} key={data} autoFocus />)
        else
            return (<div onClick={this.handleUnselect} onDoubleClick={this.handleSelect.bind(this, index, "vselected")} key={data}>{data}</div>)
    }

    render() {
        const { properties } = this.state;
        return (
            <>
                <div className="property-plane">
                    {
                        properties && properties.map((property, index) => {
                            return (
                                <div className="property-row" key={index}>
                                    <div className="property-box">{this.showName(property.name, index)}</div>
                                    <div className="property-box">{this.showValue(property.value, index)}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default PropertyList;