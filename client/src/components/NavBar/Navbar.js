import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
} from "@material-ui/core";
import LogoSvg from "../SvgIcons/LogoSvg";
import useStyle from "./styles";
import SearchBar from "./SearchBar";
import User from "./User";
import { Link } from "react-router-dom";

import TabNav from "./TabNav/TabNav";
import { connect } from "react-redux";

const Navbar = ({ user }) => {
  const classes = useStyle();

  return (
    <>
      {/*Header*/}
      <AppBar position="sticky" className={classes.header}>
        <Toolbar>
          <Link to="/" style={{display: "flex"}}>

              <LogoSvg width="154px" height="48px" margin="0px 8px"/>

          </Link>
          <SearchBar variant="contained" color="primary" />
          {user.name ? (
            <User user={user} />
          ) : (
            <div className={classes.buttonsContainer}>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button color="primary" className={classes.buttonsNav}>
                  <Typography variant="button">Sign in</Typography>
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonsNav}
                >
                  <Typography variant="button">Register</Typography>
                </Button>
              </Link>
            </div>
          )}

        </Toolbar>
      </AppBar>
      <TabNav idUser={user.id}/>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user_store.user,
  };
};

export default connect(mapStateToProps)(Navbar);
