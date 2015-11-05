/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

QUnit.module(
    "LevelScore",
    {
        beforeEach: function() {
            var addAttempt = function(leveledScore, feeHours) {
                if (!feeHours)
                    feeHours = 0;
                
                var d = leveledScore.lastSuccessTimestamp;
                if (d == null)
                    d = new Date(1970, 1, 1, 10, 00);

                var h = leveledScore.getLockHoursLeft(d) + feeHours;
                
                
                return leveledScore.addSuccessfulAttempt(new Date(d.getTime() + 1000*60*60*h));
            }
            
            this.assertNumEqual = function(assert, actual, expected, diff, message) {
                if (Math.abs(actual - expected) <= diff)
                    assert.ok(true, message);
                else
                    assert.equal(actual, expected, message);
                
            };
            
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
            
            this.scoreWithOneAttemptAndOneHourFee = new LeveledScore();
            addAttempt(this.scoreWithOneAttemptAndOneHourFee, 1);

            this.scoreWithTwoAttemptsAndOneHourFee = new LeveledScore();
            addAttempt(this.scoreWithTwoAttemptsAndOneHourFee);
            addAttempt(this.scoreWithTwoAttemptsAndOneHourFee, 1);

            this.scoreWithThreeAttemptsAndOneHourFee = new LeveledScore();
            addAttempt(this.scoreWithThreeAttemptsAndOneHourFee);
            addAttempt(this.scoreWithThreeAttemptsAndOneHourFee);
            addAttempt(this.scoreWithThreeAttemptsAndOneHourFee, 1);

            this.scoreWithFourAttemptsAndOneHourFee = new LeveledScore();
            addAttempt(this.scoreWithFourAttemptsAndOneHourFee);
            addAttempt(this.scoreWithFourAttemptsAndOneHourFee);
            addAttempt(this.scoreWithFourAttemptsAndOneHourFee);
            addAttempt(this.scoreWithFourAttemptsAndOneHourFee, 1);
        }
    }
)

QUnit.test(
    "LevelScore.getScore()", 
    function(assert) {
        assert.equal(
            this.score.getScore(this.score.data.lastSuccessTimestamp),                     
            0, "should be 0 initialy");
        assert.equal(
            this.scoreWithOneAttempt.getScore(this.scoreWithOneAttempt.data.lastSuccessTimestamp),       
            1, "should be 1 after 1 attempt");
        assert.equal(
            this.scoreWithTwoAttempts.getScore(this.scoreWithTwoAttempts.data.lastSuccessTimestamp),      
            2, "should be 2 after 2 attempts");
        assert.equal(
            this.scoreWithThreeAttempts.getScore(this.scoreWithThreeAttempts.data.lastSuccessTimestamp),    
            3, "should be 3 after 3 attempts");
        assert.equal(
            this.scoreWithFourAttempts.getScore(this.scoreWithFourAttempts.data.lastSuccessTimestamp),     
            4, "should be 4 after 4 attempts");
    }
);

QUnit.test(
    "LevelScore.getFee()", 
    function(assert) {
        assert.equal(
            this.score.getFee(this.score.data.lastSuccessTimestamp),                     
            0, "should be 0 initialy with no fee time");
        assert.equal(
            this.scoreWithOneAttempt.getFee(this.scoreWithOneAttempt.data.lastSuccessTimestamp),       
            0, "should be 0 after 1 attempt with no fee time");
        assert.equal(
            this.scoreWithTwoAttempts.getFee(this.scoreWithTwoAttempts.data.lastSuccessTimestamp),      
            0, "should be 0 after 2 attempts with no fee time");
        assert.equal(
            this.scoreWithThreeAttempts.getFee(this.scoreWithThreeAttempts.data.lastSuccessTimestamp),    
            0, "should be 0 after 3 attempts with no fee time");
        assert.equal(
            this.scoreWithFourAttempts.getFee(this.scoreWithFourAttempts.data.lastSuccessTimestamp),     
            0, "should be 0 after 4 attempts with no fee time");
            
        this.assertNumEqual(assert,
            this.scoreWithOneAttempt.getFee(
                this.scoreWithOneAttempt.data.lastSuccessTimestamp 
                + (this.scoreWithOneAttempt.lockHours+1)*60*60*1000
            ),
            1/2.0,
            0.001,
            "should be 1/2 after 1 attempt with 1h fee time");
        this.assertNumEqual(assert,
            this.scoreWithTwoAttempts.getFee(
                this.scoreWithTwoAttempts.data.lastSuccessTimestamp 
                + (this.scoreWithTwoAttempts.lockHours+1)*60*60*1000
            ),
            1/3.0,
            0.001,
            "should be 1/3 after 2 attempts with 1h fee time");
        this.assertNumEqual(assert,
            this.scoreWithThreeAttempts.getFee(
                this.scoreWithThreeAttempts.data.lastSuccessTimestamp 
                + (this.scoreWithThreeAttempts.lockHours+1)*60*60*1000
            ),
            1/5.0,
            0.001,
            "should be 1/5 after 3 attempts with 1h fee time");
        this.assertNumEqual(assert,
            this.scoreWithFourAttempts.getFee(
                this.scoreWithFourAttempts.data.lastSuccessTimestamp 
                + (this.scoreWithFourAttempts.lockHours+1)*60*60*1000
            ),
            1/5.0,
            0.001,
            "should be 1/5 after 4 attempts with 1h fee time");
    }
);

QUnit.test(
    "LevelScore.getLevel()", 
    function(assert) {
        assert.equal(
            this.score.getLevel(this.score.data.lastSuccessTimestamp),    
            1, "should be 1 initialy");
        assert.equal(this.scoreWithOneAttempt.getLevel(
            this.scoreWithOneAttempt.data.lastSuccessTimestamp),                                
            2, "should be 2 for less than 2 attempts");
        assert.equal(this.scoreWithTwoAttempts.getLevel(
            this.scoreWithTwoAttempts.data.lastSuccessTimestamp),                               
            3, "should be 3 for less than 3 attempts");
        assert.equal(this.scoreWithThreeAttempts.getLevel(
            this.scoreWithThreeAttempts.data.lastSuccessTimestamp),                             
            4, "should be 4 for less than 5 attempts");
        assert.equal(this.scoreWithFourAttempts.getLevel(
            this.scoreWithFourAttempts.data.lastSuccessTimestamp),                              
            4, "should be 4 for less than 5 attempts");
    }
);

QUnit.test(
    "LevelScore.lockHours", 
    function(assert) {
        assert.equal(this.score.lockHours,                  0, "should be 0 in level 1");
        assert.equal(this.scoreWithOneAttempt.lockHours,    1, "should be 1 in level 2");
        assert.equal(this.scoreWithTwoAttempts.lockHours,   2, "should be 2 in level 3");
        assert.equal(this.scoreWithThreeAttempts.lockHours, 3, "should be 3 in level 4");
        assert.equal(this.scoreWithFourAttempts.lockHours,  3, "should be 3 in level 4");
    }
);

QUnit.test(
    "LevelScore.feePerHour", 
    function(assert) {
        assert.equal(this.score.feePerHour,                     0, "should be 0 in level 1");
        assert.equal(this.scoreWithOneAttempt.feePerHour,       1.0/2, "should be 1/2 in level 2");
        assert.equal(this.scoreWithTwoAttempts.feePerHour,      1.0/3, "should be 1/3 in level 3");
        assert.equal(this.scoreWithThreeAttempts.feePerHour,    1.0/5, "should be 1/5 in level 4");
        assert.equal(this.scoreWithFourAttempts.feePerHour,     1.0/5, "should be 1/5 in level 4");
    }
);


QUnit.test(
    "LevelScore.addSuccessfulAttempt()", 
    function(assert) {
        assert.ok(this.score.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00)),        
                "first attempt should be possible");
        assert.equal(this.score.getScore(new Date(1970, 1, 1, 10, 00)),                                              
            1,  "score should be 1 after first attempt")
        
        assert.notOk(this.score.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 59)),     
                "second attempt should fail due to lock time");
        assert.ok(this.score.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00)),        
                "second attempt should be possible after lock time");
        assert.equal(this.score.getScore(new Date(1970, 1, 1, 11, 00)),                                              
            2,  "score should be 2 after second attempt")
        
        assert.notOk(this.score.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 59)),     
                "third attempt should fail due to lock time");
        assert.notOk(this.score.addSuccessfulAttempt(new Date(1970, 1, 1, 12, 59)),     
                "third attempt should fail due to lock time");
        assert.ok(this.score.addSuccessfulAttempt(new Date(1970, 1, 1, 13, 0)),         
                "third attempt should be possible after increased lock time");
        assert.equal(this.score.getScore(new Date(1970, 1, 1, 13, 0)),                                              
            3,  "score should be 3 after third attempt")
    }
);

QUnit.test(
    "LevelScore.addSuccessfulAttempt() with one fee hour", 
    function(assert) {
        this.assertNumEqual(
            assert,
            this.scoreWithOneAttemptAndOneHourFee.getScore(this.scoreWithOneAttemptAndOneHourFee.data.lastSuccessTimestamp),
            1,  
            0.001,
            "score should be 1 after first attempt")
        
        this.assertNumEqual(
            assert,
            this.scoreWithTwoAttemptsAndOneHourFee.getScore(this.scoreWithTwoAttemptsAndOneHourFee.data.lastSuccessTimestamp),
            2 - 1.0/2,  
            0.001,
            "score should be 1.5 after second attempt and one hour fee time")
        
        this.assertNumEqual(
            assert,
            this.scoreWithThreeAttemptsAndOneHourFee.getScore(this.scoreWithThreeAttemptsAndOneHourFee.data.lastSuccessTimestamp),
            3 - 1.0/3,  
            0.001,
            "score should be 1.66 after third attempt")

        this.assertNumEqual(
            assert,
            this.scoreWithFourAttemptsAndOneHourFee.getScore(this.scoreWithFourAttemptsAndOneHourFee.data.lastSuccessTimestamp),
            4 - 1.0/5,  
            0.001,
            "score should be 1.80 after third attempt")
    }
);

