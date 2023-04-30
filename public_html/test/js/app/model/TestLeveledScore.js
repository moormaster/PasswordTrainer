// vi: ts=4 et

const assert = require('chai').assert;
const LeveledScore = require('../../../../js/app/model/LeveledScore.js').LeveledScore;

const numberOfScores = 5;

describe("LeveledScore", function () {
    beforeEach(function() {
        var addAttempt = function(leveledScore, feeHours) {
            if (!feeHours)
                feeHours = 0;

            var d = leveledScore.scoreData.lastSuccessTimestamp;
            if (d == null)
                d = new Date(1970, 1, 1, 10, 00).getTime();

            var h = leveledScore.getLockHoursLeft(d) + feeHours;

            return leveledScore.addSuccessfulAttempt(d + 1000*60*60*h);
        };

        this.addAttempts = function(leveledScore, numberOfAttempts) {
            for (var i=0; i<numberOfAttempts; i++)
                addAttempt(leveledScore);
        }
        
        this.addAttemptWithFeeTime = function(leveledScore, feeHours) {
            addAttempt(leveledScore, feeHours);
        }

        this.assertNumEqual = function(actual, expected, diff) {
            if (Math.abs(actual - expected) <= diff)
                assert.isOk(true);
            else
                assert.equal(actual, expected);

        };
        
        this.leveledScore = new LeveledScore();
    });

    it("should be 0 initially", function() {
        assert.equal(
            this.leveledScore.getScore(this.leveledScore.scoreData.lastSuccessTimestamp),
            0);
    });

    [   { expectedScore: 1, afterNumberOfAttempts: 1 },
        { expectedScore: 2, afterNumberOfAttempts: 2 },
        { expectedScore: 3, afterNumberOfAttempts: 3 },
        { expectedScore: 4, afterNumberOfAttempts: 4 }
    ].forEach(
        ({expectedScore, afterNumberOfAttempts}) => {
        it("should be " + expectedScore + " after " + afterNumberOfAttempts + " attempt(s)", function() {
            this.addAttempts(this.leveledScore, afterNumberOfAttempts);

            assert.equal(
                this.leveledScore.getScore(this.leveledScore.scoreData.lastSuccessTimestamp),
                expectedScore);
        });
    });

    describe("LevelScore.getFee()", function() {
        [   {expectedFeePerHour: 0,        afterHoursPassed: 0, scoreReachesZeroAfterHours: 0,     afterNumberOfAttempts: 0},
            {expectedFeePerHour: 1/2.0,    afterHoursPassed: 2, scoreReachesZeroAfterHours: 2*1,   afterNumberOfAttempts: 1},
            {expectedFeePerHour: 1/3.0,    afterHoursPassed: 3, scoreReachesZeroAfterHours: 3*2,   afterNumberOfAttempts: 2},
            {expectedFeePerHour: 1/5.0,    afterHoursPassed: 5, scoreReachesZeroAfterHours: 5*3,   afterNumberOfAttempts: 3},
            {expectedFeePerHour: 1/5.0,    afterHoursPassed: 5, scoreReachesZeroAfterHours: 5*4,   afterNumberOfAttempts: 4}
        ].forEach(
            ({expectedFeePerHour, afterHoursPassed, scoreReachesZeroAfterHours, afterNumberOfAttempts}) => {
                it("should be 0 after " + afterNumberOfAttempts + " attempt(s) with 0h fee time passed", function() {
                    this.addAttempts(this.leveledScore, afterNumberOfAttempts);

                    this.assertNumEqual(
                        this.leveledScore.getFee(
                            this.leveledScore.scoreData.lastSuccessTimestamp 
                            + (this.leveledScore.lockHours)*60*60*1000
                        ),
                        0,
                        0.001
                    );
                });

                it("should be " + expectedFeePerHour + " after " + afterNumberOfAttempts + " attempt(s) with 1h fee time passed", function() {
                    this.addAttempts(this.leveledScore, afterNumberOfAttempts);
                    
                    this.assertNumEqual(
                        this.leveledScore.getFee(
                            this.leveledScore.scoreData.lastSuccessTimestamp 
                            + (this.leveledScore.lockHours+1)*60*60*1000
                        ),
                        expectedFeePerHour,
                        0.001
                    );
                });

                it("should be " + afterHoursPassed*expectedFeePerHour + " after " + afterNumberOfAttempts + " attempt(s) with " + afterHoursPassed + "h fee time passed", function() {
                    this.addAttempts(this.leveledScore, afterNumberOfAttempts);
                    
                    this.assertNumEqual(
                        this.leveledScore.getFee(
                            this.leveledScore.scoreData.lastSuccessTimestamp 
                            + (this.leveledScore.lockHours+afterHoursPassed)*60*60*1000
                        ),
                        afterHoursPassed*expectedFeePerHour,
                        0.001
                    );
                });

                if (afterNumberOfAttempts>0) {
                    it("should be " + scoreReachesZeroAfterHours*expectedFeePerHour + " after " + afterNumberOfAttempts + " attempt(s) with " + scoreReachesZeroAfterHours + "h fee time passed", function() {
                        this.addAttempts(this.leveledScore, afterNumberOfAttempts);
                        
                        this.assertNumEqual(
                            this.leveledScore.getFee(
                                this.leveledScore.scoreData.lastSuccessTimestamp 
                                + (this.leveledScore.lockHours+scoreReachesZeroAfterHours)*60*60*1000
                            ),
                            scoreReachesZeroAfterHours*expectedFeePerHour,
                            0.001
                        );
                    });
                }

            }
        );
    });

    describe("LevelScore.getLevel()", function() {
        it("should be 1 initialy", function() {
            assert.equal(
                this.leveledScore.getLevel(this.leveledScore.scoreData.lastSuccessTimestamp),    
                1
            );
        });

        var expectedLevel = [1, 2, 3, 4, 4];
        
        [   {expectedLevel: 1, afterNumberOfAttempts: 0},
            {expectedLevel: 2, afterNumberOfAttempts: 1},
            {expectedLevel: 3, afterNumberOfAttempts: 2},
            {expectedLevel: 4, afterNumberOfAttempts: 3},
            {expectedLevel: 4, afterNumberOfAttempts: 4}
        ].forEach(({expectedLevel, afterNumberOfAttempts}) => {
           it("should be " + expectedLevel + " for less than " + (afterNumberOfAttempts+1) + " attempt(s)", function() {
               this.addAttempts(this.leveledScore, afterNumberOfAttempts);
               
                assert.equal(this.leveledScore.getLevel(
                    this.leveledScore.scoreData.lastSuccessTimestamp),
                    expectedLevel
                );
            });
        });
    });

    describe("LevelScore.lockHours", function() {
        [   {expectedLockHours: 0, forLevel: 1, afterNumberOfAttempts: 0},
            {expectedLockHours: 1, forLevel: 2, afterNumberOfAttempts: 1},
            {expectedLockHours: 2, forLevel: 3, afterNumberOfAttempts: 2},
            {expectedLockHours: 3, forLevel: 4, afterNumberOfAttempts: 3},
            {expectedLockHours: 3, forLevel: 4, afterNumberOfAttempts: 4}
        ].forEach(({expectedLockHours, forLevel, afterNumberOfAttempts}) => {
            it("should be " + expectedLockHours + " in level " + forLevel, function() {
                this.addAttempts(this.leveledScore, afterNumberOfAttempts);

                assert.equal(this.leveledScore.lockHours, expectedLockHours);
            });
        });
    });

    describe("LevelScore.feePerHour", function() {
        var expectedFeePerHour = [0, 1/2.0, 1/3.0, 1/5.0, 1/5.0];
        var level = [1, 2, 3, 4, 4];
        
        [   {expectedFeePerHour: 0,     forLevel: 1, afterNumberOfAttempts: 0},
            {expectedFeePerHour: 1/2.0, forLevel: 2, afterNumberOfAttempts: 1},
            {expectedFeePerHour: 1/3.0, forLevel: 3, afterNumberOfAttempts: 2},
            {expectedFeePerHour: 1/5.0, forLevel: 4, afterNumberOfAttempts: 3},
            {expectedFeePerHour: 1/5.0, forLevel: 4, afterNumberOfAttempts: 4},
        ].forEach(({expectedFeePerHour, forLevel, afterNumberOfAttempts}) => {
            it("should be " + expectedFeePerHour + " in level " + forLevel, function() {
                this.addAttempts(this.leveledScore, afterNumberOfAttempts);

                assert.equal(this.leveledScore.feePerHour, expectedFeePerHour, );
            });
        });
    });

    describe("LevelScore.addSuccessfulAttempt()", function() {
        it("should allow the first attempt", function() {
            assert.isOk(this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00)));
        });
        
        it("should increase score to 1 after first attempt", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            assert.equal(
                this.leveledScore.getScore(new Date(1970, 1, 1, 10, 00)),
                1
            );
        });
        
        it("should deny second attempt when lock time is not up", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            
            assert.isNotOk(this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 59)));
        });
        
        it("should allow second attempt after lock time has passed", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            
            assert.isOk(this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00)));
        });
        
        it("score should increase score to 2 after second successful attempt", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00));
            
            assert.equal(
                this.leveledScore.getScore(new Date(1970, 1, 1, 11, 00)),
                2
            );
        });
        
        it("should deny third attempt when lock time is not up", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00));
            
            assert.isNotOk(this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 59)));
        });
        
        it("should deny third attempt when increased lock time is not up", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00));
            
            assert.isNotOk(this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 12, 59)));
        });
        
        it("should allow third attempt after increased lock time has passed", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00));
            
            assert.isOk(this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 13, 0)));
        });
        
        it("should increase score to 3 after third successful attempt", function() {
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 10, 00));
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 11, 00));
            this.leveledScore.addSuccessfulAttempt(new Date(1970, 1, 1, 13, 0))
            
            assert.equal(
                this.leveledScore.getScore(new Date(1970, 1, 1, 13, 0)),
                3
            );
        });
    });

    describe("LevelScore.addSuccessfulAttempt() with one fee hour", function() {
        [   {expectedScore: 1,          afterNumberOfAttempts: 1},
            {expectedScore: 2 - 1/2.0,  afterNumberOfAttempts: 2},
            {expectedScore: 3 - 1/3.0,  afterNumberOfAttempts: 3},
            {expectedScore: 4 - 1/5.0,  afterNumberOfAttempts: 4}
        ].forEach(({expectedScore, afterNumberOfAttempts}) => {
            it("should increase score to " + expectedScore + " after " + afterNumberOfAttempts + " attempt(s)", function() {
                this.addAttempts(this.leveledScore, afterNumberOfAttempts-1);
                this.addAttemptWithFeeTime(this.leveledScore, 1);
                
                this.assertNumEqual(
                    this.leveledScore.getScore(this.leveledScore.scoreData.lastSuccessTimestamp),
                    expectedScore,  
                    0.001
                );
            });
        });
    });
});
