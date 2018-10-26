angular.module('styleguide.templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/badge/badge.tpl.html',
    "<span class=\"wfm-badge material-depth-1 grow-out\" ng-class=\"$ctrl.status\" ng-show=\"$ctrl.badgeModel>0 || $ctrl.showEmpty\">\n" +
    "  <p id=\"pulse-element\"></p>\n" +
    "  <span class=\"wfm-badge-content\" ng-if=\"$ctrl.badgeModel>0\" >\n" +
    "    {{$ctrl.badgeModel}}\n" +
    "  </span>\n" +
    "</span>\n"
  );


  $templateCache.put('directives/btn-group/btn-group.tpl.html',
    "<div class=\"wfm-btn-group\" ng-class=\"{'material-depth-1':$ctrl.btnClass == 'wfm-btn-default'}\">\n" +
    "  <button ng-repeat=\"item in $ctrl.items\" class=\"wfm-btn {{$ctrl.btnClass}}\" ng-class=\"{'{{$ctrl.selectionClass}}': $ctrl.selected === item, 'first':$first, 'last':$last}\" ng-click=\"$ctrl.output(item); $ctrl.selected = item\">{{item | translate}}</button>\n" +
    "</div>\n"
  );


  $templateCache.put('directives/card-panel/card-panel.template.tpl.html',
    "<div class=\"panel material-depth-1\">\n" +
    "    <div class=\"card-panel-header-wrapper pointer\" ng-class=\"vm.setColorClass()\" ng-style=\"vm.setColor()\" ng-transclude=\"header\"\n" +
    "        card-animate=\"{{vm.open}}\" id=\"{{vm.id}}\" pre-open=\"{{vm.preOpen}}\"></div>\n" +
    "    <div class=\"card-panel-content-wrapper hidden\" ng-transclude=\"content\" id=\"{{vm.id}}\"></div>\n" +
    "</div>"
  );


  $templateCache.put('directives/date-range-picker/date-range-picker.tpl.html',
    "<div class=\"date-range-picker\">\n" +
    "	<div ng-show=\"!displayPopup()\">\n" +
    "		<div class=\"con-row\">\n" +
    "			<div class=\"con-flex line-center\" ng-show=\"isGregorian\">\n" +
    "				<div class=\"wfm-datepicker-wrap date-range-start-date\">\n" +
    "					<div class=\"sub-header\">\n" +
    "						<span>{{::xxFrom}}</span>: <strong>{{ startDate | date: dateFormat }}</strong>\n" +
    "					</div>\n" +
    "					<div ng-show=\"isGregorian\" uib-datepicker ng-model=\"startDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker inline-datepicker\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex line-center\" ng-show=\"isJalaali\">\n" +
    "				<div class=\"wfm-datepicker-wrap date-range-start-date\">\n" +
    "					<div class=\"sub-header\">\n" +
    "						<span>{{::xxFrom}}</span>: <strong>{{startDate | persianDate:'shortDate' }}</strong>\n" +
    "					</div>\n" +
    "					<persian-datepicker ng-model=\"startDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker inline-datepicker\">\n" +
    "					</persian-datepicker>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex line-center\" ng-show=\"isGregorian\">\n" +
    "				<div class=\"wfm-datepicker-wrap date-range-end-date\">\n" +
    "					<div class=\"sub-header\">\n" +
    "						<span>{{::xxTo}}</span>: <strong>{{ endDate | date: dateFormat }}</strong>\n" +
    "					</div>\n" +
    "					<div uib-datepicker ng-model=\"endDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker inline-datepicker\">\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex line-center\" ng-show=\"isJalaali\">\n" +
    "				<div class=\"wfm-datepicker-wrap date-range-end-date\">\n" +
    "					<div class=\"sub-header\">\n" +
    "						<span>{{::xxTo}}</span>: <strong>{{ endDate | persianDate:'shortDate' }}</strong>\n" +
    "					</div>\n" +
    "					<persian-datepicker ng-model=\"endDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker inline-datepicker\">\n" +
    "					</persian-datepicker>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div ng-repeat=\"validator in validators\" ng-if=\"displayError(validator.key)\" class=\"error-msg-container error-msg-popup-container alert-error notice-spacer\">\n" +
    "			<i class='mdi mdi-alert-octagon'></i><span translate>{{validator.message}}</span>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-show=\"displayPopup()\">\n" +
    "		<div class=\"wfm-datepicker-controllers-container\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context popup-control\" ng-click=\"displayCalendars = !displayCalendars\">\n" +
    "				<i class=\"mdi mdi-calendar\"></i>\n" +
    "			</div>\n" +
    "			<div tabindex=0 class=\"start-date-indicator\" ng-click=\"displayCalendars = !displayCalendars\">\n" +
    "				<span class=\"pointer\">{{::xxFrom}}: </span><span ng-if=\"isGregorian\" class=\"pointer\">{{ startDate | date:\n" +
    "					dateFormat }}</span><span ng-if=\"isJalaali\" class=\"pointer\">{{ startDate | persianDate:'shortDate' }}</span>\n" +
    "			</div>\n" +
    "			<div tabindex=0 ng-click=\"displayCalendars = !displayCalendars\">\n" +
    "				<span class=\"pointer\">{{::xxTo}}: </span><span ng-if=\"isGregorian\" class=\"pointer\">{{ endDate | date: dateFormat }}</span><span\n" +
    "				 ng-if=\"isJalaali\" class=\"pointer\">{{ endDate | persianDate:'shortDate' }}</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"wfm-datepicker-container modal-box\" ng-show=\"displayCalendars\">\n" +
    "			<div class=\"modalbg\" ng-click=\"hideDateRangePicker()\"></div>\n" +
    "			<div class=\"con-row wfm-datepicker-popup-row\">\n" +
    "				<div class=\"con-flex line-center\" ng-show=\"isGregorian\">\n" +
    "					<div class=\"wfm-datepicker-wrap date-range-start-date\">\n" +
    "						<div ng-show=\"isGregorian\" uib-datepicker ng-model=\"startDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker popup-datepicker\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"con-flex line-center\" ng-show=\"isJalaali\">\n" +
    "					<div class=\"wfm-datepicker-wrap date-range-start-date\">\n" +
    "						<persian-datepicker ng-model=\"startDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker popup-datepicker\">\n" +
    "						</persian-datepicker>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"con-flex line-center\" ng-show=\"isGregorian\">\n" +
    "					<div class=\"wfm-datepicker-wrap date-range-end-date\">\n" +
    "						<div uib-datepicker ng-model=\"endDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker popup-datepicker\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"con-flex line-center\" ng-show=\"isJalaali\">\n" +
    "					<div class=\"wfm-datepicker-wrap date-range-end-date\">\n" +
    "						<persian-datepicker ng-model=\"endDate\" datepicker-options=\"datepickerOptions\" class=\"wfm-datepicker popup-datepicker\">\n" +
    "						</persian-datepicker>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-repeat=\"validator in validators\" ng-if=\"displayError(validator.key)\" class=\"error-msg-container error-msg-popup-container error-msg-popup alert-error notice-spacer\">\n" +
    "				<i class='mdi mdi-alert-octagon'></i><span translate>{{validator.message}}</span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('directives/popup-menu/popup.tpl.html',
    "<div class=\"wfm-popup-wrap animate-show modal-box\" ng-show=\"$ctrl.show\">\n" +
    "  <div class='modalbg' ng-click='$ctrl.show = !$ctrl.show'></div>\n" +
    "  <div class=\"popup-panel panel material-depth-2\" ng-transclude></div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('directives/skill-picker-old/skill-picker.old.tpl.html',
    "<div class=\"con-row\">\n" +
    "    <div class=\"con-flex\">\n" +
    "        <md-autocomplete\n" +
    "        ng-attr-skillsLoaded=\"{{$ctrl.skillsLoaded}}\"\n" +
    "        md-min-length=\"0\"\n" +
    "        md-selected-item=\"$ctrl.selectedSkill\"\n" +
    "        md-search-text=\"skillFilterText.Name\"\n" +
    "        md-items=\"skill in $ctrl.skills | filter:skillFilterText\"\n" +
    "        md-selected-item-change=\"$ctrl.selectSkill(skill)\"\n" +
    "        md-item-text=\"skill.Name\"\n" +
    "        placeholder=\"{{'SelectSkill' | translate}}\">\n" +
    "            <md-item-template>\n" +
    "                <span ng-bind=\"skill.Name\"></span>\n" +
    "            </md-item-template>\n" +
    "            <md-not-found ng-cloak>\n" +
    "                {{'RepViewerNoMoreMatches'|translate}}\n" +
    "            </md-not-found>\n" +
    "        </md-autocomplete>\n" +
    "    </div>\n" +
    "    <div class=\"con-flex\">\n" +
    "        <md-autocomplete\n" +
    "        ng-attr-skillAreasLoaded=\"{{$ctrl.skillAreasLoaded}}\"\n" +
    "        md-min-length=\"0\"\n" +
    "        md-selected-item=\"$ctrl.selectedSkillArea\"\n" +
    "        md-search-text=\"skillAreaFilterText.Name\"\n" +
    "        md-items=\"skillArea in $ctrl.skillAreas | filter:skillAreaFilterText\"\n" +
    "        md-selected-item-change=\"$ctrl.selectSkillArea(skillArea)\"\n" +
    "        md-item-text=\"skillArea.Name\"\n" +
    "        placeholder=\"{{'SelectSkillGroup' | translate}}\">\n" +
    "            <md-item-template>\n" +
    "                <span ng-bind=\"skillArea.Name\"></span>\n" +
    "            </md-item-template>\n" +
    "            <md-not-found ng-cloak>\n" +
    "                {{'RepViewerNoMoreMatches'|translate}}\n" +
    "            </md-not-found>\n" +
    "        </md-autocomplete>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('directives/skill-picker/skillPicker.tpl.html',
    "<div class=\"con-row\">\n" +
    "    <div class=\"con-flex\">\n" +
    "        <div class=\"wfm-form\" outside-click=\"$ctrl.skillPickerOpen = false\">\n" +
    "            <div class=\"form-input-wrap\">\n" +
    "                <div style=\"position: relative\">\n" +
    "                    <input ng-click=\"$ctrl.skillPickerOpen = !$ctrl.skillPickerOpen\" ng-keypress=\"$ctrl.skillPickerOpen=true\" ng-model=\"$ctrl.skillPickerText\"\n" +
    "                        type=\"text\" placeholder=\"{{'SelectSkill'|translate}}\">\n" +
    "                    <i class=\"mdi mdi-close pointer\" ng-click=\"$ctrl.clearSkillSelection()\" ng-show=\"$ctrl.skillPickerText\" style=\"position: absolute; top: 3px; right: 10px;\">\n" +
    "                        <md-tooltip>{{'Clear'|translate}}</md-tooltip>\n" +
    "                    </i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div style=\"position: relative\">\n" +
    "                <div class=\"wfm-dropdown-panel panel material-depth-1 full-padding\" ng-show=\"$ctrl.skillPickerOpen\" style=\"z-index: 9999; position: absolute; width: 100%; overflow-y: scroll; max-height: 200px\">\n" +
    "                    <ul>\n" +
    "                        <li ng-click=\"$ctrl.skillSelected(skill)\" ng-repeat=\"skill in $ctrl.skills | filter:{Name:$ctrl.skillPickerText}\" style=\"padding: 10px 0px; cursor: pointer\">\n" +
    "                            <i ng-class=\"$ctrl.getSkillIcon(skill)\"></i>\n" +
    "                            {{skill.Name}}\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"con-flex\">\n" +
    "        <div class=\"wfm-form\" outside-click=\"$ctrl.skillGroupPickerOpen = false\">\n" +
    "            <div class=\"form-input-wrap\">\n" +
    "                <div style=\"position: relative\">\n" +
    "                    <input ng-click=\"$ctrl.skillGroupPickerOpen = !$ctrl.skillGroupPickerOpen\" ng-keypress=\"$ctrl.skillGroupPickerOpen=true\"\n" +
    "                        ng-model=\"$ctrl.skillGroupPickerText\" type=\"text\" placeholder=\"{{'SelectSkillGroup'|translate}}\">\n" +
    "                    <i class=\"mdi mdi-close pointer\" ng-click=\"$ctrl.clearSkillGroupSelection()\" ng-show=\"$ctrl.skillGroupPickerText\" style=\"position: absolute; top: 3px; right: 10px;\">\n" +
    "                        <md-tooltip>{{'Clear'|translate}}</md-tooltip>\n" +
    "                    </i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div style=\"position: relative\">\n" +
    "                <div class=\"wfm-dropdown-panel panel material-depth-1 full-padding\" ng-show=\"$ctrl.skillGroupPickerOpen\" style=\"z-index: 9999; position: absolute; width: 100%; overflow-y: scroll; max-height: 200px\">\n" +
    "                    <ul>\n" +
    "                        <li ng-click=\"$ctrl.skillGroupSelected(skillGroup)\" ng-repeat=\"skillGroup in $ctrl.skillGroups | filter:$ctrl.skillGroupPickerText\"\n" +
    "                            style=\"padding: 10px 0px; cursor: pointer\">\n" +
    "                            {{skillGroup.Name}}\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('directives/time-range-picker/time-range-picker.tpl.html',
    "<div class=\"inline-flex\">\n" +
    "  <timepicker-wrap ng-model=\"startTime\"></timepicker-wrap>\n" +
    "  <timepicker-wrap ng-model=\"endTime\"></timepicker-wrap>\n" +
    "  <div ng-show=\"!disableNextDay || nextDay\">\n" +
    "    <div tabindex=0 class=\"context-menu card-context\" style=\"margin:0;\" ng-click=\"toggleNextDay()\">\n" +
    "      <i ng-if=\"!nextDay\" class=\"mdi mdi-weather-sunny\" ng-class=\"{'wfm-btn-invis-disabled': disableNextDay }\">\n" +
    "        <md-tooltip>\n" +
    "          <span translate>Today</span>\n" +
    "        </md-tooltip>\n" +
    "      </i>\n" +
    "      <i ng-if=\"nextDay\" class=\"mdi mdi-weather-night\" ng-class=\"{'wfm-btn-invis-disabled': disableNextDay }\">\n" +
    "        <md-tooltip>\n" +
    "          <span translate>OverMidnight</span>\n" +
    "        </md-tooltip>\n" +
    "      </i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"error-msg-container ng-invalid-order alert-error notice-spacer\">\n" +
    "  <i class=\"mdi mdi-alert-octagon\"></i>\n" +
    "  <span translate>EndTimeMustBeGreaterOrEqualToStartTime</span>\n" +
    "</div>\n" +
    "<div class=\"error-msg-container ng-invalid-parse alert-error notice-spacer\">\n" +
    "  <i class=\"mdi mdi-alert-octagon\"></i>\n" +
    "  <span translate>StartTimeAndEndTimeMustBeSet</span>\n" +
    "</div>\n" +
    "<div class=\"error-msg-container ng-invalid-range alert-error notice-spacer\">\n" +
    "  <i class=\"mdi mdi-alert-octagon\"></i>\n" +
    "  <span>{{invalidTimeRange}}</span>\n" +
    "</div>"
  );


  $templateCache.put('directives/tree-picker/tree_data.tpl.html',
    "<div class=\"tree\">\n" +
    "  <label for=\"TreePickerFilter\" class=\"input-prepend\" ng-if=\"vm.displayTreeFilter\">\n" +
    "    <i class=\"mdi mdi-filter-outline\"></i>\n" +
    "    <input type=\"text\" id=\"TreePickerFilter\" name=\"TreePickerFilter\" autocomplete=\"off\" ng-model=\"vm.search\" placeholder=\"{{'Filter' | translate}}\"\n" +
    "    />\n" +
    "    <tree-filter search=\"vm.search\"></tree-filter>\n" +
    "  </label>\n" +
    "  <ol ng-model=\"vm.data\" style=\"padding:0;\">\n" +
    "    <li node-id=\"$index\" ng-repeat=\"node in vm.data[vm.nodeChildrenName]\" ng-include=\"'tree_child_renderer.html'\"></li>\n" +
    "  </ol>\n" +
    "</div>\n" +
    "<script type=\"text/ng-template\" id=\"tree_child_renderer.html\">\n" +
    "  <div class=\"tree-toggle-group\" tree-animate>\n" +
    "    <div class=\"toggle-handle\">\n" +
    "      <i ng-hide=\"!node[vm.nodeChildrenName] || node[vm.nodeChildrenName].length==0 \" class=\"mdi mdi-chevron-right\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"tree-handle-wrapper\" ng-class=\"{'selected-true': node[vm.nodeSelectedMark], 'semi-true': node[vm.nodeSemiSelected]}\" ng-click=\"vm.selectNode(this)\" ng-bind=\"node[vm.nodeDisplayName]\"></div>\n" +
    "  </div>\n" +
    "  <ol ng-model=\"node\">\n" +
    "    <li node-id=\"$index\" class=\"tree-child hidden\" ng-repeat=\"node in node[vm.nodeChildrenName]\" ng-include=\"'tree_child_renderer.html'\" ></li>\n" +
    "  </ol>\n" +
    "</script>\n"
  );


  $templateCache.put('directives/wfm-date-picker/wfm-date-picker.gregorian.tpl.html',
    "<div ng-if=\"vm.popupMode\">\n" +
    "	<div class=\"wfm-datepicker-text\">\n" +
    "		<button type=\"button\" class=\"wfm-btn wfm-btn-invis-primary wfm-btn-sm\" ng-click=\"vm.gotoPreviousDate()\">\n" +
    "			<i class=\"mdi mdi-chevron-double-left\"></i>\n" +
    "		</button>\n" +
    "		<span ng-click=\"vm.toggleDatePicker($event)\">\n" +
    "			<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "		</span>\n" +
    "		<span ng-click=\"vm.toggleDatePicker($event)\" class=\"wfm-datepicker-text-date\">{{vm.pickDate | amDateFormat:'L'}}</span>\n" +
    "		<button type=\"button\" class=\"wfm-btn wfm-btn-invis-primary wfm-btn-sm\" ng-click=\"vm.gotoNextDate()\">\n" +
    "			<i class=\"mdi mdi-chevron-double-right\"></i>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "	<wfm-popup show=\"vm.isShowingDatePicker\">\n" +
    "		<wfm-date-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "			<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "				<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "					<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "					<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "				</div>\n" +
    "				<span ng-if=\"vm.dateValiationText.length > 0\">{{vm.dateValiationText}}</span>\n" +
    "			</div>\n" +
    "		</wfm-date-picker-header>\n" +
    "		<wfm-date-picker-body class=\"con-row\">\n" +
    "			<div class=\"con-flex date-info-wrapper\">\n" +
    "				<div class=\"select-date-info-wrapper single-select-mode pointer selecting-date\">\n" +
    "					<div class=\"select-date-info-inner\">\n" +
    "						<span class=\"date-info-label\" translate>SelectedDate</span>\n" +
    "						<h1 class=\"date-info\">{{vm.pickDate | amDateFormat:'LL'}}</h1>\n" +
    "					</div>\n" +
    "					<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetDate()\">\n" +
    "						<i class=\"mdi mdi-close\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "				<div uib-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "				 ng-change=\"vm.switchDate()\" datepicker-options=\"vm.options\"></div>\n" +
    "			</div>\n" +
    "		</wfm-date-picker-body>\n" +
    "	</wfm-popup>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"!vm.popupMode\">\n" +
    "	<wfm-date-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "		<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "				<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "				<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "			</div>\n" +
    "			<span ng-if=\"vm.dateValiationText.length > 0\">{{vm.dateValiationText}}</span>\n" +
    "		</div>\n" +
    "	</wfm-date-picker-header>\n" +
    "	<wfm-date-picker-body class=\"con-row\">\n" +
    "		<div class=\"con-flex date-info-wrapper\">\n" +
    "			<div class=\"select-date-info-wrapper single-select-mode pointer selecting-date\">\n" +
    "				<div class=\"select-date-info-inner\">\n" +
    "					<span class=\"date-info-label\" translate>SelectedDate</span>\n" +
    "					<h1 class=\"date-info\">{{vm.pickDate | amDateFormat:'LL'}}</h1>\n" +
    "				</div>\n" +
    "				<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetDate()\">\n" +
    "					<i class=\"mdi mdi-close\"></i>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "			<div uib-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "			 ng-change=\"vm.switchDate()\" datepicker-options=\"vm.options\"></div>\n" +
    "		</div>\n" +
    "	</wfm-date-picker-body>\n" +
    "</div>"
  );


  $templateCache.put('directives/wfm-date-picker/wfm-date-picker.jalaali.tpl.html',
    "<div ng-if=\"vm.popupMode\">\n" +
    "	<div class=\"wfm-datepicker-text\">\n" +
    "		<button type=\"button\" class=\"wfm-btn wfm-btn-invis-primary wfm-btn-sm\" ng-click=\"vm.gotoPreviousDate()\">\n" +
    "			<i class=\"mdi mdi-chevron-double-left\"></i>\n" +
    "		</button>\n" +
    "		<span ng-click=\"vm.toggleDatePicker($event)\">\n" +
    "			<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "		</span>\n" +
    "		<span ng-click=\"vm.toggleDatePicker($event)\" class=\"wfm-datepicker-text-date\">{{vm.pickDate | persianDate:'fullDate'}}</span>\n" +
    "		<button type=\"button\" class=\"wfm-btn wfm-btn-invis-primary wfm-btn-sm\" ng-click=\"vm.gotoNextDate()\">\n" +
    "			<i class=\"mdi mdi-chevron-double-right\"></i>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "	<wfm-popup show=\"vm.isShowingDatePicker\">\n" +
    "		<wfm-date-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "			<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "				<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "					<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "					<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "				</div>\n" +
    "				<span ng-if=\"vm.dateValiationText.length > 0\">{{vm.dateValiationText}}</span>\n" +
    "			</div>\n" +
    "		</wfm-date-picker-header>\n" +
    "		<wfm-date-picker-body class=\"con-row\">\n" +
    "			<div class=\"con-flex date-info-wrapper\">\n" +
    "				<div class=\"select-date-info-wrapper single-select-mode pointer selecting-date\">\n" +
    "					<div class=\"select-date-info-inner\">\n" +
    "						<span class=\"date-info-label\" translate>SelectedDate</span>\n" +
    "						<h1 class=\"date-info\">{{vm.pickDate | persianDate:'fullDate'}}</h1>\n" +
    "					</div>\n" +
    "					<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetDate()\">\n" +
    "						<i class=\"mdi mdi-close\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "				<persian-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "				 ng-change=\"vm.switchDate()\" show-weeks=\"vm.showWeek\" custom-class=\"vm.options.customClass()\"></persian-datepicker>\n" +
    "			</div>\n" +
    "		</wfm-date-picker-body>\n" +
    "	</wfm-popup>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"!vm.popupMode\">\n" +
    "	<wfm-date-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "		<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "				<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "				<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "			</div>\n" +
    "			<span ng-if=\"vm.dateValiationText.length > 0\">{{vm.dateValiationText}}</span>\n" +
    "		</div>\n" +
    "	</wfm-date-picker-header>\n" +
    "	<wfm-date-picker-body class=\"con-row\">\n" +
    "		<div class=\"con-flex date-info-wrapper\">\n" +
    "			<div class=\"select-date-info-wrapper single-select-mode pointer selecting-date\">\n" +
    "				<div class=\"select-date-info-inner\">\n" +
    "					<span class=\"date-info-label\" translate>SelectedDate</span>\n" +
    "					<h1 class=\"date-info\">{{vm.pickDate | persianDate:'fullDate'}}</h1>\n" +
    "				</div>\n" +
    "				<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetDate()\">\n" +
    "					<i class=\"mdi mdi-close\"></i>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "			<persian-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "			 ng-change=\"vm.switchDate()\" show-weeks=\"vm.showWeek\" custom-class=\"vm.options.customClass()\"></persian-datepicker>\n" +
    "		</div>\n" +
    "	</wfm-date-picker-body>\n" +
    "</div>"
  );


  $templateCache.put('directives/wfm-date-range-picker/wfm-date-range-picker.gregorian.tpl.html',
    "<div ng-if=\"vm.popupMode\">\n" +
    "	<div class=\"wfm-datepicker-text\" ng-click=\"vm.toggleDatePicker($event)\">\n" +
    "		<span><i class=\"mdi mdi-calendar-range\"></i></span>\n" +
    "		<span class=\"wfm-datepicker-text-from\">{{'From' | translate}}: {{vm.pickStartDate | amDateFormat:'LL'}}</span>\n" +
    "		<span class=\"wfm-datepicker-text-to\">{{'To' | translate}}: {{vm.pickEndDate | amDateFormat:'LL'}}</span>\n" +
    "	</div>\n" +
    "	<wfm-popup show=\"vm.isShowingDatePicker\">\n" +
    "		<wfm-date-range-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "			<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "				<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "					<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "					<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "				</div>\n" +
    "				<span ng-if=\"vm.dateRangeText.length > 0\">{{vm.dateRangeText}}</span>\n" +
    "			</div>\n" +
    "		</wfm-date-range-picker-header>\n" +
    "		<wfm-date-range-picker-body class=\"con-row\">\n" +
    "			<div class=\"con-flex date-info-wrapper\">\n" +
    "				<div class=\"transition-block\" ng-class=\"{'transit-to-start': vm.isPickingStartDate, 'transit-to-end': vm.isPickingEndDate}\"></div>\n" +
    "				<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='start-date' || vm.disable=='all'}\">\n" +
    "					<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectStartDate()\">\n" +
    "						<span class=\"date-info-label\" translate>From</span>\n" +
    "						<h1 class=\"date-info\">{{vm.pickStartDate | amDateFormat:'LL'}}</h1>\n" +
    "					</div>\n" +
    "					<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetStartDate()\">\n" +
    "						<i class=\"mdi mdi-close\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<hr />\n" +
    "				<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='end-date' || vm.disable=='all'}\">\n" +
    "					<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectEndDate()\">\n" +
    "						<span class=\"date-info-label\" translate>To</span>\n" +
    "						<h1 class=\"date-info\">{{vm.pickEndDate | amDateFormat:'LL'}}</h1>\n" +
    "					</div>\n" +
    "					<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetEndDate()\">\n" +
    "						<i class=\"mdi mdi-close\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "				<div uib-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "				 ng-change=\"vm.switchDate()\" datepicker-options=\"vm.options\"></div>\n" +
    "			</div>\n" +
    "		</wfm-date-range-picker-body>\n" +
    "	</wfm-popup>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"!vm.popupMode\">\n" +
    "	<wfm-date-range-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "		<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "				<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "				<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "			</div>\n" +
    "			<span ng-if=\"vm.dateRangeText.length > 0\">{{vm.dateRangeText}}</span>\n" +
    "		</div>\n" +
    "	</wfm-date-range-picker-header>\n" +
    "	<wfm-date-range-picker-body class=\"con-row\">\n" +
    "		<div class=\"con-flex date-info-wrapper\">\n" +
    "			<div class=\"transition-block\" ng-class=\"{'transit-to-start': vm.isPickingStartDate, 'transit-to-end': vm.isPickingEndDate}\"></div>\n" +
    "			<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='start-date' || vm.disable=='all'}\">\n" +
    "				<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectStartDate()\">\n" +
    "					<span class=\"date-info-label\" translate>From</span>\n" +
    "					<h1 class=\"date-info\">{{vm.pickStartDate | amDateFormat:'LL'}}</h1>\n" +
    "				</div>\n" +
    "				<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetStartDate()\">\n" +
    "					<i class=\"mdi mdi-close\"></i>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<hr />\n" +
    "			<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='end-date' || vm.disable=='all'}\">\n" +
    "				<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectEndDate()\">\n" +
    "					<span class=\"date-info-label\" translate>To</span>\n" +
    "					<h1 class=\"date-info\">{{vm.pickEndDate | amDateFormat:'LL'}}</h1>\n" +
    "				</div>\n" +
    "				<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetEndDate()\">\n" +
    "					<i class=\"mdi mdi-close\"></i>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "			<div uib-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "			 ng-change=\"vm.switchDate()\" datepicker-options=\"vm.options\"></div>\n" +
    "		</div>\n" +
    "	</wfm-date-range-picker-body>\n" +
    "</div>"
  );


  $templateCache.put('directives/wfm-date-range-picker/wfm-date-range-picker.jalaali.tpl.html',
    "<div ng-if=\"vm.popupMode\">\n" +
    "	<div class=\"wfm-datepicker-text\" ng-click=\"vm.toggleDatePicker($event)\">\n" +
    "		<span><i class=\"mdi mdi-calendar-range\"></i></span>\n" +
    "		<span class=\"wfm-datepicker-text-from\">{{'From' | translate}}: {{vm.pickStartDate | persianDate:'fullDate'}}</span>\n" +
    "		<span class=\"wfm-datepicker-text-to\">{{'To' | translate}}: {{vm.pickEndDate | persianDate:'fullDate'}}</span>\n" +
    "	</div>\n" +
    "	<wfm-popup show=\"vm.isShowingDatePicker\">\n" +
    "		<wfm-date-range-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "			<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "				<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "					<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "					<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "				</div>\n" +
    "				<span ng-if=\"vm.dateRangeText.length > 0\">{{vm.dateRangeText}}</span>\n" +
    "			</div>\n" +
    "		</wfm-date-range-picker-header>\n" +
    "		<wfm-date-range-picker-body class=\"con-row\">\n" +
    "			<div class=\"con-flex date-info-wrapper\">\n" +
    "				<div class=\"transition-block\" ng-class=\"{'transit-to-start': vm.isPickingStartDate, 'transit-to-end': vm.isPickingEndDate}\"></div>\n" +
    "				<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='start-date' || vm.disable=='all'}\">\n" +
    "					<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectStartDate()\">\n" +
    "						<span class=\"date-info-label\" translate>From</span>\n" +
    "						<h1 class=\"date-info jallali-start-date\">{{vm.pickStartDate | persianDate:'fullDate'}}</h1>\n" +
    "					</div>\n" +
    "					<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetStartDate()\">\n" +
    "						<i class=\"mdi mdi-close\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<hr />\n" +
    "				<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='end-date' || vm.disable=='all'}\">\n" +
    "					<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectEndDate()\">\n" +
    "						<span class=\"date-info-label\" translate>To</span>\n" +
    "						<h1 class=\"date-info jallali-end-date\">{{vm.pickEndDate | persianDate:'fullDate'}}</h1>\n" +
    "					</div>\n" +
    "					<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetEndDate()\">\n" +
    "						<i class=\"mdi mdi-close\"></i>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "				<persian-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "				 ng-change=\"vm.switchDate()\" show-weeks=\"vm.showWeek\" custom-class=\"vm.options.customClass()\"></persian-datepicker>\n" +
    "			</div>\n" +
    "		</wfm-date-range-picker-body>\n" +
    "	</wfm-popup>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"!vm.popupMode\">\n" +
    "	<wfm-date-range-picker-header class=\"con-row between-date-info-wrapper\">\n" +
    "		<div class=\"con-flex\" ng-class=\"{'notice-warning':!vm.isValid, 'notice-info':vm.isValid}\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context\" ng-click=\"vm.selectToday()\">\n" +
    "				<i class=\"mdi mdi-calendar-range\"></i>\n" +
    "				<md-tooltip>{{'SelectToday' | translate}}</md-tooltip>\n" +
    "			</div>\n" +
    "			<span ng-if=\"vm.dateRangeText.length > 0\">{{vm.dateRangeText}}</span>\n" +
    "		</div>\n" +
    "	</wfm-date-range-picker-header>\n" +
    "	<wfm-date-range-picker-body class=\"con-row\">\n" +
    "		<div class=\"con-flex date-info-wrapper\">\n" +
    "			<div class=\"transition-block\" ng-class=\"{'transit-to-start': vm.isPickingStartDate, 'transit-to-end': vm.isPickingEndDate}\"></div>\n" +
    "			<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='start-date' || vm.disable=='all'}\">\n" +
    "				<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectStartDate()\">\n" +
    "					<span class=\"date-info-label\" translate>From</span>\n" +
    "					<h1 class=\"date-info jallali-start-date\">{{vm.pickStartDate | persianDate:'fullDate'}}</h1>\n" +
    "				</div>\n" +
    "				<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetStartDate()\">\n" +
    "					<i class=\"mdi mdi-close\"></i>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<hr />\n" +
    "			<div class=\"select-date-info-wrapper pointer\" ng-class=\"{'disabled': vm.disable=='end-date' || vm.disable=='all'}\">\n" +
    "				<div class=\"select-date-info-inner\" ng-click=\"vm.startToSelectEndDate()\">\n" +
    "					<span class=\"date-info-label\" translate>To</span>\n" +
    "					<h1 class=\"date-info jallali-end-date\">{{vm.pickEndDate | persianDate:'fullDate'}}</h1>\n" +
    "				</div>\n" +
    "				<div class=\"clear-select-date-grow-out\" ng-click=\"vm.resetEndDate()\">\n" +
    "					<i class=\"mdi mdi-close\"></i>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"con-flex date-info-calendar-wrapper\">\n" +
    "			<persian-datepicker ng-model=\"vm.pickDate\" ng-class=\"{'non-pointer':vm.disable === 'all', 'show-week-numbers': vm.options.showWeeks, 'hide-week-numbers': !vm.options.showWeeks}\"\n" +
    "			 ng-change=\"vm.switchDate()\" show-weeks=\"vm.showWeek\" custom-class=\"vm.options.customClass()\"></persian-datepicker>\n" +
    "		</div>\n" +
    "	</wfm-date-range-picker-body>\n" +
    "</div>"
  );


  $templateCache.put('directives/wfm-multiple-search/wfm-multiple-search-input.tpl.html',
    "<div class=\"wfm-multiple-search-wrapper\">\n" +
    "	<input id=\"advanced-search\" class=\"advanced-input\" type=\"text\" placeholder=\"{{vm.searchTitle}}\" ng-class=\"{'expand-advanced-input': vm.showAdvancedSearchOption}\"\n" +
    "	 ng-model=\"vm.searchOptions.keyword\" ng-keyup=\"vm.searchTextInputKeyup($event)\" ng-focus=\"vm.openAdvancedSearchOption($event)\"\n" +
    "	 ng-change=\"vm.searchTextChange()\" ng-click=\"vm.openAdvancedSearchOption($event)\" />\n" +
    "	<div class=\"advanced-input-dropdown\" ng-cloak ng-if=\"vm.showAdvancedSearchOption\" outside-click=\"vm.turnOffAdvancedSearch($event);\">\n" +
    "		<div class=\"panel material-depth-1\">\n" +
    "			<div class=\"sub-header\">\n" +
    "				<h2>{{ 'Search' | translate }}</h2>\n" +
    "			</div>\n" +
    "			<form name=\"form\" class=\"wfm-form\" novalidate>\n" +
    "				<div class=\"con-row\" ng-repeat=\"searchField in vm.searchOptions.searchFields\" ng-if=\"$even\">\n" +
    "					<div class=\"full-padding\">\n" +
    "						<input autocomplete=\"off\" ng-if=\"vm.searchOptions.searchFields[$index]\" id=\"criteria-{{vm.searchOptions.searchFields[$index]}}\"\n" +
    "						 class=\"con-flex advanced-search-field\" type=\"text\" ng-keyup=\"vm.onSearchFieldInputKeyUp($event)\" placeholder=\"{{'PersonFinderField'+ vm.searchOptions.searchFields[$index]|translate}}\"\n" +
    "						 ng-model=\"vm.advancedSearchForm[vm.searchOptions.searchFields[$index]]\" maxlength=\"500\" />\n" +
    "					</div>\n" +
    "					<div class=\"full-padding\">\n" +
    "						<input autocomplete=\"off\" ng-if=\"vm.searchOptions.searchFields[$index + 1]\" id=\"criteria-{{vm.searchOptions.searchFields[$index + 1]}}\"\n" +
    "						 class=\"con-flex advanced-search-field\" type=\"text\" ng-keyup=\"vm.onSearchFieldInputKeyUp($event)\" placeholder=\"{{'PersonFinderField'+ vm.searchOptions.searchFields[$index + 1]|translate}}\"\n" +
    "						 ng-model=\"vm.advancedSearchForm[vm.searchOptions.searchFields[$index + 1]]\" maxlength=\"500\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "				<div class=\"con-footer\">\n" +
    "					<button class=\"wfm-btn wfm-btn-invis-default\" type=\"reset\" ng-click=\"vm.clearSearch()\">{{'Clear'|translate}}</button>\n" +
    "					<button id=\"go-advanced-search\" type=\"submit\" class=\"wfm-btn wfm-btn-invis-primary\" ng-click=\"vm.advancedSearch()\">{{'Search'\n" +
    "						| translate}}</button>\n" +
    "				</div>\n" +
    "			</form>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<div class=\"search-button\">\n" +
    "		<span class=\"cursor-pointer search-icon\" ng-focus=\"vm.turnOffAdvancedSearch()\" ng-click=\"vm.searchIconClickFn()\">\n" +
    "			<i class=\"mdi mdi-magnify\" ng-class=\"{'focusing-search': vm.searchOptions.focusingSearch}\"></i>\n" +
    "			<md-tooltip>{{'Search' | translate}}</md-tooltip>\n" +
    "		</span>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('directives/wfm-right-panel/wfm-right-panel.tpl.html',
    "<md-backdrop class=\"md-sidenav-backdrop md-opaque ng-scope\" ng-if=\"vm.panelOptions.showBackdrop && vm.panelOptions.panelState\" ng-click=\"vm.panelOptions.panelState = false;\"></md-backdrop>\n" +
    "\n" +
    "<div class=\"head-actions panel-menu\">\n" +
    "	<div tabindex=0 class=\"context-menu card-context open-right-panel\" ng-if=\"vm.panelOptions.showPopupButton\" ng-click=\"vm.panelOptions.panelState = true\">\n" +
    "	 <i class=\"mdi mdi-arrow-left-box\"></i>\n" +
    "	 <md-tooltip>{{\"ShowRightPanel\" | translate}}</md-tooltip>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div resizable r-directions=\"['left']\" r-flex=\"false\" ng-show=\"vm.showPanel\">\n" +
    "	<md-sidenav class=\"md-sidenav-right wfm-right-panel drsElement\" md-component-id=\"right-panel\" md-is-open=\"vm.panelOptions.panelState\">\n" +
    "	<div class=\"sub-header\">\n" +
    "		<h2>{{vm.panelOptions.sidePanelTitle | translate}}</h2>\n" +
    "		<div class=\"head-actions panel-menu close-right-panel\" ng-click=\"vm.closePanel()\" ng-if=\"vm.panelOptions.showCloseButton\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context\">\n" +
    "				<i class=\"mdi mdi-arrow-right-box\"></i>\n" +
    "				<md-tooltip>{{\"HidePanel\" | translate}}</md-tooltip>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"panel-content\" ng-transclude></div>\n" +
    "	</md-sidenav>\n" +
    "</div>\n"
  );


  $templateCache.put('directives/workinghourspicker/working-hours-picker.tpl.html',
    "<div ng-repeat=\"WorkingPeriod in workingHours\">\n" +
    "	<div class=\"con-row working-hours-row\">\n" +
    "		<div class=\"con-flex working-hours-period\">\n" +
    "			<h2>{{ getTimerangeDisplay(WorkingPeriod.StartTime, WorkingPeriod.EndTime)}}</h2>\n" +
    "		</div>\n" +
    "		<div class=\"con-flex working-hours-day\" ng-repeat=\"WeekDay in WorkingPeriod.WeekDaySelections\">\n" +
    "			<md-checkbox ng-model=\"WeekDay.Checked\" aria-label=\"Checkbox\" ng-click=\"enforceRadioBehavior($parent.$index, WeekDay.WeekDay)\">\n" +
    "				<span translate>{{WeekDay | showWeekdays}}</span>\n" +
    "			</md-checkbox>\n" +
    "		</div>\n" +
    "		<div class=\"con-flex working-hours-action\">\n" +
    "			<div tabindex=0 class=\"context-menu card-context\" ng-click=\"$parent.removeWorkingPeriod($index)\">\n" +
    "				<i class=\"mdi mdi-delete\"></i>\n" +
    "				<md-tooltip>{{'DeletePeriod' | translate}} {{ getTimerangeDisplay(WorkingPeriod.StartTime, WorkingPeriod.EndTime)}}</md-tooltip>\n" +
    "			</div>\n" +
    "			<div tabindex=0 class=\"context-menu card-context\" ng-click=\"$parent.toggleAllChecks($index)\">\n" +
    "				<i class=\"mdi mdi-check\"></i>\n" +
    "				<md-tooltip>{{'ToggleAll' | translate}}</md-tooltip>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"con-row\">\n" +
    "	<div class=\"working-hours-picker-container\">\n" +
    "		<!--No need for a con-flex here, its in the directive-->\n" +
    "		<time-range-picker ng-model=\"newWorkingPeriod\" max-hours-range=\"maxHoursRange\" disable-next-day=\"disableNextDay\"></time-range-picker>\n" +
    "		<button type=\"button\" class=\"wfm-btn wfm-btn-invis-default\" ng-click=\"addEmptyWorkingPeriod()\">\n" +
    "				{{'AddOpenHours' | translate}}\n" +
    "			<md-tooltip>{{'AddEmptyPeriod' | translate}}</md-tooltip>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "</div>"
  );

}]);
