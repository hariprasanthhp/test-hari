import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MarketingCommonService } from './marketing-common.service';

@Injectable({
  providedIn: 'root'
})
export class MarketingRoutingsService {

  constructor(
    private router: Router,
    private marketingCommonService: MarketingCommonService
  ) { }

  homePage() {
    this.router.navigateByUrl('/engagement/home')
  }
  searchResultsPage(value) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/search-result'], { state: { value: value || "" } }));
  }
  insightsPage(id, value) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/insights'], { state: { id: id, value: value || "" , isCSCResult: false} }));
      this.marketingCommonService.setCSCtrueOrFalse(false)
  }
  segmentsPage() {
    this.router.navigateByUrl('/engagement/segments')
  }
  campaignsPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/campaigns']));
  }
  campaignsMarkPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/engagement-channel']));
  }
  exploreDataPage(id, type,check) {
    if (type != 'Acquisition') {
      this.router.navigate(['/engagement/explore-data'], {
        state: {
          value: id || "", Type: "", Name:check
        }
      })
    } else {
      this.router.navigate(['/engagement/explore-data'], {
        state: {
          value: id , Type: "" , Name:true
        }
      })
    }
  }
  exploreDataPageAdvanced() {
    this.router.navigateByUrl('/engagement/explore-data')
  }
  channelsPage() {
    this.router.navigateByUrl('/engagement/channels')
  }
  newCampaignPage() {
    this.marketingCommonService.removeCampaignID();
    this.router.navigateByUrl('/engagement/new-campaign')
  }
  newCampaignPageEdit(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/campaign'], { state: { value: id || "" } }));
  }
  newCampaignPageResult(id) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/engagement/campaign'], { state: { value: id || "" } }));
  }



}
