import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Modeler, OriginalPropertiesProvider,
  PropertiesPanelModule, InjectionNames,
  OriginalPaletteProvider} from "./bpmn-js/bpmn-js";
import {CustomPropsProvider} from './props-provider/CustomPropsProvider';
import {CustomPaletteProvider} from "./props-provider/CustomPaletteProvider";
import { TranslateService } from 'src/app-services/translate.service';
const customModdle ='/assets/bpmn/customModdle.json'
@Component({
  selector: 'app-cco-network-workflows',
  templateUrl: './cco-network-workflows.component.html',
  styleUrls: ['./cco-network-workflows.component.scss'],

})
export class CcoNetworkWorkflowsComponent implements OnInit, OnDestroy {
  title = 'Angular/BPMN';
  modeler;
  language;
  languageSubject;

  constructor(private http: HttpClient, private translateService : TranslateService) {
  }


  ngOnInit(): void {
    
    this.language = this.translateService.defualtLanguage;
    this.languageSubject = this.translateService.selectedLanguage.subscribe((data : any)=>{
      this.language = data;
    })
    console.log("OriginalPropertiesProvider=>",OriginalPropertiesProvider)
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      propertiesPanel: {
        parent: '#properties'
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  load(): void {
    const url = '/assets/bpmn/initial.bpmn';
    this.http.get(url, {
      headers: {observe: 'response'}, responseType: 'text'
    }).subscribe(
      async (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        const result = await this.modeler.importXML(x);
	      const { warnings } = result;
      },
      this.handleError
    );
  }

  async save(): Promise<void> {
    const result = await this.modeler.saveXML();
	const { xml } = result;
  console.log('Result of saving XML: ', xml)
   // this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));
  }

  ngOnDestroy(): void {
    if(this.languageSubject){
      this.languageSubject.unsubscribe();
    }
  }
}
