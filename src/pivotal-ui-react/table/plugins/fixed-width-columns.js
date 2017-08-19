import classnames from 'classnames';

export const FixedWidthColumns = {
  beforeRenderTableHeader({memo, column}) {
    const {width} = column;
    if (!width) return memo;
    return {
      ...memo,
      className: classnames(memo.className, 'col-fixed'),
      style: {width}
    };
  },

  beforeRenderTableCell({memo}) {
    const {width} = memo;
    if (!width) return memo;
    return {
      ...memo,
      style: {...memo.style, width},
      className: classnames(memo.className, 'col-fixed')
    };
  }
};