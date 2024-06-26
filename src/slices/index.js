import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import UsersReducer from "./Users/reducer";
import CampaignReducer from "./Campaigns/reducer";
import CRMConfigurationReducer from "./CRMConfiguration/reducer";
import MappingReducer from "./Mapping/reducer";
import DispositionReducer from "./Disposition/reducer";
import MonitoringReducer from "./UserStatus/reducer";
import LoginHistoryReducer from "./LoginHistory/reducer";
import IVRCampaignReducer from "./IVRCampaign/reducer";
import NumberReducer from "./Number/reducer";
import SpeechReducer from "./Speech/reducer";
import DesignReducer from "./Design/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Mapping: MappingReducer,
  Campaigns: CampaignReducer,
  CRMConfiguration: CRMConfigurationReducer,
  Disposition: DispositionReducer,
  Monitoring: MonitoringReducer,
  LoginHistory: LoginHistoryReducer,
  IVRCampaign: IVRCampaignReducer,
  Number: NumberReducer,
  Speech: SpeechReducer,
  Design: DesignReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
