if (typeof require == "function") {
    IComparator = require('./IComparator.js').IComparator;
    LeveledScore = require('../model/LeveledScore.js').LeveledScore;
}

class ScoreDataFeeHoursAndLockHoursComparator extends IComparator {
    constructor() {
        super();
    }
    
    compare(obj1, obj2) {
        if (obj1 == null)
            return -1;
        
        if (obj2 == null)
            return 1;
        
        var leveledScore1 = new LeveledScore(obj1);
        var leveledScore2 = new LeveledScore(obj2);
        
        // maximum fee hours first
        if (leveledScore1.feeHoursPassed > leveledScore2.feeHoursPassed)
            return -1;

        if (leveledScore1.feeHoursPassed < leveledScore2.feeHoursPassed)
            return 1;

        // minimum lock hours first
        if (leveledScore1.lockHoursLeft < leveledScore2.lockHoursLeft)
            return -1;

        if (leveledScore1.lockHoursLeft > leveledScore2.lockHoursLeft)
            return 1;

        return 0;
    }
};

if (typeof exports == "object")
    exports.ScoreDataFeeHoursAndLockHoursComparator = ScoreDataFeeHoursAndLockHoursComparator;
