# Panels

## Description

Using Panel, you can organize information collections into logical groups, aggregate your
content and show it context specific. A selective content can be easily gathered together and
redistributed as a “deck” of related information. See it in action here:

## Anatomy

1. *Panel Header:* The panel header should be used to identify the grouped content within the panel body. It can
contain actions and metadata that are contextual to the information presented.
    1. *Panel Header Left:* Typically reserved for a header and subheader. Can be wider than 50%.
    1. *Panel Header Right:* Typically reserved for metadata or CTAs. Can be wider than 50%.
1. *Panel Body:* The panel body has no opinion on style or layout. You can put in there anything you'd
like, though be mindful of length and complexity of content, as a table layout / list-group might work better.
1. *Panel Footer:* The panel footer should be used to contain secondary or tertiary metadata that is
contextual to the information contained within the panel body.
    1. *Panel Footer Left:* Typically reserved for metadata or CTAs. Can be wider than 50%.
    1. *Panel Footer Right:* Typically reserved for metadata or CTAs. Can be wider than 50%.

## Do's

- Use a panel to logically group content that has the following form: header, body, and/or footer.
- Use multiple panels or list-group inside to group a collection of related content objects.
- Distinguish between primary and secondary CTAs in the header and footer (e.g., primary vs secondary buttons).

## Don'ts

- Use a panel as a generic wrapping element. Instead, avail yourself of the various background color modifiers we have.
- Overload the panel header with too many calls to action.
- Use a panel when screen real estate is valuable, instead consider a table layout or grouped-list.

## Variants

```jsx
<div>
    <Panel> Panel </Panel>
    <br/>
    <BasicPanel> BasicPanel </BasicPanel>
    <br />
</div>
```
