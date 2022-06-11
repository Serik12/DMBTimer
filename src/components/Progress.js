import React, { useEffect, useState } from "react";
import { differenceInDays, differenceInSeconds } from "date-fns";
function Progress({ dmdDate, datestart, seconds }) {
  const [procents, setprocents] = useState("0%");
  // опрашивае чтобы DOM элементы успели прорисоваться
  useEffect(() => {
    const start = new Date(datestart);
    const end = new Date(dmdDate);
    const now = new Date();
    if (document.querySelector(".progress-procents") != null) {
      (
        differenceInSeconds(now, start) /
        (differenceInSeconds(end, start) / 100)
      ).toFixed(2);
      setprocents(
        (
          differenceInSeconds(now, start) /
          (differenceInSeconds(end, start) / 100)
        ).toFixed(2)
      );
      const progress = document.querySelector(".progress-procents");
      progress.style.width = String(Math.floor(procents)) + "%";
    }
  }, [procents, seconds]);
  //<div className="valueprocent">{procents + "%"}</div>
  return (
    <>
      <div className="valueprocent">{procents + "%"}</div>
      <div className="progress-div">
        <div className="progress-procents"></div>
      </div>
    </>
  );
}
export default Progress;
