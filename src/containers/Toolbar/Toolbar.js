import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarRow from '../../components/ToolbarRow';
import { selectActiveShapeID } from '../../redux/app/selectors';

import Elements from './Elements';
import Colors from './Colors';
import Alignment from './Alignment';
import Content from './Content';
import { Wrapper } from './Toolbar.style';

class Toolbar extends PureComponent {

  static propTypes = {
    isShapeSelected : PropTypes.bool.isRequired,
  }

  render() {
    const { isShapeSelected } = this.props;

    const showColors    = (isShapeSelected);
    const showAlignment = (isShapeSelected);
    const showContent   = (isShapeSelected);

    return (
      <Wrapper>
        <ToolbarRow title="Elements"><Elements /></ToolbarRow>
        {showColors && (<ToolbarRow title="Colors"><Colors /></ToolbarRow>)}
        {showAlignment && (<ToolbarRow title="Alignment"><Alignment /></ToolbarRow>)}
        {showContent && (<ToolbarRow title="Content" noBorder><Content /></ToolbarRow>)}
      </Wrapper>
    );
  }
}

const mapState = (state) => {
  const activeShapeID = selectActiveShapeID(state);

  return {
    activeShapeID,
    isShapeSelected: Boolean(activeShapeID),
  };
};

export default connect(mapState)(Toolbar);
