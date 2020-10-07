export function getAppointmentsForDay(state, day) {
  const appointments = []
  for(let dayOfWeek of state.days){
    if(day === dayOfWeek.name){
      for(const appointmentId of dayOfWeek.appointments){
        appointments.push(state.appointments[appointmentId])
      }
    }
  }
  return appointments
  //... returns an array of appointments for that day
}

export function getInterview(state, interview){
  if(!interview){
    return null
  }
  return{
    student: interview.student,
    interviewer:{
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar
    }
  }
}

export function getInterviewersForDay(state, selectedDay) {
  const interviewers = []
  const appointments = []
  for(let dayOfWeek of state.days){
    if(selectedDay === dayOfWeek.name){
      for(const appointmentId of dayOfWeek.appointments){
        appointments.push(state.appointments[appointmentId])
      }
    }
  }
  if(state.days[0] && state.days[0].interviewers){
    for(const day of state.days){
      if(day.name === selectedDay){
        for(const interviewer of day.interviewers){
          interviewers.push(state.interviewers[interviewer])
        }
      }
    }
  }
  else{
    for(const appointment of appointments){
      let alreadyExists = false;
      if(appointment.interview){
        for(const interviewer of interviewers){
          if(interviewer.id === appointment.interview.interviewer){
            alreadyExists = true;
          }
        }
        if(!alreadyExists){
          interviewers.push(state.interviewers[appointment.interview.interviewer])
        }
      }
    }
  }


  return interviewers
  //... returns an array of appointments for that day
}
