import React, { useEffect, useState } from "react";
import {
  differenceInWeeks,
  differenceInCalendarDays,
  differenceInHours,
  differenceInSeconds,
} from "date-fns";
export default function Past({ datestart, datedmb, seconds }) {
  const [pastweeks, setpastweeks] = useState(0);
  const [allpastdays, setallpastdays] = useState(0);
  const [allpasthours, setallpasthours] = useState(0);
  const [allpastseconds, setallpastseconds] = useState(0);
  useEffect(() => {
    const now = new Date();
    if (datestart && datedmb) {
      setpastweeks(differenceInWeeks(now, datestart));
      setallpastdays(differenceInCalendarDays(now, datestart));
      setallpasthours(differenceInHours(now, datestart));
      setallpastseconds(differenceInSeconds(now, datestart));
    }
  }, [datestart, datedmb, seconds]);
  return (
    <>
      <div className="pastfuturediv">
        <div>
          <div className="textfuturepast">Прошло недель:</div>
          <div>{pastweeks}</div>
        </div>
        <div>
          <div className="textfuturepast">Прошло дней:</div>{" "}
          <div>{allpastdays}</div>
        </div>
        <div>
          <div className="textfuturepast">Прошло часов:</div>{" "}
          <div>{allpasthours}</div>
        </div>
        <div>
          <div className="textfuturepast">Прошло секунд:</div>{" "}
          <div>{allpastseconds}</div>
        </div>
      </div>
    </>
  );
}
