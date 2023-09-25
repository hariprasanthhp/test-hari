import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { CommonService } from 'src/app/sys-admin/services/common.service';

@Component({
  selector: 'app-flow-configuration',
  templateUrl: './flow-configuration.component.html',
  styleUrls: ['./flow-configuration.component.scss']
})
export class FlowConfigurationComponent implements OnInit {

  constructor(
    private commonOrgService: CommonService,
    private router: Router,
    private customTranslateService: CustomTranslateService,
  ) {
    this.commonOrgService.currentPageAdder('flowAnalyze');
  }

  ngOnInit(): void {
  }

}
