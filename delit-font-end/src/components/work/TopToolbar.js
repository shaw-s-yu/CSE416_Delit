import React from 'react'
import { Dropdown, Button, Checkbox } from 'react-materialize';

const dropdownOption = {
    alignment: 'left',
    autoTrigger: true,
    closeOnClick: false,
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
}

class TopToolbar extends React.Component {
    render() {
        return (
            <div className="workscreen-toptoolbar">
                <Dropdown
                    options={dropdownOption}
                    trigger={<Button node="button" className="workscreen-dropdown">File</Button>}>
                    <div>Import</div>
                    <div>Export</div>
                    <div>Save</div>
                    <div>Save as</div>

                </Dropdown>
                <Dropdown
                    options={dropdownOption}
                    trigger={<Button node="button" className="workscreen-dropdown">Edit</Button>}>
                    <d>Copy</d>
                    <d>Paste</d>
                </Dropdown>
                <Dropdown
                    options={dropdownOption}
                    trigger={<Button node="button" className="workscreen-dropdown">View</Button>}>
                    <Checkbox
                        id="checkbox_1"
                        label="Hide Layer Window"
                        value="Red"
                    />
                    <Checkbox
                        id="checkbox_2"
                        label="Hide Tilesets Window"
                        value="Red"
                    />
                    <Checkbox
                        id="checkbox_3"
                        label="Hide Property Window"
                        value="Red"
                    />
                </Dropdown>
            </div>
        )
    }
}

export default TopToolbar;