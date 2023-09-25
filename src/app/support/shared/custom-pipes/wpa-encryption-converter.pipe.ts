import { Pipe, PipeTransform} from '@angular/core'
import { DomSanitizer} from '@angular/platform-browser'
import { MetaField } from '../models/ssid-meta-fields.model';
import { SupportRadioObjectModel } from '../models/support-radio-object.model';
import { constructEncryptionObject, ssidMetaPattern } from '../service/utility.class';

@Pipe({
    name: 'wpaEncryptionConverter'
})
export class WpaEncryptionConverterPipe implements PipeTransform {
  constructor(){}
  beconType:string = null;
  transform(value: SupportRadioObjectModel,featureProperties:any[],security:any[]): any {
    let displayValue:string;
    if (value === undefined) {
      return value;
    }
    // Replace with the specified character
   
    this.beconType = value.BeaconType;
   if(this.beconType){
    let ssidMetaData: MetaField[] = featureProperties.filter(x => x.featureName.match(ssidMetaPattern))
    var selectedFieldMeta = ssidMetaData.filter(x => x.featureName.match(/\d+/)[0] == String(value.featureNo))[0]
    let valueList = selectedFieldMeta.fields.filter(res=> res.name=="BeaconType").map(val=> val.valueList)[0]
   if(valueList){
    valueList.filter(val=>{
      if( this.beconType && val == this.beconType){
        featureProperties.forEach(res=>{
           if(res.featureName == "SecurityOptions"){
            if(res.configuration){
               if(res.configuration['WPA3-SAE'] && res.configuration['WPA3-SAE']["BeaconType"] == val || val == 'WPA3-SAE'){
                  displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
               }
              if(res.configuration['SecurityOff'] && res.configuration['SecurityOff']["BeaconType"] == val || val == 'SecurityOff'){
                 if(res.configuration['SecurityOff'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
               if(res.configuration['WPA2-PSK'] && res.configuration['WPA2-PSK']["BeaconType"] == val || val == 'WPA2-PSK'){
                  if(res.configuration['WPA2-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA-PSK'] && res.configuration['WPA-PSK']["BeaconType"] == val || val == 'WPA-PSK'){
                 if(res.configuration['WPA-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA/WPA2-PSK'] && res.configuration['WPA/WPA2-PSK']["BeaconType"] == val || val == 'WPA/WPA2-PSK'){
                 if(res.configuration['WPA/WPA2-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA2/WPA3-PSK'] && res.configuration['WPA2/WPA3-PSK']["BeaconType"] == val || val == 'WPA2/WPA3-PSK'){
                 if(res.configuration['WPA2/WPA3-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA3-PSK'] && res.configuration['WPA3-PSK']["BeaconType"] == val || val == 'WPA3-PSK'){
                 if(res.configuration['WPA3-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
            }
           }
        })
      }
   })
   if(!displayValue){
     valueList.filter(val=>{
      security.forEach(sec=>{
         if(sec.id == this.beconType){
           this.beconType = sec.name;
        } 
     })
      if( this.beconType && val == this.beconType){
        featureProperties.forEach(res=>{
           if(res.featureName == "SecurityOptions"){
            if(res.configuration){
               if(res.configuration['WPA3-SAE'] && res.configuration['WPA3-SAE']["BeaconType"] == val || val == 'WPA3-SAE'){
                  displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
               }
              if(res.configuration['SecurityOff'] && res.configuration['SecurityOff']["BeaconType"] == val || val == 'SecurityOff'){
                 if(res.configuration['SecurityOff'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
               if(res.configuration['WPA2-PSK'] && res.configuration['WPA2-PSK']["BeaconType"] == val || val == 'WPA2-PSK'){
                 if(res.configuration['WPA2-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA-PSK'] && res.configuration['WPA-PSK']["BeaconType"] == val || val == 'WPA-PSK'){
                 if(res.configuration['WPA-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA/WPA2-PSK'] && res.configuration['WPA/WPA2-PSK']["BeaconType"] == val || val == 'WPA/WPA2-PSK'){
                 if(res.configuration['WPA/WPA2-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA2/WPA3-PSK'] && res.configuration['WPA2/WPA3-PSK']["BeaconType"] == val || val == 'WPA2/WPA3-PSK'){
                 if(res.configuration['WPA2/WPA3-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
              if(res.configuration['WPA3-PSK'] && res.configuration['WPA3-PSK']["BeaconType"] == val || val == 'WPA3-PSK'){
                 if(res.configuration['WPA3-PSK'].IEEE11iEncryptionModes){
                    displayValue = constructEncryptionObject(value.IEEE11iEncryptionModes)['name'];
                 }else{
                    displayValue = constructEncryptionObject(value.WPAEncryptionModes)['name'];
                 }
              }
            }
           }
        })
      }
   })
   }
   }
    if(!displayValue){
      displayValue = 'N/A'
    }
    return displayValue;
   }
  }
}