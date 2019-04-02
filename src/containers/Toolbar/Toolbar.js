import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Wrapper } from './Toolbar.style';

class Toolbar extends PureComponent {

  render() {
    return (
      <Wrapper />
    );
  }
}

export default Toolbar;
