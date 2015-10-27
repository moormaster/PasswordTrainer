/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        $.fn.JQPasswordInput = function() {
            this.change(
                function() {
                    $(this).trigger("passwordEntered", [$(this).val()])
                }
            )
        };

    }
)(jQuery);