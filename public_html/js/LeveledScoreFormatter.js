/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var LeveledScoreFormatter;

LeveledScoreFormatter = function() {
    this.prototype = new ILeveledScoreFormatter();
    
    /*
     * returns a formatted string describing the status of the leveled score
     * (locked time, fee amount)
     */
    this.formatStatus = function(leveledScore) {
        if (leveledScore.fee)
            return this.formatFee(leveledScore) + " fee";

        if (leveledScore.lockHoursLeft)
            return "locked for " + formatTime(leveledScore.lockHoursLeft*60*60*1000);
    };
    
    
    /*
     * returns a formatted string describing score and level
     */
    this.formatLeveledScore = function(leveledScore) {
        return "Score " + this.formatScore(leveledScore) + " / Level " + this.formatLevel(leveledScore);
    };
    
    /*
     * returns a formatted string describing the score points
     */
    this.formatScore = function(leveledScore) {
        return Math.round(leveledScore.score*100)/100;
    };
    
    /*
     * returns a formatted string describing the fee points
     */
    this.formatFee = function(leveledScore) {
        return Math.round(leveledScore.fee*100)/100;
    };
    
    /*
     * returns a formatted string describing the level
     */
    this.formatLevel = function(leveledScore) {
        return leveledScore.level;
    };

    var formatTime = function(ms) {
        if (ms < 0)
            return "-" + formatTime(-ms);

        var years, days, hours, minutes, seconds;

        years = 0;
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;

        if (ms >= 1000*60*60*24*365) {
            years = Math.floor(ms / (1000*60*60*24*365));
            ms -= years * 1000*60*60*24*365;
        }

        if (ms >= 1000*60*60*24) {
            days = Math.floor(ms / (1000*60*60*24));
            ms -= days * 1000*60*60*24;        
        }

        if (ms >= 1000*60*60) {
            hours = Math.floor(ms / (1000*60*60));
            ms -= hours * 1000*60*60;
        }

        if (ms >= 1000*60) {
            minutes = Math.floor(ms / (1000*60));
            ms -= minutes * 1000*60;
        }

        if (ms >= 1000) {
            seconds = Math.floor(ms / 1000);
            ms -= seconds * 1000;
        }

        var string = "";

        if (years > 0)
            string += years + "y ";

        if (days > 0)
            string += days + "d ";

        if (hours > 0)
            string += hours + "h ";

        if (minutes > 0)
            string += minutes + "m ";

        string += seconds + "s";

        return string;
    };
}
