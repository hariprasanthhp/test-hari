export const ChartColors = {
    BAR_CHART_BLUE: '#7cb5ec',
    CHART_GREEN: '#a9ff96',
    BAR_CHART_GREY: '#727272',
    BAR_CHART_LIGHT_GREY: '#e3e3e3',
    HEATMAP_BLUE: '#86a3ca',
    HEATMAP_DARK_BLUE: '#627db6',
    HEATMAP_ORANGE: '#eecb81',
    PIE_CHART_BLUE: '#95ceff',
    PIE_CHART_GREY: '#8b8b8b',
    CHART_ORANGE: '#ffbc75',
    PIE_CHART_DARK_BLUE: '#8085e9',
    BAR_CHART_DARK_ORANGE: '#CC820C',
    BAR_CHART_DARK_BLUE: '#44367D',
}
// used in gaming, streaming, wfh subscribers charts.
export const STACK_CHART_COLOR = ['#7cb5ec', '#E3E3E3'];
export const EXPORT_FILE_NAME = {
    serviceTierTech: 'subscribers-by-service-tier-technology',
    subscriberDataUsage: 'subscriber-data-usage',
    wfhSubscribers: 'work-from-home-wfh-subscribers-wfh'
}
export const CLOUD_ALL = 'All';
export const HeatMap = {
    XCategories: ['00 AM', '02', '04', '06', '08', '10', '12 PM', '14', '16', '18', '20', '22', '24'],
    YCategories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday ', 'Saturday',]
}
export const monthsArray = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const SEGMENTATION_CATEGORIES = {
    STREAMING: ['Streaming', 'Non-streaming'],
    GAMING: ['Gaming', 'Non-gaming'],
    WFH: ['WFH', 'Non-WFH'],
    ServiceLimit: ['Downstream Service Limit', 'Upstream Service Limit']
}
export const ADOPTION_MODULE_RENAME = {
    "parentalcontrol": "ExperienceIQ",
    "networksecurity": "ProtectIQ",
    "arlos": "Arlo",
    "servify": "Servify",
    "bark": "Bark"

}
// export const ADOPTION_MODULE_RENAME_FRENCH = {
//     "parentalcontrol": "Module Experience IQ",
//     "networksecurity": "Module ProtectIQ",
// }

export const THREATS_RENAME = {
    "AV": "Virus",
    "WG": "Web Threats",
    "IPS": "Intrusions"
}
export const chartColorCodes=[  '#0027FF', '#FF489D', '#6600FF','#33FFFF','#993366',   '#CC0033',    '#FF8238',  '#005266','#110033', '#B926F0','#BDB76B','#b3d974', '#FFE4B5', '#CD853F',  '#E9967A',  '#A52A2A', '#DC143C', '#FF00FF', '#800080', '#F7C343',  '#836ee8',  '#029a7c',   '#28527a', '#5ACFEA', '#e9896a', '#ff96c5', '#ffcccd', '#efdeco', '#DB7093', '#DA70D6', '#D8BFD8', '#DDA0DD', '#70daa9','#9370DB', '#FFC0CB', '#7B68EE', '#5F9EA0', '#2F4F4F', '#66CDAA', '#3CB371', '#90EE90', '#6B8E23', '#00CED1', '#00FF00', '#FF8C00', '#D2691E', '#FF4500', '#B22222', '#FFA500', '#800000', '#008B45', '#36648B', '#551011', '#551A8B', '#543948', '#A6D785', '#A5435C', '#B3C95A', '#C71585','#DCA2CD', '#EECBAD', '#FFC125', '#ADEAEA', '#9F9F5F', '#8C1717', '#8B6508', '#86C67C', '#7FFFD4', '#4DBD33', '#4d004d','#e6fff2', '#00331a', '#ff80ff', '#ccccff', '#4700b8','#cff2c2','#696969' , '#bf80ff','#fff0e6', '#66cc66', '#b3e6cc', '#c2d6d6', '#b3ffff', '#ff99cc', '#e6b3cc', '#ffecb3', '#ffff99', '#ffffb3',' #000080', '#ccffcc', '#00e600','#99ffe6', '#00e6ac', '#00b3b3', '#e6f7ff', '#00e6e6', '#cc0044', '#660099', '#88ff4d', '#cfe2de', '#806200', '#a1b300', '#00cc69', '#b30000', '#800055', '#cc0099', '#1affff','#006bb3', '#0099e6', '#47d1d1',' #666666',' #A3EA76','#ffb3b3', '#a300cc',' #e6e600','#6666ff','#9fdfbf', '#99ff99', '#663300', '#4d6600', '#002db3', '#260033', '#f3f2f3', '#8600b3', '#cc0000', '#00e6b8', '#000099', '#b300b3', '#336600','#ccff66', '#000066', '#b38600',' #800020', '#4d4d00', '#990099', '#794dff', '#4dff4d','#7300e6','#602060', '#391326', '#330033', '#4d4dff', '#324d32',' #004466', '#33334d', '#ffe6f2', '#0044cc', '#665200 ','#4d2600',' #208000', '#003366' ]

export interface MarketingChannelResponse {
    completedCampaigns?: number;
    costPerSubscriber?: number;
    description?: string;
    inprogressCampaigns?: number;
    marketingChannel?: string;
    marketingChannelId?: string;
    scheduleCampaigns?: number;
    segmentSize?: number;
    checked?: boolean;
    include?: string;
}

export interface MarketingChannel {
    mobileNotification?: MarketingChannelResponse,
    mailChimp?: MarketingChannelResponse,
    faceBook?: MarketingChannelResponse,
    hubspot?: MarketingChannelResponse,
    constant?: MarketingChannelResponse
}