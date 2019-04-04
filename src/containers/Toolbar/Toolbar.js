import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ToolbarRow from '../../components/ToolbarRow';
import { selectActiveShapeID } from '../../redux/app/selectors';

import Elements from './Elements';
import Colors from './Colors';
import Alignment from './Alignment';
import { Wrapper } from './Toolbar.style';

class Toolbar extends PureComponent {

  static propTypes = {
    //activeShapeID   : PropTypes.string.isRequired,
    //isShapeSelected : PropTypes.bool.isRequired,
  }

  render() {

    return (
      <Wrapper>
        <ToolbarRow title="Elements">
          <Elements />
        </ToolbarRow>
        <ToolbarRow title="Colors">
          <Colors />
        </ToolbarRow>
        <ToolbarRow title="Alignment">
          <Alignment />
        </ToolbarRow>
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
