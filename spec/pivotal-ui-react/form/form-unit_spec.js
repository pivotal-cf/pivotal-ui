import '../spec_helper';
import {FormUnit} from '../../../src/react/forms';
import {TooltipTrigger} from '../../../src/react/tooltip';

describe('FormUnit', () => {
  let subject;

  beforeEach(() => {
    spyOnRender(TooltipTrigger).and.callThrough();
    subject = ReactDOM.render(<FormUnit {...{
      className: 'my-class',
      field: (<div><span>hello</span></div>)
    }} />, root);
  });

  it('does not render a label row when no label is provided', () => {
    expect('.form-unit .label-row').not.toExist();
  });

  describe('when no field is provided', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<FormUnit {...{
        className: 'my-class',
        label: 'some label'
      }} />, root);
    });

    it('does not render a field row', () => {
      expect('.form-unit .field-row').not.toExist();
    });
  });


  describe('inline', () => {
    beforeEach(() => {
      subject::setProps({inline: true, label: 'Instance Name', help: 'my-help-text'});
    });

    it('renders the field and label on a grid next to each other', () => {
      expect('.form-unit .grid:eq(0) > .col:eq(0)').toHaveText('Instance Name');
      expect('.form-unit .grid:eq(0) > .col:eq(1)').toHaveText('hello');
    });

    it('applies the "inline-form-unit" class to the form unit', () => {
      expect('.form-unit').toHaveClass('inline-form-unit');
    });

    it('renders the help row in a grid', () => {
      expect('.form-unit .grid:eq(1) > .col:eq(0).help-row').toHaveText('my-help-text');
    });
  });

  describe('hideHelpRow', () => {
    beforeEach(() => {
      subject::setProps({hideHelpRow: true});
    });

    it('does not render the help row', () => {
      expect('.form-unit .help-row').not.toExist();
    });
  });

  describe('inline and hideHelpRow', () => {
    beforeEach(() => {
      subject::setProps({inline: true, hideHelpRow: true});
    });

    it('does not render the help row', () => {
      expect('.form-unit .help-row').not.toExist();
    });
  });

  describe('label', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Instance Name'
      });
    });

    it('shows a label', () => {
      expect('.form-unit .label-row').toContainText('Instance Name');
    });

    it('shows the label before the field', () => {
      expect('.form-unit').toHaveText('Instance Namehello');
    });
  });

  describe('retainLabelHeight', () => {
    beforeEach(() => {
      subject::setProps({
        retainLabelHeight: true
      });
    });

    it('renders an empty label row', () => {
      expect('.form-unit .label-row').toHaveText('');
    });
  });

  describe('labelClassName', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Some label',
        labelClassName: 'h4'
      });
    });

    it('puts the classname on the label', () => {
      expect('.form-unit .label-row label').toHaveClass('h4');
    });
  });

  describe('labelFor', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'some-label',
        labelFor: 'instance-name'
      });
    });

    it('sets the "for" on the label', () => {
      expect('.form-unit .label-row label').toHaveAttr('for', 'instance-name');
    });
  });

  describe('labelPosition', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Instance Name',
        labelPosition: 'after'
      });
    });

    it('shows the label on the right side', () => {
      expect('.form-unit').toHaveText('helloInstance Name');
    });
  });

  describe('postLabel', () => {
    beforeEach(() => {
      subject::setProps({
        postLabel: <span className="more-stuff">another label</span>
      });
    });

    it('renders the postLabel', () => {
      expect('.form-unit .label-row .post-label .more-stuff').toHaveText('another label');
      expect('.form-unit .label-row .post-label').toHaveClass('col-fixed');
      expect('.form-unit .label-row .post-label').toHaveClass('col-middle');
    });

    describe('when inline', () => {
      beforeEach(() => {
        subject::setProps({inline: true});
      });

      it('does not render the postLabel', () => {
        expect('.form-unit .label-row .post-label').not.toExist();
      });
    });

    describe('when the postLabel is a function', () => {
      let postLabel, setState, state;

      beforeEach(() => {
        postLabel = jasmine.createSpy('postLabel').and.returnValue(<span className="returned">returned</span>);
        setState = jasmine.createSpy('setState');
        state = {key: 'value'};

        subject::setProps({postLabel, setState, state});
      });

      it('calls the postLabel function', () => {
        expect(postLabel).toHaveBeenCalledWith({setState, state});
      });

      it('renders the returned node', () => {
        expect('.form-unit .label-row .post-label .returned').toHaveText('returned');
      });
    });
  });

  describe('tooltip', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>
      });
    });

    it('shows a tooltip', () => {
      expect('.form-unit .label-row .tooltip .icon').toExist();
      expect('.form-unit .label-row .tooltip .tooltip-content').toHaveText('This is a tooltip.');
    });

    it('renders tooltip with default placement and default size', () => {
      expect(TooltipTrigger).toHaveBeenRenderedWithProps(jasmine.objectContaining({
        placement: 'top',
        size: 'lg'
      }));
    });
  });

  describe('tooltipPlacement', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>,
        tooltipPlacement: 'right'
      });
    });

    it('renders tooltip with the given placement', () => {
      expect(TooltipTrigger).toHaveBeenRenderedWithProps(jasmine.objectContaining({
        placement: 'right'
      }));
    });
  });

  describe('tooltipSize', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>,
        tooltipSize: 'sm'
      });
    });

    it('renders tooltip with the given size', () => {
      expect(TooltipTrigger).toHaveBeenRenderedWithProps(jasmine.objectContaining({
        size: 'sm'
      }));
    });
  });

  describe('optional', () => {
    beforeEach(() => {
      subject::setProps({label: 'Some label', optional: true});
    });

    it('renders the optional text', () => {
      expect('.form-unit .label-row .optional-text').toContainText('(Optional)');
    });
  });

  describe('optionalText', () => {
    beforeEach(() => {
      subject::setProps({label: 'Some label', optional: true, optionalText: '(Optional - custom text)'});
    });

    it('renders the custom optional text when provided', () => {
      expect('.form-unit .label-row .optional-text').toHaveText('(Optional - custom text)');
    });
  });

  describe('optionalText empty string', () => {
    beforeEach(() => {
      subject::setProps({label: 'Some label', optional: true, optionalText: ''});
    });

    it('renders the custom optional text when provided', () => {
      expect('.form-unit .label-row .optional-text').toHaveText('');
    });
  });

  it('renders the field', () => {
    expect('.form-unit .field-row div span').toContainText('hello');
  });

  describe('help', () => {
    beforeEach(() => {
      subject::setProps({
        help: (<div>
          <pre>help</pre>
        </div>)
      });
    });

    it('renders the help block', () => {
      expect('.form-unit .help-row div pre').toContainText('help');
      expect('.form-unit .help-row').toHaveClass('type-dark-5');
    });
  });

  it('does not has the has-error class', () => {
    expect('.form-unit').not.toHaveClass('has-error');
  });

  it('renders the given class name', () => {
    expect('.form-unit').toHaveClass('my-class');
  });

  describe('when there is no tooltip', () => {
    beforeEach(() => {
      subject::setProps({
        label: 'Some label',
        tooltip: null
      });
    });

    it('does not render a tooltip', () => {
      expect('.form-unit .label-row').toContainText('Some label');
      expect('.form-unit .label-row .tooltip').not.toExist();
    });
  });

  describe('when there is no help block', () => {
    beforeEach(() => {
      subject::setProps({help: null});
    });

    it('renders an empty div', () => {
      expect('.form-unit div.help-row').toHaveText('');
    });
  });

  describe('when hasError is true', () => {
    beforeEach(() => {
      subject::setProps({hasError: true});
    });

    it('applies the has-error class', () => {
      expect('.form-unit').toHaveClass('has-error');
    });

    it('removes the type-dark-5 class from the help block', () => {
      expect('.form-unit .help-row').not.toHaveClass('type-dark-5');
    });
  });

  describe('when there is no label, field, or help block', () => {
    beforeEach(() => {
      subject::setProps({label: null, field: null, help: null});
    });

    it('renders nothing', () => {
      expect('.form-unit').not.toExist();
    });
  });
});