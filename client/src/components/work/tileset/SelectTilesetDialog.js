import React from 'react'
import { Button } from "react-bootstrap";
import Dialog from '../../tools/Dialog'
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import QueryList from '../../../graphql/Query';
class SelectTilesetDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { open, close } = this.props;
        return (
                <Dialog
                    header='Select Tileset'
                    open={open}
                    fullWidth={true}
                    maxWidth="lg"
                    actions={[
                        <Button variant="primary" size="sm"  key='1' >Confirm</Button>,
                        <Button variant="primary" size="sm" key='2' onClick={close}>Cancel</Button>
                    ]}
                    content={
                        <>
                            <div>
                                Select your tileset
                            </div>
                        </>
                    } />
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(SelectTilesetDialog);