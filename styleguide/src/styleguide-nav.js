const React = global.React || require('react');
const Tabs = global.Tabs || require('pui-react-tabs').Tabs;
const Tab = global.Tab || require('pui-react-tabs').Tab;

const types = React.PropTypes;

class StyleguideNav extends React.Component {
  static propTypes = {
    defaultLanguage: types.string.isRequired,
    navTree: types.object.isRequired
  };

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
          <a className='maxl' href={componentPage}>{componentLink}</a>
        </div>
        );
      });

      return (
        <Tab eventKey={language.toLowerCase()} key={`nav-tab-${language}`} title={language} className="pvl phn">
          {links}
        </Tab>
      );
    });

    return (
      <Tabs defaultActiveKey={defaultLanguage.toLowerCase()}>
        {tabs}
      </Tabs>
    );
  }
};

module.exports = StyleguideNav;
