import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectPageData } from '../../redux/app/selectors';
import { PAGE } from '../../constants/editor';

import PageSVG from '../PageSVG';
import { Wrapper } from './Layout.style';

const Layout = ({ width, height }) => {

  const style = {
    width,
    height,
  };

  return (
    <Wrapper style={style}>
      <PageSVG width={width} height={height} />
    </Wrapper>
  );
};

Layout.propTypes = {
  width  : PropTypes.number,
  height : PropTypes.number,
};

Layout.defaultProps = {
  width  : PAGE.width,
  height : PAGE.height,
};

const mapState = (state) => {
  const { width, height } = selectPageData(state);

  return {
    width,
    height,
  };
};

const Connected = connect(mapState)(Layout);
Connected.defaultProps = Layout.defaultProps;

export default Connected;
