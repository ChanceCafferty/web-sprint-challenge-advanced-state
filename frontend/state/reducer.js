// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { INPUT_CHANGE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  const { type } = action;

  switch(type) {
    case MOVE_CLOCKWISE: {
      return state < 5 ? state + 1 : 0 
    }

    case MOVE_COUNTERCLOCKWISE: {
      return state > 0 ? state - 1 : 5
    }

    default: return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  const { type, payload } = action;

  switch(type) {
    case SET_QUIZ_INTO_STATE: return payload;

    default: return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  const { type, payload } = action;
  
  switch(type) {
    case SET_SELECTED_ANSWER: return payload;

    default: return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  const { type, payload } = action;

  switch (type) {
    case (SET_INFO_MESSAGE): return payload;

    default: return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  const { type, payload } = action;

  switch (type) {
    case INPUT_CHANGE:
      return {
        ...state,
          [payload.id]: payload.value
      }

    case RESET_FORM:
      return initialFormState;

    default: return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
