// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { config } from "rxjs";

export const environment = {
  production: false,
  apiHost: '',
  API_BASE: '',
  API_DOMAIN_NAME: '',
  CALIX_ALEXA_API_HOST: '',
  ADMIN_API_BASE_URL: '',
  VERSION: '23.3.0',
  SP_API_BASE_URL: '',
  BILLING_API_BASE_URL: '',
  BILLING_TOKEN: '',
  BING_API_KEY: '',
  GO_JS_KEY: '',
  MOBILE_API_BASE_URL: '',
  CALIX_ALEXA_MOBILE_API_HOST: '',
  SSO_API_URL: '',
  X_CALIX_CLIENTID: '',
  faAdminURL: '',
  calixAdminURL: '',
  faFrontEnd: '',
  cmcBaseURL: '',
  faAdminOrgId: 50,
  AUTH_API_HOST: '',
  UI_BASE_URL: '',
  CMC_API_BASE_URL: '',
  faAdminCorrelatorURL: '',
  CALIX_ADMIN_BASE_URL: '',
  CALIX_ADMIN_ORG_BASE_URL: '',
  FA_API_BASE_URL: '',
  X_CALIX_SECURE_CLIENTID: '',
  CSC_BASE_URL: '',
  CSC_LOGOUT_URL: '',
  CMC_DOWNLOAD_CSV_URL: '',
  CSC_TOS_MD_HASH: 'XZOMRFuSeugCBDLfIVGBSw==',
  CSC_BASIC_TOS_MD_HASH: 'XZOMRFuSeugCBDLfIVGBSw==',
  CMC_TOS_MD_HASH: 'XZOMRFuSeugCBDLfIVGBSw==',
  CCO_TOS_MD_HASH: 'XZOMRFuSeugCBDLfIVGBSw==',
  FOUNDATION_TOS_MD_HASH: 'XZOMRFuSeugCBDLfIVGBSw==',
  TOS_API_URL: '',
  FLOW_BASE_URL: '',
  IMAGE_UPLOAD_AWS_ACCESS_KEY: '',
  IMAGE_UPLOAD_AWS_ACCESS_SECRET: '',
  IMAGE_UPLOAD_BUCKET: '',
  CMC_DOWNLOAD_CSV_BUCKET: '',
  CMC_DOWNLOAD_CSV_AWS_ACCESS_KEY: '',
  CMC_DOWNLOAD_CSV_AWS_ACCESS_SECRET: '',
  SYS_ADMIN_ROUTE: 'systemAdministration',
  ORG_ADMIN_ROUTE: 'organization-admin',
  SUPPORT_URL: '',
  API_BASE_URL: '',
  UI_ASSETS_URL: '',
  VALIDATE_SCOPE: '',
  API_BASE_URL_CMC: '',
  // QLIK CONFIG
  SUMMARY_URL: '',
  MAP_URL: '',
  SMART_TABLE_URL: '',
  ADVANCED_URL: '',
  APP_ID: '',
  QLIK_CONFIG: '',
  IS_PRE_PRODUCTION: false,
  CALIX_URL: '',
  APP_ID_QLIK: '',
  BOARD_ID_QLIK: '',
  CCO_REPORTS_BASE_URL: '',
  MAILCHIMP_CLIENT_ID: '',
  MAILCHIMP_CLIENT_SECRET: '',
  FA_ADMIN_CONFIG_URL: '',
  FOUNDATION_BASE_URL: '',
  TRAFFIC_SOCKET_URL: '',
  FOUNDATION_SERVICES_URL: '',
  //hubspot
  HUBSPOT_CLIENT_ID: '',
  HUBSPOT_CLIENT_SECRET_ID: '',
  //constant
  CONSTANT_CLIENT_ID: '',
  //To Enable/Disable Foundation Scope
  VALIDATE_FOUNDATION_SCOPE: true,
  COC_SERVICES_ACTIVATION_URL: '',
  CCO_DASHBOARD_STREAM_ID: '',
  CSC_DASHBOARD_STREAM_ID: '',
  MYCOMMUNITYIQ_URL: '',
  COC_SERVICE_MIGRATION_URL:'',
  OPERATIONS_HOME_ACTIVE_ALARMS_COLORS: {
    "critical": "#C70000", "major": "#FC7235", "minor": "#F3B426", "warning": "#f7e9c1", "info": "#7cb5ec"
  },
  OPERATIONS:
  {
    HEALTH: {
      HEALTH_BAR_CHART_COLORS: {
        "first": '#0027FF', 'second': '#5ACFEA'
      },
      HEALTH_DELETED_BAR_CHART_COLORS:
      {
        "first": '#0027FF80', 'second': '#5ACFEA80'
      },
      TIMESERIES:
      {
        PON: { usbiperr: '#0027FF', dsbiperr: '#5ACFEA', usOct: '#0027FF', 'dsOct': '#5ACFEA', "rxPkt": '#B926F0', "txPkt": '#FF8238', "rxDis": '#029A7C', "txDis": "#F7C343", 'rxErr': '#FF489D', 'txErr': '#F7500F', 'usRate': '#0279ff', 'dsRate': '#82bf00', 'rxErrToPktRatio': '#836ee8', 'txErrToPktRatio': '#DE428E', 'rxDisToPktRatio': '#6574A6', 'txDisToPktRatio': '#41EAD4' },
        UPLINK: { oct: '#0027FF', pkt: '#5ACFEA', txPkt: '#B926F0', rxPkt: '#FF8238', rxOct: '#029A7C', txOct: '#F7C343', rxDis: '#FF489D', txDis: '#F7500F', rxErr: '#836ee8', txErr: '#DE428E', usRate: '#0279ff', dsRate: '#82bf00', rxErrToPktRatio: '#6574A6', txErrToPktRatio: '#41EAD4', rxDisToPktRatio: '#BB8B1A', txDisToPktRatio: '#A44A3F' },
        ONT: {
          usbiperr: '#0027FF', dsBipErr: '#5ACFEA', usFecTotCodeWord: '#B926F0', dsFecTotCodeWord: '#FF8238', upTime: '#029A7C', neOptSignalLvl: '#F7C343', rxOptPwr: '#FF489D', txOptPwr: '#F7500F',
          usFecCor: '#6a994e', dsFecCor: '#a98467', usFecUncorCodeWord: '#5f0f40', dsFecUncorCodeWord: '#7b2cbf', dsPonErr: '#197278', usPonErr: '#ce4257'
        },
      },
      DELETED_TRANSPARENT: {
        "first": '#0027FF00', 'second': '#5ACFEA00'
      },
      BAR_TRANSPARENT: {
        "first": '#FFFFFF00', 'second': '#00000000'
      }
    }
  },
  SUPPORT: {
    WIFI: {
      AIRTIME_ANALYSIS: ['#0279FF', '#5ACFEA', '#FF8238']
    }
  },
  highchartExportURL: "",
  QLIK_SUMMARY_URL_AQUI: '',
  QLIK_MAP_URL_AQUI: '',
  APP_ID_PRO: '',
  BOARD_ID_PRO: '',
  BOARD_ID_PRO_ADV: '',
  APP_ID_AQUISITION: '',
  EMBEDDING_LINK: '',
  QLIK_THOUTSPOT_INSIGHTS:'',
  QLIK_TS_BASEURL:'',
  QLIK_TS_ADVANCE_ID:'',
  QLIK_TS_PROSPECT_ID:'',
  QLIK_TS_TOKEN_URL:'',
  QLIK_TS_VIZID:'',
  QLIK_TS_KPIID:'',
  QLIK_TS_REDIRECT:'',
};
