import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencyMiddleware, updateScore } from '../redux/actions';
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
const difficultyPoints = { hard: 3, medium: 2, easy: 1 };

class GameScreen extends Component {
  state = {
    seconds: 30,
    currentQuestion: 0,
    incorrectClass: '',
    correctClass: '',
    combination: [],
    isButtonDisabled: false,
    buttonNextOpen: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyMiddleware());
    const combination = combinations[Math.round(Math.random()
      * (combinations.length - 1))];
    this.setState({ combination });
    this.timer();
  }

  componentDidUpdate() {
    const { response_code: responseCode, history } = this.props;
    if (responseCode === three) {
      localStorage.removeItem(TOKEN);
      history.push('/');
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onClickCorrect = () => {
    const { results, score, dispatch, assertions } = this.props;
    const { seconds, currentQuestion } = this.state;
    const { difficulty } = results[currentQuestion];
    const minPoints = 10;
    this.showAnswer();
    this.setState({ isButtonDisabled: true });
    const newScore = score + (minPoints + seconds * difficultyPoints[difficulty]);
    dispatch(updateScore({ score: newScore, assertions: assertions + 1 }));
  };

  showAnswer = () => {
    clearInterval(this.timerId);
    this.setState({
      buttonNextOpen: true,
      incorrectClass: 'incorrectAnswer',
      correctClass: 'correctAnswer',
    });
  };

  nextQuestion = () => {
    this.setState(({ currentQuestion }) => ({
      currentQuestion: currentQuestion + 1,
      buttonNextOpen: false,
      incorrectClass: '',
      correctClass: '',
      isButtonDisabled: false,
      seconds: 30,
    }), () => {
      const { currentQuestion } = this.state;
      const lastQuestion = 4;
      if (currentQuestion > lastQuestion) {
        const { history } = this.props;
        history.push('/feedback');
      }
    });
    this.timer();
  };

  timer = () => {
    this.timerId = setInterval(() => {
      this.setState(({ seconds }) => ({ seconds: seconds - 1 }), () => {
        const { seconds } = this.state;
        if (seconds === TIME_LIMIT) {
          clearInterval(this.timerId);
          this.setState({ isButtonDisabled: true, buttonNextOpen: true });
        }
      });
    }, ONE_SECOND);
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
      buttonNextOpen,
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
        onClick={ this.showAnswer }
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
        name="correct-answer"
        className={ `button ${correctClass}` }
        onClick={ this.onClickCorrect }
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
          { buttonNextOpen && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}
        </section>
      </section>
    );
  }
}
const mapStateToProps = ({ gameReducer, player }) => ({
  ...gameReducer,
  score: player.score,
  assertions: player.assertions,
});
GameScreen.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.string,
  ),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
  assertions: PropTypes.number,
  responseCode: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(GameScreen);
