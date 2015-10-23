function LeveledScore() {
    this.scoreDate = null;    
    this.lastSuccessScore = null;
    this.lastSuccessTimestamp = null;

    this.reset = function() {
        this.lastSuccessScore = null;
        this.lastSuccessTimestamp = null;
    }
    
    this.addSuccessfulAttempt = function() {
        if (this.lockHoursLeft > 0)
            return false;

        d = this.scoreDate;
        
        if (d == null)
            d = new Date();
        
        this.lastSuccessScore = this.score+1;
        this.lastSuccessTimestamp = d;
        
        return true;
    }
    
    this.setScoreDate = function(d) {
        this.scoreDate = d;
    }
    
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
    }
    
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
    }
    
    Object.defineProperties(
        this, 
        {
            "score": {
                get:    function() {
                            if (this.lastSuccessTimestamp == null)
                                return 0;

                            if (this.feeHoursPassed == 0)
                                return this.lastSuccessScore;

                            return this.lastSuccessScore - Math.floor(this.feeHoursPassed)*this.feePerHour;
                        }
            },
            
            "lockHoursLeft": {
                get:    function() {
                    var d = this.scoreDate;
                    
                    if (d == null)
                        d = new Date();
                    
                    var lockHoursLeft = this.lockHours - (d - this.lastSuccessTimestamp)/(1000*60*60);
                    if (lockHoursLeft < 0)
                        lockHoursLeft = 0;
                    
                    return lockHoursLeft;
                }
            },
            
            "feeHoursPassed": {
                get:    function() {
                    var d = this.scoreDate;
                    
                    if (d == null)
                        d = new Date();
                    
                    var feeHoursPassed = (d - this.lastSuccessTimestamp)/(1000*60*60) - this.lockHours;
                    if (feeHoursPassed < 0)
                        feeHoursPassed = 0;
                    
                    return feeHoursPassed;
                }
            },
            
            "lockHours": {
                get:    function() {
                    if (this.lastSuccessLevel <= 1)
                        return 0;
                    
                    return fib(this.lastSuccessLevel);
                }
            },
            
            "feePerHour": {
                get:    function() {
                    if (this.lastSuccessLevel <= 1)
                        return 0;
                    
                    return 1 / fib(this.lastSuccessLevel+1);
                }
            },
            
            "lastSuccessLevel": {
                get:    function() {
                    if (this.lastSuccessScore < 1 )
                        return 1;
                    
                    return fibinv(this.lastSuccessScore);
                }
            },
            
            "level": {
                get:    function() {
                    var score = this.score;
                    
                    if (score < 1)
                        return 1;
                    
                    return fibinv(this.score);
                }
            }
        }
    );
}