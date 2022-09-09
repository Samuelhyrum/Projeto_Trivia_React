import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

const assertionsNumber = 3;
class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <div>
          { assertions < assertionsNumber && (
            <p data-testid="feedback-text">Could be better...</p>
          )}
          { assertions >= assertionsNumber && (
            <p data-testid="feedback-text">Well Done!</p>
          )}
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: propTypes.number,
  assertions: propTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Feedback);
