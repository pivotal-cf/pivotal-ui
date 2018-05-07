# Flyout

## Description
The flyout appears from the right side of the window and overlays all other content until it is closed. Its
visibility is controlled with the `open` property. It can take a custom `width`. The contents of the header
and the body are set with the `header` and `children` properties, respectively. The behavior of the close
button is defined through the `close` callback.

## Examples

```jsx
::title=Basic example
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {created, open} = this.state;

    const children = (
      <Form>
        <FormRow>
          <FormCol name="name" label="Task Name">
            <Input placeholder="Enter Task Name"/>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol className="txt-r">
            <div>
              <DefaultButton alt onClick={() => this.setState({open: false})}>Cancel</DefaultButton>
              <DefaultButton onClick={() => this.setState({created: new Date(), open: false})}>Create</DefaultButton>
            </div>
          </FormCol>
        </FormRow>
      </Form>
    );

    return (
      <div>
        <DefaultButton {...{onClick: () => this.setState({open: true})}}>
          Open Flyout
        </DefaultButton>

        {created && <p className="mtl">Last task created: {created.toLocaleString()}</p>}

        <Flyout {...{
          open,
          header: <h3>Create Task</h3>,
          headerClassName: 'header-class',
          bodyClassName: 'body-class',
          children,
          close: () => this.setState({open: false})
        }}/>
      </div>
    );
  }
}
<Page/>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {Flyout} from 'pivotal-ui/react/flyout';`

## Props

Property        | Required | Type     | Default | Description
----------------|----------|----------|---------|------------
bodyClassName   | false    | String   |         | Class(es) to apply to the body
children        | false    | Any      |         | Contents of the flyout body
close           | false    | Function |         | Callback called when close button is clicked
header          | false    | Any      |         | Contents of the flyout header
headerClassName | false    | String   |         | Class(es) to apply to the header
open            | false    | Boolean  | false   | Whether or not the flyout is visible
width           | false    | String   | 480px   | Width of flyout content
