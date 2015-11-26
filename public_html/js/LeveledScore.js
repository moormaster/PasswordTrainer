function LeveledScore(data) {
    this.reset = function(data) {
        this.data = data
        
        if (this.data == null) {
            this.data = {
                lastSuccessScore:   null,
                lastSuccessTimestamp:  null
            };
        }
    };
        
    this.addSuccessfulAttempt = function(dateOfAttempt) {
        if (dateOfAttempt == null)
            dateOfAttempt = new Date();

        var lastSuccessLevel = getLevel(this.data.lastSuccessScore);
        var lockHoursLeft = getLockHoursLeft(lastSuccessLevel, this.data.lastSuccessTimestamp, dateOfAttempt);
        
        if (lockHoursLeft > 0)
            return false;
        
        var lastScore = this.getScore(dateOfAttempt);
        
        this.data.lastSuccessScore = lastScore+1;
        this.data.lastSuccessTimestamp = dateOfAttempt.getTime();
        
        return true;
    };
    
    this.getFee = function(readDate) {
        if (this.data.lastSuccessTimestamp == null)
            return 0;

        var lastSuccessLevel = getLevel(this.data.lastSuccessScore);
        var feeHoursPassed = Math.floor(getFeeHoursPassed(lastSuccessLevel, this.data.lastSuccessTimestamp, readDate));
        
        var fee = feeHoursPassed*this.feePerHour;
        
        if (fee > this.data.lastSuccessScore)
            return this.data.lastSuccessScore;
        
        return fee;
    };
    
    this.getScore = function(readDate) {
        if (this.data.lastSuccessTimestamp == null)
            return 0;
        
        return this.data.lastSuccessScore - this.getFee(readDate);
    };
    
    this.getLevel = function(readDate) {
        return getLevel(this.getScore(readDate));
    };
    
    this.getLockHoursLeft = function(readDate) {
        var lastSuccessLevel = getLevel(this.data.lastSuccessScore);
        
        return getLockHoursLeft(lastSuccessLevel, this.data.lastSuccessTimestamp, readDate);
    };
    
    this.getFeeHoursPassed = function(readDate) {
        var lastSuccessLevel = getLevel(this.data.lastSuccessScore);
        
        return getFeeHoursPassed(lastSuccessLevel, this.data.lastSuccessTimestamp, readDate);
    };
    
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
    
    Object.defineProperties(
        this, 
        {
            "score": {
                get:    function() {
                            return this.getScore(new Date());
                        }
            },
            
            "fee": {
                get:    function() {
                            return this.getFee(new Date());
                        }
            },
            
            "lockHoursLeft": {
                get:    function() {
                            return this.getLockHoursLeft(new Date());
                        }
            },
            
            "feeHoursPassed": {
                get:    function() {
                            return this.getFeeHoursPassed(new Date());
                        }
            },
            
            "lockHours": {
                get:    function() {
                            var lastSuccessLevel = getLevel(this.data.lastSuccessScore);

                            return getLockHours(lastSuccessLevel);
                        }
            },
            
            "feePerHour": {
                get:    function() {
                            var lastSuccessLevel = getLevel(this.data.lastSuccessScore);

                            return getFeePerHour(lastSuccessLevel);
                        }
            },
                        
            "level": {
                get:    function() {
                            return this.getLevel(new Date());
                }
            }
        }
    );

    this.reset(data);
}
