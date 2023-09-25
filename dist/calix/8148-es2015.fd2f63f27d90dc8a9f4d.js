"use strict";(self.webpackChunkcalix=self.webpackChunkcalix||[]).push([[8148],{13631:function(e,t,r){r.r(t),r.d(t,{FoundationProfilesModule:function(){return u}});var s=r(38583),i=r(39895),o=r(86916),n=r(57434),c=r(27719),d=r(81940),h=r(37716);const p=[{path:"profiles",component:c.N},{path:"profiles/profile-wizard",component:d.s,data:{title:"Calix Cloud - Flow Configuration"}},{path:"ONT-profile",component:o.n},{path:"ONT-profile/add",component:n.D},{path:"ONT-profile/edit",component:n.D},{path:"",redirectTo:"ONT-profile",pathMatch:"full"}];let u=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[s.ez,i.Bz.forChild(p)]]}),e})()},613:function(e,t,r){r.d(t,{g:function(){return d}});var s=r(40205),i=r(5304),o=r(92340),n=r(37716),c=r(91841);let d=(()=>{class e{constructor(e){this.http=e}createAdmin(e){return this.http.post(`${o.N.COC_SERVICES_ACTIVATION_URL}/orgAdminData`,e).pipe((0,i.K)(this.handleError))}updateAdminData(e){return this.http.put(`${o.N.COC_SERVICES_ACTIVATION_URL}/orgAdminData`,e).pipe((0,i.K)(this.handleError))}fetchAmdins(e){return"All"==e||""==e||"undefined"==e?this.http.get(`${o.N.COC_SERVICES_ACTIVATION_URL}/orgAdminData`).pipe((0,i.K)(this.handleError)):this.http.get(`${o.N.COC_SERVICES_ACTIVATION_URL}/orgAdminData?serviceType=${e}`).pipe((0,i.K)(this.handleError))}deleteAdminData(e){return this.http.delete(`${o.N.COC_SERVICES_ACTIVATION_URL}/orgAdminData?serviceType=${e}`).pipe((0,i.K)(this.handleError))}handleError(e){return(0,s._)(e)}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(c.eN))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},99651:function(e,t,r){r.d(t,{i:function(){return h}});var s=r(92340),i=r(40205),o=r(5304),n=r(37716),c=r(91841),d=r(38048);let h=(()=>{class e{constructor(e,t){this.http=e,this.Sso=t,this.deviceModels={},this.selectedDeviceHis={}}addSubscriber(e,t){const r=this.Sso.getOrg(e);return this.http.post(`${s.N.SUPPORT_URL}/subscriber?${r}`,t)}editSubscriber(e,t,r){const i=this.Sso.getOrg(e);return this.http.put(`${s.N.SUPPORT_URL}/subscriber/${t}?${i}`,r)}deleteSubscriber(e,t){const r=this.Sso.getOrg(e);return this.http.delete(`${s.N.SUPPORT_URL}/subscriber/${t}?${r}`)}deleteDevice(e,t,r){const i=this.Sso.getOrg(e);return this.http.delete(`${s.N.SUPPORT_URL}/subscriber/${t}/devices/${r}?${i}`)}updateDevice(e,t,r){const i=this.Sso.getOrg(e);return this.http.put(`${s.N.SUPPORT_URL}/subscriber/${t}/devices?${i}deviceList=${r}`,"")}addDevice(e){return this.http.post(`${s.N.SUPPORT_URL}/subscriber-provisioning/provisioning-record`,e)}updateDeviceBySubscriber(e){return this.http.post(`${s.N.SUPPORT_URL}/subscriber-provisioning/provisioning-record`,e)}getDeviceInfo(e,t){const r=this.Sso.getOrg(e);return this.http.get(`${s.N.SUPPORT_URL}/subscriber-provisioning/provisioning-record?${r}deviceId=${t}`)}GetDiscoveredDevices_static(e,t){const r=this.Sso.getOrg(e);return this.http.get(`${s.N.SUPPORT_URL}/netops-device/static-group-member?${r}memberInfo=${t}`)}getDialPlanList(e){const t=this.Sso.getOrg(e);return this.http.get(`${s.N.SUPPORT_URL}/netops-dp/dial-plan?${t}`)}deleteUnassociated(e,t){const r=this.Sso.getOrg(e);return this.http.delete(`${s.N.FOUNDATION_BASE_URL}subscriber-systems?${r}systemId=${t}`)}replaceDevice(e,t,r,i,o){const n=this.Sso.getOrg(e);let c="";for(var d in o)o[d]&&(""!=c&&(c+="&"),c+=d+"="+encodeURIComponent(o[d]));return this.http.put(c?`${s.N.SUPPORT_URL}/subscriber/${t}/devices/${r}?${c}`:`${s.N.SUPPORT_URL}/subscriber/${t}/devices/${r}?${n}newDeviceId=${i}`,{})}unassociateAndDelete(e,t,r,i,o){const n=this.Sso.getOrg(e);let c="",d="";for(var h in o)o[h]&&(""!=d&&(d+="&"),d+=h+"="+encodeURIComponent(o[h]));return c=d?`${s.N.SUPPORT_URL}/device/delete?${d}`:i?`${s.N.SUPPORT_URL}/device/delete?${n}deviceId=${i}&subscriberId=${r}`:`${s.N.SUPPORT_URL}/device/delete?${n}serialNumber=${t}&subscriberId=${r}`,this.http.delete(c)}getStaticGroupMembers(e){const t=this.Sso.getOrg(e);return this.http.get(`${s.N.SUPPORT_URL}/netops-device/static-group-member?${t}`)}unassoDeleteFounApi(e,t,r){const i=this.Sso.getOrg(e);return this.http.delete(`${s.N.FOUNDATION_BASE_URL}subscriber-systems?${i}systemId=${t}${r?"&deleteCiqUser=true":""}`)}setDiscoveredDeviceInfo(e){this.discoveredDeviceInfo=e||{}}getDiscoveredDeviceInfo(){return this.discoveredDeviceInfo||{}}getedgesuiteData(e,t,r){const i=this.Sso.getOrg(e);return this.http.get(`${s.N.FOUNDATION_BASE_URL}subscriber-systems?${i}systemId=${t}`)}setDeviceModels(e,t){this.deviceModels[e]=t||[]}getDeviceModels(e){return this.deviceModels[e]?this.deviceModels[e]:[]}callRestApi(e,t){return this.http.get(`${e}`).pipe((0,o.K)(this.handleError))}handleError(e){return(0,i._)(e)}getSubscriberServices(e){return this.http.get(`${s.N.FOUNDATION_SERVICES_URL}subscribers/${e}/services`)}setSelectedDeviceInfo(e){sessionStorage.setItem("selectedSubHistInfo",JSON.stringify(e.state))}getSelectedDeviceInfo(){return sessionStorage.getItem("selectedSubHistInfo")}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(c.eN),n.LFG(d.t6))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);