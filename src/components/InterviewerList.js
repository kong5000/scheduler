import React from "react"
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types'

const InterviewerList = (props) => {
  const { interviewers, value, onChange } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(interviewer =>
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer = {() => onChange(interviewer.id)}
          />
        )}
      </ul>
    </section>
  )
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList