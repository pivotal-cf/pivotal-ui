const React = global.React || require('react');
const SimpleTabs = global.SimpleTabs || require('pui-react-tabs').SimpleTabs;
const Tab = global.Tab || require('pui-react-tabs').Tab;
const Collapse = global.Collapse || require('pui-react-collapse').Collapse;

const ComponentTypeCollapse = React.createClass({
  render() {
    const {componentType, components} = this.props;

    let componentItems = [];

    for(let component in components) {
      if (components.hasOwnProperty(component)) {
        componentItems.push(
          <li key={`ok-react-${component}`}>
            <a href={components[component]}>{component}</a>
          </li>
        )
      }
    }

    return (
      <Collapse header={componentType} className="nav-component-type">
        <ul className="list-unstyled mlxl">
          {componentItems}
        </ul>
      </Collapse>
    );
  }
});

const StyleguideNav = React.createClass({
  render() {
    const {navTree, defaultLanguage} = this.props;

    let tabs = [];

    for (let language in navTree) {
      if (navTree.hasOwnProperty(language)) {

        let collapses = [];

        var componentTypes = navTree[language];

        for (let componentType in componentTypes) {
          if (componentTypes.hasOwnProperty(componentType)) {
            collapses.push(
              <ComponentTypeCollapse componentType={componentType}
                                     key={`nav-${language}-${componentType}`}
                                     components={componentTypes[componentType]} />
            );
          }
        }

        tabs.push(
          <Tab eventKey={language} key={`nav-tab-${language}`} title={language} className="pvn phn">
            {collapses}
          </Tab>
        )
      }
    }

    return (
      <SimpleTabs defaultActiveKey={defaultLanguage}>
        {tabs}
      </SimpleTabs>
    );
  }
});

export default StyleguideNav;