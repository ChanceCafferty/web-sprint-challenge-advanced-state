import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  const onChange = (evt) => {
    const { id, value } = evt.target;

    const payload = { id, value };
    props.inputChange(payload);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    props.postQuiz();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
        maxLength={50} 
        onChange={onChange} 
        id="newQuestion" 
        placeholder="Enter question" 
        value={newQuestion}
      />
      <input 
        maxLength={50} 
        onChange={onChange} 
        id="newTrueAnswer" 
        placeholder="Enter true answer" 
        value={newTrueAnswer}
      />
      <input 
        maxLength={50} 
        onChange={onChange} 
        id="newFalseAnswer" 
        placeholder="Enter false answer" 
        value={newFalseAnswer}
      />
      <button 
        id="submitNewQuizBtn"
        disabled={Object.values(props.form).some(val => val.trim().length === 0)}
      >
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, actionCreators)(Form)
