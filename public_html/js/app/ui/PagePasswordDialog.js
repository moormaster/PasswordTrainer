var PagePasswordDialog = (
    function($) {
        class PagePasswordDialog extends IPagePasswordDialog{
            constructor(app) {
                super(app);
                
                this.prototype = new IPagePasswordDialog(app);
            
                this.appInstance = app;
            }
            
            init() {
                var pageInstance = this;
                
                $('#passwordregistration').JQPasswordRegistration(
                    {
                        passwordDescription:            $('#passwordregistration .passworddescription'),
                        password:                       $('#passwordregistration .password'),
                        passwordRepeat:                 $('#passwordregistration .passwordrepeat'),
                    }
                );
                
                $('#passwordregistration').on('passwordEntered', 
                    function(e, desc, pwd) {
                        pageInstance.appInstance.addPasswordRegistration(desc, pwd);
                    }
                );
            }
        };
        
        return PagePasswordDialog;
    }
)(jQuery);
