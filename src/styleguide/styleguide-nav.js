const React = global.React || require('react');
const SimpleTabs = global.SimpleTabs || require('pui-react-tabs').SimpleTabs;
const Tab = global.Tab || require('pui-react-tabs').Tab;
const Collapse = global.Collapse || require('pui-react-collapse').Collapse;

const ComponentTypeCollapse = React.createClass({
  render() {
    const {componentType, components, defaultExpanded} = this.props;

    let componentNames = Object.keys(components).sort();

    const componentItems = componentNames.map((component) => {
      return (
        <li key={`ok-react-${component}`}>
          <a href={components[component]}>{component}</a>
        </li>
      );
    });

    return (
      <Collapse header={componentType} className="nav-component-type" defaultExpanded={defaultExpanded}>
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

    const languageNames = ['React', 'CSS'];
    const tabs = languageNames.map((language) => {
      const componentTypes = navTree[language];
      const componentTypeNames = Object.keys(componentTypes).sort();

      const collapses = componentTypeNames.map((componentType, i) => {
        const defaultExpanded = i === 0;
        return (
          <ComponentTypeCollapse componentType={componentType}
                                 key={`nav-${language}-${componentType}`}
                                 components={componentTypes[componentType]}
                                 defaultExpanded={defaultExpanded}/>
        );
      });

      return (
        <Tab eventKey={language} key={`nav-tab-${language}`} title={language} className="pvn phn">
          {collapses}
        </Tab>
      )
    });

    return (
      <SimpleTabs defaultActiveKey={defaultLanguage}>
        {tabs}
      </SimpleTabs>
    );
  }
});

export default StyleguideNav;