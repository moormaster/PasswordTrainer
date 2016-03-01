/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
var PageImportExport;

(
    function($) {
        PageImportExport = function(app) {
            this.prototype = new IPageImportExport(app);
            
            this.appInstance = app;
            
            this.init = function() {
                var pageInstance = this;
                
                $('#pageImportExport').on('pageshow',
                    function(e) {
                        pageInstance.exportPasswordRegistrations();
                    }
                );
                
                $('#pageImportExport').on('change',
                    function(e) {
                        pageInstance.importPasswordRegistrations();
                    }
                );
            };
            
            this.exportPasswordRegistrations = function() {
                // TODO SLA
                var json = this.appInstance.passwordRegistrations.exportJSON();
                
                $('#importexportfield').val(json);                
            };
            
            this.importPasswordRegistrations = function() {
                var json = $('#importexportfield').val();
                
                // TODO SLA
                if (this.appInstance.passwordRegistrations.importJSON(json)) {
                    this.appInstance.writePasswordRegistrationsToLocalStorage();
                    this.appInstance.pageTrainPasswords.update();
                    $.mobile.changePage('#pageTrainPasswords');
                }
            };
        };
    }(jQuery)
);
