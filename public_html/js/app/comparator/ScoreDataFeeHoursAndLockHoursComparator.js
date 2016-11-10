/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
