import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';

@Injectable({
  providedIn: 'root'
})
export class NetopsServiceService {

  constructor(
    private http: HttpClient,
    private Sso: SsoAuthService
  ) { }

  AddWorkflowData(data) {
    const ID = this.Sso.getOrg(this.Sso.getOrgId())
    return this.http.post(environment.SUPPORT_URL + `/netops-wf/workflow?${ID}`, data);
  }
  editWorkflowData(data) {
    const ID = this.Sso.getOrg(this.Sso.getOrgId())
    return this.http.put(environment.SUPPORT_URL + '/netops-wf/workflow/' + data._id + '?', data);
  }
  GetWorkflowGrid(orgId, excludOnBoot?) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow?${ID}${excludOnBoot ? excludOnBoot : ''}`);
  }
  DownloadWholeWkflwData(orgId, workflowId, timezone) {
    const params = new HttpParams()
      // .set('orgId', orgId)
      .set('workflowId', workflowId)
      .set('timezone', timezone)
    if (this.Sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(`${environment.SUPPORT_URL}/workflow/downloadLogByGFS`, { params, responseType: 'text' });
  }

  DownloadpartWkflwData(orgId, workflowId, execId, timezone, state) {
    const params = new HttpParams()
      // .set('orgId', orgId)
      .set('workflowId', workflowId)
      .set('execId', execId)
      .set('timezone', timezone)
      .set('state', state)
    if (this.Sso.getOrg(orgId)) {
      params.set("orgId", orgId)
    }
    return this.http.get(`${environment.SUPPORT_URL}/workflow/downloadLogByGFS`, { params, responseType: 'text' });
  }
  /* GetWorkflowGridWithPagination(orgId, skip, limit) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow?${ID}skip=${skip}&limit=${limit}`);
  }
  GetWorkFlowCount(orgId) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow/count?${ID}`);
  } */

  GetWorkflowFoundation(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow?${ID}source=Foundation`);
  }

  GetWorkflowById(workflowId) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow/${workflowId}`);
  }

  DeleteWrkflw(workflowId) {
    return this.http.delete(`${environment.SUPPORT_URL}/netops-wf/workflow/${workflowId}`);
  }
  suspendWrkflw(workflowId) {
    return this.http.put(`${environment.SUPPORT_URL}/netops-wf/workflow/${workflowId}/suspend`, '');
  }
  resumeWrkflw(workflowId) {
    return this.http.put(`${environment.SUPPORT_URL}/netops-wf/workflow/${workflowId}/resume`, '');
  }
  GetDeviceGroup(orgId, skip, limit) {
    return this.http.get(environment.SUPPORT_URL + '/netops-device/group?' + 'skip=' + skip + '&limit=' + limit);
  }
  getDeviceGrpById(deviceId) {
    return this.http.get(environment.SUPPORT_URL + '/netops-device/group/' + deviceId);


  }
  getConfigFile(orgId, type) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + `/netops-file/file?${ID}` + 'type=' + type);

  }
  getConfigProfile(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + `/netops-config/configuration-profile?${ID}` + 'brief=' + true);
  }
  getStaticDevice(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + `/netops-device/group?${ID}` + 'skip=' + 0 + '&limit=' + 0);

  }

  getWorkflowById(id) {
    return this.http.get(environment.SUPPORT_URL + '/netops-wf/workflow/' + id);
  }

  getExecLogs(orgId, workflowId, filter, execId = '') {
    const ID = this.Sso.getOrg(orgId);
    if (filter === "Succeeded" || filter === 'Failed' || filter === 'In Progress' || filter === 'Pending') {
      return this.http.get(environment.SUPPORT_URL + `/netops-wf/workflow-exec-logs?${ID}` + 'workflowId=' + workflowId + '&state=' + filter + '&execId=' + execId);
    } else {
      return this.http.get(environment.SUPPORT_URL + `/netops-wf/workflow-exec-logs?${ID}` + 'workflowId=' + workflowId + '&execId=' + execId);
    }
  }

  getReplaceService(orgId, category, profileId?: string, mode?: string, framingType?: string, voiceType?: string) {
    if (profileId && mode && framingType) {
      const params = new HttpParams()
        // .set('orgId', orgId)
        .set('category', category)
        .set('profileId', profileId)
        .set('mode', mode)
        .set('framingtype', framingType)
      if (this.Sso.getOrg(orgId)) {
        params.set("orgId", orgId)
      }
      return this.http.get(environment.SUPPORT_URL + '/netops-config/configuration-profile-managed-ont', { params });
    } else if (profileId && voiceType) {
      const params = new HttpParams()
        // .set('orgId', orgId)
        .set('category', category)
        .set('profileId', profileId)
        .set('voicetype', voiceType)
      if (this.Sso.getOrg(orgId)) {
        params.set("orgId", orgId)
      }
      return this.http.get(environment.SUPPORT_URL + '/netops-config/configuration-profile-managed-ont', { params });
    } else if (profileId && mode) {
      const params = new HttpParams()
        // .set('orgId', orgId)
        .set('category', category)
        .set('mode', mode)
        .set('profileId', profileId)
      if (this.Sso.getOrg(orgId)) {
        params.set("orgId", orgId)
      }
      return this.http.get(environment.SUPPORT_URL + '/netops-config/configuration-profile-managed-ont', { params });
    } else if (profileId) {
      const params = new HttpParams()
        // .set('orgId', orgId)
        .set('category', category)
        .set('profileId', profileId)
      if (this.Sso.getOrg(orgId)) {
        params.set("orgId", orgId)
      }
      return this.http.get(environment.SUPPORT_URL + '/netops-config/configuration-profile-managed-ont', { params });
    } else {
      const params = new HttpParams()
        // .set('orgId', orgId)
        .set('category', category)
      if (this.Sso.getOrg(orgId)) {
        params.set("orgId", orgId)
      }
      return this.http.get(environment.SUPPORT_URL + '/netops-config/configuration-profile-managed-ont', { params });
    }
  }

  getWorkflowByHist(orgId, workflowId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.SUPPORT_URL + `/netops-wf/workflow/history?${ID}` + 'workflowId=' + workflowId);

  }
  GetWorkflowHisyPagination(orgId, workflowId, skip, limit) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow/history?${ID}workflowId=${workflowId}&limit=${limit}&skip=${skip}`);
  }
  GetWorkFlowCountHist(orgId, workflowId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-wf/workflow/history/count?${ID}workflowId=${workflowId}`);
  }

  getWorkFlowExcLogsCount(orgId, workflowId, execId, state?: string) {
    const ID = this.Sso.getOrg(orgId);
    if (state) {
      return this.http.get(environment.SUPPORT_URL + `/netops-wf/workflow-exec-logs/count?${ID}` + 'workflowId=' + workflowId + '&execId=' + execId + '&state=' + state)
    } else {
      return this.http.get(environment.SUPPORT_URL + `/netops-wf/workflow-exec-logs/count?${ID}` + 'workflowId=' + workflowId + '&execId=' + execId)
    }
  }
  getIqSuites(orgId) {
    const ID = this.Sso.getOrg(orgId);
    return this.http.get(environment.FOUNDATION_BASE_URL + `/subscriber-systems/org-config/iq-suites?${ID}`)
  }

  updateIQSuitesConfigs(orgId, request) {
    const ID = this.Sso.getOrg(orgId);
    let url = `${environment.FOUNDATION_BASE_URL}subscriber-systems/org-config/iq-suites?${ID}`;
    return this.http.put(url, request);
  }
}
