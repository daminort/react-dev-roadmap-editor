import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { InputText, InputTextarea, Button } from '../../../components/Prime';

import diagramActions from '../../../redux/diagram/actions';
import { selectActiveShapeID } from '../../../redux/app/selectors';
import { selectShapeContent } from '../../../redux/diagram/selectors';

import { Wrapper } from './Content.style';

const Content = ({ activeShapeID, shapeContent, shapeContentSet, diagramStore }) => {

  const { title, url, info } = shapeContent;

  const [localTitle, setTitle] = useState('');
  const [localURL, setURL]     = useState('');
  const [localInfo, setInfo]   = useState('');

  useEffect(() => {
    setTitle(title);
    setURL(url);
    setInfo(info);
  }, [title, url, info]);

  const applyContent = () => {
    const resShapeContent = {
      title : localTitle,
      url   : localURL,
      info  : localInfo,
    };

    shapeContentSet(activeShapeID, resShapeContent);
    diagramStore();
  };

  const onPressEnter = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    applyContent();
  };

  const onClickApply = () => {
    applyContent();
  };

  return (
    <Wrapper>
      <InputText
        name="title"
        placeholder="Title"
        value={localTitle}
        onChange={({ target }) => setTitle(target.value)}
        onKeyPress={onPressEnter}
      />
      <InputText
        name="url"
        placeholder="URL"
        value={localURL}
        onChange={({ target }) => setURL(target.value)}
        onKeyPress={onPressEnter}
      />
      <InputTextarea
        autoResize
        rows={3}
        cols={30}
        value={localInfo}
        onChange={({ target }) => setInfo(target.value)}
      />
      <Button
        label="Apply"
        onClick={onClickApply}
      />
    </Wrapper>
  );
};

Content.propTypes = {
  activeShapeID: PropTypes.string.isRequired,
  shapeContent: PropTypes.shape({
    title : PropTypes.string,
    url   : PropTypes.string,
    info  : PropTypes.string,
  }).isRequired,

  shapeContentSet : PropTypes.func.isRequired,
  diagramStore    : PropTypes.func.isRequired,
};

const mapState = (state) => {
  const activeShapeID = selectActiveShapeID(state);

  return {
    activeShapeID,
    shapeContent: selectShapeContent(activeShapeID)(state),
  };
};

const mapActions = {
  shapeContentSet : diagramActions.shapeContentSet,
  diagramStore    : diagramActions.diagramStore,
};

export default connect(mapState, mapActions)(Content);
