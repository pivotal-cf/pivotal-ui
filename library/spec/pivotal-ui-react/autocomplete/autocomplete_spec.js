require('../spec_helper');

describe('Autocomplete', function() {
  var Autocomplete, AutocompleteInput, pickSpy, subject, onInitializeItems;
  beforeEach(function() {
    var Cursor = require('pui-cursor');
    Cursor.async = false;

    onInitializeItems = (cb) => { cb(['watson', 'coffee', 'advil', 'water lilies']); };
    Autocomplete = require('../../../src/pivotal-ui-react/autocomplete/autocomplete').Autocomplete;
    AutocompleteInput = require('../../../src/pivotal-ui-react/autocomplete/autocomplete').AutocompleteInput;
    pickSpy = jasmine.createSpy('pick');
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
    jasmine.clock().tick(1);
  });

  it('renders', function() {
    ReactDOM.render(<Autocomplete />, root);
    expect('.autocomplete').toExist();
  });

  describe('when maxItems is provided', function() {
    it('caps length of displayed list', function() {
      subject = ReactDOM.render(
        <Autocomplete {...{
          onPick: pickSpy,
          onInitializeItems,
          maxItems: 2
        } }/>,
        root
      );
      jasmine.clock().tick(1);

      subject.showList();
      expect('.autocomplete-item').toHaveLength(2);
    });
  });

  describe('when the user starts to type into the input', function() {
    var context;

    beforeEach(function() {
      class Context extends React.Component {
        constructor(props, context) {
          super(props, context);
          this.state = {onInitializeItems};
        }

        render() {
          return (
            <Autocomplete onPick={pickSpy} onInitializeItems={this.state.onInitializeItems}/>
          );
        }
      }

      context = ReactDOM.render(<Context/>, root);
      jasmine.clock().tick(1);

      $('.autocomplete input').val('wat').simulate('change');
    });

    it('renders the list', function() {
      expect('.autocomplete-list').toExist();
      expect('.autocomplete-list').toContainText('watson');
      expect('.autocomplete-list').toContainText('water lilies');
    });

    it('auto-selects the first item', function() {
      expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
    });

    describe('when the user attempts to re-initialize the searchable items', function() {
      beforeEach(function() {
        context.setState({onInitializeItems: (done) => done([])});
      });

      it('does not actually let you change the list', function() {
        expect('.autocomplete-list').toContainText('watson');
        expect('.autocomplete-list').toContainText('water lilies');
        expect('.autocomplete-list').not.toContainText('coffee');
        expect('.autocomplete-list').not.toContainText('advil');
        expect(subject.state.suggestedValues).toEqual([{value: 'watson'}, {value: 'water lilies'}]);
        expect(subject.state.searchableItems).toEqual(['watson', 'coffee', 'advil', 'water lilies']);
      });
    });

    describe('when the blur event is triggered', function() {
      beforeEach(function(done) {
        jasmine.clock().uninstall();
        $('.autocomplete input').simulate('blur');
        setTimeout(function() { done(); }, 100);
      });

      afterEach(function() {
        jasmine.clock().install();
      });

      it('hides the list', function() {
        expect('.autocomplete-list').not.toExist();
      });
    });

    describe('when the tab key is pressed', function() {
      beforeEach(function() {
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.TAB_KEY});
      });

      it('hides the list', function() {
        expect('.autocomplete-list').not.toExist();
      });

      it('calls the autocomplete callback', function() {
        expect(pickSpy).toHaveBeenCalledWith({value: 'watson'});
      });
    });

    describe('when the enter key is pressed', function() {
      beforeEach(function() {
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ENTER_KEY});
      });

      it('hides the list', function() {
        expect('.autocomplete-list').not.toExist();
      });

      it('calls the autocomplete callback', function() {
        expect(pickSpy).toHaveBeenCalledWith({value: 'watson'});
      });
    });

    describe('when the user tries to apply a selection that is not in the list', function() {
      beforeEach(function() {
        $('.autocomplete input').val('does not exist').simulate('change').simulate('keyDown', {keyCode: AutocompleteInput.ENTER_KEY});
      });

      it('calls autocomplete callback with the value of the input', function() {
        expect(pickSpy).toHaveBeenCalledWith({value: 'does not exist'});
      });
    });

    describe('when one of the autocomplete items is the currently selected option', function() {
      beforeEach(function() {
        subject = ReactDOM.render(
          <Autocomplete {...{
            onPick: pickSpy,
            onInitializeItems,
            selectedSuggestion: 'watson'
          } }/>,
          root
        );

        jasmine.clock().tick(1);

        $('.autocomplete input').val('wat').simulate('change');
      });

      it('sets the selected class to the autocomplete item', function() {
        expect('.autocomplete-item:eq(0)').toHaveClass('selected');
      });
    });

    describe('when the escape key is pressed', function() {
      beforeEach(function() {
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ESC_KEY});
      });

      it('hides the list', function() {
        expect('.autocomplete-list').not.toExist();
      });
    });

    describe('when the down key is pressed', function() {
      beforeEach(function() {
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.DOWN_KEY});
      });

      it('adds highlighted class to the next autocomplete item', function() {
        expect('.autocomplete-item:eq(0)').not.toHaveClass('highlighted');
        expect('.autocomplete-item:eq(1)').toHaveClass('highlighted');
      });

      describe('when the up key is pressed', function() {
        beforeEach(function() {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
        });

        it('adds highlighted class to the first autocomplete item', function() {
          expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
          expect('.autocomplete-item:eq(1)').not.toHaveClass('highlighted');
        });

        describe('when the up key is pressed again', function() {
          beforeEach(function() {
            $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
          });

          it('unhighlights any autocomplete suggestions', function() {
            expect('.autocomplete-item.highlighted').not.toExist();
          });
        });
      });
    });

    describe('when the up key is pressed', function() {
      beforeEach(function() {
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
      });

      it('clears the selection', function() {
        expect('.autocomplete-item.highlighted').not.toExist();
      });

      describe('when the up key is pressed again', function() {
        beforeEach(function() {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
        });

        it('does not break the down key', function() {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.DOWN_KEY});
          expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
        });
      });
    });

    describe('when the down key is pressed while the list is closed', function() {
      beforeEach(function() {
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ESC_KEY});
        $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.DOWN_KEY});
      });

      it('opens the list', function() {
        expect('.autocomplete-list').toExist();
      });
    });
  });

  describe('when a initial value is provided', function() {
    beforeEach(function() {
      subject = ReactDOM.render(
        <Autocomplete {...{
          onPick: pickSpy,
          onInitializeItems,
          value: 'advil'
        } }/>,
        root
      );
    });

    it('defaults to that value being selected', function() {
      expect(subject.state.value).toBe('advil');
    });
  });

  describe('when a custom (possibly asynchronous) search function is provided', function() {
    var cb;
    beforeEach(function() {
      var search = (value, callback) => { cb = callback; };
      subject = ReactDOM.render(
        <Autocomplete {...{
          onPick: pickSpy,
          onInitializeItems,
          onSearch: search
        } }/>,
        root
      );

      $('.autocomplete input').val('zo').simulate('change');
    });

    it('uses the custom search instead of the trie', function() {
      cb([{value: 'gonzo'}, {value: 'zonk'}, {value: 'zoo'}, {value: 'zoology'}]);
      expect('.autocomplete-list').toContainText('gonzo');
    });
  });

  describe('when custom props are provided', function() {
    beforeEach(function() {
      ReactDOM.unmountComponentAtNode(root);
      subject = ReactDOM.render(
        <Autocomplete {...{
          onPick: pickSpy,
          onInitializeItems,
          input: (<input className="input-thing"/>),
          disabled: true,
          placeholder: 'Best autocomplete ever...'} }>
          <ul className="my-custom-list"/>
        </Autocomplete>, root);
      jasmine.clock().tick(1);
      subject.showList();
    });

    it('does the right things', function() {
      expect($('.autocomplete input').attr('disabled')).toBe('disabled');
      expect($('.autocomplete input').attr('placeholder')).toBe('Best autocomplete ever...');
      expect('.autocomplete input').toHaveClass('input-thing');
      expect('.my-custom-list').toExist();
      expect('.autocomplete-list').not.toExist();
    });
  });

  describe('when a custom filter function is provided', function() {
    beforeEach(function() {
      subject = ReactDOM.render(
        <Autocomplete {...{
          onPick: pickSpy,
          onInitializeItems,
          onFilter: (stuffs) => stuffs.filter((stuff) => stuff.value.indexOf('e') !== -1 )
        } }/>,
        root
      );
      jasmine.clock().tick(1);

      subject.showList();
    });

    it('filters results', function() {
      expect('.autocomplete-list').not.toContainText('advil');
      expect('.autocomplete-list').toContainText('water lilies');
      expect('.autocomplete-list').toContainText('coffee');
    });
  });

  describe('when an asynchronous onInitializeItems is provided', function() {
    var cb;
    beforeEach(function() {
      ReactDOM.unmountComponentAtNode(root);
      onInitializeItems = (callback) => { cb = callback; };
      subject = ReactDOM.render(<Autocomplete {...{onInitializeItems}}/>, root);
    });

    it('still populates the list properly', function() {
      cb(['a', 'betty', 'c']);
      jasmine.clock().tick(1);
      subject.showList();
      expect('.autocomplete-list').toContainText('betty');
    });
  });
});
