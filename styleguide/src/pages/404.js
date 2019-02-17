import React, {Fragment} from 'react';
import Head from '../components/head';

const NotFoundPage = () => (
  <Fragment>
    <Head title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Fragment>
);

export default NotFoundPage;
