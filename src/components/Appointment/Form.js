import React, {useState} from 'react';
import InterviewerList from '../InterviewerList'
import Button from '../Button'
const Form = (props) => {
  const {interviewers, onSave, onCancel} = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    onCancel()
  }

  const validate = () => {
    if(name === ""){
      setError("Student name cannot be blank");
      return;
    }else{
      setError("");
    }
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={name}
            onChange={event => setName(event.target.value)}
          /*
            This must be a controlled component
          */
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} interviewer={interviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;