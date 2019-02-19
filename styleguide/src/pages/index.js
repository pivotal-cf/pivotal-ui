import React from 'react';
import {navigate, Link} from 'gatsby';
import Head from '../components/head';
import {BrandButton} from '../../../src/react/buttons';
import '../../stylesheets/index.scss';

const HomePage = () => (
  <>
    <Head title="Home" />

    <div className="sg-home">
      <h1 className="sg-home__title">
        Pivotal <span className="em-high">UI</span>
      </h1>
      <div>
        <BrandButton
          large
          href="/about/getting-started"
          className="mbxxl"
          onClick={evt => {
            evt.preventDefault();
            navigate('/about/getting-started');
          }}
        >
          Get started
        </BrandButton>
      </div>
      <div className="sg-home__links">
        <Link to="/about/faq">FAQ</Link>
        <a href="https://github.com/pivotal-cf/pivotal-ui">GitHub</a>
        <a href="https://www.npmjs.com/package/pivotal-ui">npm</a>
      </div>
    </div>
  </>
);

export default HomePage;
