/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PageManagePasswords;

(
    function($) {
        PageManagePasswords = function(app) {
            this.prototype = new IPageManagePasswords(app);
            
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
                        // TODO SLA
                        pageInstance.appInstance.passwordRegistrations.add(desc, pwd);
                        pageInstance.appInstance.writePasswordRegistrationsToLocalStorage();
                    }
                );
            };
        };
    }(jQuery)
);
