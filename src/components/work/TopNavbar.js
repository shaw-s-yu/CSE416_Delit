import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel, } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        background: "whitesmoke",
    },
}));

function TopNavbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorEl3, setAnchorEl3] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick2 = event => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClick3 = event => {
        setAnchorEl3(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClose3 = () => {
        setAnchorEl3(null);
    };

    return (
        <div >
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Grid container spacing={6} alignItems="flex-end">
                        <Grid item>
                            <a href="/dashboard" className="logo">DELIT</a>
                        </Grid>
                        <Grid item>
                            <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-end"
                        spacing={8}
                    >
                        <Grid item>
                            <Button aria-haspopup="true" onClick={handleClick}>
                                <Typography variant="h5" gutterBottom>
                                    File
                                </Typography>
                            </Button>
                            <Menu
                                id="map-file"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Export</MenuItem>
                                <MenuItem onClick={handleClose}>import</MenuItem>
                                <MenuItem onClick={handleClose}>Save</MenuItem>
                                <MenuItem onClick={handleClose}>Save as</MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <Button aria-haspopup="true" onClick={handleClick2}>
                                <Typography variant="h5" gutterBottom>
                                    View
                                </Typography>
                            </Button>
                            <Menu
                                id="map-view"
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={handleClose2}
                            >
                                <MenuItem>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Show property window"
                                    />
                                </MenuItem>
                                <MenuItem>
                                    <FormControlLabel
                                        control={<Checkbox value="jason" />}
                                        label="Show layers window"
                                    />
                                </MenuItem>
                                <MenuItem>
                                    <FormControlLabel
                                        control={
                                            <Checkbox value="antoine" />
                                        }
                                        label="Show tile sets window"
                                    />
                                </MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <Button aria-haspopup="true" onClick={handleClick3}>
                                <Typography variant="h5" gutterBottom>
                                    Edit
                                </Typography>
                            </Button>
                            <Menu
                                id="map-edit"
                                anchorEl={anchorEl3}
                                keepMounted
                                open={Boolean(anchorEl3)}
                                onClose={handleClose3}
                            >
                                <MenuItem onClick={handleClose3}>Copy</MenuItem>
                                <MenuItem onClick={handleClose3}>Paste</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                        </Grid>
                    </Grid>
                    <Button color="inherit" href="/">
                        <Typography variant="h5" gutterBottom>
                            Logout
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default TopNavbar;
