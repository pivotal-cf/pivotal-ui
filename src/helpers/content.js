import React from 'react';
import ReactDOM from 'react-dom';

import 'pivotal-ui/css/alerts/alerts.scss';
import 'pivotal-ui/css/alignment/alignment.scss';
import 'pivotal-ui/css/autocomplete/autocomplete.scss';
import 'pivotal-ui/css/back-to-top/back-to-top.scss';
import 'pivotal-ui/css/backgrounds/backgrounds.scss';
import 'pivotal-ui/css/buttons/buttons.scss';
import 'pivotal-ui/css/button-group/button-group.scss';
import 'pivotal-ui/css/border/border.scss';
import 'pivotal-ui/css/box-shadows/box-shadows.scss';
import 'pivotal-ui/css/checkbox/checkbox.scss';
import 'pivotal-ui/css/checkbox-dropdown/checkbox-dropdown.scss';
import 'pivotal-ui/css/code/code.scss';
import 'pivotal-ui/css/collapse/collapse.scss';
import 'pivotal-ui/css/colors/colors.scss';
import 'pivotal-ui/css/common/common.scss';
import 'pivotal-ui/css/copy-to-clipboard/copy-to-clipboard.scss';
import 'pivotal-ui/css/dialog/dialog.scss';
import 'pivotal-ui/css/dividers/dividers.scss';
import 'pivotal-ui/css/dropdowns/dropdowns.scss';
import 'pivotal-ui/css/ellipsis/ellipsis.scss';
import 'pivotal-ui/css/flex-grids/flex-grids.scss';
import 'pivotal-ui/css/flyout/flyout.scss';
import 'pivotal-ui/css/forms/forms.scss';
import 'pivotal-ui/css/hoverable/hoverable.scss';
import 'pivotal-ui/css/iconography/iconography.scss';
import 'pivotal-ui/css/images/images.scss';
import 'pivotal-ui/css/inputs/input.scss';
import 'pivotal-ui/css/links/links.scss';
import 'pivotal-ui/css/lists/lists.scss';
import 'pivotal-ui/css/media/media.scss';
import 'pivotal-ui/css/modal/modal.scss';
import 'pivotal-ui/css/notifications/notifications.scss';
import 'pivotal-ui/css/pagination/pagination.scss';
import 'pivotal-ui/css/panels/panels.scss';
import 'pivotal-ui/css/positioning/positioning.scss';
import 'pivotal-ui/css/progress-bar/progress-bar.scss';
import 'pivotal-ui/css/radio/radio.scss';
import 'pivotal-ui/css/select/select.scss';
import 'pivotal-ui/css/spinners/spinners.scss';
import 'pivotal-ui/css/tables/tables.scss';
import 'pivotal-ui/css/tabs/tabs.scss';
import 'pivotal-ui/css/text-filter/text_filter.scss';
import 'pivotal-ui/css/toggle/toggle.scss';
import 'pivotal-ui/css/tooltips/tooltips.scss';
import 'pivotal-ui/css/typography/typography.scss';
import 'pivotal-ui/css/vertical-alignment/vertical-alignment.scss';
import 'pivotal-ui/css/whitespace/whitespace.scss';

import * as Alerts from 'pivotal-ui/react/alerts';
import * as Autocomplete from 'pivotal-ui/react/autocomplete';
import * as Top from 'pivotal-ui/react/back-to-top';
import * as Buttons from 'pivotal-ui/react/buttons';
import * as Checkbox from 'pivotal-ui/react/checkbox';
import * as CheckboxDropdown from 'pivotal-ui/react/checkbox-dropdown';
import * as Collapse from 'pivotal-ui/react/collapse';
import * as Collapsible from 'pivotal-ui/react/collapsible';
import * as Clipboard from 'pivotal-ui/react/copy-to-clipboard';
import * as Dividers from 'pivotal-ui/react/dividers';
import * as DraggableList from 'pivotal-ui/react/draggable-list';
import * as Dropdowns from 'pivotal-ui/react/dropdowns';
import * as Expander from 'pivotal-ui/react/expander';
import * as Flyout from 'pivotal-ui/react/flyout';
import * as Forms from 'pivotal-ui/react/forms';
import * as Grids from 'pivotal-ui/react/flex-grids';
import * as Iconography from 'pivotal-ui/react/iconography';
import * as Images from 'pivotal-ui/react/images';
import * as Inputs from 'pivotal-ui/react/inputs';
import * as Lists from 'pivotal-ui/react/lists';
import * as Media from 'pivotal-ui/react/media';
import * as Modal from 'pivotal-ui/react/modal';
import * as Notifications from 'pivotal-ui/react/notifications';
import * as Pagination from 'pivotal-ui/react/pagination';
import * as Panels from 'pivotal-ui/react/panels';
import * as ProgressBar from 'pivotal-ui/react/progress-bar';
import * as Portals from 'pivotal-ui/react/portals';
import * as Radio from 'pivotal-ui/react/radio';
import * as Table from 'pivotal-ui/react/table';
import * as Trigger from 'pivotal-ui/react/overlay-trigger';
import * as Select from 'pivotal-ui/react/select';
import * as Svg from 'pivotal-ui/react/svg';
import * as Tabs from 'pivotal-ui/react/tabs';
import * as Toggle from 'pivotal-ui/react/toggle';
import * as TextFilter from 'pivotal-ui/react/text-filter';
import * as Tooltip from 'pivotal-ui/react/tooltip';
import * as Wizard from 'pivotal-ui/react/wizard';

import Contribute from '../../docs/Contribute.md';
import GetStarted from '../../docs/GetStarted.md';
import Faq from '../../docs/Faq.md';
import UpgradeGuide from '../../docs/UpgradeGuide.md';
import Versions from '../../docs/Versions.md';
import NotFound from '../../docs/404.md';

const attachToWindow = pkg => {
  Object.keys(pkg).forEach(key => {
    window[key] = pkg[key];
  });
};

export const attachPackagesToWindow = () => {
  window.React = React;
  window.ReactDOM = ReactDOM;

  Object.keys(routes)
    .map(k => routes[k])
    .map(r => r.packages)
    .forEach(packages => packages.forEach(attachToWindow));
};