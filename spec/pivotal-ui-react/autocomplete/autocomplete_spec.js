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
    pickSpy = jasmine.createSpy('pick');
    subject = ReactDOM.render(
      <Autocomplete {...{
        onInitializeItems,
        onPick: pickSpy
      }} />, root);
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

    subject = ReactDOM.render(
      <Autocomplete {...{
        onInitializeItems,
        input: (<CustomInput/>),
        disabled: true,
        placeholder: 'Best autocomplete ever...'
      }}>
        <CustomList/>
      </Autocomplete>, root);

    MockNextTick.next();
    MockPromises.tick();

    subject.showList();

    expect('.autocomplete input').toHaveAttr('disabled');
    expect('.autocomplete input').toHaveAttr('placeholder', 'Best autocomplete ever...');
    expect('.autocomplete input').toHaveClass('input-thing');
    expect('.my-custom-list').toExist();
    expect('.autocomplete-list').not.toExist();
  });

  describe('when nothing is entered into input and the list is shown with a list of objects', () => {
    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      subject = ReactDOM.render(<Autocomplete {...{onInitializeItems}} />, root);

      MockNextTick.next();
      MockPromises.tick();

      subject.showList();
    });

    it('renders the list items in order', () => {
      expect('.autocomplete li').toHaveLength(5);
      expect('.autocomplete a:eq(0)').toHaveText('watson');
      expect('.autocomplete a:eq(1)').toHaveText('coffee');
      expect('.autocomplete a:eq(2)').toHaveText('advil');
      expect('.autocomplete a:eq(3)').toHaveText('lily.water');
      expect('.autocomplete a:eq(4)').toHaveText('water lilies');
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
      expect('.autocomplete a:eq(0)').toHaveText('watson');
      expect('.autocomplete a:eq(0)').toHaveAttr('title', 'watson');
      expect('.autocomplete a:eq(1)').toHaveText('water lilies');
      expect('.autocomplete a:eq(1)').toHaveAttr('title', 'water lilies');
    });

    it('highlights (but does not select) the first item', () => {
      expect('.autocomplete a:eq(0)').toHaveClass('highlighted');
      expect('.autocomplete a:eq(0)').not.toHaveClass('selected');
    });

    describe('when the enter key is pressed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.ENTER_KEY);
      });

      it('hides the list', () => {
        expect('.autocomplete-list').not.toExist();
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
        expect('.autocomplete-list').not.toExist();
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
        expect('.autocomplete-list').not.toExist();
      });
    });

    describe('when the up key is pressed at the beginning of the list', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.UP_KEY);
      });

      it('unhighlights any autocomplete suggestions', () => {
        expect('.highlighted').not.toExist();
      });

      describe('when the down key is then pressed', () => {
        beforeEach(() => {
          simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.DOWN_KEY);
        });

        it('adds highlighted class to the first autocomplete item', () => {
          expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
        });
      });
    });

    describe('when the down key is pressed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.DOWN_KEY);
      });

      it('adds highlighted class to the next autocomplete item', () => {
        expect('.autocomplete-item:eq(0)').not.toHaveClass('highlighted');
        expect('.autocomplete-item:eq(1)').toHaveClass('highlighted');
      });

      describe('when the up key is then pressed', () => {
        beforeEach(() => {
          simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.UP_KEY);
        });

        it('adds highlighted class to the first autocomplete item', () => {
          expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
          expect('.autocomplete-item:eq(1)').not.toHaveClass('highlighted');
        });
      });
    });

    describe('when the down key is pressed while the list is closed', () => {
      beforeEach(() => {
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.ESC_KEY);
        simulateKeyDown('.autocomplete input:eq(0)', AutocompleteInput.DOWN_KEY);
      });

      it('opens the list', () => {
        expect('.autocomplete-list').toExist();
      });
    });

    describe('when a click is triggered on the body', () => {
      beforeEach(() => {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', true, true);
        document.documentElement.dispatchEvent(evt);
      });

      it('hides the list', () => {
        expect('.autocomplete-list').not.toExist();
      });
    });
  });

  describe('when the user tries to apply a selection that is not in the list', () => {
    beforeEach(() => {
      pickSpy.calls.reset();
      subject::setProps({onPick: pickSpy});
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
      subject::setProps({selectedSuggestion: 'lily.water'});
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');
    });

    it('sets the selected class (but not highlighted) on the autocomplete item', () => {
      expect('.autocomplete a:eq(3)').toHaveText('lily.water');
      expect('.autocomplete a:eq(3)').not.toHaveClass('highlighted');
      expect('.autocomplete a:eq(3)').toHaveClass('selected');
    });
  });

  describe('when there are no suggested autocomplete results', () => {
    describe('when the showNoSearchResultsProp is true', () => {
      beforeEach(() => {
        subject::setProps({showNoSearchResults: true});
        $('input[aria-label="Search"]').val('zzzz').simulate('change');
      });

      it('shows "No Search Results', () => {
        expect('.autocomplete-item-no-results').toExist();
      });
    });
  });

  describe('when maxItems is provided', () => {
    it('caps length of displayed list', () => {
      subject::setProps({maxItems: 1});
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');

      expect('.autocomplete-list li').toHaveLength(1);
      expect('.autocomplete-list li').toHaveText('watson');
    });
  });

  describe('when a custom filter function is provided', () => {
    it('filters results', () => {
      const containsLetterE = items => items.filter(item => item.value.name.indexOf('e') !== -1);
      subject::setProps({onFilter: containsLetterE});
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
      subject = ReactDOM.render(
        <Autocomplete {...{
          onInitializeItems,
          trieOptions: {splitOnRegEx: /\./}
        }} />, root);
      MockNextTick.next();
      MockPromises.tick();
      $('.autocomplete input').val('wat').simulate('change');
    });

    it('uses the trieOptions to render the list', () => {
      expect('.autocomplete-list a').toHaveLength(3);
      expect('.autocomplete-list a:eq(0)').toHaveText('watson');
      expect('.autocomplete-list a:eq(0)').toHaveAttr('title', 'watson');
      expect('.autocomplete-list a:eq(1)').toHaveText('lily.water');
      expect('.autocomplete-list a:eq(1)').toHaveAttr('title', 'lily.water');
      expect('.autocomplete-list a:eq(2)').toHaveText('water lilies');
      expect('.autocomplete-list a:eq(2)').toHaveAttr('title', 'water lilies');
    });
  });

  describe('when the values are scalar', () => {
    it('renders and maintains the order', () => {
      ReactDOM.unmountComponentAtNode(root);
      const props = {onInitializeItems: cb => cb(['d', 'a', 'c', 'b'])};
      subject = ReactDOM.render(<Autocomplete {...props}/>, root);
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').simulate('change');

      expect('.autocomplete-list').toHaveText('dacb');
      expect('.autocomplete-list a:eq(0)').toHaveText('d');
      expect('.autocomplete-list a:eq(1)').toHaveText('a');
      expect('.autocomplete-list a:eq(2)').toHaveText('c');
      expect('.autocomplete-list a:eq(3)').toHaveText('b');
    });
  });

  describe('when an asynchronous onInitializeItems is provided', () => {
    let promise;

    beforeEach(() => {
      ReactDOM.unmountComponentAtNode(root);
      let cb;
      const props = {onInitializeItems: callback => cb = callback};
      subject = ReactDOM.render(<Autocomplete {...props}/>, root);
      promise = cb(['a', 'b', 'c', 'd']);
      MockNextTick.next();
      MockPromises.tick();
    });

    it('still populates the list properly', () => {
      $('.autocomplete input').simulate('change');
      expect('.autocomplete-list').toHaveText('abcd');
    });

    it('returns the trie', () => {
      promise.then(actual => expect(actual).toBeUndefined());
      MockPromises.tick();
    });
  });

  describe('when a initial value is provided', () => {
    beforeEach(() => {
      subject::setProps({value: 'lily.water'});
    });

    it('defaults to that value being selected', () => {
      expect(subject.state.value).toEqual('lily.water');
    });
  });

  describe('when a custom (possibly asynchronous) search function is provided', () => {
    let cb;
    beforeEach(() => {
      subject::setProps({
        onSearch: (_, callback) => cb = callback
      });
      MockNextTick.next();
      MockPromises.tick();

      $('.autocomplete input').val('zo').simulate('change');

      cb([{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}]);
    });

    it('uses that search callback', () => {
      expect('.autocomplete-list').toHaveText('abcd');
    });
  });
});
