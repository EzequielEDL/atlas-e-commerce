import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Breadcrumbs,
  Typography,
  Chip
} from '@material-ui/core'
import ImagoType from '../SvgIcons/ImagoType';
import useStyle from './styles';

import { emphasize, withStyles } from '@material-ui/core/styles';

import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);


const Navbar = () => {

  const classes = useStyle();

  const search = value => {
    alert(value);
  }
 
  const handleClick = event => {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <>
    {/*Header*/}
    <AppBar position='static' className={classes.header}>
      <Toolbar>
        <Link to="/">
          <IconButton>
            <ImagoType 
              width='36px'
              height='36px'
            />
          </IconButton>
        </Link>
        <SearchBar
          variant="contained"
          color="primary"
          useStyle={classes}
          action={search}
        />
        <Button 
          color='primary' 
          className={classes.buttonsNav}
        >
          Sing in
        </Button>
        <Button
          variant="contained"
          color="primary" 
          className={classes.buttonsNav}
        >
          Sing up
        </Button>
      </Toolbar>
    </AppBar>
    <AppBar position='static' className={classes.header}>
      <Toolbar>
       

        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Home"
            icon={<HomeIcon fontSize="small" />}
            onClick={handleClick}
          />
          <StyledBreadcrumb component="a" href="#" label="Catalog" onClick={handleClick} />
          <StyledBreadcrumb
            label="Accessories"
            deleteIcon={<ExpandMoreIcon />}
            onClick={handleClick}
            onDelete={handleClick}
          />
        </Breadcrumbs>

        
        
      </Toolbar>
    </AppBar>
    {/*Add NavBar*/}
    {/* <Toolbar> */}
    {/*Add Navbar here*/}
    {/* </Toolbar> */}
    </>
  )
}

export default Navbar;

