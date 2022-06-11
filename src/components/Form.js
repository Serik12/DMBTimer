import React, { useState } from "react";
export default function Form({ title, handleClick, callform, error }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [displayname, setdisplayname] = useState("");
  const Closeform = () => {
    callform(null);
  };
  return (
    <>
      <div className="regform">
        <div className="closeform">
          <div onClick={Closeform}>закрыть</div>
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="mail"
          placeholder="mail"
          autoComplete="off"
        ></input>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          name="passsword"
          placeholder="password"
          autoComplete="off"
        ></input>
        {title == "SIGNUP" ? (
          <input
            value={displayname}
            onChange={(e) => setdisplayname(e.target.value)}
            type="text"
            name="name"
            placeholder="фамилия"
            autoComplete="off"
          ></input>
        ) : null}
        <div className="errordiv">{error}</div>
        <button
          className="regsignbutton"
          onClick={() => handleClick(email, pass, displayname)}
        >
          {title}
        </button>
      </div>
    </>
  );
}
