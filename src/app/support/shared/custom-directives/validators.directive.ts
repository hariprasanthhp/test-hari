import { FormGroup } from '@angular/forms';
import { convertIpAddressToNumber } from '../service/utility.class';

// custom validator to check that two fields match
export function ValidatorsDirective(controlName: string, matchingControlName: string, validateCondition?: string) {
    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // return null if controls haven't initialised yet
        if (!control || !matchingControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }
        //for port forwarding
        if (validateCondition && (!control.value || !matchingControl.value)) {
            return null;
        }
        // set error on matchingControl if validation fails
        if (control.value > matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
// custom validator to check that Beginning IP Address should be less than Ending IP Address
export function validateIpIsBefore(ipBeforeName: string, ipAfterName: string) {
    return (formGroup: FormGroup) => {

        const beforeControl = formGroup.controls[ipBeforeName];
        const afterControl = formGroup.controls[ipAfterName];
        // return null if controls haven't initialised yet
        if (!beforeControl || !afterControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (afterControl.errors && !afterControl.errors.ipBeforeValidate ||
            beforeControl.errors && !beforeControl.errors.ipBeforeValidate) {
            return null;
        }
        var ipBeforeval= null;
        var ipAfterval= null;
        if (beforeControl.value && afterControl.value) {

            ipBeforeval = convertIpAddressToNumber(beforeControl.value);
            ipAfterval = convertIpAddressToNumber(afterControl.value);
        }
        // set error on matchingControl if validation fails
        if (ipBeforeval <= ipAfterval) {
            beforeControl.setErrors(null);
            afterControl.setErrors(null);
        } else {
            beforeControl.setErrors({ ipBeforeValidate: true });
            afterControl.setErrors({ ipBeforeValidate: true });
        }

    }

}
// custom validator to check that  Device IP Address should not be the same as Subnet ID or Broadcast Address
export function validateIpNetwork(ipName: string, maskName: string) {
    return (formGroup: FormGroup) => {

        const ipControl = formGroup.controls[ipName];
        const maskControl = formGroup.controls[maskName];
        // return null if controls haven't initialised yet
        if (!ipControl || !maskControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (ipControl.errors && !ipControl.errors.IpNetworkBroadcast
            || maskControl.errors && !maskControl.errors.IpNetworkBroadcast) {
            return null;
        }

        var ipval= null;
        var maskval= null;

        var networkNum= null;
        var broadcastNum= null;

        if (ipControl.value && maskControl.value) {
            ipval = convertIpAddressToNumber(ipControl.value);
            maskval = convertIpAddressToNumber(maskControl.value);

            networkNum = ((ipval >>> 0) & (maskval >>> 0)) >>> 0;
            broadcastNum = (networkNum | ~maskval) >>> 0;
        }

        // set error on matchingControl if validation fails
        if (ipval <= networkNum || ipval >= broadcastNum) {
            ipControl.setErrors({ IpNetworkBroadcast: true });
            maskControl.setErrors({ IpNetworkBroadcast: true })
        } else {
            ipControl.setErrors(null);
            maskControl.setErrors(null);
        }
    }
}
// custom validator to check that Device IP Address should be outside 
// the range of Beginning IP Address and Ending IP Address
export function validateIpIsOutside(ipName: string, ipBeforeName: string, ipAfterName: string) {
    return (formGroup: FormGroup) => {

        const beforeControl = formGroup.controls[ipBeforeName];
        const afterControl = formGroup.controls[ipAfterName];
        const IpControl = formGroup.controls[ipName];
        // return null if controls haven't initialised yet
        if (!beforeControl || !afterControl || !IpControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (IpControl.errors && !IpControl.errors.ipIsOutside
            || afterControl.errors && !afterControl.errors.ipIsOutside
            || beforeControl.errors && !beforeControl.errors.ipIsOutside) {
            return null;
        }

        var startVal = null;
        var endVal = null;
        var ipVal = null;
        if (beforeControl.value && afterControl.value && IpControl.value) {
             startVal = convertIpAddressToNumber(beforeControl.value);
             endVal = convertIpAddressToNumber(afterControl.value);
             ipVal = convertIpAddressToNumber(IpControl.value);
        }

        // set error on matchingControl if validation fails
        if ((ipVal < startVal) || (ipVal > endVal)) {
            beforeControl.setErrors(null);
            afterControl.setErrors(null);
            IpControl.setErrors(null);
        } else {
            beforeControl.setErrors({ ipIsOutside: true });
            afterControl.setErrors({ ipIsOutside: true });
            IpControl.setErrors({ ipIsOutside: true });
        }
    }
}
// custom validator to check that Device IP Address, Beginning IP Address, 
// and Ending IP Address are not in the same network
export function validateIpIsSameNetwork(IpName: string, startName: string, endName: string, maskName: string) {
    return (formGroup: FormGroup) => {
        const startControl = formGroup.controls[startName];
        const endControl = formGroup.controls[endName];
        const ipControl = formGroup.controls[IpName];
        const maskControl = formGroup.controls[maskName];

        // return null if controls haven't initialised yet
        if (!startControl || !endControl || !ipControl || !maskControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (ipControl.errors && !ipControl.errors.sameIpNetwork
            || startControl.errors && !startControl.errors.sameIpNetwork
            || endControl.errors && !endControl.errors.sameIpNetwork
            || maskControl.errors && !maskControl.errors.sameIpNetwork) {
            return null;
        }

        //fetching the values
        var startval =null;
        var endval =null;
        var ipVal =null;
        var maskVal =null;
        var networkNum =null;
        if (startControl.value && endControl.value && ipControl.value && maskControl.value) {
            startval = convertIpAddressToNumber(startControl.value);
            endval = convertIpAddressToNumber(endControl.value);
            ipVal = convertIpAddressToNumber(ipControl.value);
            maskVal = convertIpAddressToNumber(maskControl.value);
            networkNum = maskVal & ipVal;
        }
        if (networkNum != (maskVal & startval) || networkNum != (maskVal & endval)) {
            ipControl.setErrors({ sameIpNetwork: true });
            endControl.setErrors({ sameIpNetwork: true });
            startControl.setErrors({ sameIpNetwork: true });
            maskControl.setErrors({ sameIpNetwork: true });
        } else {
            ipControl.setErrors(null);
            endControl.setErrors(null);
            startControl.setErrors(null);
            maskControl.setErrors(null);
        }
    }
}

// custom validator to check thatEnding IP Address should not be the same as Subnet ID or Broadcast Address
export function validateIpIsMaxNetwork(ipName, endName, maskName) {
    return (formGroup: FormGroup) => {

        const ipControl = formGroup.controls[ipName];
        const maskControl = formGroup.controls[maskName];
        const endControl = formGroup.controls[endName];
        // return null if controls haven't initialised yet
        if (!ipControl || !maskControl || !endControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (ipControl.errors && !ipControl.errors.maxNetworkBroadcast
            || maskControl.errors && !maskControl.errors.maxNetworkBroadcast
            || endControl.errors && !endControl.errors.maxNetworkBroadcast) {
            return null;
        }
       
        var ipval =null;
        var maskval=null;
        var endVal=null;

        var networkNum=null;
        var broadcastNum=null;

        if (ipControl.value, maskControl.value, endControl.value) {
            ipval = convertIpAddressToNumber(ipControl.value);
            maskval = convertIpAddressToNumber(maskControl.value);
            endVal = convertIpAddressToNumber(endControl.value);

            networkNum = ((ipval >>> 0) & (maskval >>> 0)) >>> 0;
            broadcastNum = (networkNum | ~maskval) >>> 0;
        }

        if (endVal <= networkNum || endVal >= broadcastNum) {
            ipControl.setErrors({ maxNetworkBroadcast: true });
            maskControl.setErrors({ maxNetworkBroadcast: true });
            endControl.setErrors({ maxNetworkBroadcast: true });
        } else {
            ipControl.setErrors(null);
            maskControl.setErrors(null);
            endControl.setErrors(null);
        }

    }
}
// custom validator to check that Beginning IP Address should not be the same as Subnet ID or Broadcast Address
export function validateIpIsMinNetwork(IpName: string, startName: string, maskName: string) {
    return (formGroup: FormGroup) => {

        const ipControl = formGroup.controls[IpName];
        const maskControl = formGroup.controls[startName];
        const startControl = formGroup.controls[maskName];

        // return null if controls haven't initialised yet
        if (!ipControl || !maskControl || !startControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (ipControl.errors && !ipControl.errors.minNetworkBroadcast
            || maskControl.errors && !maskControl.errors.minNetworkBroadcast
            || startControl.errors && !startControl.errors.minNetworkBroadcast) {
            return null;
        }

        var ipval =null;
        var maskval =null;
        var startVal =null;
        var networkNum =null;
        var broadcastNum =null;

        if (ipControl.value && maskControl.value && startControl.value) {

            ipval = convertIpAddressToNumber(ipControl.value);
            maskval = convertIpAddressToNumber(maskControl.value);
            startVal = convertIpAddressToNumber(startControl.value);
            networkNum = ((ipval >>> 0) & (maskval >>> 0)) >>> 0;
            broadcastNum = (networkNum | ~maskval) >>> 0;
        }

        if (startVal <= networkNum || startVal >= broadcastNum) {
            ipControl.setErrors({ minNetworkBroadcast: true });
            maskControl.setErrors({ minNetworkBroadcast: true });
            startControl.setErrors({ minNetworkBroadcast: true });
        } else {
            ipControl.setErrors(null);
            maskControl.setErrors(null);
            startControl.setErrors(null);
        }

    }
}
// custom validator to check that Beginning IP Address should not be the same as Subnet ID or Broadcast Address
export function validateDigitCheck(smallDigitName: string, longDigitName: string) {
    return (formGroup: FormGroup) => {

        const smallDigitControl = formGroup.controls[smallDigitName];
        const logDigitControl = formGroup.controls[longDigitName];
        // return null if controls haven't initialised yet
        if (!smallDigitControl || !logDigitControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (logDigitControl.errors && !logDigitControl.errors.longDigitTimer) {
            return null;
        }
        
        if (smallDigitControl.value && logDigitControl.value) {
            if(smallDigitControl.value > logDigitControl.value || smallDigitControl.value == logDigitControl.value ){
                logDigitControl.setErrors({ longDigitTimer: true });
            }else{
                logDigitControl.setErrors(null);
            }
        
        }
    }
}