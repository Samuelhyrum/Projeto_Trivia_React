import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
      </div>
    );
  }
}

export default connect()(Ranking);
