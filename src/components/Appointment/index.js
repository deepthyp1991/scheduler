import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE="CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // Function to sqave or edit an appointment and show it
  function save(name, interviewer) {
    
    let edit = (mode === EDIT);

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING,true);

    props
    .bookInterview(props.id, interview, edit)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }; 

  // Function to delete an appointment and show the empty mode
  function deleteApp() {

    transition(DELETING,true);
    
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
   
    <article className="appointment" data-testid="appointment">
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
        onCancel={() => back()} 
        setInterviewer={props.setInterviewer}
        />
      )}

      {mode === SAVING && (
        <Status message="Saving" />
      )}

      {mode === CONFIRM && (
        <Confirm 
        message = "Are you sure you would like to delete?"
        onCancel = {() => back()}
        onConfirm = {() => deleteApp()}
        />
      )}

      {mode === DELETING && (
        <Status message="Deleting" />
      )}

      {mode === EDIT && (
        <Form   
        name = {props.interview.student}
        interviewers={props.interviewers}
        interviewer = {props.interview.interviewer.id}
        onSave={save} 
        onCancel={() => back()} 
        />
      )}

      {mode === ERROR_DELETE && (
        <Error   
        message = "Could not delete appointment."
        onClose={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error   
        message = "Could not save appointment."
        onClose={() => back()} 
        />
      )}
      
    </article>
  )
};
