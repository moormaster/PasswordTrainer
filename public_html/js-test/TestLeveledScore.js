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
            
            var getScoreFixture = function(attemptsCount, lastAttemptFeeHours) {
                if (!lastAttemptFeeHours)
                    lastAttemptFeeHours = 0;
                
                var score = new LeveledScore();
                
                for (var i=0; i<attemptsCount-1; i++)
                    addAttempt(score);
                
                if (attemptsCount > 0)
                    addAttempt(score, lastAttemptFeeHours);

                return score;
            }
            
            this.assertNumEqual = function(assert, actual, expected, diff, message) {
                if (Math.abs(actual - expected) <= diff)
                    assert.ok(true, message);
                else
                    assert.equal(actual, expected, message);
                
            };
            
            this.scores = [];
            this.scoresWithOneHourFee = [];
            
            for (var i=0; i<5;i++) {
                this.scores[i] = getScoreFixture(i);
                this.scoresWithOneHourFee[i] = getScoreFixture(i, 1);
            }
        }
    }
)

QUnit.test(
    "LevelScore.getScore()", 
    function(assert) {
        assert.equal(
            this.scores[0].getScore(this.scores[0].scoreData.lastSuccessTimestamp),                     
            0, "should be 0 initialy");
        
        for (var i=1; i<this.scores.length; i++)
            assert.equal(
                this.scores[i].getScore(this.scores[i].scoreData.lastSuccessTimestamp),       
                i, "should be " + i + " after " + i + " attempt(s)"
            );
    }
);

QUnit.test(
    "LevelScore.getFee()", 
    function(assert) {
        var expectedFee = [0, 1/2.0, 1/3.0, 1/5.0, 1/5.0];
        var fee1AfterHours = [0, 2, 3, 5, 5];
        var score0AfterHours = [0, 2*1, 3*2, 5*3, 5*4];
        
        for (var i=0; i<this.scores.length; i++) {
            this.assertNumEqual(assert,
                this.scores[i].getFee(
                    this.scores[i].scoreData.lastSuccessTimestamp 
                    + (this.scores[i].lockHours)*60*60*1000
                ),
                0,
                0.001,
                "should be 0 after " + i + " attempt(s) with 0h fee time passed"
            );

            this.assertNumEqual(assert,
                this.scores[i].getFee(
                    this.scores[i].scoreData.lastSuccessTimestamp 
                    + (this.scores[i].lockHours+1)*60*60*1000
                ),
                Math.min(i, expectedFee[i]),
                0.001,
                "should be " + Math.min(i, expectedFee[i]) + " after " + i + " attempt(s) with 1h fee time passed"
            );

            this.assertNumEqual(assert,
                this.scores[i].getFee(
                    this.scores[i].scoreData.lastSuccessTimestamp 
                    + (this.scores[i].lockHours+fee1AfterHours[i])*60*60*1000
                ),
                Math.min(i, fee1AfterHours[i]*expectedFee[i]),
                0.001,
                "should be " + Math.min(i, fee1AfterHours[i]*expectedFee[i]) + " after " + i + " attempt(s) with " + fee1AfterHours[i] + "h fee time passed"
            );

            if (i>0)
                this.assertNumEqual(assert,
                    this.scores[i].getFee(
                        this.scores[i].scoreData.lastSuccessTimestamp 
                        + (this.scores[i].lockHours+score0AfterHours[i])*60*60*1000
                    ),
                    Math.min(i, score0AfterHours[i]*expectedFee[i]),
                    0.001,
                    "should be " + Math.min(i, score0AfterHours[i]*expectedFee[i]) + " after " + i + " attempt(s) with " + score0AfterHours[i] + "h fee time passed"
                );

        }
    }
);

QUnit.test(
    "LevelScore.getLevel()", 
    function(assert) {
        assert.equal(
            this.scores[0].getLevel(this.scores[0].scoreData.lastSuccessTimestamp),    
            1, "should be 1 initialy"
        );
        
        var expectedLevel = [1, 2, 3, 4, 4];
        
        for (var i=1; i<this.scores.length; i++)
            assert.equal(this.scores[i].getLevel(
                this.scores[i].scoreData.lastSuccessTimestamp),                                
                expectedLevel[i], "should be " + expectedLevel[i] + " for less than " + (i+1) + " attempt(s)"
            );
    }
);

QUnit.test(
    "LevelScore.lockHours", 
    function(assert) {
        var expectedLockHours = [0, 1, 2, 3, 3];
        var level = [1, 2, 3, 4, 4];
        
        for (var i=0; i<this.scores.length; i++)
            assert.equal(this.scores[i].lockHours, expectedLockHours[i], "should be " + expectedLockHours[i] + " in level " + level[i]);
    }
);

QUnit.test(
    "LevelScore.feePerHour", 
    function(assert) {
        var expectedFeePerHour = [0, 1/2.0, 1/3.0, 1/5.0, 1/5.0];
        var level = [1, 2, 3, 4, 4];

        for (var i=0; i<this.scores.length; i++)
            assert.equal(this.scores[i].feePerHour, expectedFeePerHour[i], "should be " + expectedFeePerHour[i] + " in level " + level[i]);
    }
);


QUnit.test(
    "LevelScore.addSuccessfulAttempt()", 
    function(assert) {
        var score = new LeveledScore();
        
        assert.ok(score.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00)),        
                "first attempt should be possible");
        assert.equal(score.getScore(new Date(1970, 1, 1, 10, 00)),                                              
            1,  "score should be 1 after first attempt");
        
        assert.notOk(score.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 59)),     
                "second attempt should fail due to lock time");
        assert.ok(score.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00)),        
                "second attempt should be possible after lock time");
        assert.equal(score.getScore(new Date(1970, 1, 1, 11, 00)),                                              
            2,  "score should be 2 after second attempt");
        
        assert.notOk(score.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 59)),     
                "third attempt should fail due to lock time");
        assert.notOk(score.addSuccessfulAttempt(new Date(1970, 1, 1, 12, 59)),     
                "third attempt should fail due to lock time");
        assert.ok(score.addSuccessfulAttempt(new Date(1970, 1, 1, 13, 0)),         
                "third attempt should be possible after increased lock time");
        assert.equal(score.getScore(new Date(1970, 1, 1, 13, 0)),                                              
            3,  "score should be 3 after third attempt");
    }
);

QUnit.test(
    "LevelScore.addSuccessfulAttempt() with one fee hour", 
    function(assert) {
        var expectedScore = [0, 1, 2 - 1/2.0, 3 - 1/3.0, 4 - 1/5.0]
        
        for (var i=0; i<this.scoresWithOneHourFee.length; i++)
            this.assertNumEqual(
                assert,
                this.scoresWithOneHourFee[i].getScore(this.scoresWithOneHourFee[i].scoreData.lastSuccessTimestamp),
                expectedScore[i],  
                0.001,
                "score should be " + expectedScore[i] + " after " + i + " attempt(s)"
            );
    }
);

