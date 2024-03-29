import React from 'react'
import RenameDialog from './RenameDialog'
import TeamDialog from './TeamDialog'
import DeleteDialog from './DeleteDialog'
import InviteDialog from './InviteDialog';
import DuplicateDialog from './DuplicateDialog';
import PublishDialog from "./PublishDialog";
import DownloadDialog from "./DownloadDialog";

class Dialogs extends React.Component {

    render() {
        const { team, invite, rename, remove, duplicate, publish, download } = this.props;
        return (
            <>
                <TeamDialog {...this.props} open={team} />

                <InviteDialog {...this.props} open={invite} />

                <RenameDialog
                    {...this.props}
                    open={rename}
                />

                <DuplicateDialog
                    {...this.props}
                    open={duplicate}
                />

                <DeleteDialog
                    {...this.props}
                    open={remove}
                />

                <PublishDialog
                    {...this.props}
                    open={publish}
                />

                <DownloadDialog
                    {...this.props}
                    open={download}
                />
            </>
        )
    }
}

export default Dialogs