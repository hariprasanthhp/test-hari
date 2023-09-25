export const unupData = {
    "Enable": "true",
    "NATEnable": "true"
}

export const blockedServicesPayload = {
    "stealthMode": true,
    "securityLevel": "X_000631_Medium",
    "blockedServices": [
        {
            "service": "DirectX",
            "serviceType": "Multimedia Control",
            "servicePort": "2300 thru 2400, 47624, 2300 thru 2400 UDP, 6073 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "DirectTV STB 1",
            "serviceType": "Multimedia Service",
            "servicePort": "27161 thru 27163",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "DirectTV STB 2",
            "serviceType": "Multimedia Service",
            "servicePort": "27164 thru 27166",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "DirectTV STB 3",
            "serviceType": "Multimedia Service",
            "servicePort": "27167 thru 27169",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "DNS",
            "serviceType": "Domain Name Service",
            "servicePort": "53 TCP/UDP",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "FTP",
            "serviceType": "File Transfer",
            "servicePort": "20, 21",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "FTPS",
            "serviceType": "FTP Over SSL/TLS",
            "servicePort": "990",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Gmail",
            "serviceType": "Mail Service",
            "servicePort": "Incoming 995, Outgoing 465",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "H323",
            "serviceType": "Video",
            "servicePort": "1720",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "HTTP",
            "serviceType": "Web Service",
            "servicePort": "80",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "HTTPS",
            "serviceType": "Secure Web Service",
            "servicePort": "443",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "ICMP Echo Request",
            "serviceType": "Web Service",
            "servicePort": "IPv4:Type 8, IPv6:Type 128",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "ICMP Echo Reply",
            "serviceType": "Web Service",
            "servicePort": "IPv4:Type 0, IPv6:Type 129",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "ICMP TTL Expire",
            "serviceType": "Web Service",
            "servicePort": "IPv4:Type 11, IPv6:Type 3, 0 - time to live exceeded, 1 - fragment reassembly time exceeded",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "ICMP Trace Route",
            "serviceType": "Web Service",
            "servicePort": "Trace route by Windows",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "IMAP",
            "serviceType": "Mail Service",
            "servicePort": "143",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IMAPS",
            "serviceType": "Mail Service",
            "servicePort": "993",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IPP",
            "serviceType": "Remote Printing",
            "servicePort": "631",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IPSEC",
            "serviceType": "VPN Service",
            "servicePort": "AH, ESP, 500 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IRC",
            "serviceType": "Chat Service",
            "servicePort": "113, 194, 1024 thru 1034, 6661 thru 7000",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "L2TP",
            "serviceType": "VPN Service",
            "servicePort": "1701 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "MSN Gaming",
            "serviceType": "Gaming Service",
            "servicePort": "28800 thru 29100 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "MySQL",
            "serviceType": "Database Management",
            "servicePort": "3306",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "NNTP",
            "serviceType": "Newsgroup",
            "servicePort": "119",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "NTP",
            "serviceType": "Network Time",
            "servicePort": "123 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Oracle SQL",
            "serviceType": "Database Management",
            "servicePort": "66, 1525",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "PC Anywhere",
            "serviceType": "Remote Management",
            "servicePort": "66, 1525, 5631 TCP/UDP, 5532 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "PPTP",
            "serviceType": "VPN Service",
            "servicePort": "All GRE, 1723",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "POP3",
            "serviceType": "Mail Service",
            "servicePort": "110",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "POP3S",
            "serviceType": "Secure Mail Service",
            "servicePort": "995",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "PS2 / PS3",
            "serviceType": "Game Console",
            "servicePort": "4658 TCP/UDP, 4659 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "RIP",
            "serviceType": "Web Service",
            "servicePort": "520 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "REAL A/V",
            "serviceType": "Audio/Video",
            "servicePort": "7070",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Real Server / Quick Time",
            "serviceType": "Audio/Video",
            "servicePort": "7070, 6970 thru 7170 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "RTP",
            "serviceType": "Remote Transfer Protocol",
            "servicePort": "TCP 16384 thru 16482",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SFTP",
            "serviceType": "Secure File Transfer",
            "servicePort": "22, 115",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SIP",
            "serviceType": "Session Control",
            "servicePort": "5060, 5063 TCP, UDP",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "SlingBox",
            "serviceType": "Media Service",
            "servicePort": "5001",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SMTP",
            "serviceType": "Mail Service",
            "servicePort": "25",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SQL",
            "serviceType": "Database Management",
            "servicePort": "1433",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SSH",
            "serviceType": "Secure Remote Management",
            "servicePort": "22",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "T120",
            "serviceType": "Conferencing Service",
            "servicePort": "1503",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Telnet",
            "serviceType": "Remote Management",
            "servicePort": "23",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "VNC",
            "serviceType": "Remote Management",
            "servicePort": "5500, 5800, 5801, 5900, 5901",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Windows Messaging",
            "serviceType": "Windows Messaging",
            "servicePort": "TCP 1024 thru 1030",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Windows Service",
            "serviceType": "135 thru 139, 445 and 1434",
            "servicePort": "Windows Service",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox",
            "serviceType": "Game Console",
            "servicePort": "53 TCP/UDP, 88 UDP, 3074 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox 360 #2",
            "serviceType": "Game Console",
            "servicePort": "15980 T",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox 360 #3",
            "serviceType": "Game Console",
            "servicePort": "24687 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox 360 Kinect",
            "serviceType": "Game Console",
            "servicePort": "1863 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Yahoo Messenger with Client Directory",
            "serviceType": "Chat Service",
            "servicePort": "500 thru 5010, 5050, 5100, 6600 thru 6699",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "All Other Ports",
            "serviceType": "All Other Ports",
            "servicePort": "Reject all ports except the ports noted in the applications above",
            "trafficIn": true,
            "trafficOut": false
        }
    ]
}

export const firewallInfo = {
    "featureName": "Firewall",
    "stealthMode": "true",
    "securityLevel": "X_000631_Medium",
    "blockedServices": [
        {
            "service": "DirectX",
            "serviceType": "Multimedia Control",
            "servicePort": "2300 thru 2400, 47624, 2300 thru 2400 UDP, 6073 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "DirectTV STB 1",
            "serviceType": "Multimedia Service",
            "servicePort": "27161 thru 27163",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "DirectTV STB 2",
            "serviceType": "Multimedia Service",
            "servicePort": "27164 thru 27166",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "DirectTV STB 3",
            "serviceType": "Multimedia Service",
            "servicePort": "27167 thru 27169",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "DNS",
            "serviceType": "Domain Name Service",
            "servicePort": "53 TCP/UDP",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "FTP",
            "serviceType": "File Transfer",
            "servicePort": "20, 21",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "FTPS",
            "serviceType": "FTP Over SSL/TLS",
            "servicePort": "990",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Gmail",
            "serviceType": "Mail Service",
            "servicePort": "Incoming 995, Outgoing 465",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "H323",
            "serviceType": "Video",
            "servicePort": "1720",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "HTTP",
            "serviceType": "Web Service",
            "servicePort": "80",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "HTTPS",
            "serviceType": "Secure Web Service",
            "servicePort": "443",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "ICMP Echo Request",
            "serviceType": "Web Service",
            "servicePort": "IPv4:Type 8, IPv6:Type 128",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "ICMP Echo Reply",
            "serviceType": "Web Service",
            "servicePort": "IPv4:Type 0, IPv6:Type 129",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "ICMP TTL Expire",
            "serviceType": "Web Service",
            "servicePort": "IPv4:Type 11, IPv6:Type 3, 0 - time to live exceeded, 1 - fragment reassembly time exceeded",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "ICMP Trace Route",
            "serviceType": "Web Service",
            "servicePort": "Trace route by Windows",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "IMAP",
            "serviceType": "Mail Service",
            "servicePort": "143",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IMAPS",
            "serviceType": "Mail Service",
            "servicePort": "993",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IPP",
            "serviceType": "Remote Printing",
            "servicePort": "631",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IPSEC",
            "serviceType": "VPN Service",
            "servicePort": "AH, ESP, 500 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "IRC",
            "serviceType": "Chat Service",
            "servicePort": "113, 194, 1024 thru 1034, 6661 thru 7000",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "L2TP",
            "serviceType": "VPN Service",
            "servicePort": "1701 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "MSN Gaming",
            "serviceType": "Gaming Service",
            "servicePort": "28800 thru 29100 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "MySQL",
            "serviceType": "Database Management",
            "servicePort": "3306",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "NNTP",
            "serviceType": "Newsgroup",
            "servicePort": "119",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "NTP",
            "serviceType": "Network Time",
            "servicePort": "123 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Oracle SQL",
            "serviceType": "Database Management",
            "servicePort": "66, 1525",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "PC Anywhere",
            "serviceType": "Remote Management",
            "servicePort": "66, 1525, 5631 TCP/UDP, 5532 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "PPTP",
            "serviceType": "VPN Service",
            "servicePort": "All GRE, 1723",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "POP3",
            "serviceType": "Mail Service",
            "servicePort": "110",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "POP3S",
            "serviceType": "Secure Mail Service",
            "servicePort": "995",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "PS2 / PS3",
            "serviceType": "Game Console",
            "servicePort": "4658 TCP/UDP, 4659 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "RIP",
            "serviceType": "Web Service",
            "servicePort": "520 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "REAL A/V",
            "serviceType": "Audio/Video",
            "servicePort": "7070",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Real Server / Quick Time",
            "serviceType": "Audio/Video",
            "servicePort": "7070, 6970 thru 7170 UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "RTP",
            "serviceType": "Remote Transfer Protocol",
            "servicePort": "TCP 16384 thru 16482",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SFTP",
            "serviceType": "Secure File Transfer",
            "servicePort": "22, 115",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SIP",
            "serviceType": "Session Control",
            "servicePort": "5060, 5063 TCP, UDP",
            "trafficIn": false,
            "trafficOut": false
        },
        {
            "service": "SlingBox",
            "serviceType": "Media Service",
            "servicePort": "5001",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SMTP",
            "serviceType": "Mail Service",
            "servicePort": "25",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SQL",
            "serviceType": "Database Management",
            "servicePort": "1433",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "SSH",
            "serviceType": "Secure Remote Management",
            "servicePort": "22",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "T120",
            "serviceType": "Conferencing Service",
            "servicePort": "1503",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Telnet",
            "serviceType": "Remote Management",
            "servicePort": "23",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "VNC",
            "serviceType": "Remote Management",
            "servicePort": "5500, 5800, 5801, 5900, 5901",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Windows Messaging",
            "serviceType": "Windows Messaging",
            "servicePort": "TCP 1024 thru 1030",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Windows Service",
            "serviceType": "135 thru 139, 445 and 1434",
            "servicePort": "Windows Service",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox",
            "serviceType": "Game Console",
            "servicePort": "53 TCP/UDP, 88 UDP, 3074 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox 360 #2",
            "serviceType": "Game Console",
            "servicePort": "15980 T",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox 360 #3",
            "serviceType": "Game Console",
            "servicePort": "24687 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "XBox 360 Kinect",
            "serviceType": "Game Console",
            "servicePort": "1863 TCP/UDP",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "Yahoo Messenger with Client Directory",
            "serviceType": "Chat Service",
            "servicePort": "500 thru 5010, 5050, 5100, 6600 thru 6699",
            "trafficIn": true,
            "trafficOut": false
        },
        {
            "service": "All Other Ports",
            "serviceType": "All Other Ports",
            "servicePort": "Reject all ports except the ports noted in the applications above",
            "trafficIn": true,
            "trafficOut": false
        }
    ]
}