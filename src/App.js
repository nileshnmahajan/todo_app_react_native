import theme from './components/Theme';
import assets from './assets';
import colors from './common/Colors';
import strings from './common/Strings';
import langs from './common/langs';
import styles from './common/Styles';
import API from './common/urls';
import util from './common/util';
import constants from './common/Constants';
import {connect, mapStateToProps, mapDispatchToProps, Reducer} from './redux/';
import {
  log,
  jsonAlert,
  jsonLog,
  alert,
  jsonDecode,
  jsonEncode,
  okDialog,
  loading,
  sendData,
  device_type,
  width,
  height,
  translate,
  wip,
  yesNoDialog,
  isLogin,
  isConnectedToNet,
  navigation,
  removeTags,
  handleClick,
  distance,
  exist,
  urlValider,
  getStatusBarHeight,
} from './common/util';
import ToDoDatabase from './databases/ToDoDatabase';
import LabelDatabase from './databases/LabelDatabase';
import RenderOkDialog from './components/OkDialog';
import RenderYesNoDialog from './components/YesNoDialog';
import RenderLoader from './components/Loader';
import FloatingHeader from './components/FixedHeader';
import FixedHeader from './components/FixedHeader';
import RenderStatusBar from './components/RenderStatusBar';
import MapFilter from './components/MapFilter';
import ShopRow from './components/ShopRow';
export {
  ToDoDatabase,
  LabelDatabase,
  langs,
  theme,
  getStatusBarHeight,
  ShopRow,
  urlValider,
  exist,
  distance,
  handleClick,
  MapFilter,
  removeTags,
  navigation,
  isConnectedToNet,
  FixedHeader,
  isLogin,
  yesNoDialog,
  RenderYesNoDialog,
  RenderStatusBar,
  FloatingHeader,
  wip,
  device_type,
  sendData,
  loading,
  RenderLoader,
  RenderOkDialog,
  okDialog,
  log,
  styles,
  jsonAlert,
  jsonLog,
  jsonDecode,
  jsonEncode,
  alert,
  assets,
  colors,
  constants,
  strings,
  util,
  API,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  Reducer,
  width,
  height,
  translate,
};
