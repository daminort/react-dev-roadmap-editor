import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import diagramActions from '../../redux/diagram/actions';
import { selectPageData } from '../../redux/app/selectors';
import { PAGE } from '../../constants/editor';

import PageSVG from '../PageSVG';
import { Wrapper } from './Layout.style';

const Layout = ({ width, height, diagramRestore }) => {

  const style = {
    width,
    height,
  };

  useEffect(() => {
    diagramRestore();
  }, []);

  return (
    <Wrapper style={style}>
      <PageSVG width={width} height={height} />
    </Wrapper>
  );
};

Layout.propTypes = {
  width          : PropTypes.number,
  height         : PropTypes.number,
  diagramRestore : PropTypes.func.isRequired,
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

const mapActions = {
  diagramRestore : diagramActions.diagramRestore,
};

const Connected = connect(mapState, mapActions)(Layout);
Connected.defaultProps = Layout.defaultProps;

export default Connected;
