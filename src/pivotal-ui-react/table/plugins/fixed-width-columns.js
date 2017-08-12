import classnames from 'classnames';

export const FixedWidthColumns = {
  beforeRenderTableHeader({column, memo}) {
    let {width} = column;
    if (!width) return memo;
    return {
      ...memo,
      className: classnames(memo.className, 'col-fixed'),
      style: {width}
    };
  },

  beforeRenderCell({memo}) {
    const {width} = memo;
    if (!width) return memo;
    return {
      ...memo,
      style: {...memo.style, width},
      cellClass: classnames(memo.cellClass, 'col-fixed')
    };
  }
};