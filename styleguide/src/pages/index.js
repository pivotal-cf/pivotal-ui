import React, {Fragment} from 'react';
import Head from '../components/head';
import {Icon} from '../../../src/react/iconography';
import '../../stylesheets/index.scss';

const IndexPage = () => (
  <Fragment>
    <Head title="Home" />

    <div className="styleguide-index">
      <div className="styleguide-index-box">
        <Icon src="pivotal_ui_inverted"/>
        <h1>Pivotal UI</h1>
      </div>
    </div>
  </Fragment>
);

export default IndexPage;
