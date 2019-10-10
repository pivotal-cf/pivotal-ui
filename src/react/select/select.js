import React from 'react';
import {Icon} from '../iconography';

export class Select extends React.PureComponent {
  componentDidMount() {
    require('../../css/select');
  }

  render() {
    return (
      <span className="pui-select">
        <select {...this.props}/>
        <Icon src="chevron_down"/>
      </span>
    );
  }
}