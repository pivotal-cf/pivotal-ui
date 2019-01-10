# Pivotal UI sandbox

This is a tiny sample React app that imports Pivotal UI components.

To get it up and running:

1. Make sure you've cloned the `pivotal-ui` repo locally.

```
git clone https://github.com/pivotal-cf/pivotal-ui.git
```

2. Install dependencies for Pivotal UI.

```
cd pivotal-ui
yarn
```

3. Install dependencies for the sandbox.

```
cd sandbox
yarn
```

4. Create a file called `sandbox.js` in this directory (alongside the sandbox's `index.js`). You can start with something like this:

```js
import React from 'react';
import {DefaultButton} from 'pivotal-ui/react/buttons';

export default () => <DefaultButton>Hello!</DefaultButton>;
```

5. Start up the sandbox dev server.

```
yarn start
```

You should then be able to edit your `sandbox.js` as needed (importing components from `pivotal-ui/react/...`).