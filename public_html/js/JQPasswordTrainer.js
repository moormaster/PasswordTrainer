/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        $.fn.JQPasswordTrainer = function() {
            this.each(
                function() {
                    var passwordTrainerElem = this;
                    
                    passwordTrainerElem.passwordTrainer_Create = function() {
                        if (!this._password) {
                            var input = $(this).children("input:first");

                            this._password = input.val();
                            input.addClass("bg_anim_neutral")
                            input.addClass("bg_anim_yellow");
                        }

                        if (!this._LearningScore)
                            this._LearningScore = new LearningScore();


                        this.passwordTrainer_Submit(this);
                    };
                    
                    passwordTrainerElem.passwordTrainer_Submit = function(ignoreFailure) {
                        if (ignoreFailure == null)
                            ignoreFailure = false;


                        if (this._LearningScore == null)
                            return;

                        var input = $(this).children("input:first");

                        if (input.val() == "")
                            return;

                        var success = (input.val() == this._password);

                        if (ignoreFailure && !success)
                            return;

                        this._LearningScore.addAttempt(success);

                        if (this._LearningScore.attemptCount > 1) {
                            var bg_anim_class = success?"bg_anim_green":"bg_anim_red";

                            input.removeClass("bg_anim_red");
                            input.removeClass("bg_anim_green");
                            input.removeClass("bg_anim_yellow");

                            input.addClass(bg_anim_class);
                        }

                        input.val("");

                    };
                    
                    passwordTrainerElem.passwordTrainer_Refresh = function() {
                        if (this._LearningScore == null)
                            return;

                        $(this).children(".passwordscore").text((this._LearningScore.getScoreToday()*100).toFixed(2));
                    };
                    
                    $(this).children("input").each(
                        function () {
                            this.passwordTrainer = passwordTrainerElem;
                        }
                    );
                }
            );
            
            this.children("input").change(
                function() {
                    this.passwordTrainer.passwordTrainer_Create();
                    this.passwordTrainer.passwordTrainer_Submit();
                }
            )
        
            this.children("input").keyup(
                function() {
                    this.passwordTrainer.passwordTrainer_Submit(true);
                }
            );
        };

    }
)(jQuery);