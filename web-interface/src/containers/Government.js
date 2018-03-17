/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Explore from '../components/Explore';
import { resetErrorMessage } from '../actions';

class Government extends Component {
  static propTypes = {};

  handleChange = () => {};

  render() {
    const { children, inputValue } = this.props;
    return (
      <div>
        <Explore value={inputValue} onChange={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1),
});

export default withRouter(
  connect(mapStateToProps, {
    resetErrorMessage,
  })(Government),
);
