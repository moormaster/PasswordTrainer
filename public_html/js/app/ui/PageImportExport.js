// vi: ts=4 et

var PageImportExport = (
    function($) {
        class PageImportExport {
            constructor(app) {
                this.appInstance = app;
            }

            /*
             * initialize jquery ui widgets
             */
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

            /*
             * perform export of password registrations
             */
            exportPasswordRegistrations() {
                var json = this.appInstance.exportJSON();
                var formatter = new JSONFormatter();
                json = formatter.format(json);

                $('#importexportfield').val(json);
            }

            /*
             * perform import of password registrations
             */
            importPasswordRegistrations() {
                var json = $('#importexportfield').val();

                this.appInstance.importJSON(json);
            }
        };

        return PageImportExport;
    }
)(jQuery);
