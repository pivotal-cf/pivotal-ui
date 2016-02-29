const React = global.React || require('react');
const SimpleTabs = global.SimpleTabs || require('pui-react-tabs').SimpleTabs;
const Tab = global.Tab || require('pui-react-tabs').Tab;

const types = React.PropTypes;

const StyleguideNav = React.createClass({
  propTypes: {
    defaultLanguage: types.string.isRequired,
    defaultComponentType: types.string.isRequired,
    navTree: types.object.isRequired
  },
  render() {
    const {navTree, defaultLanguage} = this.props;

    const languageNames = ['React', 'CSS'];
    const tabs = languageNames.map((language) => {
      const components = navTree[language];
      const componentLinkNames = Object.keys(components || {}).sort();

      const links = componentLinkNames.map((componentLink, key) => {
        const componentPage = components[componentLink];
        return (
        <div key={key}>
          <a className='paxl' href={componentPage}>{componentLink}</a>
        </div>
        );
      });

      return (
        <Tab eventKey={language.toLowerCase()} key={`nav-tab-${language}`} title={language} className="pvl phn">
          {links}
        </Tab>
      )
    });

    return (
      <SimpleTabs defaultActiveKey={defaultLanguage.toLowerCase()}>
        {tabs}
      </SimpleTabs>
    );
  }
});

module.exports = StyleguideNav;
