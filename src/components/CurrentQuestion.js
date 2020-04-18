import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'
import './CurrentQuestion.css'
import { Image } from './Image'

export const CurrentQuestion = () => {
  const quizOver = useSelector((state) =>
    state.quiz.quizOver
  );

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const answer = useSelector((state) =>
    state.quiz.answers.find((a) => a.questionId === question.id)
  );

  const dispatch = useDispatch();

  // handle submit function to dispatch
  const handleAnswer = (id, index) => {
    dispatch(quiz.actions.submitAnswer({ questionId: id, answerIndex: index }))
  };

  const handleClick = (event) => {
    dispatch(quiz.actions.goToNextQuestion({}))
  };

  const getButtonClass = (index) => {
    const indexIsAnswerIndex = answer && answer.answerIndex === index
    if (indexIsAnswerIndex && answer.isCorrect) {
      return 'correct-answer'
    }
    if (indexIsAnswerIndex && !answer.isCorrect) {
      return 'wrong-answer'
    }
    return ''
  };

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }
  if (quizOver) {
    return <></>
  }
  return (
    <div className="question-container">
      <Image />
      <h1>{question.questionText}</h1>
      <div className="button-container">
        {question.options.map((option, index) => {
          return (
            <button
              type="button"
              className={`question-button ${getButtonClass(index)}`}
              onClick={() => handleAnswer(question.id, index)}
              disabled={answer}
            >
              {option}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="next-button"
        disabled={!answer}
        onClick={handleClick}>Next &gt;
      </button>
      <p className="completed">Question {question.id} of 5</p>
    </div>
  )
}