import React from 'react';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';
import Pagination from '../../tools/Pagination'
import '../workscreen.css'
import ContentEditable from 'react-contenteditable'
import PropertyTransaction from '../../controller/PropertyTransaction'


class PropertyList extends React.Component {


    state = {

    };


    handleChange = (index, name, e) => {
        // this.props.handleChange(index, name, e.target.value)

        if (this.props.data)
            this.props.transactions.addTransaction(new PropertyTransaction(index, name, e.target.value, this.props.data, this.props.handleChange, this.props.restoreCustomProperty))
    };

    handleSelect = (index, e) => {
        const { window } = this.props;
        this.setState({ nothing: 'nothing' }, () => {
            this.props.handleSelect(window, index);
        })
    }

    getClassName = (index) => {
        const { selected, window } = this.props;
        if (!selected)
            return 'table-row'
        else if (selected.window !== window)
            return 'table-row'
        else if (selected.index !== index)
            return 'table-row'
        else
            return 'table-row table-row-selected'
    }

    getRows = () => {
        const { data, type } = this.props
        if (type === 'custom') return data
        const names = Object.keys(data)
        let toReturn = []
        for (let i = names.length - 1; i >= 0; i--) {
            if (names[i] === '_id')
                continue
            toReturn.push({
                name: names[i],
                value: data[names[i]]
            })
        }
        return toReturn
    }

    render() {
        let { width, type } = this.props;
        const style = {
            maxWidth: width / 2 - 10,
            width: width / 2 - 10,
            flexShrink: 0,
        }
        const data = this.getRows()

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
                            data && data.map((property, index) => {

                                return (
                                    <tr key={index} onClick={() => this.handleSelect(index)} className={this.getClassName(index)}>
                                        <td style={style}>
                                            {
                                                type !== 'custom' ?
                                                    <div className="property-input" style={style}>{property.name}</div> :
                                                    <ContentEditable
                                                        innerRef={property.nref}
                                                        onChange={this.handleChange.bind(this, index, 'name')}
                                                        onMouseDown={e => e.stopPropagation()}
                                                        html={property.name}
                                                        disabled={false}
                                                        className="property-input"
                                                        style={style}
                                                    />
                                            }
                                        </td>
                                        <td style={style}>
                                            {
                                                type !== 'custom' ?
                                                    <div className="property-input" style={style}>{property.value}</div> :
                                                    <ContentEditable
                                                        innerRef={property.nref}
                                                        onChange={this.handleChange.bind(this, index, 'value')}
                                                        onMouseDown={e => e.stopPropagation()}
                                                        html={property.value}
                                                        disabled={false}
                                                        className="property-input"
                                                        style={style}
                                                    />
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
                <Pagination className="property-list-pagination" size="small" color="secondary" />
                {/* <div className="text-right">
                    <button className="reset-property-btn">Reset</button>
                </div> */}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { selected } = state.property
    return {
        selected: selected,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleSelect: (name, value) => dispatch(handler.selectPropertyHandler(name, value)),
    handleChange: (index, type, value) => dispatch(handler.changePropertyHandler(index, type, value)),
    restoreCustomProperty: custom => dispatch(handler.restoreCustomProperty(custom)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList)