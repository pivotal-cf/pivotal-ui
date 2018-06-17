---
title: Colors
menu: modifiers
cssPath: pivotal-ui/css/colors
---

# Overview

Use color modifiers to to give elements background and text colors drawn from the Pivotal UI color palette.

Our color palette is composed of several different colors. At any given point it captures the current
evolution of our design and likely includes old and new colors. Whenever possible, evolve the old
colors rather than adding new ones.

## Classes

The full list of colors can be found [here](/colors/palette).

Prepend any color name with `bg-` to apply that color to an element's background.

Prepend any color name with `type-` to apply that color to an element's text.

# Palette

```jsx
::noToolbar

<TextFilter {...{
  className: 'mhl',
  filterPlaceholderText: 'Search colors...',
  data: Object.keys(colorPalette).reduce((memo, key) => [
    ...memo,
    ...colorPalette[key].map(number => `${key}-${number}`)
  ], []),
  emptyState: (
    <Grid className="border mtxl txt-c">
      <FlexCol className="paxl">No matching colors</FlexCol>
    </Grid>
  ),
  filter: (colorNames, filterText) => colorNames.filter(iconName => iconName.indexOf(filterText.toLowerCase()) > -1),
  renderFilteredData: colorNames => (
    <div className="border mtxl">
      {colorNames.map(colorName => {
        return (
          <Grid key={colorName} className="maxl">
            <FlexCol className={`bg-${colorName}`}/>
            <FlexCol className="pal txt-c">{colorName}</FlexCol>
            <FlexCol className="pal txt-c"><code>bg-{colorName}</code></FlexCol>
            <FlexCol className="pal txt-c"><code>type-{colorName}</code></FlexCol>
          </Grid>
        );
      })}
    </div>
  )
}}/>
```

# Accessibility

## Contrast ratio

When choosing colors to use for UI elements, one important factor to keep in mind is the contrast between text color and the background color behind it. If this contrast is too low, the text will be hard to see over the background.

To quantify and measure this, we can calculate the contrast ratio between a foreground color and a background color. Contrast ratios range from 1:1 (same exact colors) to 21:1 (pure black on pure white).

According to [WCAG](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html), a minimum contrast ratio of 4.5:1 achieves level AA compliance and is recommended to account for users with less-than-perfect vision. See [here](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&showtechniques=143#contrast-minimum) for detailed acceptance criteria and exceptions to this rule.

To ease the process of finding accessible combinations of Pivotal UI colors, you can use this tool:

```jsx
::noToolbar

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

const colorNames = Object.keys(colorPalette).reduce((memo, key) => [
    ...memo,
    ...colorPalette[key].map(number => `${key}-${number}`)
  ], []);

class ContrastRatio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {bg: 'bg-neutral-11', type: 'type-neutral-1', ratio: '14.74'};
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.el) return;
    if (this.state.bg === prevState.bg && this.state.type === prevState.type) return;
    const style = getComputedStyle(this.el, null);
    const bg = parseRgb(style.getPropertyValue('background-color'));
    const text = parseRgb(style.getPropertyValue('color'));
    if (!bg || !text) return;
    this.setState({ratio: calculateContrastRatio(bg, text)});
  }

  render() {
    const {bg, type, ratio} = this.state;
    const aaCompliant = parseFloat(ratio) >= 4.5;

    return (
      <div>
        <Form>
          <FormRow>
            <FormCol label="Background color" hideHelpRow>
              <select value={bg} onChange={evt => this.setState({bg: evt.target.value})}>
                {colorNames.map(key =>
                  <option {...{key, value: `bg-${key}`}}>bg-{key}</option>)}
              </select>
            </FormCol>
            <FormCol label="Text color" hideHelpRow>
              <select value={type} onChange={evt => this.setState({type: evt.target.value})}>
                {colorNames.map(key =>
                  <option {...{key, value: `type-${key}`}}>type-{key}</option>)}
              </select>
            </FormCol>
          </FormRow>
        </Form>
        <div className={['paxl border', bg, type].join(' ')} ref={el => this.el = el}>
          This is sample text.
        </div>
        <Grid className="mtxl h3">
          <FlexCol>
            <span className="em-high">Contrast ratio:</span> {ratio}:1
          </FlexCol>
          <FlexCol fixed>
            <span className="em-high">AA compliant:</span> {aaCompliant ? 'yes' : 'no'}
          </FlexCol>
        </Grid>
      </div>
    );
  }
}

<ContrastRatio/>
```