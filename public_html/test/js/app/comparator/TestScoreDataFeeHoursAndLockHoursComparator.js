const assert = require('chai').assert;
const ScoreDataFeeHoursAndLockHoursComparator = require('../../../../js/app/comparator/ScoreDataFeeHoursAndLockHoursComparator.js').ScoreDataFeeHoursAndLockHoursComparator

describe("ScoreDataFeeHoursAndLockHoursComparator", function() {
    beforeEach( function() {
        this.scoreDataNew = {
            lastSuccessScore:   null,
            lastSuccessTimestamp:  null
        };
        this.scoreDataLocked = {
            lastSuccessScore:   1,
            lastSuccessTimestamp:  new Date().getTime()
        };
        this.scoreDataReady = {
            lastSuccessScore:   1,
            lastSuccessTimestamp:  new Date().getTime() - 1000*60*60-1
        };
        this.scoreDataFee = {
            lastSuccessScore:   1,
            lastSuccessTimestamp:  new Date().getTime() - 1000*60*60*2
        };

        this.comparator = new ScoreDataFeeHoursAndLockHoursComparator();
    });

    it("should order fee'd score before new score", function() {
        assert.isOk(this.comparator.compare(this.scoreDataFee, this.scoreDataNew) < 0);
    });

    it("should order fee'd score before ready score", function() {
        assert.isOk(this.comparator.compare(this.scoreDataFee, this.scoreDataReady) < 0);
    });

    it("should order fee'd score before locked score", function() {
        assert.isOk(this.comparator.compare(this.scoreDataFee, this.scoreDataLocked) < 0);
    });

    it("should order ready score before new score", function() {
        assert.isOk(this.comparator.compare(this.scoreDataReady, this.scoreDataNew) < 0);
    });

    it("should order ready score before locked score", function() {
        assert.isOk(this.comparator.compare(this.scoreDataReady, this.scoreDataLocked) < 0);
    });

    it("should order new score before locked score", function() {
        assert.isOk(this.comparator.compare(this.scoreDataNew, this.scoreDataLocked) < 0,);
    });
});