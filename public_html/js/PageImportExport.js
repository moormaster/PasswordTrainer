/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
var PageImportExport;

(
    function($) {
        PageImportExport = function(app) {
            this.appInstance = app;
            
            this.init = function() {
                var pageInstance = this;
                
                $('#pageImportExport').on('pageshow',
                    function(e) {
                        pageInstance.export();
                    }
                );
        
                $('#pageImportExport').on('change',
                    function(e) {
                        pageInstance.import();
                    }
                );
            };
            
            this.export = function() {
                var json = this.appInstance.exportPasswordRegistrations();
                
                $('#importexportfield').val(json);                
            }
            
            this.import = function() {
                var json = $('#importexportfield').val();
                
                if (this.appInstance.importPasswordRegistrations(json)) {
                    this.appInstance.writePasswordRegistrationsToLocalStorage();
                    $.mobile.changePage('#pageTrainPasswords')
                }
            }
        }
    }(jQuery)
);
