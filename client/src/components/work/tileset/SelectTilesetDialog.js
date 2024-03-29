import React from 'react'
import { Button } from "react-bootstrap";
import Dialog from '../../tools/Dialog'
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import QueryList from '../../../graphql/Query';
import Searchbar from "../../tools/Searchbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "../../tools/Pagination";
import TilesetList from "./TilesetList";
import * as handler from "../../../store/database/WorkScreenHandler";
import TilesetTransaction from "../../controller/TilesetTransaction";
class SelectTilesetDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            search: '',
            sortBy: 'lastUpdate',
            lastUpdate: -1,
            name: -1,
        }
        this.selectedTilesets =[];
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
    };

    handleSortBy = (e, type) => {
        this.setState({ sortBy: type })
    };

    handleSortOrder = (e, type) => {
        const order = this.state[type];
        this.setState({ [type]: order === 1 ? -1 : 1 })
    };
    handlePagination = (e, value) => {
        this.setState({ page: value })
    };

    getSelected = (type) => {
        const { sortBy } = this.state;
        return sortBy === type ? 'tileset-sort-btn-selected' : ''
    };

    getSortOrder = (type) => {
        return this.state[type] === -1 ? 'fa-arrow-down' : 'fa-arrow-up'
    };

    handleCheckboxClick = (item, e) => {
        const {target} = e;
        const checked = target.checked;
        if (checked)
            this.selectedTilesets.push(item);
        else
            this.selectedTilesets = this.selectedTilesets.filter((i) => i._id !== item._id);
        this.forceUpdate()
    };

    handleSubmitButton = () => {
        let oldTilesets = JSON.parse(JSON.stringify(this.props.tilesets));
        let newTilesets = oldTilesets.concat(this.selectedTilesets);
        this.selectedTilesets=[];
        this.props.transactions.addTransaction(
            new TilesetTransaction(newTilesets, oldTilesets, this.props.handleUpdateTilesets, this.props.restoreTileset)
        )
        this.props.close();
    };

    render() {
        const { open, close, user, history } = this.props;
        const { page, search, sortBy } = this.state;
        const query = QueryList.GET_PUBLISHED_TILESETS;
        const pageSkip = (page - 1) * 6;
        const sortOrder = this.state[sortBy];
        const tilesetIds = [...new Set(this.props.tilesets.map((tileset) => tileset._id ))];
        const disabled = this.selectedTilesets.length === 0;
        return (
            <>
                <Dialog
                    header='Select Your Tilesets'
                    open={open}
                    fullWidth={true}
                    maxWidth="lg"
                    actions={[
                        <Button variant="primary" size="sm"  key='1' disabled={disabled} onClick={this.handleSubmitButton}>Confirm</Button>,
                        <Button variant="primary" size="sm" key='2' onClick={close}>Cancel</Button>
                    ]}
                    content={
                        <>
                            <Searchbar value={search} onChange={this.handleSearchChange} />
                            <div className="tileset-sort-btn-group">
                                <button className={"tileset-sort-btn " + this.getSelected('name')} onClick={e => this.handleSortBy(e, 'name')}>Name </button>
                                <i className={"fa tileset-sort-icon " + this.getSortOrder('name')} onClick={e => this.handleSortOrder(e, 'name')} />
                                <button className={"tileset-sort-btn " + this.getSelected('lastUpdate')} onClick={e => this.handleSortBy(e, 'lastUpdate')}>Last Modified </button>
                                <i className={"fa tileset-sort-icon " + this.getSortOrder('lastUpdate')} onClick={e => this.handleSortOrder(e, 'lastUpdate')} />
                            </div>
                            <Query query={query} variables={{ userId: user._id, pageSkip: pageSkip, search: search, sortBy: sortBy, sortOrder: sortOrder }} fetchPolicy={"no-cache"}>
                                {({ loading, error, data }) => {
                                    if (loading)
                                        return <CircularProgress className="tileset-loading" size={220}/>;
                                    if (error) return 'error';
                                    if (query === QueryList.EMPTY_QUERY)
                                        return;
                                    if (!data) return 'error';
                                    let items = data.user.publishedTilesets;
                                    items = items.filter((item) => {
                                        for(let i = 0; i < tilesetIds.length; i++) {
                                            if (tilesetIds[i] === item._id)
                                                return false;
                                        }
                                        return true;
                                    });
                                    let amount = items.length;

                                    const pageAmount = amount % 6 === 0 ? amount / 6 : Math.floor(amount / 6) + 1;
                                    return(
                                        <div className="tileset-container">
                                            <TilesetList
                                                items={items}
                                                history={history}
                                                handleCheckboxClick={this.handleCheckboxClick}
                                            />
                                            <Pagination
                                                className="tileset-pagination center"
                                                size="large"
                                                color="secondary"
                                                count={pageAmount}
                                                handlePagination={this.handlePagination}
                                                defaultPage={page}
                                            />
                                        </div>
                                    )}
                                }
                            </Query>
                        </>
                    }
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    return { user };
};

const mapDispatchToProps = (dispatch) => ({
    handleUpdateTilesets: (tilesets) => dispatch(handler.updateTilesetsHandler(tilesets)),
    restoreTileset: (tilesets) => dispatch(handler.restoreTileset(tilesets)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectTilesetDialog);