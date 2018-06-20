---
title: Accessibility
menu: concepts
---

# Guidelines

When it comes to building accessible user interfaces, Pivotal UI aims to help designers and engineers wherever it can. Still, there are many guidelines to keep in mind when implementing accessibility, both with and without Pivotal UI.

There are many resources online for learning more about accessibility. Some especially good ones are the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/2008/REC-WCAG20-20081211/), which are the standards by which accessibility is often measured on the web, and the [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0), which lists patterns and techniques for meeting each of the WCAG standards.

## Do not rely on color to convey meaning

Be careful of relying solely on color to convey information. If users are not able to distinguish between colors easily, they could miss this information.

For example, an icon changing color from green to red should not be the only indication of an error. In this case, maybe there could be accompanying error text.

## Keep color contrast easy to see

When choosing colors to use for UI elements, we must consider the contrast between text color and the background color behind it. If this contrast is too low, the text will be hard to see over the background.

To measure this, we can calculate the contrast ratio between a foreground color and a background color. Contrast ratios range from 1:1 (same exact colors) to 21:1 (pure black on pure white).

According to [WCAG](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html), a minimum contrast ratio of 4.5:1 achieves level AA compliance for normal-sized text and is recommended to account for users with less-than-perfect vision. See [here](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast) for detailed acceptance criteria and exceptions to this rule.

To ease the process of finding accessible combinations of Pivotal UI colors, use [this tool](/accessibility/color-contrast-tool).

## Support keyboard navigation

Some users may use the keyboard to navigate through a website, rather than a mouse. For this reason, it should be possible to focus on and active any interactive elements using only the keyboard (buttons, links, inputs, anything clickable).

The easiest way to do this is to use native HTML elements whenever possible, since browsers already understand how to make these elements focusable and accessible to assistive technologies.

For example, do not create a styled `div` element with `onClick` behavior instead of a `button`. A custom interactive element like this will not be keyboard-focusable by default, and it will be much harder to ensure it is exposed to assistive technologies properly.

# Color Contrast Tool

Choose a background color and a text color from Pivotal UI's color palette to calculate the contrast ratio between these colors.

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
    const ratioFloat = parseFloat(ratio);

    const compliantText = (compliant, label) => (
      <FlexCol fixed>
        <span className="em-high">{label}:</span> {compliant ? 'yes' : 'no'}
      </FlexCol>
    );

    return (
      <div className="mbxxxl">
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
        <Grid className="mvl h3">
          <FlexCol>
            <span className="em-high">Contrast ratio:</span> {ratio}:1
          </FlexCol>
          {compliantText(ratioFloat >= 3, 'AA (large)')}
          {compliantText(ratioFloat >= 4.5, 'AA')}
          {compliantText(ratioFloat >= 4.5, 'AAA (large)')}
          {compliantText(ratioFloat >= 7, 'AAA')}
        </Grid>
        <div className={['paxl border', bg, type].join(' ')} ref={el => this.el = el}>
          <div>This is normal sample text.</div>
          <div className="h1 mtl">This is large sample text.</div>
        </div>
      </div>
    );
  }
}

<ContrastRatio/>
```

As defined by [WCAG](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast), the conformance levels measured here are AA and AAA. AAA is a higher standard to meet than AA. Since large text is easier to read than smaller text, the contrast standards are lower for larger text.

- **Level AA (large text) compliance**: For large text, contrast ratio should be at least **3:1**.
- **Level AA compliance**: For regular-sized text, contrast ratio should be at least **4.5:1**.
- **Level AAA (large text) compliance**: For large text, contrast ratio should be at least **4.5:1**.
- **Level AAA compliance**: For regular-sized text, contrast ratio should be at least **7:1**.