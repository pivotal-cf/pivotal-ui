const React = global.React || require('react');
const SimpleAltTabs = global.SimpleAltTabs || require('pui-react-tabs').SimpleAltTabs;
const Tab = global.Tab || require('pui-react-tabs').Tab;
const Collapse = global.Collapse || require('pui-react-collapse').Collapse;

const ComponentTypeCollapse = React.createClass({
  render() {
    const {componentType, components} = this.props;

    let componentItems = [];

    for(let component in components) {
      if (components.hasOwnProperty(component)) {
        componentItems.push(
          <div>
            <a href={components[component]}>{component}</a>
          </div>
        )
      }
    }

    return (
      <Collapse header={componentType}>
        {componentItems}
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
              <ComponentTypeCollapse componentType={componentType} components={componentTypes[componentType]} />
            );
          }
        }

        tabs.push(
          <Tab eventKey={language} key={`nav-tab-${language}`} title={language}>
            {collapses}
          </Tab>
        )
      }
    }

    return (
      <SimpleAltTabs defaultActiveKey={defaultLanguage}>
        {tabs}
      </SimpleAltTabs>
    );
  }
});

export default StyleguideNav;