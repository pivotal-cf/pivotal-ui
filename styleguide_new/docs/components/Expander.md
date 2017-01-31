# Expander

## Description

## Props

## Basic Usage

```jsx
::title=Basic Example
class MoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  render() {
    return (
      <main>
        <ExpanderContent expanded={this.state.expanded}
                         onEntered={() => console.log('onEntered')}
                         onExited={() => console.log('onExited')}>
          <p className="h1 bg-neutral-2 type-neutral-9">
            Content in expander
          </p>
        </ExpanderContent>
        <button className="btn-primary" onClick={() => this.setState({expanded: !this.state.expanded})}>
          Toggle Content
        </button>
      </main>
    )
  }
}

<div>
    <MoreInfo />
</div>
```