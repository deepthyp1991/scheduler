import React from "react";

import "./InterviewerListItem.scss";

import classnames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const {name, selected} = props;

  return (
    <li className={interviewerClass} onClick = {props.setInterviewer} data-testid="interviewer-id">
      <img
        className="interviewers__item-image"
        src= {props.avatar}
        alt= {name}
      />
      {selected ? name : ""}
      
    </li>
  );
};