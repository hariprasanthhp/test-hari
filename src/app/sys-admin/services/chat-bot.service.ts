import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export  class ChatBotService {
    
    constructor(
      private httpClient: HttpClient,
    ) {
  
  
    }


    createChatBot(params){
           let url = `${environment.API_BASE_URL}chatbot/config`
        return this.httpClient.post(url,params)       
     }
     deleteChatbotRequest(params: any){
        let url = `${environment.API_BASE_URL}chatbot/config`          
        return this.httpClient.put(url,params);
      }

      verifyChatBotConfig(orgId): any {
        let url = `${environment.API_BASE_URL}chatbot/config?orgId=${orgId}`;
        return this.httpClient.get(url);
      }

      downloadChatConfig(orgId,restype):any{
        let url = `${environment.API_BASE_URL}/chatbot/config/download?orgId=${orgId}`
        return this.httpClient.get(url,restype);

      }
      
      fetchChatbotFlag(): any {
        return this.httpClient.get(`${environment.API_BASE_URL}entitled/chatbot`);
      }

}
