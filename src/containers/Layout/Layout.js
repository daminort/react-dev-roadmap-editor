import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectDiagramIDs } from '../../redux/diagram/selectors';
import Box from '../Box';

import { Wrapper } from './Layout.style';

const Layout = ({ diagramIDs }) => {
  const items = diagramIDs.map(id => {
    return (
      <Box key={id} id={id} />
    );
  });

  return (
    <Wrapper>
      {items}
    </Wrapper>
  );
};

Layout.propTypes = {
  diagramIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapState = (state) => {
  return {
    diagramIDs: selectDiagramIDs(state),
  };
};

export default connect(mapState)(Layout);
