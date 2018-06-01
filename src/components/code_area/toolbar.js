import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'pivotal-ui/react/iconography';
import {Checkbox} from 'pivotal-ui/react/checkbox';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';

const Toolbar = ({title, toggleEditor, toggleHtmlPreview, isReact, noHtml}) => {
  return (
    <Grid className="toolbar">
      <FlexCol>
        <h4>{title}</h4>
      </FlexCol>
      {isReact && (
        <FlexCol fixed contentAlignment="middle">
          <Checkbox labelClassName="em-high"
                    onClick={toggleEditor}
                    className="form-inline">
            <span className="toolbar--label mlm">React</span>
          </Checkbox>
        </FlexCol>
      )}
      {!noHtml && (
        <FlexCol fixed contentAlignment="middle">
          <Checkbox labelClassName="em-high"
                    onClick={toggleHtmlPreview}
                    className="form-inline">
            <span className="toolbar--label mlm">HTML</span>
          </Checkbox>
        </FlexCol>
      )}
    </Grid>
  );
};

Toolbar.propTypes = {
  title: PropTypes.node,
  toggleEditor: PropTypes.func,
  toggleHtmlPreview: PropTypes.func,
  isReact: PropTypes.bool,
  noHtml: PropTypes.bool
};

export default Toolbar;