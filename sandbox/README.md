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

4. Run the following script to create your `sandbox.js` file:

```js
yarn create-sandbox
```

This will write a new file (if one doesn't already exist) with some starter code in it. From now on, you can work in `sandbox.js` while developing.

5. Start up the sandbox dev server.

```
yarn start
```

You should then be able to edit your `sandbox.js` as needed (importing components from `pivotal-ui/react/...`).