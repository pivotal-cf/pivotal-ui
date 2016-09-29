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
