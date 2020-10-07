import React from "react"
import "components/InterviewerListItem.scss";
import classNames from 'classnames'

export default function (props) {
  const { name, avatar, selected, setInterviewer } = props;
  const componentClass = classNames("interviewers__item", { "interviewers__item--selected": selected })
  return (
    <li  className={componentClass} data-testid="interviewer">
      <img
        onClick={setInterviewer}
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )
}