import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  
  });

  const setDay = day => setState(prev => ({ ...prev, day }))

function bookInterview(id, interview) {

  let days = state.days;
  if(!state.appointments[id].interview) {
    days = state.days.map(day => {
      const dayCopy = {...day}
      if(dayCopy.appointments.includes(id)) {
        dayCopy.spots --
        return dayCopy
      } else {
        return dayCopy
      }
    })
  }
   
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/${id}`,{'interview':interview}).then(() => setState({...state,appointments, days})
  )
}
 function cancelInterview (id) {
  let days = state.days;
    days = state.days.map(day => {
      const dayCopy = {...day}
      if(dayCopy.appointments.includes(id)) {
        dayCopy.spots ++
        return dayCopy
      } else {
        return dayCopy
      }
    })
  const nullAppointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: nullAppointment
  };
  
  return axios.delete(`/api/appointments/${id}`).then(() => setState({...state,appointments,days}))

 }

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

return {
  state,
  setDay,
  bookInterview,
  cancelInterview
  } 
  
}