import React, { useEffect } from 'react';
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  useEffect(() => {
    console.log(props.interview)
    if(mode === EMPTY && props.interview){
      transition(SHOW)
    }
    if (mode === SHOW && props.interview === null) {
      transition(EMPTY);
     }
    }, [props.interview, transition, mode]);



  function save(name, interviewer) {
    if (!interviewer) {
      return;
    }
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(res => {
      transition(SHOW)
    }).catch(e => {
      transition(ERROR_SAVE, true)
    })
  }

  function cancelInterview() {
    transition(DELETING)
    props.cancelInterview(props.id).then(res => {
      transition(EMPTY)
    }).catch(e => {
      transition(ERROR_DELETE, true)
    })
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && 
        <Show
          student={props.interview.student}
          interviewer={props.interviewers.find(interviewer => interviewer.id === props.interview.interviewer)}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      }
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm
        onConfirm={cancelInterview}
        onCancel={back}
        message="Confirm Deletion" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && <Form
        onSave={save}
        onCancel={() => back()}
        interviewers={props.interviewers}
        name={props.interview.student}
        interviewer={props.interview.interviewer}
      />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back}/>}
    </article>
  );
};

export default Appointment;