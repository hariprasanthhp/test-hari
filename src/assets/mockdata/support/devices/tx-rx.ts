export const chartdata1 = {
  credits: {
    enabled: false
  },
  chart: {
    type: "line",
    events: {}
  },
  title: {
    text: "TX RX Bytes"
  },
  xAxis: [
    {
      min: 0,
      gridLineWidth: 2,
      categories: [
        1666033200000,
        1666036800000,
        1666040400000,
        1666044000000,
        1666047600000,
        1666051200000,
        1666054800000,
        1666058400000,
        1666062000000,
        1666065600000,
        1666069200000
      ],
      labels: {
        rotation: -55
      },
      crosshair: true,
      index: 0,
      isX: true
    }
  ],
  yAxis: [
    {
      min: 0,
      allowDecimals: true,
      labels: {},
      title: {
        text: "TX RX Bytes",
        style: {
          color: "#727272"
        }
      },
      index: 0
    }
  ],
  tooltip: {
    shared: true,
    crosshairs: true
  },
  series: [
    {
      name: "Total Transmitted 29.55 MB",
      data: [
        1710023,
        1815494,
        4905944,
        2163392,
        3131817,
        4897245,
        2913727,
        805287,
        4853377,
        2959433,
        830595
      ],
      color: "#0027FF"
    },
    {
      name: "Total Received  53.09 MB",
      data: [
        2927988,
        2920380,
        17712348,
        3826687,
        4331709,
        5804460,
        4386331,
        1160566,
        6724643,
        3583808,
        2291743
      ],
      color: "#5ACFEA"
    }
  ],
  plotOptions: {
    series: {
      cursor: "pointer",
      pointPadding: 2,
      marker: {
        enabled: false
      },
      pointPlacement: "on",
      point: {
        events: {}
      }
    }
  },
  responsive: {
    rules: [
      {
        condition: {},
        _id: "highcharts-j0dw1eq-28"
      }
    ]
  }
}

export const routerdatamock = {
  "HostName":"62:46:a5:b6:24:3f",
  "MACAddress":"62:46:a5:b6:24:3f",
  "IPAddress":"192.168.1.5",
  "Status":"online",
  "Address-source":"dhcp",
  "Model":"",
  "Manufacture":"",
  "Code-version":"",
  "Lease-time-expiry":86400000,
  "Connection-type":"WiFi",
  "AccessPointSerialNumber":"CXNK00A0D228",
  "AccessPointHostName":"gloria's Router",
  "Client-type":1
  }

export const txrxusage = {
  "data":[
  {
  "time":1666011600000,
  "rssi":-59.05,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":1735655,
  "bytesDown":5550032
  },
  {
  "time":1666033200000,
  "rssi":-58.5,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":1710023,
  "bytesDown":2927988
  },
  {
  "time":1666036800000,
  "rssi":-58.89,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":1815494,
  "bytesDown":2920380
  },
  {
  "time":1666040400000,
  "rssi":-58.87,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":4905944,
  "bytesDown":17712348
  },
  {
  "time":1666044000000,
  "rssi":-58.64,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":2163392,
  "bytesDown":3826687
  },
  {
  "time":1666047600000,
  "rssi":-58.92,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":3131817,
  "bytesDown":4331709
  },
  {
  "time":1666051200000,
  "rssi":-58.78,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":4897245,
  "bytesDown":5804460
  },
  {
  "time":1666054800000,
  "rssi":-58.78,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":2913727,
  "bytesDown":4386331
  },
  {
  "time":1666058400000,
  "rssi":-59.94,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":805287,
  "bytesDown":1160566
  },
  {
  "time":1666062000000,
  "rssi":-59.89,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":4853377,
  "bytesDown":6724643
  },
  {
  "time":1666065600000,
  "rssi":-59.71,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":2959433,
  "bytesDown":3583808
  },
  {
  "time":1666069200000,
  "rssi":-59.65,
  "phyrateUp":0,
  "phyrateDown":0,
  "bytesUp":830595,
  "bytesDown":2291743
  }
  ],
  "count":12
  }