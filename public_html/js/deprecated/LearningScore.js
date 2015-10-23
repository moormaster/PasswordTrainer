/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LearningScore(firstAttemptDate) {
    if (firstAttemptDate == null)
        firstAttemptDate = new Date();
    
    this.attemptCount = 0;
    this.firstAttemptDate = firstAttemptDate;
    this.lastAttemptDate = null;
    
    this.pactual = 0;
    this.psuccess = 1;
    
    this.getScore = function() {
        return  this.pactual / this.psuccess;
    };
       
    this.getScoreToday = function(dateNow) {
        if (dateNow == null)
            dateNow = new Date();
        
        
        var dpsuccess = (this.attemptCount+1) * Math.pow(dateNow.getTime()-this.firstAttemptDate.getTime(), 3);
        if (this.lastAttemptDate && dateNow.getTime() - this.lastAttemptDate.getTime() != 0)
            dpsuccess /= (dateNow.getTime() - this.lastAttemptDate.getTime());
        
        var psuccess = this.psuccess + dpsuccess;
        
        return this.pactual / psuccess;
    };
    
    this.addAttempt = function(success, dateNow) {
        if (dateNow == null)
            dateNow = new Date();
        
        this.attemptCount++;
        this.lastAttemptDate = dateNow;
        
        var dpsuccess = this.attemptCount * Math.pow(dateNow.getTime()-this.firstAttemptDate.getTime(), 3);
        if (dateNow.getTime() - this.lastAttemptDate.getTime() != 0)
            dpsuccess /= (dateNow.getTime() - this.lastAttemptDate.getTime());
        
        var dpactual = 0;
        if (success)
            dpactual = dpsuccess;
        
        this.pactual = this.pactual + dpactual;
        this.psuccess = this.psuccess + dpsuccess;
    };
}
