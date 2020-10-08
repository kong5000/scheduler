import { useState, useEffect } from 'react'
import axios from 'axios'
import { func } from 'prop-types';




export default function () {
  const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);


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

    let interviewExists

    if (state.appointments[id]) {
      interviewExists = state.appointments[id].interview
    } else {
      interviewExists = false;
    }

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

  function websocketUpdateInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({ ...state, appointments })
  }

  function websocketCancelInterview(id) {
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


      setState({ ...state, appointments, days })
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

  function updateStateFromServer(){
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }

  webSocket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);
    const message = JSON.parse(event.data)
    const type = message.type;
    if (type === "SET_INTERVIEW") {
      if(message.interview === null){
        websocketCancelInterview(message.id)
      }else{
        websocketUpdateInterview(message.id, message.interview)
      }
    }
    updateStateFromServer();
  };


  useEffect(() => {
    updateStateFromServer();
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}