import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencyMiddleware } from '../redux/actions';

// Falta fazer logout se o token estiver invalido
// Falta colocar as questoes em ordem aleatoria
// Falta fazer aparecer uma pergunta de cada vez

class GameScreen extends Component {
  // state = {
  //   currentQuestion: 0,
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyMiddleware());
  }

  render() {
    const { results } = this.props;
    const {
      category,
      question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswer,
    } = results[0];

    const createIncorrectList = incorrectAnswer && incorrectAnswer.map((item, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        type="button"
      >
        { item }
      </button>
    ));

    return (
      <section>
        <Header />
        <section>
          <h2 data-testid="question-category">{category}</h2>
          <h3 data-testid="question-text">{question}</h3>
          <div>
            {incorrectAnswer && createIncorrectList}
            <button
              data-testid="correct-answer"
              type="button"
            >
              { correctAnswer }
            </button>
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.gameReducer.results,
});

GameScreen.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.string,
  ),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(GameScreen);
