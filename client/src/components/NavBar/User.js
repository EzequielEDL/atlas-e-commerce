import React, { useRef, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { getUser } from "../../stores/user/actions/user_actions";
import {
  Typography,
  MenuList,
  Paper,
  MenuItem,
  ClickAwayListener,
  Grow,
  IconButton,
  Popper
} from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyle from "./styles";

const User = ({ image, role, user, getUser, dispatch }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const signOut = (e) => {
    window.localStorage.removeItem("session");
    getUser({});
    // dispatch(allActions.emptyCart(user.id))
    handleClose(e);
    window.location.href = "/";
  };

  const ClientMenu = () => (
    <>
      <Link to='/user/profile' className={classes.menuLinks}>
        <MenuItem>Account</MenuItem>
      </Link>
      <Link to='/cart' className={classes.menuLinks}>
        <MenuItem>My Cart</MenuItem>
      </Link>
      <Link to='/' className={classes.menuLinks} onClick={signOut}>
        <MenuItem>Sign Out</MenuItem>
      </Link>
    </>
  );

  const AdminMenu = () => (
    <>
      <Link to='/user/profile' className={classes.menuLinks}>
        <MenuItem>Account</MenuItem>
      </Link>
      <Link to='/admin' className={classes.menuLinks}>
        <MenuItem>Control Panel</MenuItem>
      </Link>
      <Link to='/' className={classes.menuLinks} onClick={signOut}>
        <MenuItem>Sign Out</MenuItem>
      </Link>
    </>
  );

  return (
    <>
      <Typography className={classes.welcomeMessage}>
        Welcome, {user.name}!
      </Typography>
      <IconButton
        id="buttonUser"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <Avatar
          src={image}
          alt="https://i.ibb.co/nbypcHd/default-avatar.jpg"
          sizes="24"
          className={classes.avatar}
        >
          {user.name[0].toUpperCase()}
        </Avatar>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}>
                 { user.role === 'guest' ? <ClientMenu /> : <AdminMenu /> }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUser(user)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user_store.user,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(User);
