/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        $.fn.JQPassword = function(sub, options) {
            if (!sub)
                sub = "init";
                
            switch(sub) {
                case "init":
                    return init.call(this, options.skeleton);
                    break;
                    
                case "description":
                    return setDescription.call(this, options.value);
                    break;
                    
                case "score":
                    return setScore.call(this, options.value);
                    break;
                case "fee":
                    return setFee.call(this, options.value);
                    break;
                case "level":
                   return setLevel.call(this, options.value);
                   break;
                case "status":
                   return setStatus.call(this, options.value);
                   break;
            };
        };
        
        var init = function(skeleton) {
            var skel = "    <div class=\"password\">\
                                <span class=\"passworddescription\"></span><br/>\
                                <span class=\"passwordscore\"></span> P (Lvl: <span class=\"passwordlevel\"></span> Fee: <span class=\"passwordfee\"></span> Status: <span class=\"passwordstatus\"></span>)\
                            </div>";
           
           if (skeleton)
               skel = skeleton;
           
           return this.append(skel);
        };
        
        var setDescription = function(value) {
            return this.find('.passworddescription').text(value);
        };
        
        var setScore = function(value) {
            return this.find('.passwordscore').text(value);
        };
        
        var setFee = function(value) {
            return this.find('.passwordfee').text(value);
        };
        
        var setLevel = function(value) {
            return this.find('.passwordlevel').text(value);
        };
        
        var setStatus = function(value) {
            return this.find('.passwordstatus').text(value);
        }
    }
)(jQuery);
