import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <h4
          data-testid="header-player-name"
        >
          { name }
        </h4>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  ...player,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
