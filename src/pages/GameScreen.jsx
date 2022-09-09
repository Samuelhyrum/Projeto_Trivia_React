import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencyMiddleware } from '../redux/actions';
import { TOKEN } from '../Helpers/storage';
import './GameScreen.css';

// ok Falta fazer logout se o token estiver invalido
// Falta colocar as questoes em ordem aleatoria
// Falta fazer aparecer uma pergunta de cada vez

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;
const three = 3;
const combinations = [
  [0, 2, three, 1],
  [three, 1, 2, 0],
  [three, 0, 1, 2],
  [1, 2, 0, three],
  [0, 2, 1, three],
  [1, three, 0, 2],
  [three, 2, 0, 1],
  [1, 2, three, 0],
];

class GameScreen extends Component {
  state = {
    seconds: 30,
    currentQuestion: 0,
    incorrectClass: '',
    correctClass: '',
    combination: [],
    isButtonDisabled: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyMiddleware());
    const combination = combinations[Math.round(Math.random()
      * (combinations.length - 1))];
    this.setState({ combination });
    this.timer = setInterval(() => {
      this.setState(({ seconds }) => ({ seconds: seconds - 1 }), () => {
        const { seconds } = this.state;
        if (seconds === TIME_LIMIT) {
          clearInterval(this.timer);
          this.setState({ isButtonDisabled: true });
        }
      });
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { response_code: responseCode, history } = this.props;
    if (responseCode === three) {
      localStorage.removeItem(TOKEN);
      history.push('/');
    }
  }

  checkIsCorrect = () => {
    this.setState({
      incorrectClass: 'incorrectAnswer',
      correctClass: 'correctAnswer',
    });
  };

  render() {
    const { results } = this.props;
    const {
      currentQuestion,
      incorrectClass,
      correctClass,
      combination,
      seconds,
      isButtonDisabled,
    } = this.state;
    const {
      category,
      type,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = results[currentQuestion] || {};

    const createIncorrectList = incorrectAnswer && incorrectAnswer.map((item, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        type="button"
        className={ `button ${incorrectClass}` }
        onClick={ this.checkIsCorrect }
        disabled={ isButtonDisabled }
      >
        { item }
      </button>
    ));
    const questions = incorrectAnswer && [
      <button
        data-testid="correct-answer"
        type="button"
        key="button"
        className={ `button ${correctClass}` }
        onClick={ this.checkIsCorrect }
        disabled={ isButtonDisabled }
      >
        { correctAnswer }
      </button>,
      ...createIncorrectList,
    ];
    const [indexOne, indexTwo, indexThree, indexFour] = combination;
    return (
      <section className="container">
        <Header />
        <section>
          <h3>
            timer
            {' '}
            { seconds }
          </h3>
          <h2 data-testid="question-category">{category}</h2>
          <h3 data-testid="question-text">{question}</h3>
          { type === 'multiple' ? (
            <div className="buttons-container" data-testid="answer-options">
              {questions[indexOne]}
              {questions[indexTwo]}
              {questions[indexThree]}
              {questions[indexFour]}
            </div>
          ) : incorrectAnswer && (
            <div className="buttons-container" data-testid="answer-options">
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
