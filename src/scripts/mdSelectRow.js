angular.module('md.data.table').directive('mdSelectRow', mdSelectRow);

function mdSelectRow($mdTable) {
    'use strict';

    function template(tElement, tAttrs) {
        var ngRepeat = $mdTable.parse(tAttrs.ngRepeat);

        if (!angular.isDefined(tAttrs.mdNoCheckbox)) { //attribute present do not add the checkbox
            var checkbox = angular.element('<md-checkbox></md-checkbox>');

            checkbox.attr('aria-label', 'Select Row');
            checkbox.attr('ng-click', 'toggleRow(' + ngRepeat.item + ', $event)');
            checkbox.attr('ng-class', 'mdClasses');
            checkbox.attr('ng-checked', 'isSelected(' + ngRepeat.item + ')');
            if (tAttrs.mdDisableSelect) {
                checkbox.attr('ng-disabled', 'isDisabled()');
            }

            tElement.prepend(angular.element('<td></td>').append(checkbox));

            if (angular.isDefined(tAttrs.mdAutoSelect)) { //if attribute present add toggle function to the row, additional to the toggle function on the check box
                tAttrs.$set('ngClick', 'toggleRow(' + ngRepeat.item + ', $event)');
            }

            tAttrs.$set('ngClass', '{\'md-selected\': isSelected(' + ngRepeat.item + ')}');
        }

        if (angular.isDefined(tAttrs.mdNoSelect)) { //attribute present add click event to the row
            tAttrs.$set('ngClick', 'clickRow(' + ngRepeat.item + ', $event)');
        }
    }

    function postLink(scope, element, attrs, tableCtrl) {
        var model = {};
        var ngRepeat = $mdTable.parse(attrs.ngRepeat);

        if (!angular.isFunction(scope.isDisabled)) {
            scope.isDisabled = function () {
                return false;
            };
        }

        tableCtrl.isDisabled = function (item) {
            model[ngRepeat.item] = item;
            return scope.isDisabled(model);
        };
    }

    return {
        link: postLink,
        priority: 1001,
        require: '^^mdDataTable',
        scope: {
            isDisabled: '&?mdDisableSelect'
        },
        template: template
    };
}

mdSelectRow.$inject = ['$mdTable'];
