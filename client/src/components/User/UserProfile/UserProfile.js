import React, { useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { getUser } from "../../../stores/user/actions/user_actions";
import {
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
} from "@material-ui/core";
import UserOrders from "./UserOrders/Userorders";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import useStyle from "./styles";
import { useDispatch } from "react-redux";
import allActions from "../../../stores/cart/actions/all_actions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const user = useSelector((state) => state.user_store.user);

  /*const [image, _setImage] = useState(null);*/
  const [open, setOpen] = useState(true);
  /*const inputFileRef = createRef(null);*/

  /*const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };*/

  /*const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };*/

  /*const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };*/

  const handleOnClick = () => {
    setOpen(!open);
  };


  /* const Content = (
      <>
      { toggle === 'toggleOrder' ? (
            <Fullorders />
        )
          :(<></>)
      }
      { toggle === 'togglePassword' ? (
        <>
            <PasswordReset />
        </>
        ): (<></>)
      }
      </>
    ); */

  const signOut = () => {
    window.localStorage.removeItem("session");
    dispatch(allActions.emptyCart(user.id));
    getUser({});
    window.location.href = "/";
  };

  const ClientMenu = () => (
    <>
      <Link to='/cart'>
        <ListItem button className={classes.menuLinks}>
          <ListItemIcon>
            <ShoppingCartOutlinedIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary='My cart' />
        </ListItem>
      </Link>
    </>
  );

  const AdminMenu = () => (
    <Link to='/admin'>
      <ListItem button className={classes.menuLinks}>
        <ListItemIcon>
          <LockOutlinedIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary='Control Panel' />
      </ListItem>
    </Link>
  );

  return (
    <Grid
      container
      xs={8}
      direction='row'
      justify='flex-start'
      spacing={6}
      wrap='wrap'>
      <Grid item container xs={6}>
        <Card className={classes.body}>
          <Typography variant='h5' align='center'>
            Your Account!
          </Typography>
          <CardContent className={classes.content}>
            <div className={classes.centered}>
              <Avatar
                className={classes.large}
                $withBorder
                alt='Avatar'
                //src={image || "https://i.ibb.co/nbypcHd/default-avatar.jpg"}
              >
              {user.name[0].toUpperCase()}
              </Avatar>


             {/*  <CardActions>
                <input
                  ref={inputFileRef}
                  accept='image/*'
                  hidden
                  id='avatar-image-upload'
                  type='file'
                  onChange={handleOnChange}
                />
                <label htmlFor='avatar-image-upload'>
                  <Button
                    variant='contained'
                    color='primary'
                    component='span'
                    mb={2}
                    onClick={handleClick}
                    className={classes.button}>
                    {image ? (
                      <DeleteOutlineOutlinedIcon
                        mr={2}
                        className={classes.icons}
                      />
                    ) : (
                      <CloudUploadOutlinedIcon
                        mr={2}
                        className={classes.icons}
                      />
                    )}
                    {image ? "Remove picture" : "Change picture"}
                  </Button>
                </label>
              </CardActions> */}
            </div>
            <List component='nav' aria-label='secondary mailbox folders'>
              <ListItem>
                <ListItemText primary='Name' secondary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Email' secondary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary='Password' secondary='*****' />
              </ListItem>
              <Divider />
              {user.role === "admin" ? <AdminMenu /> : <ClientMenu />}
              <ListItem button onClick={handleOnClick}>
                <ListItemIcon>
                  <SettingsOutlinedIcon style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary='Account settings' />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItem button className={classes.nested} onClick={signOut}>
                    <ListItemText primary='Sign out' />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container xs={6}>
        <div style={{ marginTop: "10px" }}>
          <UserOrders />
        </div>
      </Grid>
    </Grid>
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

export default connect(mapStateToProps, mapActionsToProps)(UserProfile);
