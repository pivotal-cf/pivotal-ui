<a name="7.1.0"></a>
# 7.1.0 (2016-11-08)

### Features

* **Input:** input accepts custom left icon ([24e61b7](https://github.com/pivotal-cf/pivotal-ui/commit/24e61b7))

<a name="7.0.2"></a>
## 7.0.2 (2016-10-28)


### Bug Fixes

* **Dropdowns:** Add missing pui-react-iconography dependency to ([709cd4e](https://github.com/pivotal-cf/pivotal-ui/commit/709cd4e))


<a name="7.0.1"></a>
## 7.0.1 (2016-10-28)


### Bug Fixes

* **Iconography:** Do not break if webpack configuration already loads svgs ([d84fb9a](https://github.com/pivotal-cf/pivotal-ui/commit/d84fb9a))

<a name="7.0.0"></a>
# 7.0.0 (2016-10-11)


### Bug Fixes

* **Alerts:** Use Icon for close button instead of times symbol ([2593a77](https://github.com/pivotal-cf/pivotal-ui/commit/2593a77)), closes [#131832253](https://github.com/pivotal-cf/pivotal-ui/issues/131832253)
* **StreamList:** Fix stream lists with new button design ([c7435ff](https://github.com/pivotal-cf/pivotal-ui/commit/c7435ff)), closes [#131910355](https://github.com/pivotal-cf/pivotal-ui/issues/131910355)

### Features

* **Buttons:** Redesign Buttons ([f64c6bb](https://github.com/pivotal-cf/pivotal-ui/commit/f64c6bb))
* **Dropdowns:** Update dropdown styles ([a8ec9d5](https://github.com/pivotal-cf/pivotal-ui/commit/a8ec9d5))
* **Iconography:** Use inlined SVGs instead of Font Awesome ([652fcc5](https://github.com/pivotal-cf/pivotal-ui/commit/652fcc5))
* **Iconography:** Provide SVG Icon set

### BREAKING CHANGES

* **Forms:** remove fancy forms ([d68515b](https://github.com/pivotal-cf/pivotal-ui/commits/d68515b))
* **Lists:** Remove Checked List ([e5e22bf](https://github.com/pivotal-cf/pivotal-ui/commits/e5e22bf))
* **Iconography:** Iconography Uses SVG instead of Font Awesome. Use `src` prop instead of `name`. ([652fcc5](https://github.com/pivotal-cf/pivotal-ui/commits/652fcc5))
* **Iconography:** Typography color classes no longer change the color of
Icons (you need to change fill instead of color) ([652fcc5](https://github.com/pivotal-cf/pivotal-ui/commits/652fcc5))
* **Typography:** Remove svg fonts ([b9a1b68](https://github.com/pivotal-cf/pivotal-ui/commit/b9a1b68))


<a name="6.0.2"></a>
## 6.0.2 (2016-09-30)


### Bug Fixes

* **copy-to-clipboard:** add missing dependencies for copy-to-clipboard ([a3d9905](https://github.com/pivotal-cf/pivotal-ui/commit/a3d9905))


<a name="6.0.1"></a>
## 6.0.1 (2016-09-29)

### Bug Fixes

* **Dependencies:** Remove react-bootstrap from package.json

<a name="6.0.0"></a>
# 6.0.0 (2016-09-29)

### Bug Fixes

* **BoundingClientRect:** Do not call forceUpdate when not mounted ([2251c6e](https://github.com/pivotal-cf/pivotal-ui/commit/2251c6e)), closes [#131222617](https://github.com/pivotal-cf/pivotal-ui/issues/131222617)

### Features

* **Alert:** Replace React Bootstrap Alert ([aed2dab](https://github.com/pivotal-cf/pivotal-ui/commit/aed2dab))
* **CopyToClipboard:** Add CopyToClipboard and CopyToClipboardButton ([175855a](https://github.com/pivotal-cf/pivotal-ui/commit/175855a))
* **Grid:** Replace React Bootstrap Grid components
* **Modal:** Replace React Bootstrap BsModal and BsModalHeader ([5cc63cf](https://github.com/pivotal-cf/pivotal-ui/commit/5cc63cf))
* **Svg:** creates Svg component ([1ae730d](https://github.com/pivotal-cf/pivotal-ui/commit/1ae730d))
* **Tabs:** Replace React Bootstrap Tab Component ([f944f81](https://github.com/pivotal-cf/pivotal-ui/commit/f944f81))

### Breaking Changes

* **Alert:** dismissable prop is now a boolean only, use the onDismiss prop for callback
* **Modals:** bsSize prop is now size ([abdef50](https://github.com/pivotal-cf/pivotal-ui/commit/abdef50))

<a name="5.4.0"></a>
# 5.4.0 (2016-09-27)


### Bug Fixes

* **Input:** Fix centering of search icon ([43ac690](https://github.com/pivotal-cf/pivotal-ui/commit/43ac690)), closes [#117112819](https://github.com/pivotal-cf/pivotal-ui/issues/117112819)
* **OverlayTrigger:** Do not increase delay of hiding/showing if asked to ([c08e13e](https://github.com/pivotal-cf/pivotal-ui/commit/c08e13e)), closes [#131134283](https://github.com/pivotal-cf/pivotal-ui/issues/131134283)

### Features

* **Autocomplete:** Allow trieOptions to be passed into autocomplete ([17057c1](https://github.com/pivotal-cf/pivotal-ui/commit/17057c1))


<a name="5.3.1"></a>
## 5.3.1 (2016-08-19)

### Bug Fixes

* **dependencies:** Add pui-css-iconography dependency to pui-css-collapse ([b47e53c](https://github.com/pivotal-cf/pivotal-ui/commit/b47e53c))
* **Tables:** Do not change sorted column when adding or removing columns ([e8244ec](https://github.com/pivotal-cf/pivotal-ui/commit/e8244ec)), closes [#128398259](https://github.com/pivotal-cf/pivotal-ui/issues/128398259)

<a name="5.3.0"></a>
# 5.3.0 (2016-08-05)

### Bug Fixes

* **React:** Fix React 15.2+ unknown prop warning ([3f32c49](https://github.com/pivotal-cf/pivotal-ui/commit/3f32c49)), closes [#127357031](https://github.com/pivotal-cf/pivotal-ui/issues/127357031)
* **box-shadows:** Make .box-shadow-x styling !important since they are ([4132e96](https://github.com/pivotal-cf/pivotal-ui/commit/4132e96)), closes [#126327133](https://github.com/pivotal-cf/pivotal-ui/issues/126327133)
* **dependencies:** Add some missing npm dependencies ([3576ccd](https://github.com/pivotal-cf/pivotal-ui/commit/3576ccd)), closes [#127124567](https://github.com/pivotal-cf/pivotal-ui/issues/127124567)
* **ReactBootstrap:** Upgrade React Bootstrap to 0.30.2 to fix React 15.2 warnings

<a name="5.2.1"></a>
## 5.2.1 (2016-06-29)

### Bug Fixes

* **Tabs:** Add back animation prop to Tabs and tabClassName, className to Tab([e009c30](https://github.com/pivotal-cf/pivotal-ui/commit/e009c30)), closes [#122153795](https://github.com/pivotal-cf/pivotal-ui/issues/122153795) [#122153787](https://github.com/pivotal-cf/pivotal-ui/issues/122153787)

<a name="5.2.0"></a>
# 5.2.0 (2016-06-14)

### Features
* **box-shadows:** Add new box-shadow styles
* **modals:** improved style
* **panels:** improved loading animation
* **progress-bars:** improve default style
* **progress-bars:** improve default style and remove automatic red background at 90%

### Bug Fixes

* **collapse:** Add collapsible dependency ([5963f1f](https://github.com/pivotal-cf/pivotal-ui/commit/5963f1f))
* **typography:** include semibold and fix font-weight for bold fonts ([20c14bc](https://github.com/pivotal-cf/pivotal-ui/commit/20c14bc))


<a name="5.1.3"></a>
## 5.1.3 (2016-06-07)


### Bug Fixes

* **table:** do not allow the data property to be added to the table element itself ([efd651b](https://github.com/pivotal-cf/pivotal-ui/commit/efd651b))
* **Tooltips:** Pin tooltips within window if positioned on top/bottom ([d744297](https://github.com/pivotal-cf/pivotal-ui/commit/d744297))



<a name="5.1.3"></a>
## 5.1.3 (2016-06-07)


### Bug Fixes

* **Table:** do not allow the data property to be added to the table element itself ([efd651b](https://github.com/pivotal-cf/pivotal-ui/commit/efd651b))
* **Tooltips:** Pin tooltips within window if positioned on top/bottom ([d744297](https://github.com/pivotal-cf/pivotal-ui/commit/d744297))


<a name="5.1.2"></a>
## 5.1.2 (2016-05-26)


### Bug Fixes

* **DraggableList :** DraggableList fix for IE 10, 11 and Edge ([dc66875](https://github.com/pivotal-cf/pivotal-ui/commit/dc66875))


<a name="5.1.1"></a>
## 5.1.1 (2016-05-20)


### Bug Fixes

* **Dropdowns:** All dropdowns should close on menu click by default ([6f2f7d9](https://github.com/pivotal-cf/pivotal-ui/commit/6f2f7d9))


<a name="5.1.0"></a>
# 5.1.0 (2016-05-17)


### Features

* **Dropdown:** Allow dropdowns to remain open when clicking in the menu ([208197f](https://github.com/pivotal-cf/pivotal-ui/commit/208197f))


<a name="5.0.3"></a>
## 5.0.3 (2016-05-13)


### Bug Fixes

* **Dropdowns:** dropdown button should use type button ([04d4353](https://github.com/pivotal-cf/pivotal-ui/commit/04d4353))


<a name="5.0.2"></a>
## 5.0.2 (2016-04-29)

### Bug Fixes

* **Dropdown:** close dropdown when item is selected ([ed3c6c5](https://github.com/pivotal-cf/pivotal-ui/commit/ed3c6c568dd4f21b3b184a840706831863c67c77))


<a name="5.0.1"></a>
## 5.0.1 (2016-04-22)


### Features

* **Dropdown:** Support passing your own toggle onClick handler ([60bf3a9](https://github.com/pivotal-cf/pivotal-ui/commit/60bf3a9))
* **DropdownItem:** Pass additional props if DropdownItem has an href ([d0afeee](https://github.com/pivotal-cf/pivotal-ui/commit/d0afeee))
* **Radio:** render input before label for more customizable styling ([a969ea3](https://github.com/pivotal-cf/pivotal-ui/commit/a969ea3))


<a name="5.0.0"></a>
# 5.0.0 (2016-04-18)


### Bug Fixes

* **OverlayTrigger:** Remove delayed show/hide callbacks when unmounting ([351162a](https://github.com/pivotal-cf/pivotal-ui/commit/351162a)), closes [#117840795](https://github.com/pivotal-cf/pivotal-ui/issues/117840795)

### Features

* **Dropdown:** React Dropdown does not need a title ([c281cb2](https://github.com/pivotal-cf/pivotal-ui/commit/c281cb2))
* **Dropdown:** Dropdown menu is still in the DOM when hidden ([3c9a40c](https://github.com/pivotal-cf/pivotal-ui/commit/3c9a40c))
* **React:** Upgrade to React 15 ([814e8a1](https://github.com/pivotal-cf/pivotal-ui/commit/814e8a1))
* **ReactBootstrap:** Upgrade React Bootstrap to 0.29 ([96ac378](https://github.com/pivotal-cf/pivotal-ui/commit/96ac378))


<a name="4.0.9"></a>
## 4.0.9 (2016-04-18)


### Bug Fixes

* **Tooltip:** Fix Tooltips in Modals again ([c3f259f](https://github.com/pivotal-cf/pivotal-ui/commit/c3f259f)), closes [#116982039](https://github.com/pivotal-cf/pivotal-ui/issues/116982039)


<a name="4.0.8"></a>
## 4.0.8 (2016-04-09)


### Features

* **panels:** Add panel loading animation, using panel-loading-indicator class ([d9d58f1](https://github.com/pivotal-cf/pivotal-ui/commit/d9d58f1cc8df65f24e5a7f62465b26c36cca4200)) ([89e5938](https://github.com/pivotal-cf/pivotal-ui/commit/89e5938))


<a name="4.0.7"></a>
## 4.0.7 (2016-04-08)


### Bug Fixes

* **tooltips:** Allow tooltips in modals to display correctly ([63b7c25](https://github.com/pivotal-cf/pivotal-ui/commit/63b7c25))


<a name="4.0.6"></a>
## 4.0.6 (2016-03-30)


### Bug Fixes

* **css-all:** Remove unused package that was including old version of pui-css-bootstrap in pui-css-all ([bc6bfec](https://github.com/pivotal-cf/pivotal-ui/commit/bc6bfec)), closes [#116443579](https://github.com/pivotal-cf/pivotal-ui/issues/116443579)


<a name="4.0.5"></a>
## 4.0.5 (2016-03-25)


### Bug Fixes

* **dependencies:** Add missing dependencies to package.jsons ([8bdad36](https://github.com/pivotal-cf/pivotal-ui/commit/8bdad36))


<a name="4.0.4"></a>
## 4.0.4 (2016-03-25)


### Bug Fixes

* **Headers:** Don&#x27;t hardcode all header colors ([e26d03c](https://github.com/pivotal-cf/pivotal-ui/commit/e26d03c)), closes [#378](https://github.com/pivotal-cf/pivotal-ui/issues/378)

<a name="4.0.2"></a>
## 4.0.2 (2016-03-18)

### Bug Fixes

* **dependencies:** Remove duplicate css imports ([bfad6be](https://github.com/pivotal-cf/pivotal-ui/commit/bfad6be)), closes [#115907785](https://github.com/pivotal-cf/pivotal-ui/issues/115907785)
* **Autocomplete:** remove small horizontal margin from autocomplete ([91a83d6](https://github.com/pivotal-cf/pivotal-ui/commit/91a83d6))


<a name="4.0.1"></a>
## 4.0.1 (2016-03-18)

### Bug Fixes

* **Collapse:** Replace React bootstrap panel with pui-react-collapsible ([0f30674](https://github.com/pivotal-cf/pivotal-ui/commit/0f30674))
* **Dropdowns:** Fix CSS loading order of dropdowns ([919911a](https://github.com/pivotal-cf/pivotal-ui/commit/919911a))
* **Tooltip:** Tooltip React component requires Tooltip CSS ([89f638e](https://github.com/pivotal-cf/pivotal-ui/commit/89f638e)), closes [#115876591](https://github.com/pivotal-cf/pivotal-ui/issues/115876591)

### Features

* **Dropdown:** Dropdown accepts `toggle` and `split` attributes ([b7a9c1d](https://github.com/pivotal-cf/pivotal-ui/commit/b7a9c1d))

### Breaking Changes

* **Input:** Input does not render label if it does not exist ([7369043](https://github.com/pivotal-cf/pivotal-ui/commit/73690433babdc7e39396c9781dcf7e2eda94be1f))


<a name="4.0.0"></a>
# 4.0.0 (2016-03-15)

### Bug Fixes

* **autocomplete:** User can select items in safari ([241f882](https://github.com/pivotal-cf/pivotal-ui/commit/241f882))
* **ExpanderContent:** Do not use react bootstrap in ExpanderContent ([6efdab6](https://github.com/pivotal-cf/pivotal-ui/commit/6efdab6))

### Features

* **Checkbox:** Add checkbox react component ([3e19e3d](https://github.com/pivotal-cf/pivotal-ui/commit/3e19e3d))
* **colors:** Change base text color from neutral-3 to dark-2 ([dd4619c](https://github.com/pivotal-cf/pivotal-ui/commit/dd4619c))
* **Components:** Upgrade all React Components to use ES6 Classes ([c22ce0e](https://github.com/pivotal-cf/pivotal-ui/commit/c22ce0e))
* **css-compiling:** use webpack to compile react components&#x27; css ([0e9f60e](https://github.com/pivotal-cf/pivotal-ui/commit/0e9f60e))
* **DropdownItem:** DropdownItem supports custom anchor tag ([442e71a](https://github.com/pivotal-cf/pivotal-ui/commit/442e71a))
* **Inputs:** Consolidate BasicInput and SearchInput into Input ([6598843](https://github.com/pivotal-cf/pivotal-ui/commit/6598843))
* **Input:** Input displays check with success prop ([17bf239](https://github.com/pivotal-cf/pivotal-ui/commit/17bf239))
* **OverlayTrigger:** Replace React Bootstrap OverlayTrigger and Tooltip ([5b67f09](https://github.com/pivotal-cf/pivotal-ui/commit/5b67f09))
* **OverlayTrigger:** Add manual trigger to OverlayTrigger ([5b67f09](https://github.com/pivotal-cf/pivotal-ui/commit/5b67f09))
* **Pagination:** Create Pagination CSS component ([b0f8cdc](https://github.com/pivotal-cf/pivotal-ui/commit/b0f8cdc))
* **Pagination:** Make Pagination React component ([6a4626f](https://github.com/pivotal-cf/pivotal-ui/commit/6a4626f))
* **react-bootstrap:** Upgrade React Bootstrap from 0.28.2 to 0.28.3 ([482c2af](https://github.com/pivotal-cf/pivotal-ui/commit/482c2af))
* **Tabs:** Combine SimpleTabs and SimpleAltTabs into Tabs ([500c321](https://github.com/pivotal-cf/pivotal-ui/commit/500c321))
* **Tabs:** Tabs accept actions prop ([bd15b4a](https://github.com/pivotal-cf/pivotal-ui/commit/bd15b4a))
* **Toggle:** Create React Toggle component ([0196def](https://github.com/pivotal-cf/pivotal-ui/commit/0196def))
* **Typography:** Remove font weight from css typography ([f891a7b](https://github.com/pivotal-cf/pivotal-ui/commit/f891a7b))
* **Typography:** Remove React Typography component ([f891a7b](https://github.com/pivotal-cf/pivotal-ui/commit/f891a7b))

### BREAKING CHANGES

* **FancySelect:** Delete FancySelect component and styles ([356f20d](https://github.com/pivotal-cf/pivotal-ui/commit/356f20d))
* **Inputs:** Consolidate React BasicInput and SearchInput components into Input component ([6598843](https://github.com/pivotal-cf/pivotal-ui/commits/6598843))
* **OverlayTrigger:** OverlayTrigger &#x27;trigger&#x27; prop is now a string and not an array ([5b67f09](https://github.com/pivotal-cf/pivotal-ui/commits/5b67f09))
* **RadioGroup:** Move RadioGroup component into pui-react-radio package
* **SearchInput:** Remove the Search Input Package ([581e9b0](https://github.com/pivotal-cf/pivotal-ui/commits/581e9b0))
* **Scales:** Remove CSS Scales and Deprecated components ([85fed14](https://github.com/pivotal-cf/pivotal-ui/commits/85fed14))
* **Table:** Rename SortableTable React component to Table ([b2ccf2a](https://github.com/pivotal-cf/pivotal-ui/commit/b2ccf2a))
* **Tabs:** Combine SimpleTabs and SimpleAltTabs into a single Tabs component that takes &#x27;tabType&#x27;
* **TileLayoutItem:** Change TileLayout.Item to TileLayoutItem ([ace252b](https://github.com/pivotal-cf/pivotal-ui/commit/ace252b))
* **Traffic-lights:** Remove Traffic-lights package ([2723e72](https://github.com/pivotal-cf/pivotal-ui/commits/2723e72))
* **Typography:** Delete React Typography ([f891a7b](https://github.com/pivotal-cf/pivotal-ui/commits/f891a7b))


<a name="3.4.2"></a>
## 3.4.2 (2016-03-11)


### Bug Fixes

* **autocomplete:** change the link title to the correct value ([fef9f4f](https://github.com/pivotal-cf/pivotal-ui/commit/fef9f4f))

<a name="3.4.0"></a>
# 3.4.0 (2016-03-09)


### Bug Fixes

* **Panels:** Fix header styling in React Panels ([74cc4e5](https://github.com/pivotal-cf/pivotal-ui/commit/74cc4e5)), closes [#115198567](https://github.com/pivotal-cf/pivotal-ui/issues/115198567)

### Features

* **Autocomplete:** Autocomplete supports items that are objects ([67002e8](https://github.com/pivotal-cf/pivotal-ui/commit/67002e8))



<a name="3.3.0"></a>
# 3.3.0 (2016-03-02)

### Features

* **styleguide:** require components documentation is more consistent ([a09733f](https://github.com/pivotal-cf/pivotal-ui/commit/a09733f))

### Bug Fixes

* **panels:** panel headers don't scroll on scrollable panels([17c1697](https://github.com/pivotal-cf/pivotal-ui/commit/17c1697))
* **styleguide:** adjust margin so links don't overlap ([1bf322e](https://github.com/pivotal-cf/pivotal-ui/commit/1bf322e))




<a name="3.2.0"></a>
# 3.2.0 (2016-02-19)


### Bug Fixes

* **dropdown:** remove typo in css dropdown li ([8cab87f](https://github.com/pivotal-cf/pivotal-ui/commit/8cab87f))
* **expander:** Manual triggers work in expanders ([a44bb0b](https://github.com/pivotal-cf/pivotal-ui/commit/a44bb0b))
* **transitions:** Default css transitions are color and opacity instead of ([ae02704](https://github.com/pivotal-cf/pivotal-ui/commit/ae02704))

### Features

* **Expander:** Expander accepts callbacks ([84828d2](https://github.com/pivotal-cf/pivotal-ui/commit/84828d2))
* **padding:** change containery paddings ([e2fba9a](https://github.com/pivotal-cf/pivotal-ui/commit/e2fba9a))
* **RadioGroup:** consolidate radio components ([2889887](https://github.com/pivotal-cf/pivotal-ui/commit/2889887))


<a name="3.1.3"></a>
## 3.1.3 (2016-02-12)


### Features

* **styleguide:** expose react, css &#x27;all&#x27; pages ([c513b1c](https://github.com/pivotal-cf/pivotal-ui/commit/c513b1c))


### Bug Fixes

* **dependencies:** Iconography has font-awesome as a true dependency so ([0cc5ebf](https://github.com/pivotal-cf/pivotal-ui/commit/0cc5ebf)), closes [#113594357](https://github.com/pivotal-cf/pivotal-ui/issues/113594357)


<a name="3.1.2"></a>
## 3.1.2 (2016-02-11)


### Bug Fixes

* **radio:** add disabled class to radio label ([4c1a4d2](https://github.com/pivotal-cf/pivotal-ui/commit/4c1a4d2))
 
<a name="3.1.1"></a>
## 3.1.1 (2016-02-10)


### Bug Fixes

* **dependencies:** Update classnames dependencies ([4e240c9](https://github.com/pivotal-cf/pivotal-ui/commit/4e240c9)), closes [#113259049](https://github.com/pivotal-cf/pivotal-ui/issues/113259049)


<a name="3.1.0"></a>
# 3.1.0 (2016-02-05)


### Features

* **buttons:** remove outline none for default focus glow ([d4117c8](https://github.com/pivotal-cf/pivotal-ui/commit/d4117c8))
* **inputs:** add basic input component ([5d9eb56](https://github.com/pivotal-cf/pivotal-ui/commit/5d9eb56))
* **SortableTables:** Pass &#x60;rowData&#x60; prop into CustomCells ([9dbb5b2](https://github.com/pivotal-cf/pivotal-ui/commit/9dbb5b2))


<a name="3.0.0"></a>
# 3.0.0 (2016-01-29)


### Bug Fixes

* **bootstrap:** Remove bootstrap peer dependecy from pui-css-bootstrap ([89732c6](https://github.com/pivotal-cf/pivotal-ui/commit/89732c6))
* **SortableTable:** Column size of Sortable Table does not change when ([cc3e7ed](https://github.com/pivotal-cf/pivotal-ui/commit/cc3e7ed)), closes [#103460514](https://github.com/pivotal-cf/pivotal-ui/issues/103460514)
* **spinners:** Remove min-height from small spinner and margin top from ([a836e8a](https://github.com/pivotal-cf/pivotal-ui/commit/a836e8a)), closes [#101234820](https://github.com/pivotal-cf/pivotal-ui/issues/101234820)
* **styleguide:** Fix broken documentation for requiring components ([124f8a0](https://github.com/pivotal-cf/pivotal-ui/commit/124f8a0))
* **styleguide:** Fix react docs for requiring Image ([6ccb2c6](https://github.com/pivotal-cf/pivotal-ui/commit/6ccb2c6)), closes [#112638227](https://github.com/pivotal-cf/pivotal-ui/issues/112638227)

### Features

* **Panels:** panels can have actions in the header ([fb9ec78](https://github.com/pivotal-cf/pivotal-ui/commit/fb9ec78)), closes [#343](https://github.com/pivotal-cf/pivotal-ui/issues/343) [#287](https://github.com/pivotal-cf/pivotal-ui/issues/287)
* **Panels:** React panels now accept subtitle prop ([e45fcd7](https://github.com/pivotal-cf/pivotal-ui/commit/e45fcd7))


### BREAKING CHANGES

* **styleguide:** Change TileLayout to export an object like all of the other components
([124f8a0](https://github.com/pivotal-cf/pivotal-ui/commits/124f8a0))
* **Media:** Use &#x60;placement&#x60; instead of &#x60;hAlign&#x60; ([83c1753](https://github.com/pivotal-cf/pivotal-ui/commit/83c1753))


<a name="3.0.0-alpha.3"></a>
# 3.0.0-alpha.3 (2016-01-22)


### Bug Fixes

* **alert:** Alert notification icon displays the right shade of yellow ([701eadf](https://github.com/pivotal-cf/pivotal-ui/commit/701eadf))
* **docs:** Add npm module and example to responsive utilities ([2a696eb](https://github.com/pivotal-cf/pivotal-ui/commit/2a696eb))
* **embeds:** deprecate pui-css-embeds ([1f923a4](https://github.com/pivotal-cf/pivotal-ui/commit/1f923a4)), closes [#324](https://github.com/pivotal-cf/pivotal-ui/issues/324) [#107953250](https://github.com/pivotal-cf/pivotal-ui/issues/107953250)
* **forms:** unhide success checkbox ([78ca289](https://github.com/pivotal-cf/pivotal-ui/commit/78ca289)), closes [#322](https://github.com/pivotal-cf/pivotal-ui/issues/322) [#107762198](https://github.com/pivotal-cf/pivotal-ui/issues/107762198)
* **iconography:** don&#x27;t have undefined classes when props aren&#x27;t passed ([69f2b44](https://github.com/pivotal-cf/pivotal-ui/commit/69f2b44)), closes [#273](https://github.com/pivotal-cf/pivotal-ui/issues/273) [#105603602](https://github.com/pivotal-cf/pivotal-ui/issues/105603602)
* **list-group:** remove weird bootstrap override making lists ([bb1a7cf](https://github.com/pivotal-cf/pivotal-ui/commit/bb1a7cf)), closes [#110188176](https://github.com/pivotal-cf/pivotal-ui/issues/110188176) [#341](https://github.com/pivotal-cf/pivotal-ui/issues/341)
* **media:** allow media objects to be nested without having weird whitespace ([4493a92](https://github.com/pivotal-cf/pivotal-ui/commit/4493a92))
* **media:** revamp Media API ([3f7380e](https://github.com/pivotal-cf/pivotal-ui/commit/3f7380e)), closes [#355](https://github.com/pivotal-cf/pivotal-ui/issues/355) [#112189151](https://github.com/pivotal-cf/pivotal-ui/issues/112189151)
* **typography:** improve specificity of modifier classes ([6cafe0c](https://github.com/pivotal-cf/pivotal-ui/commit/6cafe0c)), closes [#104120280](https://github.com/pivotal-cf/pivotal-ui/issues/104120280)

### Features

* **panels:** Add footer to react panels ([1615468](https://github.com/pivotal-cf/pivotal-ui/commit/1615468))
* **panels:** all panels use flexbox for layout ([865e688](https://github.com/pivotal-cf/pivotal-ui/commit/865e688))
* **react-bootstrap:** upgrade react-bootstrap to 0.28.2 ([742f548](https://github.com/pivotal-cf/pivotal-ui/commit/742f548))
* **sortable-table:** add CustomCell and sortBy to SortableTable columns ([1192cf0](https://github.com/pivotal-cf/pivotal-ui/commit/1192cf0)), closes [#346](https://github.com/pivotal-cf/pivotal-ui/issues/346) [#345](https://github.com/pivotal-cf/pivotal-ui/issues/345) [#344](https://github.com/pivotal-cf/pivotal-ui/issues/344) [#110356786](https://github.com/pivotal-cf/pivotal-ui/issues/110356786)
* **tabs:** tabs can now go inside of other tabs! ([bdca651](https://github.com/pivotal-cf/pivotal-ui/commit/bdca651)), closes [#313](https://github.com/pivotal-cf/pivotal-ui/issues/313) [#106998440](https://github.com/pivotal-cf/pivotal-ui/issues/106998440)


### BREAKING CHANGES

* **media:** Media API has changed. ([3f7380e](https://github.com/pivotal-cf/pivotal-ui/commits/3f7380e))
* **media:** .pull-left and .pull-right no longer work with media
objects. use .media-left and .media-right instead ([4493a92](https://github.com/pivotal-cf/pivotal-ui/commits/4493a92))
* **typography:** removes .type-terms class. use .type-xs instead ([6cafe0c](https://github.com/pivotal-cf/pivotal-ui/commits/6cafe0c))
* **panels:** removed .panel-flex ([865e688](https://github.com/pivotal-cf/pivotal-ui/commits/865e688))
* **embeds:** remove pui-css-embeds. the component is still available in pui-css-bootstrap ([1f923a4](https://github.com/pivotal-cf/pivotal-ui/commits/1f923a4))


<a name="3.0.0-alpha.2"></a>
# 3.0.0-alpha.2 (2015-12-11)


### Bug Fixes

* **tables:** Add table-data class to SortableTable ([7d280d9](https://github.com/pivotal-cf/pivotal-ui/commit/7d280d9))
* **tabs:** props are now passed through to the react-bootstrap tabs and accordian. ([768329e](https://github.com/pivotal-cf/pivotal-ui/commit/768329e))

### Features

* **autocomplete:** Upgrade pui-cursor to 2.0.2 ([f27be16](https://github.com/pivotal-cf/pivotal-ui/commit/f27be16))
* **panels:** Allow Panels to have full headers ([cac7b0a](https://github.com/pivotal-cf/pivotal-ui/commit/cac7b0a))
* **panels:** Change &#x60;title&#x60; prop to &#x60;header&#x60; ([b0cc929](https://github.com/pivotal-cf/pivotal-ui/commit/b0cc929))
* **tables:** Refactor Sortable Tables ([925ff13](https://github.com/pivotal-cf/pivotal-ui/commit/925ff13))


### BREAKING CHANGES

* **panels:** (javascript) Panel &#x60;title&#x60; prop is now the &#x60;header&#x60;
prop
([b0cc929](https://github.com/pivotal-cf/pivotal-ui/commits/b0cc929))
* **tables:** (javascript) React SortableTable has a completely new
API.
([925ff13](https://github.com/pivotal-cf/pivotal-ui/commits/925ff13))


<a name="3.0.0-alpha.1"></a>
# 3.0.0-alpha.1 (2015-11-11)


### Bug Fixes

* **iconography:** add missing dependency, remove unused dependency ([ea10547](https://github.com/pivotal-cf/pivotal-ui/commit/ea10547)), closes [#323](https://github.com/pivotal-cf/pivotal-ui/issues/323)
* **modals:** add missing dependency ([375a8c9](https://github.com/pivotal-cf/pivotal-ui/commit/375a8c9))



<a name="3.0.0-alpha.0"></a>
# 3.0.0-alpha.0 (2015-11-05)

### Bug Fixes

* **dependency:** remove unused font-awesome dependency for pui-css-typography ([044900c](https://github.com/pivotal-cf/pivotal-ui/commit/044900c))

### Features

* **modals:** use react-bootstrap&#x27;s modal ([a42791a](https://github.com/pivotal-cf/pivotal-ui/commit/a42791a)), closes [#296](https://github.com/pivotal-cf/pivotal-ui/issues/296) [#311](https://github.com/pivotal-cf/pivotal-ui/issues/311) [#106334194](https://github.com/pivotal-cf/pivotal-ui/issues/106334194)
* **react:** upgrade to react 0.14 ([42ab37f](https://github.com/pivotal-cf/pivotal-ui/commit/42ab37f))


<a name="2.1.0-alpha.1"></a>
# 2.1.0-alpha.1 (2015-10-27)


### Bug Fixes

* **forms:** remove box shadow from form inputs other than selects ([ba86346](https://github.com/pivotal-cf/pivotal-ui/commit/ba86346)), closes [#289](https://github.com/pivotal-cf/pivotal-ui/issues/289)
* **forms:** remove documentation for broken autoselect element ([e18d645](https://github.com/pivotal-cf/pivotal-ui/commit/e18d645))

### Features

* **modals:** extract and reveal stateless BaseModal ([2a0493d](https://github.com/pivotal-cf/pivotal-ui/commit/2a0493d))



<a name="2.1.0-alpha.0"></a>
# 2.1.0-alpha.0 (2015-10-20)


### Bug Fixes

* **alerts:** remove unwanted top margin on alerts ([1d9de41](https://github.com/pivotal-cf/pivotal-ui/commit/1d9de41)), closes [#278](https://github.com/pivotal-cf/pivotal-ui/issues/278) [#105783386](https://github.com/pivotal-cf/pivotal-ui/issues/105783386)
* **grids:** Update React Grids dependecy ([5d9d74a](https://github.com/pivotal-cf/pivotal-ui/commit/5d9d74a))
* **grids:** update dependency version ([8009f9b](https://github.com/pivotal-cf/pivotal-ui/commit/8009f9b))
* **panels:** remove unwanted whitespace under panels ([6e71f25](https://github.com/pivotal-cf/pivotal-ui/commit/6e71f25)), closes [#274](https://github.com/pivotal-cf/pivotal-ui/issues/274) [#105701926](https://github.com/pivotal-cf/pivotal-ui/issues/105701926)
* **pui-css-all:** include tile-layout css in all ([5e72e17](https://github.com/pivotal-cf/pivotal-ui/commit/5e72e17))
* **radio-group:** fixes bug where onChange callback would be called twice ([4832cfb](https://github.com/pivotal-cf/pivotal-ui/commit/4832cfb)), closes [#100254792](https://github.com/pivotal-cf/pivotal-ui/issues/100254792)
* **sortable-table:** fix bug preventing render with only one column ([43a8f0a](https://github.com/pivotal-cf/pivotal-ui/commit/43a8f0a)), closes [#103965214](https://github.com/pivotal-cf/pivotal-ui/issues/103965214)
* **tabs:** tabs no longer generate a new id on each render ([f6b2cca](https://github.com/pivotal-cf/pivotal-ui/commit/f6b2cca)), closes [#105159724](https://github.com/pivotal-cf/pivotal-ui/issues/105159724)
* **tabs:** tabs responsive breakpoints work properly ([05418c9](https://github.com/pivotal-cf/pivotal-ui/commit/05418c9)), closes [#105361952](https://github.com/pivotal-cf/pivotal-ui/issues/105361952) [#105159294](https://github.com/pivotal-cf/pivotal-ui/issues/105159294)

### Features

* **back-to-top:** allow users to set back-to-top to always be visible ([d1f8237](https://github.com/pivotal-cf/pivotal-ui/commit/d1f8237)), closes [#104349588](https://github.com/pivotal-cf/pivotal-ui/issues/104349588)
* **button-group:** adds button-group selected state, fixes active state ([13cc09a](https://github.com/pivotal-cf/pivotal-ui/commit/13cc09a)), closes [#263](https://github.com/pivotal-cf/pivotal-ui/issues/263) [#105106916](https://github.com/pivotal-cf/pivotal-ui/issues/105106916)



<a name="2.0.0"></a>
# 2.0.0 (2015-09-29)

### BREAKING CHANGES

* **alerts:** (css class) .alert-icon styles icons within alerts. ([a6cfe36](https://github.com/pivotal-cf/pivotal-ui/commits/a6cfe36))
* **buttons:** (css class) .btn-primary and PrimaryButton are no longer supported. ([8b86a1f](https://github.com/pivotal-cf/pivotal-ui/commits/8b86a1f))
* **buttons:** (css class) the value of $error-3, and $red-3 became darker. ([232156c](https://github.com/pivotal-cf/pivotal-ui/commits/232156c))
* **buttons:** (sass variable): the button-skin-alternate mixin is no longer supported ([800c0f9](https://github.com/pivotal-cf/pivotal-ui/commits/800c0f9))
* **colors:** (sass variables) 2.0 conversion table,dark,dark-3 is now dark-4,dark-2 is now dark-3,dark-1 is now dark-2,brand,brand-3 is now brand-8,brand-1 is now brand-3,brand-5 is now brand-10,brand-2 is now brand-5,brand-4 has changed, there is no equivalent color in 2.0 and will now be brand-9 to have a more appropriate place within the brightness scale,accent,accent-5 is now accent-6,accent-4 has changed, there is no equivalent color in 2.0 and will now be accent-5 to have a more appropriate place within the brightness scale,accent-3 is now accent-4,accent-2 is now accent-3,accent-1 is now accent-2,error,error-4 is now error-6,error-3 is now error-4,error-2 is now error-3,error-1 is now error-2,warn,warn-3 is now warn-6,warn-2 is now warn-3,success,success-2 is now success-6 ([aeba298](https://github.com/pivotal-cf/pivotal-ui/commits/aeba298))
* **dropdowns:** (css class) Dropdowns now become darker when opened instead of lighter.([70fece4](https://github.com/pivotal-cf/pivotal-ui/commit/70fece4))
* **dropdowns:** (javascript) PrimaryDropdowns are no longer supported. ([f1bfc81](https://github.com/pivotal-cf/pivotal-ui/commits/f1bfc81))
* **ellipsis:** (css class) 2 and 3 line ellipsis no longer supported. ([fbd5fc3](https://github.com/pivotal-cf/pivotal-ui/commit/fbd5fc3))
* **expander:** (html) The DOM for ExpanderTrigger has changed. There is no longer a wrapping div. ([480c7bc](https://github.com/pivotal-cf/pivotal-ui/commits/480c7bc))
* **forms:** (css class) Help text on input is now darker. ([f2761e3](https://github.com/pivotal-cf/pivotal-ui/commit/f2761e3))
* **forms:** (css class) .help-block has a darker color now. For the old color, use $gray-dark. ([f2761e3](https://github.com/pivotal-cf/pivotal-ui/commits/f2761e3))
* **health_indicators:** removes health_indicators from pui-css-deprecated ([799eb23](https://github.com/pivotal-cf/pivotal-ui/commits/799eb23))
* **images:** (javascript) Images no longer responsive by default. Please use the responsive flag. ([447a6a0](https://github.com/pivotal-cf/pivotal-ui/commit/447a6a0))
* **links:** (css class) link-lowlight-alt is no longer supported. Please use link-lowlight instead. ([757a0a1](https://github.com/pivotal-cf/pivotal-ui/commits/757a0a1))
* **links:** (css class) the value of $link-color, $accent-2, and $blue-2 became darker ([29c5826](https://github.com/pivotal-cf/pivotal-ui/commits/29c5826))
* **lists:** (sass variable) $list-steps-color-current is now $brand-8 ([690d59b](https://github.com/pivotal-cf/pivotal-ui/commits/690d59b))
* **lists:** (css class) addable list animations removed. Do not use. ([53315f5](https://github.com/pivotal-cf/pivotal-ui/commits/53315f5))
* **lists:** (html) The &#x60;.event-list&#x60; class is no longer supported. If you want to build a event list, build it up using a group list. See an example at http://styleguide.pivotal.io/elements.html#list_group ([f8f2e40](https://github.com/pivotal-cf/pivotal-ui/commits/f8f2e40))
* **maps:** (css class) Google maps now need the &#x60;.labs-map&#x60; class to get styles. ([d24e699](https://github.com/pivotal-cf/pivotal-ui/commits/d24e699))
* **mixin:** (sass variable) font() mixin no longer available. Use font-helper mixin from pui-css-typography instead. ([dc94761](https://github.com/pivotal-cf/pivotal-ui/commits/dc94761))
* **modernizr:** (javascript) modernizr is no longer included with Pivotal UI ([086002c](https://github.com/pivotal-cf/pivotal-ui/commits/086002c))
* **no-js:** removes .no-js from pui-css-deprecated ([c3674a2](https://github.com/pivotal-cf/pivotal-ui/commits/c3674a2))
* **panes:** (javascript) outerClass, and innerClass no longer work. Use className and innerClassName to pass the classes, respectively. ([76ac09e](https://github.com/pivotal-cf/pivotal-ui/commits/76ac09e))
* **selects:** (sass variables) $input-border is now $neutral-7 ([192e5af](https://github.com/pivotal-cf/pivotal-ui/commit/192e5af))
* **sortable-table:** (javascript) React component has new wrapping components for the header and rows. ([537f477](https://github.com/pivotal-cf/pivotal-ui/commits/537f477))
* **tabs:** (javascript) For the react version of tabs, the property 'tabs' is now called 'title' ([01dad2a](https://github.com/pivotal-cf/pivotal-ui/commits/01dad2a))
* **tabs:** (sass variables) $tab-responsive-color is now $neutral-3 instead of $neutral-4 and $tab-responsive-active-color is now $brand-5 instead of $brand-8 ([7d99cec](https://github.com/pivotal-cf/pivotal-ui/commits/7d99cec))
* **tabs:** The old styling of SimpleTabs is no longer
available. The same classes or React Components use the new styles. ([a942a44](https://github.com/pivotal-cf/pivotal-ui/commits/a942a44))
* **tabs:** (whitespace) tab default body padding is now on .tab-pane ([cac8cde](https://github.com/pivotal-cf/pivotal-ui/commits/cac8cde))
* **toggles:** removes toggles from pui-css-deprecated ([945039a](https://github.com/pivotal-cf/pivotal-ui/commits/945039a))
* **typography:** (css class) header line height changed and will look closer together on multiline headers but will look the same on single line headers ([492247a](https://github.com/pivotal-cf/pivotal-ui/commits/492247a))


### Features
* **autocomplete:** Add autocomplete React component ([6304d0c](https://github.com/pivotal-cf/pivotal-ui/commit/6304d0c))
* **back-to-top:** react back-to-top accepts classname, id, style ([92e095b](https://github.com/pivotal-cf/pivotal-ui/commit/92e095b))
* **bootstrap:** upgrade bootstrap from 3.3.1 to 3.3.5 ([6f96e31](https://github.com/pivotal-cf/pivotal-ui/commit/6f96e31))
* **btn-group:** Adds button groups ([f2ff18a](https://github.com/pivotal-cf/pivotal-ui/commit/f2ff18a))
* **buttons:** react buttons now accept classname, id, and style ([1f41c6d](https://github.com/pivotal-cf/pivotal-ui/commit/1f41c6d))
* **collapse:** Collapse can now start out open by passing defaultExpanded ([7f01614](https://github.com/pivotal-cf/pivotal-ui/commit/7f01614))
* **colors:** Add new dark swatches and color styles ([143695b](https://github.com/pivotal-cf/pivotal-ui/commit/143695b))
* **colors:** add type modifiers for dark colors ([46bfbf3](https://github.com/pivotal-cf/pivotal-ui/commit/46bfbf3))
* **dividers:** Dividers passthrough className, id and style ([7d1db48](https://github.com/pivotal-cf/pivotal-ui/commit/7d1db48))
* **draggable-list:** DraggableList passes through attributes ([183810a](https://github.com/pivotal-cf/pivotal-ui/commit/183810a))
* **dropdown:** Dropdown and DropdownItem pass through attributes ([87b40f7](https://github.com/pivotal-cf/pivotal-ui/commit/87b40f7))
* **forms:** Change selects to have label outside ([e876de4](https://github.com/pivotal-cf/pivotal-ui/commit/e876de4))
* **helpers:** add &#x60;pui-react-helpers&#x60; module, with &#x60;mergeProps&#x60; function ([ea0d732](https://github.com/pivotal-cf/pivotal-ui/commit/ea0d732))
* **labels:** react labels now accept classname, id, style ([48e9a39](https://github.com/pivotal-cf/pivotal-ui/commit/48e9a39))
* **lists:** react lists accept classname, id, and style props ([4f2a0e1](https://github.com/pivotal-cf/pivotal-ui/commit/4f2a0e1))
* **maps:** Removes Maps dependency on id for height styling ([d24e699](https://github.com/pivotal-cf/pivotal-ui/commit/d24e699))
* **modal:** Make x to close react modals accessible ([48e41dd](https://github.com/pivotal-cf/pivotal-ui/commit/48e41dd))
* **modal:** Modals passthrough className, id, and style ([fe01756](https://github.com/pivotal-cf/pivotal-ui/commit/fe01756))
* **notification:** AlertNotifications passes through id, className, and style ([0e8061a](https://github.com/pivotal-cf/pivotal-ui/commit/0e8061a))
* **notification:** Notifications pass through className, style, and id ([859e679](https://github.com/pivotal-cf/pivotal-ui/commit/859e679))
* **notifications:** Add size prop to react notifications ([569fcc8](https://github.com/pivotal-cf/pivotal-ui/commit/569fcc8))
* **overlay-trigger:** Creates a unique id for overlay prop ([52523d4](https://github.com/pivotal-cf/pivotal-ui/commit/52523d4))
* **panels:** Adds passthroughs for className, id, and style ([174c544](https://github.com/pivotal-cf/pivotal-ui/commit/174c544))
* **panes:** Panes passthrough className, id, and style ([76ac09e](https://github.com/pivotal-cf/pivotal-ui/commit/76ac09e))
* **radio:** Classname and style passes through to radio div ([9f736c9](https://github.com/pivotal-cf/pivotal-ui/commit/9f736c9))
* **radio-group:** react radio-group accepts classname, id, and style props ([4d781f5](https://github.com/pivotal-cf/pivotal-ui/commit/4d781f5))
* **react-animations:** remove pui-css-react-animations ([e944ad0](https://github.com/pivotal-cf/pivotal-ui/commit/e944ad0))
* **ribbons:** react ribbons now accept classname, id, and style props ([1ecda1f](https://github.com/pivotal-cf/pivotal-ui/commit/1ecda1f))
* **select-fancy:** add a select fancy react component ([b20a078](https://github.com/pivotal-cf/pivotal-ui/commit/b20a078))
* **stream-list:** Creates a stream-list component ([b96429e](https://github.com/pivotal-cf/pivotal-ui/commit/b96429e))
* **tabs:** Makes tabs responsive ([721cdbf](https://github.com/pivotal-cf/pivotal-ui/commit/721cdbf))
* **tabs:** Adds new component LeftTabs in Tabs package ([c1e87dd](https://github.com/pivotal-cf/pivotal-ui/commit/c1e87dd))
* **tabs:** Upgrade to new react-bootstrap Tabs API ([01dad2a](https://github.com/pivotal-cf/pivotal-ui/commit/01dad2a))
* **tabs:** Update styles for SimpleTabs for 2.0.0 ([a942a44](https://github.com/pivotal-cf/pivotal-ui/commit/a942a44))
* **tile-layout:** adds TileLayout component ([c3ff982](https://github.com/pivotal-cf/pivotal-ui/commit/c3ff982))
* **tooltip:** Adds className, id, and style passthrough ([ae06ad1](https://github.com/pivotal-cf/pivotal-ui/commit/ae06ad1))
* **traffic-lights:** Adds traffic lights component ([985171e](https://github.com/pivotal-cf/pivotal-ui/commit/985171e))
* **typography:** Headers now have a smaller line-height ([492247a](https://github.com/pivotal-cf/pivotal-ui/commit/492247a))
* **typography:** uses a variable for header padding ([8fd4d96](https://github.com/pivotal-cf/pivotal-ui/commit/8fd4d96))

#### Accessibility
* **alerts:** JAWS indicates that alerts are alerts ([95aca19](https://github.com/pivotal-cf/pivotal-ui/commit/95aca19))
* **back-to-top:** improve accessibility of back-to-top ([61c9b93](https://github.com/pivotal-cf/pivotal-ui/commit/61c9b93))
* **buttons** danger buttons pass contrast requirements ([232156c](https://github.com/pivotal-cf/pivotal-ui/commit/232156c))
* **colors:** changes colors to be more web accessible ([aeba298](https://github.com/pivotal-cf/pivotal-ui/commit/aeba298))
* **links:** links pass contrast requirements ([29c5826](https://github.com/pivotal-cf/pivotal-ui/commit/29c5826))
* **modals:** Modals are more accessible ([08de4ff](https://github.com/pivotal-cf/pivotal-ui/commit/08de4ff))
* **sortable-table:** Make sortable table keyboard accessible ([ffdfe3a](https://github.com/pivotal-cf/pivotal-ui/commit/ffdfe3a))
* **tabs:** Set correct aria-controls value for Tab nav items ([75fd100](https://github.com/pivotal-cf/pivotal-ui/commit/75fd100))

### Bug Fixes

* **alerts:** Add color back to notification alert icon ([70ab958](https://github.com/pivotal-cf/pivotal-ui/commit/70ab958))
* **alerts:** Alert styles changed ([a6cfe36](https://github.com/pivotal-cf/pivotal-ui/commit/a6cfe36))
* **alerts:** Remove extra margin on the alert ([dc72f3d](https://github.com/pivotal-cf/pivotal-ui/commit/dc72f3d))
* **autocomplete:** Fix scroll to top ([629401b](https://github.com/pivotal-cf/pivotal-ui/commit/629401b))
* **autocomplete:** Uses neutral instead of gray ([100ad8b](https://github.com/pivotal-cf/pivotal-ui/commit/100ad8b))
* **avatars:** Adds alt attributes to image tags ([1205551](https://github.com/pivotal-cf/pivotal-ui/commit/1205551))
* **back-to-top:** Update dependencies for react back-to-top ([4cefca2](https://github.com/pivotal-cf/pivotal-ui/commit/4cefca2))
* **back-to-top:** make jquery back-to-top accessible ([03e4d9b](https://github.com/pivotal-cf/pivotal-ui/commit/03e4d9b))
* **buttons:** Fixes Button Default Alternate hover state ([c9db631](https://github.com/pivotal-cf/pivotal-ui/commit/c9db631))
* **buttons:** Changes style of buttons. ([8b86a1f](https://github.com/pivotal-cf/pivotal-ui/commit/8b86a1f))
* **dividers:** (visual appearance) large dividers have less whitespace ([b1a1906](https://github.com/pivotal-cf/pivotal-ui/commits/b1a1906))
* **dividers:** reduce padding around large dividers to match small dividers ([b1a1906](https://github.com/pivotal-cf/pivotal-ui/commit/b1a1906))
* **draggable-list:** DraggableList callback onDrop is no longer passed to
list items - use onDragEnd instead to provide a callback. ([0bdd107](https://github.com/pivotal-cf/pivotal-ui/commits/0bdd107))
* **dropdowns:** Changes style of dropdowns. ([70fece4](https://github.com/pivotal-cf/pivotal-ui/commit/70fece4))
* **dropdowns:** Removes Primarydropdown ([f1bfc81](https://github.com/pivotal-cf/pivotal-ui/commit/f1bfc81))
* **dropdowns:** buttonClassName is propagated properly ([4e88e37](https://github.com/pivotal-cf/pivotal-ui/commit/4e88e37))
* **dropdowns:** Adds default uniqueid to Dropdowns. ([161198a](https://github.com/pivotal-cf/pivotal-ui/commit/161198a))
* **dropdowns:** Fixes the highlighting on hover of dropdown items ([718bfdd](https://github.com/pivotal-cf/pivotal-ui/commit/718bfdd))
* **ellipsis:** removed 2 and 3 line ellipsis options ([fbd5fc3](https://github.com/pivotal-cf/pivotal-ui/commit/fbd5fc3))
* **expander:** Handle expander open animation correctly ([d83f3dc](https://github.com/pivotal-cf/pivotal-ui/commit/d83f3dc))
* **expander:** ExpanderTrigger no longer wraps the given child ([480c7bc](https://github.com/pivotal-cf/pivotal-ui/commit/480c7bc))
* **forms:** Fix contrast issues on forms ([f2761e3](https://github.com/pivotal-cf/pivotal-ui/commit/f2761e3))
* **forms:** Inputs have labels ([2ad8ed7](https://github.com/pivotal-cf/pivotal-ui/commit/2ad8ed7))
* **forms:** Makes ids unique. ([8c0ee53](https://github.com/pivotal-cf/pivotal-ui/commit/8c0ee53))
* **forms:** help-inline class has been removed from forms ([87a90a5](https://github.com/pivotal-cf/pivotal-ui/commits/87a90a5))
* **forms:** (sass variable) $input-color is now $neutral-3. ([df046bd](https://github.com/pivotal-cf/pivotal-ui/commits/df046bd))
* **forms:** Changes input text color to be darker. ([df046bd](https://github.com/pivotal-cf/pivotal-ui/commit/df046bd))
* **images:** Images get responsive class only with flag ([447a6a0](https://github.com/pivotal-cf/pivotal-ui/commit/447a6a0))
* **links:** Updates link colors and hover/focus and active states ([757a0a1](https://github.com/pivotal-cf/pivotal-ui/commit/757a0a1))
* **lists:** Current step list item is now brand-8 ([690d59b](https://github.com/pivotal-cf/pivotal-ui/commit/690d59b))
* **lists:** Removes event list css ([f8f2e40](https://github.com/pivotal-cf/pivotal-ui/commit/f8f2e40))
* **media:** InnerClassName passes through to the media-body ([4966246](https://github.com/pivotal-cf/pivotal-ui/commit/4966246))
* **modals:** fix times symbol ([7d9dff9](https://github.com/pivotal-cf/pivotal-ui/commit/7d9dff9))
* **modals:** react modals now scroll when content is greater than viewport ([4355e94](https://github.com/pivotal-cf/pivotal-ui/commit/4355e94))
* **react-bootstrap:** only require needed components from react bootstrap ([a2847f9](https://github.com/pivotal-cf/pivotal-ui/commit/a2847f9))
* **selects:** changes select styles ([192e5af](https://github.com/pivotal-cf/pivotal-ui/commit/192e5af))
* **sortable-table:** refactor sortable-table to rerender with data change ([537f477](https://github.com/pivotal-cf/pivotal-ui/commit/537f477))
* **sortable-table:** sorts on first sortable column by default ([c3b2fa0](https://github.com/pivotal-cf/pivotal-ui/commit/c3b2fa0))
* **sortable-table:** Clicking on sortable header doesn&#x27;t select text ([a9ec8a0](https://github.com/pivotal-cf/pivotal-ui/commit/a9ec8a0)), closes [#103050640](https://github.com/pivotal-cf/pivotal-ui/issues/103050640)
* **tabs:** Fixes contrast on Left Tabs and Responsive Tabs ([7d99cec](https://github.com/pivotal-cf/pivotal-ui/commit/7d99cec))
* **tabs:** Fixes bugs in react tabs and improves docs ([2f0df41](https://github.com/pivotal-cf/pivotal-ui/commit/2f0df41))

<a name="1.10.0"></a>
# 1.10.0 (2015-07-08)


### Bug Fixes

* **dropdown:** Fix border on default alt dropdown hover ([5ebcaaf](https://github.com/pivotal-cf/pivotal-ui/commit/5ebcaaf))
* **dropdowns:** add &#x60;pui-css-buttons&#x60; as a dependency ([f980b16](https://github.com/pivotal-cf/pivotal-ui/commit/f980b16))
* **forms:** Fix typo in forms styleguide entry ([3918e0f](https://github.com/pivotal-cf/pivotal-ui/commit/3918e0f))

### Features

* **notifications:** &quot;no notifications&quot; bell no longer needs modifier classes ([8e8fd2a](https://github.com/pivotal-cf/pivotal-ui/commit/8e8fd2a))
* **notifications:** alert notifications badges no longer need modifier classes ([f4b963c](https://github.com/pivotal-cf/pivotal-ui/commit/f4b963c))
* **notifications:** notification bells and badges no longer need modifier classes ([1b94fdd](https://github.com/pivotal-cf/pivotal-ui/commit/1b94fdd))
* **notifications:** notifications bells scale with different size/color modifiers ([ebca281](https://github.com/pivotal-cf/pivotal-ui/commit/ebca281))
* **typography:** typography size classes are !important ([b969aac](https://github.com/pivotal-cf/pivotal-ui/commit/b969aac))

### DEPRECATION WARNINGS

* **notifications:** The notification HTML markup is changed. The old
    markup will work for now, but will no longer be supported in the next
    major release.

<a name="1.9.1"></a>
### 1.9.1 (2015-06-26)


#### Bug Fixes

* **alerts:** remove stray 's' in alerts docs ((356e9972))

<a name="1.9.0"></a>
## 1.9.0 (2015-06-24)


#### Bug Fixes

* **colors:** Fixes typo in color style guide for `accent-1`. ((27486ab1))
* **contributor-workflow:** remove unnecessary console.log ((8b075483))
* **iconography:** Add line height to fa-h1 through fa-h6 ((f036f7ed))
* **notifications:** Fix h2 styling on AlertNotification component. ((3e715ac6))
* **packages:**
  * add missing license content to all react components ((5227c326), closes (#97441574))
  * add missing license content to all css components ((9bdd6361))
* **packaging:** add license to pui-css-bootstrap module ((8c852585), closes (#95916290))
* **panel:** panel whitespace should support 'none' value ((f34fd1d7))
* **react-bootstrap:** lock react-bootstrap to a non-broken version ((d93dd4c1), closes (#97155534))
* **react-dropdown:** Add documentation of the buttonClassName property ((70f786c5))
* **vendor-package:** temp fix for ci error ((448d820e))


#### Features

* **contributor-workflow:**
  * add command to copy vendored PUI packages to projects ((8538ef3d))
  * improve contributor workflow for react components ((f15b66d7))
  * improve contributor workflow for css components ((1d8813c5))
* **iconography:** Add fa-h1 through fa-h6 and friends ((1ccab00d))
* **portals:** Add Portals React component to styleguide ((77ca252b))
* **react-iconography:** add size options to iconography ((5e14a234))
* **styleguide:**
  * Add product designer job req [#97262154] ((df234e85))
  * update bitly link to correct url ((699e23a8))
  * shiny new intro page ((31b3d0b7))

<a name="1.8.0"></a>
## 1.8.0 (2015-05-28)


#### Bug Fixes

* **lists:** add iconography as a dependency of lists npm module ((110e627d))


#### Features

* **packaging:** Add pui-css-all, containing all css components ((64897ca8))
* **react:** Upgrade all React components to use React v0.13 ((394f82c))

<a name="1.7.1"></a>
## 1.7.1 (2015-05-27)


#### Bug Fixes

* **alerts:** Remove erroneous border from alerts ((5207bfc9), closes (#94972296))
* **dropdowns:** update link dropdown example to have proper spacing ((41a84ac6), closes (#94978452))
* **btn-default-alt button:** Update btn-default-alt to have border ((5e0bbacc))


#### Deprecation warnings

The following components are deprecated, and will be removed in the next major release:

* Large accordions
* Alternate modals



## 1.7.0 (2015-05-18)


#### Bug Fixes

* **forms packaging:** Do not rely on .h1 styles existing in the forms scss [finishes #92549350] ((28214d26))
* **iconography:** fixed font-awesome peer dependency [] ((4dc7fb7e), closes (#91866334))
* **modal:**
  * Modals regain their fly-in behavior ((1704b413), closes (#94552398))
  * React Modals now display on open ((55366452), closes (#94552398))
* **packaging:**
  * Fix copyright holder name in css components ((f494575f), closes (#92150274))
  * Remove extra ../ from paths [] ((c2c1ef89), closes (#91991302))
* **ribbons:** Update styleguide link in Ribbons component ((0b4720ac))
* **test:** use buttons component in modal spec ((2cefe54d))
* **tooltips:** Remove the default transparency from tooltips [#91368306] ((f9d649c7))


#### Features

* **alignment:** move alignment into npm ((abf1e7f7))
* **back-to-top:**
  * Add new back-to-top React component to docs ((79f79a70))
  * -published back-to-top css [finishes #91866360] ((0027e3e5))
* **bordered-panel-title:**
  * Add a React component for the new Panel Basic Alt ((d5a435a0))
  * Add new panel-basic-alt component ((11ba90aa))
* **component-css-files:** Output individual CSS files per component ((acb5bb02))
* **deprecated:** Deprecate some components ((4abcac55))
* **fonts:**
  * Add assets to typography and iconography components ((a2d1f58f))
  * Include fonts in typography component [#91437306] ((a99f0c86))
* **iconography:** Publish iconography css component with dependencies [finishes #91866334] ((abbfbb10))
* **links:** -published links component css [finishes #91888924] ((7b8c0908))
* **maps:** Publish pui-css-maps component ((81ddf03d))
* **prismjs:** Publish pui-prismjs ((acf08aec))
* **react-expander:** Add Expander components to Pivotal UI. ((d1edc003))
* **react-grids:** Extract and use grids npm package [finishes #90971838] ((769f247d))
* **variables-and-mixins:** Publish pui-variables.scss and mixins.scss to npm ((7716f2f3))


#### Deprecation warnings

The following components are deprecated, and will be removed in the next major release:

* Health indicators
* Pivnet homepage
* Scales
* Apps Manager-style toggles
* Traffic lights
* No JavaScript
* 2 & 3 line ellipsis
* Event list

The following JavaScript libraries will also not be included in the next major release:

* jQuery
* Bootstrap.js
* Modernizr
* Lodash
* PUI Utils

<a name="1.6.0"></a>
## 1.6.0 (2015-02-27)


#### Features

* **timeline-list:** style timeline-list ((d0b60da5))

<a name="1.6.0"></a>
## 1.6.0 (2015-02-27)


#### Features

* **timeline-list:** style timeline-list ((d0b60da5))

<a name="1.5.0"></a>
## 1.5.0 (2015-02-25)


#### Bug Fixes

* **docs:**
  * add success modifier classes ((51c6369d))
  * Update fontawesome link. ((1e78e379))
* **dropdown:** add role="menuitem" to examples in styleguide ((358efa0b), closes (#87044280))
* **react-alert:** add prop validations ((a2faeb76))
* **react-button:** add prop validation ((5fd8f4a1))
* **react-collapse:** add prop validations ((f24ab8cc))
* **react-divider:** add prop validations ((e4c634cf))
* **react-draggable-list:** style draggable list ((2956ba1b))
* **react-dropdown:** pass react props better ((c9d30bf4))
* **react-grid:** add prop validation ((bcca1619))
* **react-image:**
  * Allow UI.Image to take a className. ((8444ba65))
  * add prop validations ((d1ef2a03))
* **react-input:** add prop validation ((ab50e903))
* **react-lists:** Allow InlineList to take a className. ((02bb247a))
* **react-media:**
  * Allow Media to take a className. ((d4c10b23))
  * update prop validation ((aacd4815))
* **react-panel:** add prop validations ((710fbab1))
* **react-sortable-table:** add prop validations ((ee2c39f9))
* **react-typography:** add prop validations ((ed39292b))
* **simple-tabs-alt:** active border on active tab ((255b3609))


#### Features

* **dropdown-notification:** add notifications with alert icon ((ce756c20))
* **dropdown-notifications:** add notification dropdown component ((e968a9de))
* **react-lists:**
  * add transitions to addable list ((3bf0b1cf))
  * add list spacing ((ad5312a0))
  * add addable list component ((e07ff19f))
  * Add list components in react ((2a6932bd))
* **react-notifications:**
  * add alert notifications to react ((cb057145))
  * add react notification component ((ae56aa96))

<a name="1.4.0"></a>
## 1.4.0 (2015-01-26)


#### Bug Fixes

* **copy-button:** do not include whitespace in hologram templates ((f6f067ad))
* **dropdowns:** Use standard spacing on dropdowns.jsx ((c21077d3))
* **ie-support:** fix back to top component in IE9 ((ade9688e))
* **lodash:** add lodash to global scope in regular pivotal-ui.js ((4f4f01de))
* **pivotal-ui-rails:** use 'font-url', not 'asset-url' for font paths ((04f38d8c), closes (#85540054))
* **react-media:**
  * Remove defunct left and right image validations ((8e2982c9))
  * place images in divs ((29117667))
* **react-ribbon:** rename ribbon component to inline ribbon ((cddfdc88))
* **simple-alt-tab:** remove green border on focus ((2ee21d7b))
* **styleguide:**
  * Remove extraneous divs from styleguide ((bab65afe))
  * fix font-weight in code example tables ((406949d2), closes (#84600166))


#### Features

* **dropdown:** add dropdown component ((b1e9bec9))
* **flag-react:** Adds the flag object to our react components ((6606874b))
* **links:** remove text-decoration for a:focus ((297cf798))
* **lodash:** include lodash globally ((5099be52))
* **panel-tile:** move panel tile to console specific styles ((4a2bce5a))
* **react:**
  * Namespace all PUI React components as UI.Component ((06ddf828))
  * Introduce React typography components ((64ccd18e))
* **react-alerts:** create react alerts ((265e99d0))
* **react-button:**
  * Adds specific button types ((495e09e2))
  * Add base button renderer ((adf8647f))
* **react-collapse:** Add Collapse component ((a5eaac08))
* **react-dividers:**
  * Support multiple sizes ((7b809e39))
  * Add react renderers for dividers ((07061a3c))
* **react-dropdown:** add react dropdown buttons ((15a27352))
* **react-grids:** add react grids ((0f58d722))
* **react-icons:** Add react icon component ((418edb99))
* **react-images:** add image components ((aab48cc6))
* **react-label:** Add Label component ((62fbcb38))
* **react-media:**
  * media components use the image components ((8bc50b08))
  * Adds custom validations for left and right image props ((a0c66537))
  * Add property validations for valign and stackSize ((31f5c806))
  * make alignment global to the entire component ((f6dc5e58))
  * implement new interface ((9725895d))
  * add alt text, height, width, and image spacing ((e0f7c1b9))
  * Non linked image support ((23d437bc))
  * Media component rendered in jsx ((b7b18538))
* **react-modal:**
  * modals close by clicking on backdrop or pressing esc ((53f3ec30))
  * add Modal component ((e1c8ef2d))
* **react-pane:** Adds pane react component ((316240f2))
* **react-panels:**
  * Update ShadowPanel component default to level 3 ((7284d7d7))
  * Add react panel components. ((fd0d231a))
* **react-pivnet:** Provide a sample implementation of React + Pivnet ((c2f328c3))
* **react-radio:** add radio and radio group components ((17a0325e))
* **react-ribbon:**
  * Ribbon components are now Ribbon, PrimaryRibbon, Banner ((f4f32231))
  * Add primary property to BannerRibbon ((edf2a18f))
  * add inline ribbon primary property ((e4dded10))
  * add banner ribbon react component ((8d63bb0e))
  * add react ribbon component ((e90c9e44))
* **react-search:**
  * Add example component using SearchInput and state to filter ((46fee5ba))
  * Add a stateless SearchInput component. ((3103c383))
* **react-sortable:** Add sortable list component ((3242698b))
* **react-tabs:**
  * Replace Tab component with react-bootstrap ((f1c575c0))
  * Create AltTabs component ((ce81d114))
  * Refactor Tabs component ((9ad17e65))
  * React component for Simple Alt tabs. ((611a501c))
* **styleguide:**
  * add copy button to js/jsx examples ((d90644a8))
  * add copy button to code examples ((da240986))
  * add copy button to code tables ((fe66dc1a))

<a name="1.3.0"></a>
## 1.3.0 (2014-12-05)


#### Bug Fixes

* **form-input:** remove angular sepcific styles for error states ((c0d174da))
* **panel-flex:** add safari support ((ff50733c))
* **tab-simple:** active tabs no longer have borders on non-hover states ((a98cdb0a))
* **vertical align:** add support for safari ((2a80af53))


#### Features

* **alerts:** add example of full width dismissable alerts ((4880b8e8))
* **code:** pre-scrollable heights are now auto ((d30865e2))
* **sortable-table:** add text alignment option ((8343e852))
* **styleguide:**
  * convert all code examples to html ((526207eb))
  * add pivotal ui examples to index page ((61b542cf))
* **styleguide-categories:** Remove Javascript category from the styleguide ((4ccecb65))
* **table-sortable:**
  * add optional additional classes to table ((ba154e59))
  * columns can be sortable or unsortable ((5d5151aa))
  * default sort by first column ascending ((e5d9a2d5))
  * create basic sortable table in react ((c46c2a96))
* **tables:** `.table-light` applies to all tables ((b83d9dbe))
* **variables:** variables.scss is now named pui-variables.scss ((e8f3c452))

<a name="1.2.0"></a>
## 1.2.0 (2014-11-24)


#### Bug Fixes

* **alerts:**
  * reorganize alert documentation ((0599b58a), closes (#82655864))
  * add documentation on `alert-link` class ((320dfe58))
  * update alert link styles ((c146159d))
* **color:** colors now take precedence over components default color ((0bd3d024), closes (#83039526))
* **event-list:**
  * add deprecation warning ((adad9c88))
  * deprecate event list ((adfdde21))
* **group-list:** add example of event list built with PUI ((351bfbb4))
* **links:** update table of link classes ((0042edfb))
* **list-card:** Panel-list fix ((fb0a55f0))
* **list-vertical-divider:** fix regressions ((0126f016))
* **media:** media body now fills the width of its container ((ae45de6f), closes (#82743832))
* **panel-flex:** Add list-card wrapper to example for height ((7e7987d5))
* **styleguide:** make links in alert clash less ((fb41c277))
* **tabs:** update responsive tabs' background color ((751a05d9))
* **traffic lights:** decrease spacing between lights ((51bcaa77), closes (#82762072))


#### Features

* **bootstrap:** upgrade from v3.2 to v3.3.1 ((ff1701d7))
* **code:** Add pre-unstyled class ((ac6b73a8))
* **links:** add `link-text` class ((7bf7a3c4))
* **styleguide:** update code example styles ((e5908f72))

<a name="1.1.1"></a>
### 1.1.1 (2014-11-14)


#### Bug Fixes

* **links:** remove default underline ((68da716b), closes (#82740244))

<a name="1.1.0"></a>
## 1.1.0 (2014-11-13)


#### Bug Fixes

* **all:** remove form_introduction and form_basic ((2b5f1025))
* **fancy number input:** Remove from styleguide ((64be1107), closes (#81949280))
* **focus-inputs:** remove from styleguide ((ec4c0869), closes (#81955962))
* **label:** increase padding on labels. ((99ead73f))
* **links:**
  * update link-lowlight style ((79ace832), closes (#82520306))
  * change hover state ((baf77c44))
  * remove superfluous link w/ icon example ((90cb6459), closes (#82491354))
* **list:** list styles apply to direct child LIs ((bb7d796c))
* **list-cards:** add missing documentation on `list-card-link` ((4943cc71), closes (#82608820))
* **list-group:** background color is now transparent ((b2e8fce3))
* **media-stackable:** improve documentation. ((1bdd3bcf))
* **panel-clickable:** Update hover colors of clickable classes ((ce036ca4))
* **panels:**
  * close anchor on example ((73393cbe))
  * remove dead media query on panel alt ((7cc6a661))
* **styleguide:**
  * improve font rendering for h3 styles on IE9 and IE10 ((87f7eed1))
  * update comments ((1053935e))
  * text under color chips is readable in IE9 and 10 ((05350d04))
* **table:** remove superfluous extension of `.row` ((0a4d8130), closes (#82484402))
* **vertical alignment:** restore css which provided this functionality ((f3589e44))


#### Features

* **colors:** add bg-glow-5 color ((7b2af147))
* **forms:**
  * restyle form elements ((92f5cb4b))
  * add basic example to docs ((5874f182))
  * reorganize documentation ((1d74594a))
* **label-tag:** labels now include a tag style used for editable tags ((26d7362c))
* **list-cards:** create a `list-card-wrapper` class for flex panel components ((15713b1f))
* **lists:** add useful example of inline lists for layout ((23925dae))
* **removable-label:** changed styling on removable labels to make it more similar to labels ((6570837c))
* **toggle-switch:**
  * added disabled styling ((b153d57c))
  * added toggle switch style for checkboxes under forms category ((cb07f981))
* **typography:** add h6 ((def0393c))

<a name="1.0.0"></a>
## 1.0.0 (2014-10-31)


#### Bug Fixes

* **inline-form:** remove unnecessary warning about custom-widths ((7c738681), closes (#81374290))
* **javascript:** fix errors in back-to-top ((75f49f2f))
* **layout lists:** add documentation links to cards list. ((528d1fa8))
* **list-card:** fix incomplete documentation ((e4f44ef1))
* **list-spacing:** move examples into tables for clarity ((dc71e313))
* **modal:** change modal-alt-title-color to neutral-10 ((290b05d7))
* **styleguide:** prevent page from scaling initially on mobile ((81f73fdc))
* **typography:** remove typography from utilities ((9b5498a8))


#### Features

* **alert:**
  * alerts are more flexible with their content ((68f8092d))
  * update alert component ((15bd926a))
* **alignment:**
  * update docs ((8a9d0f77))
  * make alignment top-level component in utilites ((4bcbd6e1))
* **back-to-top:** back-to-top does not show on mobile ((861fb76c))
* **grids:** update documentation ((b58cbcf5))
* **iconography:** add download icon to docs ((abe0868f))
* **list:** update docs for list-event ((d68b91cf))
* **list-cards:** add tileable fixed width grids via list-cards ((7a705004))
* **panels:** update panels documentation to use list-cards ((5cac9e68))
* **spinners:** update docs for spinners ((40d068f5))
* **styleguide:**
  * style secondary nav ((4c92d5ca))
  * make nav bar mobile friendly ((71237539))
* **table-key-value:** add docs for key value table ((36e9dfec))
* **table-scrollable:** Update component ((7f3fa538))
* **tables:** add reference to new alignment component ((5af168f8))
* **tooltip:** add tooltip component ((4d4049b3))
* **typography:**
  * add reference to new alignment component ((4ab30f70))
  * update typography documentation ((032593e4))
* **validations:** update documentation ((f072cdc6))
* **vertical aligner:** add vertical aligner component ((d45b325d))


#### Breaking Changes

* **alert:**
  * (style) alert text has normal emphasis by default. Apply the .em-high class to text elements inside alerts to get bold text. ((68f8092d))
  * (html) alert icons are no longer included by default  ((15bd926a))
  * (sass variable) `$yellow-1`/`$warn-1` are now `$yellow-2`/`$warn-2`  ((15bd926a))
  * (sass variable) `$yellow-2`/`$warn-2` are now `$yellow-3`/`$warn-3` ((15bd926a))
  * (style) alerts now have top-margin ((15bd926a))
* **panels:** panel-card - has been removed.  Behavior is now available using list-cards
containing panels. ((5cac9e68))
* **tooltip:**
  * (css class) `.with-tooltip` is now `.button-with-tooltip-wrapper` ((4d4049b3))
  * (javascript) tooltips must be explicitly initialized ((4d4049b3))
* **table-key-value:** (css class) table-horizontal and table-numerical are replaced by table-key-value ((36e9dfec))
* **table-scrollable** (html) Component no longer uses panels ((7f3fa538))
  * Uses it's own table-scrollable-head/body classes (no longer relies on modified panel components)
  * Sets column width with inline attributes (no longer uses column classes)
  * Uses table layout fixed, which means we need to be explicit about all sizes
  * Configurable styles are now variables
  * No longer relies explicitly on whitespace classes

<a name="0.2.0"></a>
## 0.2.0 (2014-10-22)


#### Bug Fixes

* **Alert:** improve contrast for yellow background color vs text ((5fafc7c1))
* **alert:** Improve docs for alerts ((7b99d427))
* **back-to-top:** bring back-to-top forward ((eea9cf9c))
* **backgrounds:** update docs for bg-glow and bg-cloud ((b2a65f20))
* **ellipsis:** make ellisis 2 & 3 line work in the styleguide ((4187fca9))
* **files:**
  * rename style_guide to styleguide ((647bb5f0))
  * pluralize names and change extensions to .scss ((3c37e245))
* **javascript:** deprecated javascript specific components ((99c9cf6a))
* **media:** fix stackable media components ((5a08fc4d), closes (#80741572))
* **media object:** removed media-list ((b3f859f9))
* **panes:** update panes ((0017fe32))
* **styleguide:**
  * remove extraneous empty divs from table docs ((87c7f9dd))
  * fix non-encoded hyphens in docs ((b7deed43), closes (#80909858))
  * Scroll to correct position from top level nav ((bf970967))
* **target:** swap out targets to hashes for links between components. ((a84fabcf))


#### Features

* **avatar:** combine gravatars with avatars and make them their own section. ((d31eaf9d))
* **back-to-top:** add back-to-top widget ((f09d9ba8))
* **background:** make hero image smaller ((0fbeb27d))
* **bootstrap:** bump to Boostrap v3.2.0 ((a5c6e486))
* **button:** change full width title to camelcase ((04f79895))
* **clickable:** update clickables ((84c41f98))
* **collapse:** Renamed Collapse to Accordion ((601db497))
* **embeds:** add docs for responsive embeds ((88d13f0a))
* **errors:** align bootstrap errors to checkboxes and radio buttons ((3fe4ad18))
* **flag:** refactored media to allow vertical alignment ((d5f3f979))
* **gravatar:** pulled gravatar from images ((f9b83a9c))
* **modal:** move inline modal to be a child of modals. ((a4367ced))
* **modals:** Add new alternate dark modal style ((33b8a017))
* **print:** add 3 new print utilities ((a4f8d8d7))
* **styleguide:**
  * pend broken components ((5692f960))
  * removed parent name from children ((7105ace2))
  * add scrolling to section-nav elements > > [Finishes #80392096] ((171827d9))
* **styleguide-typography:** Make styleguide headings teal ((6406d79c))
* **traffic lights:** modified traffic lights docs ((18e6af5a))
* **utilities:** add docs for responsive utilities ((a890fd98))

<a name="0.1.0"></a>
## 0.1.0 (2014-10-20)

Upgraded to Bootstrap 3.2.0

.media api updated

.panel-clickable-1 -> .panel-clickable
.panel-clickable-2 -> .panel-clickable-alt

.visible-xs -> .visible-xs-block
.visible-sm -> .visible-sm-block
.visible-md -> .visible-md-block
.visible-lg -> .visible-lg-block

.visible-print -> .visible-print-block

.panel-space -> .panel-alt
.panel-stopped -> .panel-off
.panel-crashed -> .panel-danger

.panel-simple-highlight -> .panel-basic-highlight

link-lowlight-inverse -> link-lowlight-alt

Application dashboard removed

upgrade_your_account widget deprecated

.btn-alternate deprecated

.boxBgBasic .boxDefault .boxHeadBranded deprecated

.bkg-highlight-1 has been removed


#### Dividers

.divider-lowlight -> removed. Use .divider-n and .divider-alternate-n instead.

#### Backgrounds
.bkg-overlay-n have been removed
.bkg-highlight-1 has been deprecated
.bkg-highlight-2 -> .bg-cloud

#### Typography

h6 has been removed
.type-em-n have been removed, use classes in the type sizes section instead.
.type-deemphasis classes have also been removed, use classes in the type weights section instead
.h1-login or .h2-login have been removed, user regular headings in the type sizes section

$type-accent-n  -> removed
$type-gray-n    -> removed
$type-primary-n -> removed

.type-accent-n  -> now uses accent blue. If you want teal colors, use .type-brand-n
.type-primary-n -> removed. For gray colored text, use .type-neutral-n


#### Sass Var changes

$shadow-1            -> rgba(0, 0, 0, 0.3);

$bkg-default-4-color -> $bg-neutral-9
$bkg-default-5-color -> $bg-neutral-10

$teal-1, $teal-2     -> $teal-1
$teal-3              -> $teal-2
$teal-4              -> $teal-3
$teal-5              -> $teal-3
$teal-6              -> $teal-4
$teal-7              -> $teal-5

$blue-1              -> $navy-1
$blue-2              -> $blue-1
$blue-3              -> $blue-2
$blue-4              -> $blue-3
$blue-5              -> $blue-4
$blue-6              -> $blue-5

$bkg-default-3-color -> removed, use $dark-1 instead

$red-2               -> $red-1
new color #eb3d46    -> $red-2




#### Class Name Changes
.bkg-default-4 -> .bg-neutral-9
.bkg-default-5 -> .bg-neutral-10
.bkg-primary-2 -> removed, consider .bg-brand-1 as an alternative
.bkg-primary-3 -> removed, consider .bg-accent-4 as an alternative
.bkg-default-3 -> removed, consider .bg-dark-1 as an alternative


```
* New!            $gray-1
* $gray-1 is now  $gray-2
* $gray-2 is now  $gray-3
* $gray-3 is now  $gray-4
* $gray-4 is now  $gray-5, and the color has changed to #b4b4b4
* New!            $gray-6
* $gray-5 is now  $gray-7
* $gray-6 is now  $gray-8
* $gray-7 is now  $gray-9
* $gray-8 is now  $gray-10
```

* `styleguide/` and `build/` have now been replaced by `dist/`, refer to all assets there.
* Deprecated: the button alternate style
* Added: button highlight alternate
* Added: button default alternate
* Added: $glow-4


### v0.0.2

* Removes `lib/` and introduces `build/` as the directory for compiled CSS.
* Organizes dependencies into individual directories.

### v0.0.1

* Initial export of console Sass and compiled CSS files.
