import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(
    ) { }
  

    enforceMinMax(event){
      let min = event?.target.min, max = event?.target.max, value = event?.target.value;
      if(value != ""){
        if(parseFloat(value) < parseFloat(min)){
          event.target.value = min;
        }
        if(parseFloat(value) > parseFloat(max)){
          event.target.value = max;
        }
        return event.target.value;
      }
       return -1;
    }
}
