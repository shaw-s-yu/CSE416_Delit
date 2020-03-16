import React from 'react';
import { Modal } from 'react-materialize'

class Dialog extends React.Component {

    render() {

        return (
            <Modal
                bottomSheet={false}
                fixedFooter={false}
                header={this.props.header}
                open={this.props.open}
                style={{width:'400px', height:'600px'}}
                options={{
                    dismissible: false,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: false,
                    startingTop: '4%'
                }}
                actions={this.props.actions}
            >
                {this.props.content}
            </Modal>

        )
    }

}

export default Dialog;
