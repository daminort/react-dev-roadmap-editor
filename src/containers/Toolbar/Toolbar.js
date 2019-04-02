import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ToolbarRow from '../../components/ToolbarRow';
import { selectActiveItemID } from '../../redux/app/selectors';

import SectionCreate from './SectionCreate';
import { Wrapper } from './Toolbar.style';

class Toolbar extends PureComponent {

  static propTypes = {
    //activeItemID   : PropTypes.string.isRequired,
    //isItemSelected : PropTypes.bool.isRequired,
  }

  render() {

    return (
      <Wrapper>
        <ToolbarRow>
          <SectionCreate />
        </ToolbarRow>
      </Wrapper>
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
