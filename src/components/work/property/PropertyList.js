import React from 'react';
import { Table } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { Button } from 'react-materialize'
import { connect } from 'react-redux';

class PropertyList extends React.Component {


    state = {
        properties: [
            { name: 'name1', value: 'value1', nref: React.createRef(), vref: React.createRef(), selected: false },
            { name: 'name2', value: 'value2', nref: React.createRef(), vref: React.createRef(), selected: false },
            { name: 'name3', value: 'value3', nref: React.createRef(), vref: React.createRef(), selected: false },
        ]
    };


    handleChange = (index, type, evt) => {
        let { properties } = this.state;
        properties[index][type] = evt.target.value;
        this.setState({ properties: properties });
    };

    handleSelect = (index, e) => {
        let { properties } = this.state;
        properties.forEach(p => p.selected = false)
        properties[index].selected = true;
        this.setState({ properties: properties });

    }

    getClassName = (index) => {
        const { properties } = this.state;
        if (properties[index].selected)
            return 'table-row table-row-selected'
        else
            return 'table-row'
    }


    render() {
        const { properties } = this.state;
        let { width } = this.props;
        if (typeof width === 'number') width += 'px'
        width = width.split('px')[0] / 2.3
        const style = {
            maxWidth: width,
            width: width,
            flexShrink: 0,
        }
        return (
            <>
                <Table striped bordered hover size="sm" className="property-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            properties && properties.map((property, index) => {
                                return (
                                    <tr key={index} onClick={() => this.handleSelect(index)} className={this.getClassName(index)}>
                                        <td style={style}>
                                            <ContentEditable
                                                innerRef={property.nref}
                                                onChange={this.handleChange.bind(this, index, 'name')}
                                                html={property.name}
                                                disabled={false}
                                                className="property-input"
                                                style={style}
                                            />
                                        </td>
                                        <td style={style}>
                                            <ContentEditable
                                                innerRef={property.vref}
                                                onChange={this.handleChange.bind(this, index, 'value')}
                                                html={property.value}
                                                disabled={false}
                                                className="property-input"
                                                style={style}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
                <Button waves='orange' className='load-more-btn'>Load More</Button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { width } = state.workScreen.property.size
    return {
        width: width,
    }
};

export default connect(mapStateToProps)(PropertyList)