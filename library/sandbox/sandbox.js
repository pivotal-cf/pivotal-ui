import React from 'react';
import ReactDom from 'react-dom';
import {DefaultButton} from 'pui-react-buttons';

const MyTestPage = React.createClass({
  render() {
    return (
      <DefaultButton> look at me I'm a dev </DefaultButton>
    )
  }
});

ReactDom.render(<MyTestPage />, document.getElementById('root'));
