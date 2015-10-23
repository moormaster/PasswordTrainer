/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        function elemInit(elem, instance) {
            elem.passwordRegistrationList = instance
        }
        
        $.fn.JQPasswordRegistrationList = function(options) {
            if (options == null)
                options = {};
            
            this.containerCollection = options['container'];
            this.templateCollection = options['template'];
            
            if (!this.containerCollection) {
                this.containerCollection = this.children(".passwordlistcontainer");
            }
            if (!this.templateCollection)
                this.templateCollection = this.children(".passwordtemplate");
            
            
            this.templateCollection.hide();
            
            var instance = this;

            
            this.copyTemplate = function() {
                instance.templateCollection.each(
                    function() {
                        instance.containerCollection.append(instance.templateCollection);
                    }
                )
            }
                        
            $(this).each(
                function() {
                    elemInit(this, instance);
                    
                    this.passwords = function() {
                        var res = [];
                        
                        instance.containerCollection.each(
                            function() {
                                // concat password lists of all containers
                                res.concat(this.passwords());
                            }
                        )
                    }
                }
            )
            instance.containerCollection.each(
                function() {
                    elemInit(this, instance);
                    
                    this.passwords = function() {
                        var res = [];
                        
                        instance.containerCollection.each(
                            function() {
                                // append passwords of all templates
                                res.push(this.password());
                            }
                        );
                    
                        return res;
                    }
                }
            );
            instance.templateCollection.each(
                function() {
                    elemInit(this, instance);
                    
                    this.password = function() {
                        var desc = $(this).contents(".passworddescription").val()
                        var hash = $(this).contents(".passwordhash").val()
                        
                        return {
                            description:    desc,
                            hash:           hash
                        };
                    }
                }
            );
        }
    }
)(jQuery);

