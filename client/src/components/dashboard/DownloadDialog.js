import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import React from 'react'
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'

class DownloadDialog extends React.Component {
    state = {
        checked: true,
    };

    handleOnChange = (e) => {
        this.setState({ checked: e.target.checked })
    };

    handleDownload = (e) => {
        const dataJson = {}
        dataJson.firstgid = 1
        dataJson.image = "./tileset@DELIT.jpeg"
        dataJson.imageheight = e.height
        dataJson.imagewidth = e.width
        dataJson.margin = e.margin
        dataJson.name = e.name
        dataJson.properties = {}
        dataJson.spacing = e.spacing
        dataJson.tileheight = e.tileHeight
        dataJson.tilewidth = e.tileWidth
        dataJson.tilecount = e.tilecount
        require("downloadjs")(dataJson, `${dataJson.name}.json`, "json");
        console.log(e)
        
    }

    handleSubmit = (tileset) => {
        this.handleDownload(tileset)
        console.log(this.props)
        this.props.handleClose('download')
    };


    render() {
        const { open, item, user, refetch,  handleClose } = this.props;
        if (!item) return null;
        const  downloadKey  = item._id
        const query = QueryList.GET_TILESET
        console.log(this.props)
        console.log("=================")
        return (
            <Query query={QueryList.GET_TILESET} variables={{ id: downloadKey }} fetchPolicy={'network-only'}>
                {({ loading, error, data }) => {
                    if (loading) return 'loading'
                    if (error) return 'error'
                    if (!data) return 'error'
                    const { tileset } = data
                    return (
                        <Dialog
                            header={<>Download</>}
                            open={open}
                            maxWidth={'xl'}
                            actions={[
                                <Button key='1' onClick={this.handleSubmit.bind(this, tileset)} >Download Now!</Button>,
                                <Button key='2' onClick={handleClose.bind(this, 'download')}>Nah!</Button>,
                            ]}
                            content={
                                <p>Do you want to download <span className={"header-item-name"} >{item.name}</span> e.</p>
                            }
                        />
                    )
                }}

            </Query>
        )
    }

}

export default DownloadDialog;