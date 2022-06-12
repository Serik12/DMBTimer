import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import General from "./components/General";
import PrivateOffice from "./components/PrivateOffice";
import React, { useEffect, useState } from "react";
import Timer from "./components/Timer";
import NaviBar from "./components/NaviBar";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot, Timestamp } from "firebase/firestore";
function Routering() {
  const [datestart, setDatestart] = useState("");
  const [datedmb, setDatedmb] = useState("");
  const [valueform, setvalueLogform] = useState("");
  const [showuseremail, setshowuseremail] = useState("");
  const [displayname, setdisplayname] = useState("");
  const [rank, setrank] = useState("");
  const changevaluelogform = (event) => {
    setvalueLogform(event);
  };
  //проверяем активированна ли сессия
  const auth = getAuth();
  const db = getFirestore();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setshowuseremail(user.email);
        setdisplayname(user.displayName);
        onSnapshot(doc(db, "users", user.email), (doc) => {
          setDatestart(new Date(doc.data().datestart));
          setDatedmb(new Date(doc.data().datefinish));
          setrank(doc.data().rank);
        });
        const uid = user.uid;
        // ...
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <NaviBar
          setrank={setrank}
          rank={rank}
          callform={changevaluelogform}
          displayname={displayname}
          showuseremail={showuseremail}
          getdisplayname={setdisplayname}
          getshowuseremail={setshowuseremail}
          auth={auth}
          getDatestart={setDatestart}
          getDatedmb={setDatedmb}
        />

        {valueform == "LOG" ? (
          <div className="formparrent">
            <LogIn
              callform={changevaluelogform}
              getshowuseremail={setshowuseremail}
              getdisplayname={setdisplayname}
            />
          </div>
        ) : null}
        {valueform == "REG" ? (
          <div className="formparrent">
            <SignUp
              callform={changevaluelogform}
              getshowuseremail={setshowuseremail}
              getdisplayname={setdisplayname}
            />
          </div>
        ) : null}

        <Routes>
          <Route exact path="/" element={<General auth={auth} />} />
          <Route
            path="/Timer"
            element={
              <Timer
                activeform={valueform}
                callform={changevaluelogform}
                datedmb={datedmb}
                datestart={datestart}
              />
            }
          />
          <Route
            path="/PrivateOffice"
            element={
              <PrivateOffice
                displayname={displayname}
                setdisplayname={setdisplayname}
                datedmb={datedmb}
                datestart={datestart}
                activeform={valueform}
                callform={changevaluelogform}
                Changedatedmb={setDatedmb}
                Changedatestart={setDatestart}
                email={showuseremail}
                changerank={setrank}
                rank={rank}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Routering;
