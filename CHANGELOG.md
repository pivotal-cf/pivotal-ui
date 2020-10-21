<a name="19.2.5"></a>
## 19.2.5 (2020-10-21)

<a name="19.2.4"></a>
## 19.2.4 (2020-05-01)

<a name="19.2.3"></a>
## 19.2.3 (2020-01-25)
#### React
* **panels**: Change Panel header to take in node to allow increased flexibility ([49f4292f](https://github.com/pivotal-cf/pivotal-ui/commit/49f4292f))
<a name="19.2.2"></a>
## 19.2.2 (2019-10-17)

<a name="19.2.1"></a>
## 19.2.1 (2019-10-17)

<a name="19.2.0"></a>
# 19.2.0 (2019-10-17)
#### React
* **autocomplete**: Make autocomplete a controlled component when value is passed to it ([35d45b42](https://github.com/pivotal-cf/pivotal-ui/commit/35d45b42))
<a name="19.1.2"></a>
## 19.1.2 (2019-10-15)
#### React
* **autocomplete**: Fix bug in how the autocomplete component interacted with asynchronous onSearch functions [[:beetle:#169158884](https://www.pivotaltracker.com/story/show/169158884)](https://www.pivotaltracker.com/story/show/169158884) ([f49d6b36](https://github.com/pivotal-cf/pivotal-ui/commit/f49d6b36))
<a name="19.1.1"></a>
## 19.1.1 (2019-10-14)
#### CSS
* **panels**: Remove position relative in pui-panel ([f12e5c14](https://github.com/pivotal-cf/pivotal-ui/commit/f12e5c14))
<a name="19.1.0"></a>
# 19.1.0 (2019-10-10)
#### CSS
* **dropdowns**: Make dropdown more accessible as a navigation menu ([c54f496b](https://github.com/pivotal-cf/pivotal-ui/commit/c54f496b))
* **panels**: Remove position relative on panel body since the panel itself is position relative ([ce159636](https://github.com/pivotal-cf/pivotal-ui/commit/ce159636))
* **select**: Add AppsManager select to PUI ([786221f4](https://github.com/pivotal-cf/pivotal-ui/commit/786221f4))
* **tables**: Allow button to take the background color of its parent in firefox ([a0ffffbc](https://github.com/pivotal-cf/pivotal-ui/commit/a0ffffbc))
* **typography**: Add emphasis modifier .em-capitalize ([d9f06482](https://github.com/pivotal-cf/pivotal-ui/commit/d9f06482))
#### React
* **dropdowns**: Make dropdown more accessible as a navigation menu ([c54f496b](https://github.com/pivotal-cf/pivotal-ui/commit/c54f496b))
* **mixins**: Do not use setImmediate in our implementation since it is nonstandard ([d16fb04c](https://github.com/pivotal-cf/pivotal-ui/commit/d16fb04c))
* **select**: Add AppsManager select to PUI ([786221f4](https://github.com/pivotal-cf/pivotal-ui/commit/786221f4))
<a name="19.0.1"></a>
## 19.0.1 (2019-10-09)

<a name="19.0.0"></a>
# 19.0.0 (2019-10-08)
#### CSS
* **animation**: Update Table to be more accessible and use building blocks rather than big objects ([0f18c0fb](https://github.com/pivotal-cf/pivotal-ui/commit/0f18c0fb))
* **border**: Update loading indicator to have a border radius ([ae88d03e](https://github.com/pivotal-cf/pivotal-ui/commit/ae88d03e))
* **flex-grids**:
  * Use correct css rule for -ms-flex-preferred-size ([f4f93352](https://github.com/pivotal-cf/pivotal-ui/commit/f4f93352))
  * Fix col spacing for non IE browsers ([279efe9e](https://github.com/pivotal-cf/pivotal-ui/commit/279efe9e))
  * Remove -ms-flex-preferred-size since it overrides flex-basis and explicitly set flex-basis ([fcbb1a23](https://github.com/pivotal-cf/pivotal-ui/commit/fcbb1a23))
  * Remove conflicting flex css and remove flex-basis: 0 to fix layouts on IE ([0282367e](https://github.com/pivotal-cf/pivotal-ui/commit/0282367e))
* **panels**:
  * Make pui-panel position relative so the loading state does not escape from the panel ([26117343](https://github.com/pivotal-cf/pivotal-ui/commit/26117343))
  * Use an actual element rather than a pseudo element for animating ([44f4614e](https://github.com/pivotal-cf/pivotal-ui/commit/44f4614e))
  * Update loading indicator to have a border radius ([ae88d03e](https://github.com/pivotal-cf/pivotal-ui/commit/ae88d03e))
* **pui-variables.scss**:
  * Update Table to be more accessible and use building blocks rather than big objects ([0f18c0fb](https://github.com/pivotal-cf/pivotal-ui/commit/0f18c0fb))
  * Fix col spacing for non IE browsers ([279efe9e](https://github.com/pivotal-cf/pivotal-ui/commit/279efe9e))
  * Change monospace font to Source Code Pro ([6a69eb01](https://github.com/pivotal-cf/pivotal-ui/commit/6a69eb01))
  * Update $hover--onDark pui variable ([7c4e104c](https://github.com/pivotal-cf/pivotal-ui/commit/7c4e104c))
* **tables**:
  * Update Table to be more accessible and use building blocks rather than big objects ([0f18c0fb](https://github.com/pivotal-cf/pivotal-ui/commit/0f18c0fb))
  * Make withRowDrawer table plugin keyboard navigable [#163574940] ([5b8fafef](https://github.com/pivotal-cf/pivotal-ui/commit/5b8fafef))
* **tabs**: Prevent tabs from adding a hash to the url on click - and fix styling of responsive small tabs to match left aligned non-responsive large tabs [[:beetle:#167583925](https://www.pivotaltracker.com/story/show/167583925)] ([21ba2a24](https://github.com/pivotal-cf/pivotal-ui/commit/21ba2a24))
* **typography**:
  * Update Table to be more accessible and use building blocks rather than big objects ([0f18c0fb](https://github.com/pivotal-cf/pivotal-ui/commit/0f18c0fb))
  * Add tests to validate our fonts are WOFFs and remove italic 400 cyrillic since it is not yet supported ([958b3c22](https://github.com/pivotal-cf/pivotal-ui/commit/958b3c22))
  * Add cyrillic charactors to our fonts ([ae88ebdd](https://github.com/pivotal-cf/pivotal-ui/commit/ae88ebdd))
  * Change monospace font to Source Code Pro ([6a69eb01](https://github.com/pivotal-cf/pivotal-ui/commit/6a69eb01))
#### React
* **checkbox-dropdown**:
  * update property name and add stylesheet definition ([ad282f46](https://github.com/pivotal-cf/pivotal-ui/commit/ad282f46))
  * run with lint ([7ca18491](https://github.com/pivotal-cf/pivotal-ui/commit/7ca18491))
  * Make title of checkbox dropdown connfigurable ([a81ed6b1](https://github.com/pivotal-cf/pivotal-ui/commit/a81ed6b1))
* **copy-to-clipboard**: Allow users to specifiy tooltip placement on CopyToClipboard component ([a0da3a5d](https://github.com/pivotal-cf/pivotal-ui/commit/a0da3a5d))
* **dialog**: Only close modals and flyouts if click is initiated outside dialog [[:beetle:#167525463](https://www.pivotaltracker.com/story/show/167525463)] ([45bc2dc8](https://github.com/pivotal-cf/pivotal-ui/commit/45bc2dc8))
* **flyout**: Allow users to close flyouts with escape key or by clicking outside of flyout [#163573952] ([883c9c20](https://github.com/pivotal-cf/pivotal-ui/commit/883c9c20))
* **forms**:
  * Introduce `setErrors` callback to Form component ([5a54e224](https://github.com/pivotal-cf/pivotal-ui/commit/5a54e224))
  * Fix form id to be unique [[:beetle:#166481920](https://www.pivotaltracker.com/story/show/166481920)] ([13c9e00d](https://github.com/pivotal-cf/pivotal-ui/commit/13c9e00d))
  * Generate valid DOM ids for form labels [[:beetle:#166481920](https://www.pivotaltracker.com/story/show/166481920)] ([05aefcf6](https://github.com/pivotal-cf/pivotal-ui/commit/05aefcf6))
* **iconography**: Convert tabs to spaces in icons.js ([e7c4f56c](https://github.com/pivotal-cf/pivotal-ui/commit/e7c4f56c))
* **panels**:
  * Use an actual element rather than a pseudo element for animating ([44f4614e](https://github.com/pivotal-cf/pivotal-ui/commit/44f4614e))
  * Fix col spacing for non IE browsers ([279efe9e](https://github.com/pivotal-cf/pivotal-ui/commit/279efe9e))
* **siteframe**: Add className prop to siteframe components [#168434418] ([513944dc](https://github.com/pivotal-cf/pivotal-ui/commit/513944dc))
* **svg**: Remove deprecated SVG component [[:gear:#164283978](https://www.pivotaltracker.com/story/show/164283978)] ([2908cbd6](https://github.com/pivotal-cf/pivotal-ui/commit/2908cbd6))
* **table**:
  * Update Table to be more accessible and use building blocks rather than big objects ([0f18c0fb](https://github.com/pivotal-cf/pivotal-ui/commit/0f18c0fb))
  * Allow the rowDrawer plugin's expanded state to be controlled (#627) ([a35e0aa4](https://github.com/pivotal-cf/pivotal-ui/commit/a35e0aa4))
  * Make tooltips tabbable and trigger on focus [#163572717] ([fb385bff](https://github.com/pivotal-cf/pivotal-ui/commit/fb385bff))
  * Make withRowDrawer table plugin keyboard navigable [#163574940] ([5b8fafef](https://github.com/pivotal-cf/pivotal-ui/commit/5b8fafef))
* **tabs**: Prevent tabs from adding a hash to the url on click - and fix styling of responsive small tabs to match left aligned non-responsive large tabs [[:beetle:#167583925](https://www.pivotaltracker.com/story/show/167583925)] ([21ba2a24](https://github.com/pivotal-cf/pivotal-ui/commit/21ba2a24))
* **tooltip**:
  * Add 'disabled' prop to tooltip trigger [#168090263] ([0ec87f8f](https://github.com/pivotal-cf/pivotal-ui/commit/0ec87f8f))
  * Make tooltips tabbable and trigger on focus [#163572717] ([fb385bff](https://github.com/pivotal-cf/pivotal-ui/commit/fb385bff))
<a name="18.1.13"></a>
## 18.1.13 (2020-10-21)

<a name="18.1.12"></a>
## 18.1.12 (2020-05-07)

<a name="18.1.11"></a>
## 18.1.11 (2020-01-25)
#### React
* **panels**: Change Panel header to take in node to allow increased flexibility ([301b5a51](https://github.com/pivotal-cf/pivotal-ui/commit/301b5a51))
<a name="18.1.10"></a>
## 18.1.10 (2019-10-15)
#### React
* **autocomplete**: Fix bug in how the autocomplete component interacted with asynchronous onSearch functions [[:beetle:#169158884](https://www.pivotaltracker.com/story/show/169158884)](https://www.pivotaltracker.com/story/show/169158884) ([54d53ac6](https://github.com/pivotal-cf/pivotal-ui/commit/54d53ac6))
<a name="18.1.9"></a>
## 18.1.9 (2019-10-09)
#### React
* **autocomplete**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
* **draggable-list**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
* **expander**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
* **mixins**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
* **overlay-trigger**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
* **table**: Rename RowDrawer component deprecated lifecycle events ([b56b500b](https://github.com/pivotal-cf/pivotal-ui/commit/b56b500b))
* **tabs**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
* **tooltip**: Upgrade React to 16.10.2 ([a08f867f](https://github.com/pivotal-cf/pivotal-ui/commit/a08f867f))
<a name="18.1.8"></a>
## 18.1.8 (2019-09-27)
#### CSS
* **panels**: Make pui-panel position relative so the loading state does not escape from the panel ([11e6af39](https://github.com/pivotal-cf/pivotal-ui/commit/11e6af39))
#### React
* **siteframe**: Add className prop to siteframe components [#168434418] ([9c954703](https://github.com/pivotal-cf/pivotal-ui/commit/9c954703))
<a name="18.1.7"></a>
## 18.1.7 (2019-09-04)
#### CSS
* **panels**: Use an actual element rather than a pseudo element for animating ([a05a35ed](https://github.com/pivotal-cf/pivotal-ui/commit/a05a35ed))
#### React
* **panels**: Use an actual element rather than a pseudo element for animating ([a05a35ed](https://github.com/pivotal-cf/pivotal-ui/commit/a05a35ed))
<a name="18.1.6"></a>
## 18.1.6 (2019-08-28)
#### CSS
* **border**: Update loading indicator to have a border radius ([bf3d0b71](https://github.com/pivotal-cf/pivotal-ui/commit/bf3d0b71))
* **panels**: Update loading indicator to have a border radius ([bf3d0b71](https://github.com/pivotal-cf/pivotal-ui/commit/bf3d0b71))
<a name="18.1.5"></a>
## 18.1.5 (2019-08-28)
#### CSS
* **flex-grids**:
  * Use correct css rule for -ms-flex-preferred-size ([5bb00d50](https://github.com/pivotal-cf/pivotal-ui/commit/5bb00d50))
  * Fix col spacing for non IE browsers ([622711f6](https://github.com/pivotal-cf/pivotal-ui/commit/622711f6))
* **pui-variables.scss**: Fix col spacing for non IE browsers ([622711f6](https://github.com/pivotal-cf/pivotal-ui/commit/622711f6))
#### React
* **panels**: Fix col spacing for non IE browsers ([622711f6](https://github.com/pivotal-cf/pivotal-ui/commit/622711f6))
<a name="18.1.4"></a>
## 18.1.4 (2019-08-28)
#### CSS
* **typography**: Add tests to validate our fonts are WOFFs and remove italic 400 cyrillic since it is not yet supported ([c6f8cd4c](https://github.com/pivotal-cf/pivotal-ui/commit/c6f8cd4c))
<a name="18.1.3"></a>
## 18.1.3 (2019-08-27)
#### CSS
* **flex-grids**:
  * Remove -ms-flex-preferred-size since it overrides flex-basis and explicitly set flex-basis ([745518bd](https://github.com/pivotal-cf/pivotal-ui/commit/745518bd))
  * Remove conflicting flex css and remove flex-basis: 0 to fix layouts on IE ([29e5b866](https://github.com/pivotal-cf/pivotal-ui/commit/29e5b866))
#### React
* **copy-to-clipboard**: Allow users to specifiy tooltip placement on CopyToClipboard component ([428c1791](https://github.com/pivotal-cf/pivotal-ui/commit/428c1791))
* **tooltip**: Add 'disabled' prop to tooltip trigger [#168090263] ([62e26693](https://github.com/pivotal-cf/pivotal-ui/commit/62e26693))
<a name="18.1.2"></a>
## 18.1.2 (2019-08-23)
#### CSS
* **typography**: Add cyrillic charactors to our fonts ([fbcef3b2](https://github.com/pivotal-cf/pivotal-ui/commit/fbcef3b2))
#### React
* **checkbox-dropdown**: Make title of checkbox dropdown connfigurable ([bdffe7e0](https://github.com/pivotal-cf/pivotal-ui/commit/bdffe7e0))
<a name="18.1.1"></a>
## 18.1.1 (2019-07-30)
#### CSS
* **tabs**: Prevent tabs from adding a hash to the url on click - and fix styling of responsive small tabs to match left aligned non-responsive large tabs [[:beetle:#167583925](https://www.pivotaltracker.com/story/show/167583925)] ([24cfcab6](https://github.com/pivotal-cf/pivotal-ui/commit/24cfcab6))
#### React
* **dialog**: Only close modals and flyouts if click is initiated outside dialog [[:beetle:#167525463](https://www.pivotaltracker.com/story/show/167525463)] ([321751d0](https://github.com/pivotal-cf/pivotal-ui/commit/321751d0))
* **forms**:
  * Introduce `setErrors` callback to Form component ([2b8cca8c](https://github.com/pivotal-cf/pivotal-ui/commit/2b8cca8c))
  * Fix form id to be unique [[:beetle:#166481920](https://www.pivotaltracker.com/story/show/166481920)] ([c36f12b3](https://github.com/pivotal-cf/pivotal-ui/commit/c36f12b3))
  * Generate valid DOM ids for form labels [[:beetle:#166481920](https://www.pivotaltracker.com/story/show/166481920)] ([f12b2bee](https://github.com/pivotal-cf/pivotal-ui/commit/f12b2bee))
* **table**: Allow the rowDrawer plugin's expanded state to be controlled (#627) ([df0dfd50](https://github.com/pivotal-cf/pivotal-ui/commit/df0dfd50))
* **tabs**: Prevent tabs from adding a hash to the url on click - and fix styling of responsive small tabs to match left aligned non-responsive large tabs [[:beetle:#167583925](https://www.pivotaltracker.com/story/show/167583925)] ([24cfcab6](https://github.com/pivotal-cf/pivotal-ui/commit/24cfcab6))
<a name="18.1.0"></a>
# 18.1.0 (2019-06-04)
#### CSS
* **tables**: Make withRowDrawer table plugin keyboard navigable [#163574940] ([8cedd5b8](https://github.com/pivotal-cf/pivotal-ui/commit/8cedd5b8))
#### React
* **flyout**: Allow users to close flyouts with escape key or by clicking outside of flyout [#163573952] ([320113ae](https://github.com/pivotal-cf/pivotal-ui/commit/320113ae))
* **svg**: Remove deprecated SVG component [[:gear:#164283978](https://www.pivotaltracker.com/story/show/164283978)] ([eabc5497](https://github.com/pivotal-cf/pivotal-ui/commit/eabc5497))
* **table**: Make withRowDrawer table plugin keyboard navigable [#163574940] ([8cedd5b8](https://github.com/pivotal-cf/pivotal-ui/commit/8cedd5b8))
<a name="18.0.0"></a>
# 18.0.0 (2019-04-08)
#### CSS
* **alerts**:
  * Make links in alerts styled correctly without pui-alert-link class ([6dcc3281](https://github.com/pivotal-cf/pivotal-ui/commit/6dcc3281))
  * Update alerts for new color palette + accessibility [#164292905] ([1d84421d](https://github.com/pivotal-cf/pivotal-ui/commit/1d84421d))
  * Remove deprecated non-namespaced CSS classes from alerts ([c5502097](https://github.com/pivotal-cf/pivotal-ui/commit/c5502097))
  * Fix nested flex issue on Alerts (#586) ([f7748a93](https://github.com/pivotal-cf/pivotal-ui/commit/f7748a93))
* **autocomplete**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **back-to-top**:
  * Remove deprecated non-namespaced CSS classes from back-to-top ([ae280091](https://github.com/pivotal-cf/pivotal-ui/commit/ae280091))
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **button-group**:
  * Remove deprecated button group styles & documentation [[:gear:#164339716](https://www.pivotaltracker.com/story/show/164339716)] ([40723188](https://github.com/pivotal-cf/pivotal-ui/commit/40723188))
  * Update button & button_group CSS for new color palette [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([a2b1a1d1](https://github.com/pivotal-cf/pivotal-ui/commit/a2b1a1d1))
* **buttons**:
  * Remove box shadow from alt buttons [#164456663] ([54aff492](https://github.com/pivotal-cf/pivotal-ui/commit/54aff492))
  * fix line-height calculation to center text in buttons ([89a26c7e](https://github.com/pivotal-cf/pivotal-ui/commit/89a26c7e))
  * Fix margin next to icon in button with iconPosition=right, refactor button scss ([777d11ed](https://github.com/pivotal-cf/pivotal-ui/commit/777d11ed))
  * Remove box-shadow from flat buttons [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([048025b9](https://github.com/pivotal-cf/pivotal-ui/commit/048025b9))
  * Add 50ms transition to button outlines on focus ([aa6efbb5](https://github.com/pivotal-cf/pivotal-ui/commit/aa6efbb5))
  * Update button & button_group CSS for new color palette [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([a2b1a1d1](https://github.com/pivotal-cf/pivotal-ui/commit/a2b1a1d1))
  * Remove deprecated non-namespaced CSS classes from buttons ([cca3e5de](https://github.com/pivotal-cf/pivotal-ui/commit/cca3e5de))
  * Fix buttons not being disabled within a disabled fieldset ([c5458743](https://github.com/pivotal-cf/pivotal-ui/commit/c5458743))
* **checkbox**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **code**:
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
  * Remove deprecated Prism files from PUI [[:gear:#155826092](https://www.pivotaltracker.com/story/show/155826092)] ([20ae2576](https://github.com/pivotal-cf/pivotal-ui/commit/20ae2576))
  * Style Close Min Max Terminal Buttons (#568) ([3b68ccf1](https://github.com/pivotal-cf/pivotal-ui/commit/3b68ccf1))
  * Fix spacing around terminal dots in Code component [[:beetle:#160367470](https://www.pivotaltracker.com/story/show/160367470)] ([69a6056a](https://github.com/pivotal-cf/pivotal-ui/commit/69a6056a))
* **collapse**:
  * remove weird whitespace on collapse ([86d61890](https://github.com/pivotal-cf/pivotal-ui/commit/86d61890))
  * Remove deprecated non-namespaced CSS classes from collapse & collapsible ([413ee32e](https://github.com/pivotal-cf/pivotal-ui/commit/413ee32e))
* **colors**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **copy-to-clipboard**: Remove deprecated non-namespaced CSS classes from copy-to-clipboard ([a2a55921](https://github.com/pivotal-cf/pivotal-ui/commit/a2a55921))
* **dropdowns**:
  * Remove deprecated button group styles & documentation [[:gear:#164339716](https://www.pivotaltracker.com/story/show/164339716)] ([40723188](https://github.com/pivotal-cf/pivotal-ui/commit/40723188))
  * Fix background color of title in split dropdowns [[:beetle:#164609841](https://www.pivotaltracker.com/story/show/164609841)] ([723042d7](https://github.com/pivotal-cf/pivotal-ui/commit/723042d7))
  * Remove deprecated React Select component [[:gear:#164616273](https://www.pivotaltracker.com/story/show/164616273)] ([30ee187b](https://github.com/pivotal-cf/pivotal-ui/commit/30ee187b))
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **flex-grids**:
  * Add flexDirection prop to Grid component (#588) ([f9ffdfb0](https://github.com/pivotal-cf/pivotal-ui/commit/f9ffdfb0))
  * New justifyContent prop for Grid [[:star:#159503837](https://www.pivotaltracker.com/story/show/159503837)] ([72d79d3d](https://github.com/pivotal-cf/pivotal-ui/commit/72d79d3d))
* **flyout**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **forms**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **hoverable**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **iconography**:
  * Define icons as React components to eliminate SVG -&gt; JSX build step and allow testing ([9cf99003](https://github.com/pivotal-cf/pivotal-ui/commit/9cf99003))
  * Do not hardcode fill value in print and highlight icons [[:beetle:#162360007](https://www.pivotaltracker.com/story/show/162360007)] ([36e67b0a](https://github.com/pivotal-cf/pivotal-ui/commit/36e67b0a))
  * Update upload icon [[:star:#160146179](https://www.pivotaltracker.com/story/show/160146179)] ([00f88aaf](https://github.com/pivotal-cf/pivotal-ui/commit/00f88aaf))
  * delete 'highlight_off' icon [[:star:#160146327](https://www.pivotaltracker.com/story/show/160146327)] ([d120525d](https://github.com/pivotal-cf/pivotal-ui/commit/d120525d))
  * delete 'done' icon [[:star:#160146441](https://www.pivotaltracker.com/story/show/160146441)] ([3b5f2a55](https://github.com/pivotal-cf/pivotal-ui/commit/3b5f2a55))
* **inputs**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **mixins.scss**: Update alerts for new color palette + accessibility [#164292905] ([1d84421d](https://github.com/pivotal-cf/pivotal-ui/commit/1d84421d))
* **modal**:
  * Remove deprecated button group styles & documentation [[:gear:#164339716](https://www.pivotaltracker.com/story/show/164339716)] ([40723188](https://github.com/pivotal-cf/pivotal-ui/commit/40723188))
  * Fix modal exit button positioning [[:beetle:#161400408](https://www.pivotaltracker.com/story/show/161400408)] ([afee8dde](https://github.com/pivotal-cf/pivotal-ui/commit/afee8dde))
* **notifications**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **pagination**:
  * raquel told us to change pagination color and table hover state ([4e50d95a](https://github.com/pivotal-cf/pivotal-ui/commit/4e50d95a))
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **panels**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **progress-bar**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **pui-variables.scss**:
  * Make links in alerts styled correctly without pui-alert-link class ([6dcc3281](https://github.com/pivotal-cf/pivotal-ui/commit/6dcc3281))
  * Update alerts for new color palette + accessibility [#164292905] ([1d84421d](https://github.com/pivotal-cf/pivotal-ui/commit/1d84421d))
  * make form errors bright special red ([9faed0cc](https://github.com/pivotal-cf/pivotal-ui/commit/9faed0cc))
  * add hover overlay colors for dark and light backgrounds ([f2bac3fb](https://github.com/pivotal-cf/pivotal-ui/commit/f2bac3fb))
  * rename onLite and onDark colors to be non button-specific ([8030fa11](https://github.com/pivotal-cf/pivotal-ui/commit/8030fa11))
  * Update button & button_group CSS for new color palette [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([a2b1a1d1](https://github.com/pivotal-cf/pivotal-ui/commit/a2b1a1d1))
  * raquel told us to change pagination color and table hover state ([4e50d95a](https://github.com/pivotal-cf/pivotal-ui/commit/4e50d95a))
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
  * Style Close Min Max Terminal Buttons (#568) ([3b68ccf1](https://github.com/pivotal-cf/pivotal-ui/commit/3b68ccf1))
* **radio**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **select**: Remove deprecated React Select component [[:gear:#164616273](https://www.pivotaltracker.com/story/show/164616273)] ([30ee187b](https://github.com/pivotal-cf/pivotal-ui/commit/30ee187b))
* **selection**: Add noSelect prop for checkbox and radios [[:beetle:#162585528](https://www.pivotaltracker.com/story/show/162585528)] ([835c8574](https://github.com/pivotal-cf/pivotal-ui/commit/835c8574))
* **siteframe**:
  * Remove account-dropdown specific styling from siteframe that belongs in Apps Manager ([50e0de09](https://github.com/pivotal-cf/pivotal-ui/commit/50e0de09))
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
  * Make Siteframe header link styling rules apply specifically to header text [[:beetle:#162920819](https://www.pivotaltracker.com/story/show/162920819)] ([9e6dabfc](https://github.com/pivotal-cf/pivotal-ui/commit/9e6dabfc))
  * anchors within the Siteframe header should inherit color [[:beetle:#162746306](https://www.pivotaltracker.com/story/show/162746306)] ([201d5a3b](https://github.com/pivotal-cf/pivotal-ui/commit/201d5a3b))
  * Introduce Siteframe component [[:star:#162564229](https://www.pivotaltracker.com/story/show/162564229)] ([282e2cd0](https://github.com/pivotal-cf/pivotal-ui/commit/282e2cd0))
* **tables**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **text-filter**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **theme-context**: Remove account-dropdown specific styling from siteframe that belongs in Apps Manager ([50e0de09](https://github.com/pivotal-cf/pivotal-ui/commit/50e0de09))
* **toggle**:
  * Make toggle checked color consistent with checkboxes + radio buttons [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([48d6cad5](https://github.com/pivotal-cf/pivotal-ui/commit/48d6cad5))
  * Remove deprecated non-namespaced CSS classes from toggle ([0336c9f8](https://github.com/pivotal-cf/pivotal-ui/commit/0336c9f8))
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **typography**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
#### JS
* **prismjs**: Remove deprecated Prism files from PUI [[:gear:#155826092](https://www.pivotaltracker.com/story/show/155826092)] ([20ae2576](https://github.com/pivotal-cf/pivotal-ui/commit/20ae2576))
#### React
* **alerts**:
  * Update alerts for new color palette + accessibility [#164292905] ([1d84421d](https://github.com/pivotal-cf/pivotal-ui/commit/1d84421d))
  * Remove deprecated non-namespaced CSS classes from alerts ([c5502097](https://github.com/pivotal-cf/pivotal-ui/commit/c5502097))
* **back-to-top**:
  * Remove deprecated non-namespaced CSS classes from back-to-top ([ae280091](https://github.com/pivotal-cf/pivotal-ui/commit/ae280091))
  * BackToTop alwaysVisible should listen to scroll on element, when provided [[:beetle:#160151510](https://www.pivotaltracker.com/story/show/160151510)] ([cf31e8cb](https://github.com/pivotal-cf/pivotal-ui/commit/cf31e8cb))
  * fix backToTop in Chrome when scrollableId not set [[:beetle:#160149375](https://www.pivotaltracker.com/story/show/160149375)] ([2c61158c](https://github.com/pivotal-cf/pivotal-ui/commit/2c61158c))
* **buttons**:
  * Allow button's onDark prop to override theme provider setting [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([7b4970c2](https://github.com/pivotal-cf/pivotal-ui/commit/7b4970c2))
  * Make button components derive onDark prop from theme context ([46f1201a](https://github.com/pivotal-cf/pivotal-ui/commit/46f1201a))
  * Use Fragments to simplify markup in buttons [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([26bb1a1d](https://github.com/pivotal-cf/pivotal-ui/commit/26bb1a1d))
  * Add onDark prop to buttons [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([6979be27](https://github.com/pivotal-cf/pivotal-ui/commit/6979be27))
  * Rename pui-btn--icon class name to pui-btn--icon-only [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([2823332f](https://github.com/pivotal-cf/pivotal-ui/commit/2823332f))
  * Use BEM in button class names [[:star:#164253492](https://www.pivotaltracker.com/story/show/164253492)] ([c52719e4](https://github.com/pivotal-cf/pivotal-ui/commit/c52719e4))
  * Remove deprecated non-namespaced CSS classes from buttons ([cca3e5de](https://github.com/pivotal-cf/pivotal-ui/commit/cca3e5de))
  * Add console warning on icon-only buttons that do not have an aria-label [[:beetle:#162823155](https://www.pivotaltracker.com/story/show/162823155)] ([6b9cb919](https://github.com/pivotal-cf/pivotal-ui/commit/6b9cb919))
* **checkbox**:
  * Make noSelect prop default to undefined for Checkbox/Radio ([296dc744](https://github.com/pivotal-cf/pivotal-ui/commit/296dc744))
  * Add noSelect prop for checkbox and radios [[:beetle:#162585528](https://www.pivotaltracker.com/story/show/162585528)] ([835c8574](https://github.com/pivotal-cf/pivotal-ui/commit/835c8574))
* **checkbox-dropdown**: CheckboxDropdown accepts initial state for box checked-ness. ([88c35c6a](https://github.com/pivotal-cf/pivotal-ui/commit/88c35c6a))
* **collapse**: Remove deprecated non-namespaced CSS classes from collapse & collapsible ([413ee32e](https://github.com/pivotal-cf/pivotal-ui/commit/413ee32e))
* **collapsible**: Remove deprecated non-namespaced CSS classes from collapse & collapsible ([413ee32e](https://github.com/pivotal-cf/pivotal-ui/commit/413ee32e))
* **context**: Add new ThemeProvider/ThemeConsumer components ([6bffe690](https://github.com/pivotal-cf/pivotal-ui/commit/6bffe690))
* **copy-to-clipboard**: Remove deprecated non-namespaced CSS classes from copy-to-clipboard ([a2a55921](https://github.com/pivotal-cf/pivotal-ui/commit/a2a55921))
* **flex-grids**:
  * Add flexDirection prop to Grid component (#588) ([f9ffdfb0](https://github.com/pivotal-cf/pivotal-ui/commit/f9ffdfb0))
  * New justifyContent prop for Grid [[:star:#159503837](https://www.pivotaltracker.com/story/show/159503837)] ([72d79d3d](https://github.com/pivotal-cf/pivotal-ui/commit/72d79d3d))
* **forms**:
  * Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
  * when modifying a checkbox field, call the onModified callback (#587) ([395e4aef](https://github.com/pivotal-cf/pivotal-ui/commit/395e4aef))
  * Use lodash.cloneDeep in Form to improve performance [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([21d49234](https://github.com/pivotal-cf/pivotal-ui/commit/21d49234))
  * Form: only pass callback to setState when custom onChange is provided [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([38cf1cca](https://github.com/pivotal-cf/pivotal-ui/commit/38cf1cca))
  * Form component works for inputs with initial value of 0 [[:beetle:#161687629](https://www.pivotaltracker.com/story/show/161687629)] ([11d73de8](https://github.com/pivotal-cf/pivotal-ui/commit/11d73de8))
* **iconography**: Define icons as React components to eliminate SVG -&gt; JSX build step and allow testing ([9cf99003](https://github.com/pivotal-cf/pivotal-ui/commit/9cf99003))
* **inputs**: Add innerRef prop to Input component ([3d0c696f](https://github.com/pivotal-cf/pivotal-ui/commit/3d0c696f))
* **media**: Allow passing vAlign='top' to Media without warning [[:beetle:#160148430](https://www.pivotaltracker.com/story/show/160148430)] ([028b28d9](https://github.com/pivotal-cf/pivotal-ui/commit/028b28d9))
* **notifications**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **pagination**: Add console warning on icon-only buttons that do not have an aria-label [[:beetle:#162823155](https://www.pivotaltracker.com/story/show/162823155)] ([6b9cb919](https://github.com/pivotal-cf/pivotal-ui/commit/6b9cb919))
* **panels**: Switch to new color palette [[:star:#164018225](https://www.pivotaltracker.com/story/show/164018225)] ([215197cf](https://github.com/pivotal-cf/pivotal-ui/commit/215197cf))
* **radio**:
  * Set readOnly: true on Radios in RadioGroups without onChanges to fix React warning ([ebe91be0](https://github.com/pivotal-cf/pivotal-ui/commit/ebe91be0))
  * Make noSelect prop default to undefined for Checkbox/Radio ([296dc744](https://github.com/pivotal-cf/pivotal-ui/commit/296dc744))
  * Add noSelect prop for checkbox and radios [[:beetle:#162585528](https://www.pivotaltracker.com/story/show/162585528)] ([835c8574](https://github.com/pivotal-cf/pivotal-ui/commit/835c8574))
* **select**: Remove deprecated React Select component [[:gear:#164616273](https://www.pivotaltracker.com/story/show/164616273)] ([30ee187b](https://github.com/pivotal-cf/pivotal-ui/commit/30ee187b))
* **siteframe**:
  * Make Siteframe header link styling rules apply specifically to header text [[:beetle:#162920819](https://www.pivotaltracker.com/story/show/162920819)] ([9e6dabfc](https://github.com/pivotal-cf/pivotal-ui/commit/9e6dabfc))
  * Allow companyName and productName props in Siteframe to be a node [[:beetle:#162669087](https://www.pivotaltracker.com/story/show/162669087)] ([c6104bae](https://github.com/pivotal-cf/pivotal-ui/commit/c6104bae))
  * Introduce Siteframe component [[:star:#162564229](https://www.pivotaltracker.com/story/show/162564229)] ([282e2cd0](https://github.com/pivotal-cf/pivotal-ui/commit/282e2cd0))
* **table**: Table should not require 'attribute' on column [[:beetle:#159752146](https://www.pivotaltracker.com/story/show/159752146)] ([39cf6692](https://github.com/pivotal-cf/pivotal-ui/commit/39cf6692))
* **tabs**:
  * Make tabs clickable via keyboard navigation [[:beetle:#158048701](https://www.pivotaltracker.com/story/show/158048701)] ([0a509da7](https://github.com/pivotal-cf/pivotal-ui/commit/0a509da7))
  * New justifyContent prop for Grid [[:star:#159503837](https://www.pivotaltracker.com/story/show/159503837)] ([72d79d3d](https://github.com/pivotal-cf/pivotal-ui/commit/72d79d3d))
* **toggle**: Remove deprecated non-namespaced CSS classes from toggle ([0336c9f8](https://github.com/pivotal-cf/pivotal-ui/commit/0336c9f8))
<a name="17.2.3"></a>
## 17.2.3 (2019-08-28)
#### CSS
* **flex-grids**: Fix flex basis for non IE browsers [#167720153](https://www.pivotaltracker.com/story/show/167720153) ([99a2a437](https://github.com/pivotal-cf/pivotal-ui/commit/99a2a437))
<a name="17.2.2"></a>
## 17.2.2 (2019-08-27)
#### CSS
* **flex-grids**:
  * Remove -ms-flex-preferred-size since it overrides flex-basis and explicitly set flex-basis ([d573c30c](https://github.com/pivotal-cf/pivotal-ui/commit/d573c30c))
  * Remove conflicting flex css and remove flex-basis: 0 to fix layouts on IE ([d22e3bb7](https://github.com/pivotal-cf/pivotal-ui/commit/d22e3bb7))
<a name="17.2.1"></a>
## 17.2.1 (2019-07-30)
#### React
* **dialog**: Only close modals and flyouts if click is initiated outside dialog [[:beetle:#167525463](https://www.pivotaltracker.com/story/show/167525463)] ([2ed044f7](https://github.com/pivotal-cf/pivotal-ui/commit/2ed044f7))
* **forms**:
  * Introduce `setErrors` callback to Form component ([89e1877f](https://github.com/pivotal-cf/pivotal-ui/commit/89e1877f))
  * Fix form id to be unique [[:beetle:#166481920](https://www.pivotaltracker.com/story/show/166481920)] ([4ae24e8f](https://github.com/pivotal-cf/pivotal-ui/commit/4ae24e8f))
  * Generate valid DOM ids for form labels [[:beetle:#166481920](https://www.pivotaltracker.com/story/show/166481920)] ([e365dfba](https://github.com/pivotal-cf/pivotal-ui/commit/e365dfba))
* **table**: Allow the rowDrawer plugin's expanded state to be controlled (#627) ([a96dd542](https://github.com/pivotal-cf/pivotal-ui/commit/a96dd542))
<a name="17.2.0"></a>
# 17.2.0 (2019-01-11)
#### CSS
* **alerts**: Fix nested flex issue on Alerts (#586) ([aedcd84e](https://github.com/pivotal-cf/pivotal-ui/commit/aedcd84e))
* **flex-grids**: Add flexDirection prop to Grid component (#588) ([b97db226](https://github.com/pivotal-cf/pivotal-ui/commit/b97db226))
* **siteframe**: Make Siteframe header link styling rules apply specifically to header text [[:beetle:#162920819](https://www.pivotaltracker.com/story/show/162920819)] ([0fb0b737](https://github.com/pivotal-cf/pivotal-ui/commit/0fb0b737))
#### React
* **flex-grids**: Add flexDirection prop to Grid component (#588) ([b97db226](https://github.com/pivotal-cf/pivotal-ui/commit/b97db226))
* **forms**: when modifying a checkbox field, call the onModified callback (#587) ([6b9310fd](https://github.com/pivotal-cf/pivotal-ui/commit/6b9310fd))
* **siteframe**: Make Siteframe header link styling rules apply specifically to header text [[:beetle:#162920819](https://www.pivotaltracker.com/story/show/162920819)] ([0fb0b737](https://github.com/pivotal-cf/pivotal-ui/commit/0fb0b737))
<a name="17.1.2"></a>
## 17.1.2 (2018-12-18)
#### CSS
* **siteframe**: anchors within the Siteframe header should inherit color [[:beetle:#162746306](https://www.pivotaltracker.com/story/show/162746306)] ([a01c84a9](https://github.com/pivotal-cf/pivotal-ui/commit/a01c84a9))
<a name="17.1.1"></a>
## 17.1.1 (2018-12-18)
#### CSS
* **iconography**: Do not hardcode fill value in print and highlight icons [[:beetle:#162360007](https://www.pivotaltracker.com/story/show/162360007)] ([057f38b1](https://github.com/pivotal-cf/pivotal-ui/commit/057f38b1))
* **modal**: Fix modal exit button positioning [[:beetle:#161400408](https://www.pivotaltracker.com/story/show/161400408)] ([e69275fd](https://github.com/pivotal-cf/pivotal-ui/commit/e69275fd))
* **selection**: Add noSelect prop for checkbox and radios [[:beetle:#162585528](https://www.pivotaltracker.com/story/show/162585528)] ([0e4ea1de](https://github.com/pivotal-cf/pivotal-ui/commit/0e4ea1de))
#### React
* **checkbox**: Add noSelect prop for checkbox and radios [[:beetle:#162585528](https://www.pivotaltracker.com/story/show/162585528)] ([0e4ea1de](https://github.com/pivotal-cf/pivotal-ui/commit/0e4ea1de))
* **radio**: Add noSelect prop for checkbox and radios [[:beetle:#162585528](https://www.pivotaltracker.com/story/show/162585528)] ([0e4ea1de](https://github.com/pivotal-cf/pivotal-ui/commit/0e4ea1de))
* **siteframe**: Allow companyName and productName props in Siteframe to be a node [[:beetle:#162669087](https://www.pivotaltracker.com/story/show/162669087)] ([6ee29b48](https://github.com/pivotal-cf/pivotal-ui/commit/6ee29b48))
<a name="17.1.0"></a>
# 17.1.0 (2018-12-11)
#### CSS
* **siteframe**: Introduce Siteframe component [[:star:#162564229](https://www.pivotaltracker.com/story/show/162564229)] ([bb40bd4c](https://github.com/pivotal-cf/pivotal-ui/commit/bb40bd4c))
#### React
* **siteframe**: Introduce Siteframe component [[:star:#162564229](https://www.pivotaltracker.com/story/show/162564229)] ([bb40bd4c](https://github.com/pivotal-cf/pivotal-ui/commit/bb40bd4c))
<a name="17.0.5"></a>
## 17.0.5 (2018-12-04)
#### React
* **forms**:
  * Use lodash.cloneDeep in Form to improve performance [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([00fb9212](https://github.com/pivotal-cf/pivotal-ui/commit/00fb9212))
  * Form: only pass callback to setState when custom onChange is provided [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([2eeb0907](https://github.com/pivotal-cf/pivotal-ui/commit/2eeb0907))
  * Form: defer deepEqual comparison until we know onModified prop is set [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([726a82b8](https://github.com/pivotal-cf/pivotal-ui/commit/726a82b8))
  * In Form, remove unnecessary binding of setState [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([9229f99c](https://github.com/pivotal-cf/pivotal-ui/commit/9229f99c))
  * In Form, loop over fields more efficiently to improve performance [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([f4dbb3eb](https://github.com/pivotal-cf/pivotal-ui/commit/f4dbb3eb))
  * Use for-in to loop over form fields in Form render method to improve performance [[:beetle:#162335682](https://www.pivotaltracker.com/story/show/162335682)] ([9ae1f209](https://github.com/pivotal-cf/pivotal-ui/commit/9ae1f209))
<a name="17.0.4"></a>
## 17.0.4 (2018-11-09)

<a name="17.0.3"></a>
## 17.0.3 (2018-11-05)
#### CSS
* **code**:
  * Fix spacing around terminal dots in Code component [[:beetle:#160367470](https://www.pivotaltracker.com/story/show/160367470)] ([20b1dccd](https://github.com/pivotal-cf/pivotal-ui/commit/20b1dccd))
  * Style Close Min Max Terminal Buttons (#568) ([bf5c58a1](https://github.com/pivotal-cf/pivotal-ui/commit/bf5c58a1))
* **pui-variables.scss**: Style Close Min Max Terminal Buttons (#568) ([bf5c58a1](https://github.com/pivotal-cf/pivotal-ui/commit/bf5c58a1))
#### React
* **checkbox-dropdown**: CheckboxDropdown accepts initial state for box checked-ness. ([338ab471](https://github.com/pivotal-cf/pivotal-ui/commit/338ab471))
* **forms**: Form component works for inputs with initial value of 0 [[:beetle:#161687629](https://www.pivotaltracker.com/story/show/161687629)] ([35c2a68a](https://github.com/pivotal-cf/pivotal-ui/commit/35c2a68a))
* **table**: Table should not require 'attribute' on column [[:beetle:#159752146](https://www.pivotaltracker.com/story/show/159752146)] ([99653fa7](https://github.com/pivotal-cf/pivotal-ui/commit/99653fa7))
<a name="17.0.2"></a>
## 17.0.2 (2018-09-05)
#### React
* **back-to-top**:
  * BackToTop alwaysVisible should listen to scroll on element, when provided [[:beetle:#160151510](https://www.pivotaltracker.com/story/show/160151510)] ([d8e544c1](https://github.com/pivotal-cf/pivotal-ui/commit/d8e544c1))
  * fix backToTop in Chrome when scrollableId not set [[:beetle:#160149375](https://www.pivotaltracker.com/story/show/160149375)] ([0cb028f9](https://github.com/pivotal-cf/pivotal-ui/commit/0cb028f9))
* **media**: Allow passing vAlign='top' to Media without warning [[:beetle:#160148430](https://www.pivotaltracker.com/story/show/160148430)] ([9ae41c55](https://github.com/pivotal-cf/pivotal-ui/commit/9ae41c55))
<a name="17.0.1"></a>
## 17.0.1 (2018-08-23)
#### CSS
* **flex-grids**: New justifyContent prop for Grid [[:star:#159503837](https://www.pivotaltracker.com/story/show/159503837)] ([4fed70c9](https://github.com/pivotal-cf/pivotal-ui/commit/4fed70c9))
#### React
* **flex-grids**: New justifyContent prop for Grid [[:star:#159503837](https://www.pivotaltracker.com/story/show/159503837)] ([4fed70c9](https://github.com/pivotal-cf/pivotal-ui/commit/4fed70c9))
* **tabs**: New justifyContent prop for Grid [[:star:#159503837](https://www.pivotaltracker.com/story/show/159503837)] ([4fed70c9](https://github.com/pivotal-cf/pivotal-ui/commit/4fed70c9))
<a name="17.0.0"></a>
# 17.0.0 (2018-08-22)
#### CSS
* **alerts**: improve accessibility of alert close buttons [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([876493cd](https://github.com/pivotal-cf/pivotal-ui/commit/876493cd))
* **backgrounds**: Remove background css ([f1547b87](https://github.com/pivotal-cf/pivotal-ui/commit/f1547b87))
* **buttons**: Add :focus and :hover states for default flat buttons [[:beetle:#159605719](https://www.pivotaltracker.com/story/show/159605719)] ([638ec596](https://github.com/pivotal-cf/pivotal-ui/commit/638ec596))
* **common**: improve accessibility of alert close buttons [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([876493cd](https://github.com/pivotal-cf/pivotal-ui/commit/876493cd))
* **dialog**:
  * Set overflow: hidden on pui-flyout-dialog-backdrop ([c74ab613](https://github.com/pivotal-cf/pivotal-ui/commit/c74ab613))
  * Update flyout to only allow scrolling on the body [#158120117] ([e3971085](https://github.com/pivotal-cf/pivotal-ui/commit/e3971085))
* **flyout**:
  * Set overflow: hidden on pui-flyout-dialog-backdrop ([c74ab613](https://github.com/pivotal-cf/pivotal-ui/commit/c74ab613))
  * Update flyout to only allow scrolling on the body [#158120117] ([e3971085](https://github.com/pivotal-cf/pivotal-ui/commit/e3971085))
* **forms**: when focusing an invalid input/textarea/select in a composite component, the border remains red [#159776171] ([ccfa45e9](https://github.com/pivotal-cf/pivotal-ui/commit/ccfa45e9))
* **iconography**:
  * improve accessibility of alert close buttons [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([876493cd](https://github.com/pivotal-cf/pivotal-ui/commit/876493cd))
  * Use 'report' icon for ErrorAlerts [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([71dc6da7](https://github.com/pivotal-cf/pivotal-ui/commit/71dc6da7))
  * Add check_circle_outline icon [[:star:#159600744](https://www.pivotaltracker.com/story/show/159600744)] ([da6c67db](https://github.com/pivotal-cf/pivotal-ui/commit/da6c67db))
* **mixins.scss**: improve accessibility of alert close buttons [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([876493cd](https://github.com/pivotal-cf/pivotal-ui/commit/876493cd))
* **modal**:
  * Fix Modal body bottom padding with/without footer [[:star:#159633137](https://www.pivotaltracker.com/story/show/159633137)] ([54cde128](https://github.com/pivotal-cf/pivotal-ui/commit/54cde128))
  * Update flyout to only allow scrolling on the body [#158120117] ([e3971085](https://github.com/pivotal-cf/pivotal-ui/commit/e3971085))
  * Increase specificity of modal close button [[:beetle:#157978614](https://www.pivotaltracker.com/story/show/157978614)] ([8498b989](https://github.com/pivotal-cf/pivotal-ui/commit/8498b989))
* **toggle**: Add position: relative to div that wraps Toggle component [[:beetle:#158548185](https://www.pivotaltracker.com/story/show/158548185)] ([b322c772](https://github.com/pivotal-cf/pivotal-ui/commit/b322c772))
* **tooltips**: keep tooltip visible when hovering over content [[:beetle:#159811731](https://www.pivotaltracker.com/story/show/159811731)] ([8777e307](https://github.com/pivotal-cf/pivotal-ui/commit/8777e307))
#### React
* **alerts**:
  * improve accessibility of alert close buttons [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([876493cd](https://github.com/pivotal-cf/pivotal-ui/commit/876493cd))
  * Use 'report' icon for ErrorAlerts [[:star:#159472807](https://www.pivotaltracker.com/story/show/159472807)] ([71dc6da7](https://github.com/pivotal-cf/pivotal-ui/commit/71dc6da7))
* **autocomplete**: Lock trie-search to version 1.1.0 for IE compatibility [[:beetle:#158801137](https://www.pivotaltracker.com/story/show/158801137)] ([1a381016](https://github.com/pivotal-cf/pivotal-ui/commit/1a381016))
* **checkbox**: allow custom form layouts [[:star:#159317578](https://www.pivotaltracker.com/story/show/159317578)] ([6c621a20](https://github.com/pivotal-cf/pivotal-ui/commit/6c621a20))
* **checkbox-dropdown**: remove unnecessary span around the 'all' checkbox ([2d5100d3](https://github.com/pivotal-cf/pivotal-ui/commit/2d5100d3))
* **dialog**: Update flyout to only allow scrolling on the body [#158120117] ([e3971085](https://github.com/pivotal-cf/pivotal-ui/commit/e3971085))
* **flyout**: Update flyout to only allow scrolling on the body [#158120117] ([e3971085](https://github.com/pivotal-cf/pivotal-ui/commit/e3971085))
* **forms**:
  * Update Form state when initialValue changes [[:star:#159941766](https://www.pivotaltracker.com/story/show/159941766)] ([866e3012](https://github.com/pivotal-cf/pivotal-ui/commit/866e3012))
  * fix bug that prevented users from updating a composite form field's value when the field has a defaultProps for the value [[:beetle:#159782516](https://www.pivotaltracker.com/story/show/159782516)] ([f9cdaae9](https://github.com/pivotal-cf/pivotal-ui/commit/f9cdaae9))
  * Generate id for fields once [[:star:#159318497](https://www.pivotaltracker.com/story/show/159318497)] ([cb8b030b](https://github.com/pivotal-cf/pivotal-ui/commit/cb8b030b))
  * Sort FormUnit props ([aa998948](https://github.com/pivotal-cf/pivotal-ui/commit/aa998948))
  * New Form and FormUnit. Remove GridForm, FormRow and FormCol [[:star:#159416165](https://www.pivotaltracker.com/story/show/159416165)] ([a6717285](https://github.com/pivotal-cf/pivotal-ui/commit/a6717285))
  * allow custom form layouts [[:star:#159317578](https://www.pivotaltracker.com/story/show/159317578)] ([6c621a20](https://github.com/pivotal-cf/pivotal-ui/commit/6c621a20))
  * Do not force users to pass null when calling onChange [[:star:#159348538](https://www.pivotaltracker.com/story/show/159348538)] ([53622d02](https://github.com/pivotal-cf/pivotal-ui/commit/53622d02))
  * Generate id for formCol children once [[:star:#159318497](https://www.pivotaltracker.com/story/show/159318497)] ([30cf2575](https://github.com/pivotal-cf/pivotal-ui/commit/30cf2575))
  * Re-construct form state when children are changed [[:star:#159309702](https://www.pivotaltracker.com/story/show/159309702)] ([09de8993](https://github.com/pivotal-cf/pivotal-ui/commit/09de8993))
* **modal**: Fix Modal body bottom padding with/without footer [[:star:#159633137](https://www.pivotaltracker.com/story/show/159633137)] ([54cde128](https://github.com/pivotal-cf/pivotal-ui/commit/54cde128))
* **panels**: Make panel headers and titles vertically aligned [[:beetle:#159573411](https://www.pivotaltracker.com/story/show/159573411)] ([744a5020](https://github.com/pivotal-cf/pivotal-ui/commit/744a5020))
* **radio**: RadioGroups can hold value and passes  and  to children [[:star:#159416165](https://www.pivotaltracker.com/story/show/159416165)] ([da2dccb1](https://github.com/pivotal-cf/pivotal-ui/commit/da2dccb1))
* **table**:
  * Add deprecation warning in CellRenderer table plugin [[:gear:#159903235](https://www.pivotaltracker.com/story/show/159903235)] ([1d243424](https://github.com/pivotal-cf/pivotal-ui/commit/1d243424))
  * Introduce renderThChildren table plugin [[:gear:#159899107](https://www.pivotaltracker.com/story/show/159899107)] ([0ab59be2](https://github.com/pivotal-cf/pivotal-ui/commit/0ab59be2))
  * Use TooltipTrigger instead of OverlayTrigger in Table plugin ([b2247290](https://github.com/pivotal-cf/pivotal-ui/commit/b2247290))
* **toggle**: Add position: relative to div that wraps Toggle component [[:beetle:#158548185](https://www.pivotaltracker.com/story/show/158548185)] ([b322c772](https://github.com/pivotal-cf/pivotal-ui/commit/b322c772))
<a name="16.2.1"></a>
## 16.2.1 (2018-11-05)
#### React
* **forms**: Form component works for inputs with initial value of 0 [[:beetle:#161687629](https://www.pivotaltracker.com/story/show/161687629)] ([546c08b7](https://github.com/pivotal-cf/pivotal-ui/commit/546c08b7))
<a name="16.2.0"></a>
# 16.2.0 (2018-08-07)
#### CSS
* **iconography**: Add check_circle_outline icon [[:star:#159600744](https://www.pivotaltracker.com/story/show/159600744)] ([168df1a9](https://github.com/pivotal-cf/pivotal-ui/commit/168df1a9))
<a name="16.1.0"></a>
# 16.1.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.

<a name="16.0.2"></a>
## 16.0.2 (2018-07-03)
#### React
* **autocomplete**: Lock trie-search to version 1.1.0 for IE compatibility [[:beetle:#158801137](https://www.pivotaltracker.com/story/show/158801137)] ([cb256588](https://github.com/pivotal-cf/pivotal-ui/commit/cb256588))
<a name="16.0.1"></a>
## 16.0.1 (2018-06-21)
#### CSS
* **dialog**:
  * Set overflow: hidden on pui-flyout-dialog-backdrop ([ed72cd31](https://github.com/pivotal-cf/pivotal-ui/commit/ed72cd31))
  * Update flyout to only allow scrolling on the body [#158120117] ([0a7502a1](https://github.com/pivotal-cf/pivotal-ui/commit/0a7502a1))
* **flyout**:
  * Set overflow: hidden on pui-flyout-dialog-backdrop ([ed72cd31](https://github.com/pivotal-cf/pivotal-ui/commit/ed72cd31))
  * Update flyout to only allow scrolling on the body [#158120117] ([0a7502a1](https://github.com/pivotal-cf/pivotal-ui/commit/0a7502a1))
* **modal**:
  * Increase specificity of modal close button [[:beetle:#157978614](https://www.pivotaltracker.com/story/show/157978614)] ([de00535b](https://github.com/pivotal-cf/pivotal-ui/commit/de00535b))
  * Update flyout to only allow scrolling on the body [#158120117] ([0a7502a1](https://github.com/pivotal-cf/pivotal-ui/commit/0a7502a1))
  * Increase specificity of modal close button [[:beetle:#157978614](https://www.pivotaltracker.com/story/show/157978614)] ([3f1e8d83](https://github.com/pivotal-cf/pivotal-ui/commit/3f1e8d83))
#### React
* **dialog**: Update flyout to only allow scrolling on the body [#158120117] ([0a7502a1](https://github.com/pivotal-cf/pivotal-ui/commit/0a7502a1))
* **flyout**: Update flyout to only allow scrolling on the body [#158120117] ([0a7502a1](https://github.com/pivotal-cf/pivotal-ui/commit/0a7502a1))
<a name="16.0.0"></a>
# 16.0.0 (2018-05-24)
#### CSS
* **all**:
  * Delete the 'all' css [[:gear:#157669788](https://www.pivotaltracker.com/story/show/157669788)] ([1ff9d2c2](https://github.com/pivotal-cf/pivotal-ui/commit/1ff9d2c2))
  * Rename 'progess-bars' -&gt; 'progress-bar' ([cbaa1275](https://github.com/pivotal-cf/pivotal-ui/commit/cbaa1275))
* **checkbox**: Add indeterminate state to checkbox [[:gear:#157372012](https://www.pivotaltracker.com/story/show/157372012)] ([aa7e0819](https://github.com/pivotal-cf/pivotal-ui/commit/aa7e0819))
* **checkbox-dropdown**: Make CheckboxDropdown work with new Dropdown [[:gear:#156384281](https://www.pivotaltracker.com/story/show/156384281)] ([9bb71941](https://github.com/pivotal-cf/pivotal-ui/commit/9bb71941))
* **collapse**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **common**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **dialog**: Separate common flyout/modal css into dialog css [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([7daaa937](https://github.com/pivotal-cf/pivotal-ui/commit/7daaa937))
* **flyout**:
  * Separate common flyout/modal css into dialog css [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([7daaa937](https://github.com/pivotal-cf/pivotal-ui/commit/7daaa937))
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
  * Allow users to provide an icon to the flyout header ([321955a2](https://github.com/pivotal-cf/pivotal-ui/commit/321955a2))
* **forms**:
  * Do not apply form css to tags outside of a form [[:beetle:#154782851](https://www.pivotaltracker.com/story/show/154782851)] ([51087299](https://github.com/pivotal-cf/pivotal-ui/commit/51087299))
  * Format form.scss ([1f0b4b3a](https://github.com/pivotal-cf/pivotal-ui/commit/1f0b4b3a))
  * Revert "Do not apply form css to tags outside of a form [[:beetle:#154782851](https://www.pivotaltracker.com/story/show/154782851)]" ([3e7cd1f8](https://github.com/pivotal-cf/pivotal-ui/commit/3e7cd1f8))
  * Move toggle css from form.scss into its own file [[:beetle:#157613435](https://www.pivotaltracker.com/story/show/157613435)] ([14e244e8](https://github.com/pivotal-cf/pivotal-ui/commit/14e244e8))
* **links**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **lists**: delete stream-list [[:gear:#157669788](https://www.pivotaltracker.com/story/show/157669788)] ([aa0222de](https://github.com/pivotal-cf/pivotal-ui/commit/aa0222de))
* **mixins.scss**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **modal**:
  * Separate common flyout/modal css into dialog css [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([7daaa937](https://github.com/pivotal-cf/pivotal-ui/commit/7daaa937))
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
* **modals**:
  * Rewrite Modal to improve keyboard navigation and animation performance [[:beetle:#154675375](https://www.pivotaltracker.com/story/show/154675375)] ([ea939561](https://github.com/pivotal-cf/pivotal-ui/commit/ea939561))
  * Apply modal size css classes [[:beetle:#157378266](https://www.pivotaltracker.com/story/show/157378266)] ([fce27525](https://github.com/pivotal-cf/pivotal-ui/commit/fce27525))
* **panels**: Change panel loading bar speed and color [[:beetle:#155007308](https://www.pivotaltracker.com/story/show/155007308)] ([e19ff0ce](https://github.com/pivotal-cf/pivotal-ui/commit/e19ff0ce))
* **panes**: Remove bootstrap .container css, set proportional padding all around the Pane [[:beetle:#156441349](https://www.pivotaltracker.com/story/show/156441349)] ([079f1308](https://github.com/pivotal-cf/pivotal-ui/commit/079f1308))
* **progress-bar**: Rename 'progess-bars' -&gt; 'progress-bar' ([cbaa1275](https://github.com/pivotal-cf/pivotal-ui/commit/cbaa1275))
* **progress-bars**:
  * Rename 'progess-bars' -&gt; 'progress-bar' ([cbaa1275](https://github.com/pivotal-cf/pivotal-ui/commit/cbaa1275))
  * New ProgressBar component ([7a17c257](https://github.com/pivotal-cf/pivotal-ui/commit/7a17c257))
* **pui-variables.scss**:
  * Remove undocumented ribbon component [[:gear:#157669788](https://www.pivotaltracker.com/story/show/157669788)] ([f3ccfa92](https://github.com/pivotal-cf/pivotal-ui/commit/f3ccfa92))
  * Rewrite Modal to improve keyboard navigation and animation performance [[:beetle:#154675375](https://www.pivotaltracker.com/story/show/154675375)] ([ea939561](https://github.com/pivotal-cf/pivotal-ui/commit/ea939561))
* **radio**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **ribbons**: Remove undocumented ribbon component [[:gear:#157669788](https://www.pivotaltracker.com/story/show/157669788)] ([f3ccfa92](https://github.com/pivotal-cf/pivotal-ui/commit/f3ccfa92))
* **tabs**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **toggle**: Move toggle css from form.scss into its own file [[:beetle:#157613435](https://www.pivotaltracker.com/story/show/157613435)] ([14e244e8](https://github.com/pivotal-cf/pivotal-ui/commit/14e244e8))
#### React
* **back-to-top**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **checkbox**: Add indeterminate state to checkbox [[:gear:#157372012](https://www.pivotaltracker.com/story/show/157372012)] ([aa7e0819](https://github.com/pivotal-cf/pivotal-ui/commit/aa7e0819))
* **checkbox-dropdown**: Make CheckboxDropdown work with new Dropdown [[:gear:#156384281](https://www.pivotaltracker.com/story/show/156384281)] ([9bb71941](https://github.com/pivotal-cf/pivotal-ui/commit/9bb71941))
* **collapsible**: Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
* **dialog**:
  * Do not change padding when preventing scroll on body for Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([8b22619d](https://github.com/pivotal-cf/pivotal-ui/commit/8b22619d))
  * Separate common flyout/modal css into dialog css [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([7daaa937](https://github.com/pivotal-cf/pivotal-ui/commit/7daaa937))
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
* **draggable-list**: Use Puppeteer (headless Chrome) for CI tests instead of PhantomJS [[:gear:#154482629](https://www.pivotaltracker.com/story/show/154482629)] ([099b6019](https://github.com/pivotal-cf/pivotal-ui/commit/099b6019))
* **flyout**:
  * Separate common flyout/modal css into dialog css [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([7daaa937](https://github.com/pivotal-cf/pivotal-ui/commit/7daaa937))
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
  * Enhance Flyout to allow header and body class names [[:gear:#156961700](https://www.pivotaltracker.com/story/show/156961700)] ([24472d38](https://github.com/pivotal-cf/pivotal-ui/commit/24472d38))
  * Allow users to provide an icon to the flyout header ([321955a2](https://github.com/pivotal-cf/pivotal-ui/commit/321955a2))
* **forms**: Use pui-react-tools 4, upgrade to webpack 4, gulp 4. Remove deprecated sandbox and tasks [[:gear:#157608144](https://www.pivotaltracker.com/story/show/157608144)] ([73ee8f0d](https://github.com/pivotal-cf/pivotal-ui/commit/73ee8f0d))
* **helpers**:
  * Do not change padding when preventing scroll on body for Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([8b22619d](https://github.com/pivotal-cf/pivotal-ui/commit/8b22619d))
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
  * Rewrite Modal to improve keyboard navigation and animation performance [[:beetle:#154675375](https://www.pivotaltracker.com/story/show/154675375)] ([ea939561](https://github.com/pivotal-cf/pivotal-ui/commit/ea939561))
* **modal**:
  * Separate common flyout/modal css into dialog css [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([7daaa937](https://github.com/pivotal-cf/pivotal-ui/commit/7daaa937))
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
* **modals**:
  * Extract shared Flyout and Modal functionality into Dialog component [[:star:#157670001](https://www.pivotaltracker.com/story/show/157670001)] ([ca7bbc27](https://github.com/pivotal-cf/pivotal-ui/commit/ca7bbc27))
  * Default to 200ms for all transitions and animations [[:star:#157670024](https://www.pivotaltracker.com/story/show/157670024)] ([ec6871af](https://github.com/pivotal-cf/pivotal-ui/commit/ec6871af))
  * Modals return null when there is no document [[:beetle:#154675375](https://www.pivotaltracker.com/story/show/154675375)] ([225765a7](https://github.com/pivotal-cf/pivotal-ui/commit/225765a7))
  * Rewrite Modal to improve keyboard navigation and animation performance [[:beetle:#154675375](https://www.pivotaltracker.com/story/show/154675375)] ([ea939561](https://github.com/pivotal-cf/pivotal-ui/commit/ea939561))
  * allow arbitrary width units for modals [[:beetle:#157300279](https://www.pivotaltracker.com/story/show/157300279)] ([e7d376be](https://github.com/pivotal-cf/pivotal-ui/commit/e7d376be))
  * Block user from scrolling background when modal is open [[:beetle:#154675247](https://www.pivotaltracker.com/story/show/154675247)] ([728c647f](https://github.com/pivotal-cf/pivotal-ui/commit/728c647f))
  * Allow BaseModal size to be a percentage [[:beetle:#157300279](https://www.pivotaltracker.com/story/show/157300279)] ([d3d5ce52](https://github.com/pivotal-cf/pivotal-ui/commit/d3d5ce52))
* **notifications**: Use pui-react-tools 4, upgrade to webpack 4, gulp 4. Remove deprecated sandbox and tasks [[:gear:#157608144](https://www.pivotaltracker.com/story/show/157608144)] ([73ee8f0d](https://github.com/pivotal-cf/pivotal-ui/commit/73ee8f0d))
* **panels**: Panels require box shadow css [[:beetle:#157327224](https://www.pivotaltracker.com/story/show/157327224)] ([d64f9546](https://github.com/pivotal-cf/pivotal-ui/commit/d64f9546))
* **progress-bar**:
  * Rename 'progess-bars' -&gt; 'progress-bar' ([cbaa1275](https://github.com/pivotal-cf/pivotal-ui/commit/cbaa1275))
  * New ProgressBar component ([7a17c257](https://github.com/pivotal-cf/pivotal-ui/commit/7a17c257))
* **ribbons**: Remove undocumented ribbon component [[:gear:#157669788](https://www.pivotaltracker.com/story/show/157669788)] ([f3ccfa92](https://github.com/pivotal-cf/pivotal-ui/commit/f3ccfa92))
* **stream-list**: delete stream-list [[:gear:#157669788](https://www.pivotaltracker.com/story/show/157669788)] ([aa0222de](https://github.com/pivotal-cf/pivotal-ui/commit/aa0222de))
* **table**: Add withRenderTdChildren table plugin [[:beetle:#157580060](https://www.pivotaltracker.com/story/show/157580060)] ([4893562c](https://github.com/pivotal-cf/pivotal-ui/commit/4893562c))
* **toggle**: Move toggle css from form.scss into its own file [[:beetle:#157613435](https://www.pivotaltracker.com/story/show/157613435)] ([14e244e8](https://github.com/pivotal-cf/pivotal-ui/commit/14e244e8))
<a name="15.1.1"></a>
## 15.1.1 (2018-11-05)
#### React
* **forms**: Form component works for inputs with initial value of 0 [[:beetle:#161687629](https://www.pivotaltracker.com/story/show/161687629)] ([9a10ac01](https://github.com/pivotal-cf/pivotal-ui/commit/9a10ac01))
<a name="15.1.0"></a>
# 15.1.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.

<a name="15.0.0"></a>
# 15.0.0 (2018-03-29)
#### CSS
* **buttons**: Fix IE: Button contents shift when pressed [[:beetle:#155240754](https://www.pivotaltracker.com/story/show/155240754)] ([5cf8c06a](https://github.com/pivotal-cf/pivotal-ui/commit/5cf8c06a))
* **checkbox-dropdown**: Make CheckboxDropdown work with new Dropdown [[:gear:#156384281](https://www.pivotaltracker.com/story/show/156384281)] ([d9a78898](https://github.com/pivotal-cf/pivotal-ui/commit/d9a78898))
* **dropdowns**:
  * Update Dropdown and remove DropdownItem [[:star:#155451478](https://www.pivotaltracker.com/story/show/155451478)] ([047f6953](https://github.com/pivotal-cf/pivotal-ui/commit/047f6953))
  * Fix Notifications example on IE [[:beetle:#155240782](https://www.pivotaltracker.com/story/show/155240782)] ([4037c89e](https://github.com/pivotal-cf/pivotal-ui/commit/4037c89e))
* **forms**: Make CSS for form unit tooltips more specific [[:beetle:#154780254](https://www.pivotaltracker.com/story/show/154780254)] ([acb75f8f](https://github.com/pivotal-cf/pivotal-ui/commit/acb75f8f))
* **media**: Fix Notifications example on IE [[:beetle:#155240782](https://www.pivotaltracker.com/story/show/155240782)] ([4037c89e](https://github.com/pivotal-cf/pivotal-ui/commit/4037c89e))
* **pagination**: Rewrite Pagination component [#155640854] ([9f1b2262](https://github.com/pivotal-cf/pivotal-ui/commit/9f1b2262))
* **tables**:
  * Fix  on FlexTables [[:beetle:#155266909](https://www.pivotaltracker.com/story/show/155266909)] ([012ed375](https://github.com/pivotal-cf/pivotal-ui/commit/012ed375))
  * Tables with scrollable tbody should have bottom border [[:beetle:#154815646](https://www.pivotaltracker.com/story/show/154815646)] ([12e745db](https://github.com/pivotal-cf/pivotal-ui/commit/12e745db))
* **tooltips**: Fix: Clickable tooltip in the styleguide doesn't click [[:beetle:#151660489](https://www.pivotaltracker.com/story/show/151660489)] ([1a3e6f16](https://github.com/pivotal-cf/pivotal-ui/commit/1a3e6f16))
* **typography**: Stop disabling subpixel antialiasing! [[:beetle:#155689262](https://www.pivotaltracker.com/story/show/155689262)] ([b1ec1b1f](https://github.com/pivotal-cf/pivotal-ui/commit/b1ec1b1f))
#### React
* **autocomplete**: update app autocomplete to return the trie-building promise when initializing items, also add an updateList method to be able to update the list of search results without showing the list [[:star:#156202601](https://www.pivotaltracker.com/story/show/156202601)] ([b66c61e4](https://github.com/pivotal-cf/pivotal-ui/commit/b66c61e4))
* **checkbox-dropdown**:
  * Make CheckboxDropdown work with new Dropdown [[:gear:#156384281](https://www.pivotaltracker.com/story/show/156384281)] ([d9a78898](https://github.com/pivotal-cf/pivotal-ui/commit/d9a78898))
  * Update Dropdown and remove DropdownItem [[:star:#155451478](https://www.pivotaltracker.com/story/show/155451478)] ([047f6953](https://github.com/pivotal-cf/pivotal-ui/commit/047f6953))
* **copy-to-clipboard**: Make CopyToClipboard work for text with newlines [[:beetle:#154782444](https://www.pivotaltracker.com/story/show/154782444)] (#555) ([c290ab63](https://github.com/pivotal-cf/pivotal-ui/commit/c290ab63))
* **dropdowns**: Update Dropdown and remove DropdownItem [[:star:#155451478](https://www.pivotaltracker.com/story/show/155451478)] ([047f6953](https://github.com/pivotal-cf/pivotal-ui/commit/047f6953))
* **notifications**: Update Dropdown and remove DropdownItem [[:star:#155451478](https://www.pivotaltracker.com/story/show/155451478)] ([047f6953](https://github.com/pivotal-cf/pivotal-ui/commit/047f6953))
* **pagination**:
  * Pagination component calls onSelect with newActivePage [[:star:#156202613](https://www.pivotaltracker.com/story/show/156202613)] ([cafffdb0](https://github.com/pivotal-cf/pivotal-ui/commit/cafffdb0))
  * Rewrite Pagination component [#155640854] ([9f1b2262](https://github.com/pivotal-cf/pivotal-ui/commit/9f1b2262))
* **tabs**: Load styles when tabs mount [[:beetle:#154842004](https://www.pivotaltracker.com/story/show/154842004)] ([e0a56d30](https://github.com/pivotal-cf/pivotal-ui/commit/e0a56d30))
<a name="14.1.0"></a>
# 14.1.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.

<a name="14.0.0"></a>
# 14.0.0 (2018-02-16)
#### CSS
* **alerts**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **all**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **autocomplete**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **avatars**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **back-to-top**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **bootstrap**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **button-group**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **buttons**:
  * Fix IE: Button contents shift when pressed [[:beetle:#155240754](https://www.pivotaltracker.com/story/show/155240754)] ([0ce2f7a7](https://github.com/pivotal-cf/pivotal-ui/commit/0ce2f7a7))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **code**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **collapse**:
  * Remove box-shadow from Collapse [[:beetle:#154785774](https://www.pivotaltracker.com/story/show/154785774)] ([477a1913](https://github.com/pivotal-cf/pivotal-ui/commit/477a1913))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **common**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **copy-to-clipboard**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **dropdowns**:
  * Fix Notifications example on IE [[:beetle:#155240782](https://www.pivotaltracker.com/story/show/155240782)] ([5faf409d](https://github.com/pivotal-cf/pivotal-ui/commit/5faf409d))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **forms**:
  * Make CSS for form unit tooltips more specific [[:beetle:#154780254](https://www.pivotaltracker.com/story/show/154780254)] ([a653bb1e](https://github.com/pivotal-cf/pivotal-ui/commit/a653bb1e))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **google-maps**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **grids**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **images**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **links**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **media**:
  * Fix Notifications example on IE [[:beetle:#155240782](https://www.pivotaltracker.com/story/show/155240782)] ([5faf409d](https://github.com/pivotal-cf/pivotal-ui/commit/5faf409d))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **mixins.scss**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **modals**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **panels**:
  * restore the bottom border to the panel header area [[:beetle:#154785774](https://www.pivotaltracker.com/story/show/154785774)] ([29bb291c](https://github.com/pivotal-cf/pivotal-ui/commit/29bb291c))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **panes**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **progress-bars**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **pui-variables.scss**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **tables**:
  * Fix  on FlexTables [[:beetle:#155266909](https://www.pivotaltracker.com/story/show/155266909)] ([1d05e1ad](https://github.com/pivotal-cf/pivotal-ui/commit/1d05e1ad))
  * Tables with scrollable tbody should have bottom border [[:beetle:#154815646](https://www.pivotaltracker.com/story/show/154815646)] ([699e916f](https://github.com/pivotal-cf/pivotal-ui/commit/699e916f))
  * Fix table-no-ext-borders for FlexTables [[:beetle:#154380467](https://www.pivotaltracker.com/story/show/154380467)] ([f16dd4e3](https://github.com/pivotal-cf/pivotal-ui/commit/f16dd4e3))
  * Fix missing bottom border on table footer row [#153578787] ([901dd522](https://github.com/pivotal-cf/pivotal-ui/commit/901dd522))
* **tabs**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **tooltips**: Fix: Clickable tooltip in the styleguide doesn't click [[:beetle:#151660489](https://www.pivotaltracker.com/story/show/151660489)] ([8b8d028e](https://github.com/pivotal-cf/pivotal-ui/commit/8b8d028e))
* **typography**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
#### React
* **alerts**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **back-to-top**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **buttons**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **collapse**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **collapsible**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **copy-to-clipboard**:
  * Make CopyToClipboard work for text with newlines [[:beetle:#154782444](https://www.pivotaltracker.com/story/show/154782444)] (#555) ([2b74a472](https://github.com/pivotal-cf/pivotal-ui/commit/2b74a472))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **dropdowns**: In split dropdowns, add role='button' to anchor tag when onSplitClick is given [[:star:#154459066](https://www.pivotaltracker.com/story/show/154459066)] ([bc2ae50d](https://github.com/pivotal-cf/pivotal-ui/commit/bc2ae50d))
* **forms**: Coerce checked property of checkboxes within Forms to be booleans [[:beetle:#154579887](https://www.pivotaltracker.com/story/show/154579887)] ([f51a2069](https://github.com/pivotal-cf/pivotal-ui/commit/f51a2069))
* **grids**: Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
* **iconography**: When an invalid icon name is provided, default to 'help' icon and console warn [[:beetle:#154292350](https://www.pivotaltracker.com/story/show/154292350)] ([999f633f](https://github.com/pivotal-cf/pivotal-ui/commit/999f633f))
* **table**: Do not reset the sort state when props are updated [[:beetle:#154374720](https://www.pivotaltracker.com/story/show/154374720)] ([a0affbf0](https://github.com/pivotal-cf/pivotal-ui/commit/a0affbf0))
* **tabs**:
  * Load styles when tabs mount [[:beetle:#154842004](https://www.pivotaltracker.com/story/show/154842004)] ([16d52229](https://github.com/pivotal-cf/pivotal-ui/commit/16d52229))
  * Remove bootstrap [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] (#548) ([923a54b8](https://github.com/pivotal-cf/pivotal-ui/commit/923a54b8))
<a name="13.1.0"></a>
# 13.1.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.
#### React
* **copy-to-clipboard**: Make CopyToClipboard work for text with newlines [[:beetle:#154782444](https://www.pivotaltracker.com/story/show/154782444)] (#555) ([572e4192](https://github.com/pivotal-cf/pivotal-ui/commit/572e4192))
<a name="13.0.2"></a>
## 13.0.2 (2018-02-14)
#### CSS
* **collapse**: Remove box-shadow from Collapse [[:beetle:#154785774](https://www.pivotaltracker.com/story/show/154785774)] ([43787fa6](https://github.com/pivotal-cf/pivotal-ui/commit/43787fa6))
* **panels**: restore the bottom border to the panel header area [[:beetle:#154785774](https://www.pivotaltracker.com/story/show/154785774)] ([6be8be17](https://github.com/pivotal-cf/pivotal-ui/commit/6be8be17))
#### React
* **collapse**: Remove box-shadow from Collapse [[:beetle:#154785774](https://www.pivotaltracker.com/story/show/154785774)] ([43787fa6](https://github.com/pivotal-cf/pivotal-ui/commit/43787fa6))
* **forms**: Coerce checked property of checkboxes within Forms to be booleans [[:beetle:#154579887](https://www.pivotaltracker.com/story/show/154579887)] ([6d65f210](https://github.com/pivotal-cf/pivotal-ui/commit/6d65f210))
<a name="13.0.1"></a>
## 13.0.1 (2018-01-16)
#### CSS
* **tables**:
  * Fix table-no-ext-borders for FlexTables [[:beetle:#154380467](https://www.pivotaltracker.com/story/show/154380467)] ([b5e61e66](https://github.com/pivotal-cf/pivotal-ui/commit/b5e61e66))
  * Fix missing bottom border on table footer row [#153578787] ([5209ccbe](https://github.com/pivotal-cf/pivotal-ui/commit/5209ccbe))
#### React
* **table**: Do not reset the sort state when props are updated [[:beetle:#154374720](https://www.pivotaltracker.com/story/show/154374720)] ([5a412667](https://github.com/pivotal-cf/pivotal-ui/commit/5a412667))
<a name="13.0.0"></a>
# 13.0.0 (2018-01-12)
#### CSS
* **buttons**: Bring dropdown and checkbox dropdown into PUI [[:gear:#154075625](https://www.pivotaltracker.com/story/show/154075625)] ([2c642590](https://github.com/pivotal-cf/pivotal-ui/commit/2c642590))
* **dropdowns**: Bring dropdown and checkbox dropdown into PUI [[:gear:#154075625](https://www.pivotaltracker.com/story/show/154075625)] ([2c642590](https://github.com/pivotal-cf/pivotal-ui/commit/2c642590))
* **flex-grids**: Make CSS for flex grids less nested [[:beetle:#152292192](https://www.pivotaltracker.com/story/show/152292192)] ([3b54b087](https://github.com/pivotal-cf/pivotal-ui/commit/3b54b087))
* **iconography**:
  * Add trash icon [[:star:#153191221](https://www.pivotaltracker.com/story/show/153191221)] ([9bd32e53](https://github.com/pivotal-cf/pivotal-ui/commit/9bd32e53))
  * Add link_disconnect and terminal icons [[:star:#153191221](https://www.pivotaltracker.com/story/show/153191221)] ([38b13e24](https://github.com/pivotal-cf/pivotal-ui/commit/38b13e24))
* **links**: Links should not force SVG fill color to be blue [[:beetle:#152420796](https://www.pivotaltracker.com/story/show/152420796)] ([79e5bc96](https://github.com/pivotal-cf/pivotal-ui/commit/79e5bc96))
* **notifications**: Bring dropdown and checkbox dropdown into PUI [[:gear:#154075625](https://www.pivotaltracker.com/story/show/154075625)] ([2c642590](https://github.com/pivotal-cf/pivotal-ui/commit/2c642590))
* **panels**:
  * Namespace panels css [[:gear:#154268155](https://www.pivotaltracker.com/story/show/154268155)] ([1358ec94](https://github.com/pivotal-cf/pivotal-ui/commit/1358ec94))
  * Move updated Panels from apps manager to pivotal-ui [[:gear:#153615385](https://www.pivotaltracker.com/story/show/153615385)] ([ca9e071d](https://github.com/pivotal-cf/pivotal-ui/commit/ca9e071d))
#### React
* **checkbox-dropdown**: Bring dropdown and checkbox dropdown into PUI [[:gear:#154075625](https://www.pivotaltracker.com/story/show/154075625)] ([2c642590](https://github.com/pivotal-cf/pivotal-ui/commit/2c642590))
* **dropdowns**: Bring dropdown and checkbox dropdown into PUI [[:gear:#154075625](https://www.pivotaltracker.com/story/show/154075625)] ([2c642590](https://github.com/pivotal-cf/pivotal-ui/commit/2c642590))
* **forms**: Add fieldRowClassName and labelRowClassName props to the FormUnit [[:star:#154183497](https://www.pivotaltracker.com/story/show/154183497)] ([e85afdd6](https://github.com/pivotal-cf/pivotal-ui/commit/e85afdd6))
* **notifications**: Bring dropdown and checkbox dropdown into PUI [[:gear:#154075625](https://www.pivotaltracker.com/story/show/154075625)] ([2c642590](https://github.com/pivotal-cf/pivotal-ui/commit/2c642590))
* **panels**:
  * Namespace panels css [[:gear:#154268155](https://www.pivotaltracker.com/story/show/154268155)] ([1358ec94](https://github.com/pivotal-cf/pivotal-ui/commit/1358ec94))
  * Move updated Panels from apps manager to pivotal-ui [[:gear:#153615385](https://www.pivotaltracker.com/story/show/153615385)] ([ca9e071d](https://github.com/pivotal-cf/pivotal-ui/commit/ca9e071d))
* **radio**: RadioGroup should not override child's onChange unless it has an onChange defined [[:beetle:#154038584](https://www.pivotaltracker.com/story/show/154038584)] ([810c40cc](https://github.com/pivotal-cf/pivotal-ui/commit/810c40cc))
* **svg**: Replace require with __non_webpack_require__ to avoid module not found warning [[:beetle:#153725024](https://www.pivotaltracker.com/story/show/153725024)] ([cb751ce1](https://github.com/pivotal-cf/pivotal-ui/commit/cb751ce1))
* **tabs**: Pull title prop off TabContent so it does not end up on inner div [[:beetle:#153425866](https://www.pivotaltracker.com/story/show/153425866)] ([30564caa](https://github.com/pivotal-cf/pivotal-ui/commit/30564caa))
* **wizard**: Update Wizard component with backComponent, finishComponent, and hideFinishButton [[:star:#153856072](https://www.pivotaltracker.com/story/show/153856072)] ([2525046e](https://github.com/pivotal-cf/pivotal-ui/commit/2525046e))
<a name="12.4.0"></a>
# 12.4.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.
#### React
* **copy-to-clipboard**: Make CopyToClipboard work for text with newlines [[:beetle:#154782444](https://www.pivotaltracker.com/story/show/154782444)] (#555) ([54740944](https://github.com/pivotal-cf/pivotal-ui/commit/54740944))
<a name="12.3.0"></a>
# 12.3.0 (2018-01-11)
#### CSS
* **iconography**:
  * Add trash icon [[:star:#153191221](https://www.pivotaltracker.com/story/show/153191221)] ([3ac94ed1](https://github.com/pivotal-cf/pivotal-ui/commit/3ac94ed1))
  * Add link_disconnect and terminal icons [[:star:#153191221](https://www.pivotaltracker.com/story/show/153191221)] ([6e81cb0f](https://github.com/pivotal-cf/pivotal-ui/commit/6e81cb0f))
<a name="12.2.0"></a>
# 12.2.0 (2018-01-09)
#### React
* **forms**: Add fieldRowClassName and labelRowClassName props to the FormUnit [[:star:#154183497](https://www.pivotaltracker.com/story/show/154183497)] ([f58b55ef](https://github.com/pivotal-cf/pivotal-ui/commit/f58b55ef))
<a name="12.1.1"></a>
## 12.1.1 (2018-01-04)
#### CSS
* **flex-grids**: Make CSS for flex grids less nested [[:beetle:#152292192](https://www.pivotaltracker.com/story/show/152292192)] ([4f16a974](https://github.com/pivotal-cf/pivotal-ui/commit/4f16a974))
#### React
* **svg**: Replace require with __non_webpack_require__ to avoid module not found warning [[:beetle:#153725024](https://www.pivotaltracker.com/story/show/153725024)] ([be674aae](https://github.com/pivotal-cf/pivotal-ui/commit/be674aae))
<a name="12.1.0"></a>
# 12.1.0 (2017-12-21)
#### React
* **wizard**: Update Wizard component with backComponent, finishComponent, and hideFinishButton [[:star:#153856072](https://www.pivotaltracker.com/story/show/153856072)] ([370af8e4](https://github.com/pivotal-cf/pivotal-ui/commit/370af8e4))
<a name="12.0.0"></a>
# 12.0.0 (2017-12-20)
#### CSS
* **checkbox**: Bring new Checkbox/Radio components into PUI [[:gear:#153716511](https://www.pivotaltracker.com/story/show/153716511)] ([b3656756](https://github.com/pivotal-cf/pivotal-ui/commit/b3656756))
* **flex-grids**: Add show-outline class to outline the Grid and FlexCol [[:star:#153725003](https://www.pivotaltracker.com/story/show/153725003)] ([25fd1c76](https://github.com/pivotal-cf/pivotal-ui/commit/25fd1c76))
* **forms**:
  * Fix inline forms in IE/Edge [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([85953017](https://github.com/pivotal-cf/pivotal-ui/commit/85953017))
  * Make Toggle :focus state match new Checkbox/Radio :focus states [[:star:#153690114](https://www.pivotaltracker.com/story/show/153690114)] ([ad9a39d5](https://github.com/pivotal-cf/pivotal-ui/commit/ad9a39d5))
  * give the immediate children of inline field rows a width of 100% [[:beetle:#153460941](https://www.pivotaltracker.com/story/show/153460941)] ([508997a2](https://github.com/pivotal-cf/pivotal-ui/commit/508997a2))
  * Fix vertical alignment of inline form units in IE [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([406600f0](https://github.com/pivotal-cf/pivotal-ui/commit/406600f0))
  * Set min-width: 100% on contents of field-row [[:beetle:#153460941](https://www.pivotaltracker.com/story/show/153460941)] ([5f694c2d](https://github.com/pivotal-cf/pivotal-ui/commit/5f694c2d))
  * Make Toggles keyboard-focusable [[:beetle:#153334867](https://www.pivotaltracker.com/story/show/153334867)] ([b121d767](https://github.com/pivotal-cf/pivotal-ui/commit/b121d767))
  * Fix horizontal positioning of toggle circle for medium/large toggles [[:beetle:#153377086](https://www.pivotaltracker.com/story/show/153377086)] ([2580ccc9](https://github.com/pivotal-cf/pivotal-ui/commit/2580ccc9))
  * add back input's left padding ([f5f3abcc](https://github.com/pivotal-cf/pivotal-ui/commit/f5f3abcc))
  * Remove display: block from form unit label-row ([e55dbe83](https://github.com/pivotal-cf/pivotal-ui/commit/e55dbe83))
  * fixed the height issues due to empty content [[:beetle:#153268701](https://www.pivotaltracker.com/story/show/153268701)] ([06a76690](https://github.com/pivotal-cf/pivotal-ui/commit/06a76690))
  * Add postLabel prop to FormUnit, add form-row/form-col CSS classes [[:star:#153235458](https://www.pivotaltracker.com/story/show/153235458)] ([bf1dff9c](https://github.com/pivotal-cf/pivotal-ui/commit/bf1dff9c))
  * fixed the alignment issues when row-label and row-help had no text [[:beetle:#153268701](https://www.pivotaltracker.com/story/show/153268701)] ([1b7a2dcc](https://github.com/pivotal-cf/pivotal-ui/commit/1b7a2dcc))
  * Fix form unit class names [[:beetle:#153264393](https://www.pivotaltracker.com/story/show/153264393)] ([de4f53e9](https://github.com/pivotal-cf/pivotal-ui/commit/de4f53e9))
  * Rename FormUnit's optional text CSS class to optional-text (formerly post-label) [[:beetle:#153263142](https://www.pivotaltracker.com/story/show/153263142)] ([2eea4324](https://github.com/pivotal-cf/pivotal-ui/commit/2eea4324))
* **pui-variables.scss**: Fix size of circle in large Toggle [[:beetle:#153190438](https://www.pivotaltracker.com/story/show/153190438)] ([4b14ed35](https://github.com/pivotal-cf/pivotal-ui/commit/4b14ed35))
* **radio**: Bring new Checkbox/Radio components into PUI [[:gear:#153716511](https://www.pivotaltracker.com/story/show/153716511)] ([b3656756](https://github.com/pivotal-cf/pivotal-ui/commit/b3656756))
* **select**: Selects that have a *blank* value does not align the dropdown icon correctly - 537 [[:beetle:#152290633](https://www.pivotaltracker.com/story/show/152290633)] ([6dbe6018](https://github.com/pivotal-cf/pivotal-ui/commit/6dbe6018))
#### React
* **autocomplete**:
  * Move CSS imports into componentDidMount [[:gear:#153237542](https://www.pivotaltracker.com/story/show/153237542)] ([761bea81](https://github.com/pivotal-cf/pivotal-ui/commit/761bea81))
  * imported css for the autocomplete to fix broken L&F [[:gear:#153237542](https://www.pivotaltracker.com/story/show/153237542)] ([3da8d62d](https://github.com/pivotal-cf/pivotal-ui/commit/3da8d62d))
* **checkbox**: Bring new Checkbox/Radio components into PUI [[:gear:#153716511](https://www.pivotaltracker.com/story/show/153716511)] ([b3656756](https://github.com/pivotal-cf/pivotal-ui/commit/b3656756))
* **checkbox-dropdown**: Bring new Checkbox/Radio components into PUI [[:gear:#153716511](https://www.pivotaltracker.com/story/show/153716511)] ([b3656756](https://github.com/pivotal-cf/pivotal-ui/commit/b3656756))
* **forms**:
  * Fix inline forms in IE/Edge [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([85953017](https://github.com/pivotal-cf/pivotal-ui/commit/85953017))
  * Restore functionality of hideHelpRow in inline FormUnits [[:beetle:#153690309](https://www.pivotaltracker.com/story/show/153690309)] ([da49f2ba](https://github.com/pivotal-cf/pivotal-ui/commit/da49f2ba))
  * allow FormCol initialValue to be false (boolean) [[:beetle:#153687909](https://www.pivotaltracker.com/story/show/153687909)] ([5c26d1eb](https://github.com/pivotal-cf/pivotal-ui/commit/5c26d1eb))
  * Make help row class name consistent when inline or not [[:beetle:#153568314](https://www.pivotaltracker.com/story/show/153568314)] ([454e2481](https://github.com/pivotal-cf/pivotal-ui/commit/454e2481))
  * Move help-row className when inline [[:beetle:#153568314](https://www.pivotaltracker.com/story/show/153568314)] ([705ffd21](https://github.com/pivotal-cf/pivotal-ui/commit/705ffd21))
  * When form unit is inline, help row lines up with the label and field [[:beetle:#153568314](https://www.pivotaltracker.com/story/show/153568314)] ([c935cc7a](https://github.com/pivotal-cf/pivotal-ui/commit/c935cc7a))
  * For checkboxes in forms, allow a checked state to be provided [[:beetle:#153495603](https://www.pivotaltracker.com/story/show/153495603)] ([6829e67c](https://github.com/pivotal-cf/pivotal-ui/commit/6829e67c))
  * catch errors that happen during onSubmit [[:beetle:#153488986](https://www.pivotaltracker.com/story/show/153488986)] ([590399de](https://github.com/pivotal-cf/pivotal-ui/commit/590399de))
  * Fix vertical alignment of inline form units in IE [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([406600f0](https://github.com/pivotal-cf/pivotal-ui/commit/406600f0))
  * Rewrite Form's onSubmit method to not use async/await [[:gear:#153461036](https://www.pivotaltracker.com/story/show/153461036)] ([c8e72e1f](https://github.com/pivotal-cf/pivotal-ui/commit/c8e72e1f))
  * Allow for setting className and id on FormRow/FormCol [[:beetle:#153268151](https://www.pivotaltracker.com/story/show/153268151)] ([5f43eb7c](https://github.com/pivotal-cf/pivotal-ui/commit/5f43eb7c))
  * fixed the height issues due to empty content [[:beetle:#153268701](https://www.pivotaltracker.com/story/show/153268701)] ([06a76690](https://github.com/pivotal-cf/pivotal-ui/commit/06a76690))
  * Add postLabel prop to FormUnit, add form-row/form-col CSS classes [[:star:#153235458](https://www.pivotaltracker.com/story/show/153235458)] ([bf1dff9c](https://github.com/pivotal-cf/pivotal-ui/commit/bf1dff9c))
  * Pass through extra props to the form tag [[:beetle:#153268151](https://www.pivotaltracker.com/story/show/153268151)] ([aceb2356](https://github.com/pivotal-cf/pivotal-ui/commit/aceb2356))
  * Fix form unit class names [[:beetle:#153264393](https://www.pivotaltracker.com/story/show/153264393)] ([de4f53e9](https://github.com/pivotal-cf/pivotal-ui/commit/de4f53e9))
  * Rename FormUnit's optional text CSS class to optional-text (formerly post-label) [[:beetle:#153263142](https://www.pivotaltracker.com/story/show/153263142)] ([2eea4324](https://github.com/pivotal-cf/pivotal-ui/commit/2eea4324))
  * form saving -&gt; submitting ([15f0595f](https://github.com/pivotal-cf/pivotal-ui/commit/15f0595f))
* **iconography**: pre-build svgs to jsx [[:gear:#152971919](https://www.pivotaltracker.com/story/show/152971919)] ([934f2ada](https://github.com/pivotal-cf/pivotal-ui/commit/934f2ada))
* **modals**: Add type='button' to modal close button [[:beetle:#153031749](https://www.pivotaltracker.com/story/show/153031749)] ([eb718265](https://github.com/pivotal-cf/pivotal-ui/commit/eb718265))
* **radio**: Bring new Checkbox/Radio components into PUI [[:gear:#153716511](https://www.pivotaltracker.com/story/show/153716511)] ([b3656756](https://github.com/pivotal-cf/pivotal-ui/commit/b3656756))
* **table**:
  * Pass rowDatum to the rowDrawer function [[:beetle:#153324179](https://www.pivotaltracker.com/story/show/153324179)] ([c3e0d2d1](https://github.com/pivotal-cf/pivotal-ui/commit/c3e0d2d1))
  * allow simple columns prop for tables [[:star:#153264866](https://www.pivotaltracker.com/story/show/153264866)] ([0d9e2ece](https://github.com/pivotal-cf/pivotal-ui/commit/0d9e2ece))
  * when table columns are implicit, do not set the display name [[:star:#153234166](https://www.pivotaltracker.com/story/show/153234166)] ([c1c27f61](https://github.com/pivotal-cf/pivotal-ui/commit/c1c27f61))
  * table can determine column headers from just the data [[:star:#153234166](https://www.pivotaltracker.com/story/show/153234166)] ([9537c680](https://github.com/pivotal-cf/pivotal-ui/commit/9537c680))
* **toggle**: include form css from toggle component [[:gear:#153427216](https://www.pivotaltracker.com/story/show/153427216)] ([abde0a56](https://github.com/pivotal-cf/pivotal-ui/commit/abde0a56))
<a name="11.2.0"></a>
# 11.2.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.

<a name="11.1.4"></a>
## 11.1.4 (2018-01-04)
#### React
* **svg**: Replace require with __non_webpack_require__ to avoid module not found warning [[:beetle:#153725024](https://www.pivotaltracker.com/story/show/153725024)] ([8459dac0](https://github.com/pivotal-cf/pivotal-ui/commit/8459dac0))
<a name="11.1.3"></a>
## 11.1.3 (2017-12-15)
#### React
* **forms**: Restore functionality of hideHelpRow in inline FormUnits [[:beetle:#153690309](https://www.pivotaltracker.com/story/show/153690309)] ([93ea7abf](https://github.com/pivotal-cf/pivotal-ui/commit/93ea7abf))
<a name="11.1.2"></a>
## 11.1.2 (2017-12-15)
#### React
* **forms**: allow FormCol initialValue to be false (boolean) [[:beetle:#153687909](https://www.pivotaltracker.com/story/show/153687909)] ([e6920178](https://github.com/pivotal-cf/pivotal-ui/commit/e6920178))
<a name="11.1.1"></a>
## 11.1.1 (2017-12-11)
#### React
* **forms**:
  * Make help row class name consistent when inline or not [[:beetle:#153568314](https://www.pivotaltracker.com/story/show/153568314)] ([85edc4e9](https://github.com/pivotal-cf/pivotal-ui/commit/85edc4e9))
  * Move help-row className when inline [[:beetle:#153568314](https://www.pivotaltracker.com/story/show/153568314)] ([8d24440e](https://github.com/pivotal-cf/pivotal-ui/commit/8d24440e))
  * When form unit is inline, help row lines up with the label and field [[:beetle:#153568314](https://www.pivotaltracker.com/story/show/153568314)] ([b4f4513c](https://github.com/pivotal-cf/pivotal-ui/commit/b4f4513c))
<a name="11.1.0"></a>
# 11.1.0 (2017-12-07)
#### CSS
* **forms**:
  * Set min-width: 100% on contents of field-row [[:beetle:#153460941](https://www.pivotaltracker.com/story/show/153460941)] ([51111499](https://github.com/pivotal-cf/pivotal-ui/commit/51111499))
  * give the immediate children of inline field rows a width of 100% [[:beetle:#153460941](https://www.pivotaltracker.com/story/show/153460941)] ([eaa2c6b0](https://github.com/pivotal-cf/pivotal-ui/commit/eaa2c6b0))
  * Fix vertical alignment of inline form units in IE [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([05cb4241](https://github.com/pivotal-cf/pivotal-ui/commit/05cb4241))
  * Fix inline forms in IE/Edge [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([09db5c7b](https://github.com/pivotal-cf/pivotal-ui/commit/09db5c7b))
  * Make Toggles keyboard-focusable [[:beetle:#153334867](https://www.pivotaltracker.com/story/show/153334867)] ([57456f34](https://github.com/pivotal-cf/pivotal-ui/commit/57456f34))
  * Fix horizontal positioning of toggle circle for medium/large toggles [[:beetle:#153377086](https://www.pivotaltracker.com/story/show/153377086)] ([7d6233d3](https://github.com/pivotal-cf/pivotal-ui/commit/7d6233d3))
  * add back input's left padding ([a9fa42e6](https://github.com/pivotal-cf/pivotal-ui/commit/a9fa42e6))
  * Remove display: block from form unit label-row ([1d165d1e](https://github.com/pivotal-cf/pivotal-ui/commit/1d165d1e))
  * fixed the height issues due to empty content [[:beetle:#153268701](https://www.pivotaltracker.com/story/show/153268701)] ([e9a067b6](https://github.com/pivotal-cf/pivotal-ui/commit/e9a067b6))
  * fixed the alignment issues when row-label and row-help had no text [[:beetle:#153268701](https://www.pivotaltracker.com/story/show/153268701)] ([f9cd9e7a](https://github.com/pivotal-cf/pivotal-ui/commit/f9cd9e7a))
  * Fix form unit class names [[:beetle:#153264393](https://www.pivotaltracker.com/story/show/153264393)] ([e9b5aba3](https://github.com/pivotal-cf/pivotal-ui/commit/e9b5aba3))
  * Rename FormUnit's optional text CSS class to optional-text (formerly post-label) [[:beetle:#153263142](https://www.pivotaltracker.com/story/show/153263142)] ([29185b6c](https://github.com/pivotal-cf/pivotal-ui/commit/29185b6c))
* **pui-variables.scss**: Fix size of circle in large Toggle [[:beetle:#153190438](https://www.pivotaltracker.com/story/show/153190438)] ([89b3a740](https://github.com/pivotal-cf/pivotal-ui/commit/89b3a740))
* **select**: Selects that have a *blank* value does not align the dropdown icon correctly - 537 [[:beetle:#152290633](https://www.pivotaltracker.com/story/show/152290633)] ([aee8267f](https://github.com/pivotal-cf/pivotal-ui/commit/aee8267f))
#### React
* **autocomplete**:
  * Move CSS imports into componentDidMount [[:gear:#153237542](https://www.pivotaltracker.com/story/show/153237542)] ([de699b24](https://github.com/pivotal-cf/pivotal-ui/commit/de699b24))
  * imported css for the autocomplete to fix broken L&F [[:gear:#153237542](https://www.pivotaltracker.com/story/show/153237542)] ([2a58a28e](https://github.com/pivotal-cf/pivotal-ui/commit/2a58a28e))
* **forms**:
  * For checkboxes in forms, allow a checked state to be provided [[:beetle:#153495603](https://www.pivotaltracker.com/story/show/153495603)] ([cb748157](https://github.com/pivotal-cf/pivotal-ui/commit/cb748157))
  * catch errors that happen during onSubmit [[:beetle:#153488986](https://www.pivotaltracker.com/story/show/153488986)] ([98346b6b](https://github.com/pivotal-cf/pivotal-ui/commit/98346b6b))
  * Fix vertical alignment of inline form units in IE [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([05cb4241](https://github.com/pivotal-cf/pivotal-ui/commit/05cb4241))
  * Rewrite Form's onSubmit method to not use async/await [[:gear:#153461036](https://www.pivotaltracker.com/story/show/153461036)] ([7188b213](https://github.com/pivotal-cf/pivotal-ui/commit/7188b213))
  * Fix inline forms in IE/Edge [[:beetle:#153417045](https://www.pivotaltracker.com/story/show/153417045)] ([09db5c7b](https://github.com/pivotal-cf/pivotal-ui/commit/09db5c7b))
  * Allow for setting className and id on FormRow/FormCol [[:beetle:#153268151](https://www.pivotaltracker.com/story/show/153268151)] ([6a721566](https://github.com/pivotal-cf/pivotal-ui/commit/6a721566))
  * Add postLabel prop to FormUnit, add form-row/form-col CSS classes [[:star:#153235458](https://www.pivotaltracker.com/story/show/153235458)] ([81ab6a95](https://github.com/pivotal-cf/pivotal-ui/commit/81ab6a95))
  * fixed the height issues due to empty content [[:beetle:#153268701](https://www.pivotaltracker.com/story/show/153268701)] ([e9a067b6](https://github.com/pivotal-cf/pivotal-ui/commit/e9a067b6))
  * Pass through extra props to the form tag [[:beetle:#153268151](https://www.pivotaltracker.com/story/show/153268151)] ([a9280d65](https://github.com/pivotal-cf/pivotal-ui/commit/a9280d65))
  * Fix form unit class names [[:beetle:#153264393](https://www.pivotaltracker.com/story/show/153264393)] ([e9b5aba3](https://github.com/pivotal-cf/pivotal-ui/commit/e9b5aba3))
  * Rename FormUnit's optional text CSS class to optional-text (formerly post-label) [[:beetle:#153263142](https://www.pivotaltracker.com/story/show/153263142)] ([29185b6c](https://github.com/pivotal-cf/pivotal-ui/commit/29185b6c))
* **modals**: Add type='button' to modal close button [[:beetle:#153031749](https://www.pivotaltracker.com/story/show/153031749)] ([b2acf7fd](https://github.com/pivotal-cf/pivotal-ui/commit/b2acf7fd))
* **table**:
  * Pass rowDatum to the rowDrawer function [[:beetle:#153324179](https://www.pivotaltracker.com/story/show/153324179)] ([33eedc1b](https://github.com/pivotal-cf/pivotal-ui/commit/33eedc1b))
  * allow simple columns prop for tables [[:star:#153264866](https://www.pivotaltracker.com/story/show/153264866)] ([a58c1b84](https://github.com/pivotal-cf/pivotal-ui/commit/a58c1b84))
  * when table columns are implicit, do not set the display name [[:star:#153234166](https://www.pivotaltracker.com/story/show/153234166)] ([d2542d00](https://github.com/pivotal-cf/pivotal-ui/commit/d2542d00))
  * table can determine column headers from just the data [[:star:#153234166](https://www.pivotaltracker.com/story/show/153234166)] ([de2c463e](https://github.com/pivotal-cf/pivotal-ui/commit/de2c463e))
* **toggle**:
  * restore type=checkbox for toggles [[:beetle:#153488957](https://www.pivotaltracker.com/story/show/153488957)] ([006aaa73](https://github.com/pivotal-cf/pivotal-ui/commit/006aaa73))
  * include form css from toggle component [[:gear:#153427216](https://www.pivotaltracker.com/story/show/153427216)] ([ae386ce2](https://github.com/pivotal-cf/pivotal-ui/commit/ae386ce2))
  * change labelClassName prop to className [[:star:#153377506](https://www.pivotaltracker.com/story/show/153377506)] ([6a72f41a](https://github.com/pivotal-cf/pivotal-ui/commit/6a72f41a))
  * Remove unnecessary props from Toggle [[:star:#153377506](https://www.pivotaltracker.com/story/show/153377506)] ([e99d5263](https://github.com/pivotal-cf/pivotal-ui/commit/e99d5263))
  * Add labelClassName prop to Toggle component [[:star:#153377506](https://www.pivotaltracker.com/story/show/153377506)] ([bbb75508](https://github.com/pivotal-cf/pivotal-ui/commit/bbb75508))
<a name="11.0.0"></a>
# 11.0.0 (2017-11-28)
#### CSS
* **bootstrap**: Bring new Form/FormRow/FormCol & Input into PUI [[:star:#152046755](https://www.pivotaltracker.com/story/show/152046755)] ([2bc89c8d](https://github.com/pivotal-cf/pivotal-ui/commit/2bc89c8d))
* **forms**:
  * Bring new Form/FormRow/FormCol & Input into PUI [[:star:#152046755](https://www.pivotaltracker.com/story/show/152046755)] ([2bc89c8d](https://github.com/pivotal-cf/pivotal-ui/commit/2bc89c8d))
  * when rendering native selects in firefox, do not show the dropdown icon [[:beetle:#153037431](https://www.pivotaltracker.com/story/show/153037431)] ([7962f6bd](https://github.com/pivotal-cf/pivotal-ui/commit/7962f6bd))
  * Do not show native select dropdown icon on windows [#151620080] ([ee2d6aca](https://github.com/pivotal-cf/pivotal-ui/commit/ee2d6aca))
* **inputs**: Bring new Form/FormRow/FormCol & Input into PUI [[:star:#152046755](https://www.pivotaltracker.com/story/show/152046755)] ([2bc89c8d](https://github.com/pivotal-cf/pivotal-ui/commit/2bc89c8d))
* **labels**: removed the labels [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] ([c4243b98](https://github.com/pivotal-cf/pivotal-ui/commit/c4243b98))
* **tables**:
  * fix table-no-ext-border class [[:beetle:#152734775](https://www.pivotaltracker.com/story/show/152734775)] ([2db3b5ef](https://github.com/pivotal-cf/pivotal-ui/commit/2db3b5ef))
  * adjusted the advancedTable to use the withScrollableTbody plugin and imported the css  for the scrollable body ([d2e04266](https://github.com/pivotal-cf/pivotal-ui/commit/d2e04266))
* **text-filter**: added props for placeholder and empty state on the TextFilter ([34614b1d](https://github.com/pivotal-cf/pivotal-ui/commit/34614b1d))
* **typography**: Zero out only the top and bottom margin on all .h* classes [[:beetle:#152612612](https://www.pivotaltracker.com/story/show/152612612)] ([cec2166a](https://github.com/pivotal-cf/pivotal-ui/commit/cec2166a))
#### React
* **forms**:
  * form saving -&gt; submitting ([3160c775](https://github.com/pivotal-cf/pivotal-ui/commit/3160c775))
  * Forms: allow clearing the form on submit [[:star:#153225274](https://www.pivotaltracker.com/story/show/153225274)] ([cc189c46](https://github.com/pivotal-cf/pivotal-ui/commit/cc189c46))
  * Form field can be optional without the label indicating that it is optional [[:star:#152768035](https://www.pivotaltracker.com/story/show/152768035)] ([f8e8b2b3](https://github.com/pivotal-cf/pivotal-ui/commit/f8e8b2b3))
  * make checkboxes resettable in forms [[:beetle:#153197924](https://www.pivotaltracker.com/story/show/153197924)] ([468ad4a4](https://github.com/pivotal-cf/pivotal-ui/commit/468ad4a4))
  * allow multiple children to the form col component ([8604e391](https://github.com/pivotal-cf/pivotal-ui/commit/8604e391))
  * Fix Form behavior when FormCol does not have a name prop [[:star:#153037265](https://www.pivotaltracker.com/story/show/153037265)] ([d76b3499](https://github.com/pivotal-cf/pivotal-ui/commit/d76b3499))
  * Rename Form prop isModified -&gt; onModified [[:star:#152046755](https://www.pivotaltracker.com/story/show/152046755)] ([4e70e4ab](https://github.com/pivotal-cf/pivotal-ui/commit/4e70e4ab))
  * Bring new Form/FormRow/FormCol & Input into PUI [[:star:#152046755](https://www.pivotaltracker.com/story/show/152046755)] ([2bc89c8d](https://github.com/pivotal-cf/pivotal-ui/commit/2bc89c8d))
* **inputs**: Bring new Form/FormRow/FormCol & Input into PUI [[:star:#152046755](https://www.pivotaltracker.com/story/show/152046755)] ([2bc89c8d](https://github.com/pivotal-cf/pivotal-ui/commit/2bc89c8d))
* **labels**: removed the labels [[:star:#151422387](https://www.pivotaltracker.com/story/show/151422387)] ([c4243b98](https://github.com/pivotal-cf/pivotal-ui/commit/c4243b98))
* **modals**:
  * fixed double declaration of componentDidMount in the baseModal ([ad2c8d79](https://github.com/pivotal-cf/pivotal-ui/commit/ad2c8d79))
  * close modal on mousedown on the .modal [[:beetle:#152286689](https://www.pivotaltracker.com/story/show/152286689)] ([201d947c](https://github.com/pivotal-cf/pivotal-ui/commit/201d947c))
  * Fixed warning when unmounting animated modals ([6eef01d5](https://github.com/pivotal-cf/pivotal-ui/commit/6eef01d5))
* **overlay-trigger**: Internalized fork of react tether [[:gear:#152859677](https://www.pivotaltracker.com/story/show/152859677)] and locked down the version of babel-loader@7.1.1 see https://github.com/babel/babel-loader/issues/505 ([005d642d](https://github.com/pivotal-cf/pivotal-ui/commit/005d642d))
* **react-tether**: Internalized fork of react tether [[:gear:#152859677](https://www.pivotaltracker.com/story/show/152859677)] and locked down the version of babel-loader@7.1.1 see https://github.com/babel/babel-loader/issues/505 ([005d642d](https://github.com/pivotal-cf/pivotal-ui/commit/005d642d))
* **select**: Use data-value attribute instead of value for an &lt;li/&gt;, when firing onChange call with the event followed by the value instead of mutating the target ([16b48b98](https://github.com/pivotal-cf/pivotal-ui/commit/16b48b98))
* **table**:
  * adjusted the advancedTable to use the withScrollableTbody plugin and imported the css  for the scrollable body ([d2e04266](https://github.com/pivotal-cf/pivotal-ui/commit/d2e04266))
  * Add withScrollableTbody table plugin ([cc2fa558](https://github.com/pivotal-cf/pivotal-ui/commit/cc2fa558))
* **text-filter**:
  * added props for placeholder and empty state on the TextFilter ([34614b1d](https://github.com/pivotal-cf/pivotal-ui/commit/34614b1d))
  * Change prop name in TextFilter to be more explicit ([4f739790](https://github.com/pivotal-cf/pivotal-ui/commit/4f739790))
  * Add TextFilter component ([b664b17c](https://github.com/pivotal-cf/pivotal-ui/commit/b664b17c))
* **toggle**: make toggles resettable in forms [[:beetle:#153197927](https://www.pivotaltracker.com/story/show/153197927)] ([2451aa69](https://github.com/pivotal-cf/pivotal-ui/commit/2451aa69))
* **tooltip**:
  * Flatten our nested conditionals ([1e7bdd77](https://github.com/pivotal-cf/pivotal-ui/commit/1e7bdd77))
  * Extract some variables ([df6fdaf2](https://github.com/pivotal-cf/pivotal-ui/commit/df6fdaf2))
  * Allow the most recently changed prop to take precendence ([106fecab](https://github.com/pivotal-cf/pivotal-ui/commit/106fecab))
  * Revert "Always allow the 'display' prop to set visibility" ([da5ac7a3](https://github.com/pivotal-cf/pivotal-ui/commit/da5ac7a3))
  * Always allow the 'display' prop to set visibility ([2f738702](https://github.com/pivotal-cf/pivotal-ui/commit/2f738702))
  * Allow manual control of TooltipTrigger visibility ([ab89565d](https://github.com/pivotal-cf/pivotal-ui/commit/ab89565d))
* **wizard**: Add saving and savingText props to Wizard [[:star:#151932325](https://www.pivotaltracker.com/story/show/151932325)] ([66e8b923](https://github.com/pivotal-cf/pivotal-ui/commit/66e8b923))
<a name="10.4.0"></a>
# 10.4.0 (2018-07-06)
React 16 is no longer a direct dependency. Now, React is a peer dependency, requiring version 15 or 16.
#### CSS
* **tables**: Fix missing bottom border on table footer row [#153578787] ([c15f4380](https://github.com/pivotal-cf/pivotal-ui/commit/c15f4380))
#### React
* **iconography**: use react 15 as a dev dep, allow react 15 or 16 as peer dependencies [[:gear:#157639580](https://www.pivotaltracker.com/story/show/157639580)] ([2c9e294d](https://github.com/pivotal-cf/pivotal-ui/commit/2c9e294d))
<a name="10.3.3"></a>
## 10.3.3 (2018-01-04)
#### React
* **svg**: Replace require with __non_webpack_require__ to avoid module not found warning [[:beetle:#153725024](https://www.pivotaltracker.com/story/show/153725024)] ([a746fb84](https://github.com/pivotal-cf/pivotal-ui/commit/a746fb84))
<a name="10.3.2"></a>
## 10.3.2 (2017-11-15)
#### React
* **overlay-trigger**: Internalized fork of react tether [[:gear:#152859677](https://www.pivotaltracker.com/story/show/152859677)] and locked down the version of babel-loader@7.1.1 see https://github.com/babel/babel-loader/issues/505 ([ec0f4b10](https://github.com/pivotal-cf/pivotal-ui/commit/ec0f4b10))
* **react-tether**: Internalized fork of react tether [[:gear:#152859677](https://www.pivotaltracker.com/story/show/152859677)] and locked down the version of babel-loader@7.1.1 see https://github.com/babel/babel-loader/issues/505 ([ec0f4b10](https://github.com/pivotal-cf/pivotal-ui/commit/ec0f4b10))
<a name="10.3.1"></a>
## 10.3.1 (2017-11-07)
#### React
* **modals**: fixed double declaration of componentDidMount in the baseModal ([80a6f858](https://github.com/pivotal-cf/pivotal-ui/commit/80a6f858))
<a name="10.3.0"></a>
# 10.3.0 (2017-11-06)
#### CSS
* **tables**: adjusted the advancedTable to use the withScrollableTbody plugin and imported the css  for the scrollable body ([5b4509af](https://github.com/pivotal-cf/pivotal-ui/commit/5b4509af))
* **text-filter**: added props for placeholder and empty state on the TextFilter ([a7805b36](https://github.com/pivotal-cf/pivotal-ui/commit/a7805b36))
#### React
* **table**:
  * adjusted the advancedTable to use the withScrollableTbody plugin and imported the css  for the scrollable body ([5b4509af](https://github.com/pivotal-cf/pivotal-ui/commit/5b4509af))
  * Add withScrollableTbody table plugin ([6bf47d29](https://github.com/pivotal-cf/pivotal-ui/commit/6bf47d29))
* **text-filter**:
  * added props for placeholder and empty state on the TextFilter ([a7805b36](https://github.com/pivotal-cf/pivotal-ui/commit/a7805b36))
  * Change prop name in TextFilter to be more explicit ([61aedd63](https://github.com/pivotal-cf/pivotal-ui/commit/61aedd63))
  * Add TextFilter component ([3da892e6](https://github.com/pivotal-cf/pivotal-ui/commit/3da892e6))
* **tooltip**: Allow manual control of TooltipTrigger visibility ([479911f9](https://github.com/pivotal-cf/pivotal-ui/commit/479911f9))
<a name="10.2.0"></a>
# 10.2.0 (2017-10-26)
#### CSS
* **forms**: Do not show native select dropdown icon on windows [#151620080] ([be579e45](https://github.com/pivotal-cf/pivotal-ui/commit/be579e45))
#### React
* **wizard**: Add saving and savingText props to Wizard [[:star:#151932325](https://www.pivotaltracker.com/story/show/151932325)] ([ab75a8e8](https://github.com/pivotal-cf/pivotal-ui/commit/ab75a8e8))
<a name="10.1.1"></a>
## 10.1.1 (2017-10-26)
#### React
* **modals**: close modal on mousedown on the .modal [[:beetle:#152286689](https://www.pivotaltracker.com/story/show/152286689)] ([aab0cc92](https://github.com/pivotal-cf/pivotal-ui/commit/aab0cc92))
<a name="10.1.0"></a>
# 10.1.0 (2017-10-17)
#### React
* **modals**: Fixed warning when unmounting animated modals ([3fc867a3](https://github.com/pivotal-cf/pivotal-ui/commit/3fc867a3))
* **select**: Use data-value attribute instead of value for an &lt;li/&gt;, when firing onChange call with the event followed by the value instead of mutating the target ([17dae71b](https://github.com/pivotal-cf/pivotal-ui/commit/17dae71b))
<a name="10.0.0"></a>
# 10.0.0 (2017-10-09)
#### CSS
* **all**: PUI Positioning and Display classes [[:star:#150565600](https://www.pivotaltracker.com/story/show/150565600)] ([5b2aed9e](https://github.com/pivotal-cf/pivotal-ui/commit/5b2aed9e))
* **positioning**: PUI Positioning and Display classes [[:star:#150565600](https://www.pivotaltracker.com/story/show/150565600)] ([5b2aed9e](https://github.com/pivotal-cf/pivotal-ui/commit/5b2aed9e))
* **select**: Fix styling for button within select toggle [[:beetle:#151815619](https://www.pivotaltracker.com/story/show/151815619)] ([2baa9dcf](https://github.com/pivotal-cf/pivotal-ui/commit/2baa9dcf))
* **tables**: fix flex table cell padding [[:beetle:#151815592](https://www.pivotaltracker.com/story/show/151815592)] ([7af14f7f](https://github.com/pivotal-cf/pivotal-ui/commit/7af14f7f))
#### React
* **iconography**: Fix svg directory [[:beetle:#151624937](https://www.pivotaltracker.com/story/show/151624937)] ([89a2b38a](https://github.com/pivotal-cf/pivotal-ui/commit/89a2b38a))
* **select**: stop using .includes in select to fix IE11 crash [[:beetle:#151622400](https://www.pivotaltracker.com/story/show/151622400)] ([0f51153c](https://github.com/pivotal-cf/pivotal-ui/commit/0f51153c))
* **svg**: fixed the svgs components paths ([876491fe](https://github.com/pivotal-cf/pivotal-ui/commit/876491fe))
* **table**: fix flex table cell padding [[:beetle:#151815592](https://www.pivotaltracker.com/story/show/151815592)] ([7af14f7f](https://github.com/pivotal-cf/pivotal-ui/commit/7af14f7f))
<a name="9.2.1"></a>
## 9.2.1 (2018-01-04)
#### React
* **svg**: Replace require with __non_webpack_require__ to avoid module not found warning [[:beetle:#153725024](https://www.pivotaltracker.com/story/show/153725024)] ([2415cf82](https://github.com/pivotal-cf/pivotal-ui/commit/2415cf82))
<a name="9.2.0"></a>
# 9.2.0 (2017-10-17)
#### React
* **modals**: Fixed warning when unmounting animated modals ([1e0fa810](https://github.com/pivotal-cf/pivotal-ui/commit/1e0fa810))
* **select**: Use data-value attribute instead of value for an &lt;li/&gt;, when firing onChange call with the event followed by the value instead of mutating the target ([f44a9b33](https://github.com/pivotal-cf/pivotal-ui/commit/f44a9b33))
<a name="9.1.2"></a>
## 9.1.2 (2017-10-09)
#### CSS
* **select**: Fix styling for button within select toggle [[:beetle:#151815619](https://www.pivotaltracker.com/story/show/151815619)] ([b533d012](https://github.com/pivotal-cf/pivotal-ui/commit/b533d012))
* **tables**: fix flex table cell padding [[:beetle:#151815592](https://www.pivotaltracker.com/story/show/151815592)] ([5acc3d96](https://github.com/pivotal-cf/pivotal-ui/commit/5acc3d96))
#### React
* **select**: stop using .includes in select to fix IE11 crash [[:beetle:#151622400](https://www.pivotaltracker.com/story/show/151622400)] ([b7ec8650](https://github.com/pivotal-cf/pivotal-ui/commit/b7ec8650))
* **table**: fix flex table cell padding [[:beetle:#151815592](https://www.pivotaltracker.com/story/show/151815592)] ([5acc3d96](https://github.com/pivotal-cf/pivotal-ui/commit/5acc3d96))
<a name="9.1.1"></a>
## 9.1.1 (2017-10-09)
#### React
* **iconography**: Fix svg directory [[:beetle:#151624937](https://www.pivotaltracker.com/story/show/151624937)] ([c1d14aeb](https://github.com/pivotal-cf/pivotal-ui/commit/c1d14aeb))
* **svg**: fixed the svgs components paths ([82c0bc00](https://github.com/pivotal-cf/pivotal-ui/commit/82c0bc00))
<a name="9.1.0"></a>
# 9.1.0 (2017-10-05)
#### CSS
* **all**: PUI Positioning and Display classes [[:star:#150565600](https://www.pivotaltracker.com/story/show/150565600)] ([e8d81fb1](https://github.com/pivotal-cf/pivotal-ui/commit/e8d81fb1))
* **positioning**: PUI Positioning and Display classes [[:star:#150565600](https://www.pivotaltracker.com/story/show/150565600)] ([e8d81fb1](https://github.com/pivotal-cf/pivotal-ui/commit/e8d81fb1))
<a name="9.0.0"></a>
# 9.0.0 (2017-09-26)
#### CSS
* **button-group**: Add classes to scale button groups ([2c13c277](https://github.com/pivotal-cf/pivotal-ui/commit/2c13c277))
* **buttons**: Fixes to where passed in class names are assigned  and coloring of the button svg [[:star:#151224876](https://www.pivotaltracker.com/story/show/151224876)] ([fb1c9fdc](https://github.com/pivotal-cf/pivotal-ui/commit/fb1c9fdc))
* **code**: Fix code syntax highlighting, remove deprecated files [[:star:#150374399](https://www.pivotaltracker.com/story/show/150374399)] ([4ae88ee2](https://github.com/pivotal-cf/pivotal-ui/commit/4ae88ee2))
* **copy-to-clipboard**: removed CopyToClipBoardButton and augmented CopyToClipBoard to support any use case [Finishes [:star:#150236546](https://www.pivotaltracker.com/story/show/150236546)] ([2f394bc7](https://github.com/pivotal-cf/pivotal-ui/commit/2f394bc7))
* **dropdowns**: Notifications cleanup [[:star:#150372981](https://www.pivotaltracker.com/story/show/150372981)] ([c700d5d5](https://github.com/pivotal-cf/pivotal-ui/commit/c700d5d5))
* **flex-grids**: Flex Grid .col-fixed fix [[:star:#150498066](https://www.pivotaltracker.com/story/show/150498066)] ([8f6ae15a](https://github.com/pivotal-cf/pivotal-ui/commit/8f6ae15a))
* **flyout**: Import Flyout component [[:star:#150234354](https://www.pivotaltracker.com/story/show/150234354)] ([050c5f32](https://github.com/pivotal-cf/pivotal-ui/commit/050c5f32))
* **links**:
  * Fix 'a' tag hover state [[:star:#150564040](https://www.pivotaltracker.com/story/show/150564040)] ([0a4fc3c9](https://github.com/pivotal-cf/pivotal-ui/commit/0a4fc3c9))
  *  Add new link styles [[:star:#150564040](https://www.pivotaltracker.com/story/show/150564040)] ([48d8b7c2](https://github.com/pivotal-cf/pivotal-ui/commit/48d8b7c2))
* **lists**: Draggable List - 8pt and tweaks [[:star:#150272066](https://www.pivotaltracker.com/story/show/150272066)] ([4031fbaa](https://github.com/pivotal-cf/pivotal-ui/commit/4031fbaa))
* **pagination**: allow pagination to be small, default, or large size [[:star:#150235312](https://www.pivotaltracker.com/story/show/150235312)] ([01a9323a](https://github.com/pivotal-cf/pivotal-ui/commit/01a9323a))
* **progress-bars**: Progress Bar 8pt tweaks [[:star:#150269335](https://www.pivotaltracker.com/story/show/150269335)] ([cb896a10](https://github.com/pivotal-cf/pivotal-ui/commit/cb896a10))
* **pui-variables.scss**:
  *  Add new link styles [[:star:#150564040](https://www.pivotaltracker.com/story/show/150564040)] ([48d8b7c2](https://github.com/pivotal-cf/pivotal-ui/commit/48d8b7c2))
  * Draggable List - 8pt and tweaks [[:star:#150272066](https://www.pivotaltracker.com/story/show/150272066)] ([4031fbaa](https://github.com/pivotal-cf/pivotal-ui/commit/4031fbaa))
  * update left tabs for 8pt grid [[:star:#150271625](https://www.pivotaltracker.com/story/show/150271625)] ([accdf79c](https://github.com/pivotal-cf/pivotal-ui/commit/accdf79c))
* **tables**:
  * css for table drawers [[:star:#151028511](https://www.pivotaltracker.com/story/show/151028511)] ([bbe85867](https://github.com/pivotal-cf/pivotal-ui/commit/bbe85867))
  * update html table css to make font-size less specific [#150190185] ([0ee46574](https://github.com/pivotal-cf/pivotal-ui/commit/0ee46574))
* **tabs**:
  * update left tabs for 8pt grid [[:star:#150271625](https://www.pivotaltracker.com/story/show/150271625)] ([accdf79c](https://github.com/pivotal-cf/pivotal-ui/commit/accdf79c))
  * update tab action padding for 8pt grid [[:star:#150269434](https://www.pivotaltracker.com/story/show/150269434)] ([bdc052de](https://github.com/pivotal-cf/pivotal-ui/commit/bdc052de))
* **tooltips**: Fixes to where passed in class names are assigned  and coloring of the button svg [[:star:#151224876](https://www.pivotaltracker.com/story/show/151224876)] ([fb1c9fdc](https://github.com/pivotal-cf/pivotal-ui/commit/fb1c9fdc))
#### JS
* **prismjs**: Fix code syntax highlighting, remove deprecated files [[:star:#150374399](https://www.pivotaltracker.com/story/show/150374399)] ([4ae88ee2](https://github.com/pivotal-cf/pivotal-ui/commit/4ae88ee2))
#### React
* **back-to-top**:
  * enhance BackToTop to work in arbitrary scrollable containers [[:beetle:#150929993](https://www.pivotaltracker.com/story/show/150929993)] ([28b3943e](https://github.com/pivotal-cf/pivotal-ui/commit/28b3943e))
  * update back-to-top animation [[:beetle:#150929993](https://www.pivotaltracker.com/story/show/150929993)] ([2be1f338](https://github.com/pivotal-cf/pivotal-ui/commit/2be1f338))
* **copy-to-clipboard**:
  * Fixed the copy to clipboard failing test [[:star:#151224876](https://www.pivotaltracker.com/story/show/151224876)] ([82cfc9a9](https://github.com/pivotal-cf/pivotal-ui/commit/82cfc9a9))
  * Fixes to where passed in class names are assigned  and coloring of the button svg [[:star:#151224876](https://www.pivotaltracker.com/story/show/151224876)] ([fb1c9fdc](https://github.com/pivotal-cf/pivotal-ui/commit/fb1c9fdc))
  * removed CopyToClipBoardButton and augmented CopyToClipBoard to support any use case [Finishes [:star:#150236546](https://www.pivotaltracker.com/story/show/150236546)] ([2f394bc7](https://github.com/pivotal-cf/pivotal-ui/commit/2f394bc7))
  * copy to clipboard: use a pui button for the ctc button, and allow the button to be small or large [[:star:#150236546](https://www.pivotaltracker.com/story/show/150236546)] ([53a7f790](https://github.com/pivotal-cf/pivotal-ui/commit/53a7f790))
* **flyout**: Import Flyout component [[:star:#150234354](https://www.pivotaltracker.com/story/show/150234354)] ([050c5f32](https://github.com/pivotal-cf/pivotal-ui/commit/050c5f32))
* **modals**: Always pass through event to `onHide` prop in BaseModal ([f1a80ba7](https://github.com/pivotal-cf/pivotal-ui/commit/f1a80ba7))
* **notifications**: Notifications cleanup [[:star:#150372981](https://www.pivotaltracker.com/story/show/150372981)] ([c700d5d5](https://github.com/pivotal-cf/pivotal-ui/commit/c700d5d5))
* **pagination**:
  * allow pagination to be small, default, or large size [[:star:#150235312](https://www.pivotaltracker.com/story/show/150235312)] ([01a9323a](https://github.com/pivotal-cf/pivotal-ui/commit/01a9323a))
  * use button group in the pagination component [[:star:#150235079](https://www.pivotaltracker.com/story/show/150235079)] ([7db68876](https://github.com/pivotal-cf/pivotal-ui/commit/7db68876))
* **portals**: portals: change from componentWillMount to componentDidMount to avoid setState warning ([3f111389](https://github.com/pivotal-cf/pivotal-ui/commit/3f111389))
* **select**: `onChange` callback in Select includes click event ([488fea2a](https://github.com/pivotal-cf/pivotal-ui/commit/488fea2a))
* **table**:
  * polyfill array.find for table sort plugin [[:beetle:#151442075](https://www.pivotaltracker.com/story/show/151442075)] ([aba4d6d1](https://github.com/pivotal-cf/pivotal-ui/commit/aba4d6d1))
  * when rendering a table cell for which a nested attribute does not exist, render nothing instead of crashing [#151262175] ([a762bed1](https://github.com/pivotal-cf/pivotal-ui/commit/a762bed1))
  * css for table drawers [[:star:#151028511](https://www.pivotaltracker.com/story/show/151028511)] ([bbe85867](https://github.com/pivotal-cf/pivotal-ui/commit/bbe85867))
  * SortableAdvancedTable should have been named SortableFlexTable ([43b8a68a](https://github.com/pivotal-cf/pivotal-ui/commit/43b8a68a))
  * allow footer row to be anything ([be5bfecd](https://github.com/pivotal-cf/pivotal-ui/commit/be5bfecd))
  * remove context variable ([5c3eeccf](https://github.com/pivotal-cf/pivotal-ui/commit/5c3eeccf))
  * table plugin interface enhancements [[:star:#151028511](https://www.pivotaltracker.com/story/show/151028511)] ([62d4d86b](https://github.com/pivotal-cf/pivotal-ui/commit/62d4d86b))
  * Support tfoot in new Table [[:star:#151028511](https://www.pivotaltracker.com/story/show/151028511)] ([ea03ea8b](https://github.com/pivotal-cf/pivotal-ui/commit/ea03ea8b))
  * table refactor [[:star:#151028511](https://www.pivotaltracker.com/story/show/151028511)] ([36e6947c](https://github.com/pivotal-cf/pivotal-ui/commit/36e6947c))
* **tooltip**: ToolTrigger will chain custom onClick behavior onto pre-exisiting trigger=click behavior [[:beetle:#150782918](https://www.pivotaltracker.com/story/show/150782918)] ([5b11ee9f](https://github.com/pivotal-cf/pivotal-ui/commit/5b11ee9f))
* **wizard**: add Wizard component [[:star:#150234351](https://www.pivotaltracker.com/story/show/150234351)] ([5dfd143e](https://github.com/pivotal-cf/pivotal-ui/commit/5dfd143e))
<a name="8.3.3"></a>
## 8.3.3 (2017-08-22)
#### CSS
* **lists**: List dividers - create styles ([25250e5b](https://github.com/pivotal-cf/pivotal-ui/commit/25250e5b))
#### React
* **lists**: List dividers - create styles ([25250e5b](https://github.com/pivotal-cf/pivotal-ui/commit/25250e5b))
<a name="8.3.2"></a>
## 8.3.2 (2017-08-15)
#### CSS
* **dropdowns**:
  * dropdowns: scope custom icon styling to when we are within a form-group [[:beetle:#149025419](https://www.pivotaltracker.com/story/show/149025419)] ([187bde98](https://github.com/pivotal-cf/pivotal-ui/commit/187bde98))
  * Position icon correctly for Dropdowns rendered without form-group ([47f3bb77](https://github.com/pivotal-cf/pivotal-ui/commit/47f3bb77))
  * Add `pui-css-forms` as a dependecy to `pui-css-dropdowns` ([0109da46](https://github.com/pivotal-cf/pivotal-ui/commit/0109da46))
* **tables**:
  * Add Table padding modifiers ([5aab06f3](https://github.com/pivotal-cf/pivotal-ui/commit/5aab06f3))
  * Update default Table Horizontal Padding ([a8fb069e](https://github.com/pivotal-cf/pivotal-ui/commit/a8fb069e))
#### React
* **flex-grids**: Missing flex-grids dependencies added ([2f849c54](https://github.com/pivotal-cf/pivotal-ui/commit/2f849c54))
* **iconography**: fix IE11 compatibility issues ([2abd1492](https://github.com/pivotal-cf/pivotal-ui/commit/2abd1492))
* **inputs**: Form redesign [[:star:#148694073](https://www.pivotaltracker.com/story/show/148694073)] ([8fd85196](https://github.com/pivotal-cf/pivotal-ui/commit/8fd85196))
* **mixins**: Use native HTML #contains for elements that do not have #contains method e.g. SVGs ([24ea2e5d](https://github.com/pivotal-cf/pivotal-ui/commit/24ea2e5d))
* **overlay-trigger**: Implement `isSticky` in `OverlayTrigger` ([611609b3](https://github.com/pivotal-cf/pivotal-ui/commit/611609b3))
* **table**: fix IE11 compatibility issues ([2abd1492](https://github.com/pivotal-cf/pivotal-ui/commit/2abd1492))
<a name="8.3.1"></a>
## 8.3.1 (2017-06-24)


### Bug Fixes

* **Portals:** Portals render correctly even if the source does not exist ([90820be](https://github.com/pivotal-cf/pivotal-ui/commit/90820be)), closes [#138224093](https://github.com/pivotal-cf/pivotal-ui/issues/138224093)
* **Svg:** when src prop changes, load and render new svg [#146825139] ([2b30d0d](https://github.com/pivotal-cf/pivotal-ui/commit/2b30d0d))

### Features

* **dropdown:** onSelect is triggered by clicking DropdownItem &lt;li&gt; ([e62e3e7](https://github.com/pivotal-cf/pivotal-ui/commit/e62e3e7))
* **Toolbar:**  Further tweaks to toolbar [#146811529] ([3b2022a](https://github.com/pivotal-cf/pivotal-ui/commit/3b2022a))



<a name="8.3.0"></a>
# 8.3.0 (2017-06-13)


### Bug Fixes

* **Select:** misalignment of contents [Finishes #146853023] ([21bf21f](https://github.com/pivotal-cf/pivotal-ui/commit/21bf21f))
* **Select:** set margin-top to 0 for select ul [finishes #146853025] ([97889d1](https://github.com/pivotal-cf/pivotal-ui/commit/97889d1))
* **Svg:** when src prop changes, load and render new svg [#146825139] ([c40681a](https://github.com/pivotal-cf/pivotal-ui/commit/c40681a))
* **TableCell:** allow cellClass prop to set classNames on the rendered td [finishes #146845001] ([26543c3](https://github.com/pivotal-cf/pivotal-ui/commit/26543c3))

### Features

* **Dropdown:** When Dropdowns are open, clicking outside the dropdown ([0c8dadb](https://github.com/pivotal-cf/pivotal-ui/commit/0c8dadb))
* **tables:** Add column index to table cells ([b532319](https://github.com/pivotal-cf/pivotal-ui/commit/b532319))



<a name="8.2.0"></a>
# 8.2.0 (2017-06-06)

### Bug Fixes

* **Alerts:** Fix the insertion of two close buttons ([8ba59de](https://github.com/pivotal-cf/pivotal-ui/commit/8ba59de)), closes [#143338559](https://github.com/pivotal-cf/pivotal-ui/issues/143338559)
* **Button:** Fix .btn + .btn css placement of rule ([d94fed3](https://github.com/pivotal-cf/pivotal-ui/commit/d94fed3)), closes [#143473153](https://github.com/pivotal-cf/pivotal-ui/issues/143473153)
* **Collapse:** Fix missing panel dependency in pui-react-collapse ([991c37c](https://github.com/pivotal-cf/pivotal-ui/commit/991c37c)), closes [#145282583](https://github.com/pivotal-cf/pivotal-ui/issues/145282583)
* **Dropdown:** Split Dropdown click zone ([e17ebb6](https://github.com/pivotal-cf/pivotal-ui/commit/e17ebb6))
* **Forms:** Remove right margin from .form-group, update .form-inline styles ([8d069d2](https://github.com/pivotal-cf/pivotal-ui/commit/8d069d2))

### Features

* **Alerts:** Make the alerts 8pt compatible ([12af4e7](https://github.com/pivotal-cf/pivotal-ui/commit/12af4e7))
* **Borders:** Add border control feature ([5951faf](https://github.com/pivotal-cf/pivotal-ui/commit/5951faf))
* **Buttons:** Buttons can now be full width ([1200e62](https://github.com/pivotal-cf/pivotal-ui/commit/1200e62))
    * Side by side buttons now have a unit margin-left separating them ([4968e29](https://github.com/pivotal-cf/pivotal-ui/commit/4968e29))
    * Add iconPosition prop to place the icon to the left or the right ([3fcc9d6](https://github.com/pivotal-cf/pivotal-ui/commit/3fcc9d6))
* **Checkbox Dropdown:** Dropdown widget with checkboxes as elements ([60b7479](https://github.com/pivotal-cf/pivotal-ui/commit/60b7479))
* **FlexGrids:** Bring FlexGrid react component into line with CSS FlexGrid ([38bc18d](https://github.com/pivotal-cf/pivotal-ui/commit/38bc18d))
* **FlexTable:** Add bodyRowClassName prop ([d567a52](https://github.com/pivotal-cf/pivotal-ui/commit/d567a52))
    * Add headerRowClassName prop ([ff72854](https://github.com/pivotal-cf/pivotal-ui/commit/ff72854))
    * Add hideHeaderRow prop ([daa4664](https://github.com/pivotal-cf/pivotal-ui/commit/daa4664))
    * Add rowProps prop ([deb2f62](https://github.com/pivotal-cf/pivotal-ui/commit/deb2f62))
    * `columns` prop can accept width as metadata ([e3c7d45](https://github.com/pivotal-cf/pivotal-ui/commit/e3c7d45))
* **Tooltip:** Tooltips are hoverable ([73f46a7](https://github.com/pivotal-cf/pivotal-ui/commit/73f46a7))

<a name="8.1.0"></a>
# 8.1.0 (2017-05-04)


### Bug Fixes

* **React:** Remove deprecated propTypes usage to support React 15.5
* **SVG:** Move from svg-react-loader to react-svg-loader to support React 15.5 ([add69a9](https://github.com/pivotal-cf/pivotal-ui/commit/add69a9))

<a name="8.0.5"></a>
## 8.0.5 (2017-04-14)


### Bug Fixes

* **modals:** remove bootstrap interference with modals [#142864131] ([bfc8c21](https://github.com/pivotal-cf/pivotal-ui/commit/bfc8c21))

<a name="8.0.4"></a>
## 8.0.4 (2017-03-24)

### Features

* **table:** React table columns accept cellClass ([53d56e0](https://github.com/pivotal-cf/pivotal-ui/commit/53d56e0))

<a name="8.0.3"></a>
## 8.0.3 (2017-03-17)

### Bug Fixes
* **forms:** fix error with pui-css-forms import

<a name="8.0.2"></a>
## 8.0.2 (2017-03-17)

### Bug Fixes
* **table:** resolve pui-css-table dependency ([44df86f](https://github.com/pivotal-cf/pivotal-ui/commit/44df86f))
* **all:** resolve pui-react-all dependency ([70fdf5c](https://github.com/pivotal-cf/pivotal-ui/commit/70fdf5c))
* **Select:** style chevron icon as background image ([6a8fa1e](https://github.com/pivotal-cf/pivotal-ui/commit/6a8fa1e))

### Features
* **label:** support for different label sizes (css-only)
* **Input:** support for different Input sizes
* **Input:** autoFocus property
* **Modal:** acquireFocus property
* **Dropdown:** aria support
* **Dropdown:** support for dropdown items that contain icons
* **Tabs:** aria support
* **Tooltip:** render children instead of content property
* **Tooltip:** TooltipTrigger refinements
* **Iconography:** support for spinner

<a name="8.0.1"></a>
## 8.0.1 (2017-03-14)

### Bug Fixes
* **Iconography:** allow icon svgs to be sourced from app/svg directory ([537bd71](https://github.com/pivotal-cf/pivotal-ui/commit/537bd71))
* **Dropdown:** link and flat dropdown styling fixes ([156be26](https://github.com/pivotal-cf/pivotal-ui/commit/156be26))
* **Dropdown:** dropdown menu styling fix ([ef1daaa](https://github.com/pivotal-cf/pivotal-ui/commit/ef1daaa))
* **Copy to Clipboard:** fix calls to window and document

### Features
* **Buttons:** default aria-label for buttons is the button text, and type is set to button
* **Dropdown:** support for small dropdowns

<a name="8.0.0"></a>
## 8.0.0 (2017-03-09)

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

<a name="7.5.5"></a>
## 7.5.5 (2017-03-08)

### Bug Fixes

* **Modals:** Inject document object so that Modals can be server rendered ([788b6ae](https://github.com/pivotal-cf/pivotal-ui/commit/788b6ae))
* **ScrimMixin:** Inject document object so that ScrimMixins can be server rendered ([788b6ae](https://github.com/pivotal-cf/pivotal-ui/commit/788b6ae))

<a name="7.5.4"></a>
## 7.5.4 (2017-02-10)



<a name="7.5.3"></a>
## 7.5.3 (2017-02-09)


### Bug Fixes

* **Autocomplete:** Pass onClick handler to custom lists in autocomplete ([c2fe76a](https://github.com/pivotal-cf/pivotal-ui/commit/c2fe76a))



<a name="7.5.3"></a>
## 7.5.3 (2017-02-09)


### Bug Fixes

* **Autocomplete:** Pass onClick handler to custom lists in autocomplete ([c2fe76a](https://github.com/pivotal-cf/pivotal-ui/commit/c2fe76a))

<a name="7.5.2"></a>
## 7.5.2 (2017-02-08)

### Bug Fixes

* **Packaging:** Do not break commonjs ([d52eeed](https://github.com/pivotal-cf/pivotal-ui/commit/d52eeed))

<a name="7.5.1"></a>
## 7.5.1 (2017-02-07)

### Bug Fixes

* **collapse:** Re-publish 7.5.0 because 7.5.0 seemed to have missed `collapse.css`

<a name="7.5.0"></a>
# 7.5.0 (2017-02-03)

### Bug Fixes

* **Iconography:** Style props are applied to wrapper instead of inner element ([68d9a21](https://github.com/pivotal-cf/pivotal-ui/commit/68d9a21))
* **Modal:** Body doesnt scroll when modal is active ([7e64586](https://github.com/pivotal-cf/pivotal-ui/commit/7e64586))
* **Autocomplete:** Fix onPick throwing an error ([4f0110](https://github.com/pivotal-cf/pivotal-ui/commit/4f0110))
* **Autocomplete:** Fix zIndex so that it appropriately is displayed on top of things ([2a2ee0](https://github.com/pivotal-cf/pivotal-ui/commit/2a2ee0))

### Features

* **FlexGrid:** Add flex grid

<a name="7.4.0"></a>
# 7.4.0 (2017-01-18)

### Bug Fixes

* **iconography:** updated styles ([f076eda](https://github.com/pivotal-cf/pivotal-ui/commit/f076eda))
* **modal:** modal can scroll vertically if it is taller than the screen ([6760e5b](https://github.com/pivotal-cf/pivotal-ui/commit/6760e5b))

### Features

* **Icon:** Add verticalAlign prop support [#135989699] ([a0c75f8](https://github.com/pivotal-cf/pivotal-ui/commit/a0c75f8))
* **Iconography:** Add support for spinner, spinner-md, and spinner-sm ([1903e66](https://github.com/pivotal-cf/pivotal-ui/commit/1903e66))


<a name="7.3.1"></a>
## 7.3.1 (2016-12-14)


### Bug Fixes

* **Modals:** Modal backdrop fades in correctly ([c9d4fee](https://github.com/pivotal-cf/pivotal-ui/commit/c9d4fee))

<a name="7.3.0"></a>
# 7.3.0 (2016-12-12)

### Bug Fixes

* **Tables:** Fix column resize on sort change ([7546e1d](https://github.com/pivotal-cf/pivotal-ui/commit/7546e1d))
* **Tables:** Remove role=button for unsortable headers ([7f1a2d6](https://github.com/pivotal-cf/pivotal-ui/commit/7f1a2d6))

### Features

* **Iconography:** Add new icons ([67f8178](https://github.com/pivotal-cf/pivotal-ui/commit/67f8178))
* **Tables:** Support sort order none ([afba011](https://github.com/pivotal-cf/pivotal-ui/commit/afba011))



<a name="7.2.0"></a>
# 7.2.0 (2016-11-18)

### Bug Fixes

* **Dropdowns:** Fix styling in Firefox

### Features

* **Dropdowns:** Add onEntered and onExited callbacks ([aa40a21](https://github.com/pivotal-cf/pivotal-ui/commit/aa40a21))
* **Select:** Create Select component ([2f8ba4a](https://github.com/pivotal-cf/pivotal-ui/commit/2f8ba4a))
* **Toggle:** add size attribute ([440884c](https://github.com/pivotal-cf/pivotal-ui/commit/440884c))

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
