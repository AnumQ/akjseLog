import React from "react";
import { log } from "../consoleHelper";
import { db } from "../firebase";

export class FirebaseRepo {
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
  static updateItem = (collection: string, docId: string, data: any) => {
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

  static getItem = async (collection: string, docId: string) => {
    try {
      const doc = await db.collection(collection).doc(docId).get();
      return doc.exists ? doc.data() : undefined;
    } catch (err) {
      console.error(err);
    }
  };
}
