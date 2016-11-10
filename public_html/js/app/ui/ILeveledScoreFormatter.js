/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
