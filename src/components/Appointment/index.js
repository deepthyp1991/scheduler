import React from 'react'
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Confirm from "./Confirm"
import Status from "./Status"
import Error from "./Error"
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
const ERROR_SAVE = "EROOR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING)
  props.bookInterview(props.id,interview)
  .then(() => transition(SHOW))
  .catch(error => transition(ERROR_SAVE, true));
}

function deleteApp() {
  transition(DELETING, true);
  props.cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch((error) => transition(ERROR_DELETE, true))
 

};
  

  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
      props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)}
        />
      )}
      {mode === CREATE &&  <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
      )}
       {mode === SAVING && (
        <Status message="Saving" />
      )}
       {mode === DELETING && (
        <Status message="DELETING" />
      )}
      {mode === CONFIRM && (
        <Confirm 
        message = "Are you sure to delete the appointment?"
        onCancel = {back}
        onConfirm = {deleteApp}
        />
      )}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not Cancel appointment." onClose= {back} />}
     
      
      
     
      
    </article> 
  )
}