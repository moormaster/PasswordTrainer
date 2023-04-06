var LeveledScore = (
    function() {
        var fib = function(i) {
            if (i==0)
                return 0;

            if (i==1)
                return 1;

            var a = 0;
            var b = 1;
            var fib_k = 1;

            for (var k=2; k<i; k++) {
                a = b;
                b = fib_k;
                fib_k = a + b;
            }

            return fib_k;
        };

        var fibinv = function(n) {
            if (n == 0)
                return 0;

            var k = 2;

            var a = 0;
            var b = 1;
            var fib_k = 1;

            while (fib_k <= n) {
                a = b;
                b = fib_k;

                fib_k = a + b;
                k++;
            }

            return k-1;
        };

        var getLevel = function(score) {
            if (score < 1 )
                return 1;

            return fibinv(score);
        };

        var getLockHours = function(level) {
            if (level <= 1)
                return 0;

            return fib(level);
        };

        var getFeePerHour = function(level) {
            if (level <= 1)
                return 0;

            return 1 / fib(level+1);
        };

        var getLockHoursLeft = function(level, lastSuccessDate, readDate) {
            var lockHours = getLockHours(level);

            if (!lastSuccessDate)
                return 0;

            var lockHoursLeft = lockHours - (readDate - lastSuccessDate)/(1000*60*60);
            if (!lockHoursLeft || lockHoursLeft < 0)
                lockHoursLeft = 0;

            return lockHoursLeft;
        };

        var getFeeHoursPassed = function(level, lastSuccessDate, readDate) {
            var lockHours = getLockHours(level);

            if (!lastSuccessDate)
                return 0;

            var feeHoursPassed = (readDate - lastSuccessDate)/(1000*60*60) - lockHours;
            if (!feeHoursPassed || feeHoursPassed < 0)
                feeHoursPassed = 0;

            return feeHoursPassed;
        };

        class LeveledScore {
            constructor(scoreData) {
                this.setScoreData(scoreData);
            }

            setScoreData(scoreData) {
                this.scoreData = scoreData;

                if (this.scoreData == null) {
                    this.scoreData = {
                        lastSuccessScore:   null,
                        lastSuccessTimestamp:  null
                    };
                }
            }

            /*
             * add successful password attempt to score
             */
            addSuccessfulAttempt(dateOfAttempt) {
                if (dateOfAttempt == null)
                    dateOfAttempt = new Date().getTime();

                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
                var lockHoursLeft = getLockHoursLeft(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, dateOfAttempt);

                if (lockHoursLeft > 0)
                    return false;

                var lastScore = this.getScore(dateOfAttempt);

                this.scoreData.lastSuccessScore = lastScore+1;
                this.scoreData.lastSuccessTimestamp = dateOfAttempt;

                return true;
            }

            getFee(readDate) {
                if (this.scoreData.lastSuccessTimestamp == null)
                    return 0;

                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
                var feeHoursPassed = Math.floor(getFeeHoursPassed(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate));

                var fee = feeHoursPassed*this.feePerHour;

                if (fee > this.scoreData.lastSuccessScore)
                    return this.scoreData.lastSuccessScore;

                return fee;
            }

            getScore(readDate) {
                if (this.scoreData.lastSuccessTimestamp == null)
                    return 0;

                return this.scoreData.lastSuccessScore - this.getFee(readDate);
            }

            getLevel(readDate) {
                return getLevel(this.getScore(readDate));
            }

            getLockHoursLeft(readDate) {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getLockHoursLeft(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate);
            }

            getFeeHoursPassed(readDate) {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getFeeHoursPassed(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate);
            }

            /*
             * score properties by current date/time
             */
            get score() {
                return this.getScore(new Date());
            }

            get fee() {
                return this.getFee(new Date());
            }

            get lockHoursLeft() {
                return this.getLockHoursLeft(new Date());
            }

            get feeHoursPassed() {
                return this.getFeeHoursPassed(new Date());
            }

            get lockHours() {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getLockHours(lastSuccessLevel);
            }

            get feePerHour() {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getFeePerHour(lastSuccessLevel);
            }

            get level() {
                return this.getLevel(new Date());
            }
        };
        
        return LeveledScore;
    }
)();

if (typeof exports == "object")
    exports.LeveledScore = LeveledScore;
