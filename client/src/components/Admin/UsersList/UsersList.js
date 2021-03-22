import React, { useEffect, useState } from "react";
import { getUsers, updateUserStatus } from "../../../controllers/users";
import UserItem from "./UserItem/UserItem";
import { List, GridList } from "@material-ui/core";

const UsersList = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdateStatus = (user) => {
    updateUserStatus(user.id)
      .then((res) => {
        const findUser = users.find((u) => u.id === user.id);
        findUser.role = "admin";

        const updatedUser = users.map((u) => {
          if (u.id === findUser.id) return findUser;
          return u;
        });

        setUsers(updatedUser);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <GridList cellHeight={400} cols={1}>
        <List>
          {users &&
            users.map((u) => (
              <UserItem
                key={u.email}
                user={u}
                handleUpdateStatus={handleUpdateStatus}
              />
            ))}
        </List>
      </GridList>
    </>
  );
};

export default UsersList;
