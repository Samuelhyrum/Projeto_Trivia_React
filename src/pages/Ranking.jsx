import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

export default connect()(Ranking);
