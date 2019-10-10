import React from 'react';

export class Scrim extends React.Component {
  componentDidMount() {
    const document = global.document;
    if (typeof document === 'object') document.documentElement.addEventListener('click', this.scrimClick);
  }

  componentWillUnmount() {
    const document = global.document;
    if (typeof document === 'object') document.documentElement.removeEventListener('click', this.scrimClick);
  }

  scrimClick = e => {
    const node = this.props.containerRef.current;
    if (typeof node.contains !== 'function') {
      node.contains = HTMLDivElement.prototype.contains;
    }
    if (this.props.disableScrim || node.contains(e.target)) return;

    this.props.onScrimClick(e);
  };

  render() {
    return this.props.children;
  }
}