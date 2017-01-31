# Pagination
## Description
Pagination is a method for allowing a user to view a subset of sorted data into a more comprehensible format. It allows a user to progress to the next or previous view, or choose a page number you want manually.

## Do's
- Use when it is unsuitable to display all the data on a single page/screen.
- Use when the dataset is in some way ordered.

## Don'ts
- Do not use when you don’t want the user to pause for navigating to the next page. Instead consider simply having a scrolling vertical view.


## Basic Usage
Import the subcomponents:

`import {Pagination} from 'pui-react-pagination';`

The Pagination component provides a styled list of links used to navigate through a paginated list. By default, the component includes a 'previous page' button, a 'next page' button, and one link.

## Props

```jsx
::title=Basic Example
<div>
    <Pagination/>
</div>
```
