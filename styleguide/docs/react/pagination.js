/*doc
---
title: Pagination
name: pagination_react
categories:
- react_base_pagination
- react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-pagination --save
</i>
</code>

Require the subcomponents:

```
var Pagination = require('pui-react-pagination').Pagination;
```

The Pagination component provides a styled list of links used to navigate through a paginated list.  By default,
the component includes a 'previous page' button, a 'next page' button, and one link.

```react_example
<Pagination/>
```

The Pagination component accepts the following properties:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | Number | 1 | the number of page links displayed |
| `next` | Boolean | true | option to display a 'next page' button |
| `prev` | Boolean | true | option to display a 'previous page' button |
| `activePage` | Number | none | option to make a link styled as 'active' |
| `onSelect` | Function | none | callback that is called on click of a link |

The following is an example of pagination with extra props:

```jsx_example
const PaginationAdvanced = React.createClass({
  getInitialState() {
   return {
     activePage: 1
   };
  },

  handleSelect(event, selectedEvent) {
    var eventKey = selectedEvent.eventKey;
    var activePage = this.state.activePage;

    if(eventKey === 'next') {
      return this.setState({activePage: activePage + 1});
    }
    if(eventKey === 'prev') {
      return this.setState({activePage: activePage - 1});
    }

    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render() {
    return (
      <Pagination
       items={7}
       activePage={this.state.activePage}
       onSelect={this.handleSelect}
     />
   );
  }
});

```

```react_example
<PaginationAdvanced/>
```
*/
