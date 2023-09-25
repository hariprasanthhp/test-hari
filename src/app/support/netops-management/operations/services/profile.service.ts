import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "src/environments/environment";
import { SsoAuthService } from 'src/app/shared/services/sso-auth.service';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(
    private http: HttpClient, private sso: SsoAuthService,
    private formBuilder: FormBuilder
  ) { }


  addProfile(orgId, request) {
    const ID = this.sso.getOrg(orgId);
    return this.http.post(`${environment.SUPPORT_URL}/netops-config/configuration-profile?${ID}`, request);
  }

  getProfileCount() {
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-category/count`);
  }

  getProfileList(orgId) {
    const ID = this.sso.getOrg(orgId);
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-profile${ID}`);
  }

  getProfileDataById(editId) {
    return this.http.get(`${environment.SUPPORT_URL}/netops-config/configuration-profile/${editId}`);
  }

  deleteProfileById(deleteId) {
    return this.http.delete(`${environment.SUPPORT_URL}/netops-config/configuration-profile/${deleteId}`);
  }

  updateProfile(updateId, orgId, request) {
    const ID = this.sso.getOrg(orgId);
    return this.http.put(`${environment.SUPPORT_URL}/netops-config/configuration-profile/${updateId}?${ID}`, request);
  }

  getAclForRemoteAccessForm() {
    return this.formBuilder.group({
      RemoteAcl: [false],
      list4: this.formBuilder.array([]),
      list6: this.formBuilder.array([])
    });
  }

  getAclForVoipForm() {
    return this.formBuilder.group({
      SipAcl: [false],
      list4: this.formBuilder.array([]),
      list6: this.formBuilder.array([])
    });
  }
}
