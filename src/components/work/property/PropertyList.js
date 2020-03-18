import React from 'react';
import { Table } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { Button } from 'react-materialize'
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';
import Pagination from '../../tools/Pagination'


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


    render() {
        let { width } = this.props;
        if (typeof width === 'number') width += 'px'
        width = width.split('px')[0] / 2.3
        const style = {
            maxWidth: width,
            width: width,
            flexShrink: 0,
        }

        const { data } = this.props
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
                                            <ContentEditable
                                                innerRef={property.nref}
                                                onChange={this.handleChange.bind(this, index, 'name')}
                                                onMouseDown={e => e.stopPropagation()}
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
                                                onMouseDown={e => e.stopPropagation()}
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
                <Pagination className="property-list-pagination center" size="small" color="secondary" />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { width } = state.workScreen.property.size
    const { selected } = state.property
    return {
        width: width,
        selected: selected,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleSelect: (name, value) => dispatch(handler.selectPropertyHandler(name, value)),
    handleChange: (name, index, type, value) => dispatch(handler.changePropertyHandler(name, index, type, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyList)