describe('md-data-table-1', function() {

    beforeEach(function (){
      browser.get(browser.params.baseUrl);
      mdDataTable = element(by.id('md-data-table-1'));
    });

    it('should work', function(){
      expect(browser.getTitle()).toBe('Nutrition');
    });


    it('should have a header', function () {
        var header = mdDataTable.element(by.tagName('thead'));

        expect(header.isPresent()).toBe(true);
    });

    it('should have pagination', function(){
      var mdDataTablePagination = mdDataTable.element(by.tagName('md-data-table-pagination'));

      expect(mdDataTablePagination.isPresent()).toBe(true);
    });




    describe('toggled Table', function(){
        beforeEach(function (){
          var toolbar = mdDataTable.element(by.tagName('md-data-table-toolbar'));
          var toggleButton = toolbar.element(by.tagName('button'));

          toggleButton.click();
        });

      it('should display in full mode', function(){
        var mdDataTableContainer = mdDataTable.element(by.tagName('md-data-table-container'));

          expect(mdDataTableContainer.getAttribute('class')).toMatch('table-full');
          expect(mdDataTableContainer.getAttribute('class')).not.toMatch('table-column');
      });

      it('should have an order attribute', function(){
        var th = mdDataTable.element(by.css('thead th.md-active'));
        // th = th.element(by.css('th.md-active'));

        expect(th.isPresent()).toBe(true);

      });

      it('should change icon-arrow orientation when order is changed', function(){
        var th = mdDataTable.element(by.tagName('thead'));
        th = th.element(by.css('th.md-active'));

        var icon = th.element(by.tagName('md-icon'));




        icon.getAttribute('class').then(function(classes){
          var iconClass = classes.replace('ng-isolate-scope', '').trim();

          // we expect arrow position to be the opposite as it's now
          var expectedClass = (iconClass === 'up') ? 'down' : 'up';

          //click on the header
          th.click().then(function(){

            return icon.getAttribute('class');

          }).then(function(classes){

              var iconClass = classes.replace('ng-isolate-scope', '').trim();

              // now we expect arrow position to be the opposite
              expect(iconClass).toBe(expectedClass);
          });
        });



      });


    });


});
