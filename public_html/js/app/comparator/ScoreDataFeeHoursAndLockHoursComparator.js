// vi: ts=4 et

if (typeof require == "function")
    LeveledScore = require('../model/LeveledScore.js').LeveledScore;

class ScoreDataFeeHoursAndLockHoursComparator {
    constructor() {
    }
    
    /*
     * compares obj1 to obj2
     * 
     * returns
     *      -1 if obj1 is null or obj1 < obj2
     *      0  if obj1 is equally to obj2
     *      1  if obj1 > obj2 or obj2 is null
     */
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
