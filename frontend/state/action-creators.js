import axios from "axios";
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types";

const API_BASE_URL = "http://localhost:9000/api/quiz";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(payload) {
  return { type: SET_SELECTED_ANSWER, payload };
}

export function setMessage(payload) {
  return { type: SET_INFO_MESSAGE, payload };
}

export function setQuiz(payload) {
  return { type: SET_QUIZ_INTO_STATE, payload };
}

export function inputChange(payload) {
  return { type: INPUT_CHANGE, payload };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    dispatch(setQuiz(null));
    try {
      const response = await axios.get(API_BASE_URL + "/next");
      // On successful GET:
      // - Dispatch an action to send the obtained quiz to its state
      dispatch(setQuiz(response.data));
    } catch (err) {
      console.error(err);
      dispatch(setMessage(`Something went wrong: ${err.message}`));
    }

  }
}

export function postAnswer() {
  return async function (dispatch, getState) {
    const state = getState();

    const payload = { quiz_id: state.quiz.quiz_id, answer_id: state.selectedAnswer };
    try {
      // On successful POST:
      // - Dispatch an action to reset the selected answer state
      // - Dispatch an action to set the server message to state
      // - Dispatch the fetching of the next quiz
      const response = await axios.post(API_BASE_URL + "/answer", payload);
      dispatch(setMessage(response.data.message));
      dispatch(selectAnswer(null));
      dispatch(fetchQuiz());
    } catch (err) {
      console.error(err);
      dispatch(setMessage(`Something went wrong: ${err.message}`));
    }

  }
}
export function postQuiz() {
  return async function (dispatch, getState) {
    const { newQuestion, newTrueAnswer, newFalseAnswer } = getState().form;

    const data = {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer
    };

    try {
      // On successful POST:
      // - Dispatch the correct message to the the appropriate state
      // - Dispatch the resetting of the form
      const response = await axios.post(API_BASE_URL + "/new", data);
      const successMsg = `Congrats: "${response.data.question}" is a great question!`
      dispatch(setMessage(successMsg));
      dispatch(resetForm());
    } catch (err) {
      console.error(err);
      dispatch(setMessage(`Something went wrong: ${err.message}`));
    }

  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
