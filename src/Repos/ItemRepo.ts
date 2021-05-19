import React from "react";
import { log } from "../consoleHelper";
import { db } from "../firebase";

export class ItemRepo {
  static createItem = (collection: string, data: any, docId?: string) => {
    db.collection(collection)
      .doc(docId)
      .set(data, { merge: true })
      .then(() => {
        log(`Created an entry in ${collection} collection in firestore`);
      })
      .catch((err) => {
        console.error(err);
        // LoggerRepo.error("Error creating user to firestorme " + err.message);
      });
  };
  static updateItem = (collection: string, data: any, docId?: string) => {
    db.collection(collection)
      .doc(docId)
      .set(data, { merge: true })
      .then(() => {
        log(`Updated item in ${collection} collection in firestore`);
      })
      .catch((err) => {
        console.error(err);
        // LoggerRepo.error("Error updating user to firestore " + err.message);
      });
  };

  static getItem = (collection: string, docId: string) =>
    db
      .collection(collection)
      .doc(docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data !== undefined) {
            log("date is not undefined");
            log(data);
          } else {
            //logErrorAndRejectPromise(errorMessage, reject);
          }
        } else {
          log("doc does not exists");
          log(doc);
        }
      })
      .catch((err) => {
        console.error(err);
        // logErrorAndRejectPromise(JSON.stringify(error), reject);
      });
}
