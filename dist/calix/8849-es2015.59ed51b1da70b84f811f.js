"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[8849],{88286:function(t,e,r){r.d(e,{I:function(){return n},J:function(){return i}});var n=(()=>{return(t=n||(n={})).DAY="day",t.WEEK="week",t.MONTH="month",n;var t})();class i{constructor(t){this.profileId=(null==t?void 0:t.profileId)||null,this.name=(null==t?void 0:t.name)||null,this.webCount=(null==t?void 0:t.webCount)||null,this.appCount=(null==t?void 0:t.appCount)||null,this.timeLimitStatus=(null==t?void 0:t.timeLimitStatus)||null,this.speedtest=(null==t?void 0:t.speedtest)||[new o],this.timeUsage=(null==t?void 0:t.timeUsage)||new p,this.stations=(null==t?void 0:t.stations)||[new a],this.avatarUrl=(null==t?void 0:t.avatarUrl)||null,this.isBlocked=(null==t?void 0:t.isBlocked)||null}}class s{constructor(t){this.name=(null==t?void 0:t.name)||null,this.duration=(null==t?void 0:t.duration)||null}}class o{constructor(t){this.downloadRate=(null==t?void 0:t.downloadRate)||null,this.uploadRate=(null==t?void 0:t.uploadRate)||null}}class p{constructor(t){this.type=(null==t?void 0:t.type)||null,this.totalUsage=(null==t?void 0:t.totalUsage)||null,this.usage=(null==t?void 0:t.usage)||[new s]}}class a{constructor(t){this.deviceId=(null==t?void 0:t.deviceId)||null,this.name=(null==t?void 0:t.name)||null,this.isOnline=(null==t?void 0:t.isOnline)||null,this.ifType=(null==t?void 0:t.ifType)||null}}},52900:function(t,e,r){r.d(e,{zs:function(){return i},n5:function(){return s},HV:function(){return o},he:function(){return p},qM:function(){return a},u1:function(){return l},NY:function(){return u},Dm:function(){return h},Z6:function(){return d},jA:function(){return c},ZW:function(){return f},M1:function(){return E},ap:function(){return m},Fe:function(){return g},BY:function(){return I},Vc:function(){return K},U6:function(){return b},KS:function(){return P},Hn:function(){return w},OG:function(){return L},k5:function(){return v},ZP:function(){return y},oc:function(){return U},pP:function(){return S},Kg:function(){return R},c4:function(){return A},m0:function(){return T},OP:function(){return B},b8:function(){return M},m8:function(){return O},hS:function(){return N},eO:function(){return D},K9:function(){return q},t0:function(){return $},uA:function(){return _},zI:function(){return C},w5:function(){return V},b3:function(){return k},YZ:function(){return W},PX:function(){return H},TZ:function(){return Y},r_:function(){return Z},DH:function(){return z},v6:function(){return F},M4:function(){return G},Uh:function(){return Q},hu:function(){return x},HY:function(){return j},c8:function(){return X},Ic:function(){return J},KQ:function(){return tt},yk:function(){return et},eT:function(){return rt},vh:function(){return nt},Db:function(){return it},Vm:function(){return st},yw:function(){return ot},N$:function(){return pt},zK:function(){return at},gf:function(){return lt},yW:function(){return ut},Dc:function(){return ht},mM:function(){return dt},zQ:function(){return ct},bT:function(){return ft},bC:function(){return Et},oH:function(){return mt},HG:function(){return gt},U$:function(){return It},sW:function(){return Kt},HA:function(){return bt},W3:function(){return Pt},TM:function(){return wt},rm:function(){return Lt},tr:function(){return vt},AO:function(){return yt},O9:function(){return Ut},Rm:function(){return St},Xh:function(){return Rt},ej:function(){return At},M8:function(){return Tt},vC:function(){return Bt}});const n=r(92340).N.SUPPORT_URL,i=n+"/feature/availability",s=n+"/router/onboarded",o=n+"/parentcontrol/add",p=n+"/parentcontrol/remove",a=n+"/parentcontrol/station/listAll",l=n+"/parentcontrol/station/list",u=n+"/parentcontrol/edit",h=n+"/parentcontrol/avatar/upload",d=n+"/parentcontrol/summary",c=n+"/parentcontrol/profile/summary",f=n+"/parentcontrol/profile/block",E=n+"/parentcontrol/profile/block/all",m=n+"/parentcontrol/station/add",g=n+"/parentcontrol/station/remove",I=n+"/parentcontrol/web/add",K=n+"/parentcontrol/web/set",b=n+"/parentcontrol/web/list",P=n+"/parentcontrol/web/remove",w=n+"/parentcontrol/usage",L=n+"/parentcontrol/bedtime/multiple",v=n+"/parentcontrol/bedtime/multiple/set",y=n+"/parentcontrol/bedtime/multiple/setall",U=n+"/parentcontrol/bedtime/multiple/set/all",S=n+"/parentcontrol/bedtime/multiple/day/set/all",R=n+"/parentcontrol/bedtime/multiple/remove",A=n+"/parentcontrol/app/list",T=n+"/parentcontrol/app/set",B=n+"/parentcontrol/app/all/set",M=n+"/parentcontrol/category/group/set",O=n+"/parentcontrol/category/list",N=n+"/parentcontrol/category/set",D=n+"/parentcontrol/app/search",q=n+"/parentcontrol/app",$=n+"/parentcontrol/app/remove",_=n+"/parentcontrol/safesearch",C=n+"/parentcontrol/safesearch/set",V=n+"/parentcontrol/youtuberestriction",k=n+"/parentcontrol/youtuberestriction/set",W=n+"/device/app/status",H=n+"/device/app/install",Y=n+"/device/app/uninstall",Z=n+"/app/enablement/enable",z=n+"/app/enablement/disable",F=n+"/notification/iq",G=n+"/parentcontrol/bedtime/multiple/day/remove",Q=n+"/parentcontrol/bedtime/multiple/all/remove",x=n+"/parentcontrol/dnsoverhttps",j=n+"/parentcontrol/dnsoverhttps/set",X=n+"/parentcontrol/icloudrelay",J=n+"/parentcontrol/icloudrelay/set",tt=n+"/global-restriction/category/list",et=n+"/global-restriction/app",rt=n+"/global-restriction/web/list",nt=n+"/global-restriction/category/set",it=n+"/global-restriction/app/set",st=n+"/global-restriction/app/search",ot=n+"/global-restriction/web/add",pt=n+"/global-restriction/web/remove",at=n+"/global-restriction/app/remove",lt=n+"/global-restriction/web/add",ut=n+"/global-restriction/web/set",ht=n+"/global-restriction/safesearch/set",dt=n+"/global-restriction/safesearch",ct=n+"/global-restriction/youtuberestriction/set",ft=n+"/global-restriction/youtuberestriction",Et=n+"/global-restriction/category/group/set",mt=n+"/global-restriction/dnsoverhttps",gt=n+"/global-restriction/dnsoverhttps/set",It=n+"/global-restriction/icloudrelay",Kt=n+"/global-restriction/icloudrelay/set",bt=n+"/system/parentcontrol/categories",Pt=n+"/parentcontrol/roleprofile/list",wt=n+"/parentcontrol/roleprofile",Lt=n+"/parentcontrol/web/list",vt=n+"/parentcontrol/web/add",yt=n+"/parentcontrol/web/remove",Ut=n+"/parentcontrol/app",St=n+"/parentcontrol/app/search",Rt=n+"/parentcontrol/app/set",At=n+"/parentcontrol/app/remove",Tt=n+"/parentcontrol/roleprofile/update",Bt=n+"/smb/check"},48849:function(t,e,r){r.d(e,{o:function(){return d}});var n=r(91841),i=r(40205),s=r(5304),o=r(88002),p=r(88286),a=r(92340),l=r(52900),u=r(37716),h=r(3679);let d=(()=>{class t{constructor(t,e){this.http=t,this.formBuilder=e}getUserId(t){const e=(new n.LE).set("sn",t);return this.http.get(l.n5,{params:e}).pipe((0,s.K)(this.handleError))}getFeatureList(t){const e=(new n.LE).set("userId",t);return this.http.get(l.zs,{params:e}).pipe((0,s.K)(this.handleError))}getqoslist_V2(t){const e=(new n.LE).set("userId",t);return this.http.get(`${a.N.SUPPORT_URL}/qos/summary`,{params:e}).pipe((0,s.K)(this.handleError))}getprofileAdd_V1(t,e){return this.http.post(`${a.N.SUPPORT_URL}/qos/profile/add`,e).pipe((0,s.K)(this.handleError))}ActivateV1(t){return(new n.LE).set("userId",t),this.http.post(`${a.N.SUPPORT_URL}/qos/activate`,{userId:t}).pipe((0,s.K)(this.handleError))}DeactivateV1(t){const e=(new n.LE).set("userId",t);return this.http.delete(`${a.N.SUPPORT_URL}/qos/deactivate`,{params:e}).pipe((0,s.K)(this.handleError))}editqosDeviceV1(t){const e=(new n.LE).set("userId",t);return this.http.get(`${a.N.SUPPORT_URL}/qos/device/edit`,{params:e}).pipe((0,s.K)(this.handleError))}getQosV1(t){const e=(new n.LE).set("userId",t);return this.http.get(`${a.N.SUPPORT_URL}/qos`,{params:e}).pipe((0,s.K)(this.handleError))}editqosProfileListV1(t){const e=(new n.LE).set("userId",t);return this.http.get(`${a.N.SUPPORT_URL}/qos/profile/list`,{params:e}).pipe((0,s.K)(this.handleError))}updateProfileV1(t){const e=(new n.LE).set("userId",t);return this.http.get(`${a.N.SUPPORT_URL}/qos/profile/list`,{params:e}).pipe((0,s.K)(this.handleError))}deviceUpdateV1(t){return this.http.put(`${a.N.SUPPORT_URL}/qos/device/update`,t).pipe((0,s.K)(this.handleError))}deleteDeviceV1(t,e){const r=(new n.LE).set("macAddr",e).set("userId",t);return this.http.delete(`${a.N.SUPPORT_URL}/qos/device/remove`,{params:r}).pipe((0,s.K)(this.handleError))}deleteProfileV1(t,e){const r=(new n.LE).set("id",e).set("userId",t);return this.http.delete(`${a.N.SUPPORT_URL}/qos/profile/remove`,{params:r}).pipe((0,s.K)(this.handleError))}getProfileV1(t,e){const r=(new n.LE).set("id",e).set("userId",t);return this.http.get(`${a.N.SUPPORT_URL}/qos/profile`,{params:r}).pipe((0,s.K)(this.handleError))}UpdateProfileV1(t,e){return this.http.put(`${a.N.SUPPORT_URL}/qos/profile/update`,e).pipe((0,s.K)(this.handleError))}updateDefaultProfileV1(t,e){return this.http.put(`${a.N.SUPPORT_URL}/qos/update`,e).pipe((0,s.K)(this.handleError))}addProfileNewDevice(t){return this.http.put(l.HV,t).pipe((0,s.K)(this.handleError))}deleteProfile(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.delete(l.he,{params:r}).pipe((0,s.K)(this.handleError))}stationListAll(t){const e=(new n.LE).set("userId",t);return this.http.get(l.qM,{params:e}).pipe((0,s.K)(this.handleError))}profileStationList(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.u1,{params:r}).pipe((0,s.K)(this.handleError))}editProfileName(t){return this.http.post(l.NY,t).pipe((0,s.K)(this.handleError))}uploadAvatar(t,e){let r=new FormData;return r.append("upfile",t),r.append("profileId",e),this.http.post(l.Dm,r).pipe((0,s.K)(this.handleError))}getAllUsersSummary(t){const e=(new n.LE).set("userId",t);return this.http.get(l.Z6,{params:e}).pipe((0,s.K)(this.handleError))}getUserProfileSummary(t,e,r){if(r){const i=(new n.LE).set("profileId",t).set("userId",e).set("type",r);return this.http.get(l.jA,{params:i}).pipe((0,s.K)(this.handleError))}{const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.jA,{params:r}).pipe((0,s.K)(this.handleError))}}updateProfileBlockStatus(t){return this.http.post(l.ZW,t).pipe((0,s.K)(this.handleError))}updateAllProfileBlockStatus(t){return this.http.post(l.M1,t).pipe((0,s.K)(this.handleError))}addDeviceProfile(t){return this.http.post(l.ap,t).pipe((0,s.K)(this.handleError))}removeDeviceProfile(t){return this.http.post(l.Fe,t).pipe((0,s.K)(this.handleError))}addWebAddressProfile(t){return this.http.put(l.BY,t).pipe((0,s.K)(this.handleError))}addWebAddressMain(t){return this.http.put(l.yw,t).pipe((0,s.K)(this.handleError))}setWebAddressMain(t){return this.http.post(l.gf,t).pipe((0,s.K)(this.handleError))}updateWebAddressProfile(t){return this.http.post(l.Vc,t).pipe((0,s.K)(this.handleError))}updateWebAddressMain(t){return this.http.post(l.yW,t).pipe((0,s.K)(this.handleError))}getProfileWebUrl(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.U6,{params:r}).pipe((0,s.K)(this.handleError))}getProfileWebUrlMain(t){const e=(new n.LE).set("userId",t);return this.http.get(l.eT,{params:e}).pipe((0,s.K)(this.handleError))}removeWebUrl(t,e,r){const i=(new n.LE).set("profileId",t).set("userId",r).set("id",e);return this.http.delete(l.KS,{params:i}).pipe((0,s.K)(this.handleError))}removeWebUrlMain(t,e){const r=(new n.LE).set("userId",e).set("id",t);return this.http.delete(l.N$,{params:r}).pipe((0,s.K)(this.handleError))}getProfileUsage(t,e,r){if(r){const i=(new n.LE).set("type",r).set("profileId",e).set("userId",t);return this.http.get(l.Hn,{params:i}).pipe((0,s.K)(this.handleError))}{const r=(new n.LE).set("type",p.I.DAY).set("profileId",e).set("userId",t);return this.http.get(l.Hn,{params:r}).pipe((0,s.K)(this.handleError))}}getBedTimeByProfileId(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.OG,{params:r}).pipe((0,s.K)(this.handleError))}editBedTimeProfile(t){return this.http.post(l.k5,t).pipe((0,s.K)(this.handleError))}updateAllProfileBedTime(t){return this.http.post(l.ZP,t).pipe((0,s.K)(this.handleError))}setEnableBedtimeAllDay(t){return this.http.post(l.oc,t).pipe((0,s.K)(this.handleError))}updateBedTimeByDay(t){return this.http.post(l.pP,t).pipe((0,s.K)(this.handleError))}deleteBedTImeByProfileId(t,e,r,i){const o=(new n.LE).set("userId",t).set("profileId",e).set("id",String(r)).set("idx",String(i));return this.http.delete(l.Kg,{params:o}).pipe((0,s.K)(this.handleError))}getAllAppsByProfileId(t){const e=(new n.LE).set("profileId",t);return this.http.get(l.c4,{params:e}).pipe((0,s.K)(this.handleError))}editAppByProfileId(t){return this.http.post(l.m0,t).pipe((0,s.K)(this.handleError))}editAppMain(t){return this.http.post(l.Db,t).pipe((0,s.K)(this.handleError))}editAppCategory(t){return this.http.put(l.OP,t).pipe((0,s.K)(this.handleError))}getAllCategoryByProfileId(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.m8,{params:r}).pipe((0,s.K)(this.handleError))}editCategoyByProfileId(t){return this.http.post(l.hS,t).pipe((0,s.K)(this.handleError))}editCategoyMain(t){return this.http.post(l.vh,t).pipe((0,s.K)(this.handleError))}searchApp(t,e,r){const i=(new n.LE).set("profileId",t).set("keyword",e).set("userId",r);return this.http.get(l.eO,{params:i}).pipe((0,o.U)(t=>t.apps),(0,s.K)(this.handleError))}searchAppMain(t,e){const r=(new n.LE).set("keyword",t).set("userId",e);return this.http.get(l.Vm,{params:r}).pipe((0,o.U)(t=>t.apps),(0,s.K)(this.handleError))}getAppListByProfileId(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.K9,{params:r}).pipe((0,s.K)(this.handleError))}getAppListMain(t){const e=(new n.LE).set("userId",t);return this.http.get(l.yk,{params:e}).pipe((0,s.K)(this.handleError))}deleteAppByProfileAndAppId(t,e,r){const i=(new n.LE).set("profileId",t).set("aid",e).set("userId",r);return this.http.delete(l.t0,{params:i}).pipe((0,s.K)(this.handleError))}deleteAppByProfileAndAppIdMain(t,e){const r=(new n.LE).set("aid",t).set("userId",e);return this.http.delete(l.zK,{params:r}).pipe((0,s.K)(this.handleError))}getSafeSearchStatus(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.uA,{params:r}).pipe((0,s.K)(this.handleError))}getSafeSearchStatusMain(t){const e=(new n.LE).set("userId",t);return this.http.get(l.mM,{params:e}).pipe((0,s.K)(this.handleError))}updateSafeSearchStatus(t){return this.http.post(l.zI,t).pipe((0,s.K)(this.handleError))}updateSafeSearchStatusMain(t){return this.http.post(l.Dc,t).pipe((0,s.K)(this.handleError))}getYotubeRestrictionStatus(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.get(l.w5,{params:r}).pipe((0,s.K)(this.handleError))}getYotubeRestrictionStatusMain(t){const e=(new n.LE).set("userId",t);return this.http.get(l.bT,{params:e}).pipe((0,s.K)(this.handleError))}updateYotubeRestrictionStatus(t){return this.http.post(l.b3,t).pipe((0,s.K)(this.handleError))}updateYotubeRestrictionStatusMain(t){return this.http.post(l.zQ,t).pipe((0,s.K)(this.handleError))}getApplicationStatus(t,e){const r=(new n.LE).set("fsn",t).set("appName",e);return this.http.get(l.YZ,{params:r}).pipe((0,s.K)(this.handleError))}installApplication(t){return this.http.post(l.PX,t).pipe((0,s.K)(this.handleError))}unInstallApplication(t){return this.http.post(l.TZ,t).pipe((0,s.K)(this.handleError))}applicationEnable(t){return this.http.post(l.r_,t).pipe((0,s.K)(this.handleError))}applicationDisbale(t){return this.http.post(l.DH,t).pipe((0,s.K)(this.handleError))}updateContentFilter(t){return this.http.post(l.b8,t).pipe((0,s.K)(this.handleError))}updateContentFilterMain(t){return this.http.post(l.bC,t).pipe((0,s.K)(this.handleError))}getNotification(t,e,r){const i=(new n.LE).set("userId",t).set("iqType",e).set("type",r);return this.http.get(l.v6,{params:i}).pipe((0,s.K)(this.handleError))}deleteProfileBedTimeByDayId(t,e,r){const i=(new n.LE).set("profileId",t).set("id",e).set("userId",r);return this.http.delete(l.M4,{params:i}).pipe((0,s.K)(this.handleError))}deleteALLBedTimeProfile(t,e){const r=(new n.LE).set("profileId",t).set("userId",e);return this.http.delete(l.Uh,{params:r}).pipe((0,s.K)(this.handleError))}EIQResetPriorites(t){return this.http.post(`${a.N.SUPPORT_URL}/extended/qos/clear`,{macAddr:t}).pipe((0,s.K)(this.handleError))}EIQDeletePriorites(t){return(new n.LE).set("userId",t),this.http.delete(`${a.N.SUPPORT_URL}/extended/qos/damp/alert/remove?userId=${t}`).pipe((0,s.K)(this.handleError))}handleError(t){return(0,i._)(t)}getAllCategory(t){const e=(new n.LE).set("userId",t);return this.http.get(l.KQ,{params:e}).pipe((0,s.K)(this.handleError))}getDns(t,e){const r=(new n.LE).set("userId",t).set("profileId",e);return this.http.get(l.hu,{params:r}).pipe((0,s.K)(this.handleError))}setDns(t){return this.http.post(l.HY,t).pipe((0,s.K)(this.handleError))}getDnsMain(t){const e=(new n.LE).set("userId",t);return this.http.get(l.oH,{params:e}).pipe((0,s.K)(this.handleError))}setDnsMain(t){return this.http.post(l.HG,t).pipe((0,s.K)(this.handleError))}getICloud(t,e){const r=(new n.LE).set("userId",t).set("profileId",e);return this.http.get(l.c8,{params:r}).pipe((0,s.K)(this.handleError))}setICloud(t){return this.http.post(l.Ic,t).pipe((0,s.K)(this.handleError))}getICloudMain(t){const e=(new n.LE).set("userId",t);return this.http.get(l.U$,{params:e}).pipe((0,s.K)(this.handleError))}setICloudMain(t){return this.http.post(l.sW,t).pipe((0,s.K)(this.handleError))}getParentControlCategories(){return this.http.get(l.HA).pipe((0,s.K)(this.handleError))}getExperienceIqFormGroup(){return this.formBuilder.group({categoryGroup:[null],categoryList:this.formBuilder.array([]),youtube:this.formBuilder.group({enable:!1}),safesearch:this.formBuilder.group({enable:!1}),dnsoverhttps:this.formBuilder.group({enable:!1}),icloudrelay:this.formBuilder.group({enable:!1}),app:[null],website:[null],webList:this.formBuilder.array([])})}getStaffProfiles(t){return this.http.get(`${a.N.SUPPORT_URL}/smbiq/staffprofile/all?userId=${t}&includeDevices=true`).pipe((0,s.K)(this.handleError))}deleteStaffProfile(t,e){return this.http.delete(`${a.N.SUPPORT_URL}/smbiq/staffprofile?userId=${t}&staffProfileId=${e}`).pipe((0,s.K)(this.handleError))}}return t.\u0275fac=function(e){return new(e||t)(u.LFG(n.eN),u.LFG(h.qu))},t.\u0275prov=u.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);