<a name="2.0.0"></a>
# 2.0.0 (2015-09-29)


### Bug Fixes

* **autocomplete:** dropdown is no longer transparent ([bf1d4b4](https://github.com/pivotal-cf/pivotal-ui/commit/bf1d4b4)), closes [#103617606](https://github.com/pivotal-cf/pivotal-ui/issues/103617606)
* **health_indicators:** remove health_indicators from pui-css-deprecated ([799eb23](https://github.com/pivotal-cf/pivotal-ui/commit/799eb23))
* **no-js:** removes deprecated .no-js ([c3674a2](https://github.com/pivotal-cf/pivotal-ui/commit/c3674a2))
* **styleguide:** fix invalid html in styleguide ([17a2763](https://github.com/pivotal-cf/pivotal-ui/commit/17a2763)), closes [#100234794](https://github.com/pivotal-cf/pivotal-ui/issues/100234794)
* **styleguide:** remove outdated reference to HAML ([c6cff61](https://github.com/pivotal-cf/pivotal-ui/commit/c6cff61)), closes [#99748964](https://github.com/pivotal-cf/pivotal-ui/issues/99748964)
* **tabs:** move padding from tab-content to tab-pane ([cac8cde](https://github.com/pivotal-cf/pivotal-ui/commit/cac8cde))
* **toggles:** removes deprecated toggles ([945039a](https://github.com/pivotal-cf/pivotal-ui/commit/945039a))

### Features

* **collapse:** Collapse can now start out open by passing defaultExpanded ([7f01614](https://github.com/pivotal-cf/pivotal-ui/commit/7f01614))
* **styleguide:** generate pretty titles for new styleguide organization ([4cac337](https://github.com/pivotal-cf/pivotal-ui/commit/4cac337))
* **styleguide:** new styleguide navigation structure ([9d81eba](https://github.com/pivotal-cf/pivotal-ui/commit/9d81eba))
* **tabs:** Update styles for SimpleTabs for 2.0.0 ([a942a44](https://github.com/pivotal-cf/pivotal-ui/commit/a942a44))
* **tile-layout:** adds TileLayout component ([c3ff982](https://github.com/pivotal-cf/pivotal-ui/commit/c3ff982))


### BREAKING CHANGES

* **tabs:** S: (css class) The old styling of SimpleTabs is no longer
available. The same classes or React Components use the new styles. ([a942a44](https://github.com/pivotal-cf/pivotal-ui/commits/a942a44))
* **tabs:** (whitespace) tab default body padding is now on .tab-pane ([cac8cde](https://github.com/pivotal-cf/pivotal-ui/commits/cac8cde))
* **no-js:** removes .no-js from pui-css-deprecated ([c3674a2](https://github.com/pivotal-cf/pivotal-ui/commits/c3674a2))
* **toggles:** removes toggles from pui-css-deprecated ([945039a](https://github.com/pivotal-cf/pivotal-ui/commits/945039a))
* **health_indicators:** removes health_indicators from pui-css-deprecated ([799eb23](https://github.com/pivotal-cf/pivotal-ui/commits/799eb23))


