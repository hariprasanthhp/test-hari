import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IPv6AddressService {

  constructor() { }

  /*
   * is a valid IPv6 CIDR, e.g., "2017::1/64"
   */
  isIpv6CIDR(subnet) {
    // is standard CIDR or compressed CIDR
    return /^([0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}\/([1-9]|[1-9][0-9]|[1][0-1][0-9]|[1][2][0-8])\,*)+$/.test(subnet) ||
      /^((([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)::(([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)\/([1-9]|[1-9][0-9]|[1][0-1][0-9]|[1][2][0-8])\,*)+$/
        .test(subnet);
  }

  /*
   * is a valid IPv6 address, e.g., "2017::1"
   */
  isIpv6Address(ipAddress) {
    // is standard address or compressed address
    return /^[0-9a-fA-F]{1,4}(:[0-9a-fA-F]{1,4}){7}$/.test(ipAddress) ||
      /^(([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)::(([0-9A-Fa-f]{1,4}(:[0-9A-Fa-f]{1,4}){0,5})?)$/.test(ipAddress);
  }

  /*
   * padding a section of IPv6 address, which is seperated by ":"
   */
  padSection(section, len) {
    var padding = "0".repeat(len);
    if (section.length < padding.length) {
      section = padding.substring(0, padding.length - section.length) + section;
    }
    return section;
  }

  bin2HexOfSection(binStr) {
    return parseInt(binStr, 2).toString(16)
  }

  hex2BinOfSection(hexStr) {
    return parseInt(hexStr, 16).toString(2)
  }

  bin2HexOfAddress(binStr) {
    var addr = [];
    for (var i = 0; i < 128; i += 16) {
      var binPart = binStr.substring(i, i + 16);
      var hexSection = this.padSection(this.bin2HexOfSection(binPart), 4);
      addr.push(hexSection);
    }
    return addr.join(':');
  }

  hex2BinOfAddress(hexStr) {
    var nAddr = this.normalize(hexStr);
    var sections = nAddr.split(":");
    var binAddr = '';
    for (var i = 0; i < sections.length; i++) {
      binAddr += this.padSection(this.hex2BinOfSection(sections[i]), 16);
    }
    return binAddr;
  }

  /**
   * compress the given ip address to shortest form
   * @param ip
   * @returns {string}
   */
  abbreviate(ip) {
    if (!this.isIpv6Address(ip)) {
      //throw new Error('Invalid address: ' + a);
    }

    // convert std format, e.g., 1:2:3:4:5:0:0:8
    var stdAddr = "";
    var nAddr = this.normalize(ip);
    var sections = nAddr.split(":");
    for (var i = 0; i < sections.length; i++) {
      stdAddr += this.bin2HexOfSection(this.hex2BinOfSection(sections[i]));
      if (i < sections.length - 1) {
        stdAddr += ":";
      }
    }

    // to compress
    var p = new RegExp("(:0){2,7}", "g");
    var oneMatch = p.exec(stdAddr);

    var longestIndex = -1;
    var len = -1;
    if (oneMatch != null) {
      longestIndex = oneMatch["index"];
      len = oneMatch["0"].length;
    }

    while (oneMatch != null) {
      oneMatch = p.exec(stdAddr);
      if (oneMatch != null) {
        if (oneMatch["0"].length >= longestIndex) {
          longestIndex = oneMatch["index"];
          len = oneMatch["0"].length;
        }
      }
    }

    if (len > 2) {
      if (longestIndex == 0) {
        stdAddr = "::" + stdAddr.substring(len);
      } else if (longestIndex + len >= stdAddr.length) {
        stdAddr = stdAddr.substring(0, longestIndex) + "::";
      } else {
        stdAddr = stdAddr.substring(0, longestIndex) + "::" + stdAddr.substring(longestIndex + len + 1);
        if (stdAddr.indexOf("0::") == 0) {
          stdAddr = stdAddr.substring(1);
        }
      }
    }

    return stdAddr;
  }

  /*
   * normalize an IPv6 address, e.g., give "cdc::123", return "0cdc:0000:0000:0000:0000:0000:0000:0123"
   */
  normalize(a) {
    if (!this.isIpv6Address(a)) {
      throw new Error('Invalid address: ' + a);
    }
    var nh = a.split(/\:\:/g);
    // if (nh.length > 2) {
    //     throw new Error('Invalid address: ' + a);
    // }

    var sections = [];
    if (nh.length == 1) {
      // full mode
      sections = a.split(/\:/g);
      if (sections.length !== 8) {
        throw new Error('Invalid address: ' + a);
      }
    } else if (nh.length == 2) {
      // compact mode
      var n = nh[0];
      var h = nh[1];
      var ns = n.split(/\:/g);
      var hs = h.split(/\:/g);
      for (var i in ns) {
        sections[i] = ns[i];
      }
      for (let i: any = hs.length; i > 0; --i) {
        sections[7 - (hs.length - i)] = hs[i - 1];
      }
    }

    for (let i: any = 0; i < 8; ++i) {
      if (sections[i] === undefined) {
        sections[i] = '0000';
      }
      sections[i] = this.padSection(sections[i], 4);
    }
    return sections.join(':');
  }

  /*
   * Given an IPv6 address and its prefixe, return the range of this CIDR. e.g.,
   * Given: ip=cdc::123, prefixe=64
   * Return:
   *  {
   *    "ipLowStr":"0cdc:0000:0000:0000:0000:0000:0000:0000","ipHighStr":"0cdc:0000:0000:0000:ffff:ffff:ffff:ffff"
   *  }
   */
  range(ip, prefix) {
    if (!this.isIpv6Address(ip)) {
      throw new Error('Invalid address: ' + ip);
    }

    // parse HEX address to bin
    var normalizedIp = this.normalize(ip);
    var sections = normalizedIp.split(":");
    var binAddr = "";
    for (var i = 0; i < sections.length; i++) {
      // parse HEX section[i] to binary and then left padding with "0"
      binAddr += this.padSection(this.hex2BinOfSection(sections[i]), 16);
    }

    var mask1 = 128;
    var binNet = binAddr.substring(0, prefix);
    var binStart = binNet + "0".repeat(mask1 - prefix);
    var binEnd = binNet + "1".repeat(mask1 - prefix);

    return {
      ipLowStr: this.bin2HexOfAddress(binStart),
      ipHighStr: this.bin2HexOfAddress(binEnd)
    };
  }

  /*
   * Given an IPv6 address range, return the CIDR. e.g.,
   * Given: "ipLowStr":"0cdc:0000:0000:0000:0000:0000:0000:0000","ipHighStr":"0cdc:0000:0000:0000:ffff:ffff:ffff:ffff"
   * Return:
   *  {
   *    {"ipLowStr":"0cdc::","prefixSize":64}
   *  }
   */
  cidr(ipLowStr, ipHighStr) {
    if (!this.isIpv6Address(ipLowStr) || !this.isIpv6Address(ipHighStr)) {
      throw new Error('Invalid address: ' + ipLowStr + ", " + ipHighStr);
    }

    // to determine the prefix
    var binLow = this.hex2BinOfAddress(ipLowStr);
    var binHigh = this.hex2BinOfAddress(ipHighStr);
    var prefix = 0;
    for (var i = 0; i < binLow.length; i++) {
      if (binLow[i] == binHigh[i]) {
        prefix = (i + 1);
        continue;
      }

      break;
    }

    return {
      ipLowStr: this.abbreviate(ipLowStr),
      prefixSize: prefix
    };
  }



}
