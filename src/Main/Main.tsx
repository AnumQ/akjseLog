import React, { useEffect, useState } from "react";
import { LogoutButton } from "../Login/LogoutButton";
import { Menu } from "../Components/UI/shared";
import { PROJECT_TITLE } from "../Constants";
import { auth } from "../firebase";
import { log } from "../consoleHelper";
import { UserService } from "../Services/UserService";
import { useAuthUser } from "../hooks/useAuthUser";

import { Container, IconButton } from "@material-ui/core";
import { AddCircleRounded } from "@material-ui/icons";
import { AddLogView } from "../AddLogView";

export const Main = () => {
  const [isShowing, setShow] = useState(true);

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
      {isShowing ? (
        <AddLogView
          handleClose={() => {
            setShow(false);
          }}
        />
      ) : (
        <IconButton
          aria-label="add"
          onClick={() => {
            setShow(true);
          }}
        >
          <AddCircleRounded fontSize="large" color="primary" />
        </IconButton>
      )}
    </Container>
  );
};
