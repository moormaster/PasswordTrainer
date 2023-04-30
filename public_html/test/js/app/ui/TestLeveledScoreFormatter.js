// vi: ts=4 et

const assert = require('chai').assert;
const LeveledScoreFormatter = require('../../../../js/app/ui/LeveledScoreFormatter.js').LeveledScoreFormatter;

describe("LeveledScoreFormatter", function() {
    beforeEach(function() {
        this.leveledScoreFormatter = new LeveledScoreFormatter();
    });
    
    describe("formatStatus()", function() {
        [   { args: {fee: 0, lockHoursLeft: 1}, description: "locked password",    expected: "locked for 1h"},
            { args: {fee: 1, lockHoursLeft: 0}, description: "password with a passed fee delay",    expected: "1 fee"}
        ].forEach(({args, description, expected}) => {
            it("should format " + description + " as " + expected, function() {
                assert.equal(this.leveledScoreFormatter.formatStatus(args), expected);
            });
        });
    });
    
    describe("formatLeveledScore()", function() {
        it("should format level and score", function() {
            assert.equal(this.leveledScoreFormatter.formatLeveledScore({score: 42, level: 10}), "Score 42 / Level 10");
        });
    });
    
    describe("formatScore()", function() {
        [   {value: 1.0, expected: "1"},
            {value: 1.2345, expected: "1.23"},
            {value: 9.8765, expected: "9.88"}
        ].forEach(({value, expected}) => {
            it("should format value " + value + " as " + expected, function() {
                assert.equal(this.leveledScoreFormatter.formatScore({score: value}), expected);
            });
        });
    });
    
    describe("formatFee", function() {
        [   {value: 1.0, expected: "1"},
            {value: 1.2345, expected: "1.23"},
            {value: 9.8765, expected: "9.88"}
        ].forEach(({value, expected}) => {
            it("should format value " + value + " as " + expected, function() {
                assert.equal(this.leveledScoreFormatter.formatFee({fee: value}), expected);
            });
        });
    });
    
    describe("formatLevel", function() {
        [   {value: 1.0, expected: "1"},
            {value: 5.0, expected: "5"},
            {value: 10.0, expected: "10"}
        ].forEach(({value, expected}) => {
            it("should format value " + value + " as " + expected, function() {
                assert.equal(this.leveledScoreFormatter.formatLevel({level: value}), expected);
            });
        });
    });
});