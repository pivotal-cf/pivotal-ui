import React from 'react';
import Head from '../components/head';
import {Link} from 'gatsby';

const NotFoundPage = () => (
  <>
    <Head title="404: Not found" />

    <header>
      <h1 className="mvxxl pbl em-high border-bottom styleguide-h1">
        404: Page not found
      </h1>
    </header>

    <p>It looks like this page doesn't exist. Sorry about that!</p>

    <p>Do you want to <Link to="/">go back home</Link>?</p>
  </>
);

export default NotFoundPage;
