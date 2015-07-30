require('../spec_helper');

import {ListItem} from '../../../src/pivotal-ui-react/lists/lists';
import {StreamList} from '../../../src/pivotal-ui-react/stream-list/stream-list';
import {itPropagatesAttributes} from '../support/shared_examples';
import EventEmitter from 'node-event-emitter';

describe('StreamList', () => {
  afterEach(() => {
    React.unmountComponentAtNode(root);
  });

  describe('initial render', () => {
    const props = {
      className: 'my-stream-list-class',
      id: 'my-stream-list-id',
      style: {
        opacity: '0.5'
      }
    };

    beforeEach(() => {
      const streamList = (
        <StreamList {...props} singularNewItemText="new thing" pluralNewItemsText="new things">
          <ListItem>Item a</ListItem>
          <ListItem>Item b</ListItem>
          <ListItem>Item c</ListItem>
        </StreamList>
      );
      React.render(streamList, root);
    });


    it('renders a group list', () => {
      expect('#root .list-group').toExist();
      expect('#root .list-group li.list-group-item').toHaveLength(3);
    });

    itPropagatesAttributes('#root .list-group', props);

    it('displays the list items in reverse order', () => {
      expect('#root .list-group li:eq(0)').toHaveText('Item c');
      expect('#root .list-group li:eq(1)').toHaveText('Item b');
      expect('#root .list-group li:eq(2)').toHaveText('Item a');
    });
  });

  describe('when a new item is added to the list', () => {
    let streamListExample, addData;

    beforeEach(() => {
      addData = new EventEmitter();

      const StreamListExample = React.createClass({
        componentDidMount() {
          addData.on('data', datum => {
            const newData = this.state.data.concat([datum]);
            this.setState({data: newData});
          });
        },

        getInitialState() {
          return {data: ['Item a', 'Item b', 'Item c']};
        },

        render() {
          return (<StreamList singularNewItemText="new thing" pluralNewItemsText="new things">
            {this.state.data.map((datum, i) => <ListItem key={i}>{datum}</ListItem>)}
          </StreamList>);
        }
      });

      streamListExample = <StreamListExample/>;
      React.render(streamListExample, root);
    });

    it('adds a New Items button to the top of the list, using the appropriate singular/plural text', () => {
      addData.emit('data', 'Item d');
      expect('#root .list-stream-new-items-btn').toHaveText('1 new thing');
      addData.emit('data', 'Item e');
      expect('#root .list-stream-new-items-btn').toHaveText('2 new things');
      addData.emit('data', 'Item f');
      addData.emit('data', 'Item g');
      expect('#root .list-stream-new-items-btn').toHaveText('4 new things');
    });

    it('does not add any lis', () => {
      addData.emit('data', 'Item d');
      expect('#root .list-group li.list-group-item').toHaveLength(3);
      expect('#root .list-group li:eq(0)').toHaveText('Item c');
      expect('#root .list-group li:eq(1)').toHaveText('Item b');
      expect('#root .list-group li:eq(2)').toHaveText('Item a');
    });

    describe('clicking the New Items button', () => {
      it('displays the new elements', () => {
        addData.emit('data', 'Item d');
        expect('#root .list-stream-new-items-btn').toHaveText('1 new thing');
        $('#root .list-stream-new-items-btn').simulate('click');
        expect('#root .list-group li:eq(0)').toHaveText('Item d');
        expect('#root .list-group li:eq(1)').toHaveText('Item c');
        expect('#root .list-group li:eq(2)').toHaveText('Item b');
        expect('#root .list-group li:eq(3)').toHaveText('Item a');
        expect('#root .list-stream-new-items-btn').not.toExist();

        addData.emit('data', 'Item e');
        addData.emit('data', 'Item f');
        expect('#root .list-stream-new-items-btn').toHaveText('2 new things');
        $('#root .list-stream-new-items-btn').simulate('click');
        expect('#root .list-group li:eq(0)').toHaveText('Item f');
        expect('#root .list-group li:eq(1)').toHaveText('Item e');
        expect('#root .list-group li:eq(2)').toHaveText('Item d');
        expect('#root .list-group li:eq(3)').toHaveText('Item c');
        expect('#root .list-group li:eq(4)').toHaveText('Item b');
        expect('#root .list-group li:eq(5)').toHaveText('Item a');
        expect('#root .list-stream-new-items-btn').not.toExist();

      });
    });
  });
});