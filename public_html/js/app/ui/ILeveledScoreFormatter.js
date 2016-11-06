/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ILeveledScoreFormatter;

ILeveledScoreFormatter = function() {
    /*
     * returns a formatted string describing the status of the leveled score
     * (locked time, fee amount)
     */
    this.formatStatus = function(leveledScore) {};
    
    /*
     * returns a formatted string describing score and level
     */
    this.formatLeveledScore = function(leveledScore) {};
    
    /*
     * returns a formatted string describing the score points
     */
    this.formatScore = function(leveledScore) {};
    
    /*
     * returns a formatted string describing the fee points
     */
    this.formatFee = function(leveledScore) {};

    /*
     * returns a formatted string describing the level
     */
    this.formatLevel = function(leveledScore) {};

}
