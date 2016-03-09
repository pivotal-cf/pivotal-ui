require('../spec_helper');

describe('Autocomplete', () => {
  let Autocomplete, AutocompleteInput, pickSpy, subject, onInitializeItems;
  beforeEach(() => {
    const Cursor = require('pui-cursor');
    Cursor.async = false;

    Autocomplete = require('../../../src/pivotal-ui-react/autocomplete/autocomplete').Autocomplete;
    AutocompleteInput = require('../../../src/pivotal-ui-react/autocomplete/autocomplete').AutocompleteInput;
    pickSpy = jasmine.createSpy('pick');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
    jasmine.clock().tick(1);
  });

  describe('when the values are objects', () => {
    beforeEach(() => {
      onInitializeItems = (cb) => {
        cb([
          {watson: {name: 'watson', age: 4}},
          {coffee: {name: 'coffee', age: 2}},
          {advil: {name: 'advil', age: 5}},
          {'water lilies': {name: 'water lilies', age: 6}}
        ]);
      };
    });

    it('renders', () => {
      ReactDOM.render(<Autocomplete />, root);
      expect('.autocomplete').toExist();
    });

    describe('when the user starts to type into the input', () => {
      let context;

      beforeEach(() => {
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
        MockPromises.tick();

        $('.autocomplete input').val('wat').simulate('change');
      });

      it('renders the list', () => {
        expect('.autocomplete-list').toExist();
        expect('.autocomplete-list').toContainText('watson');
        expect('.autocomplete-list').toContainText('water lilies');
      });

      describe('when the enter key is pressed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ENTER_KEY});
        });

        it('hides the list', () => {
          expect('.autocomplete-list').not.toExist();
        });

        it('calls the autocomplete callback', () => {
          expect(pickSpy).toHaveBeenCalledWith({_key_: 'watson', value: {name: 'watson', age: 4}});
        });
      });
    });

    describe('when a custom filter function is provided', () => {
      beforeEach(() => {
        subject = ReactDOM.render(
          <Autocomplete {...{
            onPick: pickSpy,
            onInitializeItems,
            onFilter: (stuffs) => stuffs.filter((stuff) => stuff.value.name.indexOf('e') !== -1 )
          } }/>,
          root
        );
        jasmine.clock().tick(1);
        MockPromises.tick();

        subject.showList();
      });

      it('filters results', () => {
        expect('.autocomplete-list').not.toContainText('advil');
        expect('.autocomplete-list').toContainText('water lilies');
        expect('.autocomplete-list').toContainText('coffee');
      });
    });
  });

  describe('when the values are non-objects', () => {
    beforeEach(() => {
      onInitializeItems = (cb) => { cb(['watson', 'coffee', 'advil', 'water lilies']); };
    });

    it('renders', () => {
      ReactDOM.render(<Autocomplete />, root);
      expect('.autocomplete').toExist();
    });

    describe('when maxItems is provided', () => {
      it('caps length of displayed list', () => {
        subject = ReactDOM.render(
          <Autocomplete {...{
            onPick: pickSpy,
            onInitializeItems,
            maxItems: 2
          } }/>,
          root
        );
        jasmine.clock().tick(1);
        MockPromises.tick();

        subject.showList();
        expect('.autocomplete-item').toHaveLength(2);
      });
    });

    describe('when the user starts to type into the input', () => {
      let context;

      beforeEach(() => {
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
        MockPromises.tick();

        $('.autocomplete input').val('wat').simulate('change');
      });

      it('renders the list', () => {
        expect('.autocomplete-list').toExist();
        expect('.autocomplete-list').toContainText('watson');
        expect('.autocomplete-list').toContainText('water lilies');
      });

      it('auto-selects the first item', () => {
        expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
      });

      describe('when the user attempts to re-initialize the searchable items', () => {
        beforeEach(() => {
          context.setState({onInitializeItems: (done) => done([])});
        });

        it('does not actually let you change the list', () => {
          expect('.autocomplete-list').toContainText('watson');
          expect('.autocomplete-list').toContainText('water lilies');
          expect('.autocomplete-list').not.toContainText('coffee');
          expect('.autocomplete-list').not.toContainText('advil');
          expect(subject.state.suggestedValues).toEqual([{value: 'watson'}, {value: 'water lilies'}]);
          expect(subject.state.searchableItems).toEqual(['watson', 'coffee', 'advil', 'water lilies']);
        });
      });

      describe('when the blur event is triggered', () => {
        beforeEach(function(done) {
          jasmine.clock().uninstall();
          $('.autocomplete input').simulate('blur');
          setTimeout(() => { done(); }, 100);
        });

        afterEach(() => {
          jasmine.clock().install();
        });

        it('hides the list', () => {
          MockPromises.tick();
          expect('.autocomplete-list').not.toExist();
        });
      });

      describe('when the tab key is pressed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.TAB_KEY});
        });

        it('hides the list', () => {
          expect('.autocomplete-list').not.toExist();
        });

        it('calls the autocomplete callback', () => {
          expect(pickSpy).toHaveBeenCalledWith({value: 'watson'});
        });
      });

      describe('when the enter key is pressed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ENTER_KEY});
        });

        it('hides the list', () => {
          expect('.autocomplete-list').not.toExist();
        });

        it('calls the autocomplete callback', () => {
          expect(pickSpy).toHaveBeenCalledWith({value: 'watson'});
        });
      });

      describe('when the user tries to apply a selection that is not in the list', () => {
        beforeEach(() => {
          $('.autocomplete input').val('does not exist').simulate('change').simulate('keyDown', {keyCode: AutocompleteInput.ENTER_KEY});
        });

        it('calls autocomplete callback with the value of the input', () => {
          expect(pickSpy).toHaveBeenCalledWith({value: 'does not exist'});
        });
      });

      describe('when one of the autocomplete items is the currently selected option', () => {
        beforeEach(() => {
          subject = ReactDOM.render(
            <Autocomplete {...{
              onPick: pickSpy,
              onInitializeItems,
              selectedSuggestion: 'watson'
            } }/>,
            root
          );

          jasmine.clock().tick(1);
          MockPromises.tick();

          $('.autocomplete input').val('wat').simulate('change');
        });

        it('sets the selected class to the autocomplete item', () => {
          expect('.autocomplete-item:eq(0)').toHaveClass('selected');
        });
      });

      describe('when the escape key is pressed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ESC_KEY});
        });

        it('hides the list', () => {
          expect('.autocomplete-list').not.toExist();
        });
      });

      describe('when the down key is pressed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.DOWN_KEY});
        });

        it('adds highlighted class to the next autocomplete item', () => {
          expect('.autocomplete-item:eq(0)').not.toHaveClass('highlighted');
          expect('.autocomplete-item:eq(1)').toHaveClass('highlighted');
        });

        describe('when the up key is pressed', () => {
          beforeEach(() => {
            $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
          });

          it('adds highlighted class to the first autocomplete item', () => {
            expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
            expect('.autocomplete-item:eq(1)').not.toHaveClass('highlighted');
          });

          describe('when the up key is pressed again', () => {
            beforeEach(() => {
              $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
            });

            it('unhighlights any autocomplete suggestions', () => {
              expect('.autocomplete-item.highlighted').not.toExist();
            });
          });
        });
      });

      describe('when the up key is pressed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
        });

        it('clears the selection', () => {
          expect('.autocomplete-item.highlighted').not.toExist();
        });

        describe('when the up key is pressed again', () => {
          beforeEach(() => {
            $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.UP_KEY});
          });

          it('does not break the down key', () => {
            $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.DOWN_KEY});
            expect('.autocomplete-item:eq(0)').toHaveClass('highlighted');
          });
        });
      });

      describe('when the down key is pressed while the list is closed', () => {
        beforeEach(() => {
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.ESC_KEY});
          $('.autocomplete input').simulate('keyDown', {keyCode: AutocompleteInput.DOWN_KEY});
        });

        it('opens the list', () => {
          expect('.autocomplete-list').toExist();
        });
      });
    });

    describe('when a initial value is provided', () => {
      beforeEach(() => {
        subject = ReactDOM.render(
          <Autocomplete {...{
            onPick: pickSpy,
            onInitializeItems,
            value: 'advil'
          } }/>,
          root
        );
      });

      it('defaults to that value being selected', () => {
        expect(subject.state.value).toBe('advil');
      });
    });

    describe('when a custom (possibly asynchronous) search function is provided', () => {
      let cb;
      beforeEach(() => {
        const search = (value, callback) => { cb = callback; };
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

      it('uses the custom search instead of the trie', () => {
        cb([{value: 'gonzo'}, {value: 'zonk'}, {value: 'zoo'}, {value: 'zoology'}]);
        expect('.autocomplete-list').toContainText('gonzo');
      });

      it('does not set a trie', () => {
        expect(subject.state.trie).toBe(null);
      });
    });

    describe('when custom props are provided', () => {
      beforeEach(() => {
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

      it('does the right things', () => {
        expect($('.autocomplete input').attr('disabled')).toBe('disabled');
        expect($('.autocomplete input').attr('placeholder')).toBe('Best autocomplete ever...');
        expect('.autocomplete input').toHaveClass('input-thing');
        expect('.my-custom-list').toExist();
        expect('.autocomplete-list').not.toExist();
      });
    });

    describe('when a custom filter function is provided', () => {
      beforeEach(() => {
        subject = ReactDOM.render(
          <Autocomplete {...{
            onPick: pickSpy,
            onInitializeItems,
            onFilter: (stuffs) => stuffs.filter((stuff) => stuff.value.indexOf('e') !== -1 )
          } }/>,
          root
        );
        jasmine.clock().tick(1);
        MockPromises.tick();

        subject.showList();
      });

      it('filters results', () => {
        expect('.autocomplete-list').not.toContainText('advil');
        expect('.autocomplete-list').toContainText('water lilies');
        expect('.autocomplete-list').toContainText('coffee');
      });
    });

    describe('when an asynchronous onInitializeItems is provided', () => {
      let cb;
      beforeEach(() => {
        ReactDOM.unmountComponentAtNode(root);
        onInitializeItems = (callback) => { cb = callback; };
        subject = ReactDOM.render(<Autocomplete {...{onInitializeItems}}/>, root);
      });

      it('still populates the list properly', () => {
        cb(['a', 'betty', 'c']);
        jasmine.clock().tick(1);
        MockPromises.tick();
        subject.showList();
        expect('.autocomplete-list').toContainText('betty');
      });
    });
  });
});
