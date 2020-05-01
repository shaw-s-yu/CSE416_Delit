import React from 'react'
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";

import { TextInput } from 'react-materialize'
import RenameDialog from './RenameDialog'
import TeamDialog from './TeamDialog'
import DeleteDialog from './DeleteDialog'

class Dialogs extends React.Component {

    render() {
        const { team, invite, handleClose, rename, remove } = this.props;
        return (
            <>
                <TeamDialog {...this.props} open={team} />
                <Dialog
                    header="Add Teammate"
                    open={invite}
                    actions={[
                        <Button key='1' waves="orange">Add More?</Button>,
                        <Button key='2' waves="orange">Remove?</Button>,
                        <Button key='3' waves="orange" onClick={handleClose.bind(this, 'invite')}>Close</Button>
                    ]}
                    var totalTextbox='1'
                    content={
                        <section className="dialog_content" id="textBoxes">
                            <p><strong>Please enter the Email to add your teammate</strong></p>
                            <TextInput label="Enter The Email" className="input_textbox" />
                        </section>
                    } />

                <RenameDialog
                    {...this.props}
                    open={rename}
                />

                <DeleteDialog
                    {...this.props}
                    open={remove}
                />
            </>
        )
    }
}

export default Dialogs