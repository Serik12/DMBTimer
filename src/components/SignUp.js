import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Form from "./Form";
import { getFirestore, doc, setDoc } from "firebase/firestore";
export default function SignUp({ callform, getshowuseremail, getdisplayname }) {
  const [error, seterror] = useState(null);
  const handleSignUp = (email, passsword, displayname) => {
    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, email, passsword)
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: displayname,
        });
        signInWithEmailAndPassword(auth, email, passsword).then(({ user }) => {
          callform(null);
          getshowuseremail(email);
          getdisplayname(displayname);
          console.log("вы успешно зарегистрировались и авторизовались");
        });

        try {
          setDoc(doc(db, "users", email), {
            datestart: null,
            datefinish: null,
            email: null,
          });
          console.log("Заполнил ");
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      })
      .catch((e) => {
        const errorCode = e.code;
        seterror(String(errorCode).split("/")[1]);
      });
  };

  return (
    <Form
      title="SIGNUP"
      handleClick={handleSignUp}
      callform={callform}
      error={error}
    />
  );
}
