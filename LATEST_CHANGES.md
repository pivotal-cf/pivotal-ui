<a name="8.3.1"></a>
## 8.3.1 (2017-06-24)


### Bug Fixes

* **Portals:** Portals render correctly even if the source does not exist [#138224093] ([90820be](https://github.com/pivotal-cf/pivotal-ui/commit/90820be)), closes [#138224093](https://github.com/pivotal-cf/pivotal-ui/issues/138224093)
* **Svg:** when src prop changes, load and render new svg [#146825139] ([2b30d0d](https://github.com/pivotal-cf/pivotal-ui/commit/2b30d0d))

### Features

* **Autocomplete:** Preserve original ordering on list when input is blank [#146494361] ([732911c](https://github.com/pivotal-cf/pivotal-ui/commit/732911c9f9d68a340066d9ca46386bdd78bc570b))
* **Dropdown:**
    * Dropdown with split text has separate `onSplitClick` and `splitClassName` props [#146890137] ([d8711ee](https://github.com/pivotal-cf/pivotal-ui/commit/d8711ee0aa19e912445302ff4741b53862130b6f))
    * `onSelect` is triggered by clicking DropdownItem `li` ([e62e3e7](https://github.com/pivotal-cf/pivotal-ui/commit/e62e3e7))
    * Dropdown accepts a `blockingScrim` prop [#147471363] ([eeddedf](https://github.com/pivotal-cf/pivotal-ui/commit/eeddedf351f75d622b904fc607d1dc64549f291c))
* **Toolbar:**  Further tweaks to toolbar [#146811529] ([3b2022a](https://github.com/pivotal-cf/pivotal-ui/commit/3b2022a))