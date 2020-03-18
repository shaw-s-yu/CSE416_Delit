import React from 'react';
// import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
// import { Checkbox } from 'react-materialize'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import {MenuList} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        background:"#3dcfc1",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        flexGrow: 1,
    },
}));

export default function TopNavbar() {
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
        <div className={classes.root} >
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <Typography variant="h5" className={classes.logo}>
                        <a href="/dashboard">DELIT</a>
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button aria-haspopup="true" onClick={handleClick}>
                                File
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
                                View
                            </Button>
                            <Menu
                                id="map-view"
                                anchorEl={anchorEl2}
                                keepMounted
                                open={Boolean(anchorEl2)}
                                onClose={handleClose2}
                            >
                                <MenuItem onClick={handleClose2}>Show property window</MenuItem>
                                <MenuItem onClick={handleClose2}>Show layers window</MenuItem>
                                <MenuItem onClick={handleClose2}>Show tile sets window</MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <Button aria-haspopup="true" onClick={handleClick3}>
                                Edit
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

                    <Button color="inherit" href="/">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// class TopNavbar extends React.Component {
//
//     render() {
//         return (

            {/*<Navbar bg="light" expand="lg">*/}
            {/*    <Navbar.Brand>Home</Navbar.Brand>*/}
            {/*    <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
            {/*    <Navbar.Collapse id="basic-navbar-nav">*/}
            {/*        <Nav className="mr-auto">*/}
            {/*            <NavDropdown title="File" id="basic-nav-dropdown">*/}
            {/*                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
            {/*                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
            {/*                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
            {/*            </NavDropdown>*/}
            {/*            <NavDropdown title="Edit" id="basic-nav-dropdown">*/}
            {/*                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
            {/*                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
            {/*                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
            {/*            </NavDropdown>*/}
            {/*            <NavDropdown title="View" id="basic-nav-dropdown">*/}
            {/*                <Checkbox label="Hide Property Window" value="property" id="property" />*/}
            {/*                <Checkbox label="Hide Layer Window" value="layer" id="layer" />*/}
            {/*                <Checkbox label="Hide Tileset Window" value="tileset" id="tileset" />*/}
            {/*            </NavDropdown>*/}
            {/*        </Nav>*/}
            {/*        <Navbar.Brand href="/">Logout</Navbar.Brand>*/}
            {/*    </Navbar.Collapse>*/}
            {/*</Navbar>*/}
//         )
//     }
//
// }
//
// export default TopNavbar;
