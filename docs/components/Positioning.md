---
title: Positioning
menu: modifiers
cssPath: pivotal-ui/css/positioning
---

# Overview

The `Positioning` component provides CSS rules for the following attributes:
* display
* float
* position

# Examples

```html
::title=Floats
<div class="txt-c">
  <div class="float-left">floating left</div>
  <div class="float-right">floating right</div>
  <div>not floating</div>
</div>
```

```html
::title=Position Absolute
<div style="border: 2px solid #0074d9;
            color: #0074d9;
            padding: 20px;">
    Parent element
    <div class="position-absolute"
         style="border: 1px dotted #000;
                background-color: #eee;
                padding: 20px;
                color: #000;">
       Child element
    </div>
</div>
```

```html
::title=Position Relative
<div class="position-relative"
     style="color: white;
            padding: 70px;
            background-color: #0074d9;">
    Parent element
    <div class="position-absolute"
         style="background-color: rgba(0,0,0,.3);
                padding: 20px;
                color: rgba(255,255,255,.4);
                bottom: 0;
                left: 0;
                right: 0;">
       Child element
    </div>
</div>
```

```html
::title=Position Fixed
::description=This example places a green box in the bottom-right corner of this page.
<div class="position-fixed"
     style="background-color: green;
            opacity: .85;
            padding: 20px;
            color: white;
            right: 0;
            bottom: 0;">
   I am fixed!
</div>
```

```html
::title=Display Flex
<div class="display-flex">
    <div style="background-color: #aaa; flex: 1;">child1</div>
    <div style="background-color: #ccc; flex: 2;">child2</div>
    <div style="background-color: #eee; flex: 3;">child3</div>
</div>
```

```html
::title=Display Block
<span style="background-color: #aaa;" class="display-block">
    This span tag takes up all available width
</span>
```

```html
::title=Display Inline
<div style="background-color: #aaa;" class="display-inline">
    This div tag takes up only the space it needs
</div>
```

```html
::title=Display Inline-Block
<div style="background-color: #aaa; width: 600px" class="display-inline-block">
    This div tag takes up a fixed amount of space (600px)
</div>
```

```html
::title=Display None
<div>
    The div below this text has been hidden with the "display-none" class.
    <div class="display-none">
        This div is hidden!
    </div>
</div>
```