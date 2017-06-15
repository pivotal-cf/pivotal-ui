# Pagination

`npm install pui-react-pagination --save`

## Description
Pagination is a method for allowing a user to view a subset of sorted data into a more comprehensible format. It allows a user to progress to the next or previous view, or choose a page number you want manually.

## Do's
- Use when it is unsuitable to display all the data on a single page/screen.
- Use when the dataset is in some way ordered.

## Don'ts
- Do not use when you don’t want the user to pause for navigating to the next page. Instead consider simply having a scrolling vertical view.

## Basic Usage

Import the subcomponents:

```
import {Pagination} from 'pui-react-pagination';
```

The Pagination component provides a styled list of links used to navigate through a paginated list.  By default,
the component includes a 'previous page' button, a 'next page' button, and one link.

```jsx
::title=Without extra props
<Pagination/>
```

The following is an example of pagination with extra props:

```jsx
::title=With extra props
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

<PaginationAdvanced/>
```


## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
items      | no | Number   | 1    | The number of page links displayed
next       | no | Boolean  | true | Option to display a 'next page' button
prev       | no | Boolean  | true | Option to display a 'previous page' button
activePage | no | Function |      | Option to make a link styled as 'active'
onSelect   | no | Function |      | Callback that is called on click of a link
