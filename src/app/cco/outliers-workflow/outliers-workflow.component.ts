import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutlierWorkflowService } from './outlier-workflow.service';

@Component({
  selector: 'app-outliers-workflow',
  templateUrl: './outliers-workflow.component.html',
  styleUrls: ['./outliers-workflow.component.scss']
})
export class OutliersWorkflowComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private workflowService: OutlierWorkflowService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    this.workflowService.setType(this.route.snapshot.params?.type);
  }

}
