<a name="2.0.0-alpha.5"></a>
# 2.0.0-alpha.5 (2015-09-17)


### Bug Fixes

* **autocomplete:** withRelatedTarget now merges properties in correct order ([ec27ae0](https://github.com/pivotal-cf/pivotal-ui/commit/ec27ae0))
* **dividers:** reduce padding around large dividers to match small dividers ([b1a1906](https://github.com/pivotal-cf/pivotal-ui/commit/b1a1906))
* **draggable-list:** draggable list callback is fixed ([0bdd107](https://github.com/pivotal-cf/pivotal-ui/commit/0bdd107))
* **forms:** Changes input text color to be darker. ([df046bd](https://github.com/pivotal-cf/pivotal-ui/commit/df046bd))
* **forms:** Remove help-inline class ([87a90a5](https://github.com/pivotal-cf/pivotal-ui/commit/87a90a5))
* **react-bootstrap:** only require needed components from react bootstrap ([a2847f9](https://github.com/pivotal-cf/pivotal-ui/commit/a2847f9))
* **sortable-table:** Clicking on sortable header doesn&#x27;t select text ([a9ec8a0](https://github.com/pivotal-cf/pivotal-ui/commit/a9ec8a0)), closes [#103050640](https://github.com/pivotal-cf/pivotal-ui/issues/103050640)

### Features

* **react-animations:** remove pui-css-react-animations ([e944ad0](https://github.com/pivotal-cf/pivotal-ui/commit/e944ad0))
* **stream-list:** Exports StreamListItem to use for StreamList ([387053e](https://github.com/pivotal-cf/pivotal-ui/commit/387053e))


### BREAKING CHANGES

* **forms:** help-inline class has been removed from forms ([87a90a5](https://github.com/pivotal-cf/pivotal-ui/commits/87a90a5))
* **forms:** (sass variable) $input-color is now $neutral-3. ([df046bd](https://github.com/pivotal-cf/pivotal-ui/commits/df046bd))
* **dividers:** (visual appearance) large dividers have less whitespace ([b1a1906](https://github.com/pivotal-cf/pivotal-ui/commits/b1a1906))
* **draggable-list:** DraggableList callback onDrop is no longer passed to
list items - use onDragEnd instead to provide a callback. ([0bdd107](https://github.com/pivotal-cf/pivotal-ui/commits/0bdd107))


