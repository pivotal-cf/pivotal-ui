---
title: Accessibility
---

When it comes to building accessible user interfaces, Pivotal UI aims to help designers and engineers wherever it can. Still, there are several guidelines to keep in mind when implementing accessibility, both with and without Pivotal UI.

Some good resources for learning more about accessibility are the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/2008/REC-WCAG20-20081211/), which are the standards by which accessibility is often measured on the web, and the [WCAG Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0), which lists patterns and techniques for meeting each of the WCAG standards.

## Do not rely on color to convey meaning

Be careful of relying solely on color to convey information. If users are not able to distinguish between colors easily, they could miss this information.

For example, an icon changing color from green to red should not be the only indication of an error. In this case, maybe there could be accompanying error text.

## Keep color contrast easy to see

When choosing colors to use for UI elements, we must consider the contrast between text color and the background color behind it. If this contrast is too low, the text will be hard to see over the background.

To measure this, we can calculate the contrast ratio between a foreground color and a background color. Contrast ratios range from 1:1 (same exact colors) to 21:1 (pure black on pure white).

According to [WCAG](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html), a minimum contrast ratio of 4.5:1 achieves level AA compliance for normal-sized text and is recommended to account for users with less-than-perfect vision. See [here](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast) for detailed acceptance criteria and exceptions to this rule.

To ease the process of finding accessible combinations of Pivotal UI colors, use [this tool](/tools/color-contrast).

## Support keyboard navigation

Some users may use the keyboard to navigate through a website, rather than a mouse. For this reason, it should be possible to focus on and active any interactive elements using only the keyboard (buttons, links, inputs, anything clickable).

The easiest way to do this is to use native HTML elements whenever possible, since browsers already understand how to make these elements focusable and accessible to assistive technologies.

For example, do not create a styled `div` element with `onClick` behavior instead of a `button`. A custom interactive element like this will not be keyboard-focusable by default, and it will be much harder to ensure it is exposed to assistive technologies properly.
