import React from "react";
import { log } from "../consoleHelper";
import { COLLECTION } from "../Constants";
import { FirebaseRepo } from "../Repos/FirebaseRepo";
import firebase from "firebase/app";

const collection = COLLECTION.USERS;

export class UserService {
  static createUser = (uid: string, email: string) => {
    FirebaseRepo.createItem(collection, { email: email, admin: false }, uid);
  };

  static updateUser = (uid: string, fields: any, onCompletion?: () => void) => {
    FirebaseRepo.updateItem(
      collection,
      uid,
      {
        ...fields,
      },
      onCompletion
    );
  };

  static getUser = async (uid: string) => {
    const user = await FirebaseRepo.getItem(collection, uid);
    return user;
  };

  static geSecurities = async (uid: string) => {
    try {
      const user = await FirebaseRepo.getItem(collection, uid);
      log("getEntries");
      log(user);
      return user ? user.securities : undefined;
    } catch (err) {
      console.error(err);
    }
  };

  static createUserIfDoesntExist = async (authUser: firebase.User) => {
    const user = await UserService.getUser(authUser.uid);
    if (!user) {
      log("Creating user...");
      UserService.createUser(authUser.uid, authUser.email ?? "");
    }
  };
}
