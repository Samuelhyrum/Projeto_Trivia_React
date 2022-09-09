import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencyMiddleware } from '../redux/actions';
import { TOKEN } from '../Helpers/storage';

// ok Falta fazer logout se o token estiver invalido
// Falta colocar as questoes em ordem aleatoria
// Falta fazer aparecer uma pergunta de cada vez

const three = 3;
const combinations = [[0, 2, three, 1],
  [three, 1, 2, 0], [three, 0, 1, 2], [1, 2, 0, three],
  [0, 2, 1, three], [1, three, 0, 2], [three, 2, 0, 1], [1, 2, three, 0]];
class GameScreen extends Component {
  state = {
    currentQuestion: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyMiddleware());
  }

  componentDidUpdate() {
    const { response_code: responseCode, history } = this.props;
    if (responseCode === three) {
      localStorage.removeItem(TOKEN);
      history.push('/');
    }
  }

  render() {
    const { results } = this.props;
    const { currentQuestion } = this.state;
    const {
      category,
      type,
      question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswer,
    } = results[currentQuestion] || {};
    const createIncorrectList = incorrectAnswer && incorrectAnswer.map((item, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        type="button"
      >
        { item }
      </button>
    ));
    const questions = incorrectAnswer && [
      <button
        data-testid="correct-answer"
        type="button"
        key="button"
      >
        { correctAnswer }
      </button>,
      ...createIncorrectList,
    ];
    const combination = combinations[Math.round(Math.random()
      * (combinations.length - 1))];
    const [indexOne, indexTwo, indexThree, indexFour] = combination;
    return (
      <section>
        <Header />
        <section>
          <h2 data-testid="question-category">{category}</h2>
          <h3 data-testid="question-text">{question}</h3>
          { type === 'multiple' ? (
            <div data-testid="answer-options">
              {questions[indexOne]}
              {questions[indexTwo]}
              {questions[indexThree]}
              {questions[indexFour]}
            </div>
          ) : incorrectAnswer && (
            <div data-testid="answer-options">
              {
                (Math.round(Math.random() * 2) === 2)
                  ? (
                    [questions[0], questions[1]]
                  )
                  : (
                    [questions[1], questions[0]]
                  )
              }
            </div>
          )}
        </section>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.gameReducer,
});
GameScreen.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.string,
  ),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  responseCode: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(GameScreen);
