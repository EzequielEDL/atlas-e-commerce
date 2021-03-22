import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";

const UserItem = ({ user, handleUpdateStatus }) => {
  return (
    <ListItem>
      <ListItemAvatar>
      <Avatar
          alt="https://i.ibb.co/nbypcHd/default-avatar.jpg"
          sizes="24"
        >
          {user.name[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={
          <>
            <Typography>{user.email}</Typography>
            {user.role === 'guest' ? 'Customer' : 'Admin'}
          </>
        }
      />
      <ListItemSecondaryAction>
        {user.role !== "admin" && (
          <Button edge='end' aria-label='promote' onClick={() => handleUpdateStatus(user)}>
            PROMOTE
          </Button>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserItem;
