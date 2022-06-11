import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Form from "./Form";
import { current } from "@reduxjs/toolkit";
export default function LogIn({ callform, getshowuseremail, getdisplayname }) {
  const [error, seterror] = useState(null);
  const setdata = (email, displayname) => {
    getshowuseremail(email);
    getdisplayname(displayname);
  };
  const dispatch = useDispatch();
  const handleLogin = (email, passsword) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, passsword)
      .then(({ user }) => {
        const displayName = user.displayName;
        const email = user.email;
        callform(null);

        setdata(email, displayName);
      })
      .catch((e) => {
        const errorCode = e.code;
        seterror(String(errorCode).split("/")[1]);
      });
  };

  return (
    <Form
      title="LOGIN"
      handleClick={handleLogin}
      callform={callform}
      error={error}
    />
  );
}
