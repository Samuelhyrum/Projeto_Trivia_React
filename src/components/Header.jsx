import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name } = this.props;
    const emailHash = md5(email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt=""
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
          {0}
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.email,
  name: state.loginReducer.name,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
