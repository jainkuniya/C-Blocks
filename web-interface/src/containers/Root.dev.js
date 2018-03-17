import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { Route } from 'react-router-dom';
import App from './App';
import Government from './Government';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Route path="/gov/" component={Government} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
