require('../spec_helper')
import React from 'react'
import {StreamList, StreamListItem} from 'pui-react-stream-list'
import ReactTestUtils from 'react-addons-test-utils'
import {itPropagatesAttributes} from '../support/shared_examples';
import EventEmitter from 'node-event-emitter';

const addData = new EventEmitter()

class StreamListExample extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {data: ['Item a', 'Item b', 'Item c']}
  }

  componentDidMount() {
    addData.on('data', datum => {
      const newData = this.state.data.concat([datum])
      this.setState({data: newData})
    })
  }

  render() {
    return (<StreamList>
      {this.state.data.map((datum, i) => <StreamListItem key={i}>{datum}</StreamListItem>)}
    </StreamList>)
  }
}

describe('StreamList', () => {
  let subject
  const renderComponent = (props, data) => ReactTestUtils.renderIntoDocument(
    <StreamList {...props}>
      {data.map((datum, i) => <StreamListItem key={i}>{datum}</StreamListItem>)}
    </StreamList>
  )

  describe('initial render', () => {
    const props = {
      className: 'my-stream-list-class',
      id: 'my-stream-list-id',
      style: {
        opacity: '0.5'
      }
    };
    subject = renderComponent(props, ['Item a', 'Item b', 'Item c'])

    itPropagatesAttributes(ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'list-unordered'), props)
  })

  describe('when a new item is added to the list', () => {
    beforeEach(() => {
      subject = ReactTestUtils.renderIntoDocument(<StreamListExample/>)
    })

    it('adds a New Items button to the top of the list, using the appropriate singular/plural text', () => {
      addData.emit('data', 'Item d')
      let listStreamButton = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'list-stream-new-items-btn')

      expect(listStreamButton).toHaveText(' 1 new item')

      addData.emit('data', 'Item e')
      listStreamButton = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'list-stream-new-items-btn')

      expect(listStreamButton).toHaveText(' 2 new items')

      addData.emit('data', 'Item f')
      addData.emit('data', 'Item g')
      listStreamButton = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'list-stream-new-items-btn')

      expect(listStreamButton).toHaveText(' 4 new items')
    })

    it('does not add a new li element', () => {
      addData.emit('data', 'Item d')
      expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'li').length).toEqual(3)
    })

    describe('clicking the New Items button', () => {
      it('displays the new elements', () => {
        addData.emit('data', 'Item d')

        let listStreamButton = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'list-stream-new-items-btn')
        ReactTestUtils.Simulate.click(listStreamButton)
        let liElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'li')

        expect(liElements[0]).toHaveText('Item d')
        expect(liElements[1]).toHaveText('Item c')
        expect(liElements[2]).toHaveText('Item b')
        expect(liElements[3]).toHaveText('Item a')
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'list-stream-new-items-btn').length).toEqual(0)

        addData.emit('data', 'Item e')
        addData.emit('data', 'Item f')

        listStreamButton = ReactTestUtils.findRenderedDOMComponentWithClass(subject, 'list-stream-new-items-btn')
        ReactTestUtils.Simulate.click(listStreamButton)
        liElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(subject, 'li')

        expect(liElements[0]).toHaveText('Item f')
        expect(liElements[1]).toHaveText('Item e')
        expect(liElements[2]).toHaveText('Item d')
        expect(liElements[3]).toHaveText('Item c')
        expect(liElements[4]).toHaveText('Item b')
        expect(liElements[5]).toHaveText('Item a')
        expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(subject, 'list-stream-new-items-btn').length).toEqual(0)
      })
    })
  })
})
