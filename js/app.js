(function() {
	'use strict';
	angular
		.module('styleguideApp', [
			'currentUserInfoService',
			'pascalprecht.translate',
			'tmh.dynamicLocale',
			'ngMaterial',
			'ngSanitize',
			'ui.tree',
			'ui.grid',
			'ui.grid.autoResize',
			'ui.grid.exporter',
			'ui.grid.selection',
			'ui.bootstrap',
			'ui.bootstrap.tpls',
			'angularMoment',
			'ui.bootstrap.persian.datepicker',
			'wfm.cardList',
			'wfm.timerangepicker',
			'wfm.oldDateRangePicker',
			'wfm.workingHoursPicker',
			'ngAnimate',
			'wfm.pagination',
			'wfm.modal',
			'wfm.numericValue',
			'wfm.notice',
			'wfm.multiplesearchinput',
			'wfm.rightPanel',
			'wfm.skillPickerOld',
			'wfm.skillPicker',
			'wfm.badge',
			'wfm.btnGroup',
			'wfm.popup',
			'wfm.treePicker',
			'wfm.card-panel',
			'wfm.datePicker',
			'wfm.dateRangePicker',
			'gridshore.c3js.chart'
		])
		.config([
			'$translateProvider',
			'tmhDynamicLocaleProvider',
			function($translateProvider, tmhDynamicLocaleProvider) {
				$translateProvider.translations('en-us', {
					Sun: 'Sun',
					Mon: 'Mon',
					Tue: 'Tue',
					Wed: 'Wed',
					Thu: 'Thu',
					Fri: 'Fri',
					Sat: 'Sat'
				});
				$translateProvider.preferredLanguage('en-us');
				$translateProvider.useSanitizeValueStrategy('escape');
				tmhDynamicLocaleProvider.localeLocationPattern(
					'../node_modules/angular-i18n/angular-locale_{{locale}}.js'
				);
			}
		])
		.controller('mainCtrl', [
			'$scope',
			'$translate',
			'NoticeService',
			'tmhDynamicLocale',
			'$timeout',
			function($scope, $translate, NoticeService, tmhDynamicLocale, $timeout) {
				$translate.use(window.navigator.language.toLowerCase());
				tmhDynamicLocale.set(window.navigator.language.toLowerCase());

				/* Dummy data*/
				$scope.demos = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
				$scope.treeOption = {
					NodeDisplayName: 'label',
					NodeChildrenName: 'nodes',
					NodeSelectedMark: 'selected'
				};
				$scope.treeOption2 = {
					NodeDisplayName: 'label',
					NodeChildrenName: 'nodes',
					NodeSelectedMark: 'selected',
					NodeSemiSelected: 'semiSelected'
				};
				$scope.treeOption3 = {
					NodeDisplayName: 'label',
					NodeChildrenName: 'nodes',
					NodeSelectedMark: 'selected',
					NodeSemiSelected: 'semiSelected',
					RootSelectUnique: true
				};
				$scope.treeOption4 = {
					NodeDisplayName: 'label',
					NodeChildrenName: 'nodes',
					NodeSelectedMark: 'selected',
					NodeSemiSelected: 'semiSelected',
					DisplayTreeFilter: true
				};
				var treeDemos = {
					nodes: [
						{
							label: 'parent1',
							id: '1',
							selected: false,
							nodes: [
								{
									label: 'child1',
									id: '2',
									selected: false,
									nodes: [
										{
											label: 'grandchild1',
											id: '3',
											selected: false,
											nodes: [
												{
													label: 'child1',
													id: '12',
													selected: true,
													nodes: []
												},
												{
													label: 'child1',
													id: '22',
													selected: false,
													nodes: []
												}
											]
										}
									]
								}
							]
						},
						{
							label: 'parent2',
							id: '4',
							selected: false,
							nodes: [
								{
									label: 'child1',
									id: '5',
									selected: false,
									nodes: [
										{
											label: 'grandchild1',
											id: '6',
											selected: false,
											nodes: []
										}
									]
								},
								{
									label: 'child2',
									id: '7',
									selected: false,
									nodes: [
										{
											label: 'grandchild2',
											id: '8',
											selected: false,
											nodes: []
										}
									]
								},
								{
									label: 'child3',
									id: '7',
									selected: false,
									nodes: [
										{
											label: 'grandchild1',
											id: '8',
											selected: false,
											nodes: []
										},
										{
											label: 'grandchild2',
											id: '8',
											selected: false,
											nodes: []
										},
										{
											label: 'grandchild3',
											id: '8',
											selected: false,
											nodes: []
										},
										{
											label: 'grandchild4',
											id: '8',
											selected: false,
											nodes: []
										},
										{
											label: 'grandchild5',
											id: '8',
											selected: false,
											nodes: []
										}
									]
								}
							]
						}
					]
				};
				$scope.treeDemos1 = angular.copy(treeDemos);
				$scope.treeDemos2 = angular.copy(treeDemos);
				$scope.treeDemos3 = angular.copy(treeDemos);
				$scope.treeDemos4 = angular.copy(treeDemos);

				//old tree demo data
				$scope.treeDemos = [
					{
						categories: [{ name: 'item 1' }, { name: 'item 2' }, { name: 'item 3' }, { name: 'item 2' }],
						name: 'First Group'
					},
					{ categories: [{ name: 'item 1' }, { name: 'item 3' }], name: 'Second Group' },
					{ categories: [], name: 'Third Group' }
				];

				/* Code for Grid */
				var data = [];
				for (var i = 0; i < 100; i++) {
					data[i] = {};
					for (var j = 0; j < 10; j++) {
						data[i]['j' + j] = j;
					}
				}
				$scope.bigList = [
					{ id: '1' },
					{ id: '2' },
					{ id: '3' },
					{ id: '4' },
					{ id: '5' },
					{ id: '6' },
					{ id: '7' },
					{ id: '8' },
					{ id: '9' },
					{ id: '10' },
					{ id: '11' },
					{ id: '12' },
					{ id: '13' },
					{ id: '14' },
					{ id: '15' },
					{ id: '16' }
				];

				$scope.gridOptions = {
					exporterCsvFilename: 'myFile.csv',
					exporterOlderExcelCompatibility: true,
					exporterMenuPdf: false,
					enableSelectAll: true,
					enableFullRowSelection: true,
					enableRowHeaderSelection: true,
					selectionRowHeaderWidth: 35,
					data: data
				};
				$scope.gridOptions.enableGridMenu = true;

				/*code for chips*/
				$scope.sizes = [
					{ Name: 'Small', Type: 'Size' },
					{ Name: 'Medium', Type: 'Size' },
					{ Name: 'Large', Type: 'Size' },
					{ Name: 'Insane', Type: 'Size' },
					{ Name: 'Infinite', Type: 'Size' },
					{ Name: 'Mustard', Type: 'Dressing' }
				];

				// code for button group
				$scope.demoArr = ['item1', 'item2', 'item3'];
				$scope.outputCallback1 = function(output) {
					$scope.outputItem1 = output;
				};
				$scope.outputCallback2 = function(output) {
					$scope.outputItem2 = output;
				};

				/*Code for the chart*/
				c3.generate({
					bindto: '#myChart',
					data: {
						columns: [['data1', 30, 200, 100, 400, 150, 250], ['data2', 20, 180, 240, 100, 190, 0]],
						selection: {
							enabled: true
						}
					},
					zoom: {
						enabled: true
					}
				});

				/*code for card list*/
				$scope.items = [
					{ title: 'mdi-chart-bar', bool: true },
					{ title: 'mdi-chart-bar', bool: false },
					{ title: 'mdi-chart-bar', bool: true }
				];
				$scope.cardListItems = [
					{
						Color: 'color1',
						Selected: false
					},
					{
						Color: 'color2',
						Selected: true
					},
					{
						Color: 'color3',
						Selected: false
					}
				];
				$scope.simpleColor = {
					render: 'class',
					className: 'brown'
				};
				$scope.simpleColor2 = {
					render: 'condition',
					condition: { color1: 'brown', color2: 'orange', color3: 'purple' }
				};
				$scope.simpleColor3 = {
					render: 'linear',
					rgba: 'rgba(156, 39, 176, 1)'
				};

				/*code for old card list*/
				$scope.items = [
					{ title: 'mdi-chart-bar', bool: true },
					{ title: 'mdi-chart-bar', bool: false },
					{ title: 'mdi-chart-bar', bool: true }
				];

				/*Code for tabs*/
				$scope.selectedIndex = 0;
				$scope.nextTab = function() {
					var index = $scope.selectedIndex === 50 ? 0 : $scope.selectedIndex + 1;
					$scope.selectedIndex = index;
				};

				/*Code for forms*/
				$scope.reset = function(form) {
					if (form) {
						form.$setPristine();
						form.$setUntouched();
					}
				};

				/*Code for date range picker*/
				$scope.dateRange = {
					startDate: new Date(),
					endDate: new Date()
				};
				$scope.popupDateRange1 = {
					startDate: new Date('2018-10-01'),
					endDate: new Date('2018-10-10')
				};
				$scope.dateRangeTemplateType = 'inline';
				$scope.dateRangeTemplateTypes = ['popup', 'inline'];
				$scope.dateRangeCustomValidators = [
					{
						key: 'lessThan7Days',
						message: 'DateRangeMustBeLessThanSevenDays',
						validate: function(start, end) {
							return moment(end).diff(moment(start), 'days') <= 7;
						}
					}
				];

				/*Code for new wfm-date-picker*/
				$scope.singleDate = new Date();
				$scope.singleDate2 = new Date();
				$scope.singleDate3 = new Date();
				$scope.singleDate4 = new Date();
				$scope.customValidateForDatePicker = function(date) {
					if (moment(date).diff(moment(), 'days') < 0) {
						return '[custom validation]: can not select dates before today';
					}
				};

				/*Code for new wfm-date-range-picker*/
				$scope.customValid = function(data) {
					if (moment(data.endDate).diff(moment(data.startDate), 'days') > 7) {
						return '[custom validation]: your end date is 7 days later than your start date';
					}
				};
				$scope.dateRange3 = {
					startDate: new Date().setMonth(1),
					endDate: new Date().setMonth(3)
				};
				$scope.dateRange4 = {
					startDate: new Date().setMonth(1),
					endDate: new Date().setMonth(3)
				};
				$scope.dateRange5 = {
					startDate: null,
					endDate: new Date()
				};
				$scope.dateRange6 = {
					startDate: new Date(),
					endDate: null
				};
				$scope.dateRange6 = {
					startDate: new Date().setMonth(1),
					endDate: new Date().setMonth(3)
				};

				/*Code for time range picker*/
				$scope.timeRange = {
					startTime: new Date(2016, 0, 1, 8),
					endTime: new Date(2016, 0, 1, 17)
				};
				$scope.disableNextDay = false;

				/*Code for modal*/
				$scope.modalShown = false;
				$scope.toggleModal = function() {
					$scope.modalShown = !$scope.modalShown;
				};

				/*code for pagination*/
				$scope.paginationOptions = { pageNumber: 1, totalPages: 7 };
				$scope.getPageData = function(pageIndex) {
					//retrieve the data for given page
					angular.log(pageIndex);
				};

				/*code for card list*/
				$scope.items = [
					{ title: 'mdi-chart-bar', bool: true },
					{ title: 'mdi-chart-bar', bool: false },
					{ title: 'mdi-chart-bar', bool: true }
				];
				$scope.cardListItems = [
					{
						Color: 'color1',
						Selected: false
					},
					{
						Color: 'color2',
						Selected: true
					},
					{
						Color: 'color3',
						Selected: false
					}
				];
				$scope.simpleColor = {
					render: 'class',
					className: 'brown'
				};
				$scope.simpleColor2 = {
					render: 'condition',
					condition: { color1: 'brown', color2: 'orange', color3: 'purple' }
				};
				$scope.simpleColor3 = {
					render: 'linear',
					rgba: 'rgba(156, 39, 176, 1)'
				};
				/*Code for notices*/
				$scope.displaySuccessNew = function() {
					NoticeService.success('Success: User is saved successfully.', 5000, true);
				};

				$scope.displayInfoNew = function() {
					NoticeService.info('Info: A user logged out.', 5000, true);
				};

				$scope.displayWarningNew = function() {
					NoticeService.warning(
						'Warning: Press refresh as the data was changed by another user.',
						5000,
						true
					);
				};

				$scope.displayErrorNew = function() {
					NoticeService.error('Error: Something exploded so fix it.', 5000, true);
				};

				/*code for working hours picker*/
				$scope.workingHours = [];

				/*code for multiple input*/
				$scope.searchOptions = {
					keyword: '',
					searchKeywordChanged: false,
					searchFields: ['option1', 'option2', 'option3', 'option4', 'option5', 'option6']
				};

				/*code for skillpicker*/
				$scope.mockSkills = [
					{
						Id: '-1',
						Name: 'no skills (test)',
						SkillType: 'SkillTypeChat',
						DoDisplayData: true
					},
					{
						Id: 'XYZ',
						Name: 'skill1',
						SkillType: 'SkillTypeChat',
						DoDisplayData: true
					},
					{
						Id: 'ABC',
						Name: 'skill2',
						SkillType: 'SkillTypeEmail',
						DoDisplayData: true
					},
					{
						Id: 'XYZ1',
						Name: 'skill3',
						SkillType: 'SkillTypeInboundTelephony',
						DoDisplayData: true
					},
					{
						Id: 'ABC2',
						Name: 'skill4',
						SkillType: 'SkillTypeRetail',
						DoDisplayData: true
					},
					{
						Id: 'XYZ3',
						Name: 'skill5',
						SkillType: 'SkillTypeBackoffice',
						DoDisplayData: true
					},
					{
						Id: 'ABC4',
						Name: 'skill6',
						SkillType: 'SkillTypeProject',
						DoDisplayData: true
					},
					{
						Id: 'XYZ5',
						Name: 'skill7',
						SkillType: 'SkillTypeFax',
						DoDisplayData: true
					},
					{
						Id: 'ABC6',
						Name: 'skill8',
						SkillType: 'SkillTypeTime',
						DoDisplayData: true
					}
				];
				$scope.mockedSkillGroups = [
					{
						Name: 'No skillgroup found (test)',
						Id: '-1',
						Skills: []
					},
					{
						Name: 'SkillArea1',
						Id: '123',
						Skills: [
							{
								Id: 'XYZ',
								Name: 'skill1',
								SkillType: 'SkillTypeTime',
								DoDisplayData: true
							}
						]
					},
					{
						Name: 'SkillArea2',
						Id: '321',
						Skills: [
							{
								Id: 'ABC',
								Name: 'skill2',
								SkillType: '',
								DoDisplayData: true
							}
						]
					}
				];

				$scope.selectedSkill = { skillIds: ['XYZ1'] };

				$scope.output = function(selectedItem) {
					$scope.filterOutput = selectedItem;
				};

				$scope.clickedSkillInPicker = function(skill) {
					if (skill.Id === -1) {
						$scope.skillPickerOpen = false;
						return;
					}
					$scope.selectedSkill = skill;
					$scope.selectedSkillGroup = null;
				};

				$scope.clearSkillSelection = function() {
					$scope.selectedSkill = null;
				};

				$scope.clearSkillGroupSelection = function() {
					$scope.selectedSkillGroup = null;
				};

				$scope.clickedSkillGroupInPicker = function(skillGroup) {
					$scope.selectedSkill = null;
					if (skillGroup.Id === -1) {
						$scope.skillGroupPickerOpen = false;
						return;
					}
					$scope.selectedSkillGroup = skillGroup;
				};

				/*code for skillpicker old*/
				$scope.mockSkillsOld = [
					{
						Id: 'XYZ',
						Name: 'skill1'
					},
					{
						Id: 'ABC',
						Name: 'skill2'
					},
					{
						Id: 'XYZ1',
						Name: 'skill3'
					},
					{
						Id: 'ABC2',
						Name: 'skill4'
					},
					{
						Id: 'XYZ3',
						Name: 'skill5'
					},
					{
						Id: 'ABC4',
						Name: 'skill6'
					},
					{
						Id: 'XYZ5',
						Name: 'skill7'
					},
					{
						Id: 'ABC6',
						Name: 'skill8'
					}
				];
				$scope.mockedSkillGroupsOld = [
					{
						Name: 'SkillArea1',
						Id: '123',
						Skills: [
							{
								Id: 'XYZ',
								Name: 'skill1'
							}
						]
					},
					{
						Name: 'SkillArea2',
						Id: '321',
						Skills: [
							{
								Id: 'ABC',
								Name: 'skill2'
							}
						]
					}
				];

				$scope.preselectedSkillOld = { skillIds: ['XYZ1'] };
				$scope.preselectedSkillGroupOld = { skillAreaId: ['XYZ'] };

				$scope.outputOld = function(selectedItem) {
					$scope.filterOutputOld = selectedItem;
				};

				/*code for rightPanel*/
				$scope.rightPanelOptions = {
					panelState: false,
					sidePanelTitle: 'Sidepanel title',
					showCloseButton: true,
					showResizer: true,
					showBackdrop: true,
					showPopupButton: true
				};

				// code for homepage
				$scope.menuItems = [];
				$scope.addItemToList = function(url, header) {
					var item = {
						Link: '<a class="searchItem" tabindex="0" arrow href="' + url + '"><li>' + header + '</li></a>',
						Name: header
					};
					if ($scope.menuItems.indexOf(item) == -1) {
						$scope.menuItems.push(item);
					}
				};
				$scope.getChapteIcon = function(index) {
					if (index == 'Overview') {
						return 'mdi-airballoon';
					}
					if (index == 'Elements') {
						return 'mdi-puzzle';
					}
					if (index == 'Components') {
						return 'mdi-cube-outline';
					}
					if (index == 'Colors') {
						return 'mdi-invert-colors';
					}
					if (index == 'Containers') {
						return 'mdi-border-none';
					}
					if (index == 'Tree') {
						return 'mdi-file-tree';
					}
					if (index == 'Language') {
						return 'mdi-sort-alphabetical';
					}
					if (index == 'Icons') {
						return 'mdi-image-filter-vintage';
					}
					if (index == 'Helper classes') {
						return 'mdi-auto-fix';
					}
					if (index == 'Naming and best practice') {
						return 'mdi-crown';
					}
					if (index == 'Resources') {
						return 'mdi-school';
					}
				};

				/*code for numeric value directive*/
				function isFloat(n) {
					return Number(n) === n && n % 1 !== 0;
				}

				// timer
				$scope.loading = function() {
					$scope.waitAMoment = true;
					$timeout(function() {
						$scope.waitAMoment = false;
					}, 5000);
				};

				// color list
				$scope.classicSwatches = [
					{
						Variable: '$blue-100',
						Color: '#99D6FF',
						Class: 'blue-100-swatch',
						DarkColor: '#1d5a83',
						DarkClass: 'blue-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'highlights'
					},
					{
						Variable: '$blue-300',
						Color: '#66C2FF',
						Class: 'blue-300-swatch',
						DarkColor: '#136fac',
						DarkClass: 'blue-300-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'secondary actions'
					},
					{
						Variable: '$blue-500',
						Color: '#0099FF',
						Class: 'blue-500-swatch',
						DarkColor: '#0a84d6',
						DarkClass: 'blue-500-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'primary actions'
					},
					{
						Variable: '$orange-400',
						Color: '#FFC285',
						Class: 'orange-400-swatch',
						DarkColor: '#c27c36',
						DarkClass: 'orange-400-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'warnings'
					},
					{
						Variable: '$orange-500',
						Color: '#FFA726',
						Class: 'orange-500-swatch',
						DarkColor: '#d68636',
						DarkClass: 'orange-500-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'warnings'
					},
					{
						Variable: '$orange-600',
						Color: '#FB8C00',
						Class: 'orange-600-swatch',
						DarkColor: '#ea9036',
						DarkClass: 'orange-600-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'warnings'
					},
					{
						Variable: '$red-600',
						Color: '#EE8F7D',
						Class: 'red-600-swatch',
						DarkColor: '#ca3333',
						DarkClass: 'red-600-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'errors'
					},
					{
						Variable: '$red-700',
						Color: '#EF5350',
						Class: 'red-700-swatch',
						DarkColor: '#EF5350',
						DarkClass: 'red-700-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'errors'
					},
					{
						Variable: '$red-800',
						Color: '#D32F2F',
						Class: 'red-800-swatch',
						DarkColor: '#ee8f7d',
						DarkClass: 'red-800-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'errors'
					},
					{
						Variable: '$green-100',
						Color: '#C2E085',
						Class: 'green-100-swatch',
						DarkColor: '#627b32',
						DarkClass: 'green-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'selection and success'
					},
					{
						Variable: '$green-300',
						Color: '#9CCC65',
						Class: 'green-300-swatch',
						DarkColor: '#6f8e32',
						DarkClass: 'green-300-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'selection and success'
					},
					{
						Variable: '$green-500',
						Color: '#8BC34A',
						Class: 'green-500-swatch',
						DarkColor: '#84ad32',
						DarkClass: 'green-500-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'selection and success'
					},
					{
						Variable: '$pink-100',
						Color: '#F8BBD0',
						Class: 'pink-100-swatch',
						DarkColor: '#E91E63',
						DarkClass: 'pink-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'loading'
					},
					{
						Variable: '$pink-300',
						Color: '#F06292',
						Class: 'pink-300-swatch',
						DarkColor: '#F06292',
						DarkClass: 'pink-300-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$white',
						Use: 'loading'
					},
					{
						Variable: '$pink-500',
						Color: '#E91E63',
						Class: 'pink-500-swatch',
						DarkColor: '#F8BBD0',
						DarkClass: 'pink-500-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'loading'
					},
					{
						Variable: '$purple-100',
						Color: '#E1BEE7',
						Class: 'purple-100-swatch',
						DarkColor: '#9C27B0',
						DarkClass: 'purple-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'priority'
					},
					{
						Variable: '$purple-300',
						Color: '#BA68C8',
						Class: 'purple-300-swatch',
						DarkColor: '#BA68C8',
						DarkClass: 'purple-300-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$white',
						Use: 'priority'
					},
					{
						Variable: '$purple-500',
						Color: '#9C27B0',
						Class: 'purple-500-swatch',
						DarkColor: '#E1BEE7',
						DarkClass: 'purple-500-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'priority'
					},
					{
						Variable: '$teal-100',
						Color: '#B2DFDB',
						Class: 'teal-100-swatch',
						DarkColor: '#009688',
						DarkClass: 'teal-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'flavor'
					},
					{
						Variable: '$teal-300',
						Color: '#4DB6AC',
						Class: 'teal-300-swatch',
						DarkColor: '#4DB6AC',
						DarkClass: 'teal-300-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$text-color-standard',
						Use: 'flavor'
					},
					{
						Variable: '$teal-500',
						Color: '#009688',
						Class: 'teal-500-swatch',
						DarkColor: '#B2DFDB',
						DarkClass: 'teal-500-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'flavor'
					},
					{
						Variable: '$brown-100',
						Color: '#D7CCC8',
						Class: 'brown-100-swatch',
						DarkColor: '#795548',
						DarkClass: 'brown-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'flavor'
					},
					{
						Variable: '$brown-300',
						Color: '#A1887F',
						Class: 'brown-300-swatch',
						DarkColor: '#A1887F',
						DarkClass: 'brown-300-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'flavor'
					},
					{
						Variable: '$brown-500',
						Color: '#795548',
						Class: 'brown-500-swatch',
						DarkColor: '#D7CCC8',
						DarkClass: 'brown-500-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'flavor'
					},
					{
						Variable: '$white',
						Color: '#ffffff',
						Class: 'white-swatch',
						DarkColor: '#424242',
						DarkClass: 'white-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'backgrounds and highlights'
					},
					{
						Variable: '$gray-300',
						Color: '#E0E0E0',
						Class: 'gray-300-swatch',
						DarkColor: '#555555',
						DarkClass: 'gray-300-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$white',
						Use: 'solid hover'
					},
					{
						Variable: '$gray012',
						Color: 'rgba(0,0,0,0.06)',
						Class: 'gray-012-swatch',
						DarkColor: '#303030',
						DarkClass: 'gray-012-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'hovers and backgrounds'
					},
					{
						Variable: '$gray026',
						Color: 'rgba(0,0,0,0.26)',
						Class: 'gray-026-swatch',
						DarkColor: 'rgba(0,0,0,0.26)',
						DarkClass: 'gray-026-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'disabled actions'
					},
					{
						Variable: '$gray-500',
						Color: '#9E9E9E',
						Class: 'gray-500-swatch',
						DarkColor: '#9E9E9E',
						DarkClass: 'gray-500-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$text-color-standard',
						Use: 'solid disabled'
					},
					{
						Variable: '$gray054',
						Color: 'rgba(0,0,0,0.54)',
						Class: 'gray-054-swatch',
						DarkColor: 'rgba(107, 107, 107, 1)',
						DarkClass: 'gray-054-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$white',
						Use: 'flavor'
					},
					{
						Variable: '$gray087',
						Color: 'rgba(0,0,0,0.87)',
						Class: 'gray-087-swatch',
						DarkColor: '#d1d1d1',
						DarkClass: 'gray-087-swatch-dark',
						DarkTextColor: '$white',
						TextColor: '$white',
						Use: 'text'
					},
					{
						Variable: '$gray100',
						Color: '#000000',
						Class: 'gray-100-swatch',
						DarkColor: '#c2e085',
						DarkClass: 'gray-100-swatch-dark',
						DarkTextColor: '$text-color-standard',
						TextColor: '$white',
						Use: 'flavor'
					}
				];

				$scope.checkResourceSection = function(header) {
					if (header === 'Links') {
						return true;
					} else {
						return false;
					}
				};

				$scope.resourceList = [
					{
						link:
							'<a href="https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md">Angular styleguide - John Papa</a>',
						desc: 'The code style we strive to follow in our JS',
						category: 'JavaScript'
					},
					{
						link:
							'<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference">Css quick reference - MDN</a>',
						desc: 'Good for looking up CSS properties and syntax',
						category: 'CSS'
					},
					{
						link: '<a href="https://caniuse.com/">Can i use?</a>',
						desc: 'CSS reference across all browsers',
						category: 'CSS'
					},
					{
						link:
							'<a href="https://philipwalton.com/articles/css-architecture/">Css architecture - Philip Walton</a>',
						desc: 'Article by a Google engineer on how to build good CSS',
						category: 'CSS'
					},
					{
						link:
							'<a href="https://www.behance.net/gallery/47810259/2017-Design-Trends-Guide">Design trends 2017</a>',
						desc: 'A compilation of design trends in 2017',
						category: 'UI'
					},
					{
						link: '<a href="https://blog.snappa.com/graphic-design-trends-2018/">Design trends 2018</a>',
						desc: 'A compilation of design trends in 2018',
						category: 'UI'
					},
					{
						link: '<a href="https://axbom.com/slaying-5-ux-myths-good-mankind/">UX myths - Per Axbom</a>',
						desc: 'Common pitfalls in UX thinking',
						category: 'UX'
					},
					{
						link:
							'<a href="https://www.ventureharbour.com/form-design-best-practices/">Form UX Examples - Marcus Taylor</a>',
						desc: 'Insights on form design and UX',
						category: 'UX'
					},
					{
						link: '<a href="http://styleguides.io/">Styleguides.io</a>',
						desc: 'A collection of styleguides for reference',
						category: 'UI'
					},
					{
						link: '<a href="https://travis-ci.org/Teleopti/styleguide">Travis-ci</a>',
						desc: 'Travis is a continuous integration service used to build and test the styleguide',
						category: 'Tool'
					},
					{
						link: '<a href="http://warpspire.com/kss/">knyle style sheets</a>',
						desc: 'Kss is a styleguide documentation template',
						category: 'Tool'
					},
					{
						link: '<a href="https://gruntjs.com/">Grunt</a>',
						desc: 'Grunt is a taskrunner used to compile and uglify scss and js',
						category: 'Tool'
					},
					{
						link: '<a href="https://www.npmjs.com/package/teleopti-styleguide">NPM</a>',
						desc: 'The styleguide gets released as a node package here',
						category: 'Tool'
					}
				];

				$scope.numericValueInput = '12,000';
				$scope.numericValueInputResult = 12000;
				$scope.$watch('numericValueInput', function() {
					$scope.numericValueInputResult = Number.isInteger($scope.numericValueInput)
						? $scope.numericValueInput
						: $scope.numericValueInputResult;
				});
				$scope.numericValueFloatInput = '12,000.50';
				$scope.numericValueFloatInputResult = 12000.5;
				$scope.$watch('numericValueFloatInput', function() {
					if (isFloat($scope.numericValueFloatInput) || Number.isInteger($scope.numericValueFloatInput)) {
						$scope.numericValueFloatInputResult = $scope.numericValueFloatInput;
					}
				});
			}
		]);

	angular.module('currentUserInfoService', []).service('CurrentUserInfo', function() {
		this.CurrentUserInfo = function() {
			var dateFormatLocale = 'en-GB';
			return {
				DateFormatLocale: dateFormatLocale
			};
		};
	});
})();
