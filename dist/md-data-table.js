/*
 * Angular Material Data Table
 * https://github.com/daniel-nagy/md-data-table
 * @license MIT
 * v0.10.9
 */
(function (window, angular, undefined) {
'use strict';

angular.module('md.table.templates', ['md-data-table-edit.html', 'md-data-table-pagination.html', 'md-data-table-progress.html', 'md-table-pagination.html', 'md-table-progress.html', 'arrow-up.svg', 'arrow.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);

angular.module('md-data-table-edit.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-data-table-edit.html',
    '<md-dialog aria-label="Edit" ng-cloak>\n' +
    '    <form name="inlineEditForm" novalidate>\n' +
    '        <md-toolbar>\n' +
    '            <div class="md-toolbar-tools">\n' +
    '                <h2>Edit</h2>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '        <md-dialog-content style="width:300px;max-width:800px;max-height:220px;" layout="column"\n' +
    '                           layout-align="center center">\n' +
    '            <div class="md-dialog-content">\n' +
    '                <div ng-switch on="editType">\n' +
    '                    <div ng-switch-when="date">\n' +
    '                        <md-datepicker name="dateField"\n' +
    '                                       ng-model="editModel.data"\n' +
    '                                       ng-required="fieldRequired"\n' +
    '                                       md-max-date="fieldMaxDate"\n' +
    '                                       md-min-date="fieldMinDate"\n' +
    '                                       md-placeholder="Enter date"\n' +
    '                                       aria-label="date"></md-datepicker>\n' +
    '\n' +
    '                        <div class="validation-messages" ng-messages="inlineEditForm.dateField.$error"\n' +
    '                             ng-if="inlineEditForm.dateField.$error">\n' +
    '                            <div ng-message="required">You did not enter a field</div>\n' +
    '                            <div ng-message="maxdate">Date is too late!</div>\n' +
    '                            <div ng-message="mindate">Date is too early!</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div ng-switch-when="note">\n' +
    '                        <md-input-container class="md-block">\n' +
    '                                <textarea name="textareaField"\n' +
    '                                          aria-label="textarea"\n' +
    '                                          ng-model="editModel.data"\n' +
    '                                          md-maxlength="{{fieldMaxLength}}"\n' +
    '                                          rows="5"\n' +
    '                                          ng-required="fieldRequired"\n' +
    '                                          style="overflow-y: auto;width:250px;"\n' +
    '                                >\n' +
    '                                </textarea>\n' +
    '\n' +
    '                            <div ng-messages="inlineEditForm.textareaField.$error"\n' +
    '                                 ng-if="inlineEditForm.textareaField.$error">\n' +
    '                                <div ng-message="required">You did not enter a field</div>\n' +
    '                                <div ng-message="md-maxlength">Your field is too long</div>\n' +
    '                            </div>\n' +
    '                        </md-input-container>\n' +
    '                    </div>\n' +
    '                    <div ng-switch-default>\n' +
    '                        <md-input-container>\n' +
    '                            <input name="inputField"\n' +
    '                                   ng-model="editModel.data"\n' +
    '                                   type="{{editType}}"\n' +
    '                                   md-maxlength="{{fieldMaxLength}}"\n' +
    '                                   ng-required="fieldRequired"\n' +
    '                                   aria-label="input">\n' +
    '\n' +
    '                            <div ng-messages="inlineEditForm.inputField.$error"\n' +
    '                                 ng-if="inlineEditForm.inputField.$error">\n' +
    '                                <div ng-message="required">You did not enter a field</div>\n' +
    '                                <div ng-message="md-maxlength">Your field is too long</div>\n' +
    '                            </div>\n' +
    '                        </md-input-container>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <!--pre>\n' +
    '                dateField.$error = {{ inlineEditForm.dateField.$error | json }}\n' +
    '                textareaField.$error = {{ inlineEditForm.textareaField.$error | json }}\n' +
    '                inputField.$error = {{ inlineEditForm.inputField.$error | json }}\n' +
    '            </pre-->\n' +
    '        </md-dialog-content>\n' +
    '        <md-dialog-actions layout="row">\n' +
    '            <span flex></span>\n' +
    '            <md-button ng-click="close()">Cancel</md-button>\n' +
    '            <md-button class="md-raised md-primary" ng-disabled="inlineEditForm.$invalid" ng-click="save()">Save\n' +
    '            </md-button>\n' +
    '        </md-dialog-actions>\n' +
    '    </form>\n' +
    '</md-dialog>');
}]);

angular.module('md-data-table-pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-data-table-pagination.html',
    '<div>\n' +
    '  <span class="label" ng-show="showRowSelection">{{paginationLabel.text}}</span>\n' +
    '  <md-select ng-show="showRowSelection" ng-model="limit" md-container-class="md-pagination-select" ng-change="onSelect()" aria-label="Row Count" placeholder="{{rowSelect ? rowSelect[0] : 5}}">\n' +
    '    <md-option ng-repeat="rows in rowSelect ? rowSelect : [5, 10, 15]" ng-value="rows">{{rows}}</md-option>\n' +
    '  </md-select>\n' +
    '  <span>{{min()}} - {{max()}} {{paginationLabel.of}} {{total}}</span>\n' +
    '</div>\n' +
    '<div>\n' +
    '  <md-button ng-show="showFirstLast" type="button" ng-click="first()" ng-disabled="!hasPrevious()" aria-label="First">\n' +
    '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '  <md-button type="button" ng-click="previous()" ng-disabled="!hasPrevious()" aria-label="Previous">\n' +
    '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '  <md-button type="button" ng-click="next()" ng-disabled="!hasNext()" aria-label="Next">\n' +
    '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '  <md-button ng-show="showFirstLast" type="button" ng-click="last()" ng-disabled="!hasNext()" aria-label="Last">\n' +
    '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '</div>\n' +
    '');
}]);

angular.module('md-data-table-progress.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-data-table-progress.html',
    '<thead ng-if="showProgress">\n' +
    '  <tr>\n' +
    '    <th colspan="{{columnCount}}">\n' +
    '      <md-progress-linear md-mode="indeterminate"></md-progress-linear>\n' +
    '    </th>\n' +
    '  </tr>\n' +
    '</thead>');
}]);

angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-pagination.html',
    '<div class="page-select" ng-if="$pagination.showPageSelect()">\n' +
    '  <div class="label">{{$pagination.label.page}}</div>\n' +
    '\n' +
    '  <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">\n' +
    '    <md-content>\n' +
    '      <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>\n' +
    '    </md-content>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="limit-select" ng-if="$pagination.limitOptions">\n' +
    '  <div class="label">{{$pagination.label.rowsPerPage}}</div>\n' +
    '\n' +
    '  <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">\n' +
    '    <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>\n' +
    '  </md-select>\n' +
    '</div>\n' +
    '\n' +
    '<div class="buttons">\n' +
    '  <div class="label">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">\n' +
    '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">\n' +
    '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">\n' +
    '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '\n' +
    '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">\n' +
    '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
    '  </md-button>\n' +
    '</div>');
}]);

angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('md-table-progress.html',
    '<tr>\n' +
    '  <th colspan="{{columnCount()}}">\n' +
    '    <md-progress-linear ng-show="deferred()" md-mode="indeterminate"></md-progress-linear>\n' +
    '  </th>\n' +
    '</tr>');
}]);

angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('arrow-up.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
}]);

angular.module('arrow.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('arrow.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M3,9 L4.06,10.06 L8.25,5.87 L8.25,15 L9.75,15 L9.75,5.87 L13.94,10.06 L15,9 L9,3 L3,9 L3,9 Z"/></svg>');
}]);

angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-before.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
}]);

angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-first.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
}]);

angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-last.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
}]);

angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('navigate-next.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
}]);


angular.module('md.data.table', ['md.table.templates']);

angular.module('md.data.table').directive('mdBody', mdBody);

function mdBody() {

  function compile(tElement) {
    tElement.addClass('md-body');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdCell', mdCell);

function mdCell() {
  
  function compile(tElement) {
    var select = tElement.find('md-select');
    
    if(select.length) {
      select.addClass('md-table-select').attr('md-container-class', 'md-table-select');
    }
    
    tElement.addClass('md-cell');
    
    return postLink;
  }
  
  // empty controller to be bind properties to in postLink function
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, ctrls) {
    var select = element.find('md-select');
    var cellCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();
    
    if(attrs.ngClick) {
      element.addClass('md-clickable');
    }
    
    if(select.length) {
      select.on('click', function (event) {
        event.stopPropagation();
      });
      
      element.addClass('md-clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }
    
    cellCtrl.getTable = tableCtrl.getElement;
    
    function getColumn() {
      return tableCtrl.$$columns[getIndex()];
    }
    
    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }
    
    scope.$watch(getColumn, function (column) {
      if(!column) {
        return;
      }
      
      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    });
  }
  
  return {
    controller: Controller,
    compile: compile,
    require: ['mdCell', '^^mdTable'],
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdColumn', mdColumn);

function mdColumn($compile, $mdUtil) {

  function compile(tElement) {
    tElement.addClass('md-column');
    return postLink;
  }

  function postLink(scope, element, attrs, ctrls) {
    var headCtrl = ctrls.shift();
    var tableCtrl = ctrls.shift();

    function attachSortIcon() {
      var sortIcon = angular.element('<md-icon md-svg-icon="arrow-up.svg">');

      $compile(sortIcon.addClass('md-sort-icon').attr('ng-class', 'getDirection()'))(scope);

      if(element.hasClass('md-numeric')) {
        element.prepend(sortIcon);
      } else {
        element.append(sortIcon);
      }
    }

    function detachSortIcon() {
      Array.prototype.some.call(element.find('md-icon'), function (icon) {
        return icon.classList.contains('md-sort-icon') && element[0].removeChild(icon);
      });
    }

    function disableSorting() {
      detachSortIcon();
      element.removeClass('md-sort').off('click', setOrder);
    }

    function enableSorting() {
      attachSortIcon();
      element.addClass('md-sort').on('click', setOrder);
    }

    function getIndex() {
      return Array.prototype.indexOf.call(element.parent().children(), element[0]);
    }

    function isActive() {
      return scope.orderBy && (headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy);
    }

    function isNumeric() {
      return attrs.mdNumeric === '' || scope.numeric;
    }

    function setOrder() {
      scope.$applyAsync(function () {
        if(isActive()) {
          headCtrl.order = scope.getDirection() === 'md-asc' ? '-' + scope.orderBy : scope.orderBy;
        } else {
          headCtrl.order = scope.getDirection() === 'md-asc' ? scope.orderBy : '-' + scope.orderBy;
        }

        if(angular.isFunction(headCtrl.onReorder)) {
          $mdUtil.nextTick(function () {
            headCtrl.onReorder(headCtrl.order);
          });
        }
      });
    }

    function updateColumn(index, column) {
      tableCtrl.$$columns[index] = column;

      if(column.numeric) {
        element.addClass('md-numeric');
      } else {
        element.removeClass('md-numeric');
      }
    }

    scope.getDirection = function () {
      if(isActive()) {
        return headCtrl.order.charAt(0) === '-' ? 'md-desc' : 'md-asc';
      }

      return attrs.mdDesc === '' || scope.$eval(attrs.mdDesc) ? 'md-desc' : 'md-asc';
    };

    scope.$watch(isActive, function (active) {
      if(active) {
        element.addClass('md-active');
      } else {
        element.removeClass('md-active');
      }
    });

    scope.$watch(getIndex, function (index) {
      updateColumn(index, {'numeric': isNumeric()});
    });

    scope.$watch(isNumeric, function (numeric) {
      updateColumn(getIndex(), {'numeric': numeric});
    });

    scope.$watch('orderBy', function (orderBy) {
      if(orderBy) {
        if(!element.hasClass('md-sort')) {
          enableSorting();
        }
      } else if(element.hasClass('md-sort')) {
        disableSorting();
      }
    });
  }

  return {
    compile: compile,
    require: ['^^mdHead', '^^mdTable'],
    restrict: 'A',
    scope: {
      numeric: '=?mdNumeric',
      orderBy: '@?mdOrderBy'
    }
  };
}

mdColumn.$inject = ['$compile', '$mdUtil'];

angular.module('md.data.table').directive('mdColumnHeader', mdColumnHeader);

function mdColumnHeader($compile, $interpolate, $timeout) {
  'use strict';

  function postLink(scope, element, attrs, ctrls) {
    var tableCtrl = ctrls[0];
    var headCtrl = ctrls[1];
    var template = angular.element('<div></div>');

    template.text($interpolate.startSymbol() + 'name' + $interpolate.endSymbol());

    if(attrs.unit) {
      template.text(template.text() + ' (' + $interpolate.startSymbol() + 'unit' + $interpolate.endSymbol() + ')');
    }

    if(angular.isDefined(attrs.trim)) {
      template.contents().wrap('<div></div>');
    }

    if(attrs.orderBy) {
      var sortIcon = angular.element('<md-icon></md-icon>');

      var isActive = function () {
        return headCtrl.order === scope.order || headCtrl.order === '-' + scope.order;
      };

      var setOrder = function () {

        if(isActive()) {
          scope.$apply(headCtrl.order = headCtrl.order === scope.order ? '-' + scope.order : scope.order);
        } else {
          scope.$apply(headCtrl.order = angular.isDefined(attrs.descendFirst) ? '-' + scope.order : scope.order);
        }

        if(headCtrl.pullTrigger) {
          $timeout(headCtrl.pullTrigger);
        }
      };

      scope.getDirection = function () {
        if(isActive()) {
          return headCtrl.order[0] === '-' ? 'down' : 'up';
        }
        return angular.isDefined(attrs.descendFirst) ? 'down' : 'up';
      };

      sortIcon.attr('md-svg-icon', 'arrow.svg');
      sortIcon.attr('ng-class', 'getDirection()');

      if(angular.isDefined(attrs.numeric)) {
        template.prepend(sortIcon);
      } else {
        template.append(sortIcon);
      }

      element.on('click', setOrder);

      scope.$watch(isActive, function (active) {
        if(active) { element.addClass('md-active'); } else { element.removeClass('md-active'); }
      });
    }

    element.append($compile(template)(scope));

    if(headCtrl.isSignificant(element.parent())) {
      tableCtrl.setColumn(attrs);

      if(attrs.ngRepeat) {
        if(scope.$parent.$last) {
          tableCtrl.isReady.head.resolve();
        }
      } else if(tableCtrl.isLastChild(element.parent().children(), element[0])) {
        tableCtrl.isReady.head.resolve();
      }
    }
  }

  return {
    link: postLink,
    require: ['^^mdDataTable', '^mdTableHead'],
    scope: {
      name: '@',
      order: '@orderBy',
      unit: '@'
    }
  };
}

mdColumnHeader.$inject = ['$compile', '$interpolate', '$timeout'];


angular.module('md.data.table').directive('mdDataTable', mdDataTable);

function mdDataTable($mdTable) {
    'use strict';

    function compile(tElement, tAttrs) {
        var head = tElement.find('thead');
        var foot = tElement.find('tfoot');

        // make sure the table has a head element
        if (!head.length) {
            head = tElement.find('tbody').eq(0);

            if (head.children().find('th').length) {
                head.replaceWith('<thead>' + head.html() + '</thead>');
            } else {
                throw new Error('mdDataTable', 'Expecting <thead></thead> element.');
            }

            head = tElement.find('thead');
        }

        var rows = tElement.find('tbody').find('tr');

        head.attr('md-table-head', '');
        rows.attr('md-table-row', '');
        rows.find('td').attr('md-table-cell', '');

        if (foot.length) {
            foot.attr('md-table-foot', '');

            if (tAttrs.mdRowSelect) {
                foot.find('tr').prepend('<td></td>');
            }
        }

        rows.attr('md-select-row', ''); //always add this attribute, use other attributes to control this directive

        var ngRepeat = $mdTable.getAttr(rows, 'ngRepeat');

        if (tAttrs.mdRowSelect && !ngRepeat) {
            console.warn('Please use ngRepeat to enable row selection.');
        }

        if (head.attr('md-order') && !ngRepeat) {
            console.warn('Column ordering without ngRepeat is not supported.');
        }
    }

    function Controller($attrs, $element, $q, $scope) {
        var self = this;

        self.columns = [];
        self.classes = [];
        self.dirtyItems = [];
        self.isReady = {
            body: $q.defer(),
            head: $q.defer()
        };

        if ($attrs.mdRowSelect) {
            self.columns.push({isNumeric: false});

            if (!angular.isArray(self.selectedItems)) {
                self.selectedItems = [];
                // log warning for developer
                console.warn('md-row-select="' + $attrs.mdRowSelect + '" : ' +
                    $attrs.mdRowSelect + ' is not defined as an array in your controller, ' +
                    'i.e. ' + $attrs.mdRowSelect + ' = [], two-way data binding will fail.');
            }
        }

        if ($attrs.mdProgress) {
            $scope.$watch('$mdDataTableCtrl.progress', function () {
                var deferred = self.defer();
                $q.when(self.progress)['finally'](deferred.resolve);
            });
        }

        // support theming
        ['md-primary', 'md-hue-1', 'md-hue-2', 'md-hue-3'].forEach(function (mdClass) {
            if ($element.hasClass(mdClass)) {
                self.classes.push(mdClass);
            }
        });

        self.defer = function () {
            if (self.deferred) {
                self.deferred.reject('cancel');
            } else if (self.showProgress) {
                self.showProgress();
            }

            self.deferred = $q.defer();
            self.deferred.promise.then(self.resolve);

            return self.deferred;
        };

        self.resolve = function () {
            self.deferred = undefined;

            if (self.hideProgress) {
                self.hideProgress();
            }
        };

        self.isLastChild = function (siblings, child) {
            return Array.prototype.indexOf.call(siblings, child) === siblings.length - 1;
        };

        self.isReady.body.promise.then(function (ngRepeat) {
            if ($attrs.mdRowSelect && ngRepeat) {
                self.listener = $scope.$parent.$watch(ngRepeat.items, function (newValue, oldeValue) {
                    if (newValue !== oldeValue) {
                        self.selectedItems.splice(0);
                        self.dirtyItems.splice(0);
                    }
                });
            }
        });

        self.setColumn = function (column) {
            self.columns.push({
                isNumeric: angular.isDefined(column.numeric),
                unit: column.unit,
                name: column.name
            });
        };

        self.processEdit = function (rowData, propertyPath, propertyData, onError) {
            //remove duplicates
            $mdTable.removeDuplicates(self.dirtyItems, rowData.id);

            var oldItem = {};

            angular.copy(rowData, oldItem);

            //sync data
            $mdTable.updateObject(rowData, propertyPath, propertyData);

            //update dirty items
            self.dirtyItems.push({
                oldItem: oldItem,
                newItem: rowData
            });

            //call callback
            if (typeof self.rowUpdateCallback === 'function') {
                //execute the callback for each row
                var i = self.dirtyItems.length;
                var callback = self.rowUpdateCallback();
                var errorCallback = function () { //error callback
                    onError(item.oldItem);
                };
                while (i--) {
                    var item = self.dirtyItems[i];
                    callback(item, errorCallback);
                    self.dirtyItems.splice(i, 1); //remove the item from array
                }
            }
        };

        self.processEditSelect = function (rowData, oldItem, onError) {
            //remove duplicates
            $mdTable.removeDuplicates(self.dirtyItems, rowData.id);

            //update dirty items
            self.dirtyItems.push({
                oldItem: oldItem,
                newItem: rowData
            });

            //call callback
            if (typeof self.rowUpdateCallback === 'function') {
                //execute the callback for each row
                var i = self.dirtyItems.length;
                var callback = self.rowUpdateCallback();
                while (i--) {
                    var item = self.dirtyItems[i];
                    callback(item, onError);
                    self.dirtyItems.splice(i, 1); //remove the item from array
                }
            }
        };
    }

    Controller.$inject = ['$attrs', '$element', '$q', '$scope'];

    return {
        bindToController: {
            progress: '=mdProgress',
            selectedItems: '=mdRowSelect',
            rowUpdateCallback: '&mdRowUpdateCallback',
            rowClick: '=mdRowClick',
            hasAccess: '@'
        },
        compile: compile,
        controller: Controller,
        controllerAs: '$mdDataTableCtrl',
        restrict: 'A',
        scope: {}
    };
}

mdDataTable.$inject = ['$mdTable'];


angular.module('md.data.table').directive('mdTableCell', mdTableCell);

function mdTableCell() {
  'use strict';
  
  function postLink(scope, element) {
    var select = element.find('md-select');
    
    if(select.length) {
      
      select.on('click', function (event) {
        event.stopPropagation();
      });
      
      element.addClass('clickable').on('click', function (event) {
        event.stopPropagation();
        select[0].click();
      });
    }
  }
  
  function compile(tElement) {
    tElement.find('md-select').attr('md-container-class', 'md-table-select');
    return postLink;
  }
  
  return {
    compile: compile
  };
}

angular.module('md.data.table').directive('mdTableFoot', mdTableFoot);

function mdTableFoot() {
  'use strict';

  function postLink(scope, element, attrs, tableCtrl) {
    var cells = element.find('td');
    
    tableCtrl.columns.forEach(function(column, index) {
      if(column.isNumeric) {
        cells.eq(index).addClass('numeric');
      }
    });
    
    if(cells.length < tableCtrl.columns.length) {
      element.find('tr').append('<td colspan="' + (tableCtrl.columns.length - cells.length) + '"></td>');
    }
  }
  
  return {
    require: '^mdDataTable',
    link: postLink
  };
}

angular.module('md.data.table').directive('mdTableHead', mdTableHead);

function mdTableHead($mdTable, $q) {
  'use strict';

  function compile(tElement) {
    tElement.find('th').attr('md-column-header', '');

    // enable row selection
    if(tElement.parent().attr('md-row-select')) {
      var ngRepeat = $mdTable.getAttr(tElement.parent().find('tbody').find('tr'), 'ngRepeat');

      if(ngRepeat) {
        tElement.find('tr').prepend(angular.element('<th md-select-all="' + $mdTable.parse(ngRepeat).items + '"></th>'));
      }
    }

    tElement.after('<thead md-table-progress></thead>');

    return postLink;
  }

  function Controller($element, $scope) {
    var rows = $element.find('tr');

    if(!$scope.sigRow || parseInt($scope.sigRow, 10) === isNaN() || $scope.sigRow < 0) {
      $scope.sigRow = rows.length - 1;
    }

    // when tables headers have multiple rows we need a significant row
    // to append the checkbox to and to controll the text alignment for
    // numeric columns
    this.isSignificant = function (row) {
      return row.prop('rowIndex') === $scope.sigRow;
    };

  }

  function postLink(scope, element, attrs, tableCtrl) {
    var controller = element.data('$mdTableHeadController');

    // table progress
    if(angular.isFunction(scope.trigger)) {
      controller.pullTrigger = function () {
        var deferred = tableCtrl.defer();
        $q.when(scope.trigger(controller.order))['finally'](deferred.resolve);
      };
    }
  }

  Controller.$inject = ['$element', '$scope'];

  return {
    bindToController: {
      order: '=mdOrder'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$mdDataTableHeadCtrl',
    require: '^mdDataTable',
    scope: {
      trigger: '=?mdTrigger',
      sigRow: '=?'
    }
  };
}

mdTableHead.$inject = ['$mdTable', '$q'];


angular.module('md.data.table')
    .filter('mdStartFrom', function () {
        'use strict';

        return function (input, start) {
            if (!input || !input.length) {
                return;
            }
            start = +start; //parse to int
            return input.slice(start); //adjust the page, starting from page 1
        };
    })
    .directive('mdDataTablePagination', mdDataTablePagination);

function mdDataTablePagination($q) {
    'use strict';

    function postLink(scope, element, attrs) {
        scope.paginationLabel = {
            text: 'Rows per page:',
            of: 'of'
        };

        if (angular.isObject(scope.label)) {
            angular.extend(scope.paginationLabel, scope.label);
        }

        // table progress
        if (angular.isFunction(scope.trigger)) {

            // the pagination directive is outside the table directive so we need
            // to locate the controller
            var findTable = function (element, callback) {
                while (element.localName !== 'md-data-table-container' && element.previousElementSibling) {
                    element = element.previousElementSibling;
                }
                callback(angular.element(element.firstElementChild));
            };

            var setTrigger = function (table) {
                var tableCtrl = table.controller('mdDataTable');

                if (!tableCtrl) {
                    return console.warn('Table Pagination: Could not locate your table directive, your ' + attrs.mdTrigger + ' function will not work.');
                }

                scope.pullTrigger = function () {
                    var deferred = tableCtrl.defer();
                    $q.when(scope.trigger(scope.page, scope.limit))['finally'](deferred.resolve);
                };
            };

            findTable(element.prop('previousElementSibling'), setTrigger);
        }

        scope.$watch('data', function (value) {
            if (value) {
                scope.total = value.length;
            }
        });
    }

    function Controller($scope, $timeout) {
        var min = 1;

        $scope.hasNext = function () {
            return (($scope.page * $scope.limit) < $scope.total);
        };

        $scope.hasPrevious = function () {
            return ($scope.page > 1);
        };

        $scope.next = function () {
            $scope.page++;

            if ($scope.pullTrigger) {
                $timeout($scope.pullTrigger);
            }

            min = $scope.min();
        };

        $scope.last = function () {
            $scope.page = Math.ceil($scope.total / $scope.limit);

            if ($scope.pullTrigger) {
                $timeout($scope.pullTrigger);
            }

            min = $scope.min();
        };

        $scope.min = function () {
            return ((($scope.page - 1) * $scope.limit) + 1);
        };

        $scope.max = function () {
            return $scope.hasNext() ? $scope.page * $scope.limit : $scope.total;
        };

        $scope.onSelect = function () {
            $scope.page = Math.floor(min / $scope.limit) + 1;

            if ($scope.pullTrigger) {
                $timeout($scope.pullTrigger);
            }

            min = $scope.min();
            while ((min > $scope.total) && $scope.hasPrevious()) {
                $scope.previous();
            }
        };

        $scope.previous = function () {
            $scope.page--;

            if ($scope.pullTrigger) {
                $timeout($scope.pullTrigger);
            }

            min = $scope.min();
        };

        $scope.first = function () {
            $scope.page = 1;

            if ($scope.pullTrigger) {
                $timeout($scope.pullTrigger);
            }

            min = $scope.min();
        };
    }

    Controller.$inject = ['$scope', '$timeout'];

    return {
        controller: Controller,
        scope: {
            label: '=mdLabel',
            limit: '=mdLimit',
            page: '=mdPage',
            data: '=mdData',
            rowSelect: '=mdRowSelect',
            total: '@mdTotal',
            trigger: '=mdTrigger',
            showRowSelection: '=mdShowRowSelection',
            showFirstLast: '=mdShowFirstLast'
        },
        templateUrl: 'md-data-table-pagination.html',
        link: postLink
    };
}

mdDataTablePagination.$inject = ['$q'];


angular.module('md.data.table').directive('mdTableRow', mdTableRow);

function mdTableRow($mdTable, $timeout) {
    'use strict';

    function postLink(scope, element, attrs, tableCtrl) {

        if (angular.isDefined(attrs.mdSelectRow)) {
            scope.mdClasses = tableCtrl.classes;

            scope.isDisabled = function () {
                return scope.$eval(attrs.mdDisableSelect);
            };

            scope.isSelected = function (item) {
                return tableCtrl.selectedItems.indexOf(item) !== -1;
            };

            scope.toggleRow = function (item, event) {
                event.stopPropagation();

                if (scope.isDisabled()) {
                    return;
                }

                if (scope.isSelected(item)) {
                    tableCtrl.selectedItems.splice(tableCtrl.selectedItems.indexOf(item), 1);
                } else {
                    tableCtrl.selectedItems.push(item);
                }
            };

            scope.clickRow = function (item, event) {
                event.stopPropagation();

                if (scope.isDisabled()) {
                    return;
                }

                if (typeof tableCtrl.rowClick === 'function') {
                    tableCtrl.rowClick(item);
                }
            };
        }

        if (attrs.ngRepeat) {
            if (scope.$last) {
                tableCtrl.isReady.body.resolve($mdTable.parse(attrs.ngRepeat));
            }
        } else if (tableCtrl.isLastChild(element.parent().children(), element[0])) {
            tableCtrl.isReady.body.resolve();
        }

        tableCtrl.isReady.head.promise.then(function () {
            tableCtrl.columns.forEach(function (column, index) {
                if (column.isNumeric) {
                    var cell = element.children().eq(index);

                    cell.addClass('numeric');

                    if (angular.isDefined(cell.attr('show-unit'))) {
                        $timeout(function () {
                            cell.text(cell.text() + tableCtrl.columns[index].unit);
                        });
                    }
                }
            });
        });

    }

    return {
        link: postLink,
        require: '^^mdDataTable'
    };
}

mdTableRow.$inject = ['$mdTable', '$timeout'];

angular.module('md.data.table').factory('$mdTable', mdTableService);

function mdTableService() {
    'use strict';

    var cache = {};

    function Repeat(ngRepeat) {
        this._tokens = ngRepeat.split(/\s+/);
        this._iterator = 0;

        this.item = this.current();
        while (this.hasNext() && this.getNext() !== 'in') {
            this.item += this.current();
        }

        this.items = this.getNext();
        while (this.hasNext() && ['|', 'track'].indexOf(this.getNext()) === -1) {
            this.items += this.current();
        }
    }

    Repeat.prototype.current = function () {
        return this._tokens[this._iterator];
    };

    Repeat.prototype.getNext = function () {
        return this._tokens[++this._iterator];
    };

    Repeat.prototype.getValue = function () {
        return this._tokens.join(' ');
    };

    Repeat.prototype.hasNext = function () {
        return this._iterator < this._tokens.length - 1;
    };

    /**
     * Get the value of an atribute given its normalized name.
     *
     * @param {jqLite} element - A jqLite element.
     * @param {string} attr - The normalized name of the attribute.
     * @returns {string} - The value of the attribute.
     */
    function getAttr(element, attr) {
        var attrs = element.prop('attributes');

        for (var i = 0; i < attrs.length; i++) {
            if (normalize(attrs.item(i).name) === attr) {
                return attrs.item(i).value;
            }
        }

        return '';
    }

    /**
     * Normalizes an attribute's name.
     *
     * @param {string} attr - The original name of the attribute.
     * @returns {string} - The normalized name of the attribute.
     */
    function normalize(attr) {
        var tokens = attr.replace(/^((?:x|data)[\:\-_])/i, '').split(/[\:\-_]/);
        var normal = tokens.shift();

        tokens.forEach(function (token) {
            normal += token.charAt(0).toUpperCase() + token.slice(1);
        });

        return normal;
    }

    function parse(ngRepeat) {
        if (!cache.hasOwnProperty(ngRepeat)) {
            return (cache[ngRepeat] = new Repeat(ngRepeat));
        }

        return cache[ngRepeat];
    }


    /**
     * Remove object from array with a given key
     *
     * @param items
     * @param key
     */
    function removeDuplicates(items, key) {
        if (items.length > 0) {
            angular.forEach(items, function (item, i) {
                if (item.id === key) {
                    items.splice(i, 1);
                    return false;
                }
            });
        }
    }

    /**
     * This sets the object property based on the property path provided.
     * The object name is included in the property.
     *
     * var test = {property:value}
     *
     * prop should be test.property
     *
     * @param obj
     * @param prop
     * @param value
     */
    function setDeepValue(obj, prop, value) {
        if (typeof prop === 'string') {
            prop = prop.split('.');
            prop.shift(); //remove the object name
        }

        if (prop.length > 1) {
            var e = prop.shift();
            setDeepValue(obj[e] = Object.prototype.toString.call(obj[e]) === '[object Object]' ? obj[e] : {}, prop, value);
        } else {
            obj[prop[0]] = value;
        }
    }

    return {
        getAttr: getAttr,
        normalize: normalize,
        parse: parse,
        removeDuplicates: removeDuplicates,
        updateObject: setDeepValue
    };

}

angular.module('md.data.table')
  .decorator('$controller', controllerDecorator)
  .factory('$mdEditDialog', mdEditDialog);

/*
 * A decorator for ng.$controller to optionally bind properties to the
 * controller before invoking the constructor. Stolen from the ngMock.
 *
 * https://docs.angularjs.org/api/ngMock/service/$controller
 */
function controllerDecorator($delegate) {
  return function(expression, locals, later, ident) {
    if(later && typeof later === 'object') {
      var create = $delegate(expression, locals, true, ident);
      angular.extend(create.instance, later);
      return create();
    }
    return $delegate(expression, locals, later, ident);
  };
}

controllerDecorator.$inject = ['$delegate'];
  
function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
  /* jshint validthis: true */
  
  var ESCAPE = 27;
  
  var busy = false;
  var body = angular.element($document.prop('body'));
  
  /*
   * bindToController
   * controller
   * controllerAs
   * locals
   * resolve
   * scope
   * targetEvent
   * template
   * templateUrl
   */
  var defaultOptions = {
    clickOutsideToClose: true,
    disableScroll: true,
    escToClose: true,
    focusOnOpen: true
  };
  
  function build(template, options) {
    var scope = $rootScope.$new();
    var element = $compile(template)(scope);
    var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');
    var controller;
    
    if(options.controller) {
      controller = getController(options, scope, {$element: element, $scope: scope});
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.disableScroll) {
      disableScroll(element);
    }
    
    body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));
    
    positionDialog(element, options.target);
    
    if(options.focusOnOpen) {
      focusOnOpen(element);
    }
    
    if(options.clickOutsideToClose) {
      backdrop.on('click', function () {
        element.remove();
      });
    }
    
    if(options.escToClose) {
      escToClose(element);
    }
    
    element.on('$destroy', function () {
      busy = false;
      backdrop.remove();
    });
    
    return controller;
  }
  
  function disableScroll(element) {
    var restoreScroll = $mdUtil.disableScrollAround(element, body);
    
    element.on('$destroy', function () {
      restoreScroll();
    });
  }
  
  function getController(options, scope, inject) {
    if(!options.controller) {
      return;
    }
    
    if(options.resolve) {
      angular.extend(inject, options.resolve);
    }
    
    if(options.locals) {
      angular.extend(inject, options.locals);
    }
    
    if(options.controllerAs) {
      scope[options.controllerAs] = {};
      
      if(options.bindToController) {
        angular.extend(scope[options.controllerAs], options.scope);
      } else {
        angular.extend(scope, options.scope);
      }
    } else {
      angular.extend(scope, options.scope);
    }
    
    if(options.bindToController) {
      return $controller(options.controller, inject, scope[options.controllerAs]);
    } else {
      return $controller(options.controller, inject);
    }
  }
  
  function getTemplate(options) {
    return $q(function (resolve, reject) {
      var template = options.template;
      
      function illegalType(type) {
        reject('Unexpected template value. Expected a string; received a ' + type + '.');
      }
      
      if(template) {
        return angular.isString(template) ? resolve(template) : illegalType(typeof template);
      }
      
      if(options.templateUrl) {
        template = $templateCache.get(options.templateUrl);
        
        if(template) {
          return resolve(template);
        }
        
        var success = function (template) {
          return resolve(template);
        };
        
        var error = function () {
          return reject('Error retrieving template from URL.');
        };
        
        return $templateRequest(options.templateUrl).then(success, error);
      }
      
      reject('Template not provided.');
    });
  }
  
  function logError(error) {
    busy = false;
    console.error(error);
  }
  
  function escToClose(element) {
    var keyup = function (event) {
      if(event.keyCode === ESCAPE) {
        element.remove();
      }
    };
    
    body.on('keyup', keyup);
    
    element.on('$destroy', function () {
      body.off('keyup', keyup);
    });
  }

  function focusOnOpen(element) {
    $mdUtil.nextTick(function () {
      var autofocus = $mdUtil.findFocusTarget(element);
      
      if(autofocus) {
        autofocus.focus();
      }
    }, false);
  }

  function positionDialog(element, target) {
    var table = angular.element(target).controller('mdCell').getTable();
    
    var getHeight = function () {
      return element.prop('clientHeight');
    };
    
    var getSize = function () {
      return {
        width: getWidth(),
        height: getHeight()
      };
    };
    
    var getTableBounds = function () {
      var parent = table.parent();
      
      if(parent.prop('tagName') === 'MD-TABLE-CONTAINER') {
        return parent[0].getBoundingClientRect();
      } else {
        return table[0].getBoundingClientRect();
      }
    };
    
    var getWidth = function () {
      return element.prop('clientWidth');
    };
    
    var reposition = function () {
      var size = getSize();
      var cellBounds = target.getBoundingClientRect();
      var tableBounds = getTableBounds();
      
      if(size.width > tableBounds.right - cellBounds.left) {
        element.css('left', tableBounds.right - size.width + 'px');
      } else {
        element.css('left', cellBounds.left + 'px');
      }
      
      if(size.height > tableBounds.bottom - cellBounds.top) {
        element.css('top', tableBounds.bottom - size.height + 'px');
      } else {
        element.css('top', cellBounds.top + 1 + 'px');
      }
      
      element.css('minWidth', cellBounds.width + 'px');
    };
    
    var watchWidth = $rootScope.$watch(getWidth, reposition);
    var watchHeight = $rootScope.$watch(getHeight, reposition);
    
    $window.addEventListener('resize', reposition);
    
    element.on('$destroy', function () {
      watchWidth();
      watchHeight();
      
      $window.removeEventListener('resize', reposition);
    });
  }
  
  function preset(size, options) {
    
    function getAttrs() {
      var attrs = 'type="' + (options.type || 'text') + '"';
      
      for(var attr in options.validators) {
        attrs += ' ' + attr + '="' + options.validators[attr] + '"';
      }
      
      return attrs;
    }
    
    return {
      controller: ['$element', '$q', 'save', '$scope', function ($element, $q, save, $scope) {
        function update() {
          if($scope.editDialog.$invalid) {
            return $q.reject();
          }
          
          if(angular.isFunction(save)) {
            return $q.when(save($scope.editDialog.input));
          }
          
          return $q.resolve();
        }
        
        this.dismiss = function () {
          $element.remove();
        };
        
        this.getInput = function () {
          return $scope.editDialog.input;
        };
        
        $scope.dismiss = this.dismiss;
        
        $scope.submit = function () {
          update().then(function () {
            $scope.dismiss();
          });
        };
      }],
      locals: {
        save: options.save
      },
      scope: {
        cancel: options.cancel || 'Cancel',
        messages: options.messages,
        model: options.modelValue,
        ok: options.ok || 'Save',
        placeholder: options.placeholder,
        title: options.title,
        size: size
      },
      template:
        '<md-edit-dialog>' +
          '<div layout="column" class="md-content">' +
            '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +
            '<form name="editDialog" layout="column" ng-submit="submit(model)">' +
              '<md-input-container md-no-float>' +
                '<input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
                '<div ng-messages="editDialog.input.$error">' +
                  '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +
                '</div>' +
              '</md-input-container>' +
            '</form>' +
          '</div>' +
          '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +
            '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +
            '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +
          '</div>' +
        '</md-edit-dialog>'
    };
  }
  
  this.show = function (options) {
    if(busy) {
      return $q.reject();
    }
    
    busy = true;
    options = angular.extend({}, defaultOptions, options);
    
    if(!options.targetEvent) {
      return logError('options.targetEvent is required to align the dialog with the table cell.');
    }
    
    if(!options.targetEvent.currentTarget.classList.contains('md-cell')) {
      return logError('The event target must be a table cell.');
    }
    
    if(options.bindToController && !options.controllerAs) {
      return logError('You must define options.controllerAs when options.bindToController is true.');
    }
    
    options.target = options.targetEvent.currentTarget;
    
    var promise = getTemplate(options);
    var promises = [promise];
    
    for(var prop in options.resolve) {
      promise = options.resolve[prop];
      promises.push($q.when(angular.isFunction(promise) ? promise() : promise));
    }
    
    promise = $q.all(promises);
    
    promise['catch'](logError);
    
    return promise.then(function (results) {
      var template = results.shift();
      
      for(var prop in options.resolve) {
        options.resolve[prop] = results.shift();
      }
      
      return build(template, options);
    });
  };
  
  this.small = function (options) {
    return this.show(angular.extend({}, options, preset('small', options)));
  }.bind(this);
  
  this.large = function (options) {
    return this.show(angular.extend({}, options, preset('large', options)));
  }.bind(this);
  
  return this;
}

mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];


angular.module('md.data.table')
    .controller('EditDialogController', mdEditableDialogController)
    .directive('mdEditable', mdEditable);

function mdEditableDialogController($scope, $mdDialog, editType, fieldMaxLength, fieldRequired, dateFormat, fieldMaxDate, fieldMinDate, data, moment) {
    'use strict';

    $scope.editModel = {};

    $scope.fieldRequired = fieldRequired || false;
    $scope.editType = editType;
    $scope.fieldMaxLength = fieldMaxLength;

    if (fieldMinDate && (fieldMinDate instanceof Date)) {
        $scope.fieldMinDate = fieldMinDate;
    }

    if (fieldMaxDate && (fieldMaxDate instanceof Date)) {
        $scope.fieldMaxDate = fieldMaxDate;
    }

    if (editType === 'date' && data && !(data instanceof Date)) {
        $scope.editModel.data = moment(data, dateFormat).toDate();
    }
    else {
        $scope.editModel.data = data;
    }

    $scope.close = function () {
        $mdDialog.hide();
    };

    $scope.save = function () {
        //console.log('scope editType is', $scope.editType);
        var $form, inputText, inputValue;

        $form = angular.element('form[name="inlineEditForm"]');
        // I was going this way but then saw that our workaround is necessary only for mdDatepicker
        //switch ($scope.editType) {
        //    case 'text':
        //    case 'number':
        //    case 'email':
        //        inputValue = $form.find('input').val();
        //        break;
        //    case 'note':
        //        inputValue = $form.find('textarea').val();
        //        break;
        //    case 'date':
        //        inputText = $form.find('input').val();
        //        inputValue = moment(inputText, $scope.dateFormat).toDate();
        //        break;
        //}

        if ($scope.editType === 'date') {
            inputText = $form.find('input').val();
            inputValue = moment(inputText, $scope.dateFormat).toDate();
            //console.log('hiding inline edit with', inputValue)
            $mdDialog.hide({data: inputValue});
        } else {
            //console.log('hiding inline edit with', $scope.editModel.data)
            $mdDialog.hide({data: $scope.editModel.data});
        }
    };
}

function mdEditable($mdDialog, moment, $mdTable) {
    'use strict';

    function compile(tElement, tAttrs) {
        //find the row
        var row = tElement.parent();
        var ngRepeat = $mdTable.parse($mdTable.getAttr(row, 'ngRepeat'));

        //add data item attribute
        tAttrs.$set('rowData', ngRepeat.item);

        return link;
    }

    function link(scope, element, attrs, tableCtrl) {
        element.on('click', function (event) {
            event.stopPropagation();

            if (tableCtrl.hasAccess === 'false') {
                return;
            }

            if (scope.mdEditableDisabled === 'true') {
                return;
            }

            //find the row
            var row = element.parent();

            //check if the record was disabled
            if (scope.$parent.$eval($mdTable.getAttr(row, 'mdDisableSelect'))) {
                return;
            }

            //get type of edit field
            var type = attrs.mdEditable;

            //get row record
            var rowData = scope.rowData;
            var oldData;
            if (angular.isObject(scope.data)) {
                oldData = {};
                angular.copy(scope.data, oldData);
            }
            else {
                oldData = scope.data;
            }

            $mdDialog.show({
                    controller: 'EditDialogController',
                    locals: {
                        editType: type,
                        dateFormat: scope.dateFormat,
                        fieldMinDate: scope.fieldMinDate,
                        fieldMaxDate: scope.fieldMaxDate,
                        fieldMaxLength: scope.fieldMaxLength,
                        fieldRequired: scope.fieldRequired,
                        data: scope.data
                    },
                    templateUrl: 'templates.md-data-table-edit.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true
                })
                .then(function (object) {
                    if (angular.isUndefined(object)) // the dialog was canceled
                        return;
                    scope.data = object.data;
                    tableCtrl.processEdit(rowData, attrs.data, scope.data, function (oldItem) { //error callback
                        scope.rowData = oldItem; //revert the object
                        scope.data = oldData; //revert the property data
                    });
                }, function () {
                    console.log('Error hiding edit dialog.');
                });
        });
    }

    return {
        compile: compile,
        require: '^^mdDataTable',
        restrict: 'A',
        scope: {
            rowData: '=',
            data: '=', //object
            dateFormat: '@', //string
            mdEditableDisabled: '@',
            fieldMinDate: '=', //object
            fieldMaxDate: '=', //object
            fieldMaxLength: '@', //string
            fieldRequired: '@' //string
        }
    };
}

mdEditable.$inject = ['$mdDialog', 'moment', '$mdTable'];


angular.module('md.data.table').directive('mdFoot', mdFoot);

function mdFoot() {

  function compile(tElement) {
    tElement.addClass('md-foot');
  }

  return {
    compile: compile,
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdHead', mdHead);

function mdHead($compile) {

  function compile(tElement) {
    tElement.addClass('md-head');
    return postLink;
  }
  
  // empty controller to be bind scope properties to
  function Controller() {
    
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    // because scope.$watch is unpredictable
    var oldValue = new Array(2);
    
    function addCheckboxColumn() {
      element.children().prepend('<th class="md-column md-checkbox-column">');
    }
    
    function attatchCheckbox() {
      element.prop('lastElementChild').firstElementChild.appendChild($compile(createCheckBox())(scope)[0]);
    }
    
    function createCheckBox() {
      return angular.element('<md-checkbox>').attr({
        'aria-label': 'Select All',
        'ng-click': 'toggleAll()',
        'ng-checked': 'allSelected()',
        'ng-disabled': '!getSelectableRows().length'
      });
    }
    
    function detachCheckbox() {
      var cell = element.prop('lastElementChild').firstElementChild;
      
      if(cell.classList.contains('md-checkbox-column')) {
        angular.element(cell).empty();
      }
    }
    
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function mdSelectCtrl(row) {
      return angular.element(row).controller('mdSelect');
    }
    
    function removeCheckboxColumn() {
      Array.prototype.some.call(element.find('th'), function (cell) {
        return cell.classList.contains('md-checkbox-column') && cell.remove();
      });
    }
    
    scope.allSelected = function () {
      var rows = scope.getSelectableRows();
      
      return rows.length && rows.every(function (row) {
        return row.isSelected();
      });
    };
    
    scope.getSelectableRows = function () {
      return tableCtrl.getBodyRows().map(mdSelectCtrl).filter(function (ctrl) {
        return ctrl && !ctrl.disabled;
      });
    };
    
    scope.selectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && !ctrl.isSelected()) {
          ctrl.select();
        }
      });
    };
    
    scope.toggleAll = function () {
      return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
    };
    
    scope.unSelectAll = function () {
      tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function (ctrl) {
        if(ctrl && ctrl.isSelected()) {
          ctrl.deselect();
        }
      });
    };
    
    scope.$watchGroup([enableRowSelection, tableCtrl.enableMultiSelect], function (newValue) {
      if(newValue[0] !== oldValue[0]) {
        if(newValue[0]) {
          addCheckboxColumn();
          
          if(newValue[1]) {
            attatchCheckbox();
          }
        } else {
          removeCheckboxColumn();
        }
      } else if(newValue[0] && newValue[1] !== oldValue[1]) {
        if(newValue[1]) {
          attatchCheckbox();
        } else {
          detachCheckbox();
        }
      }
      
      angular.copy(newValue, oldValue);
    });
  }
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdHead',
    require: '^^mdTable',
    restrict: 'A',
    scope: {
      order: '=?mdOrder',
      onReorder: '=?mdOnReorder'
    }
  };
}

mdHead.$inject = ['$compile'];

angular.module('md.data.table').directive('mdRow', mdRow);

function mdRow() {

  function compile(tElement) {
    tElement.addClass('md-row');
    return postLink;
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }
    
    function isBodyRow() {
      return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
    }
    
    function isChild(node) {
      return element[0].contains(node[0]);
    }
    
    if(isBodyRow()) {
      var cell = angular.element('<td class="md-cell">');
      
      scope.$watch(enableRowSelection, function (enable) {
        // if a row is not selectable, prepend an empty cell to it
        if(enable && !attrs.mdSelect) {
          if(!isChild(cell)) {
            element.prepend(cell);
          }
          return;
        }
        
        if(isChild(cell)) {
          cell.remove();
        }
      });
    }
  }

  return {
    compile: compile,
    require: '^^mdTable',
    restrict: 'A'
  };
}

angular.module('md.data.table').directive('mdSelect', mdSelect);

function mdSelect($compile, $parse) {

  // empty controller to bind scope properties to
  function Controller() {

  }

  function postLink(scope, element, attrs, ctrls) {
    var self = ctrls.shift();
    var tableCtrl = ctrls.shift();
    var getId = $parse(attrs.mdSelectId);

    self.id = getId(self.model);

    if(tableCtrl.$$rowSelect && self.id) {
      if(tableCtrl.$$hash.has(self.id)) {
        var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));

        // if the item is no longer selected remove it
        if(index === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        // if the item is not a reference to the current model update the reference
        else if(!tableCtrl.$$hash.equals(self.id, self.model)) {
          tableCtrl.$$hash.update(self.id, self.model);
          tableCtrl.selected.splice(index, 1, self.model);
        }

      } else {

        // check if the item has been selected
        tableCtrl.selected.some(function (item, index) {
          if(getId(item) === self.id) {
            tableCtrl.$$hash.update(self.id, self.model);
            tableCtrl.selected.splice(index, 1, self.model);

            return true;
          }
        });
      }
    }

    self.isSelected = function () {
      if(!tableCtrl.$$rowSelect) {
        return false;
      }

      if(self.id) {
        return tableCtrl.$$hash.has(self.id);
      }

      return tableCtrl.selected.indexOf(self.model) !== -1;
    };

    self.select = function () {
      if(self.disabled) {
        return;
      }

      if(tableCtrl.enableMultiSelect()) {
        tableCtrl.selected.push(self.model);
      } else {
        tableCtrl.selected.splice(0, tableCtrl.selected.length, self.model);
      }

      if(angular.isFunction(self.onSelect)) {
        self.onSelect(self.model);
      }
    };

    self.deselect = function () {
      if(self.disabled) {
        return;
      }

      tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);

      if(angular.isFunction(self.onDeselect)) {
        self.onDeselect(self.model);
      }
    };

    self.toggle = function (event) {
      if(event && event.stopPropagation) {
        event.stopPropagation();
      }

      return self.isSelected() ? self.deselect() : self.select();
    };

    function autoSelect() {
      return attrs.mdAutoSelect === '' || self.autoSelect;
    }

    function createCheckbox() {
      var checkbox = angular.element('<md-checkbox>').attr({
        'aria-label': 'Select Row',
        'ng-click': '$mdSelect.toggle($event)',
        'ng-checked': '$mdSelect.isSelected()',
        'ng-disabled': '$mdSelect.disabled'
      });

      return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));
    }

    function disableSelection() {
      Array.prototype.some.call(element.children(), function (child) {
        return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);
      });

      if(autoSelect()) {
        element.off('click', toggle);
      }
    }

    function enableSelection() {
      element.prepend(createCheckbox());

      if(autoSelect()) {
        element.on('click', toggle);
      }
    }

    function enableRowSelection() {
      return tableCtrl.$$rowSelect;
    }

    function onSelectChange(selected) {
      if(!self.id) {
        return;
      }

      if(tableCtrl.$$hash.has(self.id)) {
        // check if the item has been deselected
        if(selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
          tableCtrl.$$hash.purge(self.id);
        }

        return;
      }

      // check if the item has been selected
      if(selected.indexOf(self.model) !== -1) {
        tableCtrl.$$hash.update(self.id, self.model);
      }
    }

    function toggle(event) {
      scope.$applyAsync(function () {
        self.toggle(event);
      });
    }

    scope.$watch(enableRowSelection, function (enable) {
      if(enable) {
        enableSelection();
      } else {
        disableSelection();
      }
    });

    scope.$watch(autoSelect, function (newValue, oldValue) {
      if(newValue === oldValue) {
        return;
      }

      if(tableCtrl.$$rowSelect && newValue) {
        element.on('click', toggle);
      } else {
        element.off('click', toggle);
      }
    });

    scope.$watch(self.isSelected, function (isSelected) {
      return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');
    });

    scope.$watch(tableCtrl.enableMultiSelect, function (multiple) {
      if(tableCtrl.$$rowSelect && !multiple) {
        // remove all but the first selected item
        tableCtrl.selected.splice(1);
      }
    });

    tableCtrl.registerModelChangeListener(onSelectChange);

    element.on('$destroy', function () {
      tableCtrl.removeModelChangeListener(onSelectChange);
    });
  }

  return {
    bindToController: true,
    controller: Controller,
    controllerAs: '$mdSelect',
    link: postLink,
    require: ['mdSelect', '^^mdTable'],
    restrict: 'A',
    scope: {
      model: '=mdSelect',
      disabled: '=ngDisabled',
      onSelect: '=?mdOnSelect',
      onDeselect: '=?mdOnDeselect',
      autoSelect: '=mdAutoSelect'
    }
  };
}

mdSelect.$inject = ['$compile', '$parse'];

angular.module('md.data.table').directive('mdSelectAll', mdSelectAll);

function mdSelectAll() {
  'use strict';
  
  function template(tElement) {
    var checkbox = angular.element('<md-checkbox></md-checkbox>');
    
    checkbox.attr('aria-label', 'Select All');
    checkbox.attr('ng-click', 'toggleAll()');
    checkbox.attr('ng-class', 'mdClasses');
    checkbox.attr('ng-checked', 'allSelected()');
    checkbox.attr('ng-disabled', '!getCount()');
    
    tElement.append(checkbox);
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    var count = 0;
    
    var getSelectableItems = function() {
      return scope.items.filter(function (item) {
        return !tableCtrl.isDisabled(item);
      });
    };
    
    tableCtrl.isReady.body.promise.then(function () {
      scope.mdClasses = tableCtrl.classes;
      
      scope.getCount = function() {
        return (count = !scope.items?0:scope.items.reduce(function(sum, item) {
          return tableCtrl.isDisabled(item) ? sum : ++sum;
        }, 0));
      };
      
      scope.allSelected = function () {
        return count && count === tableCtrl.selectedItems.length;
      };
      
      scope.toggleAll = function () {
        var selectableItems = getSelectableItems(scope.items);
        
        if(selectableItems.length === tableCtrl.selectedItems.length) {
          tableCtrl.selectedItems.splice(0);
        } else {
          tableCtrl.selectedItems = selectableItems;
        }
      };
    });
  }
  
  return {
    link: postLink,
    require: '^^mdDataTable',
    scope: {
      items: '=mdSelectAll'
    },
    template: template
  };
}


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


angular.module('md.data.table')
    .directive('mdSelectUpdateCallback', mdSelectUpdateCallback);
/**
 * This directive for the md-select in the md table cell.  The md-select has bugs when it comes to on change event and track by value.
 * The on change event is fired for every item in the list. With this directive we can control the events.
 */
function mdSelectUpdateCallback() {
    'use strict';

    return {
        restrict: 'A',
        require: '^^mdDataTable',
        link: function (scope, element, attrs, tableCtrl) {

            scope.enableOnChange = false;

            var oldItem = {};

            scope.$watch(attrs.ngModel, function (newValue) {
                if (scope.enableOnChange && newValue !== undefined) {

                    scope.enableOnChange = false;

                    var rowData = scope[attrs.ngModel.split('.')[0]];

                    tableCtrl.processEditSelect(rowData,oldItem,function () { //error callback
                        angular.copy(oldItem,scope[attrs.ngModel.split('.')[0]]);
                    });
                }
            });

            //enable the watcher only when the user interacts with the select
            element.on('click', function () {
                if (!scope.enableOnChange) {
                    scope.enableOnChange = true;
                }

                angular.copy(scope[attrs.ngModel.split('.')[0]], oldItem);
            });
        }
    };
}

mdSelectUpdateCallback.$inject = ['$mdTable'];

angular.module('md.data.table').directive('mdTable', mdTable);

function Hash() {
  var keys = {};
  
  this.equals = function (key, item) {
    return keys[key] === item;
  };

  this.get = function (key) {
    return keys[key];
  };
  
  this.has = function (key) {
    return keys.hasOwnProperty(key);
  };

  this.purge = function (key) {
    delete keys[key];
  };
  
  this.update = function (key, item) {
    keys[key] = item;
  };
}

function mdTable() {
  
  function compile(tElement, tAttrs) {
    tElement.addClass('md-table');
    
    if(tAttrs.hasOwnProperty('mdProgress')) {
      var body = tElement.find('tbody')[0];
      var progress = angular.element('<thead class="md-table-progress">');
      
      if(body) {
        tElement[0].insertBefore(progress[0], body);
      }
    }
  }
  
  function Controller($attrs, $element, $q, $scope) {
    var self = this;
    var queue = [];
    var watchListener;
    var modelChangeListeners = [];
    
    self.$$hash = new Hash();
    self.$$columns = {};
    
    function enableRowSelection() {
      self.$$rowSelect = true;
      
      watchListener = $scope.$watchCollection('$mdTable.selected', function (selected) {
        modelChangeListeners.forEach(function (listener) {
          listener(selected);
        });
      });
      
      $element.addClass('md-row-select');
    }
    
    function disableRowSelection() {
      self.$$rowSelect = false;
      
      if(angular.isFunction(watchListener)) {
        watchListener();
      }
      
      $element.removeClass('md-row-select');
    }
    
    function resolvePromises() {
      if(!queue.length) {
        return $scope.$applyAsync();
      }
      
      queue[0]['finally'](function () {
        queue.shift();
        resolvePromises();
      });
    }
    
    function rowSelect() {
      return $attrs.mdRowSelect === '' || self.rowSelect;
    }
    
    function validateModel() {
      if(!self.selected) {
        return console.error('Row selection: ngModel is not defined.');
      }
      
      if(!angular.isArray(self.selected)) {
        return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');
      }
      
      return true;
    }
    
    self.columnCount = function () {
      return self.getRows($element[0]).reduce(function (count, row) {
        return row.cells.length > count ? row.cells.length : count;
      }, 0);
    };
    
    self.getRows = function (element) {
      return Array.prototype.filter.call(element.rows, function (row) {
        return !row.classList.contains('ng-leave');
      });
    };
    
    self.getBodyRows = function () {
      return Array.prototype.reduce.call($element.prop('tBodies'), function (result, tbody) {
        return result.concat(self.getRows(tbody));
      }, []);
    };
    
    self.getElement = function () {
      return $element;
    };
    
    self.getHeaderRows = function () {
      return self.getRows($element.prop('tHead'));
    };
    
    self.enableMultiSelect = function () {
      return $attrs.multiple === '' || $scope.$eval($attrs.multiple);
    };
    
    self.waitingOnPromise = function () {
      return !!queue.length;
    };
    
    self.queuePromise = function (promise) {
      if(!promise) {
        return;
      }
      
      if(queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
        resolvePromises();
      }
    };
    
    self.registerModelChangeListener = function (listener) {
      modelChangeListeners.push(listener);
    };
    
    self.removeModelChangeListener = function (listener) {
      var index = modelChangeListeners.indexOf(listener);
      
      if(index !== -1) {
        modelChangeListeners.splice(index, 1);
      }
    };
    
    if($attrs.hasOwnProperty('mdProgress')) {
      $scope.$watch('$mdTable.progress', self.queuePromise);
    }
    
    $scope.$watch(rowSelect, function (enable) {
      if(enable && !!validateModel()) {
        enableRowSelection();
      } else {
        disableRowSelection();
      }
    });
  }
  
  Controller.$inject = ['$attrs', '$element', '$q', '$scope'];
  
  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: '$mdTable',
    restrict: 'A',
    scope: {
      progress: '=?mdProgress',
      selected: '=ngModel',
      rowSelect: '=mdRowSelect'
    }
  };
}

angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);
angular.module('md.data.table')
    .filter('mdStartFrom', function () {
        'use strict';

        return function (input, start) {
            if (!input || !input.length) {
                return;
            }
            start = +start; //parse to int
            return input.slice(start); //adjust the page, starting from page 1
        };
    });


function mdTablePagination() {

  function compile(tElement) {
    tElement.addClass('md-table-pagination');
  }

  function Controller($attrs, $mdUtil, $scope) {
    var self = this;
    var defaultLabel = {
      page: 'Page:',
      rowsPerPage: 'Rows per page:',
      of: 'of'
    };

    self.label = angular.copy(defaultLabel);

    function isPositive(number) {
      return parseInt(number, 10) > 0;
    }

    self.eval = function (expression) {
      return $scope.$eval(expression);
    };

    self.first = function () {
      self.page = 1;
      self.onPaginationChange();
    };

    self.hasNext = function () {
      return self.page * self.limit < self.total;
    };

    self.hasPrevious = function () {
      return self.page > 1;
    };

    self.last = function () {
      self.page = self.pages();
      self.onPaginationChange();
    };

    self.max = function () {
      return self.hasNext() ? self.page * self.limit : self.total;
    };

    self.min = function () {
      return isPositive(self.total) ? self.page * self.limit - self.limit + 1 : 0;
    };

    self.next = function () {
      self.page++;
      self.onPaginationChange();
    };

    self.onPaginationChange = function () {
      if(angular.isFunction(self.onPaginate)) {
        $mdUtil.nextTick(function () {
          self.onPaginate(self.page, self.limit);
        });
      }
    };

    self.pages = function () {
      return isPositive(self.total) ? Math.ceil(self.total / (isPositive(self.limit) ? self.limit : 1)) : 1;
    };

    self.previous = function () {
      self.page--;
      self.onPaginationChange();
    };

    self.showBoundaryLinks = function () {
      return $attrs.mdBoundaryLinks === '' || self.boundaryLinks;
    };

    self.showPageSelect = function () {
      return $attrs.mdPageSelect === '' || self.pageSelect;
    };

    $scope.$watch('$pagination.limit', function (newValue, oldValue) {
      if(isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
        return;
      }

      // find closest page from previous min
      self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isPositive(newValue) ? newValue : 1));
      self.onPaginationChange();
    });

    $attrs.$observe('mdLabel', function (label) {
      angular.extend(self.label, defaultLabel, $scope.$eval(label));
    });

    $scope.$watch('$pagination.total', function (newValue, oldValue) {
      if(isNaN(newValue) || newValue === oldValue) {
        return;
      }

      if(self.page > self.pages()) {
        self.last();
      }
    });
  }

  Controller.$inject = ['$attrs', '$mdUtil', '$scope'];

  return {
    bindToController: {
      boundaryLinks: '=?mdBoundaryLinks',
      disabled: '=ngDisabled',
      limit: '=mdLimit',
      page: '=mdPage',
      pageSelect: '=?mdPageSelect',
      onPaginate: '=?mdOnPaginate',
      limitOptions: '=?mdLimitOptions',
      total: '@mdTotal'
    },
    compile: compile,
    controller: Controller,
    controllerAs: '$pagination',
    restrict: 'E',
    scope: {},
    templateUrl: 'md-table-pagination.html'
  };
}


angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);

function mdTableProgress() {

  function postLink(scope, element, attrs, tableCtrl) {
    scope.columnCount = tableCtrl.columnCount;
    scope.deferred = tableCtrl.waitingOnPromise;
  }

  return {
    link: postLink,
    require: '^^mdTable',
    restrict: 'C',
    scope: {},
    templateUrl: 'md-table-progress.html'
  };
}

angular.module('md.data.table').directive('virtualPageSelect', virtualPageSelect);

function virtualPageSelect() {

  function Controller($element, $scope) {
    var self = this;
    var content = $element.find('md-content');

    self.pages = [];

    function getMin(pages, total) {
      return Math.min(pages, isFinite(total) && isPositive(total) ? total : 1);
    }

    function isPositive(number) {
      return number > 0;
    }

    function setPages(max) {
      if(self.pages.length > max) {
        return self.pages.splice(max);
      }

      for(var i = self.pages.length; i < max; i++) {
        self.pages.push(i + 1);
      }
    }

    content.on('scroll', function () {
      if((content.prop('clientHeight') + content.prop('scrollTop')) >= content.prop('scrollHeight')) {
        $scope.$applyAsync(function () {
          setPages(getMin(self.pages.length + 10, self.total));
        });
      }
    });

    $scope.$watch('$pageSelect.total', function (total) {
      setPages(getMin(Math.max(self.pages.length, 10), total));
    });

    $scope.$watch('$pagination.page', function (page) {
      for(var i = self.pages.length; i < page; i++) {
        self.pages.push(i + 1);
      }
    });
  }

  Controller.$inject = ['$element', '$scope'];

  return {
    bindToController: {
      total: '@'
    },
    controller: Controller,
    controllerAs: '$pageSelect'
  };
}

})(window, angular);