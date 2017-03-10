<a name="8.0.0"></a>
## 8.0.0 (2017-03-10)

### Bug Fixes

### Features
* **8 point grid system:** Many components have been refactored to fit the grid system described in this [blog](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632#.zh2d886gl)

* **Accordion/Collapse:** Redesigned to 8 point standard. Replaced <h5> tag in panel heading with class .panel-title.
* **Buttons:** Redesigned to 8 point standard.
* **Dropdown:** Redesigned to 8 point standard. CSS solution is truly CSS-only. Added size option. Added floatMenu option to React component to give explicit control over whether menu is floating.
* **Forms:** Redesigned to 8 point standard. Custom icons fixed to 18px by 18px.
* **Iconography:** Wrapping element for Icons were changed from span to div. Added spinner SVGs in three different sizes; sm, md, lg. The spinners can be used in Icons.
  You can then attach a spinner icon in a button.
* **Links:** Link animation speed changed from 300ms to 150ms.
* **Modals:** Redesigned to 8 point standard. Replaced close image with SVG. Replaced modal body wrapping <p> tag with .modal-body class.
  Removed bootstrap influence from modals styling.
* **Panels:** Redesigned to 8 point standard.
* **Tables:** Redesigned to 8 point standard. Added flex-grid-driven table in addition to standard HTML table (both React and CSS).
  Added border and hover modifier classes for CSS only tables.
* **Tabs:** Redesigned to 8 point standard.
* **Tooltips:** Redesigned to 8 point standard. Added a TooltipTrigger React component that uses a different rendering strategy from OverlayTrigger.
    Added dark and light themes to both TooltipTrigger and OverlayTrigger. CSS solution for tooltip is truly CSS-only. Added three sizes to tooltips (sm, md, lg).
* **Typography:** Redesigned to 8 point standard.

### Breaking Changes

* **Buttons:** The .button class has been replaced by the .btn class. All <button> tags now require the .btn class to be styled.
* **Dropdowns:** CSS version has new structure and classes, see style guide. The small size has been removed. The following changes have been made to the React component:
    * The pullRight option has been replaced with the menuAlign option to accommodate the ability to pull left.
    * The border option has been removed.
    * The toggle option has been replaced with by the icon option.
    * The menuCaret option has been renamed to showIcon for clarity.
* **Forms:** The following classes have been removed: .checkbox-inline, .radio-inline, .inline-labels, and .unstyled.
* **Iconography:** The .svgicon class has been replaced by the .icon class. The .svg-baseline and .svg-middle classes have been replaced by .icon-baseline and .icon-middle classes.
* **Tables:** The following CSS classes have been removed: .table-data, .table-key-value, .table-striped, and .table-light. The variously-sized scrollable tables classes have been removed: .table-scrollable-sm, .table-scrollable-md, and .table-scrollable-lg.
    Scrollable tables now have a default max height of 164px.
* **Tooltips:** The CSS version no longer relies on bootstrap. CSS version has new structure and classes, see style guide.

### Deprecated

* **Panels:** The following types of panels are deprecated: simple, basic alt, panel title, highlight panel, alternate, shadow, card, and clickable.
* **Tabs:** The following types of tabs are deprecated: simple alt tabs and images tabs
* **Typography:** h1.title

