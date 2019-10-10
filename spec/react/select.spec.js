import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Select} from '../../src/react/select';

describe('Select', () => {
  let changeSpy;
  beforeEach(() => {
    changeSpy = jest.fn();
    ReactDOM.render(
      <Select className="my-select" value="2" onChange={changeSpy}>
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>
    , root);
  });

  it('renders a stylized select', () => {
    expect('.pui-select select.my-select').toExist();
    expect('.pui-select select option').toHaveLength(2);
  });

  it('renders a chevron_down icon', () => {
    expect('.pui-select .icon .icon-chevron_down').toExist();
  });

  it('calls the onChange when the select changes', () => {
    expect(changeSpy).not.toHaveBeenCalled();
    $('.pui-select select').simulate('change');
    expect(changeSpy).toHaveBeenCalled();
  });
});