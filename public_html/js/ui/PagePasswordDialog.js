/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PagePasswordDialog;

(
    function($) {
        PagePasswordDialog = function(app) {
            this.prototype = new IPagePasswordDialog(app);
            
            this.appInstance = app;
            
            this.init = function() {
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
            };
        };
    }
)(jQuery);
