import React from 'react';
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';
import Pagination from '../../tools/Pagination'
import '../workscreen.css'


class PropertyList extends React.Component {


    state = {

    };


    handleChange = (index, name, e) => {
        const { window } = this.props;
        this.props.handleChange(window, index, name, e.target.value)
        this.setState({ nothing: 'nothing' })
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
        const { data } = this.props
        const names = Object.keys(data)
        let toReturn = []
        for (let i = names.length - 1; i >= 0; i--) {
            toReturn.push({
                name: names[i],
                value: data[names[i]]
            })
        }
        return toReturn
    }

    render() {
        let { width } = this.props;
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
                                            <div className="property-input" style={style}>{property.name}</div>
                                        </td>
                                        <td style={style}>
                                            <div className="property-input" style={style}>{property.value}</div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
                <Pagination className="property-list-pagination" size="small" color="secondary" />
                <div className="text-right">
                    <button className="reset-property-btn"  >Reset</button>
                </div>
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
    handleChange: (name, index, type, value) => dispatch(handler.changePropertyHandler(name, index, type, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList)