import React from 'react'
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import { v1 } from 'uuid'


class TeamDialog extends React.Component {

    handleOpen = (name, item, refetch) => {
        this.props.handleSetItem(item, refetch)
        this.props.handleOpen(name)
    }

    render() {

        const { open, handleClose, item, refetch } = this.props
        if (!item) return null
        const members = item.teamInfo
        return (
            <Dialog
                header={item.name}
                open={open}
                fullWidth={true}
                maxWidth="xs"
                actions={[
                    <Button key='1' waves="orange" onClick={this.handleOpen.bind(this, 'invite', item, refetch)}>invite</Button>,
                    <Button key='2' waves="orange" onClick={handleClose.bind(this, 'team')}>Close</Button>
                ]}
                content={<div className="teamlist-wrapper">
                    {
                        members && members.map(member => {
                            const { username, picture } = member
                            return (
                                <div className="member-box" key={v1()}>
                                    <img src={picture} className="member-picture" alt='member'></img>
                                    <div className="member-name">{username}</div>
                                </div>
                            )
                        })
                    }
                </div>
                } />
        )
    }
}

export default TeamDialog