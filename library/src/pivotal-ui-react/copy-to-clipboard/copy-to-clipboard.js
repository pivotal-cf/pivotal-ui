const {copy} = require('./clipboard-helper');
const {mergeProps} = require('pui-react-helpers');
const {Icon} = require('pui-react-iconography');
const {OverlayTrigger} = require('pui-react-overlay-trigger');
const React = require('react');
const {Tooltip} = require('pui-react-tooltip');
require('pui-css-copy-to-clipboard');

const types = React.PropTypes;

function click({props, text}, e) {
  copy(window, document, text);
  const {onClick} = props;
  if (onClick) onClick(e);
}

function CopyToClipboard(props) {
  const {children, text, onClick, ...others} = props;
  const obj = {props, text: null};

  const anchorProps = mergeProps(others, {
    className: 'copy-to-clipboard',
    onClick: click.bind(undefined, obj),
    role: 'button'
  });

  return (
    <a {...anchorProps}>
      <span className="sr-only" ref={ref => obj.text = ref}>{text}</span>
      {children}
    </a>
  );
}

CopyToClipboard.propTypes = {
  text: types.string.isRequired,
  onClick: types.func
};

class CopyToClipboardButton extends React.Component {
  static propTypes = {
    text: types.string,
    onClick: types.func
  };

  static defaultProps = {
    onClick() {
    }
  };

  constructor(props, context) {
    super(props, context);
    this.state = {display: false};
  }

  click = (e) => {
    if (!this.state.display) this.setState({display: true}, () => {
      this.setState({display: false});
    });
    this.props.onClick(e)
  };

  render() {
    const {onClick, ...props} = this.props;
    const {display} = this.state;

    const copyProps = mergeProps(props, {
      className: 'copy-to-clipboard-button',
      onClick: this.click
    });

    return (
        <CopyToClipboard {...copyProps}>
          <OverlayTrigger trigger="manual" delayHide={3000} placement="top" overlay={<Tooltip id="copy-to-clipboard">Copied</Tooltip>} {...{display}}>
            <div className="clipboard-button">
              <Icon src="copy"/>
            </div>
          </OverlayTrigger>
        </CopyToClipboard>
    );
  }
}

module.exports = {CopyToClipboard, CopyToClipboardButton};