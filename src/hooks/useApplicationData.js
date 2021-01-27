import { useState, useEffect } from "react";

import axios from "axios";


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  // Function to update the days with the right number of spots remaining
  const updateDays = (id, add) => {

    const days = state.days.map(day => {
      const newDay  = {...day};
     
      if (newDay.appointments.includes(id)) {
        add ? newDay.spots++ : newDay.spots--;
      }
      return newDay;
    });
  
    return days;
  };

  // Function to book a new interview or update an existing one
  function bookInterview(id, interview, edit ) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`,{'interview':interview}).then(() => edit ? setState({...state,appointments}) : setState({...state,appointments, days:updateDays(id, false)}) 
    )
  };

  // Function to cancel an interview
  function cancelInterview (id) {

    const nullAppointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: nullAppointment
    };
    
    return axios.delete(`/api/appointments/${id}`).then(() => setState({...state,appointments, days:updateDays(id, true)}));

  };

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
  };
  
};