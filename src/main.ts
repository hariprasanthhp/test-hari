import { enableProdMode, ReflectiveInjector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { CommonFunctionsService } from './app/shared/services/common-functions.service';
const injector = ReflectiveInjector.resolveAndCreate([CommonFunctionsService]);
const cryptoService = injector.get(CommonFunctionsService)

if (environment.production) {
  enableProdMode();
}

(async () => {
  // let obj = {
  //   "apiURL": "https://stage.api.calix.ai",
  //   "validate_scope": true,
  //   "isCAInstance": false,
  //   "isPreproduction": false,
  //   "bingMapKey": "U2FsdGVkX182M6l2ZKfvnILzaTRTCKZEvmzutfjEo4CWw6kxCRhk/bh7La0E9PsWn8LpOooDaoOspvMTuZA7COvf/Fm/hIot8dwI8ZypeNEJdaikjvS6iepjxx3SOCBn",
  //   "gojsKey": "U2FsdGVkX1/9cSUNt65DnVRO/lUBfVfMeEeNbCSk0wVy8aBLTiOFpjC+VVDh5g4YMjcm48EOLLE+Qx9IJ6C7cgkIuf1drSavCrxfFZU1g72lpqLkF0x2HRwo7/MeUrb8lNuDg9dCm9HIWfAaVAvG2aA21sSLQOvw0DbQCOiRlsOlEYtN+1pNdviK+CqF3LqLNIy4UFM+0X84NP/i6UNh9gAEvR5DVmqwy35IH3LWJSVkZ2IoKmLBE89D+G+TdgON3domccc9giXwtyAvScDQ61SQ3jT1w9mARuNsiDRz6Wlba7UcvRsT9/QjE5iy5uLJzwBfyiXE7759pRzjkanqVye+atkp4NB8pRJqrxfuiGM=",
  //   "xCalixClientID": "U2FsdGVkX1+COwn0SPW2Rk3t2I2Kz/L+/eS37LONOmFQTa5+LbajhBc//DBi9rqFD8X8wRbyXjoMdCl2lilSmQ==",
  //   "X_CALIX_SECURE_CLIENTID": "U2FsdGVkX1/yCgnNXvX8qnM0vZiPPZJJZhh3jDjTXWN26U1H0fz9Q3VdX7cdzTKU",
  //   "mailchimpClinetId": "U2FsdGVkX1/CwT5xCP0zUD0PA2ICiN6otF80ASOrglc=",
  //   "mailchimpSecret": "U2FsdGVkX1+1EfNtdA4Iopr9hQEocWDtyRdH89MOtXdPE++cMJZcS4YhVsqDSlj8BP+/Di5UeVrpXBljbYriUYoE5FkQ80Llpd6o545mHbI=",
  //   "APP_ID": "U2FsdGVkX19alf+JXP1cM7NaQKOHxdaSLIqUYRv3jp5WldBRzSCWBfD0wnLwbJW4RavPQ70GlzVQAV39JmkNmg==",
  //   "APP_ID_QLIK": "U2FsdGVkX18uN9IRk2irqabNMg3+6LUCo/dTi43+APxJvnVkfkROb1y9JvrhwfjY",
  //   "BOARD_ID_QLIK": "U2FsdGVkX18PF/GsWHBO8JcTIqWQgZyUc4pcXrjAamUK2b8zisKY+5x7Qhbr59+8",
  //   "QLIK_SUMMARY_URL": "U2FsdGVkX19z/KrZv+YZuwu31S9cfAjm+f5pFaJ7rKxuYSbfIbu4tWK9FKfI5WP4s0zbBcq1xzD+Cs88bcWEh/ymLapzJzgXBpKm2t2PkAtoRdAri/PGNbG1SoSfl1XEWF0nwGDTQPCO80//baEWThSUet39l7UU/FFL74iSVm4YHWdo5Oa43KM+RyeJXbZjHuW8Q+wG4qch15RFb39JHg==",
  //   "QLIK_MAP_URL": "U2FsdGVkX1+FnwAdBJixBrbQCEQtTHIYz6wgCfAx4ICvhJ2irErnsIOdlwzdXEdykFa8ciCn8ErzPgL3iLtTknQhr1qj9nDBPM8zOLHaNiQZ1r1UJbMVSxcaZrRBY3KduJbMwfwRETSpcZdzRrOWajO0hiSLrCJdl4Zk17xL6rs=",
  //   "QLIK_SMART_TABLE_URL": "U2FsdGVkX18UNk+balhxEQ4rZ/LL4ihclii/ZiO4sN+/4FaRYWo/OWVNThxd/Zc9GgfxQMfQpHEhBioR02DiTp0Ys7PTUaKpEQjSiXrt7dx1WUsK4lsrBwC1UxfjoD1GfYDdYCC5vpz8LekXUv2ijaEs+HSVLe+U/7P8d/6NTPo=",
  //   "QLIk_ADVANCED_URL": "https://clouddashboards-stg.calix.com/ticket/extensions/InfoXD_New/InfoXD_New.html?",
  //   "QLIK_CONFIG": {
  //     "host": "clouddashboards-stg.calix.com",
  //     "prefix": "/ticket/",
  //     "port": 443,
  //     "isSecure": true
  //   },
  //   "CCO_DASHBOARD_STREAM_ID": "U2FsdGVkX1+ImOGrbX/Cgw5aK2GN3zd4i6gi0DqMxDOuhmIJMs34n5RRXVzLoXKj",
  //   "CSC_DASHBOARD_STREAM_ID": "U2FsdGVkX18J5B9oT0FCdoy/z2Sauti00OeWfjCiHh4rTMt5pAfnugDoipH0ihAZ",
  //   "hubspotclientID": "U2FsdGVkX1+m0TAE0ICneIk39MfzNVChFgDwN6ZXGfefxIOeZvX4BKmlkWYcdiv6bjOdRfGa58T2SlMaB93SVw==",
  //   "hubspotsecret": "U2FsdGVkX1//RCHXDbweNUL/Fg7booQCsG4JTWiM15PSdch96mrz/2VJaII2ZKvBYoUC6yqAli45HJKuN1//KA==",
  //   "constantcontactclientID": "U2FsdGVkX1+Ze1OqjYGivH7QNzoKjwrICJUUhoro3vPlCE3JzHErL6BwX2SSrET1GFUVaYQYS6XdyGKGaH4W9g==",
  //   "highchartExportURL": "U2FsdGVkX1+uyufQhWKm5tve/XChvJTlxKz2adtrH937gC5yqzHBvTsdUYOPq9egU47OmqujJyiSNFRiZkHl0w==",
  //   "QLIK_SUMMARY_URL_AQUI": "U2FsdGVkX19dE/yYS0VUIepA7hCNN27kBxl1RXrb5AhIfhEpWM9WG3XFOm7fQgRYIbS41p0iV5Ch0iCjgb/8WwVCll9UQpUx2shMdX9tXpaXxkJ5W3JolN0AaLRwIuzrQqLIcsUQcxXlfRNHnxy++i2Zrb8u3MBm8zcetNgWz5hcclbKX/EBaxcgZCCrNk2uPFBe10+7Gi9gU1gNqSg4gg==",
  //   "QLIK_MAP_URL_AQUI": "U2FsdGVkX19UPbvOYT2sa/jYJR4g8waY6dwIpjWDSj4EOHUTvvmWsfC7V9WnVX/7tAT5yc8alms57KHpQM45W+c05mFIXbYodJNBWJouF8VNng3v9Iijgl5GhCn3yVVwKq20B01HUfmd5oJOAQxXAo/c46QBIOQ9CayvcpgKjiA=",
  //   "APP_ID_PRO": "U2FsdGVkX18vByf74ZtyFcMhIoG/IRmNEKHtuygManEGynyTJPGIu6Um1Y9ADGAG",
  //   "BOARD_ID_PRO": "U2FsdGVkX18O5dNVTNXuiK+fG/Hy2ZaxutMJfvJu20Bv9s5ENdGVbKBmpymsAz4T",
  //   "BOARD_ID_PRO_ADV": "U2FsdGVkX19jSlMjRhp9z9U4M13I6rABxzLmSGU8xrsy7dS/YbZ91yxgp9cowzL5",
  //   "APP_ID_AQUISITION": "U2FsdGVkX1/a8btb3wqXMMgQYdkocUH3nbngJESxQo+1l2EXkLJT/DOGbR+gbeVAgSUmR6/eGFLylykq/dH1xQ=="
  // }

  // let newConfig = {};
  // let keys = Object.keys(obj);
  // keys.forEach((key) => {
  //   newConfig[cryptoService.encryptKeys(key).toString()] = obj[key];
  // });
  // console.log(JSON.stringify(newConfig));

  // console.log(cryptoService.encryptKeys('test test '));
  // console.log(cryptoService.decryptKeys(cryptoService.encryptKeys('test test ')));

  const response = await fetch('assets/config/config.json?version=23.3.0');
  //const config = await response.json();
  let newConfig = await response.json();
  const configVal = Object.values(newConfig).join('');
  newConfig = JSON.parse(cryptoService.decryptObj(configVal));
  const config: any = {};
  let keys = Object.keys(newConfig);
  keys.forEach((key) => {
    config[cryptoService.decryptKeys(key)] = newConfig[key];
  });
  let uri = config.apiURL;
  let bingMapKey = cryptoService.decryptKeys(config.bingMapKey);
  let gojsKey = cryptoService.decryptKeys(config.gojsKey);

  const supportURL = config.supportURL;

  const apiURI = uri;
  let authApiHost: string = apiURI + '/v1/authentication';
  let apiHost: string = apiURI + '/v1/shad';
  let billingHost = apiURI;


  if (config.isPreproduction) {
    environment['IS_PRE_PRODUCTION'] = true;
  }


  if (uri.indexOf('dev.api.calix.ai') !== -1) {
    //console.log("do override the dev constants");

    config.imageUploadAWSAccessKey = '';
    config.imageUploadAWSAccessSecret = '';
    config.imageUploadBucket = '';
    // config.SUMMARY_URL = '';
    // config.MAP_URL = '';
    // config.SMART_TABLE_URL = '';
    // config.ADVANCED_URL = '';
    // config.QLIK_CONFIG = '';
    config.SUMMARY_URL = config.QLIK_SUMMARY_URL;
    config.MAP_URL = config.QLIK_MAP_URL;
    config.SMART_TABLE_URL = config.QLIK_SMART_TABLE_URL;
    config.ADVANCED_URL = config.QLIk_ADVANCED_URL;
    config.QLIK_CONFIG = config.QLIK_CONFIG
    config.TRAFFIC_SOCKET_URL = 'wss://rtwsgw-dev.calix.com';

  } else if (uri.indexOf('stage.api.calix.ai') !== -1) {
    //console.log("do override the stage constants");
    config.imageUploadAWSAccessKey = '';
    config.imageUploadAWSAccessSecret = '';
    config.imageUploadBucket = '';
    // config.SUMMARY_URL = 'https://clouddashboards-stg.calix.com/ticket/single/?appid=19fd173e-7a31-40eb-95f9-042897b32ecf&sheet=fa36e4e1-0de5-48b5-8571-43284aca1263';
    // config.MAP_URL = 'https://clouddashboards-stg.calix.com/ticket/single/?appid=19fd173e-7a31-40eb-95f9-042897b32ecf&obj=BMAA';
    // config.SMART_TABLE_URL = 'https://clouddashboards-stg.calix.com/ticket/single/?appid=19fd173e-7a31-40eb-95f9-042897b32ecf&obj=tXCJYE';
    // config.ADVANCED_URL = 'https://clouddashboards-stg.calix.com/ticket/extensions/InfoXD_New/InfoXD_New.html?';
    // config.QLIK_CONFIG = {
    //   "host": "clouddashboards-stg.calix.com",
    //   "prefix": "/ticket/",
    //   "port": 443,
    //   "isSecure": true
    // };
    //read from config
    config.SUMMARY_URL = config.QLIK_SUMMARY_URL;
    config.MAP_URL = config.QLIK_MAP_URL;
    config.SMART_TABLE_URL = config.QLIK_SMART_TABLE_URL;
    config.ADVANCED_URL = config.QLIk_ADVANCED_URL;
    config.QLIK_CONFIG = config.QLIK_CONFIG
    config.TRAFFIC_SOCKET_URL = 'wss://rtwsgw-stg.calix.com';
  } else {
    if (config.isCAInstance) {
      //console.log("do override the ca-prod constants");

      config.imageUploadAWSAccessKey = '';
      config.imageUploadAWSAccessSecret = '';
      config.imageUploadBucket = '';
      config.SUMMARY_URL = config.QLIK_SUMMARY_URL;
      config.MAP_URL = config.QLIK_MAP_URL;
      config.SMART_TABLE_URL = config.QLIK_SMART_TABLE_URL;
      config.ADVANCED_URL = config.QLIk_ADVANCED_URL;
      config.QLIK_CONFIG = config.QLIK_CONFIG
    } else {
      //console.log("do override the us-prod constants");

      config.imageUploadAWSAccessKey = '';
      config.imageUploadAWSAccessSecret = '';
      config.imageUploadBucket = '';
      // config.SUMMARY_URL = 'https://clouddashboards-us.calix.com/ticket/single/?appid=ef6d021a-c172-4569-918a-c72792889c82&sheet=fa36e4e1-0de5-48b5-8571-43284aca1263';
      // config.MAP_URL = 'https://clouddashboards-us.calix.com/ticket/single/?appid=ef6d021a-c172-4569-918a-c72792889c82&obj=BMAA';
      // config.SMART_TABLE_URL = 'https://clouddashboards-us.calix.com/ticket/single/?appid=ef6d021a-c172-4569-918a-c72792889c82&obj=tXCJYE';
      // config.ADVANCED_URL = 'https://clouddashboards-us.calix.com/ticket/extensions/InfoXD_New/InfoXD_New.html?';
      // config.QLIK_CONFIG = {
      //   "host": "clouddashboards-us.calix.com",
      //   "prefix": "/ticket/",
      //   "port": 443,
      //   "isSecure": true
      // };
      config.SUMMARY_URL = config.QLIK_SUMMARY_URL;
      config.MAP_URL = config.QLIK_MAP_URL;
      config.SMART_TABLE_URL = config.QLIK_SMART_TABLE_URL;
      config.ADVANCED_URL = config.QLIk_ADVANCED_URL;
      config.QLIK_CONFIG = config.QLIK_CONFIG
    }
  }


  let ssoApiHost = apiURI;
  let port = window.location.port;
  let uibaseUrl = ('https:' == document.location.protocol ? 'https://' : 'http://') + location.hostname;
  let uibaseUrlWOH = ('https:' == document.location.protocol ? 'https://' : 'http://') + location.hostname;

  if (port) {
    uibaseUrl += ':' + port;
    uibaseUrlWOH += ':' + port;
  }


  const cmcApiHost = apiURI + '/v1/cmc/';
  environment.API_BASE_URL = apiURI + '/v1/';
  environment.API_BASE_URL_CMC = apiURI + '/v2/cmc/';
  environment['apiHost'] = apiHost;
  environment['API_BASE'] = apiURI;
  environment['API_DOMAIN_NAME'] = apiHost;
  environment['ADMIN_API_BASE_URL'] = apiHost + '/map/v1/admin/calix';
  environment['SP_API_BASE_URL'] = apiHost;
  environment['BILLING_API_BASE_URL'] = billingHost + '/map/v1/internal';
  environment['BING_API_KEY'] = bingMapKey;
  environment['GO_JS_KEY'] = gojsKey;
  environment['MOBILE_API_BASE_URL'] = apiHost + '/map/v1/mobile';
  environment['SSO_API_URL'] = ssoApiHost;
  environment['X_CALIX_CLIENTID'] = cryptoService.decryptKeys(config.xCalixClientID);
  environment['faAdminURL'] = apiURI + '/v1/fa/config/';
  environment['calixAdminURL'] = apiURI + '/v1/admin/';
  environment['faFrontEnd'] = apiURI + '/v1/fa/';
  environment['cmcBaseURL'] = apiURI + '/v1/cmc/';
  environment['AUTH_API_HOST'] = authApiHost;
  environment['UI_BASE_URL'] = uibaseUrl;
  environment['CMC_API_BASE_URL'] = cmcApiHost;
  environment['faAdminCorrelatorURL'] = apiURI + '/v1/fa/correlator/';
  environment['CALIX_ADMIN_BASE_URL'] = apiURI + '/v1/admin/';
  environment['CALIX_ADMIN_ORG_BASE_URL'] = apiURI + '/v1/org/admin/';
  environment['FA_API_BASE_URL'] = apiURI + '/v1/fa/';
  environment['X_CALIX_SECURE_CLIENTID'] = cryptoService.decryptKeys(config.X_CALIX_SECURE_CLIENTID);
  //environment['CSC_BASE_URL'] = `${cscUri}`;
  //environment['CSC_LOGOUT_URL'] = `${cscUri}/logout`;
  environment['CMC_DOWNLOAD_CSV_URL'] = uibaseUrlWOH + '/download/';
  environment['TOS_API_URL'] = apiURI + '/v1/calix/authz/tos';
  environment['FLOW_BASE_URL'] = apiURI + '/v1/flow/';
  environment['IMAGE_UPLOAD_AWS_ACCESS_KEY'] = config.imageUploadAWSAccessKey;
  environment['IMAGE_UPLOAD_AWS_ACCESS_SECRET'] = config.imageUploadAWSAccessSecret;
  environment['IMAGE_UPLOAD_BUCKET'] = config.imageUploadBucket;
  environment['CMC_DOWNLOAD_CSV_BUCKET'] = '';
  environment['CMC_DOWNLOAD_CSV_AWS_ACCESS_KEY'] = '';
  environment['CMC_DOWNLOAD_CSV_AWS_ACCESS_SECRET'] = '';
  environment['SYS_ADMIN_ROUTE'] = 'systemAdministration';
  environment['ORG_ADMIN_ROUTE'] = 'organization-admin';
  environment['SUPPORT_URL'] = `${uri}/v1/csc`;
  environment['UI_ASSETS_URL'] = `${uibaseUrl}/assets`;
  environment['VALIDATE_SCOPE'] = config.validate_scope ? config.validate_scope : false;
  environment['CALIX_URL'] = apiURI + '/v1/calix/'
  // QLIK CONFIG
  environment['SUMMARY_URL'] = config.SUMMARY_URL ? cryptoService.decryptKeys(config.SUMMARY_URL) : '';
  environment['MAP_URL'] = config.MAP_URL ? cryptoService.decryptKeys(config.MAP_URL) : '';
  environment['SMART_TABLE_URL'] = config.SMART_TABLE_URL ? cryptoService.decryptKeys(config.SMART_TABLE_URL) : '';
  environment['ADVANCED_URL'] = config.ADVANCED_URL;
  environment['APP_ID'] = config.APP_ID ? cryptoService.decryptKeys(config.APP_ID) : '';
  environment['QLIK_CONFIG'] = config.QLIK_CONFIG
  environment['APP_ID_QLIK'] = config.APP_ID_QLIK ? cryptoService.decryptKeys(config.APP_ID_QLIK) : '';
  environment['BOARD_ID_QLIK'] = config.BOARD_ID_QLIK ? cryptoService.decryptKeys(config.BOARD_ID_QLIK) : '';
  environment['QLIK_SUMMARY_URL_AQUI'] = config.QLIK_SUMMARY_URL_AQUI ? cryptoService.decryptKeys(config.QLIK_SUMMARY_URL_AQUI) : '';
  environment['QLIK_MAP_URL_AQUI'] = config.QLIK_MAP_URL_AQUI ? cryptoService.decryptKeys(config.QLIK_MAP_URL_AQUI) : '';
  environment['APP_ID_PRO'] = config.APP_ID_PRO ? cryptoService.decryptKeys(config.APP_ID_PRO) : '';
  environment['BOARD_ID_PRO'] = config.BOARD_ID_PRO ? cryptoService.decryptKeys(config.BOARD_ID_PRO) : '';
  environment['BOARD_ID_PRO_ADV'] = config.BOARD_ID_PRO_ADV ? cryptoService.decryptKeys(config.BOARD_ID_PRO_ADV) : '';
  environment['APP_ID_AQUISITION'] = config.APP_ID_AQUISITION ? cryptoService.decryptKeys(config.APP_ID_AQUISITION) : '';
  environment['CCO_REPORTS_BASE_URL'] = apiURI + '/v1/fa-reporter/';
  environment['MAILCHIMP_CLIENT_ID'] = cryptoService.decryptKeys(config.mailchimpClinetId);
  environment['MAILCHIMP_CLIENT_SECRET'] = cryptoService.decryptKeys(config.mailchimpSecret);
  environment['FA_ADMIN_CONFIG_URL'] = apiURI + '/v1/fa-config/';
  environment['FOUNDATION_BASE_URL'] = apiURI + '/v1/foundation/';
  environment['TRAFFIC_SOCKET_URL'] = config.TRAFFIC_SOCKET_URL;
  environment['FOUNDATION_SERVICES_URL'] = apiURI + '/v1/billing/';
  //To Enable/Disable Foundation Scope
  environment['VALIDATE_FOUNDATION_SCOPE'] = true;
  //console.log(environment['VALIDATE_FOUNDATION_SCOPE'], 'VALIDATE_FOUNDATION_SCOPE');
  environment['COC_SERVICES_ACTIVATION_URL'] = `${apiURI}/v2/svc/activation`;
  environment['HUBSPOT_CLIENT_ID'] = cryptoService.decryptKeys(config.hubspotclientID);
  environment['HUBSPOT_CLIENT_SECRET_ID'] = cryptoService.decryptKeys(config.hubspotsecret);
  environment['CCO_DASHBOARD_STREAM_ID'] = cryptoService.decryptKeys(config.CCO_DASHBOARD_STREAM_ID);
  environment['CSC_DASHBOARD_STREAM_ID'] = cryptoService.decryptKeys(config.CSC_DASHBOARD_STREAM_ID);
  environment['MYCOMMUNITYIQ_URL'] = apiURI + '/v1/mycommunityiq'
  environment['COC_SERVICE_MIGRATION_URL'] = apiURI + '/v1/cco/service-migrator'
  environment['CONSTANT_CLIENT_ID'] = cryptoService.decryptKeys(config.constantcontactclientID);
  environment['highchartExportURL'] = cryptoService.decryptKeys(config.highchartExportURL);
  environment['EMBEDDING_LINK'] = cryptoService.decryptKeys(config.EMBEDDING_LINK);
  environment['QLIK_THOUTSPOT_INSIGHTS'] = cryptoService.decryptKeys(config.QLIK_THOUTSPOT_INSIGHTS);
  /////TS////
  environment['QLIK_TS_BASEURL'] = config.QLIK_TS_BASEURL ? cryptoService.decryptKeys(config.QLIK_TS_BASEURL) : '';
  environment['QLIK_TS_ADVANCE_ID'] = config.QLIK_TS_ADVANCE_ID ? cryptoService.decryptKeys(config.QLIK_TS_ADVANCE_ID) : '';
  environment['QLIK_TS_PROSPECT_ID'] = config.QLIK_TS_PROSPECT_ID ? cryptoService.decryptKeys(config.QLIK_TS_PROSPECT_ID) : '';
  environment['QLIK_TS_TOKEN_URL'] = config.QLIK_TS_TOKEN_URL ? cryptoService.decryptKeys(config.QLIK_TS_TOKEN_URL) : '';
  environment['QLIK_TS_VIZID'] = config.QLIK_TS_VIZID ? cryptoService.decryptKeys(config.QLIK_TS_VIZID) : '';
  environment['QLIK_TS_KPIID'] = config.QLIK_TS_KPIID ? cryptoService.decryptKeys(config.QLIK_TS_KPIID) : '';
  environment['QLIK_TS_REDIRECT'] = config.QLIK_TS_REDIRECT ? cryptoService.decryptKeys(config.QLIK_TS_REDIRECT) : '';



  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
})();

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
