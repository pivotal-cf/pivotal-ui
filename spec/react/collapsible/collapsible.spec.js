import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Collapsible} from '../../../src/react/collapsible';

const mockFractionOpen = jest.fn(() => 0);

jest.mock('../../../src/react/mixins/components/bounding_client_rect',
  () => ({useBoundingClientRect: ParentClass => props => (
    <ParentClass {...props} boundingClientRect={{
      height: 100
    }}/>
  )})
);

jest.mock('../../../src/react/mixins/mixins/animation_mixin',
  () => ParentClass => class MockAnimation extends ParentClass {
    animate() {
      return mockFractionOpen();
    }
  }
);

describe('Collapsible', () => {
  let onEnteredSpy, onExitedSpy, subject;

  beforeEach(() => {
    onEnteredSpy = jasmine.createSpy('onEntered');
    onExitedSpy = jasmine.createSpy('onExited');

    class Klass extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {expanded: false};
      }

      toggle = () => {
        this.setState({expanded: !this.state.expanded});
      };

      render() {
        return (
          <div>
            <button className="pui-collapse-toggle" onClick={this.toggle}>Click to Toggle</button>
            <Collapsible {...this.state} onEntered={onEnteredSpy} onExited={onExitedSpy}>
              <div style={{height: 24}} className="maybe">cat</div>
            </Collapsible>
          </div>
        );
      }
    }

    subject = ReactDOM.render(<Klass />, root);
  });

  it('renders children hidden by default', () => {
    expect('.pui-collapsible').not.toHaveClass('in');
  });

  it('shows children if expanded is true', () => {
    mockFractionOpen.mockReturnValue(1);
    $('.pui-collapse-toggle').simulate('click');

    expect('.pui-collapsible').toHaveClass('in');
    expect('.pui-collapsible .maybe').toExist();
  });

  it('animates while expanding', () => {
    mockFractionOpen.mockReturnValue(0.1);
    $('.pui-collapse-toggle').simulate('click');

    expect('.pui-collapsible-shield').toHaveCss({marginBottom: '-90px'});
  });

  it('calls onEntered when done opening', () => {
    mockFractionOpen.mockReturnValue(1);
    $('.pui-collapse-toggle').simulate('click');

    expect(onEnteredSpy).toHaveBeenCalled();
    expect(onExitedSpy).not.toHaveBeenCalled();
  });

  it('calls onExited when done closing', () => {
    mockFractionOpen.mockReturnValue(1);
    $('.pui-collapse-toggle').simulate('click');

    onEnteredSpy.calls.reset();

    mockFractionOpen.mockReturnValue(0);
    $('.pui-collapse-toggle').simulate('click');

    expect(onExitedSpy).toHaveBeenCalled();
    expect(onEnteredSpy).not.toHaveBeenCalled();
  });
});
