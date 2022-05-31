import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'


export function Quiz(props) {

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    if (!props.quiz) {
      props.fetchQuiz();
      setSelectedAnswerIndex(null);
    }
  }, [props.quiz]);

  const handleSelectAnswer = (answerIndex) => {
    setSelectedAnswerIndex(answerIndex);
    props.selectAnswer(props.quiz.answers[answerIndex].answer_id);
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div 
                className={`answer ${selectedAnswerIndex === 0 ? 'selected' : ''}`}
              >
                {props.quiz.answers[0].text}
                <button onClick={() => handleSelectAnswer(0)} >
                  {selectedAnswerIndex === 0 ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div 
                className={`answer ${selectedAnswerIndex === 1 ? 'selected' : ''}`}
              >
                {props.quiz.answers[1].text}
                <button onClick={() => handleSelectAnswer(1)} >
                  {selectedAnswerIndex === 1 ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button 
              id="submitAnswerBtn"
              onClick={() => props.postAnswer()}
              disabled={selectedAnswerIndex === null}
            >
              Submit answer
            </button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect((st) => st, actionCreators)(Quiz);