import React from 'react';
import Head from '../components/head';
import {Icon} from '../../../src/react/iconography';
import '../../stylesheets/index.scss';

const IndexPage = () => (
  <>
    <Head title="Home" />

    <div className="styleguide-index">
      <div className="styleguide-index-box">
        <Icon src="pivotal_ui_inverted"/>
        <h1>Pivotal UI</h1>
      </div>
    </div>
  </>
);

export default IndexPage;
