import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
export default function General() {
  const auth = getAuth();
  return (
    <>
      {console.log(auth.currentUser)}
      {auth.currentUser ? (
        <div className="Ad">
          <div>Поздравляем, вы успешно авторизовались!</div>
        </div>
      ) : (
        <div className="Ad">
          <div>
            Зарегистрируйтесь или авторизуйтесь, если имеете аккаунт. В личном
            кабинете установите свои настройки
          </div>
        </div>
      )}
    </>
  );
}
