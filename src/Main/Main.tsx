import React, { useEffect } from "react";
import { LogoutButton } from "../Login/LogoutButton";
import { Menu } from "../Components/UI/shared";
import { PROJECT_TITLE } from "../Constants";
import { auth } from "../firebase";
import { log } from "../consoleHelper";
import { UserService } from "../Services/UserService";
import { useAuthUser } from "../hooks/useAuthUser";
import firebase from "firebase/app";
import { Container, IconButton } from "@material-ui/core";
import { AddCircleRounded } from "@material-ui/icons";

export const Main = () => {
  const { authUser } = useAuthUser();

  async function getEntries(authUser: firebase.User) {
    log("getEntries");
    const entries = await UserService.getEntries(authUser.uid);
    log("entries: ");
    log(entries);
  }

  useEffect(() => {
    if (authUser) {
      getEntries(authUser);
    }
  }, [authUser]);
  return (
    <Container>
      <Menu>
        <div>{PROJECT_TITLE}</div>
        <LogoutButton
          handleLogout={() => {
            auth.signOut();
          }}
        />
      </Menu>
      <IconButton aria-label="add">
        <AddCircleRounded fontSize="large" color="primary" />
      </IconButton>
    </Container>
  );
};
