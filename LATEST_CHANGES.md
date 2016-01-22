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
prop ([b0cc929](https://github.com/pivotal-cf/pivotal-ui/commits/b0cc929))
* **tables:** (javascript) React SortableTable has a completely new
API. ([925ff13](https://github.com/pivotal-cf/pivotal-ui/commits/925ff13))
* **tabs:** (html) classname modifiers are now on Tabs. ([768329e](https://github.com/pivotal-cf/pivotal-ui/commits/768329e))


