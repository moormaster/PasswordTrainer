class ILeveledScore {
    constructor(scoreData) {
        this.scoreData = null;
    }
    
    setScoreData(scoreData) {}
    
    /*
     * add successful password attempt to score
     */
    addSuccessfulAttempt(dateOfAttempt) {}
    
    getFee(readDate) {}
    getScore(readDate) {}
    getLevel(readDate) {}
    
    getLockHoursLeft(readDate) {}
    getFeeHoursPassed(readDate) {}

    /*
     * score properties by current date/time
     */
    get score() {}
    get fee() {}
    get lockHoursLeft() {}
    get feeHoursPassed() {}
    get lockHours() {}
    get feePerHour() {}
    get level() {}
};

if (typeof exports == "object")
    exports.ILeveledScore = ILeveledScore;
