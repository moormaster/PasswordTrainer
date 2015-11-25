/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        var app;
        
        $(document).ready(
            function() {
                app = new App();
                app.init();
                app.readPasswordRegistrationsFromLocalStorage();
            }
        );
    }(jQuery)
);
