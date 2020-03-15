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
        this.setState({ properties: properties })
    }

    handleChange = (index, e) => {
        e.persist()
        const target = e.target;
        const { properties } = this.state;
        properties[index][target.id] = target.value;
        this.setState({ properties: properties });
    }

    showName = (index) => {
        const { properties } = this.state;
        const property = properties[index]
        if (properties[index].nselected === true)
            return (
                <input
                    className="property-input"
                    onMouseDown={e => e.stopPropagation()}
                    onChange={this.handleChange.bind(this, index)}
                    autoFocus
                    id='name'
                    value={property.name}
                />
            )
        else
            return (
                <div
                    onClick={this.handleUnselect}
                    onDoubleClick={this.handleSelect.bind(this, index, "nselected")}
                >
                    {property.name}
                </div>
            )
    }

    showValue = (index) => {
        const { properties } = this.state;
        const property = properties[index]
        if (property.vselected === true)
            return (
                <input
                    className="property-input"
                    onMouseDown={e => e.stopPropagation()}
                    onChange={this.handleChange.bind(this, index)}
                    autoFocus
                    id='value'
                    value={property.value}
                />
            )
        else
            return (
                <div
                    onClick={this.handleUnselect}
                    onDoubleClick={this.handleSelect.bind(this, index, "vselected")} >
                    {property.value}
                </div>
            )
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
                                    <div className="property-box">{this.showName(index)}</div>
                                    <div className="property-box">{this.showValue(index)}</div>
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