QUnit.module("ScoreDataFeeHoursAndLockHoursComparator", {
    beforeEach: function() {
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
            lastSuccessTimestamp:  new Date().getTime() - 1000*60*60
        };
        this.scoreDataFee = {
            lastSuccessScore:   1,
            lastSuccessTimestamp:  new Date().getTime() - 1000*60*60*2
        };
        
        this.comparator = new ScoreDataFeeHoursAndLockHoursComparator();
    }
});

QUnit.test("compare()",
    function(assert) {
        assert.ok(this.comparator.compare(this.scoreDataFee, this.scoreDataNew) < 0, "fee'd score should be < new score");
        assert.ok(this.comparator.compare(this.scoreDataFee, this.scoreDataReady) < 0, "fee'd score should be < ready score");
        assert.ok(this.comparator.compare(this.scoreDataFee, this.scoreDataLocked) < 0, "fee'd score should be < locked score");

        assert.ok(this.comparator.compare(this.scoreDataReady, this.scoreDataNew) < 0, "ready score should be < new score");
        assert.ok(this.comparator.compare(this.scoreDataReady, this.scoreDataLocked) < 0, "ready score should be < locked score");

        assert.ok(this.comparator.compare(this.scoreDataNew, this.scoreDataLocked) < 0, "new score should be < locked score");
    }
);