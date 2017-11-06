import '../spec_helper';
import {TextFilter} from '../../../src/react/text-filter';

describe('TextFilter', () => {
  let data, filter, onFilter;

  beforeEach(() => {
    data = ['apple', 'banana', 'actuator'];
    filter = jasmine.createSpy('filter').and.returnValue(data);
    onFilter = jasmine.createSpy('onFilter')
      .and.returnValue(<ul>{data.map((v, i) => <li key={i}>{v}</li>)}</ul>);
    ReactDOM.render(<TextFilter {...{
      data,
      filter,
      onFilter
    }}/>, root);
  });

  it('renders a filter icon', () => {
    expect('.text-filter > .grid .col:eq(0)').toHaveClass('col-fixed');
    expect('.text-filter > .grid .col:eq(0) svg.icon-filter_list').toExist();
  });

  it('renders a text input', () => {
    expect('.text-filter > .grid .col:eq(1) input').toExist();
    expect('.text-filter > .grid .col:eq(1) input').toHaveAttr('value', '');
  });

  it('renders the count column', () => {
    expect('.text-filter > .grid .col:eq(2)').toHaveClass('col-fixed');
    expect('.text-filter > .grid .col:eq(2)').toHaveText(`${data.length} / ${data.length}`);
  });

  it('renders the unfiltered count', () => {
    expect('.text-filter > .grid .col:eq(2) .unfiltered-count').toHaveText(data.length);
  });

  it('filters the data', () => {
    expect(filter).toHaveBeenCalledWith(data, '');
  });

  it('renders the filtered count', () => {
    expect('.text-filter > .grid .col:eq(2) .filtered-count').toHaveText(data.length);
  });

  it('calls the onFilter callback', () => {
    expect(onFilter).toHaveBeenCalledWith(data);
  });

  it('renders the filtered object', () => {
    expect($('.text-filter > ul li').length).toBe(3);
    expect('.text-filter > ul li:eq(0)').toHaveText('apple');
    expect('.text-filter > ul li:eq(1)').toHaveText('banana');
    expect('.text-filter > ul li:eq(2)').toHaveText('actuator');
  });

  describe('when entering filter text', () => {
    let filtered;

    beforeEach(() => {
      filtered = ['apple', 'actuator'];
      filter.and.returnValue(filtered);
      onFilter.and.returnValue(<ul>{filtered.map((v, i) => <li key={i}>{v}</li>)}</ul>);
      $('input').val('a').simulate('change');
    });

    it('renders the text in the input field', () => {
      expect('input').toHaveAttr('value', 'a');
    });

    it('filters the data', () => {
      expect(filter).toHaveBeenCalledWith(data, 'a');
    });

    it('displays the correct filtered count', () => {
      expect('.text-filter > .grid .col:eq(2) .filtered-count').toHaveText(filtered.length);
      expect('.text-filter > .grid .col:eq(2)').toHaveText(`${filtered.length} / ${data.length}`);
    });

    it('calls the onFilter callback', () => {
      expect(onFilter).toHaveBeenCalledWith(filtered);
    });

    it('renders the filtered object', () => {
      expect($('.text-filter > ul li').length).toBe(2);
      expect('.text-filter > ul li:eq(0)').toHaveText('apple');
      expect('.text-filter > ul li:eq(1)').toHaveText('actuator');
    });
  });
});