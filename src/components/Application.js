
import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "./Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Mary Panterson",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png" ,
      }
    }
  },
  {
    id: 4,
    time: "11am",
  },
  {
    id: 5,
    time: "2pm",
    interview: {
      student: "Emily Clair",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 6,
    time: "4pm",
  }
  
];
export default function Application(props) {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  // you may put the line below, but will have to remove/comment hardcoded appointments variable
  appointments: {}
});

const setDay = day => setState(prev => ({ ...prev, day }));
const setDays = (days) => setState(prev => ({ ...prev, days }));


  useEffect(() => {
    const url =  "http://localhost:8001/api/days";
    axios.get(url).then(response => {
      setDays([...response.data])
    })
  }, [])

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
        {appointments.map(appointment => 
      <Appointment key={appointment.id} {...appointment} />
      )}
      </section>
    </main>
  );
}
