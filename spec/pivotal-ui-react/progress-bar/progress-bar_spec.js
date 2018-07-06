import '../spec_helper';
import {ProgressBar} from '../../../src/react/progress-bar';

describe('ProgressBar', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(<ProgressBar/>, root);
  });

  it('renders a progress background div', () => {
    expect('.pui-progress').toExist();
  });

  it('renders a progress foreground div', () => {
    expect('.pui-progress .pui-progress-bar').toHaveAttr('role', 'progressbar');
    expect('.pui-progress .pui-progress-bar').toHaveAttr('aria-valuemax', '100');
    expect('.pui-progress .pui-progress-bar').toHaveAttr('aria-valuemin', '0');
    expect('.pui-progress .pui-progress-bar').toHaveAttr('aria-valuenow', '0');
    expect('.pui-progress .pui-progress-bar').toHaveStyle({width: '0%'});
  });

  describe('when given a className', () => {
    beforeEach(() => {
      subject::setProps({className: 'custom-class'});
    });

    it('applies the class to the outer div', () => {
      expect('.pui-progress').toHaveClass('custom-class');
    });
  });

  describe('when given a barClassName', () => {
    beforeEach(() => {
      subject::setProps({barClassName: 'custom-bar-class'});
    });

    it('applies the class to the progress bar', () => {
      expect('.pui-progress .pui-progress-bar').toHaveClass('custom-bar-class');
    });
  });

  describe('when given a value', () => {
    beforeEach(() => {
      subject::setProps({value: 78});
    });

    it('sets the attributes of the progress bar accordingly', () => {
      expect('.pui-progress .pui-progress-bar').toHaveAttr('aria-valuenow', '78');
      expect('.pui-progress .pui-progress-bar').toHaveStyle({width: '78%'});
    });
  });
});