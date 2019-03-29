import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../redux/store';
import Layout from '../Layout';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
