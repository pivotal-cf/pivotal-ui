// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {Grid, FlexCol} from '../flex-grids';
import {Icon} from '../iconography';

export class TextFilter extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    filter: PropTypes.func.isRequired,
    renderFilteredData: PropTypes.func.isRequired
  };

  static defaultProps = {
    data: [],
    filter: data => data,
    renderFilteredData: () => null
  };

  constructor(props) {
    super(props);

    this.state = {filterText: ''};
    this.onFilterTextChange = this.onFilterTextChange.bind(this);
  }

  onFilterTextChange({target: {value}}) {
    this.setState({filterText: value});
  }

  render() {
    const {data, filter, renderFilteredData, className} = this.props;
    const {filterText} = this.state;
    const filteredData = filter(data, filterText);

    return (
      <div className="text-filter">
        <Grid {...{className}}>
          <FlexCol className="pan" fixed contentAlignment="middle">
            <Icon src="filter_list"/>
          </FlexCol>
          <FlexCol className="pan">
            <input placeholder="Filter..." type="text" value={filterText} onChange={this.onFilterTextChange}/>
          </FlexCol>
          <FlexCol className="pan text-filter-counts" fixed alignment="middle">
              <span className="filtered-count">{filteredData.length}
              </span> / <span className="unfiltered-count">{data.length}</span>
          </FlexCol>
        </Grid>
        {renderFilteredData(filteredData)}
      </div>
    );
  }
}