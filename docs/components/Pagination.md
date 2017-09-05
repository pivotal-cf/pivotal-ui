# Pagination

## Description
Pagination is a method for allowing a user to view a subset of sorted data into a more comprehensible format. It allows a user to progress to the next or previous view, or choose a page number you want manually.

The Pagination component provides a styled list of links used to navigate through a paginated list.  By default,
the component includes a 'previous page' button, a 'next page' button, and one link.

## Do's and Don'ts
Do's         | Don'ts
-------------|----------
Use when it is unsuitable to display all the data on a single page/screen. | Do not use when you don’t want the user to pause for navigating to the next page. Instead consider simply having a scrolling vertical view.
Use when the dataset is in some way ordered. |

## Examples

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

## Installation & Usage

#### React
`npm install pui-react-pagination --save`

`import {Pagination} from 'pui-react-pagination';`

#### CSS Only
`npm install pui-css-pagination --save`

## Props

Property   | Required | Type     | Default | Description
-----------|----------|----------|---------|------------
items      | no       | Number   | 1       | The number of page links displayed
next       | no       | Boolean  | true    | Option to display a 'next page' button
prev       | no       | Boolean  | true    | Option to display a 'previous page' button
activePage | no       | Number   |         | Option to make a link styled as 'active'
onSelect   | no       | Function |         | Callback that is called on click of a link
small      | no       | Boolean  | false   | Make the buttons small
large      | no       | Boolean  | false   | Make the buttons large