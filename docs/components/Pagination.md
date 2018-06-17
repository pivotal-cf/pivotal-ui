---
title: Pagination
menu: components
cssPath: pivotal-ui/css/pagination
reactPath: pivotal-ui/react/pagination
componentProps:
  Pagination:
    items: The number of page links displayed
    next: Option to display a 'next page' button
    prev: Option to display a 'previous page' button
    activePage: The selected page number (starts at 1)
    onSelect: Callback that is called when a page number or next/previous button is clicked. It receives an object containing `newActivePage`.
---

# Overview

Pagination is a method for allowing a user to view a subset of sorted data into a more comprehensible format. It allows a user to progress to the next or previous view, or choose a page number you want manually.

The Pagination component provides a styled list of links used to navigate through a paginated list.  By default,
the component includes a 'previous page' button, a 'next page' button, and one link.

The pagination component will display a maximum of five pages. When more than five are provided, the component will shrink with ellipses to show the first, last, active, and pages adjacent to the active page.

# Examples

```jsx
::title=Without extra props
<Pagination/>
```

```jsx
::title=With extra props
::description=The following is an example of pagination with extra props:
class PaginationAdvanced extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {activePage: 1};
  }

  handleSelect(event, selectedEvent) {
    const newActivePage = selectedEvent.newActivePage;
    this.setState({activePage: newActivePage});
  }

  render() {
    return (
      <div>
        <Pagination items={7}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect} />
        <div className="maxl">Current Page: {this.state.activePage}</div>
      </div>
    );
  }
}

<PaginationAdvanced/>
```

# Guidelines

Do's         | Don'ts
-------------|----------
Use when it is unsuitable to display all the data on a single page/screen. | Do not use when you don’t want the user to pause for navigating to the next page. Instead consider simply having a scrolling vertical view.
Use when the dataset is in some way ordered. |