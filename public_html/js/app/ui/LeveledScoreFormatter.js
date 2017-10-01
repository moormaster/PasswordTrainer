var LeveledScoreFormatter = (
    function() {
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
                string += (string.length>0?" ":"") + years + "y";

            if (days > 0)
                string += (string.length>0?" ":"") + days + "d";

            if (hours > 0)
                string += (string.length>0?" ":"") + hours + "h";

            if (minutes > 0)
                string += (string.length>0?" ":"") + minutes + "m";

            if (seconds > 0 || string.length == 0)
                string += (string.length>0?" ":"") + seconds + "s";

            return string;
        };
        
        class LeveledScoreFormatter extends ILeveledScoreFormatter {
            constructor() {
                super();
            }

            /*
             * returns a formatted string describing the status of the leveled score
             * (locked time, fee amount)
             */
            formatStatus(leveledScore) {
                if (leveledScore.fee)
                    return this.formatFee(leveledScore) + " fee";

                if (leveledScore.lockHoursLeft)
                    return "locked for " + formatTime(leveledScore.lockHoursLeft*60*60*1000);
            }

            /*
             * returns a formatted string describing score and level
             */
            formatLeveledScore(leveledScore) {
                return "Score " + this.formatScore(leveledScore) + " / Level " + this.formatLevel(leveledScore);
            }

            /*
             * returns a formatted string describing the score points
             */
            formatScore(leveledScore) {
                return Math.round(leveledScore.score*100)/100;
            }

            /*
             * returns a formatted string describing the fee points
             */
            formatFee(leveledScore) {
                return Math.round(leveledScore.fee*100)/100;
            }

            /*
             * returns a formatted string describing the level
             */
            formatLevel(leveledScore) {
                return leveledScore.level;
            }
        };

        return LeveledScoreFormatter;
    }
)();

