import React from 'react'
import RenameDialog from './RenameDialog'
import TeamDialog from './TeamDialog'
import DeleteDialog from './DeleteDialog'
import InviteDialog from './InviteDialog';

class Dialogs extends React.Component {

    render() {
        const { team, invite, rename, remove } = this.props;
        return (
            <>
                <TeamDialog {...this.props} open={team} />

                <InviteDialog {...this.props} open={invite} />

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