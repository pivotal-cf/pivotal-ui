# Tabs

## Description
Tabs are a navigation element used in web design that allow users to easily access different areas of a site or different parts of an individual page. They’re sort of like tabbed dividers in a filing cabinet – by clicking a tab, users can easily locate a view of related content. Tabs should be used for alternating between views within the same context, not to navigate to different areas.

## Do's

- Use tabs to group content, connect related information, and as a tool to save space.
- Information needs to be highly scannable and simple to navigate helps aid users in locating specific information they need.
- When a user would like to access each group of information separately.

## Don'ts

- Don’t use tabs when it’s more meaningful for the user to see related content grouped together
- When content is sequential it may make more sense to have content grouped and scrollable
- When it makes more sense to have users scan the page then hide content

## Props

## Basic Usage
Import the subcomponents:

`import {Tabs, Tab, LeftTabs} from 'pui-react-tabs';`

Using Tab components in React consists of a parent element for the desired Tab type (for example, Tabs or LeftTabs). Each Tab is a child of this and has a tab property for the string value a Tab should display. Additionally, each Tab must define an eventKey property for uniquely identifying this tab to its parent component.

```jsx
::title=Basic Example
<div>
    <Tabs defaultActiveKey={1} actions={<a>Action!</a>}>
      <Tab eventKey={1} title="Tab 1">Wow!</Tab>
      <Tab eventKey={2} title="Tab 2">
        <h2>Neat!</h2>
        <span>So much content.</span>
      </Tab>
    </Tabs>
</div>
```
