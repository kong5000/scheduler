import { useState, useEffect } from 'react'
import axios from 'axios'

export default function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function setDay(day) {
    setState({ ...state, day })
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const days = [
      ...state.days
    ]


    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const interviewExists = state.appointments[id].interview

    if (!interviewExists) {
      for (const day of days) {
        for (const appointment of day.appointments) {
          if (id === appointment) {
            day.spots = day.spots - 1;
          }
        }
      }
    }

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(res => {
      setState({ ...state, appointments, days })
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [
      ...state.days
    ]

    for (const day of days) {
      for (const appointment of day.appointments) {
        if (id === appointment) {
          day.spots = day.spots + 1;
        }
      }
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then(res => {
      setState({ ...state, appointments, days })
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}