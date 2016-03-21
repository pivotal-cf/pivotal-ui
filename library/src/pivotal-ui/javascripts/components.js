import autocomplete from 'pui-react-autocomplete';
import buttons from 'pui-react-buttons';
import dropdowns from 'pui-react-dropdowns';
import lists from 'pui-react-lists';
import panels from 'pui-react-panels';
import tileLayout from 'pui-react-tile-layout';

module.exports = {
  BasePane: require('pui-react-panes').BasePane,
  Pane: require('pui-react-panes').Pane,

  Checkbox: require('pui-react-checkbox').Checkbox,
  Input: require('pui-react-inputs').Input,

  Divider: require('pui-react-dividers').Divider,
  InverseDivider: require('pui-react-dividers').InverseDivider,

  Row: require('pui-react-grids').Row,
  Col: require('pui-react-grids').Col,

  Media: require('pui-react-media').Media,
  Flag: require('pui-react-media').Flag,

  Radio: require('pui-react-radio').Radio,
  RadioGroup: require('pui-react-radio').RadioGroup,

  Image: require('pui-react-images').Image,

  Icon: require('pui-react-iconography').Icon,

  Modal: require('pui-react-modals').Modal,
  BaseModal: require('pui-react-modals').BaseModal,
  ModalBody: require('pui-react-modals').ModalBody,
  ModalFooter: require('pui-react-modals').ModalFooter,

  Ribbon: require('pui-react-ribbons').Ribbon,
  PrimaryRibbon: require('pui-react-ribbons').PrimaryRibbon,
  Banner: require('pui-react-ribbons').Banner,

  Tab: require('pui-react-tabs').Tab,
  Tabs: require('pui-react-tabs').Tabs,
  LeftTabs: require('pui-react-tabs').LeftTabs,

  Notifications: require('pui-react-notifications').Notifications,
  AlertNotifications: require('pui-react-notifications').AlertNotifications,
  NotificationItem: require('pui-react-notifications').NotificationItem,

  Label: require('pui-react-labels').Label,
  BaseCollapse: require('pui-react-collapse').BaseCollapse,
  Collapse: require('pui-react-collapse').Collapse,
  AltCollapse: require('pui-react-collapse').AltCollapse,

  ExpanderContent: require('pui-react-expander').ExpanderContent,
  ExpanderTrigger: require('pui-react-expander').ExpanderTrigger,

  SuccessAlert: require('pui-react-alerts').SuccessAlert,
  InfoAlert: require('pui-react-alerts').InfoAlert,
  WarningAlert: require('pui-react-alerts').WarningAlert,
  ErrorAlert: require('pui-react-alerts').ErrorAlert,

  OverlayTrigger: require('pui-react-overlay-trigger').OverlayTrigger,
  Tooltip: require('pui-react-tooltip').Tooltip,

  BackToTop: require('pui-react-back-to-top').BackToTop,

  PortalSource: require('pui-react-portals').PortalSource,
  PortalDestination: require('pui-react-portals').PortalDestination,
  StreamList: require('pui-react-stream-list').StreamList,
  StreamListItem: require('pui-react-stream-list').StreamListItem,
  Table: require('pui-react-table').Table,
  TableHeader: require('pui-react-table').TableHeader,
  TableCell: require('pui-react-table').TableCell,
  TableRow: require('pui-react-table').TableRow,
  ...autocomplete,
  ...buttons,
  ...dropdowns,
  ...lists,
  ...panels,
  ...selectFancy,
  ...tileLayout,

  Pagination: require('pui-react-pagination').Pagination};
