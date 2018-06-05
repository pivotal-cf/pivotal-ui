---
title: Wizard
reactPath: pivotal-ui/react/wizard
reactComponents:
  - Wizard
---

# Overview

The `Wizard` component allows the user to navigate through a series of Wizard pages. Each page has a render function which returns the JSX required to show the page. Various callbacks can be provided as props to customize the Wizard's behavior.

# Examples

```jsx
::title=Basic example
const pages = [{
  render() { return <span>This is the first page of the wizard. By default, the wizard cannot be cancelled. The user cannot go back from the first page. Click the Next button to proceed.</span>}
}, {
  render() { return <span>This is the second page of the wizard. The user can click Back or Next.</span>}
}, {
  render() { return <span>This is the third and final page of the wizard. The user can click Back or Finish</span>}
}];
<Wizard pages={pages} style={{border: '1px solid #ccc', padding: '8px'}} finish={() => alert('All done!')}/>

```

```jsx
::title=With saving and savingText
const pages = [{
  render() { return <span>This is the first page of the wizard. The user can click Next.</span>}
}, {
  render() { return <span>This is the last page of the wizard. The Back button is disabled and the Finish button shows a spinner icon.</span>}
}];
<Wizard pages={pages} saving={true} savingText="Finishing" style={{border: '1px solid #ccc', padding: '8px'}} finish={() => alert('All done!')}/>

```

```jsx
::title=With custom back and finish components
const pages = [{
  render() { return <span>This is the first page of the wizard, click the Next button to see the custom back and finish components.</span>}
}, {
  render() { return <span>This is the last page of the wizard with custom back and finish components.</span>},
  backComponent: <a>Custom back component</a>,
  finishComponent: <a>Custom finish component</a>
}];
<Wizard pages={pages} style={{border: '1px solid #ccc', padding: '8px'}}/>
```

# Props

Property   | Required | Type     | Default | Description
-----------|----------|----------|---------|------------
pages      | yes      | Array    | []      | An array of Wizard Pages.
cancel     | no       | Function |         | Callback to call when the user cancels the Wizard.
cancelText | no       | String   | Cancel  | Text for the Cancel button.
finish     | no       | Function |         | Callback to call when the user finishes the Wizard.
finishText | no       | String   | Finish  | Text for the Finish button.
saving     | no       | Boolean  | false   | When true, renders the Finish button with a spinner icon and disables the Back button.
savingText | no       | String   | Saving  | Text for the Finish button when `saving` is true.

### Pages Props

Property         | Required | Type     | Default | Description
-----------------|----------|----------|---------|------------
render           | yes      | Function |         | Function that returns JSX for a page.
hideNextButton   | no       | Boolean  | false   | Whether to hide the Next button.
nextEnabled      | no       | Function |         | Callback to determine whether to enable the Next button. The Wizard's `getPage` function is passed as an argument to the callback.
nextText         | no       | Function |         | Callback to determine the text for the Next button.
onClickBack      | no       | Function |         | Called when the user clicks the Back button. Can optionally return a page index to go back to.
onClickNext      | no       | Function |         | Called when the user clicks the Next button.
backComponent    | no       | Node     |         | Replaces the standard Back button.
finishComponent  | no       | Node     |         | Replaces the standard Finish button.
hideFinishButton | no       | Boolean  |         | Hides the Finish button.
