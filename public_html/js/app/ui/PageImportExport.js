/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
var PageImportExport = (
    function($) {
        class PageImportExport extends IPageImportExport {
            constructor(app) {
                super(app);
            
                this.appInstance = app;
            }
            
            init() {
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
            }
            
            exportPasswordRegistrations() {
                var json = this.appInstance.exportJSON();
                var formatter = new JSONFormatter();
                json = formatter.format(json);
                
                $('#importexportfield').val(json);
            }
            
            importPasswordRegistrations() {
                var json = $('#importexportfield').val();
                
                this.appInstance.importJSON(json);
            }
        };
        
        return PageImportExport;
    }
)(jQuery);
