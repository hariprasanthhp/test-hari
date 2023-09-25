import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortForwardingApplicationService {

  constructor() { }

  getApplicationData(acceptEntry) {
    const appData = [{
      "PortMappingDescription": "Call of Duty",
      "PortRange": [{
        "ExternalPort": 28960,
        "ExternalPortEnd": 28960,
        "InternalPort": 28960,
        "InternalPortEnd": 28960,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "Call of Duty 2",
      "PortRange": [{
        "ExternalPort": 28960,
        "ExternalPortEnd": 28960,
        "InternalPort": 28960,
        "InternalPortEnd": 28960,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "Call of Duty 4",
      "PortRange": [{
        "ExternalPort": 28960,
        "ExternalPortEnd": 28960,
        "InternalPort": 28960,
        "InternalPortEnd": 28960,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "Xbox 360 Heist",
      "PortRange": [{
        "ExternalPort": 3074,
        "ExternalPortEnd": 3074,
        "InternalPort": 3074,
        "InternalPortEnd": 3074,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "Warcraft II",
      "PortRange": [{
        "ExternalPort": 6112,
        "ExternalPortEnd": 6119,
        "InternalPort": 6112,
        "InternalPortEnd": 6119,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "DirectX Multimedia Control",
      "PortRange": [{
        "ExternalPort": 2300,
        "ExternalPortEnd": 2400,
        "InternalPort": 2300,
        "InternalPortEnd": 2400,
        "PortMappingProtocol": "TCP or UDP"
      }, {
        "ExternalPort": 47624,
        "ExternalPortEnd": 47624,
        "InternalPort": 47624,
        "InternalPortEnd": 47624,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 6073,
        "ExternalPortEnd": 6073,
        "InternalPort": 6073,
        "InternalPortEnd": 6073,
        "PortMappingProtocol": "UDP"
      }]
    }, {
      "PortMappingDescription": "DirectTV STB 1 Multimedia Service",
      "PortRange": [{
        "ExternalPort": 27161,
        "ExternalPortEnd": 27163,
        "InternalPort": 27161,
        "InternalPortEnd": 27163,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "DirectTV STB 2 Multimedia Service",
      "PortRange": [{
        "ExternalPort": 27164,
        "ExternalPortEnd": 27166,
        "InternalPort": 27164,
        "InternalPortEnd": 27166,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "DirectTV STB 3 Multimedia Service",
      "PortRange": [{
        "ExternalPort": 27167,
        "ExternalPortEnd": 27169,
        "InternalPort": 27167,
        "InternalPortEnd": 27169,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "DNS Domain Name Service",
      "PortRange": [{
        "ExternalPort": 53,
        "ExternalPortEnd": 53,
        "InternalPort": 53,
        "InternalPortEnd": 53,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "FTP File Transfer",
      "PortRange": [{
        "ExternalPort": 20,
        "ExternalPortEnd": 21,
        "InternalPort": 20,
        "InternalPortEnd": 21,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "FTPS Secure File Transfer",
      "PortRange": [{
        "ExternalPort": 990,
        "ExternalPortEnd": 990,
        "InternalPort": 990,
        "InternalPortEnd": 990,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "H323 Video",
      "PortRange": [{
        "ExternalPort": 1720,
        "ExternalPortEnd": 1720,
        "InternalPort": 1720,
        "InternalPortEnd": 1720,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "HTTP Web Service",
      "PortRange": [{
        "ExternalPort": 80,
        "ExternalPortEnd": 80,
        "InternalPort": 80,
        "InternalPortEnd": 80,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "HTTPS Secure Web Service",
      "PortRange": [{
        "ExternalPort": 443,
        "ExternalPortEnd": 443,
        "InternalPort": 443,
        "InternalPortEnd": 443,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "IMAP Mail Service",
      "PortRange": [{
        "ExternalPort": 143,
        "ExternalPortEnd": 143,
        "InternalPort": 143,
        "InternalPortEnd": 143,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "IMAPS Mail Service",
      "PortRange": [{
        "ExternalPort": 993,
        "ExternalPortEnd": 993,
        "InternalPort": 993,
        "InternalPortEnd": 993,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "IPP Remote Printing",
      "PortRange": [{
        "ExternalPort": 631,
        "ExternalPortEnd": 631,
        "InternalPort": 631,
        "InternalPortEnd": 631,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "IPSEC VPN Service",
      "PortRange": [{
        "ExternalPort": 50,
        "ExternalPortEnd": 50,
        "InternalPort": 50,
        "InternalPortEnd": 50,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 51,
        "ExternalPortEnd": 500,
        "InternalPort": 51,
        "InternalPortEnd": 500,
        "PortMappingProtocol": "UDP"
      }]
    }, {
      "PortMappingDescription": "IRC Chat Service",
      "PortRange": [{
        "ExternalPort": 113,
        "ExternalPortEnd": 113,
        "InternalPort": 113,
        "InternalPortEnd": 113,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 194,
        "ExternalPortEnd": 194,
        "InternalPort": 194,
        "InternalPortEnd": 194,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 1024,
        "ExternalPortEnd": 1034,
        "InternalPort": 1024,
        "InternalPortEnd": 1034,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 6661,
        "ExternalPortEnd": 7000,
        "InternalPort": 6661,
        "InternalPortEnd": 7000,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "L2TP VPN Service",
      "PortRange": [{
        "ExternalPort": 1701,
        "ExternalPortEnd": 1701,
        "InternalPort": 1701,
        "InternalPortEnd": 1701,
        "PortMappingProtocol": "UDP"
      }]
    }, {
      "PortMappingDescription": "MSN Gaming Service",
      "PortRange": [{
        "ExternalPort": 28800,
        "ExternalPortEnd": 29100,
        "InternalPort": 28800,
        "InternalPortEnd": 29100,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "MySQL Database Management",
      "PortRange": [{
        "ExternalPort": 3306,
        "ExternalPortEnd": 3306,
        "InternalPort": 3306,
        "InternalPortEnd": 3306,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "NNTP Newsgroup",
      "PortRange": [{
        "ExternalPort": 119,
        "ExternalPortEnd": 119,
        "InternalPort": 119,
        "InternalPortEnd": 119,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "NTP Network Time",
      "PortRange": [{
        "ExternalPort": 123,
        "ExternalPortEnd": 123,
        "InternalPort": 123,
        "InternalPortEnd": 123,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "Oracle SQL Database Management",
      "PortRange": [{
        "ExternalPort": 66,
        "ExternalPortEnd": 66,
        "InternalPort": 66,
        "InternalPortEnd": 66,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 1525,
        "ExternalPortEnd": 1525,
        "InternalPort": 1525,
        "InternalPortEnd": 1525,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "PC Anywhere Remote Management",
      "PortRange": [{
        "ExternalPort": 66,
        "ExternalPortEnd": 66,
        "InternalPort": 66,
        "InternalPortEnd": 66,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 1525,
        "ExternalPortEnd": 1525,
        "InternalPort": 1525,
        "InternalPortEnd": 1525,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 5631,
        "ExternalPortEnd": 5631,
        "InternalPort": 5631,
        "InternalPortEnd": 5631,
        "PortMappingProtocol": "TCP or UDP"
      }, {
        "ExternalPort": 5532,
        "ExternalPortEnd": 5532,
        "InternalPort": 5532,
        "InternalPortEnd": 5532,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "PPTP VPN Service All GRE",
      "PortRange": [{
        "ExternalPort": 1723,
        "ExternalPortEnd": 1723,
        "InternalPort": 1723,
        "InternalPortEnd": 1723,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "POP3 Mail Service",
      "PortRange": [{
        "ExternalPort": 110,
        "ExternalPortEnd": 110,
        "InternalPort": 110,
        "InternalPortEnd": 110,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "POP3S Secure Mail Service",
      "PortRange": [{
        "ExternalPort": 995,
        "ExternalPortEnd": 995,
        "InternalPort": 995,
        "InternalPortEnd": 995,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "PS2/PS3 Game Console",
      "PortRange": [{
        "ExternalPort": 4658,
        "ExternalPortEnd": 4659,
        "InternalPort": 4658,
        "InternalPortEnd": 4659,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "RIP Web Service",
      "PortRange": [{
        "ExternalPort": 520,
        "ExternalPortEnd": 520,
        "InternalPort": 520,
        "InternalPortEnd": 520,
        "PortMappingProtocol": "UDP"
      }]
    }, {
      "PortMappingDescription": "REAL A/V Audio/Video",
      "PortRange": [{
        "ExternalPort": 7070,
        "ExternalPortEnd": 7070,
        "InternalPort": 7070,
        "InternalPortEnd": 7070,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "Real Server/Quick Time Audio/Video",
      "PortRange": [{
        "ExternalPort": 7070,
        "ExternalPortEnd": 7070,
        "InternalPort": 7070,
        "InternalPortEnd": 7070,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 6970,
        "ExternalPortEnd": 7170,
        "InternalPort": 6970,
        "InternalPortEnd": 7170,
        "PortMappingProtocol": "UDP"
      }]
    }, {
      "PortMappingDescription": "RTP Remote Transfer Protocol",
      "PortRange": [{
        "ExternalPort": 1634,
        "ExternalPortEnd": 16482,
        "InternalPort": 1634,
        "InternalPortEnd": 16482,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "SFTP Secure File Transfer",
      "PortRange": [{
        "ExternalPort": 22,
        "ExternalPortEnd": 22,
        "InternalPort": 22,
        "InternalPortEnd": 22,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 115,
        "ExternalPortEnd": 115,
        "InternalPort": 115,
        "InternalPortEnd": 115,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "SIP Session Control",
      "PortRange": [{
        "ExternalPort": 5060,
        "ExternalPortEnd": 5060,
        "InternalPort": 5060,
        "InternalPortEnd": 5060,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 5063,
        "ExternalPortEnd": 5063,
        "InternalPort": 5063,
        "InternalPortEnd": 5063,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "SlingBox Media Service",
      "PortRange": [{
        "ExternalPort": 5001,
        "ExternalPortEnd": 5001,
        "InternalPort": 5001,
        "InternalPortEnd": 5001,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "SMTP Mail Service",
      "PortRange": [{
        "ExternalPort": 25,
        "ExternalPortEnd": 25,
        "InternalPort": 25,
        "InternalPortEnd": 25,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "SQL Database Management",
      "PortRange": [{
        "ExternalPort": 1433,
        "ExternalPortEnd": 1433,
        "InternalPort": 1433,
        "InternalPortEnd": 1433,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "SSH Secure Remote Management",
      "PortRange": [{
        "ExternalPort": 22,
        "ExternalPortEnd": 22,
        "InternalPort": 22,
        "InternalPortEnd": 22,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "T120 Conferencing Service",
      "PortRange": [{
        "ExternalPort": 1503,
        "ExternalPortEnd": 1503,
        "InternalPort": 1503,
        "InternalPortEnd": 1503,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "Telnet Remote Management",
      "PortRange": [{
        "ExternalPort": 23,
        "ExternalPortEnd": 23,
        "InternalPort": 23,
        "InternalPortEnd": 23,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "VNC Remote Management",
      "PortRange": [{
        "ExternalPort": 5500,
        "ExternalPortEnd": 5500,
        "InternalPort": 5500,
        "InternalPortEnd": 5500,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 5800,
        "ExternalPortEnd": 5801,
        "InternalPort": 5800,
        "InternalPortEnd": 5801,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 5900,
        "ExternalPortEnd": 5901,
        "InternalPort": 5900,
        "InternalPortEnd": 5901,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "Windows Messaging",
      "PortRange": [{
        "ExternalPort": 1024,
        "ExternalPortEnd": 1030,
        "InternalPort": 1024,
        "InternalPortEnd": 1030,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "Windows Service",
      "PortRange": [{
        "ExternalPort": 135,
        "ExternalPortEnd": 139,
        "InternalPort": 135,
        "InternalPortEnd": 139,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 445,
        "ExternalPortEnd": 1434,
        "InternalPort": 445,
        "InternalPortEnd": 1434,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "XBox Game Console",
      "PortRange": [{
        "ExternalPort": 53,
        "ExternalPortEnd": 53,
        "InternalPort": 53,
        "InternalPortEnd": 53,
        "PortMappingProtocol": "TCP or UDP"
      }, {
        "ExternalPort": 88,
        "ExternalPortEnd": 88,
        "InternalPort": 88,
        "InternalPortEnd": 88,
        "PortMappingProtocol": "UDP"
      }, {
        "ExternalPort": 3074,
        "ExternalPortEnd": 3074,
        "InternalPort": 3074,
        "InternalPortEnd": 3074,
        "PortMappingProtocol": "TCP or UDP"
      }, {
        "ExternalPort": 80,
        "ExternalPortEnd": 80,
        "InternalPort": 80,
        "InternalPortEnd": 80,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "XBox 360 #2 Game Console",
      "PortRange": [{
        "ExternalPort": 15980,
        "ExternalPortEnd": 15980,
        "InternalPort": 15980,
        "InternalPortEnd": 15980,
        "PortMappingProtocol": "TCP"
      }]
    }, {
      "PortMappingDescription": "XBox 360 #3 Game Console",
      "PortRange": [{
        "ExternalPort": 24687,
        "ExternalPortEnd": 24687,
        "InternalPort": 24687,
        "InternalPortEnd": 24687,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "XBox 360 Kinect Game Console",
      "PortRange": [{
        "ExternalPort": 1863,
        "ExternalPortEnd": 1863,
        "InternalPort": 1863,
        "InternalPortEnd": 1863,
        "PortMappingProtocol": "TCP or UDP"
      }]
    }, {
      "PortMappingDescription": "Yahoo Messenger with Client Directory Chat Service",
      "PortRange": [{
        "ExternalPort": 5000,
        "ExternalPortEnd": 5010,
        "InternalPort": 5000,
        "InternalPortEnd": 5010,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 5050,
        "ExternalPortEnd": 5050,
        "InternalPort": 5050,
        "InternalPortEnd": 5050,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 5100,
        "ExternalPortEnd": 5100,
        "InternalPort": 5100,
        "InternalPortEnd": 5100,
        "PortMappingProtocol": "TCP"
      }, {
        "ExternalPort": 6600,
        "ExternalPortEnd": 6699,
        "InternalPort": 6600,
        "InternalPortEnd": 6699,
        "PortMappingProtocol": "TCP"
      }]
    }];

    if(acceptEntry) {
      appData.push({
        "PortMappingDescription": "New Entry",
        "PortRange": []
      });
    }
    return appData;
  }
}
