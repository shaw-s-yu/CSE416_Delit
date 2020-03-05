import React from 'react'
import { Dropdown, Button } from 'react-materialize';

class TopToolbar extends React.Component {
    render() {
        return (
            <div>
                <Dropdown
                    options={{
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        container: null,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                    }}
                    trigger={<Button node="button">File</Button>}
                >
                    <a href="#">one</a>
                    <a href="#">one</a>
                </Dropdown>
            </div>
        )
    }
}

export default TopToolbar;