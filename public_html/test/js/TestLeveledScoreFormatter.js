/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

QUnit.module("TestLeveledScoreFormatter", {
    beforeEach: function() {
        this.formatter = new LeveledScoreFormatter();
    }
});

QUnit.test("formatStatus()",
    function(assert) {
        assert.equal(this.formatter.formatStatus({fee: 0, lockHoursLeft: 1}), "locked for 1h");
        assert.equal(this.formatter.formatStatus({fee: 1, lockHoursLeft: 0}), "1 fee");
    }
);

QUnit.test("formatLeveledScore",
    function(assert) {
        assert.equal(this.formatter.formatLeveledScore({score: 42, level: 10}), "Score 42 / Level 10");
    }
);

QUnit.test("formatScore", 
    function(assert) {
        var testcase = [
            {value: 1.0, expected: "1"},
            {value: 1.2345, expected: "1.23"},
            {value: 9.8765, expected: "9.88"}
        ];
        
        for (var i=0;i<testcase.length;i++) {
           assert.equal(this.formatter.formatScore({score: testcase[i].value}), testcase[i].expected, "value " + testcase[i].value + " should be formatted as " + testcase[i].expected);
        }
    }
)

QUnit.test("formatFee", 
    function(assert) {
        var testcase = [
            {value: 1.0, expected: "1"},
            {value: 1.2345, expected: "1.23"},
            {value: 9.8765, expected: "9.88"}
        ];
        
        for (var i=0;i<testcase.length;i++) {
           assert.equal(this.formatter.formatFee({fee: testcase[i].value}), testcase[i].expected, "value " + testcase[i].value + " should be formatted as " + testcase[i].expected);
        }
    }
)

QUnit.test("formatLevel", 
    function(assert) {
        var testcase = [
            {value: 1.0, expected: "1"},
            {value: 5.0, expected: "5"},
            {value: 10.0, expected: "10"}
        ];
        
        for (var i=0;i<testcase.length;i++) {
           assert.equal(this.formatter.formatLevel({level: testcase[i].value}), testcase[i].expected, "value " + testcase[i].value + " should be formatted as " + testcase[i].expected);
        }
    }
)