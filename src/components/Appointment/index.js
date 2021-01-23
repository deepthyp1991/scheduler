import React from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Confirm from "./Confirm"
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode"

import "./styles.scss"

export default function Appointment(props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const EDIT = "EDIT"

const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING)
  props.bookInterview(props.id,interview)
  .then(() => transition(SHOW))
}

function deleteApp() {
  transition(DELETING);
  props.cancelInterview(props.id,null)
  .then(() => transition(EMPTY));
};
  

  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers = {props.interviewers}
        onSave={save} 
        onCancel={() => back(EMPTY)} 
        setInterviewer={props.setInterviewer}
      />
      )}
       {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === CONFIRM && (
        <Confirm 
        message = "Are you sure to delete the appointment?"
        onCancel = {() => back(SHOW)}
        onConfirm = {deleteApp}
        />
      )}
       {mode === DELETING && (
        <Status message="DELETING" />
      )}
      {mode === EDIT && (
        <Form   
        name = {props.interview.student}
        interviewers={props.interviewers}
        interviewer = {props.interview.interviewer.id}
        onSave={save} 
        onCancel={() => back(SHOW)} 
      />
      )}
      
    </article>
  )
}