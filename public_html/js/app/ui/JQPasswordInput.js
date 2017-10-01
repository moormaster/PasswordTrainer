(
    function($) {
        $.fn.JQPasswordInput = function(sub, options) {
            if (!sub)
                sub = "init";
                
            switch(sub) {
                case "init":
                    return init.call(this);
                    break;
                    
                case "successColor":
                    return setSuccessColor.call(this, options.isSuccessful);
                    break;
                    
                case "lock":
                    return setLock.call(this, options.isLocked);
                    break;
                    
                case "status":
                    return setStatus.call(this, options.text);
                    break;
                    
                case "description":
                    return setDescription.call(this, options.text);
                    break;
            };
        };
        
        var init = function() {
            this.change(
                function() {
                    $(this).trigger("passwordEntered", [$(this).val()]);
                }
            );
        };
        
        var setSuccessColor = function(isSuccessful) {
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
        
        var setLock = function(isLocked) {
            if (isLocked) {
                this.find('.password').attr("readonly", "");
                this.find('.password').addClass('bg_readonly');
            } else {
                this.find('.password').removeAttr("readonly");
                this.find('.password').removeClass('bg_readonly');
            }
        };

        var setStatus = function(text) {
            return this.find('.passwordscore').text(text);
        };
        
        var setDescription = function(text) {
            return this.find('.passworddescription').text(text);
        };
    }
)(jQuery);
