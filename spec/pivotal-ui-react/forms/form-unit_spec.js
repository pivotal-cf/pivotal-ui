import '../spec_helper';
import {FormUnit} from '../../../src/react/forms';
import {TooltipTrigger} from '../../../src/react/tooltip';

describe('FormUnit', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<FormUnit {...{
      className: 'my-class',
      children: (<div><span>hello</span></div>)
    }}/>);
  });

  it('does not render a label row when no label is provided', () => {
    expect(subject.find('.form-unit .label-row').exists()).toBeFalsy();
  });

  describe('when no children are provided', () => {
    beforeEach(() => {
      subject = shallow(<FormUnit {...{
        className: 'my-class',
        label: 'some label'
      }}/>);
    });

    it('does not render a field row', () => {
      expect(subject.find('.form-unit .field-row').exists()).toBeFalsy();
    });
  });


  describe('inline', () => {
    beforeEach(() => {
      subject.setProps({inline: true, label: 'Instance Name', help: 'my-help-text'});
    });

    it('renders the field and label on a grid next to each other', () => {
      expect(subject.find('.form-unit .grid').at(0).find('> .col').at(0).text()).toBe('Instance Name');
      expect(subject.find('.form-unit .grid').at(0).find('> .col').at(1).text()).toBe('hello');
    });

    it('applies the "inline-form-unit" class to the form unit', () => {
      expect(subject.find('.form-unit').hasClass('inline-form-unit')).toBeTruthy();
    });

    it('renders the help row in a grid', () => {
      expect(subject.find('.form-unit .grid').at(1).find('> .col').at(0).find('.help-row').text()).toBe('my-help-text');
    });
  });

  describe('hideHelpRow', () => {
    beforeEach(() => {
      subject.setProps({hideHelpRow: true});
    });

    it('does not render the help row', () => {
      expect(subject.find('.form-unit .help-row').exists()).toBeFalsy();
    });
  });

  describe('inline and hideHelpRow', () => {
    beforeEach(() => {
      subject.setProps({inline: true, hideHelpRow: true});
    });

    it('does not render the help row', () => {
      expect(subject.find('.form-unit .help-row').exists()).toBeFalsy();
    });
  });

  describe('label', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Instance Name'
      });
    });

    it('shows a label', () => {
      expect(subject.find('.form-unit .label-row').text()).toContain('Instance Name');
    });

    it('shows the label before the field', () => {
      expect(subject.find('.form-unit').text()).toBe('Instance Namehello');
    });
  });

  describe('retainLabelHeight', () => {
    beforeEach(() => {
      subject.setProps({
        retainLabelHeight: true
      });
    });

    it('renders an empty label row', () => {
      expect(subject.find('.form-unit .label-row').text()).toBe('');
    });
  });

  describe('labelClassName', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Some label',
        labelClassName: 'h4'
      });
    });

    it('puts the classname on the label', () => {
      expect(subject.find('.form-unit .label-row label').hasClass('h4')).toBeTruthy();
    });
  });

  describe('labelFor', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'some-label',
        labelFor: 'instance-name'
      });
    });

    it('sets the "for" on the label', () => {
      expect(subject.find('.form-unit .label-row label').prop('for')).toBe('instance-name');
    });
  });

  describe('labelPosition', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Instance Name',
        labelPosition: 'after'
      });
    });

    it('shows the label on the right side', () => {
      expect(subject.find('.form-unit').text()).toBe('helloInstance Name');
    });
  });

  describe('postLabel', () => {
    beforeEach(() => {
      subject.setProps({
        postLabel: <span className="more-stuff">another label</span>
      });
    });

    it('renders the postLabel', () => {
      expect(subject.find('.form-unit .label-row .post-label .more-stuff').text()).toBe('another label');
      expect(subject.find('.form-unit .label-row .post-label').hasClass('col-fixed')).toBeTruthy();
      expect(subject.find('.form-unit .label-row .post-label').hasClass('col-middle')).toBeTruthy();
    });

    describe('when inline', () => {
      beforeEach(() => {
        subject.setProps({inline: true});
      });

      it('does not render the postLabel', () => {
        expect(subject.find('.form-unit .label-row .post-label').exists()).toBeFalsy();
      });
    });

    describe('when the postLabel is a function', () => {
      let postLabel, state, setValues;

      beforeEach(() => {
        postLabel = jest.fn().mockName('postLabel').mockReturnValue(<span className="returned">returned</span>);
        setValues = jest.fn().mockName('setValues');
        state = {key: 'value'};

        subject.setProps({postLabel, state, setValues});
      });

      it('calls the postLabel function', () => {
        expect(postLabel).toHaveBeenCalledWith({state, setValues});
      });

      it('renders the returned node', () => {
        expect(subject.find('.form-unit .label-row .post-label .returned').text()).toBe('returned');
      });
    });
  });

  describe('tooltip', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>
      });
    });

    it('shows a tooltip', () => {
      expect(subject.find('.form-unit .label-row .tooltip .icon').exists()).toBeTruthy();
      expect(subject.find('.form-unit .label-row .tooltip .tooltip-content').text()).toBe('This is a tooltip.');
    });

    it('renders tooltip with default placement and default size', () => {
      expect(subject.find(TooltipTrigger).props()).toEqual(expect.objectContaining({
        placement: 'top',
        size: 'lg'
      }));
    });
  });

  describe('tooltipPlacement', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>,
        tooltipPlacement: 'right'
      });
    });

    it('renders tooltip with the given placement', () => {
      expect(subject.find(TooltipTrigger).props()).toEqual(expect.objectContaining({
        placement: 'right'
      }));
    });
  });

  describe('tooltipSize', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Some label',
        tooltip: <span>This is a tooltip.</span>,
        tooltipSize: 'sm'
      });
    });

    it('renders tooltip with the given size', () => {
      expect(subject.find(TooltipTrigger).props()).toEqual(expect.objectContaining({
        size: 'sm'
      }));
    });
  });

  describe('optional', () => {
    beforeEach(() => {
      subject.setProps({label: 'Some label', optional: true});
    });

    it('renders the optional text', () => {
      expect(subject.find('.form-unit .label-row .optional-text').text()).toContain('(Optional)');
    });
  });

  describe('optionalText', () => {
    beforeEach(() => {
      subject.setProps({label: 'Some label', optional: true, optionalText: '(Optional - custom text)'});
    });

    it('renders the custom optional text when provided', () => {
      expect(subject.find('.form-unit .label-row .optional-text').text()).toBe('(Optional - custom text)');
    });
  });

  describe('optionalText empty string', () => {
    beforeEach(() => {
      subject.setProps({label: 'Some label', optional: true, optionalText: ''});
    });

    it('renders the custom optional text when provided', () => {
      expect(subject.find('.form-unit .label-row .optional-text').text()).toBe('');
    });
  });

  it('renders the field', () => {
    expect(subject.find('.form-unit .field-row div span').text()).toContain('hello');
  });

  describe('help', () => {
    beforeEach(() => {
      subject.setProps({
        help: (<div>
          <pre>help</pre>
        </div>)
      });
    });

    it('renders the help block', () => {
      expect(subject.find('.form-unit .help-row div pre').text()).toContain('help');
      expect(subject.find('.form-unit .help-row').hasClass('type-dark-5')).toBeTruthy();
    });
  });

  describe('fieldRowClassName', () => {
    beforeEach(() => {
      subject.setProps({fieldRowClassName: 'some-field-row'});
    });

    describe('not inline', () => {
      it('gives the class name to the field row', () => {
        expect(subject.find('.form-unit .field-row').hasClass('some-field-row')).toBeTruthy();
      });
    });

    describe('inline', () => {
      beforeEach(() => {
        subject.setProps({inline: true});
      });

      it('gives the class name to the field row', () => {
        expect(subject.find('.form-unit .field-row').hasClass('some-field-row')).toBeTruthy();
      });
    });
  });

  describe('labelRowClassName', () => {
    beforeEach(() => {
      subject.setProps({labelRowClassName: 'some-label-row', label: 'some label'});
    });

    describe('not inline', () => {
      it('gives the class name to the label row', () => {
        expect(subject.find('.form-unit .label-row').hasClass('some-label-row')).toBeTruthy();
      });
    });

    describe('inline', () => {
      beforeEach(() => {
        subject.setProps({inline: true});
      });

      it('gives the class name to the label row', () => {
        expect(subject.find('.form-unit .label-row').hasClass('some-label-row')).toBeTruthy();
      });
    });
  });

  it('does not has the has-error class', () => {
    expect(subject.find('.form-unit').hasClass('has-error')).toBeFalsy();
  });

  it('renders the given class name', () => {
    expect(subject.find('.form-unit').hasClass('my-class')).toBeTruthy();
  });

  describe('when there is no tooltip', () => {
    beforeEach(() => {
      subject.setProps({
        label: 'Some label',
        tooltip: null
      });
    });

    it('does not render a tooltip', () => {
      expect(subject.find('.form-unit .label-row').text()).toContain('Some label');
      expect(subject.find('.form-unit .label-row .tooltip').exists()).toBeFalsy();
    });
  });

  describe('when there is no help block', () => {
    beforeEach(() => {
      subject.setProps({help: null});
    });

    it('renders an empty div', () => {
      expect(subject.find('.form-unit div.help-row').text()).toBe('');
    });
  });

  describe('when hasError is true', () => {
    beforeEach(() => {
      subject.setProps({hasError: true});
    });

    it('applies the has-error class', () => {
      expect(subject.find('.form-unit').hasClass('has-error')).toBeTruthy();
    });

    it('removes the type-dark-5 class from the help block', () => {
      expect(subject.find('.form-unit .help-row').hasClass('type-dark-5')).toBeFalsy();
    });
  });

  describe('when there is no label, children, or help block', () => {
    beforeEach(() => {
      subject.setProps({label: null, children: null, help: null});
    });

    it('renders nothing', () => {
      expect(subject.find('.form-unit').exists()).toBeFalsy();
    });
  });
});