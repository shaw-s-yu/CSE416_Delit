import React from 'react';
import { Table } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { Button } from 'react-materialize'

class PropertyList extends React.Component {


    state = {
        properties: [
            { name: 'name1', value: 'value1', nref: React.createRef(), vref: React.createRef() },
            { name: 'name2', value: 'value2', nref: React.createRef(), vref: React.createRef() },
            { name: 'name3', value: 'value3', nref: React.createRef(), vref: React.createRef() },
        ]
    };


    handleChange = (index, type, evt) => {
        let { properties } = this.state;
        properties[index][type] = evt.target.value;
        this.setState({ properties: properties });
    };


    render() {
        const { properties } = this.state;
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
                                    <tr key={index}>
                                        <td>
                                            <ContentEditable
                                                innerRef={property.nref}
                                                onChange={this.handleChange.bind(this, index, 'name')}
                                                html={property.name}
                                                disabled={false}
                                                className="property-input"
                                            />
                                        </td>
                                        <td>
                                            <ContentEditable
                                                innerRef={property.vref}
                                                onChange={this.handleChange.bind(this, index, 'value')}
                                                html={property.value}
                                                disabled={false}
                                                className="property-input"
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

export default PropertyList;