import {Autocomplete, AutocompleteInput} from 'pui-react-autocomplete'
import ReactTestUtils from 'react-addons-test-utils'

describe('Autocomplete', () => {
  let subject, onInitializeItems, pickSpy
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
      ])
    pickSpy = jasmine.createSpy('pick')
  })

  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Autocomplete {...props}/>)

  it('passes through custom props', () => {
    const CustomInput = ({disabled, placeholder}) => <input className="input-thing" {...{disabled, placeholder}}/>
    const CustomList = () => (<ul className="my-custom-list"/>)

    subject = ReactTestUtils.renderIntoDocument(
      <Autocomplete {...{
        onInitializeItems,
        input: (<CustomInput/>),
        disabled: true,
        placeholder: 'Best autocomplete ever...'
      } }>
        <CustomList/>
      </Autocomplete>
    )
    MockNextTick.next()
    MockPromises.tick()

    subject.showList()

    const input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
    expect(input).toHaveAttr('disabled')
    expect(input).toHaveAttr('placeholder', 'Best autocomplete ever...')
    expect(input).toHaveClass('input-thing')
    expect(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'my-custom-list')).toExist()
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-list').length).toEqual(0)
  })

  describe('when the user starts to type into the input', () => {
    let input

    beforeEach(() => {
      pickSpy.calls.reset()
      subject = renderComponent({
        onInitializeItems,
        onPick: pickSpy
      })
      MockNextTick.next()
      MockPromises.tick()

      input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
      input.value = 'wat'
      ReactTestUtils.Simulate.change(input)
    })

    it('renders the list', () => {
      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')
      const items = list.getElementsByTagName('a')

      expect(items).toHaveLength(2)
      expect(items[0]).toHaveText('watson')
      expect(items[0]).toHaveAttr('title', 'watson')
      expect(items[1]).toHaveText('water lilies')
      expect(items[1]).toHaveAttr('title', 'water lilies')
    })

    it('highlights (but does not select) the first item', () => {
      const firstItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'a')[0]
      expect(firstItem).toHaveClass('highlighted')
      expect(firstItem).not.toHaveClass('selected')
    })

    describe('when the enter key is pressed', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.ENTER_KEY})
      })

      it('hides the list', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-list')).toHaveLength(0)
      })

      it('calls the autocomplete callback', () => {
        expect(pickSpy).toHaveBeenCalledWith({_key_: 'watson', value: {name: 'watson', age: 4}})
      })
    })

    describe('when the tab key is pressed', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.TAB_KEY})
      })

      it('hides the list', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-list')).toHaveLength(0)
      })

      it('calls the autocomplete callback', () => {
        expect(pickSpy).toHaveBeenCalledWith({_key_: 'watson', value: {name: 'watson', age: 4}})
      })
    })

    describe('when the escape key is pressed', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.ESC_KEY})
      })

      it('hides the list', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-list')).toHaveLength(0)
      })
    })

    describe('when the up key is pressed at the beginning of the list', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.UP_KEY})
      })

      it('unhighlights any autocomplete suggestions', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'highlighted')).toHaveLength(0)
      })

      describe('when the down key is then pressed', () => {
        beforeEach(() => {
          ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.DOWN_KEY})
        })

        it('adds highlighted class to the first autocomplete item', () => {
          const items = ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-item')
          expect(items[0]).toHaveClass('highlighted')
        })
      })
    })

    describe('when the down key is pressed', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.DOWN_KEY})
      })

      it('adds highlighted class to the next autocomplete item', () => {
        const items = ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-item')
        expect(items[0]).not.toHaveClass('highlighted')
        expect(items[1]).toHaveClass('highlighted')
      })

      describe('when the up key is then pressed', () => {
        beforeEach(() => {
          ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.UP_KEY})
        })

        it('adds highlighted class to the first autocomplete item', () => {
          const items = ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-item')
          expect(items[0]).toHaveClass('highlighted')
          expect(items[1]).not.toHaveClass('highlighted')
        })
      })
    })

    describe('when the down key is pressed while the list is closed', () => {
      beforeEach(() => {
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.ESC_KEY})
        ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.DOWN_KEY})
      })

      it('opens the list', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-list').length).toEqual(1)
      })
    })

    describe('when a click is triggered on the body', () => {
      beforeEach(() => {
        const evt = document.createEvent('HTMLEvents')
        evt.initEvent('click', true, true)
        document.documentElement.dispatchEvent(evt)
      })

      it('hides the list', () => {
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'autocomplete-list')).toHaveLength(0)
      })
    })
  })

  describe('when the user tries to apply a selection that is not in the list', () => {
    beforeEach(() => {
      pickSpy.calls.reset()
      subject = renderComponent({
        onInitializeItems,
        onPick: pickSpy
      })
      MockNextTick.next()
      MockPromises.tick()

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
      input.value = 'does not exist'
      ReactTestUtils.Simulate.change(input)
      ReactTestUtils.Simulate.keyDown(input, {keyCode: AutocompleteInput.ENTER_KEY})
    })

    it('calls autocomplete callback with the value of the input', () => {
      expect(pickSpy).toHaveBeenCalledWith({value: 'does not exist'})
    })
  })

  describe('when one of the autocomplete items is the selected suggestion', () => {
    beforeEach(() => {
      subject = renderComponent({
        onInitializeItems,
        selectedSuggestion: 'lily.water'
      })
      MockNextTick.next()
      MockPromises.tick()

      ReactTestUtils.Simulate.change(ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input'))
    })

    it('sets the selected class (but not highlighted) on the autocomplete item', () => {
      const lilyWaterItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'a')[4]
      expect(lilyWaterItem).toHaveText('lily.water')
      expect(lilyWaterItem).not.toHaveClass('highlighted')
      expect(lilyWaterItem).toHaveClass('selected')
    })
  })

  describe('when maxItems is provided', () => {
    it('caps length of displayed list', () => {
      subject = renderComponent({
        onInitializeItems,
        maxItems: 1
      })
      MockNextTick.next()
      MockPromises.tick()

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
      ReactTestUtils.Simulate.change(input)

      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')
      const items = list.getElementsByTagName('a')

      expect(items).toHaveLength(1)
      expect(items[0]).toHaveText('watson')
    })
  })

  describe('when a custom filter function is provided', () => {
    it('filters results', () => {
      const containsLetterE = items => items.filter(item => item.value.name.indexOf('e') !== -1)
      subject = renderComponent({
        onInitializeItems,
        onFilter: containsLetterE
      })
      MockNextTick.next()
      MockPromises.tick()

      ReactTestUtils.Simulate.change(ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input'))

      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')

      expect(list).not.toContainText('advil')
      expect(list).not.toContainText('watson')
      expect(list).toContainText('water lilies')
      expect(list).toContainText('coffee')
    })
  })

  describe('when custom trieOptions are provided', () => {
    let input

    beforeEach(() => {
      subject = renderComponent({
        onInitializeItems,
        trieOptions: {splitOnRegEx: /\./}
      })
      MockNextTick.next()
      MockPromises.tick()

      input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
      input.value = 'wat'
      ReactTestUtils.Simulate.change(input)
    })

    it('uses the trieOptions to render the list', () => {
      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')
      const items = list.getElementsByTagName('a')

      expect(items).toHaveLength(3)
      expect(items[0]).toHaveText('watson')
      expect(items[0]).toHaveAttr('title', 'watson')
      expect(items[1]).toHaveText('lily.water')
      expect(items[1]).toHaveAttr('title', 'lily.water')
      expect(items[2]).toHaveText('water lilies')
      expect(items[2]).toHaveAttr('title', 'water lilies')
    })
  })

  describe('when the values are scalar', () => {
    it('renders', () => {
      subject = renderComponent({
        onInitializeItems: cb => cb(['a', 'b', 'c', 'd'])
      })
      MockNextTick.next()
      MockPromises.tick()

      ReactTestUtils.Simulate.change(ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input'))

      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')

      expect(list).toHaveText('abcd')
    })
  })

  describe('when an asynchronous onInitializeItems is provided', () => {
    it('still populates the list properly', () => {
      let cb
      subject = renderComponent({
        onInitializeItems: callback => cb = callback
      })

      cb(['a', 'b', 'c', 'd'])

      MockNextTick.next()
      MockPromises.tick()

      ReactTestUtils.Simulate.change(ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input'))

      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')

      expect(list).toHaveText('abcd')
    })
  })

  describe('when a initial value is provided', () => {
    beforeEach(() => {
      subject = renderComponent({onInitializeItems, value: 'lily.water'})
    })

    it('defaults to that value being selected', () => {
      expect(subject.state.value).toEqual('lily.water')
    })
  })

  describe('when a custom (possibly asynchronous) search function is provided', () => {
    let cb
    beforeEach(() => {
      subject = renderComponent({
        onInitializeItems,
        onSearch: (_, callback) => cb = callback
      })
      MockNextTick.next()
      MockPromises.tick()

      const input = ReactTestUtils.findRenderedDOMComponentWithTag(subject, 'input')
      input.value = 'zo'
      ReactTestUtils.Simulate.change(input)

      cb([ {value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}])
    })

    it('uses that search callback', () => {
      const list = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'autocomplete-list')
      expect(list).toHaveText('abcd')
    })
  })
})
