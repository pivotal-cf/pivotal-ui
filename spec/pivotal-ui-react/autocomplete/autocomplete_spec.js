import PropTypes from 'prop-types';
import {Autocomplete, AutocompleteInput} from '../../../src/react/autocomplete';

const simulateKeyDown = (selector, keyCode) => {
  $(selector)[0].dispatchEvent(new KeyboardEvent('keydown', {keyCode, bubbles: true}));
};

describe('Autocomplete', () => {
  let subject, onInitializeItems, pickSpy;

  beforeEach(() => {
    const Cursor = require('pui-cursor');
    Cursor.async = false;

    onInitializeItems = cb =>
      cb([
        {watson: {name: 'watson', age: 4}},
        {coffee: {name: 'coffee', age: 2}},
        {advil: {name: 'advil', age: 5}},
        {'lily.water': {name: 'lily.water', age: 44}},
        {'water lilies': {name: 'water lilies', age: 64}}
      ]);
    pickSpy = jest.fn();
    subject = shallow(
      <Autocomplete {...{
        onInitializeItems,
        onPick: pickSpy
      }} />);
    MockNextTick.next();
    MockPromises.tick();
  });

  it('passes through custom props', () => {
    const CustomInput = ({disabled, placeholder}) => <input className="input-thing" {...{disabled, placeholder}}/>;
    CustomInput.propTypes = {
      disabled: PropTypes.bool,
      placeholder: PropTypes.string
    };
    const CustomList = () => (<ul className="my-custom-list"/>);

    subject = shallow(
      <Autocomplete {...{
        onInitializeItems,
        input: (<CustomInput/>),
        disabled: true,
        placeholder: 'Best autocomplete ever...'
      }}>
        <CustomList/>
      </Autocomplete>);

    MockNextTick.next();
    MockPromises.tick();

    subject.showList();

    expect(subject.find('.autocomplete input').prop('disabled');
    expect(subject.find('.autocomplete input').prop('placeholder')).toBe('Best autocomplete ever...');
    expect(subject.find('.autocomplete input').hasClass('input-thing')).toBeTruthy();
    expect(subject.find('.my-custom-list').exists()).toBeTruthy();
    expect(subject.find('.autocomplete-list').exists()).toBeFalsy();
  });

  describe('when nothing is entered into input and the list is shown with a list of objects')).toBe(() => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      subject = shallow(<Autocomplete {...{onInitializeItems}} />);

      MockNextTick.next();
      MockPromises.tick();

      subject.showList();
    });

    it('renders the list items in order', () => {
      expect('.autocomplete li').toHaveLength(5);
      expect('.autocomplete a:eq(0)'.text()).toBe('watson');
      expect('.autocomplete a:eq(1)'.text()).toBe('coffee');
      expect('.autocomplete a:eq(2)'.text()).toBe('advil');
      expect('.autocomplete a:eq(3)'.text()).toBe('lily.water');
      expect('.autocomplete a:eq(4)'.text()).toBe('water lilies');
    });
  });

  describe('when the user starts to type into the input', () => {
    beforeEach(() => {
      pickSpy.calls.reset();
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').val('wat').simulate('change');
    });

    it('renders the list', () => {
      expect('.autocomplete li').toHaveLength(2);
      expect('.autocomplete a:eq(0)'.text()).toBe('watson');
      expect(subject.find('.autocomplete a:eq(0)').prop('title')).toBe('watson');
      expect('.autocomplete a:eq(1)'.text()).toBe('water lilies');
      expect(subject.find('.autocomplete a:eq(1)').prop('title')).toBe('water lilies');
    });

    it('highlights (but does not select) the first item', () => {
      expect(subject.find('.autocomplete a:eq(0)').hasClass('highlighted')).toBeTruthy();
      expect(subject.find('.autocomplete a:eq(0)').hasClass('selected')).toBeFalsy();
    });

    describe('when the enter key is pressed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.ENTER_KEY);
      });

      it('hides the list', () => {
        expect(subject.find('.autocomplete-list').exists()).toBeFalsy();
      });

      it('calls the autocomplete callback', () => {
        expect(pickSpy).toHaveBeenCalledWith({_key_: 'watson', value: {name: 'watson', age: 4}});
      });
    });

    describe('when the tab key is pressed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.TAB_KEY);
      });

      it('hides the list', () => {
        expect(subject.find('.autocomplete-list').exists()).toBeFalsy();
      });

      it('calls the autocomplete callback', () => {
        expect(pickSpy).toHaveBeenCalledWith({_key_: 'watson', value: {name: 'watson', age: 4}});
      });
    });

    describe('when the escape key is pressed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.ESC_KEY);
      });

      it('hides the list', () => {
        expect(subject.find('.autocomplete-list').exists()).toBeFalsy();
      });
    });

    describe('when the up key is pressed at the beginning of the list', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.UP_KEY);
      });

      it('unhighlights any autocomplete suggestions', () => {
        expect(subject.find('.highlighted').exists()).toBeFalsy();
      });

      describe('when the down key is then pressed', () => {
        beforeEach(() => {
          simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.DOWN_KEY);
        });

        it('adds highlighted class to the first autocomplete item', () => {
          expect(subject.find('.autocomplete-item:eq(0)').hasClass('highlighted')).toBeTruthy();
        });
      });
    });

    describe('when the down key is pressed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.DOWN_KEY);
      });

      it('adds highlighted class to the next autocomplete item', () => {
        expect(subject.find('.autocomplete-item:eq(0)').hasClass('highlighted')).toBeFalsy();
        expect(subject.find('.autocomplete-item:eq(1)').hasClass('highlighted')).toBeTruthy();
      });

      describe('when the up key is then pressed', () => {
        beforeEach(() => {
          simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.UP_KEY);
        });

        it('adds highlighted class to the first autocomplete item', () => {
          expect(subject.find('.autocomplete-item:eq(0)').hasClass('highlighted')).toBeTruthy();
          expect(subject.find('.autocomplete-item:eq(1)').hasClass('highlighted')).toBeFalsy();
        });
      });
    });

    describe('when the down key is pressed while the list is closed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.ESC_KEY);
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.DOWN_KEY);
      });

      it('opens the list', () => {
        expect(subject.find('.autocomplete-list').exists()).toBeTruthy();
      });
    });

    describe('when a click is triggered on the body', () => {
      beforeEach(() => {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);
      });

      it('hides the list', () => {
        expect(subject.find('.autocomplete-list').exists()).toBeFalsy();
      });
    });
  });

  describe('when the user tries to apply a selection that is not in the list', () => {
    beforeEach(() => {
      pickSpy.calls.reset();
      subject.setProps({onPick: pickSpy});
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').val('does not exist').simulate('change');
      simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.ENTER_KEY);
    });

    it('calls autocomplete callback with the value of the input', () => {
      expect(pickSpy).toHaveBeenCalledWith({value: 'does not exist'});
    });
  });

  describe('when one of the autocomplete items is the selected suggestion', () => {
    beforeEach(() => {
      subject.setProps({selectedSuggestion: 'lily.water'});
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');
    });

    it('sets the selected class (but not highlighted) on the autocomplete item', () => {
      expect('.autocomplete a:eq(3)'.text()).toBe('lily.water');
      expect(subject.find('.autocomplete a:eq(3)').hasClass('highlighted')).toBeFalsy();
      expect(subject.find('.autocomplete a:eq(3)').hasClass('selected')).toBeTruthy();
    });
  });

  describe('when there are no suggested autocomplete results', () => {
    describe('when the showNoSearchResultsProp is true', () => {
      beforeEach(() => {
        subject.setProps({showNoSearchResults: true});
        $('input[aria-label="Search"]').val('zzzz').simulate('change');
      });

      it('shows "No Search Results', () => {
        expect(subject.find('.autocomplete-item-no-results').exists()).toBeTruthy();
      });
    });
  });

  describe('when maxItems is provided', () => {
    it('caps length of displayed list', () => {
      subject.setProps({maxItems: 1});
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');

      expect('.autocomplete-list li').toHaveLength(1);
      expect(subject.find('.autocomplete-list li').text()).toBe('watson');
    });
  });

  describe('when a custom filter function is provided', () => {
    it('filters results', () => {
      const containsLetterE = items => items.filter(item => item.value.name.indexOf('e') !== -1);
      subject.setProps({onFilter: containsLetterE});
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');

      expect('.autocomplete-list').not.toContainText('advil');
      expect('.autocomplete-list').not.toContainText('watson');
      expect('.autocomplete-list').toContainText('water lilies');
      expect('.autocomplete-list').toContainText('coffee');
    });
  });

  describe('when custom trieOptions are provided', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      subject = shallow(
        <Autocomplete {...{
          onInitializeItems,
          trieOptions: {splitOnRegEx: /\./}
        }} />);
      MockNextTick.next();
      MockPromises.tick();
      $('.autocomplete input').val('wat').simulate('change');
    });

    it('uses the trieOptions to render the list', () => {
      expect('.autocomplete-list a').toHaveLength(3);
      expect('.autocomplete-list a:eq(0)'.text()).toBe('watson');
      expect(subject.find('.autocomplete-list a:eq(0)').prop('title')).toBe('watson');
      expect('.autocomplete-list a:eq(1)'.text()).toBe('lily.water');
      expect(subject.find('.autocomplete-list a:eq(1)').prop('title')).toBe('lily.water');
      expect('.autocomplete-list a:eq(2)'.text()).toBe('water lilies');
      expect(subject.find('.autocomplete-list a:eq(2)').prop('title')).toBe('water lilies');
    });
  });

  describe('when the values are scalar', () => {
    it('renders and maintains the order', () => {
      ReactDOM.unmountComponentAtNode(root);
      const props = {onInitializeItems: cb => cb(['d', 'a', 'c', 'b'])};
      subject = shallow(<Autocomplete {...props}/>);
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');

      expect(subject.find('.autocomplete-list').text()).toBe('dacb');
      expect('.autocomplete-list a:eq(0)'.text()).toBe('d');
      expect('.autocomplete-list a:eq(1)'.text()).toBe('a');
      expect('.autocomplete-list a:eq(2)'.text()).toBe('c');
      expect('.autocomplete-list a:eq(3)'.text()).toBe('b');
    });
  });

  describe('when an asynchronous onInitializeItems is provided', () => {
    let promise;

    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      let cb;
      const props = {onInitializeItems: callback => cb = callback};
      subject = shallow(<Autocomplete {...props}/>);
      promise = cb(['a', 'b', 'c', 'd']);
      MockNextTick.next();
      MockPromises.tick();
    });

    it('still populates the list properly', () => {
      $('.autocomplete input').simulate('change');
      expect(subject.find('.autocomplete-list').text()).toBe('abcd');
    });

    it('returns the trie', () => {
      promise.then(actual => expect(actual).toBeUndefined());
      MockPromises.tick();
    });
  });

  describe('when a initial value is provided', () => {
    beforeEach(() => {
      subject.setProps({value: 'lily.water'});
    });

    it('defaults to that value being selected', () => {
      expect(subject.state.value).toEqual('lily.water');
    });
  });

  describe('when a custom (possibly asynchronous) search function is provided', () => {
    let cb;
    beforeEach(() => {
      subject.setProps({
        onSearch: (_, callback) => cb = callback
      });
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').val('zo').simulate('change');

      cb([{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}]);
    });

    it('uses that search callback', () => {
      expect(subject.find('.autocomplete-list').text()).toBe('abcd');
    });
  });
});
