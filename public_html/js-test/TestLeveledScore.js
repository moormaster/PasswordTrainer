/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

QUnit.module(
    "LevelScore",
    {
        beforeEach: function() {
            var addAttempt = function(leveledScore) {
                var h = leveledScore.lockHoursLeft;
                var d = leveledScore.lastSuccessTimestamp;
                
                if (d == null)
                    d = new Date(1970, 1, 1, 10, 00);
                
                leveledScore.setScoreDate(new Date(d.getTime() + 1000*60*60*h));
                
                return leveledScore.addSuccessfulAttempt();
            }
            
            this.score = new LeveledScore();
            
            this.scoreWithOneAttempt = new LeveledScore();
            addAttempt(this.scoreWithOneAttempt);

            this.scoreWithTwoAttempts = new LeveledScore();
            addAttempt(this.scoreWithTwoAttempts);
            addAttempt(this.scoreWithTwoAttempts);

            this.scoreWithThreeAttempts = new LeveledScore();
            addAttempt(this.scoreWithThreeAttempts);
            addAttempt(this.scoreWithThreeAttempts);
            addAttempt(this.scoreWithThreeAttempts);

            this.scoreWithFourAttempts = new LeveledScore();
            addAttempt(this.scoreWithFourAttempts);
            addAttempt(this.scoreWithFourAttempts);
            addAttempt(this.scoreWithFourAttempts);
            addAttempt(this.scoreWithFourAttempts);
        }
    }
)

QUnit.test(
    "LevelScore.score", 
    function(assert) {
        assert.equal(this.score.score, 0, "should be 0 initialy");
        assert.equal(this.scoreWithOneAttempt.score, 1, "should be 1 after 1 attempt");
        assert.equal(this.scoreWithTwoAttempts.score, 2, "should be 2 after 2 attempts");
        assert.equal(this.scoreWithThreeAttempts.score, 3, "should be 3 after 3 attempts");
        assert.equal(this.scoreWithFourAttempts.score, 4, "should be 4 after 4 attempts");
    }
);

QUnit.test(
    "LevelScore.level", 
    function(assert) {
        assert.equal(this.score.level, 1, "should be 1 initialy");
        assert.equal(this.scoreWithOneAttempt.level, 2, "should be 2 for less than 2 attempts");
        assert.equal(this.scoreWithTwoAttempts.level, 3, "should be 3 for less than 3 attempts");
        assert.equal(this.scoreWithThreeAttempts.level, 4, "should be 4 for less than 5 attempts");
        assert.equal(this.scoreWithFourAttempts.level, 4, "should be 4 for less than 5 attempts");
    }
);

QUnit.test(
    "LevelScore.lockHours", 
    function(assert) {
        assert.equal(this.score.lockHours, 0, "should be 0 in level 1");
        assert.equal(this.scoreWithOneAttempt.lockHours, 1, "should be 1 in level 2");
        assert.equal(this.scoreWithTwoAttempts.lockHours, 2, "should be 2 in level 3");
        assert.equal(this.scoreWithThreeAttempts.lockHours, 3, "should be 3 in level 4");
        assert.equal(this.scoreWithFourAttempts.lockHours, 3, "should be 3 in level 4");
    }
);

QUnit.test(
    "LevelScore.feePerHour", 
    function(assert) {
        assert.equal(this.score.feePerHour, 0, "should be 0 in level 1");
        assert.equal(this.scoreWithOneAttempt.feePerHour, 1.0/2, "should be 1/2 in level 2");
        assert.equal(this.scoreWithTwoAttempts.feePerHour, 1.0/3, "should be 1/3 in level 3");
        assert.equal(this.scoreWithThreeAttempts.feePerHour, 1.0/5, "shuld be 1/5 in level 4");
        assert.equal(this.scoreWithFourAttempts.feePerHour, 1.0/5, "shuld be 1/5 in level 4");
    }
);


QUnit.test(
    "LevelScore.addSuccessfulAttempt", 
    function(assert) {
        this.score.setScoreDate(new Date(1970, 1, 1, 10, 00));

        assert.ok(this.score.addSuccessfulAttempt(), "first attempt should be possible");
        
        assert.notOk(this.score.addSuccessfulAttempt(), "second attempt should fail due to lock time");
        this.score.setScoreDate(new Date(1970, 1, 1, 11, 0))
        assert.ok(this.score.addSuccessfulAttempt(), "second attempt should be possible after lock time");
        
        assert.notOk(this.score.addSuccessfulAttempt(), "third attempt should fail due to lock time");
        this.score.setScoreDate(new Date(1970, 1, 1, 12, 0))
        assert.notOk(this.score.addSuccessfulAttempt(), "third attempt should fail due to lock time");
        this.score.setScoreDate(new Date(1970, 1, 1, 13, 0))
        assert.ok(this.score.addSuccessfulAttempt(), "third attempt should be possible after increased lock time");
    }
);


