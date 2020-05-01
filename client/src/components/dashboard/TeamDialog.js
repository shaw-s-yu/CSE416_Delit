import React from 'react'
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import { v1 } from 'uuid'


class TeamDialog extends React.Component {

    render() {

        const { open, handleOpen, handleClose, project } = this.props
        if (!project) return null
        const members = project.teamInfo
        return (
            <Dialog
                header={project.name}
                open={open}
                fullWidth={true}
                maxWidth="xs"
                actions={[
                    <Button key='1' waves="orange" onClick={handleOpen.bind(this, 'invite')}>invite</Button>,
                    <Button key='2' waves="orange" onClick={handleClose.bind(this, 'team')}>Close</Button>
                ]}
                content={<div className="teamlist-wrapper">
                    {
                        members && members.map(member => {
                            const { username, picture } = member
                            return (
                                <div className="member-box" key={v1()}>
                                    <img src={picture} className="member-picture" alt='member picture'></img>
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