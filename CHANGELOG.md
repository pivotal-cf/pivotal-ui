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
