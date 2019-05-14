import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { autoSaveInterval } from '../../config';

import diagramActions from '../../redux/diagram/actions';
import { selectPageData } from '../../redux/app/selectors';
import { PAGE } from '../../constants/editor';

import PageSVG from '../PageSVG';
import { Wrapper } from './Layout.style';

const Layout = ({ width, height, diagramStore, diagramRestore }) => {

  const style = {
    width,
    height,
  };

  const ref = useRef({ interval: null });

  useEffect(() => {
    diagramRestore();
    ref.current.interval = setInterval(() => {
      diagramStore();
    }, autoSaveInterval);

    return () => {
      clearInterval(ref.current.interval);
    };
  }, []);

  return (
    <Wrapper id="page-holder" style={style}>
      <PageSVG width={width} height={height} />
    </Wrapper>
  );
};

Layout.propTypes = {
  width          : PropTypes.number,
  height         : PropTypes.number,
  diagramStore   : PropTypes.func.isRequired,
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
  diagramStore   : diagramActions.diagramStore,
  diagramRestore : diagramActions.diagramRestore,
};

const Connected = connect(mapState, mapActions)(Layout);
Connected.defaultProps = Layout.defaultProps;

export default Connected;
