/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        $(document).ready(
            function() {
                $('#passwordeditor').JQPasswordRegistration(
                    {
                        passwordDescription:            $('#passwordeditor .passworddescription'),
                        password:                       $('#passwordeditor .password'),
                        passwordRepeat:                 $('#passwordeditor .passwordrepeat'),
                        
                        passwordRegistration:           $('#passwordregistrationcontainer .passwordregistration'),
                        passwordRegistrationContainer:  $('#passwordregistrationcontainer')
                    }
                );
                $('#passwordeditor').on('passwordEntered', 
                    function(e, desc, pwd) {
                        alert("password entered\n" + desc + ": " + pwd);
                    }
                );
                
                $('#passwordtrainer .password').JQPasswordTrainer();

                window.setInterval(
                    function() {
                        $('#passwordtrainer .password').each(
                            function() {
                                this.passwordTrainer_Refresh();
                            }
                        );
                    },
                    1000
                );
            }
        );
    }
)(jQuery);
