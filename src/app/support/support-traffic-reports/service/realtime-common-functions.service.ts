import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class RealTimeCommonFunctionService {

    constructor(
        private router: Router
    ) { }

    getArrayIndex(arrayName, value) {
        //let mappedArray = arrayName.map(el => el.name);
        let indexOfArray = arrayName.indexOf(value);
        return indexOfArray;
    }

    removeorAddArray(array, item, dom) {
        let position = array.indexOf(item);
        if (position == -1) {
            array.push(item);
            dom.target.style.backgroundColor = '#f0d20e';
        } else {
            array.splice(position, 1);
            dom.target.style.backgroundColor = 'white'
        }
        return array;
    };
    nagigationByUrl(category, id, module) {
        if (module == 'Locations') {
            this.router.navigateByUrl(`/fa/location/realtime?name=${category}&id=${id}`);
        } else if (module == 'Apps') {
            this.router.navigateByUrl(`/fa/application/apprealtime?name=${category}&id=${id}`);
        } else if (module == 'Endpoints') {
            this.router.navigateByUrl(`/fa/flowendpoint/realtime?name=${category}&id=${id}`);
        }
    }

}
