describe('nutrition controller', function () {
      beforeEach(module('nutritionApp'));

      var $controller;
      var $scope;

      // inject controller
      beforeEach(inject(function(_$controller_, _$rootScope_){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $controller('nutritionController', { $scope: $scope });
      }));


      it('should toggle table mode', function () {
        var originalToggle = $scope.toggleContainer;

        $scope.toggleTable();

        expect($scope.toggleContainer).toBe(!originalToggle);
      });


      it('should have columns defined', function(){
        expect($scope.columns).toBeDefined();
      });



    });
