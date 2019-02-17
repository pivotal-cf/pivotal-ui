import React from 'react';
import {Grid, FlexCol} from '../../../src/react/flex-grids';
import {FormUnit} from '../../../src/react/forms';
import {colorNames} from '../helpers/colors';

const parseRgb = str => {
  const match = str.match(/rgb\((.*)\)/);
  if (!match) return;
  return match[1].split(/,[ ]*/).map(n => +n);
};

const calculateContrastRatio = (bg, text) => {
  const normalize = val => val < 0.03928 ? val / 12.92 : Math.pow(((val + 0.055) / 1.055), 2.4);
  const toLuminance = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const bgLuminance = toLuminance(bg.map(val => normalize(val / 255)));
  const textLuminance = toLuminance(text.map(val => normalize(val / 255)));
  const lMax = Math.max(bgLuminance, textLuminance);
  const lMin = Math.min(bgLuminance, textLuminance);
  return ((lMax + 0.05) / (lMin + 0.05)).toFixed(2);
};

export default class ColorContrastTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bg: 'bg-white', type: 'type-black', ratio: '21.00'};
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.el) return;
    if (this.state.bg === prevState.bg && this.state.type === prevState.type) return;
    const style = getComputedStyle(this.el, null);
    const bg = parseRgb(style.getPropertyValue('background-color'));
    const text = parseRgb(style.getPropertyValue('color'));
    if (!bg || !text) return;

    // eslint-disable-next-line
    this.setState({ratio: calculateContrastRatio(bg, text)});
  }

  render() {
    const {bg, type, ratio} = this.state;
    const ratioFloat = parseFloat(ratio);

    const compliantText = (compliant, label) => (
      <div>
        <span className="em-high">{label}:</span> {compliant ? 'yes' : 'no'}
      </div>
    );

    return (
      <div className="mbxl">
        <Grid>
          <FlexCol>
            <FormUnit label="Background color" hideHelpRow labelFor="color-contrast-bg">
              <select
                id="color-contrast-bg"
                value={bg}
                onChange={evt => this.setState({bg: evt.target.value})}>
                {colorNames.map(key =>
                  <option {...{key, value: `bg-${key}`}}>{key}</option>)}
              </select>
            </FormUnit>
          </FlexCol>
          <FlexCol>
            <FormUnit label="Text color" hideHelpRow labelFor="color-contrast-text">
              <select
                id="color-contrast-text"
                value={type}
                onChange={evt => this.setState({type: evt.target.value})}>
                {colorNames.map(key =>
                  <option {...{key, value: `type-${key}`}}>{key}</option>)}
              </select>
            </FormUnit>
          </FlexCol>
        </Grid>
        <div className={['mvxl paxl border', bg, type].join(' ')} ref={el => this.el = el}>
          <div>This is normal sample text.</div>
          <div className="h1 mtl">This is large sample text.</div>
        </div>
        <div><span className="em-high">Contrast ratio:</span> {ratio}:1</div>
        {compliantText(ratioFloat >= 3, 'AA (large)')}
        {compliantText(ratioFloat >= 4.5, 'AA')}
        {compliantText(ratioFloat >= 4.5, 'AAA (large)')}
        {compliantText(ratioFloat >= 7, 'AAA')}
      </div>
    );
  }
}