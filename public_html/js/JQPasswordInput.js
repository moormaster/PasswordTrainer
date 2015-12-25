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
                    $(this).trigger("passwordEntered", [$(this).val()]);
                }
            );
        };
        
        $.prototype.JQPasswordInputSuccessColor = function(isSuccessful) {
                switch(isSuccessful) {
                    case false:
                        this.find('.password').removeClass('bg_anim_green');
                        this.find('.password').addClass('bg_anim_red');
                        break;
                        
                    case true:
                        this.find('.password').removeClass('bg_anim_red');
                        this.find('.password').addClass('bg_anim_green');
                        break;
                        
                    default:
                        this.find('.password').removeClass('bg_anim_green');
                        this.find('.password').removeClass('bg_anim_red');
                        break;
                }                        
        };
        
        $.prototype.JQPasswordInputColor = function(isLocked) {
            if (isLocked) {
                this.find('.password').attr("readonly", "");
                this.find('.password').addClass('bg_readonly');
            } else {
                this.find('.password').removeAttr("readonly");
                this.find('.password').removeClass('bg_readonly');
            }
        };

        $.prototype.JQPasswordInputStatus = function(text) {
            return this.find('.passwordscore').text(text);
        };
        
        $.prototype.JQPasswordInputDescription = function(text) {
            return this.find('.passworddescription').text(text);
        }
    }
)(jQuery);
