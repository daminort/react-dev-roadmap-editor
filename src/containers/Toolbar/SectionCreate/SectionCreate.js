import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ToolbarButton from '../../../components/ToolbarButton';
import { NewBox, NewLine, Trash } from '../../../icons';

import { selectActiveItemID } from '../../../redux/app/selectors';

class Toolbar extends PureComponent {

  static propTypes = {
    //activeItemID   : PropTypes.string.isRequired,
    isItemSelected : PropTypes.bool.isRequired,
  }

  render() {
    const { isItemSelected } = this.props;

    return (
      <div className="left-right">
        <div className="left">
          <div className="label">Create:</div>
          <ToolbarButton
            id="newBox"
            title="Add new Box"
          >
            <NewBox />
          </ToolbarButton>
          <ToolbarButton
            id="newCurve"
            title="Add new Line"
          >
            <NewLine />
          </ToolbarButton>
        </div>
        {isItemSelected && (
          <div className="right">
            <ToolbarButton
              id="removeShape"
              title="Remove diagram item"
              className="last red"
            >
              <Trash />
            </ToolbarButton>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  const activeItemID = selectActiveItemID(state);

  return {
    activeItemID,
    isItemSelected: Boolean(activeItemID),
  };
};

export default connect(mapState)(Toolbar);
