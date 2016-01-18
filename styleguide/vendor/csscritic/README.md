CSS Critic
==========

<a href="https://www.npmjs.org/package/csscritic">
    <img src="https://badge.fury.io/js/csscritic.svg"
        align="right" alt="NPM version" height="18">
</a>
A lightweight tool for regression testing of Cascading Style Sheets.

What?
-----
One picture might say more than 1000 words:

<img src="http://cburgmer.github.io/csscritic-examples/nicereporter_in_action.png" alt="CSS Critic testing the TodoMVC app">

For background information [watch the screencast](http://youtu.be/AqQ2bNPtF60) or checkout [some examples](https://github.com/cburgmer/csscritic-examples) for a hands-on experience with an application that has its UI tested. Fast forward to [see it in action testing the TodoMVC application](http://cburgmer.github.io/csscritic-examples/angularjs/).

Why?
----
Your web stack should be fully testable. CSS Critic closes the gap in front end testing and makes HTML & CSS testable - no more broken UI. For example, make it supervise changes to your project's responsive styleguide so you know things are looking good.

Install
-------

    $ npm install csscritic

See `node_modules/csscritic/example/RegressionRunner.html` for an example on how to take it from there.

How it works
------------

CSS Critic checks your current layout constantly against a reference image you have provided in the past. If your layout breaks (or simply changes - CSS Critic can't tell) your tests fail.

*Get started:*

1. Create a `RegressionRunner.html` similar to the one under [`example/`](example/) and put it with your code that is to be tested.

2. Register your page under test via:

    ```js
    csscritic.add({
        url: 'SOME_URL',     // link to the test case HTML document
        // Optionally:
        desc: 'some text',   // a description of the test case
        width: number,       // the viewport width in pixel
        height: number,      // the viewport height in pixel
        hover: 'A.SELECTOR', // element receiving an :hover effect
        active: 'A.SELECTOR' // element receiving an :active effect
    });
    ```

3. Open the RegressionRunner.html in Firefox for the first time and save the resulting image as future reference.

4. Re-run the RegressionRunner.html and see your test passing. Congratulations.

*What do I do if my test fails?*

1. Have a look at the diff image and visually inspect what has changed.

2. If the change is an unwanted one fix your CSS,

3. If deliberate accept the change (generating a new reference image).

Developing CSS Critic
---------------------
For tests install Node.js and run

    $ ./go

[![Build Status](https://travis-ci.org/cburgmer/csscritic.svg?branch=master)](https://travis-ci.org/cburgmer/csscritic)

Limitations
-----------

- Currently works in Firefox and Chrome only.
- [Same-origin restrictions](https://developer.mozilla.org/en-US/docs/Same_origin_policy_for_JavaScript) apply when sourcing files. All files referenced need to be inside the same directory as the `RegressionRunner.html` or in ones below.
- Because of the way the HTML is rendered internally certain limitations apply, see [the documentation of the render backend](https://github.com/cburgmer/rasterizeHTML.js/wiki/Limitations).

For more information see the [FAQ](https://github.com/cburgmer/csscritic/wiki/FAQ) and [API](https://github.com/cburgmer/csscritic/wiki/API).

Licensed under MIT. Maintained by [@cburgmer](https://twitter.com/cburgmer). Copyright (c) 2012, 2013 ThoughtWorks, Inc.
