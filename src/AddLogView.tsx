import React, { useEffect, useState } from "react";

import { Button, Card, IconButton } from "@material-ui/core";
import { AddCircleRounded, CloseRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import { FlexColumn, FlexRow } from "./Components/UI/shared";
import { log } from "./consoleHelper";
import { UserService } from "./Services/UserService";
import { useAuthUser } from "./hooks/useAuthUser";
import Autocomplete from "@material-ui/lab/Autocomplete";
import firebase from "firebase/app";

interface User {
  email: string;
  securities: string[];
}
export const AddLogView = ({ handleClose }: { handleClose: any }) => {
  const { authUser } = useAuthUser();
  const [user, setUser] = useState<User | undefined>(undefined);

  const [security, setSecurity] = useState("");

  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const fieldWidth = "15rem";

  const [securities, setSecurities] = useState([]);
  async function getUserData() {
    if (authUser) {
      const fetchedUser = await getUser(authUser.uid);
      if (fetchedUser) {
        log(fetchedUser as User);
        setUser(fetchedUser as User);
        setSecurities(fetchedUser.securities);
      }
    }
  }

  async function getUser(uid: string) {
    return await UserService.getUser(uid);
  }
  useEffect(() => {
    getUserData();
  }, [authUser]);

  const updateSecurities = (data: any) => {
    log("updateSecurities...");
    if (authUser) {
      UserService.updateUser(
        authUser.uid,
        {
          securities: data,
        },
        () => {
          log("Updated");
          getUserData();
          alert("Opprettet");
        }
      );
    }
  };

  const AddSecurityButton = () => {
    log(security);
    return (
      <>
        {security.length > 0 ? (
          <IconButton
            aria-label="add"
            onClick={() => {
              if (security.length > 0) {
                const itemsInList = securities.filter((s) => s === security);
                if (itemsInList.length === 0) {
                  const newSecurities = [...securities, security];
                  updateSecurities(newSecurities);
                }
              }
            }}
            disabled={security.length < 1}
          >
            <AddCircleRounded color="primary" />
          </IconButton>
        ) : null}
      </>
    );
  };

  return (
    <Card
      variant="outlined"
      style={{ paddingTop: 5, paddingLeft: 20, paddingBottom: 20 }}
    >
      <FlexRow justifyContent="flex-end">
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseRounded fontSize="small" color="primary" />
        </IconButton>
      </FlexRow>
      <form className="AddEntry">
        <FlexColumn>
          <FlexRow>
            <Autocomplete
              id="combo-box-demo"
              options={securities}
              getOptionLabel={(option) => option}
              style={{ width: fieldWidth }}
              onInputChange={(e, value) => {
                if (value === "") {
                  //setSecurity(value);
                }
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Verdipapir"
                    onChange={(e) => {
                      setSecurity(e.target.value);
                    }}
                  />
                );
              }}
            />
            <AddSecurityButton />
          </FlexRow>
          <TextField
            id="Price"
            label="Pris"
            style={{ width: fieldWidth }}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            id="Note"
            label="Notat"
            style={{ width: fieldWidth }}
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={{ width: fieldWidth }}
            onClick={() => {
              log("save asset");
            }}
          >
            Save
          </Button>
        </FlexColumn>
      </form>
    </Card>
  );
};
