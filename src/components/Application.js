
import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "./Appointment"
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
// import useVisualMode from "hooks/useVisualMode"

export default function Application(props) {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  appointments: {},
  interviewers:{}
});

function bookInterview(id, interview) {
  console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  setState({
    ...state,
    appointments
  });
  return axios.put(`/api/appointments/${id}`,{'interview':interview}).then(() => setState({...state,appointments}))
}

function cancelInterview (id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  
  // setState({
  //   ...state,
  //   appointments
  // });

  return axios.delete(`http://localhost:8001/api/appointments/${id}`).then(() => setState({...state,appointments}))

 }
const setDay = day => setState(prev => ({ ...prev, day }));
const dailyAppointments = getAppointmentsForDay(state,state.day)
const interviewers = getInterviewersForDay(state,state.day)

const AppointmentList = dailyAppointments.map((appointment)=> {
  const interview = getInterview(state, appointment.interview);
  return (
    <Appointment 
    key = {appointment.id}
    id = {appointment.id}
    time = {appointment.time}
    interview = {interview}
    interviewers = {interviewers}
    bookInterview = {bookInterview}
    cancelInterview = {cancelInterview}
    />
  )

})
// const setDays = (days) => setState(prev => ({ ...prev, days }));


  // useEffect(() => {
  //   const url =  "http://localhost:8001/api/days";
  //   axios.get(url).then(response => {
  //     setDays([...response.data])
  //   })
  // }, [])

  useEffect(() => {
    Promise.all([
        axios.get('/api/days'), 
        axios.get('/api/appointments'),
        axios.get('/api/interviewers')
      ]
    ).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })

  }, []);
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
      <DayList days={state.days} day={state.day} setDay={setDay} />
      </nav>
      <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
     <ul>{AppointmentList}</ul>
      </section>
    </main>
  );
}
