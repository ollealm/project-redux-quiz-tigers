import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { quiz } from '../reducers/quiz'
import { Image } from './Image'
import './summary.css'

export const Summary = () => {
  const dispatch = useDispatch();
  const quizOver = useSelector((state) =>
    state.quiz.quizOver
  );

  const numCorrect = useSelector((state) =>
    state.quiz.answers.filter((a) => a.isCorrect === true).length
  );

  const restart = () => {
    dispatch(quiz.actions.restart())
  };

  const getResult = (score) => {
    if (score === 5) return 'You are a true Potterhead!'
    if (score < 2) return 'Maybe you should watch the movies to refresh your knowledge?'
    return 'On your way to Hogwarts!'
  }

  if (!quizOver) {
    return <></>
  }
  return (
    <section className="summary">
      <Image />
      <div className="summary-container">
        <h1>Summary</h1>
        <p>You scored {numCorrect} out of 5!</p>
        <p>{getResult(numCorrect)}</p>
      </div>
      <button type="button" onClick={restart}>Try again</button>
    </section>
  )
}