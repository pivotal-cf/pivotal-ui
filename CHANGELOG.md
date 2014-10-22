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
