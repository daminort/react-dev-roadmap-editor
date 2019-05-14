import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../redux/store';
import Layout from '../Layout';
import Toolbar from '../Toolbar';
import Hidden from '../Hidden';

import { Wrapper } from './App.style';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper id="app">
          <div className="area">
            <Layout />
          </div>
          <div className="toolbar">
            <Toolbar />
          </div>
          <Hidden />
        </Wrapper>
      </Provider>
    );
  }
}

export default App;
