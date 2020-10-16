import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/index"
import { getAppointmentsForDay } from '../helpers/selectors'
import{ getInterviewersForDay} from "../helpers/selectors"
import useApplicationData from '../hooks/useApplicationData'

export default function Application(props) {
  const{
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers=getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  console.log(dailyAppointments, "DAILY APPOINTMENTS")
  const schedule = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        day={state.day}
        days={state.days}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  schedule.push(<Appointment/>)
  console.log(schedule, "SCHEDULE!")
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
