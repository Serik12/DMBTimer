import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Progress from "./Progress";
import Past from "./Past";
import Future from "./Future";
import "react-calendar/dist/Calendar.css";
import {
  endOfMonth,
  differenceInMonths,
  differenceInYears,
  startOfTomorrow,
  differenceInHours,
  endOfHour,
  differenceInMinutes,
  endOfMinute,
  differenceInSeconds,
  differenceInDays,
  getDate,
  addMonths,
  endOfYesterday,
  getMonth,
} from "date-fns";
const Styles = styled.div`
  button {
    background-color: gray;
  }
  button: hover {
    background-color: #daebdc;
  }
  .navbar-nav .nav-link:hover {
    color: #daebdc;
  }
`;
export default function Timer({ datedmb, datestart }) {
  //Хуки для отображения дней/часов и тд
  const [seconds, setseconds] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [hours, sethours] = useState(0);
  const [days, setdays] = useState(0);
  const [timer, settimer] = useState(0);
  const [mounth, setmounth] = useState(0);
  const [years, setyears] = useState(0);
  const end = new Date(datedmb);

  const Days = (end) => {
    //const end = new Date('2022, 06, 5')
    const now = new Date();
    let a = differenceInMonths(end, now); //разница в месяцах
    if (a < 0) {
      a = 0;
    }
    const b = addMonths(now, a); // добавляем к текущему месяцу те которые еще ждать
    let daysinnowmounth = getDate(endOfMonth(now)); // получаем количество дней в текщем месяце
    let difdays = getDate(endOfMonth(addMonths(end, -1))); //кол-во дней в предыдущем конечному месяце
    let adddays = 0;
    // если в месяце предшествующему последнему было менее чем в текущем, то получаем и добавляем разность (кол-во дней в текущем)-(кол-во дней в предпоследнем) к конечной сумме дней
    if (difdays < daysinnowmounth) {
      adddays = daysinnowmounth - difdays;
    }
    // получаем разницу в днях между текущ датой и конечной
    if (getMonth(end) - getMonth(endOfYesterday()) < 0) {
      adddays = 0;
    }
    const result =
      getDate(now) < getDate(end)
        ? differenceInDays(end, b)
        : differenceInDays(end, b) + adddays;
    return result;
  };

  // меняем значения в интерфесе
  useEffect(() => {
    if (datedmb) {
      if (timer !== undefined) {
        clearInterval(timer);
      }
      const now = new Date();
      setyears(differenceInYears(end, now));
      setmounth(
        differenceInMonths(end, now) - 12 * differenceInYears(end, now)
      );
      setdays(Days(end));
      sethours(differenceInHours(startOfTomorrow(), now));
      setminutes(differenceInMinutes(endOfHour(now), now));
      setseconds(differenceInSeconds(endOfMinute(now), now));

      const timerId = setInterval(() => {
        const now = new Date();
        setyears(differenceInYears(end, now));
        setmounth(
          differenceInMonths(end, now) - 12 * differenceInYears(end, now)
        );
        setdays(Days(end));
        sethours(differenceInHours(startOfTomorrow(), now));
        setminutes(differenceInMinutes(endOfHour(now), now));
        setseconds(differenceInSeconds(endOfMinute(now), now));
      }, 1000);
      settimer(timerId);
    }
  }, [datedmb]);

  return (
    <>
      <div className="header-timer-block"> До дембеля осталось:</div>
      <div className="timer-block-parent">
        <div className="timer-block">
          <div>
            <p>Лет</p>
            {years}
          </div>
          <div>
            <p>Мес.</p>
            {mounth}
          </div>
          <div>
            <p>Дней</p>
            {days}
          </div>
          <div>
            <p>Часов</p>
            {hours}
          </div>
          <div>
            <p>Мин.</p>
            {minutes}
          </div>
          <div>
            <p>Сек.</p>
            {seconds}
          </div>
        </div>
      </div>
      <div className="big-block-progress">
        <div className="header-progress-block">Шкала прогресса</div>
        <div className="progress-parent">
          <Progress dmdDate={datedmb} datestart={datestart} seconds={seconds} />
        </div>
      </div>
      <div className="pastfuture">
        <Past datedmb={datedmb} datestart={datestart} seconds={seconds} />
        <Future datedmb={datedmb} datestart={datestart} seconds={seconds} />
      </div>
    </>
  );
}
