import '../spec_helper';
import {FormCol} from '../../../src/react/forms';
import crypto from 'crypto';
import {FlexCol} from '../../../src/react/flex-grids';

describe('FormCol', () => {
  let onChange, state, setState;

  beforeEach(() => {
    spyOn(React, 'cloneElement').and.callThrough();
    spyOn(crypto, 'randomBytes').and.returnValue('some-unique-string');
    onChange = jasmine.createSpy('onChange');
    setState = jasmine.createSpy('setState');
    state = {key: 'value'};
  });

  describe('when fixed', () => {
    beforeEach(() => ReactDOM.render(<FormCol fixed/>, root));
    it('renders a col-fixed class', () => expect('.col').toHaveClass('col-fixed'));
  });

  describe('with id', () => {
    beforeEach(() => ReactDOM.render(<FormCol id="some-id"/>, root));
    it('renders with the id', () => expect('.col').toHaveAttr('id', 'some-id'));
  });

  describe('when hidden', () => {
    beforeEach(() => ReactDOM.render(<FormCol hidden/>, root));
    it('renders hidden', () => expect('.col').toHaveAttr('hidden', ''));
  });

  describe('with children', () => {
    beforeEach(() => {
      spyOnRender(FlexCol).and.callThrough();

      ReactDOM.render(<FormCol id="some-id" className="some-class">
        <div>hello</div>
      </FormCol>, root);
    });

    it('renders a FlexCol with the props', () => {
      expect(FlexCol).toHaveBeenRenderedWithProps({
        id: 'some-id',
        className: 'some-class form-col',
        hidden: undefined,
        children: jasmine.any(Object)
      });
    });

    it('renders children', () => {
      expect('.col > div').toHaveText('hello');
    });
  });

  describe('with a function child', () => {
    let child, state, setState, canSubmit, onSubmit, canReset, reset;

    beforeEach(() => {
      spyOnRender(FlexCol).and.callThrough();
      child = jasmine.createSpy('child').and.returnValue(<span className="child">child return value</span>);
      state = {submitting: true};
      setState = jasmine.createSpy('setState');
      canSubmit = jasmine.createSpy('canSubmit');
      onSubmit = jasmine.createSpy('onSubmit');
      canReset = jasmine.createSpy('canReset');
      reset = jasmine.createSpy('reset');
      ReactDOM.render(<FormCol {...{
        id: 'some-id', className: 'some-class', state, setState, canSubmit, onSubmit, canReset, reset
      }}>{child}</FormCol>, root);
    });

    it('renders a FlexCol with the props', () => {
      expect(FlexCol).toHaveBeenRenderedWithProps({
        id: 'some-id',
        className: 'some-class form-col',
        hidden: undefined,
        children: jasmine.any(Object)
      });
    });

    it('calls the child', () => {
      expect(child).toHaveBeenCalledWith({
        canSubmit, canReset, reset, onSubmit, submitting: state.submitting, setState, state
      });
    });

    it('renders the child return value', () => {
      expect('.col > span.child').toHaveText('child return value');
    });
  });
});