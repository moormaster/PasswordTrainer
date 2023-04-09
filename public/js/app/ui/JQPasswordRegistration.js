// vi: ts=4 et

(
    function($) {
        function elemInit(elem, instance) {
            elem.passwordRegistration = instance;
        }

        function passwordEntered(elem, instance) {
            var desc = instance.passwordDescriptionCollection.val();
            var pwd = instance.passwordCollection.val();
            var pwdrepeat = instance.passwordRepeatCollection.val();

            instance.passwordCollection.removeClass("bg_anim_red");
            instance.passwordRepeatCollection.removeClass("bg_anim_red");

            if (pwd != pwdrepeat) {
                if (pwd  && pwdrepeat) {
                    instance.passwordCollection.addClass("bg_anim_red");
                    instance.passwordRepeatCollection.addClass("bg_anim_red");
                }

                return;
            }

            instance.passwordDescriptionCollection.val("");
            instance.passwordCollection.val("");
            instance.passwordRepeatCollection.val("");

            instance.trigger('passwordEntered', [desc, pwd]);
        }

        $.fn.JQPasswordRegistration = function(options) {
            if (options == null)
                options = {};

            this.passwordDescriptionCollection = options['passwordDescription'];
            this.passwordCollection = options['password'];
            this.passwordRepeatCollection = options['passwordRepeat'];

            if (!this.passwordDescriptionCollection) {
                this.passwordDescriptionCollection = this.children(".passworddescription");
            }
            if (!this.passwordCollection)
                this.passwordCollection = this.children(".password");

            if (!this.passwordRepeatCollection)
                this.passwordRepeatCollection = this.children(".passwordrepeat");            

            this.passwordDescriptionCollection.val("");
            this.passwordCollection.val("");
            this.passwordRepeatCollection.val("");

            var instance = this;

            $(this).each(
                function() {
                    elemInit(this, instance);
                }
            )
            instance.passwordCollection.each(
                function() {
                    elemInit(this, instance);
                }
            );
            instance.passwordRepeatCollection.each(
                function() {
                    elemInit(this, instance);
                }
            );

            this.passwordCollection.change(
                function() {
                    passwordEntered(this, instance);
                }
            );
            this.passwordRepeatCollection.change(
                function() {
                    passwordEntered(this, instance);
                }
            );
        };
    }
)(jQuery);
