import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Pencil from "./Pencil";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
  deleteField,
  getDocs,
} from "firebase/firestore";
import { formatISO } from "date-fns";
export default function PrivateOffice({
  Changedatedmb,
  Changedatestart,
  email,
  datestart,
  datedmb,
  setdisplayname,
  changerank,
  displayname,
  rank,
}) {
  const [valuedatestart, onChangestart] = useState(new Date());
  const [valuedatedmb, onChangedmb] = useState(new Date());
  const [redbutton, changeredbutton] = useState("disabled");
  const [datebutton, changedatebutton] = useState("disabled");
  const [newname, setnewname] = useState(displayname);
  const [newrank, setnewrank] = useState(rank);
  const navigate = useNavigate();
  const SetDateValue = async () => {
    const db = getFirestore();
    const ref = doc(db, "users", email);
    Changedatedmb(valuedatedmb);
    Changedatestart(valuedatestart);
    await updateDoc(ref, {
      datestart: formatISO(new Date(valuedatestart), {
        representation: "date",
      }),
      datefinish: formatISO(new Date(valuedatedmb), { representation: "date" }),
    });
    navigate("/Timer");
  };
  const Setbaserank = async () => {
    const db = getFirestore();
    const ref = doc(db, "users", email);
    changerank(newrank);
    await updateDoc(ref, {
      rank: newrank,
    });
  };

  const activebutton2 = () => {
    redbutton === "disabled"
      ? changeredbutton("")
      : changeredbutton("disabled");
  };
  const activebutton1 = () => {
    datebutton === "disabled"
      ? changedatebutton("")
      : changedatebutton("disabled");
  };
  const updatename = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: newname,
    });
    setdisplayname(newname);
  };

  return (
    <>
      <div className="privateofficefon">
        <div className="Privateofficeinfo">
          <div>Редактирование даты призыва</div>
          <div onClick={activebutton1}>
            <Pencil />
          </div>
        </div>
      </div>
      {datestart ? (
        <div>
          Дата призыва :{formatISO(datestart, { representation: "date" })}
        </div>
      ) : null}
      {datedmb ? (
        <div>
          Дата дембеля :{formatISO(datedmb, { representation: "date" })}
        </div>
      ) : null}
      <div className="privvatofficediv">
        <div className="calenblock">
          <div className="calendar-start">
            Дата призыва
            <Calendar onChange={onChangestart} value={valuedatestart} />
          </div>
          <div className="calendar-finish">
            Дата увольнения
            <Calendar onChange={onChangedmb} value={valuedatedmb} />
          </div>
        </div>
        <div className="calendar-button">
          <button
            disabled={datebutton}
            onClick={() => {
              SetDateValue();
              activebutton1();
            }}
          >
            Установить даты
          </button>
        </div>
        <div className="privateofficefon">
          <div className="Privateofficeinfo">
            <div>Редактирование личных данных</div>
            <div onClick={activebutton2}>
              <Pencil />
            </div>
          </div>
        </div>
        <div className="divpersonalInfo">
          <form className="personalInfo">
            <input
              value={newrank}
              onChange={(e) => {
                setnewrank(e.target.value);
              }}
              type="text"
              name="rank"
              placeholder="звание"
              autoComplete="off"
            ></input>
            <input
              value={newname}
              type="text"
              name="name"
              placeholder="Фамилия"
              autoComplete="off"
              onChange={(e) => setnewname(e.target.value)}
            ></input>
            <button
              disabled={redbutton}
              onClick={() => {
                activebutton2();
                updatename();
                Setbaserank();
              }}
            >
              сохранить изменения
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
