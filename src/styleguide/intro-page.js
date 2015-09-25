const React = global.React || require('react');
const BasePane = global.BasePane || require('pui-react-panes').BasePane;
const Button = global.DefaultButton || require('pui-react-buttons').DefaultButton;
const TileLayout = global.TileLayout || require('pui-react-tile-layout');

const IntroPage = React.createClass({
  render() {
    return (
      <div>
        <BasePane className="bg-accent-5 styleguide-hero" style={{border: '3px solid rgba(255,255,255,0.25)'}}>
          <h1 className="title styleguide-title"> Ship Better UI, Faster</h1>

          <p className="styleguide-subtitle">
            Pivotal UI is a collection of React Components that are styled for the Pivotal Brand.
          </p>
          <Button href="/get-started.html" className="styleguide-btn-primary" large>Get Started</Button>
        </BasePane>
        <TileLayout columns={{lg: 3, xs: 1}} noGutter>
          <TileLayout.Item>
            <IntroTile category="Base">
              Discrete elements such as buttons, lists and
              images. Also includes iconography and typography guidelines.
            </IntroTile>
          </TileLayout.Item>
          <TileLayout.Item>
            <IntroTile category="Components">
              Groups of elements that comprise a unit. Elements
              such as a form label, text input and autocomplete
              can create a form.
            </IntroTile>
          </TileLayout.Item>
          <TileLayout.Item>
            <IntroTile category="Utilities">
              Simple typographic, layout and color utilities.
              Layout your pages with clean grids and whitespace
              that are also responsive.
            </IntroTile>
          </TileLayout.Item>
        </TileLayout>
      </div>
    );
  }
});

const IntroTile = React.createClass({
  propTypes: {
    category: React.PropTypes.string,
    description: React.PropTypes.string,

  },
  render() {
    return (
      <div className="styleguide-intro-tile">
        <h2>{this.props.category}</h2>

        <p>{this.props.children}</p>
      </div>
    );
  }
});
export default IntroPage;