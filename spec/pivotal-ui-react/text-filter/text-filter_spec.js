import '../spec_helper';
import {TextFilter} from '../../../src/react/text-filter';

describe('TextFilter', () => {
  let data, filter, renderFilteredData, subject;

  beforeEach(() => {
    data = ['apple', 'banana', 'actuator'];
    filter = jest.fn().and.returnValue(data);
    renderFilteredData = jest.fn()
      .and.returnValue(<ul>{data.map((v, i) => <li key={i}>{v}</li>)}</ul>);
    subject = shallow(<TextFilter {...{
      data,
      filter,
      renderFilteredData
    }}/>);
  });

  it('renders a filter icon', () => {
    expect(subject.find('.text-filter > .grid .col:eq(0)').hasClass('col-fixed')).toBeTruthy();
    expect(subject.find('.text-filter > .grid .col:eq(0) svg.icon-filter_list').exists()).toBeTruthy();
  });

  it('renders a text input', () => {
    expect(subject.find('.text-filter > .grid .col:eq(1) input').exists()).toBeTruthy();
    expect(subject.find('.text-filter > .grid .col:eq(1) input').prop('value')).toBe('');
  });

  it('gives the text input a default placeholder', () => {
    expect(subject.find('.text-filter > .grid .col:eq(1) input').prop('placeholder')).toBe('Filter...');
  });

  it('renders the count column', () => {
    expect(subject.find('.text-filter > .grid .col:eq(2)').hasClass('col-fixed')).toBeTruthy();
    expect('.text-filter > .grid .col:eq(2)'.text()).toBe(`${data.length} / ${data.length}`);
  });

  it('renders the unfiltered count', () => {
    expect('.text-filter > .grid .col:eq(2) .unfiltered-count'.text()).toBe(data.length);
  });

  it('filters the data', () => {
    expect(filter).toHaveBeenCalledWith(data, '');
  });

  it('renders the filtered count', () => {
    expect('.text-filter > .grid .col:eq(2) .filtered-count'.text()).toBe(data.length);
  });

  it('calls the renderFilteredData callback', () => {
    expect(renderFilteredData).toHaveBeenCalledWith(data);
  });

  it('renders the filtered object', () => {
    expect($('.text-filter > ul li').length).toBe(3);
    expect('.text-filter > ul li:eq(0)'.text()).toBe('apple');
    expect('.text-filter > ul li:eq(1)'.text()).toBe('banana');
    expect('.text-filter > ul li:eq(2)'.text()).toBe('actuator');
  });

  describe('when custom placeholder text is given', () => {
    beforeEach(() => {
      subject.setProps({filterPlaceholderText: 'Your text here...'});
    });

    it('gives the text input the custom placeholder', () => {
      expect(subject.find('.text-filter > .grid .col:eq(1) input').prop('placeholder')).toBe('Your text here...');
    });
  });

  describe('when entering filter text', () => {
    let filtered;

    beforeEach(() => {
      filtered = ['apple', 'actuator'];
      filter.and.returnValue(filtered);
      renderFilteredData.and.returnValue(<ul>{filtered.map((v, i) => <li key={i}>{v}</li>)}</ul>);
      $('input').val('a').simulate('change');
    });

    it('renders the text in the input field', () => {
      expect(subject.find('input').prop('value')).toBe('a');
    });

    it('filters the data', () => {
      expect(filter).toHaveBeenCalledWith(data, 'a');
    });

    it('displays the correct filtered count', () => {
      expect('.text-filter > .grid .col:eq(2) .filtered-count'.text()).toBe(filtered.length);
      expect('.text-filter > .grid .col:eq(2)'.text()).toBe(`${filtered.length} / ${data.length}`);
    });

    it('calls the renderFilteredData callback', () => {
      expect(renderFilteredData).toHaveBeenCalledWith(filtered);
    });

    it('renders the filtered object', () => {
      expect($('.text-filter > ul li').length).toBe(2);
      expect('.text-filter > ul li:eq(0)'.text()).toBe('apple');
      expect('.text-filter > ul li:eq(1)'.text()).toBe('actuator');
    });

    describe('when there are no results', () => {
      beforeEach(() => {
        filter.and.returnValue([]);
        subject.setProps({data: []});
      });

      describe('and emptyState is given', () => {
        beforeEach(() => {
          subject.setProps({
            data: [],
            emptyState: (<p id="wompwomp">No results</p>)
          });
        });
        it('renders the emptyState', () => {
          expect(subject.find('#wompwomp').exists()).toBeTruthy();
        });
      });

      describe('and no emptyState is given', () => {
        it('calls the renderFilteredData callback with empty data', () => {
          expect(renderFilteredData).toHaveBeenCalledWith([]);
        });
      });
    });
  });
});