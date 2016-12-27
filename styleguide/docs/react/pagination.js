/*doc
---
title: Pagination
name: pagination_react
categories:
- react_base_pagination
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-pagination --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
items      | Number   | 1    | The number of page links displayed
next       | Boolean  | true | Option to display a 'next page' button
prev       | Boolean  | true | Option to display a 'previous page' button
activePage | Function |      | Option to make a link styled as 'active'
onSelect   | Function |      | Callback that is called on click of a link

## Basic usage

Import the subcomponents:

```
import {Pagination} from 'pui-react-pagination';
```

The Pagination component provides a styled list of links used to navigate through a paginated list.  By default,
the component includes a 'previous page' button, a 'next page' button, and one link.

```react_example
<Pagination/>
```

The following is an example of pagination with extra props:

```jsx_example
class PaginationAdvanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activePage: 1};
  }

  handleSelect(event, selectedEvent) {
    const eventKey = selectedEvent.eventKey;
    const activePage = this.state.activePage;

    if(eventKey === 'next') {
      return this.setState({activePage: activePage + 1});
    }

    if(eventKey === 'prev') {
      return this.setState({activePage: activePage - 1});
    }

    this.setState({activePage: selectedEvent.eventKey});
  }

  render() {
    return (
      <Pagination items={7}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect.bind(this)} />
    );
  }
}
```

```react_example
<PaginationAdvanced/>
```
*/
