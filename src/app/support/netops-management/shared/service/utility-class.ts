

export class UtilityClass {
    // Class method
    // timezone called in another file
    timeZone = [{ "name": "Etc/GMT+12" },
    { "name": "Pacific/Pago_Pago" }, { "name": "Pacific/Apia" },
    { "name": "America/Adak" }, { "name": "Pacific/Honolulu" },
    { "name": "Pacific/Marquesas" }, { "name": "Pacific/Gambier" },
    { "name": "America/Anchorage" }, { "name": "America/Los_Angeles" },
    { "name": "Pacific/Pitcairn" }, { "name": "America/Phoenix" },
    { "name": "America/Denver" }, { "name": "America/Guatemala" },
    { "name": "America/Chicago" }, { "name": "Pacific/Easter" },
    { "name": "America/Bogota" }, { "name": "America/New_York" },
    { "name": "America/Caracas" }, { "name": "America/Halifax" },
    { "name": "America/Santo_Domingo" }, { "name": "America/Santiago" },
    { "name": "America/St_Johns" }, { "name": "America/Godthab" },
    { "name": "America/Argentina/Buenos_Aires" }, { "name": "America/Montevideo" },
    { "name": "America/Noronha" }, { "name": "UTC" },
    { "name": "Atlantic/Azores" }, { "name": "Atlantic/Cape_Verde" },
    { "name": "Europe/London" },
    { "name": "Europe/Berlin" }, { "name": "Africa/Lagos" },
    { "name": "Africa/Windhoek" }, { "name": "Asia/Beirut" },
    { "name": "Africa/Johannesburg" }, { "name": "Asia/Baghdad" },
    { "name": "Europe/Moscow" }, { "name": "Asia/Tehran" },
    { "name": "Asia/Dubai" }, { "name": "Asia/Baku" },
    { "name": "Asia/Kabul" }, { "name": "Asia/Yekaterinburg" },
    { "name": "Asia/Karachi" }, { "name": "Asia/Kolkata" },
    { "name": "Asia/Kathmandu" }, { "name": "Asia/Dhaka" },
    { "name": "Asia/Omsk" }, { "name": "Asia/Rangoon" },
    { "name": "Asia/Krasnoyarsk" }, { "name": "Asia/Jakarta" },
    { "name": "Asia/Shanghai" }, { "name": "Asia/Irkutsk" },
    { "name": "Australia/Eucla" }, { "name": "Asia/Yakutsk" },
    { "name": "Asia/Tokyo" }, { "name": "Australia/Darwin" },
    { "name": "Australia/Adelaide" }, { "name": "Australia/Brisbane" },
    { "name": "Asia/Vladivostok" }, { "name": "Australia/Sydney" },
    { "name": "Australia/Lord_Howe" }, { "name": "Asia/Kamchatka" },
    { "name": "Pacific/Noumea" }, { "name": "Pacific/Norfolk" },
    { "name": "Pacific/Auckland" }, { "name": "Pacific/Majuro" },
    { "name": "Pacific/Chatham" }, { "name": "Pacific/Tongatapu" },
    { "name": "Pacific/Apia" }, { "name": "Pacific/Kiritimati" }]

    daysOfWeek = [
        { "name": "Monday", "id": "Mon" },
        { "name": "Tuesday", "id": "Tue" },
        { "name": "Wednesday", "id": "Wed" },
        { "name": "Thursday", "id": "Thu" },
        { "name": "Friday", "id": "Fri" },
        { "name": "Saturday", "id": "Sat" },
        { "name": "Sunday", "id": "Sun" }
    ]

    frequency = [
        { name: 'Weekly', id: 'Weekly' },
        { name: 'Monthly', id: 'Monthly' }
    ];

    FileType = [
        { name: "Configuration File" },
        { name: "SIP Configuration File" },
        { name: "T Series SIP Configuration File" }
    ]

    daysOfMonth = [
        { "id": "1" }, { "id": "2" },
        { "id": "3" }, { "id": "4" },
        { "id": "5" }, { "id": "6" },
        { "id": "7" }, { "id": "8" },
        { "id": "9" }, { "id": "10" },
        { "id": "11" }, { "id": "12" },
        { "id": "13" }, { "id": "14" },
        { "id": "15" }, { "id": "16" },
        { "id": "17" }, { "id": "18" },
        { "id": "19" }, { "id": "20" },
        { "id": "21" }, { "id": "22" },
        { "id": "23" }, { "id": "24" },
        { "id": "25" }, { "id": "26" },
        { "id": "27" }, { "id": "28" },
    ]


}
export const UrlPattern = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/i;
/* ^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i; */
/* ^((ftps?|https?):\/\/)([a-zA-Z0-9]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-z]{2,6})?(:\d{1,4}|:[0-6][0-5][0-5][0-3][0-5])?$ */
/* /((([A-Za-z]{3,9}:(:\/\/))(:[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+|(:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((:\/[\+~%\/.\w-_]*)\??(:[-\+=&;%@.\w_]*)#(:[\w]*)))/; */
/* /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; */
/* (/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm) */
