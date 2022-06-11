import React, { useEffect, useState } from "react";
import {
  differenceInWeeks,
  differenceInCalendarDays,
  differenceInHours,
  differenceInSeconds,
} from "date-fns";
export default function Future({ datestart, datedmb, seconds }) {
  const [futureweeks, setfutureweeks] = useState(0);
  const [allfuturedays, setallfuturedays] = useState(0);
  const [allfuturehours, setallfuturehours] = useState(0);
  const [allfutureseconds, setallfutureseconds] = useState(0);
  useEffect(() => {
    const now = new Date();
    if (datestart && datedmb) {
      setfutureweeks(differenceInWeeks(datedmb, now));
      setallfuturedays(differenceInCalendarDays(datedmb, now));
      setallfuturehours(differenceInHours(datedmb, now));
      setallfutureseconds(differenceInSeconds(datedmb, now));
    }
  }, [datestart, datedmb, seconds]);
  return (
    <>
      <div className="pastfuturediv">
        <div>
          <div className="textfuturepast">Осталось недель:</div>
          <div>{futureweeks}</div>
        </div>
        <div>
          <div className="textfuturepast">Осталось Дней: </div>
          <div>{allfuturedays}</div>
        </div>
        <div>
          <div className="textfuturepast">Осталось часов:</div>{" "}
          <div>{allfuturehours}</div>
        </div>
        <div>
          <div className="textfuturepast"> Осталось секунд:</div>{" "}
          <div>{allfutureseconds}</div>
        </div>
      </div>
    </>
  );
}
