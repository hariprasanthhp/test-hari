import {
	Component,
	OnInit,
	OnDestroy,
	ViewChild,
	ViewChildren,
	QueryList,
	TemplateRef,
	ChangeDetectorRef
} from '@angular/core';
import {
	TranslateService
} from 'src/app-services/translate.service';
import {
	AcessModifiers,
	SsoAuthService
} from 'src/app/shared/services/sso-auth.service';
import {
	DeviceGroupService
} from '../services/device-group.service';
import {
	forkJoin,
	Observable,
	of,
	Subject
} from 'rxjs';
import {
	HttpClient,
	HttpErrorResponse
} from '@angular/common/http';
import {
	DataTableDirective
} from 'angular-datatables';
import {
	FormGroup,
	FormBuilder,
	FormArray,
	Validators
} from '@angular/forms';
import {
	NgbModal,
	ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import {
	environment
} from '../../../../../environments/environment';
import {
	ActivatedRoute,
	Router,
	NavigationEnd,
	RoutesRecognized
} from "@angular/router";
import * as $ from 'jquery';
import * as isCidr from 'is-cidr';
import { IpSubnetCalculatorService } from "../../../../shared/services/ip-subnet-calculator.service";
import { IPv6AddressService } from "../../../../shared/services/ipv6-address.service";
import { catchError, map } from 'rxjs/operators';
import { DataServiceService } from '../../../data.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
class DataTablesResponse {
	data: any[];
	draw: number;
	recordsFiltered: number;
	recordsTotal: number;
}



@Component({
	selector: 'app-devices-groups',
	templateUrl: './devices-groups.component.html',
	styleUrls: ['./devices-groups.component.scss']
})
export class DevicesGroupsComponent implements OnInit {
	groupType: any = 'dynamic';
	searchResult: any;
	dynamic = [{
		id: 'dynamic',
		name: 'Dynamic'
	},
	{
		id: 'static',
		name: 'Static'
	}
	];

	isAddGroupForm: boolean = true
	isAddTable: boolean = false
	ishidebtn: boolean = true
	isHideDropDown: boolean = false
	inheritance = [{
		id: true,
		name: 'true'
	},
	{
		id: false,
		name: 'false'
	}
	]

	showSuccess: boolean = false;
	successMsg: string;
	language: any;
	languageSubject;
	orgId;
	workflowdetails: boolean = false;
	allDeviceGrpSubscribe: any;
	UpdateDeviceGrpSubscribe: any;
	DeleteDeviceGrpSubscribe: any;
	groupMemberCount: any;
	AddDeviceGrpSubscribe: any;
	EditDeviceGrpSubscribe: any;
	DeviceTableData: any = [];
	isRerender = false;
	loading: boolean = false;
	dataAvailable: boolean = false;
	createDeviceGroup: FormGroup;
	IsStatic: boolean = false;
	IsStatic_enable: boolean = false;
	Is_Update: boolean;
	editdevicegrpid: any;
	modalRef: any;
	deletedata: any;
	modalTitle: string;
	modalInfo: string;
	modelType: string;
	submitted = false;
	DiscoveredDeviceCount: any;
	UnDiscoveredStaticDeviceCount: any;
	DiscoveredStaticSubscribe: any;
	UnDiscoveredStaticSubscribe: any;
	warningMessage: any;
	tableCounts;
	MemberCount: any;
	getAllWorkFlows: any;
	systemGroupId;
	groupName;
	workflowMemberData: any = [];
	searchText: string = '';
	forceDelete: boolean = true;
	showWarningMsg: boolean = false;
	modalname: string;
	workflowcount: any = [];
	errMsg = 'Are you sure you want to delete Device Group';
	@ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

	operatorsMapping = {
		'$ne': 'Not Equal',
		'$gt': 'Greater Than',
		'$gte': 'Greater Than Or Equal',
		'$regex': 'WildCard',
		'$in': 'In',
		'$lte': 'Less Than or Equal',
		'$lt': 'Less Than',
		'$subnets': '$subnets'
	};

	defaultWanAccessTypes = [
		{
			id: "AE",
			name: "AE"
		},
		{
			id: "GPON",
			name: "GPON"
		}
	];

	readonly rule1items = [{
		id: '',
		name: ''
	}, {
		id: 'manufacturer',
		name: 'Manufacturer'
	},
	{
		id: 'modelName',
		name: 'Model'
	},
	{
		id: 'softwareVersion',
		name: 'SW Version'
	},
	{
		id: 'hardwareVersion',
		name: 'HW Version'
	},
	{
		id: 'serialNumber',
		name: 'FSAN/Serial Number'
	},
	{
		id: 'normalizedIpAddress',
		name: 'WAN IP'
	},
	{
		id: 'registrationId',
		name: 'Registration ID'
	},
	{
		id: 'wanAccessType',
		name: 'WAN Access Type'
	},
	{
		id: 'opMode',
		name: 'Mode'
	}
	];
	rule2items: any = {
		"manufacturer": [{
			id: '',
			name: ''
		}, {
			id: 'Equals',
			name: 'Equals'
		},
		{
			id: '$ne',
			name: 'Not Equal'
		}

		],
		"modelName": [{
			id: '',
			name: ''
		}, {
			id: 'Equals',
			name: 'Equals'
		},
		{
			id: '$ne',
			name: 'Not Equal'
		},
		{
			id: '$in',
			name: 'In'
		}
		],
		"softwareVersion": [{
			id: '',
			name: ''
		}, {
			id: 'Equals',
			name: 'Equals'
		},
		{
			id: '$ne',
			name: 'Not Equal'
		},
		{
			id: '$in',
			name: 'In'
		}
		],
		"hardwareVersion": [{
			id: '',
			name: ''
		}, {
			id: 'Equals',
			name: 'Equals'
		},
		{
			id: '$ne',
			name: 'Not Equal'
		},
		{
			id: '$in',
			name: 'In'
		}
		],
		"serialNumber": [{
			id: '',
			name: ''
		},
		{
			id: '$regex',
			name: 'WildCard'
		}
		],
		"normalizedIpAddress": [{
			id: '',
			name: ''
		},
		{
			id: '$subnets',
			name: 'In Subnet'
		}
		],
		"registrationId": [{
			id: '',
			name: ''
		},
		{
			id: '$regex',
			name: 'WildCard'
		}
		],
		"wanAccessType": [{
			id: '',
			name: ''
		},
		{
			id: 'Equals',
			name: 'Equals'
		}
			// ,{
			//   id: 'Equals',
			//   name: 'Equals'
			// },
			// {
			//   id: '$ne',
			//   name: 'Not Equal'
			// },
			// {
			//   id: '$in',
			//   name: 'In'
			// },
			// {
			//   id: '$regex',
			//   name: 'WildCard'
			// }
		],
		"opMode": [{
			id: 'Equals',
			name: 'Equals'
		}],
	}


	static: boolean = false;





	// rule3items = [{
	//         id: 'Calix',
	//         name: 'Calix'
	//     },
	//     {
	//         id: 'ZyXEL',
	//         name: 'ZyXEL'
	//     },

	// ];

	RulesArray: any = [
		// 	{
		// 	'rule1': '',
		// 	'rule2': '',
		// 	'rule3': ''
		// }

	];

	rule3items: any = {};


	dtOptions: DataTables.Settings = {
		pagingType: 'full_numbers',
		pageLength: 50,
		lengthChange: false,
		serverSide: true,
		processing: false,
		dom: 'tipr',
		columnDefs: [{
			targets: [3, 4],
			orderable: false
		},
		{
			targets: [0],
			orderable: true
		}
		],
		order: [],
		drawCallback: (settings) => {
			let total = settings._iRecordsDisplay;
			let length = settings._iDisplayLength;
			if (total <= length) {
				$(settings.nTableWrapper).find('#devicegrp-table').addClass('disabled');
			} else {
				$(settings.nTableWrapper).find('#devicegrp-table').removeClass('disabled');
			}
		}
	};

	dtOptionsdis: DataTables.Settings = {
		pagingType: 'full_numbers',
		pageLength: 2,
		lengthChange: false,
		serverSide: true,
		processing: true,
		dom: 'tipr',
		columnDefs: [{
			targets: [3, 4],
			orderable: false
		},
		{
			targets: [0],
			orderable: true
		}
		],
		order: [],
		drawCallback: (settings) => {
			let total = settings._iRecordsDisplay;
			let length = settings._iDisplayLength;
			// if (total <= length) {
			//   $(settings.nTableWrapper).find('#devicegrp-table').addClass('disabled');
			// } else {
			//   $(settings.nTableWrapper).find('#devicegrp-table').removeClass('disabled');
			// }
		}
	};

	dtOptionsstaticUndis: DataTables.Settings = {
		paging: false,
		// pagingType: 'full_numbers',
		// pageLength: 2,
		lengthChange: false,
		searching: false,
		// lengthChange: false,
		// serverSide: true,
		// processing: true,
		// dom: 'tipr',
		// columnDefs: [{
		// 	targets: [3, 4],
		// 	orderable: false
		// },
		// {
		// 	targets: [0],
		// 	orderable: true
		// }
		// ],
		// order: [],
		// drawCallback: (settings) => {
		// 	let total = settings._iRecordsDisplay;
		// 	let length = settings._iDisplayLength;
		// }
	};

	dtOptionsstaticdis: DataTables.Settings = {};

	dtOptionsDeviceGroup: DataTables.Settings = {
		searching: false,
		lengthChange: false,
	};
	sortBy: string;
	sortType: string;
	ErrorMessage: any;
	Rule_err: boolean = false;
	DiscoveredTableData = [];


	DeviceTypeArr = [{
		"_id": "data1",
		"orgId": "string",
		"modelName": "model_data1",
		"manufacturer": "manufacturer_data1",
		"productClass": "productclass_1",
		"hardwareVersion": "hwdrwere_vers1",
		"manufacturerOUI": "strinmanufacturerui1",
		"softwareVersion": "sftwre1"
	},
	{
		"_id": "data2",
		"orgId": "string",
		"modelName": "model_data2",
		"manufacturer": "manufacturer_data2",
		"productClass": "productclass_2",
		"hardwareVersion": "hwdrwere_vers2",
		"manufacturerOUI": "strinmanufacturerui2",
		"softwareVersion": "sftwre2"
	}
	]

	UnDiscoveredTableData_static = [];
	DiscoveredTableData_static: any = [];
	isError: boolean;
	DiscoveredStaticDeviceCount: any;
	is_staticenable: boolean = false;

	ipv4BasicExp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/([1-9]|[12]\d|3[0-2])\,*)+$/;


	@ViewChild('deleteModal', {
		static: true
	}) private deleteModal: TemplateRef<any>;



	// tableOptions: DataTables.Settings = {
	//   pagingType: 'full_numbers',
	//   dom: 'tipr',
	//   columnDefs: [
	//     { targets: [1, 2, 3, 4], orderable: false },
	//     { targets: [0], orderable: true }
	//   ],
	//   order: [0, 'asc'],
	//   drawCallback: (settings) => {
	//     let total = settings.aoData.length;
	//     let length = settings._iDisplayLength;
	//     if (total <= length) {
	//       $(settings.nTableWrapper).find('#devicegrp-table').addClass('disabled');
	//     }
	//   }
	// };

	tableOptions: DataTables.Settings = {
		searching: false,
		lengthChange: false,
	};
	//dtInstance: Promise < DataTables.Api > ;revert

	//  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective; old

	//  @ViewChild('dtdynamicdisc') dtdynamicdisc: DataTableDirective;


	@ViewChildren(DataTableDirective)
	dtElements: QueryList<DataTableDirective>;

	dtInstance: Promise<DataTables.Api>;
	dtTrigger: Subject<any> = new Subject();
	DeviceCount: number | string;

	table_count: any;
	isTypeFor: any;
	isFilledRow = true;
	tooltipTitle: any;
	isNameError = false;
	btnDisabled = false;
	hasWriteAccess = false;
	hasScopeAccess = false;
	constructor(
		private translateService: TranslateService,
		private ssoService: SsoAuthService,
		private service: DeviceGroupService,
		private subService: DataServiceService,
		private dataservice: DataServiceService,
		private formBuilder: FormBuilder,
		private dialogService: NgbModal,
		private http: HttpClient,
		public cdr: ChangeDetectorRef,
		private router: Router,
		private route: ActivatedRoute,
		private IpSubnetCalculator: IpSubnetCalculatorService,
		private IPv6AddressService: IPv6AddressService,
		private _location: Location, private titleService: Title
	) {
		this.orgId = this.ssoService.getOrgId();
		// this.getDeviceCount();
		this.frTable = this.translateService.fr;
		this.esTable = this.translateService.es;
	}
	pageAvailable: boolean = false;
	editSystem: boolean = false;
	setTitle(url) {
		if (this.router.url.includes("/cco-foundation/foundation-configuration/configuration-prerequisites/device-groups")) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
		} else if (this.router.url.includes("/support/netops-management/operations/devices-groups"
		)) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
		} else if (this.router.url.includes("/cco/operations/cco-subscriber-operations/operations/devices-groups")) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Operations']} - ${this.language['Subscriber_Operations']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
		}
		else if (this.router.url.includes("/cco/operations/configuration/system-groups")) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
		} else if (this.router.url.includes("/cco/operations/configuration/devices-group/workflow")) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Configuration']} - ${this.language['Operations']} - ${this.language['Operations']} - ${this.language['Calix Cloud']}`);
		} else if (this.router.url.includes('/support/netops-management/devices-groups')) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Operations']} - ${this.language['NetOps']} - ${this.language['Service']} - ${this.language['Calix Cloud']}`);
		} else if (this.router.url.includes('/cco-foundation/foundation-configuration/device-groups')) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
		} else if (this.router.url.includes('/cco-foundation/foundation-configuration/device-groups')) {
			this.titleService.setTitle(`${this.language['System Groups']} - ${this.language['Workflow Prerequisites']} - ${this.language['configuration']} - ${this.language['Deployment']} - ${this.language['Calix Cloud']}`);
		}
	}
	ngOnInit(): void {
		this.language = this.translateService.defualtLanguage;
		let scopes = this.ssoService.getScopes();
		if (!this.router.url.includes('cco-foundation') && !this.router.url.includes('/cco/operations/configuration')) {

			if (environment.VALIDATE_SCOPE) {
				let scopeFlagCheck: any = {};
				scopes['cloud.rbac.csc.netops.operations.device_group'] = scopes['cloud.rbac.csc.netops.operations.device_group'] ? scopes['cloud.rbac.csc.netops.operations.device_group'] : [];
				if (scopes['cloud.rbac.csc.netops.operations.device_group'].length) {
					this.hasScopeAccess = true;
				}
				scopes['cloud.rbac.csc.netops.operations.workflow'] = scopes['cloud.rbac.csc.netops.operations.workflow'] ? scopes['cloud.rbac.csc.netops.operations.workflow'] : [];
				scopes['cloud.rbac.csc.netops.operations.profiles'] = scopes['cloud.rbac.csc.netops.operations.profiles'] ? scopes['cloud.rbac.csc.netops.operations.profiles'] : [];
				scopes['cloud.rbac.csc.netops.operations.sw_images'] = scopes['cloud.rbac.csc.netops.operations.sw_images'] ? scopes['cloud.rbac.csc.netops.operations.sw_images'] : [];
				scopes['cloud.rbac.csc.netops.operations.config_files'] = scopes['cloud.rbac.csc.netops.operations.config_files'] ? scopes['cloud.rbac.csc.netops.operations.config_files'] : [];

				scopes['cloud.rbac.csc.netops.operations.perf_testing'] = scopes['cloud.rbac.csc.netops.operations.perf_testing'] ? scopes['cloud.rbac.csc.netops.operations.perf_testing'] : [];

				scopes['cloud.rbac.csc.netops.config.dial_plan'] = scopes['cloud.rbac.csc.netops.config.dial_plan'] ? scopes['cloud.rbac.csc.netops.config.dial_plan'] : [];

				if (scopes && scopes['cloud.rbac.csc.netops.operations.device_group'] !== undefined && scopes['cloud.rbac.csc.netops.operations.device_group'].indexOf('read') !== -1) {
					scopeFlagCheck.showDeviceGrps = true;
				}

				if (scopes && scopes['cloud.rbac.csc.netops.operations.sw_images'] !== undefined && scopes['cloud.rbac.csc.netops.operations.sw_images'].indexOf('read') !== -1) {
					scopeFlagCheck.showSoftwareImage = true;
				}

				if (scopes && (scopes['cloud.rbac.csc.netops.operations.workflow'] !== undefined && scopes['cloud.rbac.csc.netops.operations.workflow'].indexOf('read') !== -1)) {
					scopeFlagCheck.showWorkFlow = true;
				}

				if (scopes && (scopes['cloud.rbac.csc.netops.operations.profiles'] !== undefined && scopes['cloud.rbac.csc.netops.operations.profiles'].indexOf('read') !== -1)) {
					scopeFlagCheck.showProfiles = true;
				}

				if (scopes && (scopes['cloud.rbac.csc.netops.operations.config_files'] !== undefined && scopes['cloud.rbac.csc.netops.operations.config_files'].indexOf('read') !== -1)) {
					scopeFlagCheck.showConfigFiles = true;
				}

				if (scopes && (scopes['cloud.rbac.csc.netops.config.dial_plan'] !== undefined && scopes['cloud.rbac.csc.netops.config.dial_plan'].indexOf('read') !== -1)) {
					scopeFlagCheck.showDialPlan = true;
				}

				if (scopes && (scopes['cloud.rbac.csc.netops.operations.perf_testing'] !== undefined && scopes['cloud.rbac.csc.netops.operations.perf_testing'].indexOf('read') !== -1)) {
					scopeFlagCheck.showPerfTest = true;
				}

				if (scopeFlagCheck.showDeviceGrps) { }
				else if (scopeFlagCheck.showProfiles) { this.router.navigate(['./support/netops-management/operations/profiles']) }
				else if (scopeFlagCheck.showConfigFiles) { this.router.navigate(['./support/netops-management/operations/configuration-files-list']) }
				else if (scopeFlagCheck.showSoftwareImage) { this.router.navigate(['./support/netops-management/operations/software-images-list']) }
				else if (scopeFlagCheck.showWorkFlow) { this.router.navigate(['./support/netops-management/operations/workflows']) }
				else if (scopeFlagCheck.showPerfTest && this.ssoService.getCscType() !== 'DME') { this.router.navigate(['./support/netops-management/operations/performance-testing']) }


				scopes['cloud.rbac.csc.netops.operations.device_group'] = scopes['cloud.rbac.csc.netops.operations.device_group'] ? scopes['cloud.rbac.csc.netops.operations.device_group'] : [];
				if (scopes && (scopes['cloud.rbac.csc.netops.operations.device_group'] && scopes['cloud.rbac.csc.netops.operations.device_group'].indexOf('write') !== -1)) {
					this.hasWriteAccess = true;
				}
			} else {
				this.hasWriteAccess = true;
				this.hasScopeAccess = true;
			}
		} else if (this.router.url.includes('cco/operations/configuration')) {
			if (environment.VALIDATE_SCOPE) {
				if (scopes?.['cloud.rbac.coc.operations.configuration.systemgroups']?.length) {
					this.hasScopeAccess = true;
				}
				if (scopes && (scopes['cloud.rbac.coc.operations.configuration.systemgroups']?.includes('write'))) {
					this.hasWriteAccess = true;
				}
			} else {
				this.hasWriteAccess = true;
				this.hasScopeAccess = true;
			}
		} else {
			if (environment.VALIDATE_SCOPE) {
				scopes['cloud.rbac.foundation.configurations'] = scopes['cloud.rbac.foundation.configurations'] ? scopes['cloud.rbac.foundation.configurations'] : [];
				if (scopes['cloud.rbac.foundation.configurations'].length) {
					this.hasScopeAccess = true;
				}
				if (scopes && (scopes['cloud.rbac.foundation.configurations'].includes('write'))) {
					this.hasWriteAccess = true;
				}
			} else {
				this.hasWriteAccess = true;
				this.hasScopeAccess = true;
			}
		}

		if (!this.hasScopeAccess) {
			this.ssoService.setPageAccess(false);
			return;
		}

		let id = this.route.snapshot.paramMap.get("id");
		if (id) {
			this.loading = true;
			this.editSystem = true;
			this.deviceGroupId = id;
			this.getDeviceType(0);

			//this.displayEditGroup(id);
		} else {
			this.onClickPlusSymbol(0);
			// this.GetDevice_Type(-1);
			this.GetabList()
			// this.getList();
		}

		if (history.state.retainApproval) this.deleteDeviceGrp(history.state.deletedata);
		//this.tableRender()
		this.dataAvailable = false;
		//this.RulesArray[0]=[]
		//this.getDeviceGrpData();



		this.formGrouping({});

		this.setTitle(this.router.url);
		this.languageSubject = this.translateService.selectedLanguage.subscribe(data => {

			this.language = data;
			this.setTitle(this.router.url);
			if (this.tableCountsDeviceGrpInfo) {
				const distempObj = {
					_iDisplayStart: this.tableCountsDeviceGrpInfo.start,
					_iDisplayLength: this.tableCountsDeviceGrpInfo.displayCount,
					_iRecordsDisplay: this.tableCountsDeviceGrpInfo.displayed,
					_iRecordsTotal: this.tableCountsDeviceGrpInfo.total,
					oPreviousSearch: {
						sSearch: this.tableCountsDeviceGrpInfo.searchText
					}
				};
				this.changeTableStatusLanguageDeviceGrpInfo(distempObj)
			}
			if (this.tableCountsUnDic) {
				const unDistempObj = {
					_iDisplayStart: this.tableCountsUnDic.start,
					_iDisplayLength: this.tableCountsUnDic.displayCount,
					_iRecordsDisplay: this.tableCountsUnDic.displayed,
					_iRecordsTotal: this.tableCountsUnDic.total,
					oPreviousSearch: {
						sSearch: this.tableCountsUnDic.searchText
					}
				};
				this.changeTableStatusLanguageUnDisc(unDistempObj);
			}
			if (this.tableCountsDeviceGroup) {
				const unDistempObj = {
					_iDisplayStart: this.tableCountsDeviceGroup.start,
					_iDisplayLength: this.tableCountsDeviceGroup.displayCount,
					_iRecordsDisplay: this.tableCountsDeviceGroup.displayed,
					_iRecordsTotal: this.tableCountsDeviceGroup.total,
					oPreviousSearch: {
						sSearch: this.tableCountsDeviceGroup.searchText
					}
				};
				this.changeTableStatusLanguageDeviceGroup(unDistempObj);
			}
			if (this.tableStaticDisc) {
				const staticDistempObj = {
					_iDisplayStart: this.tableStaticDisc.start,
					_iDisplayLength: this.tableStaticDisc.displayCount,
					_iRecordsDisplay: this.tableStaticDisc.displayed,
					_iRecordsTotal: this.tableStaticDisc.total,
					oPreviousSearch: {
						sSearch: this.tableStaticDisc.searchText
					}
				};
				this.changeTableStatusLanguageStaticDisc(staticDistempObj);
			}




			; if (!this.static && this.Disc_count) this.redraw();
			this.dynamic = [{
				id: 'dynamic',
				name: this.language['Dynamic']
			},
			{
				id: 'static',
				name: this.language['Static']
			}
			];
			// this.ErrorMessage = this.language['Error! All Rules must be complete and a minimum of one is required.'];
			this.errMsg = this.language['Are you sure you want to delete Device Group'];

		});

		if (this.language) {
			this.pageAvailable = true;
		}


		this.dynamic = [{
			id: 'dynamic',
			name: this.language['Dynamic']
		},
		{
			id: 'static',
			name: this.language['Static']
		}
		];
		if (this.router.url.includes('devices-groups-add') || this.router.url.includes('device-groups-add') || this.router.url.includes('system-groups/add')) {
			this.loading = true;
			this.isAddGroupForm = false
			this.isAddTable = true
			this.ishidebtn = false
			this.Is_Update = false;
			this.RulesArray = [];
			this.submitted = false;
			this.Rule_err = false;
			this.deletedata = "";
			this.createDeviceGroup.reset();
			this.DiscoveredTableData = [];
			//  this.dtTrigger.next();
			this.static = false;
			this.Disc_count_static = false;
			this.edit_key = [];
			this.UnDisc_count_static = false;
			this.Disc_count = false;
			this.is_staticenable = false;
			this.IsStatic = false;
			this.DiscoveredTableData_static = [];
			this.groupType = "dynamic";
			this.createDeviceGroup.controls.type.setValue("dynamic")
			this.createDeviceGroup.controls.allowInheritance.setValue(true);
		}
		if (this.router.url.includes('devices-groups-workflow') || this.router.url.includes('device-groups-workflow') || this.router.url.includes('devices-group/workflow')) {
			this.loading = true;
			this.ishidebtn = false
			this.isAddTable = true
			this.isAddGroupForm = true
			this.workflowdetails = true
			this.systemGroupId = sessionStorage.getItem('workflowid')
			this.groupName = sessionStorage.getItem('workflowName')
			this.getWorkflows()
		}
	}

	redraw() {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.draw();
		});
	}


	formGrouping(input) {
		this.createDeviceGroup = this.formBuilder.group({
			name: [input.name || '', Validators.required],
			description: [input.description || ''],
			type: [input.type || ''],
			allowInheritance: [input.allowInheritance || ''],
			cpeFilter: [input.cpeFilter || ''],
		});


		// this.createDeviceGroup.controls.cpeFilter=this.Rulemodel1

	}

	get f() {
		return this.createDeviceGroup.controls;
	}




	getDeviceCount() {
		this.allDeviceGrpSubscribe = this.service.getDeviceGoupCount(this.orgId).subscribe((res: any) => {
			this.DeviceCount = res.count;

		}, (err: HttpErrorResponse) => {

			this.pageErrorHandle(err);
		})




	}

	countSubscribe: any;
	countDevicegroup: any;
	listSubscribe: any;
	getList(): any {
		this.RulesArray = [];
		setTimeout(() => {
			this.showSuccess = false;
			this.successMsg = "";
		}, 5000);
		if (this.deviceGroupId) {
			this.ssoService.redirectByUrl([
				'/support/netops-management/operations/devices-groups',
				'cco/operations/cco-system-operations/device-groups',
				'cco-foundation/foundation-configuration/configuration-prerequisites/device-groups',
				'/cco/operations/cco-subscriber-operations/operations/devices-groups',
			]);
			//this.router.navigate(['/support/netops-management/operations/devices-groups']);
			return;
		}
		this.GetDevice_Type(-1);
		this.loading = true;
		this.countSubscribe = this.service.getDeviceGoupCount(this.ssoService.getOrgId()).subscribe((json: any) => {
			let count = json.count
			this.listSubscribe = this.service.getDeviceGoupList(this.ssoService.getOrgId(), count).subscribe((data: any) => {
				this.DeviceTableData = data;
				this.loading = false;
			}, (err: any) => {

				this.pageErrorHandle(err);
			})
		}, (err: any) => {

			this.pageErrorHandle(err);
		})
	}


	searchurl;
	GetabList() {
		this.RulesArray = [];
		setTimeout(() => {
			this.showSuccess = false;
			this.successMsg = "";
		}, 5000);
		if (this.deviceGroupId) {
			this.ssoService.redirectByUrl([
				'/support/netops-management/operations/devices-groups',
				'cco/operations/cco-system-operations/device-groups',
				'cco-foundation/foundation-configuration/configuration-prerequisites/device-groups',
				'/cco/operations/cco-subscriber-operations/operations/devices-groups',
			]);
			//this.router.navigate(['/support/netops-management/operations/devices-groups']);
			return;
		}
		// this.GetDevice_Type(-1);
		this.loading = true;
		this.searchurl = `${environment.SUPPORT_URL}/netops-device/group?${this.orgId}`;
		const that = this;
		this.dtOptionsDeviceGroup = {
			pagingType: "full_numbers",
			pageLength: 20,
			responsive: true,
			serverSide: true,
			processing: false,
			searching: false,
			lengthChange: false,
			dom: 'tipr',
			ajax: (dataTablesParameters: any, callback) => {
				this.loading = true;
				this.sortBy = dataTablesParameters.order[0].column;
				this.sortType = dataTablesParameters.order[0].dir;
				let apiCalls = [];
				let searchUrl = `${environment.SUPPORT_URL}/netops-device/group?${this.ssoService.getOrg(this.orgId)}`

				if (String(this.searchText)) {
					apiCalls.push(
						that.http.get(searchUrl + "skip=" + dataTablesParameters.start + "&limit=" + dataTablesParameters.length + "&deviceId=" + this.searchText + (this.router?.url?.includes('support/netops-management/') ? "&excludeOnBoot=true" : "&excludeOnBoot=false")),
						this.service.getDeviceGoupsearchCount(this.orgId, this.searchText)
					);
				} else {
					apiCalls.push(
						that.http.get(searchUrl + "skip=" + dataTablesParameters.start + "&limit=" + dataTablesParameters.length + (this.router?.url?.includes('support/netops-management/') ? "&excludeOnBoot=true" : "&excludeOnBoot=false")),
						this.service.getDeviceGoupCount(this.orgId)
					);
				}

				forkJoin(apiCalls).subscribe(([listres, countres]) => {
					if (countres) {
						this.DeviceCount = countres['count'];
					}
					if (listres) {
						this.DeviceTableData = this.sortData(listres, that.sortBy, that.sortType);
						this.loading = false;
					}
					callback({
						recordsTotal: this.DeviceCount,
						recordsFiltered: this.DeviceCount,
						data: []
					});
				}, (err) => {
					this.loading = false;
				});
			}, drawCallback: (settings) => {
				this.changeTableStatusLanguageDeviceGroup(settings);
				let total = settings._iRecordsDisplay; // for server side rendering
				let length = settings._iDisplayLength;
				if (total <= length) {
					$(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
				} else {
				}
			},
			columns: [{
				data: "name"
			},
			{
				data: "description",
				searchable: false
			},
			{
				data: "type",
				searchable: false
			}
			]

		};

	}




	sortData(data, by, type): any {
		let sorted = [];
		if (by == 0) {
			sorted = this.sortByColumn(data, type, 'name');
		} else if (by == 1) {
			sorted = this.sortByColumn(data, type, 'description');
		} else if (by == 2) {
			sorted = this.sortByColumn(data, type, 'type');
		}
		return sorted;
	}

	sortByColumn(data, type, column): any {
		data.sort((a, b) => {
			var nameA = a[column] ? a[column].toUpperCase() : '';
			var nameB = b[column] ? b[column].toUpperCase() : '';
			if (type == 'asc') {
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
			} else {
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
			}
			// names must be equal
			return 0;
		});

		return data;
	}
	/*Need to implement server side datatable */




	// redraw() {
	//   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
	//     dtInstance.draw();
	//   });
	// }

	// redraw_dynamic_disc() {
	//   this.dtdynamicdisc.dtInstance.then((dtInstance: DataTables.Api) => {
	//     dtInstance.draw();
	//   });
	// }



	redrawnew() {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.GetabList();
		});
	}




	deleteDeviceGrp(item: any): void {
		this.loading = true
		this.deletedata = item;
		this.modalTitle = 'Delete Device Group';
		this.modalname = this.deletedata.name;
		this.modelType = this.deletedata.type
		this.workflowcount = this.deletedata.completedCount
		this.getGroupMemberCount(item)
		$("html, body").animate({ scrollTop: 0 }, "slow");
		// this.showWarningMsg = true

		// this.closeModal();
		// this.modalRef = this.dialogService.open(this.deleteModal);
		setTimeout(() => {
			$('.workflowcountclass').off();
			$('.workflowcountclass').on('click', () => this.workFlowMenbers())
		}, 1000);

		// $('#workflowcountid').off();
		// $('#workflowcountid').on('click', () => this.workFlowMenbers())
	}

	getGroupMemberCount(item: any) {
		this.loading = true
		this.deletedata = item;
		this.groupMemberCount = this.service.getDeviceMemberCount(this.ssoService.getOrgId(), this.deletedata._id).subscribe((json: any) => {
			this.MemberCount = json.count
			this.modalInfo = this.language.deviceGroupWarrningMsg(this.modalname, this.MemberCount, this.workflowcount)
			this.showWarningMsg = true
			this.loading = false
		}, (err: HttpErrorResponse) => {
			this.pageErrorHandle(err);
			this.isError = true
			this.loading = false
		})
	}


	confirmDeleteSecleted(): void {
		// this.closeModal();
		this.loading = true;
		this.btnDisabled = true;
		this.DeleteDeviceGrpSubscribe = this.service.DeleteDeviceGoupList(this.orgId, this.deletedata._id, this.forceDelete).subscribe((res: any) => {
			if (res) {
				this.getDeviceCount();
				this.rerender(1);
				this.loading = false;
				this.GetabList();
				this.btnDisabled = false;
				this.deletedata = "";
			}
		}, (err: HttpErrorResponse) => {
			this.loading = false;
			this.btnDisabled = false;
			this.deletedata = "";
			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		}, () => {
			this.btnDisabled = false;
			this.deletedata = "";
			this.showWarningMsg = false
			this.loading = false;
		});
		// this.getDeviceCount()
		// this.GetabList()
	}

	closeModal(): void {
		// this.deletedata = "";
		this.showWarningMsg = false
		if (this.modalRef) {
			this.modalRef.close();
		}
	}



	// rerender(): void {
	//     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
	//         // Destroy the table first
	//         dtInstance.destroy();
	//         this.dtTrigger.next();
	//     });
	// }




	setTableOptions(type?: string) {
		this.tableOptions = {
			pagingType: 'full_numbers',
			pageLength: 2,
			//searching: false,
			dom: 'tipr',
			columnDefs: [{
				targets: [1, 2, 3, 4],
				orderable: false
			},
			{
				targets: [0],
				orderable: true
			}
			],
			order: [],
			drawCallback: (settings) => {
				let total = settings.aoData.length;
				let length = settings._iDisplayLength;
				if (total <= length) {
					$(settings.nTableWrapper).find('#devicegrp-table').addClass('disabled');
				}
			}
		};
	}


	changeType(type: any) {
		this.isTypeFor = type.target.value;
		if (type.target.value == 'static') {
			this.IsStatic = true;
			this.static = true;
			this.Disc_count_static = false;
			this.CallDiscoveredDevice();
			this.dtOptionsstaticUndis = {
				paging: false,
				// pagingType: "full_numbers",
				// pageLength: 2,
				lengthChange: false,
				searching: false,
			}
			setTimeout(() => {
				this.undiscoveredDtTrigger.next();
			}, 5000);


			this.dtOptionsstaticdis = {}

			setTimeout(() => {
				this.staticdiscoveredDtTrigger.next();
			}, 500);


		} else {
			this.IsStatic = false;
			this.static = false;
			this.static_undisc = false;
		}
	}

	Rule1change(index: any) {
		if (this.RulesArray[index].rule1) {
			return index
		}

	}

	getSelectedRules(): any {
		let params = {
			rule1: [],
			rule2: [],
			rule3: []
		};
		if (this.RulesArray.length) {
			for (let i = 0; i < this.RulesArray.length; i++) {
				params['rule1'].push(this.RulesArray[i].rule1);
				params['rule2'].push(this.RulesArray[i].rule2);
				params['rule3'].push(this.RulesArray[i].rule3);

			}
		}

		return params;
	}


	Rule1ChangeVal(index: any, dynamic?: any) {
		this.Rule_err = false;
		let validations = {
			modelName: ["manufacturer"],
			softwareVersion: ["modelName", "manufacturer"],
			hardwareVersion: ["modelName", "manufacturer"],
			wanAccessType: ["modelName"],
			opMode: ["manufacturer"]

		}

		if (!this.RulesArray[index].rule1) {
			this.RulesArray[index].rule2 = '';
			//this.RulesArray[index].rule3 = '';
			return;
		}

		if (index && this.RulesArray[index].rule1 === "modelName" && this.RulesArray[index + 1] && this.RulesArray[index + 1].rule1 && !dynamic) {
			this.FilterDevice(index - 1);
			return;
		}

		//CCL-23416
		if (!validations[this.RulesArray[index].rule1]) {
			this.RulesArray[index].rule2 = '';
			this.RulesArray[index].rule3 = '';

			return;
		}
		let params = this.getSelectedRules();
		let rule1Params = params['rule1'];

		this.rule2items = {
			"manufacturer": [{
				id: '',
				name: ''
			}, {
				id: 'Equals',
				name: 'Equals'
			},
			{
				id: '$ne',
				name: 'Not Equal'
			}

			],
			"modelName": [{
				id: '',
				name: ''
			}, {
				id: 'Equals',
				name: 'Equals'
			},
			{
				id: '$ne',
				name: 'Not Equal'
			},
			{
				id: '$in',
				name: 'In'
			}
			],
			"softwareVersion": [{
				id: '',
				name: ''
			}, {
				id: 'Equals',
				name: 'Equals'
			},
			{
				id: '$ne',
				name: 'Not Equal'
			},
			{
				id: '$in',
				name: 'In'
			}
			],
			"hardwareVersion": [{
				id: '',
				name: ''
			}, {
				id: 'Equals',
				name: 'Equals'
			},
			{
				id: '$ne',
				name: 'Not Equal'
			},
			{
				id: '$in',
				name: 'In'
			}
			],
			"serialNumber": [{
				id: '',
				name: ''
			},
			{
				id: '$regex',
				name: 'WildCard'
			}
			],
			"normalizedIpAddress": [{
				id: '',
				name: ''
			},
			{
				id: '$subnets',
				name: 'In Subnet'
			}
			],
			"registrationId": [{
				id: '',
				name: ''
			},
			{
				id: '$regex',
				name: 'WildCard'
			}
			],
			"wanAccessType": [{
				id: '',
				name: ''
			},
			{
				id: 'Equals',
				name: 'Equals'
			}
			],
			"opMode": [{
				id: 'Equals',
				name: 'Equals'
			}],
		}

		if (this.RulesArray && validations[this.RulesArray[index].rule1]) {
			for (let i = 0; i < validations[this.RulesArray[index].rule1].length; i++) {
				let element = validations[this.RulesArray[index].rule1][i];
				if (rule1Params.indexOf(element) === -1) {
					let temp = this.findObjectByKey(element);
					this.Rule_err = true;

					this.ErrorMessage = `${this.language["Error! missing cascade attributes:"]} ${temp.name}`;

					this.rule2items[this.RulesArray[index].rule1] = [];
					this.RulesArray[index].rule2 = '';
					this.RulesArray[index].rule3 = '';
					break;

				}

			}

			if (this.Rule_err) {
				return;
			}

		}


		this.indexlength = index;
		if (this.RulesArray.length >= 1) {
			if ((this.RulesArray.filter(el => (el.rule1 === "modelName")).length == 0) == true) {
				if (this.RulesArray[index].rule1 == 'softwareVersion' || this.RulesArray[index].rule1 == 'hardwareVersion' || this.RulesArray[index].rule1 == 'wanAccessType') {
					this.Rule_err = true;


					this.ErrorMessage = "Error! missing cascade attributes:Model";

					this.rule2items[this.RulesArray[index].rule1] = [];
					this.RulesArray[index].rule2 = '';
					this.RulesArray[index].rule3 = '';
				} else {
					this.ErrorMessage = "";
					//this.createDeviceGroup.setErrors({ 'invalid': true });
					this.Rule_err = false;

				}
			} else if ((this.RulesArray.filter(el => (el.rule1 === "modelName")).length == 0) == false) {
				this.ErrorMessage = "";
				// this.createDeviceGroup.setErrors({ 'invalid': true });
				this.Rule_err = false;

			}
			if ((this.RulesArray.filter(el => (el.rule1 === "manufacturer")).length == 0) == true) {

				if ((this.RulesArray[index].rule1 == 'modelName') || (this.RulesArray[index].rule1 == 'opMode')) {
					this.Rule_err = true;
					this.ErrorMessage = "Error! missing cascade attributes:Manufacturer";

					this.rule2items[this.RulesArray[index].rule1] = [];
					this.RulesArray[index].rule2 = '';
					this.RulesArray[index].rule3 = '';
				} else {

					this.ErrorMessage = "";
					//this.createDeviceGroup.setErrors({ 'invalid': true });
					this.Rule_err = false;

				}
			}
		}
		if ((this.RulesArray.filter(el => (el.rule1 === "manufacturer")).length == 1) && (this.RulesArray.filter(el => (el.rule1 === "modelName")).length == 1)) {
			// if (this.RulesArray.filter(el => (el.rule1 === "wanAccessType")).length == 1) {
			// 	this.Rule_err = true;
			// 	this.ErrorMessage = "Error! Wan Access Type Not Supported By Specified Model Name";
			// 	this.rule2items[this.RulesArray[index].rule1] = [];
			// 	this.RulesArray[index].rule2 = '';
			// 	this.RulesArray[index].rule3 = '';
			// }

			if (rule1Params.indexOf("wanAccessType") !== -1 && !this.supportWanAccessType()) {
				this.Rule_err = true;
				this.ErrorMessage = "Error! Wan Access Type Not Supported By Specified Model Name";

				this.rule2items[this.RulesArray[index].rule1] = [];
				this.RulesArray[index].rule2 = '';
				this.RulesArray[index].rule3 = '';

			}
		}
		if (this.RulesArray.length == 1) {
			if (this.RulesArray.filter(el => (el.rule1 === "softwareVersion")).length == 1) {
				this.Rule_err = true;
				this.ErrorMessage = "Error! missing cascade attributes:Model";
				this.rule2items[this.RulesArray[index].rule1] = [];
				this.RulesArray[index].rule2 = '';
				this.RulesArray[index].rule3 = '';
			}
			if (this.RulesArray.filter(el => (el.rule1 === "hardwareVersion")).length == 1) {
				this.Rule_err = true;
				this.ErrorMessage = "Error! missing cascade attributes:Model";
				this.rule2items[this.RulesArray[index].rule1] = [];
				this.RulesArray[index].rule2 = '';
				this.RulesArray[index].rule3 = '';
			}
			if (this.RulesArray.filter(el => (el.rule1 === "wanAccessType")).length == 1) {
				this.Rule_err = true;
				this.ErrorMessage = "Error! missing cascade attributes:Model";

				this.rule2items[this.RulesArray[index].rule1] = [];
				this.RulesArray[index].rule2 = '';
				this.RulesArray[index].rule3 = '';
			}
		}
	}

	emptyRulesRow(index): any {
		if (this.RulesArray[index].rule1 !== 'modelName') {
			this.rule2items[this.RulesArray[index].rule1] = [];
			this.RulesArray[index].rule2 = '';
			this.RulesArray[index].rule3 = '';

		}
	}

	dynamicTitle(title: any) {
		if (title == 'serialNumber') {
			this.tooltipTitle = "Only alphanumeric characters and asterisk allowed,e.g:CXNK001CD*";
		} else if (title == 'normalizedIpAddress') {
			this.tooltipTitle = "CIDR address seperated by comma,e.g:192.168.3.0/24,192.168.4.0/24";
		} else if (title == 'registrationId') {
			this.tooltipTitle = "Only alphanumeric characters and asterisk allowed,e.g:210*";
		} else {
			this.tooltipTitle = "";
		}
	}

	Rule2change(index: any) {

		if (this.RulesArray[index].rule2) {
			return index
		}
	}

	Rule3select(index: any) {
		if (this.RulesArray[index].rule3) {
			if (this.RulesArray[index].rule2 == "$in") {
				this.RulesArray[index].rule3 = [[this.rule3items[this.RulesArray[index].rule1][0].id][0]];
			} else {
				this.RulesArray[index].rule3 = [this.rule3items[this.RulesArray[index].rule1][0].id][0];
			}
		}
	}


	indexlength: any;
	CheckValidationErr(index: any) {
		this.Rule_err = false;
		let validations = {
			modelName: ["manufacturer"],
			softwareVersion: ["modelName", "manufacturer"],
			hardwareVersion: ["modelName", "manufacturer"],
			wanAccessType: ["modelName"],
			opMode: ["manufacturer"]

		}

		let params = this.getSelectedRules();
		let rule1Params = params['rule1'];

		if (this.RulesArray && validations[this.RulesArray[index].rule1]) {
			for (let i = 0; i < validations[this.RulesArray[index].rule1].length; i++) {
				let element = validations[this.RulesArray[index].rule1][i];
				if (rule1Params.indexOf(element) === -1) {
					let temp = this.findObjectByKey(element);
					this.Rule_err = true;

					this.ErrorMessage = `Error! missing cascade attributes: ${temp.name}`;

					this.rule2items[this.RulesArray[index].rule1] = [];
					this.RulesArray[index].rule2 = '';
					this.RulesArray[index].rule3 = '';
					break;

				}

			}

			if (this.Rule_err) {
				return;
			}

		}

		//check if special characters exist for fsan if so restrict
		// if (this.RulesArray[index]?.rule1 == 'serialNumber') {
		// 	if (this.RulesArray[index]?.rule3) {
		// 		let value = this.RulesArray[index]?.rule3;
		// 		if (!value.match(/^[a-z0-9*]+$/i)) {
		// 			this.ErrorMessage = "FSAN-Error! Rule FSAN contains invalid characters, only alphanumeric characters allowed.";
		// 			this.Rule_err = true;
		// 		}

		// 		return;
		// 	} else {
		// 		this.ErrorMessage = "";
		// 		this.Rule_err = false;

		// 		return;
		// 	}

		// }
		//check if special characters exist for fsan if so restrict
		if (this.RulesArray[index]?.rule1 == 'normalizedIpAddress') {

			if (this.RulesArray[index].rule3 && this.checkSubnet(this.RulesArray[index].rule3)) {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			} else {
				this.ErrorMessage = "Error! Rule WANIP contains invalid characters, only IPv4 or IPv6 CIDR address allowed(e.g 192.168.1.0/24,2001:db8:1234::/48)";
				this.Rule_err = true;

				return;
			}

		}
		//check if Rule manufacturer is not valid.
		if (this.RulesArray[index]?.rule1 == 'manufacturer') {
			if (this.RulesArray[index]?.rule2 == "" || !this.RulesArray[index]?.rule3) {
				this.ErrorMessage = "Error! Rule manufacturer is not valid.";
				this.Rule_err = true;

				return;
			} else {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			}
		}
		if (this.RulesArray[index]?.rule1 == 'modelName') {
			if (this.RulesArray[index]?.rule2 == "" || !this.RulesArray[index]?.rule3 || (this.RulesArray[index]?.rule2 == "$in" && !this.RulesArray[index]?.rule3?.length)) {
				this.ErrorMessage = "Error! Rule modelName is not valid.";
				// if (this.submitted) {
				// 	this.ErrorMessage = this.language['Error! All Rules must be complete and a minimum of one is required.'];
				// }
				this.Rule_err = true;

				return;
			} else {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			}
		}
		if (this.RulesArray[index]?.rule1 == 'softwareVersion') {
			if (this.RulesArray[index]?.rule2 == "" || !this.RulesArray[index]?.rule3 || (this.RulesArray[index]?.rule2 == "$in" && !this.RulesArray[index]?.rule3?.length)) {
				this.ErrorMessage = "Error! Rule softwareVersion is not valid.";
				this.Rule_err = true;
				// if (this.submitted) {
				// 	this.ErrorMessage = this.language['Error! All Rules must be complete and a minimum of one is required.'];
				// }

				return;
			} else {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			}
		}
		if (this.RulesArray[index]?.rule1 == 'hardwareVersion') {
			if (this.RulesArray[index]?.rule2 == "" || !this.RulesArray[index]?.rule3 || (this.RulesArray[index]?.rule2 == "$in" && !this.RulesArray[index]?.rule3?.length)) {
				this.ErrorMessage = "Error! Rule hardwareVersion is not valid.";
				// if (this.submitted) {
				// 	this.ErrorMessage = this.language['Error! All Rules must be complete and a minimum of one is required.'];
				// }
				this.Rule_err = true;

				return;
			} else {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			}
		}
		if (this.RulesArray[index]?.rule1 == 'serialNumber') {
			if (this.RulesArray[index]?.rule2 == "" || !this.RulesArray[index]?.rule3) {
				this.ErrorMessage = "Error! Rule serialNumber is not valid.";
				this.Rule_err = true;

				// if (this.submitted) {
				// 	this.ErrorMessage = this.language['Error! All Rules must be complete and a minimum of one is required.'];
				// }

				return;
			} else if (this.RulesArray[index]?.rule3 == "") {
				this.ErrorMessage = "Error! Rule FSAN contains invalid characters, only alphanumeric characters allowed.";
				this.Rule_err = true;

				return;
			} else if (this.RulesArray[index]?.rule3) {
				let value = this.RulesArray[index]?.rule3;
				if (!value.match(/^[a-z0-9*]+$/i)) {
					this.ErrorMessage = "FSAN-Error! Rule FSAN contains invalid characters, only alphanumeric characters allowed.";
					this.Rule_err = true;

					return;
				}
			} else {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			}

		}
		if (this.RulesArray[index]?.rule1 == 'registrationId') {
			if (this.RulesArray[index]?.rule2 == "") {
				this.ErrorMessage = "Error! Rule registrationId is not valid.";
				this.Rule_err = true;

				return;
			} else if (this.RulesArray[index]?.rule3) {
				let value = this.RulesArray[index]?.rule3;
				if (!value.match(/^[a-z0-9*]+$/i)) {
					this.ErrorMessage = "RegistrationId-Error! Rule RegistrationId contains invalid characters, only alphanumeric characters allowed.";
					this.Rule_err = true;

					return;
				}
			} else {
				this.ErrorMessage = "";
				this.Rule_err = false;

				return;
			}
		}

	}
	DropdownOrInput(index: any) {
		if (this.RulesArray[index].rule1 == 'manufacturer' ||
			this.RulesArray[index].rule1 == 'modelName' ||
			this.RulesArray[index].rule1 == 'softwareVersion' ||
			this.RulesArray[index].rule1 == 'hardwareVersion' ||
			this.RulesArray[index].rule1 == 'opMode' ||
			this.RulesArray[index].rule1 == 'wanAccessType') {
			return true;
		} else {
			return false;
		}
	}
	secondindex: any = 0;
	MultiOrSingle(index) {
		this.secondindex = index
		if (this.RulesArray[index].rule2 == '$in') {
			return true;
		} else {
			return false;
		}
	}
	json_payload: any;
	json_payload_submit: any;
	FilterDeviceType() {
		this.Get_payload();
		this.GetDevice_Type();
	}
	FilterDevice(index?: any, rule2?: boolean) {

		// setTimeout(function () {
		// 	$("#device-groups").trigger("click");
		// }, 1000);

		//document.getElementById("device-groups").click();



		//debugger

		if (this.RulesArray[index] && this.RulesArray[index].rule3) {
			// if (rule2) {
			// 	this.RulesArray[index].rule3 = this.rule3items[this.RulesArray[index].rule1] ? (this.rule3items[this.RulesArray[index].rule1][0] ? this.rule3items[this.RulesArray[index].rule1][0].id : '') : ''
			// }

		} else {
			this.RulesArray[index].rule3 = this.rule3items[this.RulesArray[index].rule1] ? (this.rule3items[this.RulesArray[index].rule1][0] ? this.rule3items[this.RulesArray[index].rule1][0].id : '') : ''
		}

		let skipApisForTypes = ["serialNumber", "normalizedIpAddress", "registrationId", "wanAccessType", "opMode"];

		if (skipApisForTypes.indexOf(this.RulesArray[index].rule1) === -1) {
			if (this.RulesArray.length > 1 && index) {
				if (skipApisForTypes.indexOf(this.RulesArray[index - 1].rule1) === -1) {
					if (!this.RulesArray[index - 1].rule3) {
						this.RulesArray[index]['rule3items'] = [];
						return;
					}
				}
			}
			setTimeout(() => {

				if (this.getParamsNew(index)) {
					//this.Get_payload();
					this.GetDevice_Type(index);

					//this.getDiscoveredDeviceCount();
				}

			}, 500);
		} else {
			if (this.RulesArray[index].rule3) {
				this.getDiscoveredDeviceCount();
			}

		}



	}
	CallDiscoveredDevice() {
		if (this.static) {
			this.RulesArray = [];
			this.Rule_err = false;
			this.RuleAtleastOne = false;
			this.ErrorMessage = "";
			if (this.deviceGroupId) {
				this.DeviceDiscoveredStatic();
			}

		} else if (this.RulesArray.length > 0 && this.RulesArray[0]['rule1'] && ((this.RulesArray[0]['rule2'] !== '$regex' && this.RulesArray[0]['rule3']) || this.RulesArray[0]['rule2'] == '$regex')) {
			this.Rule_err = false;
			this.RuleAtleastOne = false;
			this.ErrorMessage = "";
			this.getDiscoveredDeviceCount();
		} else {
			this.Rule_err = true;
			this.RuleAtleastOne = true;
			this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
		}
	}


	CheckAPIvalisempty() {
		var checkarr: any = [];
		for (var i = 0; i < this.RulesArray.length; i++) {
			if (this.RulesArray[i]["rule3"] != '') {
				checkarr.push(1)
			}
		}
		if (checkarr.length > 0) {
			return true;
		}
	}



	Get_payload() {
		this.json_payload = {
			"orgId": this.orgId
		};
		// this.CheckAPIvalisempty() == true;
		if (this.RulesArray.length || this.edit_key.length >= 1) {
			let manu_payload_arr: any = [];
			let model_payload_arr: any = [];
			let sftwr_payload_arr: any = [];
			let hrdwr_payload_arr: any = [];
			let fsanserial_payload_arr: any = [];
			let ipaddr_payload_arr: any = [];
			let regid_payload_arr: any = [];
			let mode_payload_arr: any = [];
			for (var i = 0; i < this.RulesArray.length; i++) {
				if (this.RulesArray[i]["rule1"] == 'manufacturer') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					// if (key == 'modelName') {
					// 	model_payload_arr.push(req);
					// }
					// if (key == 'softwareVersion') {
					// 	sftwr_payload_arr.push(req);
					// }
					// if (key == 'hardwareVersion') {
					// 	hrdwr_payload_arr.push(req);
					// }
					// if (key == 'serialNumber') {
					// 	fsanserial_payload_arr.push(req);
					// }
					// if (key == 'normalizedIpAddress') {
					// 	ipaddr_payload_arr.push(req);
					// }
					// if (key == 'registrationId') {
					// 	regid_payload_arr.push(req);
					// }
					// if (key == 'mode_payload_arr') {
					// 	mode_payload_arr.push(req);
					// }
				}

				if (this.RulesArray[i]["rule1"] == 'modelName') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
				if (this.RulesArray[i]["rule1"] == 'softwareVersion') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
				if (this.RulesArray[i]["rule1"] == 'hardwareVersion') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
				if (this.RulesArray[i]["rule1"] == 'serialNumber') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
				if (this.RulesArray[i]["rule1"] == 'normalizedIpAddress') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
				if (this.RulesArray[i]["rule1"] == 'registrationId') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
				if (this.RulesArray[i]["rule1"] == 'opMode') {
					var key = this.RulesArray[i]['rule1'];
					let req = {
						"ruletype": this.RulesArray[i]['rule2']
					}
					req[key] = this.RulesArray[i]['rule3'];
					if (key == 'manufacturer') {
						manu_payload_arr.push(req);
					}
					if (key == 'modelName') {
						model_payload_arr.push(req);
					}
					if (key == 'softwareVersion') {
						sftwr_payload_arr.push(req);
					}
					if (key == 'hardwareVersion') {
						hrdwr_payload_arr.push(req);
					}
					if (key == 'serialNumber') {
						fsanserial_payload_arr.push(req);
					}
					if (key == 'normalizedIpAddress') {
						ipaddr_payload_arr.push(req);
					}
					if (key == 'registrationId') {
						regid_payload_arr.push(req);
					}
					if (key == 'mode_payload_arr') {
						mode_payload_arr.push(req);
					}
				}
			}
			if (manu_payload_arr.length > 0) {
				//manufacture
				if (manu_payload_arr[0]['ruletype'] == "Equals") {
					this.json_payload['manufacturer'] = manu_payload_arr[0]['manufacturer']
				}
				if (manu_payload_arr[0]['ruletype'] == "$ne") {
					this.json_payload['manufacturer'] = {
						"$ne": manu_payload_arr[0]['manufacturer']
					}
				}

			}
			//modelname
			if (model_payload_arr.length > 0) {
				if (model_payload_arr[0]['ruletype'] == "Equals") {
					if (model_payload_arr[0]['modelName']) {
						this.json_payload['modelName'] = model_payload_arr[0]['modelName'].toString();
					}
				}
				if (model_payload_arr[0]['ruletype'] == "$ne") {
					if (model_payload_arr[0]['modelName']) {
						this.json_payload['modelName'] = {
							"$ne": model_payload_arr[0]['modelName'].toString()
						}
					}
				}

				if (model_payload_arr[0]['ruletype'] == "$in") {
					if (Array.isArray(model_payload_arr[0]['modelName'])) {
						this.json_payload['modelName'] = {
							"$in": model_payload_arr[0]['modelName']
						}
					} else {
						this.json_payload['modelName'] = {
							"$in": [model_payload_arr[0]['modelName']]
						}
					}
				}
			}

			//Software ver
			if (sftwr_payload_arr.length > 0) {
				if (sftwr_payload_arr[0]['ruletype'] == "Equals") {
					if (sftwr_payload_arr[0]['softwareVersion']) {
						this.json_payload['softwareVersion'] = sftwr_payload_arr[0]['softwareVersion'].toString();
					}
				}
				if (sftwr_payload_arr[0]['ruletype'] == "$ne") {
					if (sftwr_payload_arr[0]['softwareVersion']) {
						this.json_payload['softwareVersion'] = {
							"$ne": sftwr_payload_arr[0]['softwareVersion'].toString()
						}
					}
				}
				if (sftwr_payload_arr[0]['ruletype'] == "$in") {
					if (Array.isArray(sftwr_payload_arr[0]['softwareVersion'])) {
						this.json_payload['softwareVersion'] = {
							"$in": sftwr_payload_arr[0]['softwareVersion']
						}
					} else {
						this.json_payload['softwareVersion'] = {
							"$in": [sftwr_payload_arr[0]['softwareVersion']]
						}
					}
				}
			}

			//hardware version
			if (hrdwr_payload_arr.length > 0) {
				if (hrdwr_payload_arr[0]['ruletype'] == "Equals") {
					if (hrdwr_payload_arr[0]['hardwareVersion']) {
						this.json_payload['hardwareVersion'] = hrdwr_payload_arr[0]['hardwareVersion'].toString()
					}
				}
				if (hrdwr_payload_arr[0]['ruletype'] == "$ne") {
					if (hrdwr_payload_arr[0]['hardwareVersion']) {
						this.json_payload['hardwareVersion'] = {
							"$ne": hrdwr_payload_arr[0]['hardwareVersion'].toString()
						}
					}
				}
				if (hrdwr_payload_arr[0]['ruletype'] == "$in") {
					if (Array.isArray(hrdwr_payload_arr[0]['hardwareVersion'])) {
						this.json_payload['hardwareVersion'] = {
							"$in": hrdwr_payload_arr[0]['hardwareVersion']
						}
					} else {
						this.json_payload['hardwareVersion'] = {
							"$in": [hrdwr_payload_arr[0]['hardwareVersion']]
						}
					}
				}
			}

			//fsan serial"
			if (fsanserial_payload_arr.length > 0) {
				if (fsanserial_payload_arr[0]['ruletype'] == "$regex") {
					let value = fsanserial_payload_arr[0]['serialNumber'] ? fsanserial_payload_arr[0]['serialNumber'] : "";
					value = value.replace(/\*/g, '.*?');
					value = "^" + value + "$";

					// fsanserial_payload_arr[0]['serialNumber'] = fsanserial_payload_arr[0]['serialNumber'].replace(/\*/g, '.*?');
					// fsanserial_payload_arr[0]['serialNumber'] = "^" + fsanserial_payload_arr[0]['serialNumber'] + "$";
					this.json_payload['serialNumber'] = {
						"$regex": value
					}
				}
			}
			//wan ip
			if (ipaddr_payload_arr.length > 0) {
				if (ipaddr_payload_arr[0]['ruletype'] == "$subnets" || ipaddr_payload_arr[0]['ruletype'] == "Equals") {
					this.json_payload['normalizedIpAddress'] = ipaddr_payload_arr[0]['normalizedIpAddress'];
					// let split=ipaddr_payload_arr[0]['normalizedIpAddress'].split("/")[0]
					// let arr=split.split(".")
					// let ip=split.split(".")
					// let string1=ip[0]+'.'+ip[1]+'.'+ip[2]+'.'+'000'
					// let string2=ip[0]+'.'+ip[1]+'.'+ip[2]+'.'+'255'
					// let jsonpayload={"$gte":string1,"$lte":string2}
					// this.json_payload['normalizedIpAddress']={"$gte":string1,"$lte":string2};

				}
			}
			//registration id
			if (regid_payload_arr.length > 0) {
				if (regid_payload_arr[0]['ruletype'] == "$regex") {
					let value = regid_payload_arr[0]['registrationId'] ? regid_payload_arr[0]['registrationId'] : '';
					value = value.replace(/\*/g, '.*?');
					value = "^" + value + "$";

					// regid_payload_arr[0]['registrationId'] = regid_payload_arr[0]['registrationId'].replace(/\*/g, '.*?');
					// regid_payload_arr[0]['registrationId'] = "^" + regid_payload_arr[0]['registrationId'] + "$";
					this.json_payload['registrationId'] = {
						"$regex": value
					}
				}
			}
			//opmode
			if (mode_payload_arr.length > 0) {
				if (mode_payload_arr[0]['ruletype'] == "Equals") {
					this.json_payload['opMode'] = mode_payload_arr[0]['opMode'];
				}
			}
		}

		let submit_payload = {};
		if (this.submitted == true) {
			if (this.Rule_err) {
				return;
			}

			this.Rule_err = false;

			let manu_payload_arr: any = [];
			let model_payload_arr: any = [];
			let sftwr_payload_arr: any = [];
			let hrdwr_payload_arr: any = [];
			let fsanserial_payload_arr: any = [];
			let ipaddr_payload_arr: any = [];
			let regid_payload_arr: any = [];
			let mode_payload_arr: any = [];
			let wan_access_type_payload_arr: any = [];
			for (var i = 0; i < this.RulesArray.length; i++) {
				this.CheckValidationErr(i);

				if (this.Rule_err) {
					//this.submitted = false;
					return;
				}
				if (this.RulesArray[i]["rule1"] == 'manufacturer') {
					manu_payload_arr.push({
						"manufacturer": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}
				if (this.RulesArray[i]["rule1"] == 'modelName') {
					model_payload_arr.push({
						"modelName": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}
				if (this.RulesArray[i]["rule1"] == 'softwareVersion') {
					sftwr_payload_arr.push({
						"softwareVersion": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}
				if (this.RulesArray[i]["rule1"] == 'hardwareVersion') {
					hrdwr_payload_arr.push({
						"hardwareVersion": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}
				if (this.RulesArray[i]["rule1"] == 'serialNumber') {
					fsanserial_payload_arr.push({
						"serialNumber": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}
				if (this.RulesArray[i]["rule1"] == 'normalizedIpAddress') {
					let value = this.RulesArray[i]["rule3"];

					if (!this.checkSubnet(value)) {
						//Session.set(RULE_KEY_ERROR, Utils.getLabel("ruleWANIPContainsInvalidCharactersForIPv4OrIpv6"));
						return;
					}
					let ranges = this.toIpRange(value);
					let value_ = {};
					let rule: any;
					if (ranges.length > 1) {

						ranges = ranges.map((range: any) => {
							return { "normalizedIpAddress": range };
						});

						//rule["$or"] = ranges;

						ipaddr_payload_arr.push({
							//"$or": ranges,
							"normalizedIpAddress": ranges,
							"ruletype": this.RulesArray[i]['rule2'],
							"multiple": true
						});

					} else {
						//rule["normalizedIpAddress"] = ranges[0];

						ipaddr_payload_arr.push({
							"normalizedIpAddress": ranges[0],
							"ruletype": this.RulesArray[i]['rule2']
						});
					}

					// ipaddr_payload_arr.push({
					// 	"normalizedIpAddress": this.RulesArray[i]['rule3'],
					// 	"ruletype": this.RulesArray[i]['rule2']
					// });
				}
				if (this.RulesArray[i]["rule1"] == 'registrationId') {
					if (this.RulesArray[i]['rule3']) {
						regid_payload_arr.push({
							"registrationId": this.RulesArray[i]['rule3'],
							"ruletype": this.RulesArray[i]['rule2']
						});
					} else {
						regid_payload_arr.push({
							"registrationId": "",
							"ruletype": this.RulesArray[i]['rule2']
						});
					}

				}

				if (this.RulesArray[i]["rule1"] == 'opMode') {
					mode_payload_arr.push({
						"opMode": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}

				if (this.RulesArray[i]["rule1"] == 'wanAccessType') {
					wan_access_type_payload_arr.push({
						"wanAccessType": this.RulesArray[i]['rule3'],
						"ruletype": this.RulesArray[i]['rule2']
					});
				}
			}

			if (manu_payload_arr.length > 0) {
				//manufacture
				if (manu_payload_arr[0]['ruletype'] == "Equals") {
					submit_payload['manufacturer'] = manu_payload_arr[0]['manufacturer']
				}
				if (manu_payload_arr[0]['ruletype'] == "$ne") {
					submit_payload['manufacturer'] = {
						"$ne": manu_payload_arr[0]['manufacturer']
					}
				}

			}
			//modelname
			if (model_payload_arr.length > 0) {
				if (model_payload_arr[0]['ruletype'] == "Equals") {
					submit_payload['modelName'] = model_payload_arr[0]['modelName'].toString();
				}
				if (model_payload_arr[0]['ruletype'] == "$ne") {
					submit_payload['modelName'] = {
						"$ne": model_payload_arr[0]['modelName'].toString()
					}
				}

				if (model_payload_arr[0]['ruletype'] == "$in") {
					if (Array.isArray(model_payload_arr[0]['modelName'])) {
						submit_payload['modelName'] = {
							"$in": model_payload_arr[0]['modelName']
						}
					} else {
						submit_payload['modelName'] = {
							"$in": [model_payload_arr[0]['modelName']]
						}
					}
				}
			}

			//Software ver
			if (sftwr_payload_arr.length > 0) {
				if (sftwr_payload_arr[0]['ruletype'] == "Equals") {
					submit_payload['softwareVersion'] = sftwr_payload_arr[0]['softwareVersion'].toString();
				}
				if (sftwr_payload_arr[0]['ruletype'] == "$ne") {
					submit_payload['softwareVersion'] = {
						"$ne": sftwr_payload_arr[0]['softwareVersion'].toString()
					}
				}
				if (sftwr_payload_arr[0]['ruletype'] == "$in") {
					if (Array.isArray(sftwr_payload_arr[0]['softwareVersion'])) {
						submit_payload['softwareVersion'] = {
							"$in": sftwr_payload_arr[0]['softwareVersion']
						}
					} else {
						submit_payload['softwareVersion'] = {
							"$in": [sftwr_payload_arr[0]['softwareVersion']]
						}
					}
				}
			}

			//hardware version
			if (hrdwr_payload_arr.length > 0) {
				if (hrdwr_payload_arr[0]['ruletype'] == "Equals") {
					submit_payload['hardwareVersion'] = hrdwr_payload_arr[0]['hardwareVersion'].toString()
				}
				if (hrdwr_payload_arr[0]['ruletype'] == "$ne") {
					submit_payload['hardwareVersion'] = {
						"$ne": hrdwr_payload_arr[0]['hardwareVersion'].toString()
					}
				}
				if (hrdwr_payload_arr[0]['ruletype'] == "$in") {
					if (Array.isArray(hrdwr_payload_arr[0]['hardwareVersion'])) {
						submit_payload['hardwareVersion'] = {
							"$in": hrdwr_payload_arr[0]['hardwareVersion']
						}
					} else {
						submit_payload['hardwareVersion'] = {
							"$in": [hrdwr_payload_arr[0]['hardwareVersion']]
						}
					}
				}
			}

			//fsan serial"
			if (fsanserial_payload_arr.length > 0) {
				if (fsanserial_payload_arr[0]['ruletype'] == "$regex") {
					let value = fsanserial_payload_arr[0]['serialNumber'] ? fsanserial_payload_arr[0]['serialNumber'] : '';
					value = value.replace(/\*/g, '.*?');
					value = "^" + value + "$";
					submit_payload['serialNumber'] = {
						"$regex": value
					}
				}
			}
			//wan ip
			if (ipaddr_payload_arr.length > 0) {
				if (ipaddr_payload_arr[0]['ruletype'] == "$subnets" || ipaddr_payload_arr[0]['ruletype'] == "Equals") {

					if (ipaddr_payload_arr[0]['multiple']) {
						submit_payload['$or'] = ipaddr_payload_arr[0]['normalizedIpAddress'];
					} else {
						submit_payload['normalizedIpAddress'] = ipaddr_payload_arr[0]['normalizedIpAddress'];
					}

					// let split=ipaddr_payload_arr[0]['normalizedIpAddress'].split("/")[0]
					// let arr=split.split(".")
					// let ip=split.split(".")
					// let string1=ip[0]+'.'+ip[1]+'.'+ip[2]+'.'+'000'
					// let string2=ip[0]+'.'+ip[1]+'.'+ip[2]+'.'+'255'
					// let jsonpayload={"$gte":string1,"$lte":string2}
					// submit_payload['normalizedIpAddress']={"$gte":string1,"$lte":string2};

				}
			}
			//registration id
			if (regid_payload_arr.length > 0) {
				let value = regid_payload_arr[0]['registrationId'] ? regid_payload_arr[0]['registrationId'] : "";
				value = value.replace(/\*/g, '.*?');
				value = "^" + value + "$";
				if (regid_payload_arr[0]['ruletype'] == "$regex") {
					submit_payload['registrationId'] = {
						"$regex": value
					}
				}
			}
			//opmode
			if (mode_payload_arr.length > 0) {
				if (mode_payload_arr[0]['ruletype'] == "Equals") {
					submit_payload['opMode'] = mode_payload_arr[0]['opMode'];
				}
			}

			if (wan_access_type_payload_arr.length > 0) {
				if (wan_access_type_payload_arr[0]['ruletype'] == "Equals") {
					submit_payload['wanAccessType'] = wan_access_type_payload_arr[0]['wanAccessType'];
				}
			}
		}
		this.json_payload_submit = submit_payload;
	}
	wanAccessTypes: any = [];
	GetwanAccessTypes(modelName) {
		//	this.loading = true
		this.service.GetwanAccessTypes(modelName).subscribe((res: any) => {
			this.wanAccessTypes = [];
			var wanAccess_Types = res?.properties?.filter(x => x.featureName == "WanAccessTypeOptions")
			if (wanAccess_Types && wanAccess_Types[0].configuration?.valueList.length > 0) {
				this.wanAccessTypes = wanAccess_Types[0]?.configuration?.valueList;
				this.rule3items['wanAccessType'] = [];
				this.rule3items['wanAccessType'] = this.wanAccessTypes;
				this.loading = false;
			}

		}, (err: HttpErrorResponse) => {

			this.loading = false;
			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		});
	}
	GetDevice_Type(index?: any) {
		this.loading = true;
		let params = this.getParamsNew(index, true);

		params = params ? params : { orgId: this.ssoService.getOrgId() }
		this.allDeviceGrpSubscribe = this.service.GetDeviceType(JSON.stringify(params)).subscribe((res: any) => {
			let emptyObj = {
				id: '',
				name: ''
			};

			let manufact_arr: any = [];
			let model_arr: any = [];
			let swver_arr: any = [];
			let hwver_arr: any = [];
			let fsan_arr: any = [];
			let wanip_arr: any = [];
			let reg_arr: any = [];
			let wanacc_arr: any = [];
			let mode_arr: any = [];
			this.DeviceTypeArr = res;

			let opmode: any = [{
				"id": "WAP",
				"name": "WAP"
			}, {
				"id": "RG",
				"name": "RG"
			}];
			for (var i = 0; i < this.DeviceTypeArr.length; i++) {
				manufact_arr.push({
					"id": this.DeviceTypeArr[i]['manufacturer'],
					"name": this.DeviceTypeArr[i]['manufacturer']
				});
				model_arr.push({
					"id": this.DeviceTypeArr[i]['modelName'],
					"name": this.DeviceTypeArr[i]['modelName']
				});
				swver_arr.push({
					"id": this.DeviceTypeArr[i]['softwareVersion'],
					"name": this.DeviceTypeArr[i]['softwareVersion']
				});
				hwver_arr.push({
					"id": this.DeviceTypeArr[i]['hardwareVersion'],
					"name": this.DeviceTypeArr[i]['hardwareVersion']
				});
				fsan_arr.push({
					"id": this.DeviceTypeArr[i]['serialNumber'],
					"name": this.DeviceTypeArr[i]['serialNumber']
				});
				wanip_arr.push({
					"id": this.DeviceTypeArr[i]['ipAddress'],
					"name": this.DeviceTypeArr[i]['ipAddress']
				});
				reg_arr.push({
					"id": this.DeviceTypeArr[i]['registrationId'],
					"name": this.DeviceTypeArr[i]['registrationId']
				});
				wanacc_arr.push({
					"id": this.DeviceTypeArr[i]['wanAccessType'],
					"name": this.DeviceTypeArr[i]['wanAccessType']
				});
				//mode_arr.push({"id":this.DeviceTypeArr[i]['opMode'],"name":this.DeviceTypeArr[i]['opMode']})
				mode_arr = opmode;
			}
			manufact_arr = this.unique(manufact_arr);
			model_arr = this.unique(model_arr);
			swver_arr = this.unique(swver_arr);
			hwver_arr = this.unique(hwver_arr);
			fsan_arr = this.unique(fsan_arr);
			wanip_arr = this.unique(wanip_arr);
			reg_arr = this.unique(reg_arr);
			wanacc_arr = this.unique(wanacc_arr);
			mode_arr = this.unique(mode_arr);

			let wanAccessTypes = this.defaultWanAccessTypes;
			if (this.RulesArray && this.RulesArray.length) {
				let modelObj = this.findObject(this.RulesArray, 'rule1', 'modelName');
				if (modelObj) {
					let selectedModels = typeof modelObj.rule3 === 'object' ? modelObj.rule3 : [modelObj.rule3]
					let selectedModel = '';
					let result = false;
					selectedModels.forEach((model: any) => {
						result = result || /844GE(-\d)?/i.test(model) || /^[MGS4227/GS4227].*/.test(model);
						selectedModel = model;
					});

					if (result) {
						//	this.rule3items['wanAccessType'] = []
						this.GetwanAccessTypes(selectedModel)

						// if (/^[MGS4227/GS4227].*/.test(selectedModel)) {

						// 	wanAccessTypes = [
						// 		{
						// 			id: "GPON",
						// 			name: "GPON"
						// 		},
						// 		{
						// 			id: "XGSPON",
						// 			name: "XGSPON"
						// 		},
						// 		{
						// 			id: "CopperEthernet",
						// 			name: "CopperEthernet"
						// 		},
						// 		{
						// 			id: "AE",
						// 			name: "AE"
						// 		},

						// 	]
						// }
						// var modelIndex = ["GS4227", "GS4227W", "MGS4227", "MGS4227W", "GS4227W-2", "GS4227-2", "MGS4227-2", "MGS4227W-2"].indexOf(selectedModel);
						// if (modelIndex != -1) {
						// 	let wanAccType = {
						// 		id: "10G-AE",
						// 		name: "10G-AE"
						// 	}
						// 	wanAccessTypes.push(wanAccType);
						// }
						// if (selectedModel == 'GS4220E' || selectedModel == 'MGS4220E') {
						// 	wanAccessTypes = wanAccessTypes.filter(x => x.id != "AE")
						// }
					}
				}

			}
			setTimeout(() => {
				this.rule3items = {
					"manufacturer": manufact_arr,
					"modelName": model_arr,
					"softwareVersion": swver_arr,
					"hardwareVersion": hwver_arr,
					"serialNumber": fsan_arr,
					"normalizedIpAddress": wanip_arr,
					"registrationId": reg_arr,
					"wanAccessType": this.wanAccessTypes,
					"opMode": mode_arr,
				}

				let rule3items = {
					"manufacturer": manufact_arr,
					"modelName": model_arr,
					"softwareVersion": swver_arr,
					"hardwareVersion": hwver_arr,
					"serialNumber": fsan_arr,
					"normalizedIpAddress": wanip_arr,
					"registrationId": reg_arr,
					"wanAccessType": this.wanAccessTypes,
					"opMode": mode_arr,
				};


				if (this.RulesArray[index + 1]) {

					let selectInputs = [
						'manufacturer', 'modelName', 'softwareVersion', 'hardwareVersion', 'wanAccessType'
					];

					if (selectInputs.indexOf(this.RulesArray[index + 1]['rule1']) !== -1) {
						this.RulesArray[index + 1]['rule2'] = '';
						this.RulesArray[index + 1]['rule3items'] = rule3items;
						this.RulesArray[index + 1].rule3 = rule3items[this.RulesArray[index + 1].rule1] ? rule3items[this.RulesArray[index + 1].rule1][0].id : '';

						if (this.RulesArray[index + 1].rule1 == 'wanAccessType' && this.supportWanAccessType()) {
							this.rule2items[this.RulesArray[index + 1].rule1] = [{
								id: '',
								name: ''
							},
							{
								id: 'Equals',
								name: 'Equals'
							}
							];

							//this.rule2items = [...this.rule2items];
							this.rule2items = this.rule2items;
							let modelObj = this.findObject(this.RulesArray, 'rule1', 'modelName');
							if (modelObj) {
								let selectedModels = typeof modelObj.rule3 === 'object' ? modelObj.rule3 : [modelObj.rule3]
								let selectedModel = '';
								let result = false;
								selectedModels.forEach((model: any) => {
									result = result || /844GE(-\d)?/i.test(model) || /^[MGS4227/GS4227].*/.test(model);
									selectedModel = model;
								});
								if (result) {
									//	this.rule3items['wanAccessType'] = []
									//this.GetwanAccessTypes(selectedModel)
									// setTimeout(() => {

									// 	this.rule3items['wanAccessType'] = this.wanAccessTypes;
									// }, 1000);
									// if (/^[MGS4227/GS4227].*/.test(selectedModel)) {

									// 	this.rule3items['wanAccessType'] = [
									// 		{
									// 			id: "GPON",
									// 			name: "GPON"
									// 		},
									// 		{
									// 			id: "XGSPON",
									// 			name: "XGSPON"
									// 		},
									// 		{
									// 			id: "CopperEthernet",
									// 			name: "CopperEthernet"
									// 		},
									// 		{
									// 			id: "AE",
									// 			name: "AE"
									// 		}

									// 	]
									// } else {
									// 	[{
									// 		id: "AE",
									// 		name: "AE"
									// 	},
									// 	{
									// 		id: "GPON",
									// 		name: "GPON"
									// 	}
									// 	]
									// }
									// var modelIndex = ["GS4227", "GS4227W", "MGS4227", "MGS4227W", "GS4227W-2", "GS4227-2", "MGS4227-2", "MGS4227W-2"].indexOf(selectedModel);
									// if (modelIndex != -1) {
									// 	let wanAccType = {
									// 		id: "10G-AE",
									// 		name: "10G-AE"
									// 	}
									// 	this.rule3items['wanAccessType'].push(wanAccType);
									// }
									// if (selectedModel == 'GS4220E' || selectedModel == 'MGS4220E') {
									// 	this.rule3items['wanAccessType'] = this.rule3items['wanAccessType']?.filter(x => x.id != "AE")
									// }

								}
							}

						} else {
							rule3items["wanAccessType"] = [];
							this.RulesArray[index + 1]['rule3items'] = rule3items;

							let skipApisForTypes = ["serialNumber", "normalizedIpAddress", "registrationId", "wanAccessType", "opMode"];
							if (skipApisForTypes.indexOf(this.RulesArray[index + 1].rule1) === -1) {
								this.RulesArray[index + 1]['rule3'] = '';
								this.RulesArray[index + 1]['rule2'] = '';
							}

						}

					}



					if (index !== -1) {
						this.GetDevice_Type(index + 1);
					} else {
						//this.RulesArray[index].rule3 = rule3items[this.RulesArray[index + 1].rule1] ? rule3items[this.RulesArray[index + 1].rule1][0].id : '';
					}

					this.Rule1ChangeVal(index + 1, true);


				} else {

					if (index !== -1) {
						this.RulesArray[index]['rule3items'] = {
							...rule3items,
							...this.RulesArray[index]['rule3items'],
						};
						if (!this.RulesArray[index].rule3) {
							this.RulesArray[index].rule3 = rule3items[this.RulesArray[index].rule1] ? rule3items[this.RulesArray[index].rule1][0].id : '';
						}
						this.getDiscoveredDeviceCount();
					} else {
						this.loading = false;
					}


				}
			}, 1000);


		}, (err: HttpErrorResponse) => {


			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		});
	}

	Recall() {
		// this.Get_payload();
		// this.GetDevice_Type_recall();
		// this.getDiscoveredDeviceCount();
	}
	GetDevice_Type_recall() {
		this.allDeviceGrpSubscribe = this.service.GetDeviceType(JSON.stringify(this.json_payload)).subscribe((res: any) => {

			let manufact_arr: any = [];
			let model_arr: any = [];
			let swver_arr: any = [];
			let hwver_arr: any = [];
			let fsan_arr: any = [];
			let wanip_arr: any = [];
			let reg_arr: any = [];
			let wanacc_arr: any = [];
			let mode_arr: any = [];
			this.DeviceTypeArr = res;

			let opmode: any = [{
				"id": "WAP",
				"name": "WAP"
			}, {
				"id": "RG",
				"name": "RG"
			}];
			for (var i = 0; i < this.DeviceTypeArr.length; i++) {

				manufact_arr.push({
					"id": this.DeviceTypeArr[i]['manufacturer'],
					"name": this.DeviceTypeArr[i]['manufacturer']
				})



				model_arr.push({
					"id": this.DeviceTypeArr[i]['modelName'],
					"name": this.DeviceTypeArr[i]['modelName']
				})
				swver_arr.push({
					"id": this.DeviceTypeArr[i]['softwareVersion'],
					"name": this.DeviceTypeArr[i]['softwareVersion']
				})
				hwver_arr.push({
					"id": this.DeviceTypeArr[i]['hardwareVersion'],
					"name": this.DeviceTypeArr[i]['hardwareVersion']
				})
				fsan_arr.push({
					"id": this.DeviceTypeArr[i]['serialNumber'],
					"name": this.DeviceTypeArr[i]['serialNumber']
				})
				wanip_arr.push({
					"id": this.DeviceTypeArr[i]['ipAddress'],
					"name": this.DeviceTypeArr[i]['ipAddress']
				})
				reg_arr.push({
					"id": this.DeviceTypeArr[i]['registrationId'],
					"name": this.DeviceTypeArr[i]['registrationId']
				})
				wanacc_arr.push({
					"id": this.DeviceTypeArr[i]['wanAccessType'],
					"name": this.DeviceTypeArr[i]['wanAccessType']
				})
				//mode_arr.push({"id":this.DeviceTypeArr[i]['opMode'],"name":this.DeviceTypeArr[i]['opMode']})
				mode_arr = opmode;




			}
			manufact_arr = this.unique(manufact_arr)
			model_arr = this.unique(model_arr)
			swver_arr = this.unique(swver_arr)
			hwver_arr = this.unique(hwver_arr)
			fsan_arr = this.unique(fsan_arr)
			wanip_arr = this.unique(wanip_arr)
			reg_arr = this.unique(reg_arr)
			wanacc_arr = this.unique(wanacc_arr)
			mode_arr = this.unique(mode_arr)

			this.rule3items = {
				"manufacturer": manufact_arr,
				"modelName": model_arr,
				"softwareVersion": swver_arr,
				"hardwareVersion": hwver_arr,
				"serialNumber": fsan_arr,
				"normalizedIpAddress": wanip_arr,
				"registrationId": reg_arr,
				"wanAccessType": this.defaultWanAccessTypes,
				"opMode": mode_arr
			}

		}, (err: HttpErrorResponse) => {


			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		})




	}

	// compareWith(index:any){

	// return  this.RulesArray[index].rule3=[this.rule3items[this.RulesArray[index].rule1][0]]


	// }

	GotoTroubleshooting(item) {

		this.searchByCharacters(item.serialNumber)

		/*let Setvalue = [{
			"_id": item._id,
			"serialNumber": item.serialNumber,
			"macAddress": item.macAddress,
			"registrationId": item.registrationId,
			"ipAddress": item.ipAddress,
			"modelName": item.modelName,
			"softwareVersion": item.softwareVersion,
			"opMode": item.opMode,
			"manufacturer": item.manufacturer,
			"deviceId": "",
			"secondIpAddress": item.secondIpAddress,
		}]

		localStorage.setItem("calix.deviceData", JSON.stringify(Setvalue))

		this.router.navigate(['/support/router']);*/



	}
	searchByCharacters(serialNumber) {
		const textEntered: string = serialNumber;

		if (textEntered.length < 2) return;
		this.searchResult = [];
		this.dataservice.performSearch(this.orgId, textEntered, 1, 500).subscribe(
			(res: any) => {
				if (res) {
					if (this.router.url.includes('cco-foundation')) {
						this.subService.setSubscriberInfo(undefined);
						this.subService.setSubscriberTabInfoData(undefined);
						this.subService.removeDataSaver();
						this.router.navigate([`/cco-foundation/foundation-systems/foundation-manage/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId } })
					}
					else if (this.router.url.includes('/cco/operations')) {
						this.subService.setSubscriberInfo(undefined);
						this.subService.setSubscriberTabInfoData(undefined);
						this.subService.removeDataSaver();
						localStorage.setItem("calix.Device_Details", JSON.stringify(res?.records[0]));
						this.router.navigate([`/cco/system/cco-subscriber-system/system-details`], { queryParams: { sn: textEntered, subscriber: res.records[0].subscriberId } })

					} else {
						this.searchResult = res.records.filter(obj => ((obj.devices || []).filter(device => device.serialNumber == serialNumber).length));

						sessionStorage.setItem("calix.deviceData", JSON.stringify(this.searchResult[0].devices));
						sessionStorage.setItem('calix.subscriberId', this.searchResult[0].subscriberId);
						this.subService.setSubscriberInfo(undefined);
						this.subService.setSubscriberTabInfoData(undefined);
						this.subService.removeDataSaver();
						sessionStorage.setItem('calix.serialNo', textEntered)
						this.router.navigate(['/support/router']);
					}

				}
			},
			err => {

			}
		);
	}

	unique(arr) {
		let uniqueArr = [

		];


		for (var i = 0; i < arr.length; i++) {
			let existed = false
			for (var j = 0; j < uniqueArr.length; j++)
				if (arr[i].name === uniqueArr[j].name) {
					existed = true
					break
				}

			if (existed) continue
			uniqueArr.push(arr[i])
		}
		return uniqueArr;
	}



	Disc_count: any;
	UnDisc_count_static: any;
	Disc_count_static: any;

	isRerender_disc_static: any = false;
	isRerender_undisc_static: any = false;


	getDiscoveredDeviceCount() {

		let index = this.RulesArray.length - 1;
		this.json_payload = this.getParamsNew(index);
		if (this.json_payload.opMode && this.json_payload.opMode == 'WAP') {
			this.json_payload.opMode = { "$in": ["WAP", "WAP-IGMP"] }
		}
		if (!this.json_payload) {
			return;
		}
		this.allDeviceGrpSubscribe = this.service.getDiscoveredCount(this.json_payload).subscribe((res: any) => {
			this.DiscoveredDeviceCount = res.count;
			this.Disc_count = true;

			// this.cdr.detectChanges();
			// this.DeviceDiscovered()
			if (this.isRerender) {
				this.rerender(2);
			} else {
				this.DeviceDiscovered()
				this.isRerender = true;
			}
		}, (err: HttpErrorResponse) => {

			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		})
	}


	DeviceDiscovered() {
		if (this.static) {
			return;
		}
		let url = `${environment.SUPPORT_URL}/netops-device/device`;
		const that = this;
		this.dtOptionsdis = {
			pagingType: "full_numbers",
			pageLength: 20,
			responsive: true,
			serverSide: true,
			processing: false,
			searching: false,
			lengthChange: false,
			dom: 'tipr',
			columnDefs: [{
				targets: [1, 2, 3, 4, 5, 6, 7],
				orderable: false
			},
			{
				targets: [0],
				orderable: true
			}],
			ajax: (dataTablesParameters: any, callback) => {
				var btn = document.getElementById('my-btn');
				if (btn) {
					if (btn.children[0]) {
						btn.children[0].classList.add('spin-animation');
					}
				}

				if (that.json_payload.opMode && that.json_payload.opMode == 'WAP') {
					that.json_payload.opMode = { "$in": ["WAP", "WAP-IGMP"] }
				}
				//url=`${url}?matcher=${JSON.stringify(this.json_payload)}`;
				that.sortBy = dataTablesParameters.order[0].column;
				that.sortType = dataTablesParameters.order[0].dir;
				// that.http
				// 	.get(url + "?matcher=" + JSON.stringify(this.json_payload) + "&skip=" + dataTablesParameters.start + "&limit=" + dataTablesParameters.length)
				that.http
					.put(url + "?skip=" + dataTablesParameters.start + "&limit=" + dataTablesParameters.length, { $matcher: this.json_payload })
					.subscribe((resp: any) => {
						if (resp.length == 0) {
							this.DiscoveredTableData = [];
						} else {
							this.DiscoveredTableData = this.sortDataDiscoveredDynamic(resp, that.sortBy, that.sortType);
						}
						that.loading = false;
						// that.cdr.detectChanges();
						var btn = document.getElementById('my-btn');
						if (btn) {
							if (btn.children[0]) {
								btn.children[0].classList.remove('spin-animation');
							}
						}
						callback({
							recordsTotal: that.DiscoveredDeviceCount,
							recordsFiltered: that.DiscoveredDeviceCount,
							data: []
						});
					}, (err: HttpErrorResponse) => {
						;
						var btn = document.getElementById('my-btn');
						if (btn) {
							if (btn.children[0]) {
								btn.children[0].classList.remove('spin-animation');
							}
						}
						this.pageErrorHandle(err);
					});
			}, drawCallback: (settings) => {
				this.changeTableStatusLanguageDeviceGrpInfo(settings);
				let total = settings._iRecordsDisplay; // for server side rendering
				let length = settings._iDisplayLength;
				if (total <= length) {
					$(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
				} else {
					//$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
				}
			},
			columns: [{
				data: "serialNumber"
			},
			{
				data: "manufacturer"
			},
			{
				data: "opMode"
			},
			{
				data: "modelName"
			},
			{
				data: "softwareVersion"
			},
			{
				data: "registrationId"
			},
			{
				data: "ipAddress"
			},
			{
				data: "macAddress"
			},
			]

		};


	}
	sortDataDiscoveredDynamic(data, by, type): any {
		let sorted = [];
		if (by == 0) {
			sorted = this.sortByColumn(data, type, 'serialNumber');
		}

		return sorted;
	}
	StaticTblRefreshDisc() {


		this.DevicediscoveredCount()

	}

	StaticTblRefreshUndisc() {


		this.DeviceUndiscoveredCount()
	}

	static_undisc = false;
	DeviceUndiscoveredCount() {
		this.static_undisc = false;
		this.startSpin('static-undiscovered');
		this.allDeviceGrpSubscribe = this.service.GetUnDiscoveredDevices_static_count(this.devicegrpid_static, this.orgId).subscribe((res: any) => {
			this.UnDiscoveredStaticDeviceCount = res.count;
			this.UnDisc_count_static = true;
			this.static_undisc = true;

			if (this.isRerender_undisc_static) {
				// this.UnDiscoveredTableData_static=[];
				// this.DiscoveredTableData_static=[];
				//this.rerender(4);


			} else {
				this.DeviceUnDiscoveredStatic();
				this.rerender();
				this.isRerender_undisc_static = true;


			}



		}, (err: HttpErrorResponse) => {

			this.pageErrorHandle(err);
		})
		//this.DeviceUnDiscoveredStatic(devicegrpid)

	}


	undiscoveredDtTrigger: Subject<any> = new Subject<any>();
	isDtForStaticUnDiscoveredInitialized = false;
	frTable: DataTables.LanguageSettings;
	esTable: DataTables.LanguageSettings;
	DeviceUnDiscoveredStatic() {
		//this.startSpin('static-undiscovered');
		// this.dtOptionsstaticUndis = {
		// 	paging: false,
		// 	// pagingType: "full_numbers",
		// 	// pageLength: 2,
		// 	lengthChange: false,
		// 	searching: false,
		// }

		// that.http.get(url + this.devicegrpid_static + `?orgId=` + this.orgId)
		// 	.subscribe((resp: any) => {
		// 		that.UnDiscoveredTableData_static = resp;
		// 		that.loading = false;
		// 		this.endSpin('static-undiscovered');

		// 		setTimeout(() => {

		// 			if (this.isDtForStaticUnDiscoveredInitialized) {
		// 				this.dtElements.forEach((dtElement: DataTableDirective, index) => {
		// 					dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

		// 						if (index == 1) {
		// 							this.isDtForStaticUnDiscoveredInitialized = true;
		// 							dtInstance.destroy();
		// 							that.undiscoveredDtTrigger.next();
		// 						}


		// 					});
		// 				});
		// 			} else {
		// 				this.isDtForStaticUnDiscoveredInitialized = true;
		// 				that.undiscoveredDtTrigger.next();
		// 			}


		// 		}, 500);

		// 	});

		this.dtOptionsstaticUndis = {
			pagingType: "full_numbers",
			pageLength: 10,
			responsive: true,
			serverSide: true,
			processing: false,
			searching: false,
			lengthChange: false,
			dom: 'tipr',
			ordering: true,
			columnDefs: [
				{
					targets: '_all',
					orderable: true
				}],
			ajax: (dataTablesParameters: any, callback) => {
				if (!this.devicegrpid_static) {
					this.loading = false;
					this.endSpin('static-undiscovered');
					//return;
				}
				let url = `${environment.SUPPORT_URL}/netops-device/static-group-member/undiscovered/`;
				const that = this;
				that.sortBy = dataTablesParameters.order[0].column;
				that.sortType = dataTablesParameters.order[0].dir;

				that.http
					.get(`${url}${this.devicegrpid_static}?${this.ssoService.getOrg(this.orgId)}skip=${dataTablesParameters.start}&limit=${dataTablesParameters.length}&bUndiscovered=true`)
					.subscribe((resp: any) => {
						that.UnDiscoveredTableData_static = resp;
						this.UnDiscoveredTableData_static = this.sortDataDiscoveredStatic(this.UnDiscoveredTableData_static, that.sortBy, that.sortType, 'undiscovered');
						that.loading = false;
						this.endSpin('static-undiscovered');

						// const tempObj = {
						// 	_iDisplayStart: this.tableCounts.start,
						// 	_iDisplayLength: this.tableCounts.displayCount,
						// 	_iRecordsDisplay: this.tableCounts.displayed,
						// 	_iRecordsTotal: this.tableCounts.total,
						// 	oPreviousSearch: {
						// 		sSearch: this.tableCounts.searchText
						// 	}
						// };
						//	this.changeTableStatusLanguage(tempObj);
						this.tableLanguageOptions();

						callback({
							recordsTotal: that.UnDiscoveredStaticDeviceCount,
							recordsFiltered: that.UnDiscoveredStaticDeviceCount,
							data: []
						});
					});
			},
			drawCallback: (settings) => {
				this.changeTableStatusLanguageUnDisc(settings);
				let total = settings._iRecordsDisplay; // for server side rendering
				let length = settings._iDisplayLength;
				if (total <= length) {
					$(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
				} else {
					//$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
				}
			},
			columns: [{
				data: "memberInfo"
			},

			]

		};



	}
	tableLanguageOptions() {
		if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'fr') {
			this.dtOptions.language = this.frTable;
		} if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'es') {
			this.dtOptions.language = this.esTable;
		} else if (this.language && this.language.fileLanguage && this.language.fileLanguage == 'en' && this.dtOptions.language) {
			delete this.dtOptions.language;
		}
	}
	static_disc = false;
	DevicediscoveredCount() {
		this.static_disc = false;
		this.startSpin('static-discovered');
		this.allDeviceGrpSubscribe = this.service.GetDiscoveredDevices_static_count(this.devicegrpid_static, this.orgId).subscribe((res: any) => {
			this.DiscoveredStaticDeviceCount = res.count;
			this.static = true;
			this.static_disc = true;

			this.Disc_count_static = true

			// this.cdr.detectChanges();
			// this.DeviceDiscovered()




			if (this.isRerender_disc_static) {
				// this.UnDiscoveredTableData_static=[];
				// this.DiscoveredTableData_static=[];
				//this.rerender(4);
				this.DeviceDiscoveredStatic()


			} else {
				this.DeviceDiscoveredStatic()
				this.rerender()
				this.isRerender_disc_static = true;


			}



		}, (err: HttpErrorResponse) => {

			this.pageErrorHandle(err);
		})

	}

	staticdiscoveredDtTrigger = new Subject();
	isDtForStaticDiscoveredInitialized = false;
	DeviceDiscoveredStatic() {
		//this.startSpin('static-discovered');
		// this.dtOptionsstaticdis = {
		// 	// pagingType: "full_numbers",
		// 	//pageLength: 2,
		// 	paging: false,
		// 	lengthChange: false,
		// 	searching: false,
		// }


		// this.http.get(`${url}${this.devicegrpid_static}?orgId=${this.orgId}&bWithDeviceRecord=true&limit=10`)
		// 	.subscribe((res: any) => {
		// 		this.endSpin('static-discovered');
		// 		let data = [];
		// 		this.DiscoveredTableData_static = [];
		// 		for (var i = 0; i < res.length; i++) {
		// 			if (res[i]['deviceRecord']) {
		// 				data.push({
		// 					"_id": res[i]['_id'],
		// 					"serialNumber": res[i]['deviceRecord']['serialNumber'],
		// 					"manufacturer": res[i]['deviceRecord']['manufacturer'],
		// 					"opMode": res[i]['deviceRecord']['opMode'],
		// 					"modelName": res[i]['deviceRecord']['modelName'],
		// 					"softwareVersion": res[i]['deviceRecord']['softwareVersion'],
		// 					"registrationId": res[i]['deviceRecord']['registrationId'],
		// 					"ipAddress": res[i]['deviceRecord']['ipAddress'],
		// 					"macAddress": res[i]['deviceRecord']['macAddress'],
		// 					"description": res[i]['deviceRecord']['description']
		// 				});
		// 			}
		// 		}
		// 		this.DiscoveredTableData_static = data;
		// 		setTimeout(() => {

		// 			if (this.isDtForStaticDiscoveredInitialized) {
		// 				this.dtElements.forEach((dtElement: DataTableDirective, index) => {
		// 					dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
		// 						
		// 						if (index == 0) {
		// 							this.isDtForStaticDiscoveredInitialized = true;
		// 							dtInstance.destroy();
		// 							this.staticdiscoveredDtTrigger.next();
		// 						}


		// 					});
		// 				});
		// 			} else {
		// 				this.isDtForStaticDiscoveredInitialized = true;
		// 				this.staticdiscoveredDtTrigger.next();
		// 			}


		// 		}, 500);

		// 	});



		const that = this;
		this.dtOptionsstaticdis = {
			pagingType: "full_numbers",
			pageLength: 10,
			responsive: true,
			serverSide: true,
			processing: false,
			searching: false,
			lengthChange: false,
			dom: 'tipr',
			columnDefs: [{
				targets: [1, 2, 3, 4, 5, 6, 7],
				orderable: false
			},
			{
				targets: [0],
				orderable: true
			}],
			ajax: (dataTablesParameters: any, callback) => {
				// var btn = document.getElementById('my-btn');
				// if (btn) {
				// 	if (btn.children[0]) {
				// 		btn.children[0].classList.add('spin-animation');
				// 	}
				// }
				if (!this.devicegrpid_static) {
					this.endSpin('static-discovered');
					//return;
				}
				let url = `${environment.SUPPORT_URL}/netops-device/static-group-member/discovered/`;

				that.sortBy = dataTablesParameters.order[0].column;
				that.sortType = dataTablesParameters.order[0].dir;

				that.http
					.get(`${url}${this.devicegrpid_static}?${this.ssoService.getOrg(this.orgId)}skip=${dataTablesParameters.start}&limit=${dataTablesParameters.length}&bWithDeviceRecord=true`)
					.subscribe((res: any) => {
						that.DiscoveredTableData_static = [];
						let data = [];
						for (var i = 0; i < res.length; i++) {
							if (res[i]['deviceRecord']) {
								data.push({
									"serialNumber": res[i]['deviceRecord']['serialNumber'],
									"manufacturer": res[i]['deviceRecord']['manufacturer'],
									"opMode": res[i]['deviceRecord']['opMode'],
									"modelName": res[i]['deviceRecord']['modelName'],
									"softwareVersion": res[i]['deviceRecord']['softwareVersion'],
									"registrationId": res[i]['deviceRecord']['registrationId'],
									"ipAddress": res[i]['deviceRecord']['ipAddress'],
									"macAddress": res[i]['deviceRecord']['macAddress']
								});
							}
						}

						this.DiscoveredTableData_static = data;

						if (!that.DiscoveredTableData_static.length) {
							that.DiscoveredStaticDeviceCount = 0;
						}
						this.DiscoveredTableData_static = this.sortDataDiscoveredStatic(this.DiscoveredTableData_static, that.sortBy, that.sortType, 'discovered');
						that.loading = false;
						this.endSpin('static-discovered');
						callback({
							recordsTotal: that.DiscoveredStaticDeviceCount,
							recordsFiltered: that.DiscoveredStaticDeviceCount,
							data: []
						});
					}, (err: HttpErrorResponse) => {
						;
						var btn = document.getElementById('my-btn');
						if (btn) {
							if (btn.children[0]) {
								btn.children[0].classList.remove('spin-animation');
							}
						}
						this.pageErrorHandle(err);
					});
			}, drawCallback: (settings) => {
				this.changeTableStatusLanguageStaticDisc(settings);
				let total = settings._iRecordsDisplay; // for server side rendering
				let length = settings._iDisplayLength;
				if (total <= length) {
					$(settings.nTableWrapper).find('#users-table_last').addClass('disabled');
				} else {
					//$(settings.nTableWrapper).find('#users-table_last').removeClass('disabled');
				}
			},
			columns: [{
				data: "serialNumber"
			},
			{
				data: "manufacturer"
			},
			{
				data: "opMode"
			},
			{
				data: "modelName"
			},
			{
				data: "softwareVersion"
			},
			{
				data: "registrationId"
			},
			{
				data: "ipAddress"
			},
			{
				data: "macAddress"
			},

			]

		};

	}
	sortDataDiscoveredStatic(data, by, type, disAndUndis?) {
		let sorted = [];
		if (by == 0 && disAndUndis == 'discovered') sorted = this.sortByColumn(data, type, 'serialNumber');
		if (by == 0 && disAndUndis == 'undiscovered') sorted = this.sortByColumn(data, type, 'memberInfo');
		return sorted;
	}
	edit_key: any = [];
	devicegrpid_static: any;
	deviceGroupId: any;
	cpeFilter: any;

	displayEditGroup(devicegrpid: any) {
		this.deviceGroupId = devicegrpid;
		let rules_obj_arr1: any = [];
		let rules_obj_arr2: any = [];
		let rules3_arry = [];
		let rules2_arry = [];
		this.isAddGroupForm = false
		this.isAddTable = true
		this.ishidebtn = false
		this.Is_Update = true;
		this.editdevicegrpid = devicegrpid;
		this.loading = true;
		// this.DiscoveredTableData_static=[];
		this.RulesArray = [];
		var tempRule3Items = [];
		var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:[0-9]|[12][0-9]|3[0-2]))?$/;
		this.EditDeviceGrpSubscribe = this.service.getEditDeviceGoupList(devicegrpid).subscribe((res: any) => {
			if (res) {
				//this.loading = false;
				this.createDeviceGroup.controls.name.setValue(res.name)
				this.createDeviceGroup.controls.type.setValue(res.type)
				this.createDeviceGroup.controls.description.setValue(res.description)
				this.devicegrpid_static = devicegrpid;
				if (res.type == 'static') {
					this.IsStatic = true;
					//this.static = true;
					this.IsStatic_enable = true;
					this.is_staticenable = true;
					this.createDeviceGroup.controls.allowInheritance.setValue(res.allowInheritance)
					this.DevicediscoveredCount()
					this.DeviceUndiscoveredCount()
					// this.dtTrigger.next();
					this.loading = false;

				} else {
					this.cpeFilter = res.cpeFilter;
					let rules = this.getRules();
					this.dtTrigger.next();
					this.isFilledRow = true;
					this.IsStatic = false;
					this.IsStatic_enable = false;
					this.static = false;
					this.is_staticenable = true;
					this.createDeviceGroup.controls.allowInheritance.setValue(false)

					this.edit_key = Object.keys(res.cpeFilter)

					let rulesArray = [];
					for (var i = 0; i < rules.length; i++) {
						rulesArray.push({
							"rule1": rules[i].key,
							"rule2": rules[i].oper ? rules[i].oper : "Equals",
							"rule3": rules[i].value,
							'rule1items': this.rule1items,
							"disabled": true,
							"multiple": (typeof rules[i].value === 'object') ? true : false,
							"rule3items": (i == 0 && rules[i].key === 'manufacturer') ? this.rule3items : [],
							"rule2items": this.rule2items

						});
					}

					const requests: Observable<any>[] = [];
					rulesArray.forEach((element, index, object) => {
						let params = this.getParams(index, rulesArray)

						const req = this.service.GetDeviceType(JSON.stringify(params)).pipe(
							catchError(err => of(err.status)),
						);

						requests.push(req);

					});

					if (requests.length) {
						this.loading = true;
						let errors = [];
						forkJoin(requests).subscribe((response: any) => {

							response.forEach((element: any, index) => {
								if (typeof element == 'object') {

									let manufact_arr: any = [];
									let model_arr: any = [];
									let swver_arr: any = [];
									let hwver_arr: any = [];
									let fsan_arr: any = [];
									let wanip_arr: any = [];
									let reg_arr: any = [];
									let wanacc_arr: any = [];
									let mode_arr: any = [];
									this.DeviceTypeArr = element;
									let opmode: any = [{
										"id": "WAP",
										"name": "WAP"
									}, {
										"id": "RG",
										"name": "RG"
									}];
									for (var i = 0; i < this.DeviceTypeArr.length; i++) {
										manufact_arr.push({
											"id": this.DeviceTypeArr[i]['manufacturer'],
											"name": this.DeviceTypeArr[i]['manufacturer']
										});
										model_arr.push({
											"id": this.DeviceTypeArr[i]['modelName'],
											"name": this.DeviceTypeArr[i]['modelName']
										});
										swver_arr.push({
											"id": this.DeviceTypeArr[i]['softwareVersion'],
											"name": this.DeviceTypeArr[i]['softwareVersion']
										});
										hwver_arr.push({
											"id": this.DeviceTypeArr[i]['hardwareVersion'],
											"name": this.DeviceTypeArr[i]['hardwareVersion']
										});
										fsan_arr.push({
											"id": this.DeviceTypeArr[i]['serialNumber'],
											"name": this.DeviceTypeArr[i]['serialNumber']
										});
										wanip_arr.push({
											"id": this.DeviceTypeArr[i]['ipAddress'],
											"name": this.DeviceTypeArr[i]['ipAddress']
										});
										reg_arr.push({
											"id": this.DeviceTypeArr[i]['registrationId'],
											"name": this.DeviceTypeArr[i]['registrationId']
										});
										wanacc_arr.push({
											"id": this.DeviceTypeArr[i]['wanAccessType'],
											"name": this.DeviceTypeArr[i]['wanAccessType']
										});
										//mode_arr.push({"id":this.DeviceTypeArr[i]['opMode'],"name":this.DeviceTypeArr[i]['opMode']})
										mode_arr = opmode;
									}
									manufact_arr = this.unique(manufact_arr);
									model_arr = this.unique(model_arr);
									swver_arr = this.unique(swver_arr);
									hwver_arr = this.unique(hwver_arr);
									fsan_arr = this.unique(fsan_arr);
									wanip_arr = this.unique(wanip_arr);
									reg_arr = this.unique(reg_arr);
									wanacc_arr = this.unique(wanacc_arr);
									mode_arr = this.unique(mode_arr);

									this.rule3items = {
										"manufacturer": manufact_arr,
										"modelName": model_arr,
										"softwareVersion": swver_arr,
										"hardwareVersion": hwver_arr,
										"serialNumber": fsan_arr,
										"normalizedIpAddress": wanip_arr,
										"registrationId": reg_arr,
										"wanAccessType": this.defaultWanAccessTypes,
										"opMode": mode_arr,
									}
									if (this.RulesArray && this.RulesArray.length) {
										let modelObj = this.findObject(this.RulesArray, 'rule1', 'modelName');
										if (modelObj) {
											let selectedModels = (typeof modelObj === 'object' && typeof modelObj.rule3 === 'object') ? modelObj.rule3 : [modelObj.rule3]
											let selectedModel = '';
											let result = false;
											selectedModels.forEach((model: any) => {
												result = result || /844GE(-\d)?/i.test(model) || /^[MGS4227/GS4227].*/.test(model);
												selectedModel = model;
											});
											if (result) {
												this.GetwanAccessTypes(selectedModel)

												setTimeout(() => {
													var items = this.rule3items;
													this.rule3items['wanAccessType'] = []
													this.rule3items['wanAccessType'] = this.wanAccessTypes;
													if (rulesArray[index + 1]) {
														rulesArray[index + 1].rule3items['wanAccessType'] = this.rule3items['wanAccessType'];
													}
													else {
													}

												}, 1000);
											}
										}

									}

									if (rulesArray[index + 1]) {
										rulesArray[index + 1].rule3items = this.rule3items;
									}
									else {
									}
								} else {
									errors.push(element);
								}



							});

							this.getDiscoveredDeviceCount();



						}, (err: any) => {

						})

					}



					this.RulesArray = rulesArray;
					//this.GetDevice_Type(0);
				}
				setTimeout(() => {
					this.loading = false;
				}, 3000);

			}
		}, (err: HttpErrorResponse) => {
			this.loading = false;
			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		}, () => {
			this.loading = false;
		});
	}
	EditDropdownDisabled(i: any) {
		if (this.RulesArray[i]['disabled'] == true) {
			return true;
		} else {
			return false;
		}
	}
	displayAddGroup() {
		if (window.location.href?.indexOf('/cco/operations/configuration/system-groups') !== -1) {
			this.router.navigate(['./cco/operations/configuration/system-groups/add']);
			return;
		}
		this.ssoService.redirectByUrl([
			`/support/netops-management/devices-groups-add`,
			`cco/device-groups-add`,
			`cco-foundation/foundation-configuration/device-groups-add`,
			`/cco/operations/device-groups-add`,
		]);
	}


	gotoEdit(id): any {
		// this.ssoService.redirectByUrl([
		// 	`/support/netops-management/devices-groups/${id}`,
		// 	`/cco/operations/configuration/system-groups/${id}`,
		// 	`cco/device-groups/${id}`,
		// 	`cco-foundation/foundation-configuration/device-groups/${id}`,
		// 	// `/cco/operations/device-groups/${id}`,
		// ]);
		//this.router.navigate([`/support/netops-management/operations/devices-groups/${id}`]);
		if (window.location.href?.indexOf('/cco/operations/configuration/system-groups') !== -1) {
			this.router.navigate([`/cco/operations/configuration/system-groups/${id}`,]);
			return;
		}
		this.ssoService.redirectByUrl([
			`/support/netops-management/devices-groups/${id}`,
			`cco/device-groups/${id}`,
			`cco-foundation/foundation-configuration/device-groups/${id}`,

		]);

	}

	cancelAddGroup() {
		this.isAddGroupForm = true;
		this.isAddTable = false;
		this.ishidebtn = true;
		this.isNameError = false;
		this.isFilledRow = true;
		this._location.back();
		//this.router.navigate(['/support/netops-management/operations/devices-groups']);
	}

	RuleAtleastOne: boolean = false;



	FilledAll(arg: any) {

		if (arg) {
			this.isFilledRow = true;
		} else {
			this.isFilledRow = false;
		}
	}
	initFilledAll(index: any) {

		if (this.RulesArray[index].rule1 == 'manufacturer' || this.RulesArray[index].rule1 == 'modelName' || this.RulesArray[index].rule1 == 'softwareVersion' ||
			this.RulesArray[index].rule1 == 'hardwareVersion' || this.RulesArray[index].rule1 == 'opMode') {
			this.isFilledRow = true;
		} else {
			this.isFilledRow = false;
		}
	}
	nameCheck(value: any) {
		if (!value) {
			this.isNameError = true;
		} else {
			this.isNameError = false;
		}
	}
	submitAddGroup() {
		this.Rule_err = false;
		this.orgId = this.ssoService.getOrgId();
		this.submitted = true;

		if (!this.createDeviceGroup.value.name) {
			this.isNameError = true;
		} else {
			this.isNameError = false;
		}
		if (this.createDeviceGroup.invalid) {
			return;
		}
		this.Get_payload();

		if (this.Rule_err) {
			return;
		}

		if (this.createDeviceGroup.value.type != "static") {
			if (!this.RulesArray.length) {
				this.Rule_err = true;
				this.RuleAtleastOne = true;
				this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
				return;
			}

			if (this.RulesArray.length == 1 && !this.RulesArray[0]['rule1']) {
				this.Rule_err = true;
				this.RuleAtleastOne = true;
				this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
				return;
			}

			//
			if (this.RulesArray.length > 0 && this.RulesArray[0]['rule1']) {
				if (this.RulesArray[0]['rule1'] && this.RulesArray[0]['rule2'] && this.RulesArray[0]['rule3']) {
					if (this.RulesArray[0]['rule1'] && this.RulesArray[0]['rule2'] && this.RulesArray[0]['rule3']) {
						this.Rule_err = false;
						this.RuleAtleastOne = false;
						this.ErrorMessage = "";
					}
				} else if (this.RulesArray.length == 0) {
					this.RuleAtleastOne = true;
				}
			} else {
				if (!(this.RulesArray[0]['rule1'] == 'registrationId' && this.RulesArray[0]['rule2'] && !this.RulesArray[0]['rule3'])) {
					this.Rule_err = true;
					this.RuleAtleastOne = true;
					this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
				}

			}
			if (this.RulesArray.length === 1 &&
				!this.RulesArray[0].rule1 ||
				!this.RulesArray[0].rule2 ||
				!this.RulesArray[0].rule3) {
				if (!(this.RulesArray[0]['rule1'] == 'registrationId' && this.RulesArray[0]['rule2'] && !this.RulesArray[0]['rule3'])) {
					this.Rule_err = true;
					this.RuleAtleastOne = true;
					this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
				}

			}
			//this.CheckValidationErr(this.indexlength);
		}
		delete this.json_payload_submit["orgId"];
		this.createDeviceGroup.value.cpeFilter = this.json_payload_submit;


		this.createDeviceGroup.value.name = this.createDeviceGroup.value.name.trim();

		if (this.Rule_err == false) {
			this.loading = true;
			if (this.Is_Update == true) {
				if (this.createDeviceGroup.value.type != 'static') {
					delete this.createDeviceGroup.value.allowInheritance;
				}
				this.UpdateDeviceGrpSubscribe = this.service.UpdateDeviceGroup(this.orgId, this.editdevicegrpid, this.createDeviceGroup.value).subscribe((res: any) => {
					//this.getDeviceCount();
					//this.rerender(1);
					this.showSuccess = true;
					this.successMsg = "Successfully Updated"
					setTimeout(function () {
						this.showSuccess = false;
						this.successMsg = ""
					}, 500);
					this.RulesArray = [];
					this.isError = false;
					this.isAddGroupForm = true
					this.isAddTable = false
					this.ishidebtn = true;
					this.isFilledRow = true;
					this.loading = false;
					this.goBack();
				}, (err: HttpErrorResponse) => {
					this.loading = false;
					this.isFilledRow = true;
					this.pageErrorHandle(err);
					// this.commonOrgService.pageScrollTop();
				}, () => {
					this.isFilledRow = true;
					this.loading = false;
					this.goBack();
				});
			} else {
				if (this.createDeviceGroup.value.type == "static") {
					this.static = false;
					this.Disc_count_static = false;
					this.UnDisc_count_static = false;
				}
				this.AddDeviceGrpSubscribe = this.service.addDeviceGroup(this.orgId, this.createDeviceGroup.value).subscribe((res: any) => {

					if (res) {
						this.isError = false;
						// this.getDeviceCount();
						// this.rerender(1);
						this.showSuccess = true;
						this.successMsg = "Successfully Added";
						this.RulesArray = [];
						this.isAddGroupForm = true
						this.isAddTable = false
						this.ishidebtn = true
						this.isFilledRow = true;
						this.loading = false;
						this.goBack();
					}
				}, (err: HttpErrorResponse) => {
					this.isFilledRow = true;
					this.loading = false;
					this.pageErrorHandle(err);
				}, () => {
					this.isFilledRow = true;
					this.loading = false;
					this.goBack();
				});
			}
		}
	}

	rule_temp: any[] = [{
		id: '',
		name: ''
	}, {
		id: 'manufacturer',
		name: 'Manufacturer'
	},
	{
		id: 'modelName',
		name: 'Model'
	},
	{
		id: 'softwareVersion',
		name: 'SW Version'
	},
	{
		id: 'hardwareVersion',
		name: 'HW Version'
	},
	{
		id: 'serialNumber',
		name: 'FSAN/Serial Number'
	},
	{
		id: 'normalizedIpAddress',
		name: 'WAN IP'
	},
	{
		id: 'registrationId',
		name: 'Registration ID'
	},
	{
		id: 'wanAccessType',
		name: 'WAN Access Type'
	},
	{
		id: 'opMode',
		name: 'Mode'
	}
	];

	onClickPlusSymbol(index) {

		if (this.RulesArray.length == 0) {
			this.Rule_err = false;
		}

		if (this.RulesArray.length) {
			let lastRow = this.RulesArray[index - 1];

			if (lastRow.rule1 !== 'registrationId') {
				if (!lastRow.rule1) {
					return;
				}

				if (!lastRow.rule2) {
					return;
				}

				if (!lastRow.rule3) {
					return;
				}
			}

		}


		const ITEMS = [{
			id: '',
			name: ''
		}, {
			id: 'manufacturer',
			name: 'Manufacturer'
		},
		{
			id: 'modelName',
			name: 'Model'
		},
		{
			id: 'softwareVersion',
			name: 'SW Version'
		},
		{
			id: 'hardwareVersion',
			name: 'HW Version'
		},
		{
			id: 'serialNumber',
			name: 'FSAN/Serial Number'
		},
		{
			id: 'normalizedIpAddress',
			name: 'WAN IP'
		},
		{
			id: 'registrationId',
			name: 'Registration ID'
		},
		{
			id: 'wanAccessType',
			name: 'WAN Access Type'
		},
		{
			id: 'opMode',
			name: 'Mode'
		}
		];
		this.rule_temp = [];
		if (this.Rule_err == false || this.RuleAtleastOne == true) {
			let items = ITEMS;
			if (this.RulesArray.length) {
				this.RulesArray.forEach(element => {
					if (element.rule1 == 'manufacturer') {
						items = ITEMS.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'modelName') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'softwareVersion') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'hardwareVersion') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'serialNumber') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'normalizedIpAddress') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'registrationId') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'wanAccessType') {
						items = items.filter(obj => obj.id != element.rule1);
					}
					if (element.rule1 == 'opMode') {
						items = items.filter(obj => obj.id != element.rule1);
					}
				});
			}
			this.RulesArray.push({
				"rule1": '',
				"rule2": '',
				"rule3": '',
				'rule1items': items,
				'rule3items': this.rule3items
			});
			this.RulesArray = [...this.RulesArray];
		}

	}
	callSortedArray(ordered_array) {
		var item_order;
		item_order = ['manufacturer', 'modelName', 'softwareVersion', 'hardwareVersion',
			'serialNumber', 'normalizedIpAddress', 'registrationId', 'wanAccessType', 'opMode'
		];
		ordered_array.sort(function (a, b) {
			item_order.indexOf(a.id) - item_order.indexOf(b.id);
		});
		let tempData = JSON.stringify(ordered_array);
		// return JSON.parse(tempData);
		return JSON.parse(tempData)
	}

	OnclickDeleteSymbol(i: any) {

		this.Rule_err = false;

		let validations = {
			manufacturer: ["opMode", "wanAccessType", "hardwareVersion", "softwareVersion", "modelName"],
			modelName: ["wanAccessType", "hardwareVersion", "softwareVersion"],
			softwareVersion: [],
			hardwareVersion: [],
			wanAccessType: [],
			opMode: [],
			normalizedIpAddress: [],
			registrationId: []
		}

		var temp = this.findObjectByKey(this.RulesArray[i].rule1);

		if (temp == undefined) {
			this.RulesArray.splice(i, 1);

			this.RulesArray = this.RulesArray;

			if (!this.RulesArray.length) {
				this.Rule_err = true;
				this.RuleAtleastOne = true;
				this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
			}
			return;
		}

		let ruleName = temp.id;
		let skipApisForTypes = ["serialNumber", "softwareVersion", "normalizedIpAddress", "registrationId", "wanAccessType", "opMode"];
		let rulesparams: any = this.getSelectedRules();
		let params = rulesparams['rule1'];
		if (validations[ruleName] && validations[ruleName].length) {
			for (let j = 0; j < validations[ruleName].length; j++) {
				if (params.indexOf(validations[ruleName][j]) !== -1) {
					this.Rule_err = true;
					let ruletemp = this.findObjectByKey(params[params.indexOf(validations[ruleName][j])]);
					if (this.language.fileLanguage == 'en') {
						this.ErrorMessage = `Error! cascade elements ${ruletemp.name} already existed!`;
					} else {
						this.ErrorMessage = `Erreur! les éléments de la cascade ${ruletemp.name} existaient déjà!`
					}

					return;
				}
			}


			this.RulesArray.splice(i, 1);

			this.RulesArray = this.RulesArray;

			if (!this.RulesArray.length) {
				this.Rule_err = true;
				this.ErrorMessage = `Error! All Rules must be complete and a minimum of one is required.`;
				this.GetDevice_Type(-1);
				return;
			}

			if (skipApisForTypes.indexOf(ruleName) !== -1) {
				this.getDiscoveredDeviceCount();
				return;
			}

			for (let k = i - 1; k >= 0; k--) {
				let tmpRuleName = this.RulesArray[k].rule1;

				if (skipApisForTypes.indexOf(tmpRuleName) === -1) {
					this.GetDevice_Type(k);
					break;
				}
			}


			this.getDiscoveredDeviceCount();

			return;
		}

		if (skipApisForTypes.indexOf(ruleName) !== -1) {
			this.RulesArray.splice(i, 1);

			this.RulesArray = this.RulesArray;

			this.getDiscoveredDeviceCount();
			//return;
		} else {
			this.RulesArray.splice(i, 1);

			this.RulesArray = this.RulesArray;
			this.GetDevice_Type(i - 1);
			//return;
		}

		if (!this.RulesArray.length) {
			this.Rule_err = true;
			this.RuleAtleastOne = true;

			this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
			this.RulesArray.splice(i, 1);
			this.FilledAll('');
		}

		return;

		if (this.RulesArray.length > 1) {
			if (temp.id == 'manufacturer') {
				let obj = this.findObjectByKey(this.RulesArray[i + 1].rule1);
				this.Rule_err = true;
				if (this.language.fileLanguage == 'en') {
					this.ErrorMessage = `Error! cascade elements ${obj.name} already existed!`;
				} else {
					this.ErrorMessage = `Erreur! les éléments de la cascade ${obj.name} existaient déjà!`;
				}

				return;
			}

			if (temp.id == 'modelName' && this.RulesArray[i + 1]) {
				let obj = this.findObjectByKey(this.RulesArray[i + 1].rule1);
				this.Rule_err = true;
				if (this.language.fileLanguage == 'en') {
					this.ErrorMessage = `Error! cascade elements ${obj.name} already existed!`;
				} else {
					this.ErrorMessage = `Erreur! les éléments de la cascade ${obj.name} existaient déjà!`;
				}

				return;
			}
		}

		if (this.RulesArray.length == 1) {
			this.Rule_err = true;
			this.RuleAtleastOne = true;

			this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
			this.RulesArray.splice(i, 1);
			this.FilledAll('');
		} else if (this.RulesArray.length == 2 && this.RulesArray[1].rule1 == "" && temp && temp.id == 'manufacturer') {
			this.Rule_err = true;
			this.RuleAtleastOne = true;

			this.ErrorMessage = 'Error! All Rules must be complete and a minimum of one is required.';
			this.RulesArray.splice(i, 1);
			this.FilledAll('');
		} else {
			this.Rule_err = false;
		}
		if (temp && temp.id == 'manufacturer' || temp && temp.id == 'modelName') {
			this.RulesArray.forEach(element => {
				if (element.rule1 == "softwareVersion") {
					this.Rule_err = true;
					this.ErrorMessage = "Error! cascade elements SW Version already existed!";
					this.FilledAll('');
				} else if (element.rule1 == "hardwareVersion") {
					this.Rule_err = true;
					this.ErrorMessage = "Error! cascade elements HW Version already existed!";
					this.FilledAll('');
				}
			});
		}
		if (temp && temp.id == 'manufacturer') {
			this.RulesArray.forEach(element => {
				if (element.rule1 == "opMode") {
					this.Rule_err = true;
					this.ErrorMessage = "Error! cascade elements Mode already existed!";
					this.FilledAll('');
				}
			});
		}
		if (!this.Rule_err) {
			this.FilledAll('active');
			this.RulesArray.splice(i, 1);
			//this.FilterDevice();
			for (var j = 0; j < this.RulesArray.length; j++) {
				let outPut = this.RulesArray[j].rule1items.find(obj => obj.id == temp.id);
				if (!outPut) {
					this.RulesArray[j].rule1items.push(temp);
				}
			}
			if (this.RulesArray.length == 0) {
				this.DiscoveredTableData = [];
			}

		}

		this.GetDevice_Type(i - 1);
	}

	findObjectByKey(value) {
		const ITEMS = [{
			id: '',
			name: ''
		}, {
			id: 'manufacturer',
			name: 'Manufacturer'
		},
		{
			id: 'modelName',
			name: 'Model'
		},
		{
			id: 'softwareVersion',
			name: 'SW Version'
		},
		{
			id: 'hardwareVersion',
			name: 'HW Version'
		},
		{
			id: 'serialNumber',
			name: 'FSAN/Serial Number'
		},
		{
			id: 'normalizedIpAddress',
			name: 'WAN IP'
		},
		{
			id: 'registrationId',
			name: 'Registration ID'
		},
		{
			id: 'wanAccessType',
			name: 'WAN Access Type'
		},
		{
			id: 'opMode',
			name: 'Mode'
		}
		];
		for (var i = 0; i < ITEMS.length; i++) {
			if (ITEMS[i]['id'] == value) {
				return ITEMS[i];
			}
		}
	}
	refresh() {

		var btn = document.getElementById('my-btn');
		btn.children[0].classList.add('spin-animation');
		setTimeout(function () {
			btn.children[0].classList.remove('spin-animation');
		}, 500);
	}
	rerender(param?: any): void {
		this.dtElements.forEach((dtElement: DataTableDirective) => {
			dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
				// Do your stuff
				dtInstance.draw();


				var btn = document.getElementById('my-btn');
			});
		});
	}


	pageErrorHandle(err: HttpErrorResponse) {
		this.loading = false;
		if (err.status == 401) {
			this.warningMessage = 'Access Denied';
		} if (err.status === 504) {
			this.warningMessage = 'Gateway Timeout';
		} else {
			//this.warningMessage = this.service.pageErrorHandle(err);
			let errorInfo = this.ssoService.pageErrorHandle(err);
			let langfromapi = this.ssoService.getspecificlangliterals()

			if (errorInfo?.includes("that conflicts with another group")) {
				let devicename: HTMLInputElement = document.querySelector("#deviceName")
				let latest = langfromapi[errorInfo?.replace(devicename.value, "$$$$$")]
				let finalerrormessage = latest?.replace("$$$", devicename.value)
				this.warningMessage = finalerrormessage ? finalerrormessage : this.ssoService.pageErrorHandle(err);

			}
			else {
				this.warningMessage = this.ssoService.pageErrorHandle(err);

			}

		}
		this.isError = true;
		$("body").scrollTop(0);
	}
	ngOnDestroy() {
		this.languageSubject?.unsubscribe();
		if (this.dtTrigger) {
			this.dtTrigger.unsubscribe();
		}
		if (this.EditDeviceGrpSubscribe) {
			this.EditDeviceGrpSubscribe.unsubscribe();
		}
		if (this.UpdateDeviceGrpSubscribe) {
			this.UpdateDeviceGrpSubscribe.unsubscribe();
		}
		if (this.DiscoveredStaticSubscribe) {
			this.DiscoveredStaticSubscribe.unsubscribe();
		}
		if (this.allDeviceGrpSubscribe) {
			this.allDeviceGrpSubscribe.unsubscribe();
		}
		if (this.AddDeviceGrpSubscribe) {
			this.AddDeviceGrpSubscribe.unsubscribe();
		}
		if (this.UnDiscoveredStaticSubscribe) {
			this.UnDiscoveredStaticSubscribe.unsubscribe();
		}
		if (this.DeleteDeviceGrpSubscribe) {
			this.DeleteDeviceGrpSubscribe.unsubscribe();
		}
	}

	// getParams(index, arr: any) {

	// 	let params: any = {
	// 		"orgId": this.orgId
	// 	};
	// 	if (index == -1) {
	// 		return params;
	// 	}

	// 	for (let i = 0; i <= index; i++) {
	// 		let element = arr;

	// 		if (element.rule2 == "$ne") {
	// 			params[element.rule1] = {
	// 				"$ne": element.rule3
	// 			}
	// 		} else if (element.rule2 == "$in") {
	// 			element['rule3'].forEach((element: any) => {
	// 				if (!element) {

	// 					this.ErrorMessage = `Rule ${i + 1} is not valid.`
	// 					this.Rule_err = true;
	// 					return;
	// 				}
	// 			});
	// 			params[element.rule1] = {
	// 				"$in": element.rule3
	// 			}
	// 		} else if (element.rule2 == "$regex") {
	// 			let value = element.rule3 ? element.rule3 : '';
	// 			value = value.replace(/\*/g, '.*?');
	// 			value = "^" + value + "$";
	// 			params[element.rule1] = {
	// 				"$regex": value
	// 			}
	// 		} else {
	// 			params[element.rule1] = element.rule3;
	// 		}

	// 		if (index == i) {
	// 			break;
	// 		}
	// 	}

	// 	for (var propName in params) {
	// 		if (params[propName] === null || params[propName] === undefined || params[propName] === '') {
	// 			delete params[propName];
	// 		}
	// 	}

	// 	return params;
	// }

	getParams(index, arr: any) {

		let params: any = {
			"orgId": this.orgId
		};
		if (index == -1) {
			return params;
		}

		let skipApisForTypes = ["serialNumber", "normalizedIpAddress", "registrationId", "wanAccessType", "opMode", "softwareVersion", "hardwareVersion"];
		let skipApis = true;

		for (let i = 0; i <= index; i++) {
			let element = arr[i];

			if (skipApis && skipApisForTypes.indexOf(element.rule1) !== -1) {
				continue;
			}

			if (arr[i]["rule1"] == 'normalizedIpAddress') {
				let value = arr[i]["rule3"];

				if (!this.checkSubnet(value)) {
					this.Rule_err = true;
					return;
				}
				let ranges = this.toIpRange(value);
				let value_ = {};
				let rule: any;
				if (ranges.length > 1) {

					ranges = ranges.map((range: any) => {
						return { "normalizedIpAddress": range };
					});

					params["$or"] = ranges;

				} else {

					params[element.rule1] = ranges[0];
				}
			} else if (element.rule2 == "$ne") {
				params[element.rule1] = {
					"$ne": element.rule3
				}
			} else if (element.rule2 == "$in") {
				element['rule3'].forEach((element: any) => {
					if (!element) {
						if (this.language.fileLanguage == 'en') {
							this.ErrorMessage = `Rule ${i + 1} is not valid.`
						} else {
							this.ErrorMessage = `La règle ${i + 1} n'est pas valide.`
						}
						this.Rule_err = true;
						return;
					}
				});
				params[element.rule1] = {
					"$in": element.rule3
				}
			} else if (element.rule2 == "$regex") {
				let value = element.rule3 ? element.rule3 : "";
				value = value.replace(/\*/g, '.*?');
				value = "^" + value + "$";
				params[element.rule1] = {
					"$regex": value
				}
			} else {
				params[element.rule1] = element.rule3;
			}

			if (index == i) {
				break;
			}
		}

		for (var propName in params) {
			if (params[propName] === null || params[propName] === undefined || params[propName] === '') {
				delete params[propName];
			}
		}

		return params;
	}

	getParamsNew(index, skipApis?: boolean) {

		let params: any = {
			"orgId": this.orgId
		};
		if (index == -1) {
			return params;
		}

		let skipApisForTypes = ["serialNumber", "normalizedIpAddress", "registrationId", "wanAccessType", "opMode", "softwareVersion", "hardwareVersion"];

		for (let i = 0; i <= index; i++) {
			let element = this.RulesArray[i];

			if (skipApis && skipApisForTypes.indexOf(element.rule1) !== -1) {
				continue;
			}

			if (this.RulesArray[i]["rule1"] == 'normalizedIpAddress') {
				let value = this.RulesArray[i]["rule3"];

				if (!this.checkSubnet(value)) {
					this.Rule_err = true;
					this.ErrorMessage = "Error! Rule WANIP contains invalid characters, only IPv4 or IPv6 CIDR address allowed(e.g 192.168.1.0/24,2001:db8:1234::/48)";
					//Session.set(RULE_KEY_ERROR, Utils.getLabel("ruleWANIPContainsInvalidCharactersForIPv4OrIpv6"));
					return;
				}
				else {
					this.Rule_err = false;
				}
				let ranges = this.toIpRange(value);
				let value_ = {};
				let rule: any;
				if (ranges.length > 1) {

					ranges = ranges.map((range: any) => {
						return { "normalizedIpAddress": range };
					});

					params["$or"] = ranges;

				} else {

					params[element.rule1] = ranges[0];
				}
			} else if (element.rule2 == "$ne") {
				params[element.rule1] = {
					"$ne": element.rule3
				}
			} else if (element.rule2 == "$in") {
				element['rule3'].forEach((element: any) => {
					if (!element) {

						this.ErrorMessage = `Rule ${i + 1} is not valid.`
						this.Rule_err = true;
						return;
					}
				});
				params[element.rule1] = {
					"$in": element.rule3
				}
			} else if (element.rule2 == "$regex") {
				let value = element.rule3 ? element.rule3 : "";
				value = value.replace(/\*/g, '.*?');
				value = "^" + value + "$";
				params[element.rule1] = {
					"$regex": value
				}
			} else {
				params[element.rule1] = element.rule3;
			}

			if (index == i) {
				break;
			}
		}

		for (var propName in params) {
			if (params[propName] === null || params[propName] === undefined || params[propName] === '') {
				delete params[propName];
			}
		}

		return params;
	}

	checkSubnet(subnet) {
		if (subnet) {
			var rtn = true;
			var cidrArr = subnet.split(",");

			cidrArr.forEach((cidr: any) => {
				rtn = rtn && (isCidr.v4(cidr) || isCidr.v6(cidr))
			});

			return rtn;
		} else {
			return false;
		}
	}

	toIpRange(value) {
		var ranges = value.split(',');
		var results = [],
			network, mask, subnet, calculated;

		if (ranges.length) {
			ranges.forEach((range: any) => {
				network = range.split('/')[0];
				mask = range.split('/')[1];
				if (this.isIpv4CIDR(range)) {
					subnet = this.IpSubnetCalculator.calculateSubnetMask(network, mask);
					calculated = {
						'$gte': this.paddingIp(subnet.ipLowStr),
						'$lte': this.paddingIp(subnet.ipHighStr)
					};
				} else {
					subnet = this.IPv6AddressService.range(network, mask);
					calculated = {
						'$gte': subnet.ipLowStr,
						'$lte': subnet.ipHighStr
					}
				}

				results.push(calculated);

			});
		}
		// _.each(ranges, function(range) {
		//   network = range.split('/')[0];
		//   mask = range.split('/')[1];
		//   if (this.IPv6AddressService.isIpv4CIDR(range)) {
		// 	subnet = this.IpSubnetCalculator.calculateSubnetMask(network, mask);
		// 	calculated = {
		// 	  '$gte': this.paddingIp(subnet.ipLowStr),
		// 	  '$lte': this.paddingIp(subnet.ipHighStr)
		// 	};
		//   } else {
		// 	subnet = this.IPv6Address.range(network, mask);
		// 	calculated = {
		// 	  '$gte': subnet.ipLowStr,
		// 	  '$lte': subnet.ipHighStr
		// 	}
		//   }

		//   results.push(calculated);
		// });
		return results;
	};

	supportWanAccessType() {
		let modelObj = this.findObject(this.RulesArray, 'rule1', 'modelName');
		let selectedModels = typeof modelObj.rule3 === 'object' ? modelObj.rule3 : [modelObj.rule3]

		var modelNameOperator = modelObj.rule2 ? modelObj.rule2 : null;
		var queriedValue = modelObj.rule3;
		let selectedModel = '';

		if (queriedValue && modelNameOperator) {
			if (modelNameOperator === 'Equals') {
				var result = false;


				selectedModels.forEach((model: any) => {
					result = result || /844GE(-\d)?/i.test(model) || /^[MGS4227/GS4227].*/.test(model);
					selectedModel = model;
				});
				if (result) {
					//	this.rule3items['wanAccessType'] = []
					//	this.GetwanAccessTypes(selectedModel)
					// setTimeout(() => {

					// 	this.rule3items['wanAccessType'] = this.wanAccessTypes;
					// }, 1000);

					// if (/^[MGS4227/GS4227].*/.test(selectedModel)) {

					// 	this.rule3items['wanAccessType'] = [
					// 		{
					// 			id: "GPON",
					// 			name: "GPON"
					// 		},
					// 		{
					// 			id: "XGSPON",
					// 			name: "XGSPON"
					// 		},
					// 		{
					// 			id: "CopperEthernet",
					// 			name: "CopperEthernet"
					// 		},
					// 		{
					// 			id: "AE",
					// 			name: "AE"
					// 		}
					// 	]
					// } else {
					// 	[{
					// 		id: "AE",
					// 		name: "AE"
					// 	},
					// 	{
					// 		id: "GPON",
					// 		name: "GPON"
					// 	}
					// 	]
					// }
					// var modelIndex = ["GS4227", "GS4227W", "MGS4227", "MGS4227W", "GS4227W-2", "GS4227-2", "MGS4227-2", "MGS4227W-2"].indexOf(selectedModel);
					// if (modelIndex != -1) {
					// 	let wanAccType = {
					// 		id: "10G-AE",
					// 		name: "10G-AE"
					// 	}
					// 	this.rule3items['wanAccessType'].push(wanAccType);
					// }
					// if (selectedModel == 'GS4220E' || selectedModel == 'MGS4220E') {
					// 	this.rule3items['wanAccessType'] = this.rule3items['wanAccessType']?.filter(x => x.id != "AE")
					// }

				}



				return result
			}
			else if (modelNameOperator === '$in') {
				var result = true;
				selectedModels.forEach((model: any) => {
					result = result && /844GE(-\d)?/i.test(model) || /^[MGS4227/GS4227].*/.test(model);
				});

				if (result) {
					//	this.rule3items['wanAccessType'] = []
					//	this.GetwanAccessTypes(selectedModel)
					// setTimeout(() => {

					// 	this.rule3items['wanAccessType'] = this.wanAccessTypes;
					// }, 1000);
					// if (/^[MGS4227/GS4227].*/.test(selectedModel)) {

					// 	this.rule3items['wanAccessType'] = [
					// 		{
					// 			id: "GPON",
					// 			name: "GPON"
					// 		},
					// 		{
					// 			id: "XGSPON",
					// 			name: "XGSPON"
					// 		},
					// 		{
					// 			id: "CopperEthernet",
					// 			name: "CopperEthernet"
					// 		}
					// 	]
					// } else {
					// 	[{
					// 		id: "AE",
					// 		name: "AE"
					// 	},
					// 	{
					// 		id: "GPON",
					// 		name: "GPON"
					// 	}
					// 	]
					// }
					// var modelIndex = ["GS4227", "GS4227W", "MGS4227", "MGS4227W", "GS4227W-2", "GS4227-2", "MGS4227-2", "MGS4227W-2"].indexOf(selectedModel);
					// if (modelIndex != -1) {
					// 	let wanAccType = {
					// 		id: "10G-AE",
					// 		name: "10G-AE"
					// 	}
					// 	this.rule3items['wanAccessType'].push(wanAccType);
					// }
					// if (selectedModel == 'GS4220E' || selectedModel == 'MGS4220E') {
					// 	this.rule3items['wanAccessType'] = this.rule3items['wanAccessType']?.filter(x => x.id != "AE")
					// }


				}

				return result;
			}
			else {
				return false
			}
		}
	}


	findObject(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return array[i];
			}
		}
		return null;
	}

	getRules() {
		var rules = [], index = 0, filter, oper = '', value_, oper_desc, val_desc, value;
		let useKeys = [];
		if (this.cpeFilter) {

			for (const key in this.cpeFilter) {
				value = this.cpeFilter[key];

				if (key === '$or') {
					filter = this.findObject(this.rule1items, 'id', Object.keys(value[0])[0]);
				} else {
					filter = this.findObject(this.rule1items, 'id', key);
				}
				oper = '';
				value_ = value;

				if (filter.id === 'normalizedIpAddress') {
					oper = '$subnets';
					value_ = this.fromIpRange(value_);
				} else {
					if (typeof value == 'object') {
						for (oper in value) {
							if (value.hasOwnProperty(oper) && oper !== '$options') {
								value_ = value[oper];
							}
						}
					}
					if (oper === '$regex') {
						if (value_.slice(0, 1) === '^' && value_.slice(-1) === '$') {
							value_ = value_.substring(1, value_.length - 1);
						}
						value_ = this.replaceAll(value_, '.*?', '*');
						/*if(value_.indexOf('*')<0){
						 value_ = '*' + value_ + '*';
						 }*/
					}
				}
				oper_desc = this.operatorsMapping[oper] || 'Equals';
				val_desc = value_.toString();
				rules.push({
					index: index,
					key: filter.id,
					keydesc: filter.label,
					oper: oper,
					operdesc: oper_desc,
					value: value_,
					valuedesc: val_desc
				});
				useKeys.push({
					index: index,
					key: filter.id,
					oper: oper,
					value: value_
				});
				index++;

			}

		}
		return rules;
	}

	bin2HexOfSection(binStr) {
		return parseInt(binStr, 2).toString(16)
	}

	hex2BinOfSection(hexStr) {
		return parseInt(hexStr, 16).toString(2)
	}

	getSubnet(range) {
		var value_start = range['$gte'];
		var value_end = range['$lte'];
		var result_;
		if (this.IPv6AddressService.isIpv6Address(value_start)) {
			var subnet: any = this.IPv6AddressService.cidr(value_start, value_end);
			result_ = subnet.ipLowStr + "/" + subnet.prefixSize;
		} else {
			value_start = this.unpaddingIp(value_start);
			value_end = this.unpaddingIp(value_end);
			var subnet: any = this.IpSubnetCalculator.calculate(value_start, value_end);
			result_ = subnet[0].ipLowStr + "/" + subnet[0].prefixSize;
		}
		return result_;
	};

	fromIpRange(ranges) {
		var result;

		if (typeof (ranges) === 'object' && Array.isArray(ranges)) {
			result = ranges.map((range: any) => {
				return this.getSubnet(range['normalizedIpAddress']);
			})

			result = result.join();
		} else {
			result = this.getSubnet(ranges);
		}
		return result;
	}

	padSection(section, len) {
		var padding = "0".repeat(len);
		if (section.length < padding.length) {
			section = padding.substring(0, padding.length - section.length) + section;
		}
		return section;
	}

	unpaddingIp(ip) {
		return ip.split('.').map(Number).join('.');
	}

	paddingIp(ip) {
		var bitArray = ip.split('.');

		var padded = bitArray.map(function (bit) {
			if (bit.length === 1) {
				bit = "00" + bit;
			} else if (bit.length === 2) {
				bit = "0" + bit;
			}
			return bit;
		});
		// var padded = _.map(bitArray, function (bit) {
		// 	if (bit.length === 1) {
		// 		bit = "00" + bit;
		// 	} else if (bit.length === 2) {
		// 		bit = "0" + bit;
		// 	}
		// 	return bit;
		// });
		return padded.join('.');
	}

	replaceAll(string, find, replace) {
		return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
	}

	escapeRegExp(string) {
		return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}





	getDeviceType(index?: any) {
		let params: any = {
			"orgId": this.orgId
		};

		params = params ? params : { orgId: this.ssoService.getOrgId() }
		this.allDeviceGrpSubscribe = this.service.GetDeviceType(JSON.stringify(params)).subscribe((res: any) => {
			let emptyObj = {
				id: '',
				name: ''
			};

			let manufact_arr: any = [];
			let model_arr: any = [];
			let swver_arr: any = [];
			let hwver_arr: any = [];
			let fsan_arr: any = [];
			let wanip_arr: any = [];
			let reg_arr: any = [];
			let wanacc_arr: any = [];
			let mode_arr: any = [];
			this.DeviceTypeArr = res;

			let opmode: any = [{
				"id": "WAP",
				"name": "WAP"
			}, {
				"id": "RG",
				"name": "RG"
			}];
			for (var i = 0; i < this.DeviceTypeArr.length; i++) {
				manufact_arr.push({
					"id": this.DeviceTypeArr[i]['manufacturer'],
					"name": this.DeviceTypeArr[i]['manufacturer']
				});
				model_arr.push({
					"id": this.DeviceTypeArr[i]['modelName'],
					"name": this.DeviceTypeArr[i]['modelName']
				});
				swver_arr.push({
					"id": this.DeviceTypeArr[i]['softwareVersion'],
					"name": this.DeviceTypeArr[i]['softwareVersion']
				});
				hwver_arr.push({
					"id": this.DeviceTypeArr[i]['hardwareVersion'],
					"name": this.DeviceTypeArr[i]['hardwareVersion']
				});
				fsan_arr.push({
					"id": this.DeviceTypeArr[i]['serialNumber'],
					"name": this.DeviceTypeArr[i]['serialNumber']
				});
				wanip_arr.push({
					"id": this.DeviceTypeArr[i]['ipAddress'],
					"name": this.DeviceTypeArr[i]['ipAddress']
				});
				reg_arr.push({
					"id": this.DeviceTypeArr[i]['registrationId'],
					"name": this.DeviceTypeArr[i]['registrationId']
				});
				wanacc_arr.push({
					"id": this.DeviceTypeArr[i]['wanAccessType'],
					"name": this.DeviceTypeArr[i]['wanAccessType']
				});
				//mode_arr.push({"id":this.DeviceTypeArr[i]['opMode'],"name":this.DeviceTypeArr[i]['opMode']})
				mode_arr = opmode;
			}
			manufact_arr = this.unique(manufact_arr);
			model_arr = this.unique(model_arr);
			swver_arr = this.unique(swver_arr);
			hwver_arr = this.unique(hwver_arr);
			fsan_arr = this.unique(fsan_arr);
			wanip_arr = this.unique(wanip_arr);
			reg_arr = this.unique(reg_arr);
			wanacc_arr = this.unique(wanacc_arr);
			mode_arr = this.unique(mode_arr);






			this.rule3items = {
				"manufacturer": manufact_arr,
				"modelName": model_arr,
				"softwareVersion": swver_arr,
				"hardwareVersion": hwver_arr,
				"serialNumber": fsan_arr,
				"normalizedIpAddress": wanip_arr,
				"registrationId": reg_arr,
				"wanAccessType": this.defaultWanAccessTypes,
				"opMode": mode_arr,
			}

			this.displayEditGroup(this.deviceGroupId);

		}, (err: HttpErrorResponse) => {


			this.pageErrorHandle(err);
			// this.commonOrgService.pageScrollTop();
		});
	}

	isIpv4CIDR = function (subnet) {
		return this.ipv4BasicExp.test(subnet);
	};

	startSpin(id) {
		var btn = document.getElementById(id) as HTMLElement;
		if (btn) {
			if (btn.children[0]) {
				btn.children[0].classList.add('spin-animation');
				setTimeout(function () {
					btn.children[0].classList.remove('spin-animation');
				}, 500);
			}
		}
	}

	endSpin(id) {
		var btn = document.getElementById(id) as HTMLElement;
		if (btn) {
			if (btn.children[0]) {
				setTimeout(function () {
					btn.children[0].classList.remove('spin-animation');
				}, 1000);
			}
		}
	}

	// changeTableStatusLanguage(dtObj) {
	// 	const nf = new Intl.NumberFormat();
	// 	this.tableCounts = {
	// 		searchText: dtObj.oPreviousSearch.sSearch.trim(),
	// 		total: dtObj._iRecordsTotal,
	// 		displayCount: dtObj._iDisplayLength,
	// 		displayed: dtObj._iRecordsDisplay,
	// 		start: dtObj._iDisplayStart
	// 	};
	// 	const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr'),
	// 		filtered = `${dtObj.oPreviousSearch.sSearch.trim() ?
	// 			(isFrench ?
	// 				`(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` :
	// 				`(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
	// 			''}`;
	// 	const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
	// 	const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
	// 	$('div [role="status"]').text(isFrench ?
	// 		`Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` :
	// 		`Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
	// 	)
	// 	$(".first").text(isFrench ? 'Le début' : 'First');
	// 	$(".previous").text(isFrench ? 'Précédent' : 'Previous');
	// 	$(".next").text(isFrench ? 'Suivant' : 'Next');
	// 	$(".last").text(isFrench ? 'Dernière' : 'Last');
	// }
	tableCountsUnDic;
	changeTableStatusLanguageUnDisc(dtObj) {
		const nf = new Intl.NumberFormat();
		this.tableCountsUnDic = {
			searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
			total: dtObj._iRecordsTotal,
			displayCount: dtObj._iDisplayLength,
			displayed: dtObj._iRecordsDisplay,
			start: dtObj._iDisplayStart
		};
		const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
		const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
		const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
		const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
			(isFrench ?
				`(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
					isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
						`(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
			''}`;
		const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
		const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
		$('#devicegrp-info-tbl-static-undisc_wrapper [role="status"]').text(isFrench ?
			`Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
				`Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
		);
		//$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
		//$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
		//$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
		$("#devicegrp-info-tbl-static-undisc_first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
		$("#devicegrp-info-tbl-static-undisc_previous").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Zurück' : 'Previous');
		$("#devicegrp-info-tbl-static-undisc_next").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Weiter' : 'Next');
		$("#devicegrp-info-tbl-static-undisc_last").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Letzte' : 'Last');
	}
	// dtOptionsstaticdis
	tableStaticDisc;
	changeTableStatusLanguageStaticDisc(dtObj) {
		const nf = new Intl.NumberFormat();
		this.tableStaticDisc = {
			searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
			total: dtObj._iRecordsTotal,
			displayCount: dtObj._iDisplayLength,
			displayed: dtObj._iRecordsDisplay,
			start: dtObj._iDisplayStart
		};
		const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
		const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
		const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
		const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
			(isFrench ?
				`(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
					isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
						`(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
			''}`;
		const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
		const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
		$('#devicegrp-info-tbl-static_wrapper').find('#devicegrp-info-tbl-static_info').text(isFrench ?
			`Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
				`Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
		);
		//$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
		//$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
		//$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
		$("#devicegrp-info-tbl-static_first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
		$("#devicegrp-info-tbl-static_previous").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Zurück' : 'Previous');
		$("#devicegrp-info-tbl-static_next").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Weiter' : 'Next');
		$("#devicegrp-info-tbl-static_last").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Letzte' : 'Last');
	}

	tableCountsDeviceGrpInfo;
	changeTableStatusLanguageDeviceGrpInfo(dtObj) {
		const nf = new Intl.NumberFormat();
		this.tableCountsDeviceGrpInfo = {
			searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
			total: dtObj._iRecordsTotal,
			displayCount: dtObj._iDisplayLength,
			displayed: dtObj._iRecordsDisplay,
			start: dtObj._iDisplayStart
		};
		const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
		const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
		const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
		const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
			(isFrench ?
				`(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
					isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
						`(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
			''}`;
		const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
		const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
		$('#devicegrp-info-tbl_wrapper div[role="status"]').text(isFrench ?
			`Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
				`Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
		);
		//$(".dataTables_filter label")[0].childNodes[0].nodeValue = isFrench ? 'Chercher:' : 'Search:';
		//$(".dataTables_length label")[0].childNodes[0].nodeValue = isFrench ? 'Afficher les ' : 'Show ';
		//$(".dataTables_length label")[0].childNodes[2].nodeValue = isFrench ? ' entrées' : ' entries';
		$("#devicegrp-info-tbl_first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
		$("#devicegrp-info-tbl_previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
		$("#devicegrp-info-tbl_next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
		$("#devicegrp-info-tbl_last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
	}
	hideSuccess() {
		this.showSuccess = false;
		this.successMsg = '';
	}

	goBack() {
		//	this._location.back();

		if (this.router.url.includes("cco/operations/configuration/system-groups") || this.router.url.includes('cco/operations/device-groups')) {
			this.router.navigate(['cco/operations/configuration/system-groups']);
		}
		else if (this.router.url.includes("/cco-foundation/foundation-configuration/device-groups-add") ||
			this.router.url.includes('cco-foundation/foundation-configuration/device-groups')) {
			this.router.navigate(['cco-foundation/foundation-configuration/configuration-prerequisites/device-groups']);
		}
		else {
			this.router.navigate(['support/netops-management/operations/devices-groups']);
		}
	}
	// onselectitem(i) {
	// 	console.log(i)
	// 	return this.RulesArray[i]['rule3items'][this.RulesArray[i].rule1].filter(e => e.id != '')

	// }

	workFlowMenbers(id = this.deletedata._id, name = this.deletedata.name, warningDelete = true) {
		this.loading = true
		sessionStorage.setItem('workflowid', id);
		sessionStorage.setItem('workflowName', name);
		const obj = {
			/* modalname : this.modalname,
			MemberCount : this.MemberCount,
			workflowcount : this.workflowcount, */
			deletedata: this.deletedata,
			retainDelete: true
		}
		if (window.location.href?.indexOf('/cco/operations/configuration/system-groups') !== -1) {
			this.router.navigate(['./cco/operations/configuration/devices-group/workflow']);
			return;
		}
		this.ssoService.redirectByUrl([
			`/support/netops-management/devices-groups-workflow`,
			`cco/device-groups-workflow`,
			`cco-foundation/foundation-configuration/device-groups-workflow`,
			`/cco/operations/device-groups-workflow`,
		], { state: warningDelete ? obj : {} });

	}
	getWorkflows() {
		let filterOnBoot = this.router?.url?.includes('support/netops-management/') ? true : false;
		this.getAllWorkFlows = this.service.getWorkflowsById(this.orgId, this.systemGroupId, filterOnBoot).subscribe((res) => {
			if (res) {
				this.workflowMemberData = res;
			}
			this.loading = false
		}, (err: HttpErrorResponse) => {
			this.pageErrorHandle(err);
			this.isError = true
			this.loading = false
		})
	}
	cancelWorkFlowGroup() {
		let obj = history.state;
		if (obj.retainDelete) obj["retainApproval"] = true;

		// if (this.router.url.includes('cco/operations/device-groups-workflow')) {
		// 	this.router.navigate(['cco/operations/cco-subscriber-operations/operations/devices-groups'], { state: obj });

		// } 
		if (this.router.url.includes("cco/operations/configuration/devices-group/workflow") ||
			this.router.url.includes('cco/operations/device-groups')) {
			this.router.navigate(['cco/operations/configuration/system-groups']);
		}
		else {
			this.ssoService.redirectByUrl([
				'/support/netops-management/operations/devices-groups',
				'/cco/operations/configuration/system-groups',
				// 'cco/operations/cco-system-operations/device-groups',
				'cco-foundation/foundation-configuration/configuration-prerequisites/device-groups',
				'cco/operations/cco-subscriber-operations/operations/devices-groups',
			], { state: obj })
		}
	}
	getDevicesearchCount() {
		this.allDeviceGrpSubscribe = this.service.getDeviceGoupsearchCount(this.orgId, this.searchText).subscribe((res: any) => {
			this.DeviceCount = res.count;
		}, (err: HttpErrorResponse) => {
			this.pageErrorHandle(err);
		})
	}
	searchGroupBy() {
		this.loading = true
		if (this.searchText) {
			this.searchurl = `${environment.SUPPORT_URL}/netops-device/group?${this.ssoService.getOrg(this.orgId)}deviceId=${this.searchText}`
			// this.getDevicesearchCount();
			// setTimeout(() => {
			this.rerender(1);
			// }, 3000);
			// this.getAllWorkFlows = this.service.getDeviceGroups(this.orgId, this.searchText).subscribe((data) => {
			// 	this.DeviceTableData = data;
			// 	this.loading = false
			// }, (err: HttpErrorResponse) => {
			// 	this.pageErrorHandle(err);
			// 	this.isError = true
			// 	this.loading = false
			// })
			// this.GetabSerachList()


		} else {
			this.searchurl = `${environment.SUPPORT_URL}/netops-device/group?${this.ssoService.getOrg(this.orgId)}`;
			// this.getDeviceCount();
			// setTimeout(() => {
			this.rerender(1);
			// }, 3000);
			// this.GetabList();
		}
	}
	tableCountsDeviceGroup;
	changeTableStatusLanguageDeviceGroup(dtObj) {
		const nf = new Intl.NumberFormat();
		this.tableCountsDeviceGroup = {
			searchText: dtObj.oPreviousSearch.sSearch.replace(/\s+/g, ""),
			total: dtObj._iRecordsTotal,
			displayCount: dtObj._iDisplayLength,
			displayed: dtObj._iRecordsDisplay,
			start: dtObj._iDisplayStart
		};
		const isFrench = (sessionStorage.getItem('defaultLanguage') == 'fr');
		const isSpanish = (sessionStorage.getItem('defaultLanguage') == 'es');
		const isGermen = (sessionStorage.getItem('defaultLanguage') == 'de_DE');
		const filtered = `${dtObj.oPreviousSearch.sSearch.replace(/\s+/g, "") ?
			(isFrench ?
				`(filtrées à partir des ${nf.format(dtObj._iRecordsTotal)} entrées totales)` : isSpanish ? `(filtrado de un total de ${nf.format(dtObj._iRecordsTotal)} entradas)` :
					isGermen ? `(gefiltert aus ${nf.format(dtObj._iRecordsTotal)} Einträgen)` :
						`(filtered from ${nf.format(dtObj._iRecordsTotal)} total entries)`) :
			''}`;

		const startCount = (dtObj._iRecordsDisplay == 0) ? -1 : dtObj._iDisplayStart;
		const showingCount = (dtObj._iDisplayStart + dtObj._iDisplayLength) > dtObj._iRecordsDisplay ? dtObj._iRecordsDisplay : (dtObj._iDisplayStart + dtObj._iDisplayLength);
		$('#devicegrp-table_wrapper').find('#devicegrp-table_info').text(isFrench ?
			`Affichage de ${nf.format(startCount + 1)} à ${nf.format(showingCount)} des ${nf.format(dtObj._iRecordsDisplay)} entrées ${filtered}` : isSpanish ? `Se muestran del ${nf.format(startCount + 1)} al ${nf.format(showingCount)} de ${nf.format(dtObj._iRecordsDisplay)} resultados ${filtered}` : isGermen ? `Angezeigt ${nf.format(startCount + 1)} bis ${nf.format(showingCount)} von ${nf.format(dtObj._iRecordsDisplay)} ergebnissen ${filtered}` :
				`Showing ${nf.format(startCount + 1)} to ${nf.format(showingCount)} of ${nf.format(dtObj._iRecordsDisplay)} entries ${filtered}`
		);
		$("#devicegrp-table_first").text(isFrench ? 'Le début' : isSpanish ? 'Primero' : isGermen ? 'Erste Seite' : 'First');
		$("#devicegrp-table_previous").text(isFrench ? 'Précédent' : isSpanish ? 'Anterior' : isGermen ? 'Zurück' : 'Previous');
		$("#devicegrp-table_next").text(isFrench ? 'Suivant' : isSpanish ? 'Siguiente' : isGermen ? 'Weiter' : 'Next');
		$("#devicegrp-table_last").text(isFrench ? 'Dernière' : isSpanish ? 'Último' : isGermen ? 'Letzte' : 'Last');
	}
}
