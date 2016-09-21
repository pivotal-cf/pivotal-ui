const {copy} = require('./clipboard-helper');
const {mergeProps} = require('pui-react-helpers');
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
              <svg className="copy-to-clipboard-image" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M768 1664h896v-640h-416q-40 0-68-28t-28-68v-416h-384v1152zm256-1440v-64q0-13-9.5-22.5t-22.5-9.5h-704q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h704q13 0 22.5-9.5t9.5-22.5zm256 672h299l-299-299v299zm512 128v672q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-544q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h1088q40 0 68 28t28 68v328q21 13 36 28l408 408q28 28 48 76t20 88z"/>
              </svg>
            </div>
          </OverlayTrigger>
        </CopyToClipboard>
    );
  }
}

module.exports = {CopyToClipboard, CopyToClipboardButton};