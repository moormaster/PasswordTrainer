class ILeveledScoreFormatter {
    constructor() {}
    
    /*
     * returns a formatted string describing the status of the leveled score
     * (locked time, fee amount)
     */
    formatStatus (leveledScore) {}
    
    /*
     * returns a formatted string describing score and level
     */
    formatLeveledScore(leveledScore) {}
    
    /*
     * returns a formatted string describing the score points
     */
    formatScore(leveledScore) {}
    
    /*
     * returns a formatted string describing the fee points
     */
    formatFee(leveledScore) {}

    /*
     * returns a formatted string describing the level
     */
    formatLevel(leveledScore) {}
}

if (typeof exports == "object")
    exports.ILeveledScoreFormatter = ILeveledScoreFormatter;
