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

            // app instance where this page is displayed in
            this.appInstance = app;

            /*
             * initialize jquery ui widgets
             */
            this.init = function() {
                var pageInstance = this;
                
                this.tableSelector = $('#pageManagePasswords .passwordTable');

                $('#pageManagePasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
            };

            /*
             * update page display
             */
            this.update = function() {
                updateTable(this.tableSelector, this.appInstance.passwordRegistrations);
            };

            var updateTable = function(tableSelector, passwordRegistrations) {
                var tableLineSkeleton = 
                        "<tr class=\"password\">\
                            <td class=\"passworddescription\"></td>\
                            <td>\
                                    <span class=\"passwordscore\"></span> / <span class=\"passwordlevel\"></span>\
                            </td>\
                            <td class=\"passwordstatus\"></td>\
                        </tr>";

                tableSelector.find('.password').remove();

                if (!passwordRegistrations)
                    return;

                var i=0;
                for (var desc in passwordRegistrations.collection) {
                    var passwordRegistration = passwordRegistrations.collection[desc];

                    var formatter = new LeveledScoreFormatter();
                    var leveledScore = new LeveledScore(passwordRegistration.scoreData);

                    tableSelector.JQPassword("init", {skeleton: tableLineSkeleton});
                    var passwordSelector = tableSelector.find('.password:last');
                    
                    passwordSelector.JQPassword("description", {value: desc});
                    passwordSelector.JQPassword("score", {value: formatter.formatScore(leveledScore)});
                    passwordSelector.JQPassword("level", {value: formatter.formatLevel(leveledScore)});
                    passwordSelector.JQPassword("status", {value: formatter.formatStatus(leveledScore)});
                }
            }
        };
    }
)(jQuery);