import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'pivotal-ui/react/iconography';
import {DefaultButton} from 'pivotal-ui/react/buttons';
import {Checkbox} from 'pivotal-ui/react/checkbox';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';

const Toolbar = ({title, showReact, showHtml, toggleReact, toggleHtml, isReact, noHtml}) => {
  return (
    <Grid className="toolbar">
      <FlexCol>
        <h4>{title}</h4>
      </FlexCol>
      {isReact && (
        <FlexCol fixed>
          <DefaultButton {...{
            className: 'phs',
            small: true,
            flat: true,
            icon: <Icon src="react"/>,
            onClick: toggleReact
          }}>
            {showReact ? 'hide' : 'show'} React
          </DefaultButton>
        </FlexCol>
      )}
      {!noHtml && (
        <FlexCol fixed contentAlignment="middle">
          <DefaultButton {...{
            className: 'phs',
            small: true,
            flat: true,
            icon: <Icon src="html5"/>,
            onClick: toggleHtml
          }}>
            {showHtml ? 'hide' : 'show'} HTML
          </DefaultButton>
        </FlexCol>
      )}
    </Grid>
  );
};

Toolbar.propTypes = {
  title: PropTypes.node,
  toggleReact: PropTypes.func,
  toggleHtml: PropTypes.func,
  isReact: PropTypes.bool,
  noHtml: PropTypes.bool
};

export default Toolbar;