import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputNumber from '../../../components/Prime/InputNumber';

import appActions from '../../../redux/app/actions';
import { selectPageData } from '../../../redux/app/selectors';
import { Wrapper, Label } from './Page.style';

const Page = ({ width, height, pageDataSet /*, pageDataReset*/ }) => {

  const onChangeSize = (value, dataName) => {
    pageDataSet({
      [dataName]: value,
    });
  };

  return (
    <Wrapper>
      <Label>W:</Label>
      <div id="pageWidth">
        <InputNumber
          name="pageWidth"
          value={width}
          max={1600}
          step={10}
          onChange={({ target }) => onChangeSize(target.value, 'width')}
        />
      </div>
      <Label>H:</Label>
      <div id="pageHeight">
        <InputNumber
          name="pageHeight"
          value={height}
          max={3600}
          step={10}
          onChange={({ target }) => onChangeSize(target.value, 'height')}
        />
      </div>
    </Wrapper>
  );
};

Page.propTypes = {
  width         : PropTypes.number.isRequired,
  height        : PropTypes.number.isRequired,
  pageDataSet   : PropTypes.func.isRequired,
  pageDataReset : PropTypes.func.isRequired,
};

const mapState = (state) => {
  const { width, height } = selectPageData(state);

  return {
    width,
    height,
  };
};

const mapActions = {
  pageDataSet   : appActions.pageDataSet,
  pageDataReset : appActions.pageDataReset,
};

export default connect(mapState, mapActions)(Page);
