## Pivotal UI Changelog

### Latest Changes

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
