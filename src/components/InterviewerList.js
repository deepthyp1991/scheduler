import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"

import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(value => {
    return (
      <InterviewerListItem
      key = {value.id}
      avatar = {value.avatar}
      name = {value.name}
      selected = {value.id === props.value}
      setInterviewer={(event) => props.onChange(value.id)}				
      />
    )
  })

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}