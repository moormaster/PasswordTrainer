/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ScoreDataFeeHoursAndLockHoursComparator;

ScoreDataFeeHoursAndLockHoursComparator = function() {
    this.prototype = new IComparator();
    
    this.compare = function(obj1, obj2) {
        if (obj1 == null)
            return -1;
        
        if (obj2 == null)
            return 1;
        
        var leveledScore1 = new LeveledScore();
        var leveledScore2 = new LeveledScore();
        
        // TODO: check why passing obj1 / obj2 to constructor does not work?!
        leveledScore1.setScoreData(obj1);
        leveledScore2.setScoreData(obj2);
        
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
