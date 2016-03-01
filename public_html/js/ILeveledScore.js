var ILeveledScore;

ILeveledScore = function(scoreData) {
    this.setScoreData = function(scoreData) {};
    
    /*
     * add successful password attempt to score
     */
    this.addSuccessfulAttempt = function(dateOfAttempt) {};
    
    this.getFee = function(readDate) {};
    this.getScore = function(readDate) {};
    this.getLevel = function(readDate) {};
    
    this.getLockHoursLeft = function(readDate) {};
    this.getFeeHoursPassed = function(readDate) {};
    
    /*
     * score properties by current date/time
     */
    Object.defineProperties(
        this, 
        {
            "score": {},
            
            "fee": {},
            
            "lockHoursLeft": {},
            
            "feeHoursPassed": {},
            
            "lockHours": {},
            
            "feePerHour": {},
                        
            "level": {}
        }
    );
};
