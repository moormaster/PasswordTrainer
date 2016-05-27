/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        $.fn.JQPassword = function(sub, options) {
            if (!sub)
                sub = "init";
                
            switch(sub) {
                case "init":
                    return init.call(this, options.skeleton);
                    break;
                    
                case "description":
                    return setDescription.call(this, options.value);
                    break;
                    
                case "score":
                    return setScore.call(this, options.value);
                    break;
                case "fee":
                    return setFee.call(this, options.value);
                    break;
                case "level":
                   return setLevel.call(this, options.value);
                   break;
                case "status":
                   return setStatus.call(this, options.value);
                   break;
            };
        };
        
        var init = function(skeleton) {
            var skel = "    <div class=\"password\">\
                                <span class=\"passworddescription\"></span><br/>\
                                <span class=\"passwordscore\"></span> P (Lvl: <span class=\"passwordlevel\"></span> Fee: <span class=\"passwordfee\"></span> Status: <span class=\"passwordstatus\"></span>)\
                            </div>";
           
           if (skeleton)
               skel = skeleton;
           
           return this.append(skel);
        };
        
        var setDescription = function(value) {
            return this.find('.passworddescription').text(value);
        };
        
        var setScore = function(value) {
            return this.find('.passwordscore').text(value);
        };
        
        var setFee = function(value) {
            return this.find('.passwordfee').text(value);
        };
        
        var setLevel = function(value) {
            return this.find('.passwordlevel').text(value);
        };
        
        var setStatus = function(value) {
            return this.find('.passwordstatus').text(value);
        }
    }
)(jQuery);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        $.fn.JQPasswordInput = function(sub, options) {
            if (!sub)
                sub = "init";
                
            switch(sub) {
                case "init":
                    return init.call(this);
                    break;
                    
                case "successColor":
                    return setSuccessColor.call(this, options.isSuccessful);
                    break;
                    
                case "lock":
                    return setLock.call(this, options.isLocked);
                    break;
                    
                case "status":
                    return setStatus.call(this, options.text);
                    break;
                    
                case "description":
                    return setDescription.call(this, options.text);
                    break;
            };
        };
        
        var init = function() {
            this.change(
                function() {
                    $(this).trigger("passwordEntered", [$(this).val()]);
                }
            );
        };
        
        var setSuccessColor = function(isSuccessful) {
                switch(isSuccessful) {
                    case false:
                        this.find('.password').removeClass('bg_anim_green');
                        this.find('.password').addClass('bg_anim_red');
                        break;
                        
                    case true:
                        this.find('.password').removeClass('bg_anim_red');
                        this.find('.password').addClass('bg_anim_green');
                        break;
                        
                    default:
                        this.find('.password').removeClass('bg_anim_green');
                        this.find('.password').removeClass('bg_anim_red');
                        break;
                }                        
        };
        
        var setLock = function(isLocked) {
            if (isLocked) {
                this.find('.password').attr("readonly", "");
                this.find('.password').addClass('bg_readonly');
            } else {
                this.find('.password').removeAttr("readonly");
                this.find('.password').removeClass('bg_readonly');
            }
        };

        var setStatus = function(text) {
            return this.find('.passwordscore').text(text);
        };
        
        var setDescription = function(text) {
            return this.find('.passworddescription').text(text);
        };
    }
)(jQuery);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        function elemInit(elem, instance) {
            elem.passwordRegistration = instance;
        }
        
        function passwordEntered(elem, instance) {
            var desc = instance.passwordDescriptionCollection.val();
            var pwd = instance.passwordCollection.val();
            var pwdrepeat = instance.passwordRepeatCollection.val();

            instance.passwordCollection.removeClass("bg_anim_red");
            instance.passwordRepeatCollection.removeClass("bg_anim_red");

            if (pwd != pwdrepeat) {
                if (pwd  && pwdrepeat) {
                    instance.passwordCollection.addClass("bg_anim_red");
                    instance.passwordRepeatCollection.addClass("bg_anim_red");
                }
                
                return;
            }

            instance.passwordDescriptionCollection.val("");
            instance.passwordCollection.val("");
            instance.passwordRepeatCollection.val("");

            instance.trigger('passwordEntered', [desc, pwd]);
        }
        
        $.fn.JQPasswordRegistration = function(options) {
            if (options == null)
                options = {};
            
            this.passwordDescriptionCollection = options['passwordDescription'];
            this.passwordCollection = options['password'];
            this.passwordRepeatCollection = options['passwordRepeat'];
            
            if (!this.passwordDescriptionCollection) {
                this.passwordDescriptionCollection = this.children(".passworddescription");
            }
            if (!this.passwordCollection)
                this.passwordCollection = this.children(".password");

            if (!this.passwordRepeatCollection)
                this.passwordRepeatCollection = this.children(".passwordrepeat");            
            
            this.passwordDescriptionCollection.val("");
            this.passwordCollection.val("");
            this.passwordRepeatCollection.val("");
            
            var instance = this;
            
            $(this).each(
                function() {
                    elemInit(this, instance);
                }
            )
            instance.passwordCollection.each(
                function() {
                    elemInit(this, instance);
                }
            );
            instance.passwordRepeatCollection.each(
                function() {
                    elemInit(this, instance);
                }
            );
            
            this.passwordCollection.change(
                function() {
                    passwordEntered(this, instance);
                }
            );
            this.passwordRepeatCollection.change(
                function() {
                    passwordEntered(this, instance);
                }
            );
        };
    }
)(jQuery);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var IComparator;

IComparator = function() {
    /*
     * compares obj1 to obj2
     * 
     * returns
     *      -1 if obj1 is null or obj1 < obj2
     *      0  if obj1 is equally to obj2
     *      1  if obj1 > obj2 or obj2 is null
     */
    this.compare= function(obj1, obj2) {}
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var IImportsExportsPasswordRegistrations;

IImportsExportsPasswordRegistrations = function() {
    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations.
     */
    this.importJSON = function(json) {};

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    this.exportJSON = function() {};
};
var IApp = function() {
    this.prototype = new IImportsExportsPasswordRegistrations();
    
    // password registrations
    this.passwordRegistrations = null;

    /* 
     * page instances
     */
    this.pageTrainPasswords = null;
    this.pageImportExport = null;
    this.pagePasswordManagePasswords = null;
    
    this.pagePasswordDialog = null;
    
    /*
     * password notificator
     */
    this.passwordNotificator = null;

    /*
     * initialize jquery widgets and pages
     */
    this.init = function() {};

    /*
     * restore password registrations from localStorage
     */
    this.readPasswordRegistrationsFromLocalStorage = function() {};

    /*
     * persist password registration to local storage
     */
    this.writePasswordRegistrationsToLocalStorage = function() {};
    
    /*
     * register a new password
     */
    this.addPasswordRegistration = function(description, password) {};
    
    /*
     * add a password input attempt with the given password on the given password registration
     */
    this.addPasswordAttempt = function(passwordRegistration, password) {};
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    this.getMostRecentPasswordRegistration = function() {};

};
var IJSONFormatter;

IJSONFormatter = function() {
    /*
     * pretty formats the given JSON string
     */
    this.format = function(JSONStr) {};
};
var ILeveledScore;

ILeveledScore = function(scoreData) {
    this.setScoreData = function(scoreData) {};
    
    /*
     * add successful password attempt to score
     */
    this.addSuccessfulAttempt = function(dateOfAttempt) {};
    
    this.getFee = function(readDate) {};
    this.getScore = function(readDate) {};
    this.getLevel = function(readDate) {};
    
    this.getLockHoursLeft = function(readDate) {};
    this.getFeeHoursPassed = function(readDate) {};
    
    /*
     * score properties by current date/time
     */
    Object.defineProperties(
        this, 
        {
            "score": {},
            
            "fee": {},
            
            "lockHoursLeft": {},
            
            "feeHoursPassed": {},
            
            "lockHours": {},
            
            "feePerHour": {},
                        
            "level": {}
        }
    );
};
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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var INotificator;
INotificator = function(window) {
    /*
     * returns true if application may send notifications
     */
    this.hasNotificationPermission = function() {};

    /*
     * returns true if application may vibrate
     */
    this.hasVibrationPermission = function() {};
    
    /*
     * sends a new notification and returns an notification instance
     */
    this.notify = function(title, text) {};
};
var IPasswordNotificator;

IPasswordNotificator = function(passwordRegistrations, window) {
    // App instance
    this.app = null;

    /*
     * show notification about the number of ready password registrations
     */
    this.notify = function() {};
};
var IPasswordRegistrationCollection;

IPasswordRegistrationCollection = function(passwordHasher, scoreDataComparator) {
    this.prototype = new IImportsExportsPasswordRegistrations();
    this.passwordHasher = null;
    this.scoreDataComparator = null;
    
    // collection of password registrations
    this.collection = null;
    
    /*
     * add new password registration
     */
    this.add = function(description, password) {};
    
    /*
     * recreate the hash for the given password without losing score info
     * 
     * returns true on success
     */
    this.rehash = function(description, password) {};
    
    /*
     * find the password registration which is minimal according to the scoreDataComparator
     * (i.e. maximal feeHours or minimal lock hours)
     */
    this.getMostRecentPasswordRegistration = function() {};
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var IPasswordHasher = function(saltGenerator) {
    this.saltGenerator = saltGenerator; // the salt generator which shall be used
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    this.generateSaltedHash = function(password, salt) {};
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    this.parseSaltedHash = function(hash) {};
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ISaltGenerator = function(length, charSet) {
    this.length = null;   // the desired length of the salt
    this.charSet = null;  // the desired charset
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    this.generate = function() {};
}

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var IPagePasswordDialog;

IPagePasswordDialog = function(app) {
    // app instance where this page is displayed in
    this.appInstance = null;

    
    /*
     * initialize jquery ui widgets
     */
    this.init = function() {};
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var IPageManagePasswords;

IPageManagePasswords = function(app) {
    // app instance where this page is displayed in
    this.appInstance = null;

    
    /*
     * initialize jquery ui widgets
     */
    this.init = function() {};
    
    /*
     * update page display
     */
    this.update = function() {};
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var IPagePasswordTrainer = function(app) {
    // app instance where this page is displayed in
    this.appInstance = null;
    
    // password registration instance which is currently shown
    this.currentPasswordRegistration = null;

    // leveled score instance of the password registration
    this.currentLeveledScore = null;
    
    // refresh interval id
    this.intervalId;

    /*
     * initializes jquery ui widgets and page
     */
    this.init = function() {};

    /*
     * changes the displayed password registration
     */
    this.setPasswordRegistration = function(passwordRegistration) {};

    /*
     * update page display
     */
    this.update = function() {};

    /*
     * add a password input attempt with the given password
     */
    this.addPasswordAttempt = function(password) {};
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
var IPageImportExport = function(app) {
    // app instance where this page is displayed in
    this.appInstance = null;

    /*
     * initialize jquery ui widgets
     */
    this.init = function() {};

    /*
     * perform export of password registrations
     */
    this.exportPasswordRegistrations = function() {};

    /*
     * perform import of password registrations
     */
    this.importPasswordRegistrations = function() {};
};


var JSONFormatter;

JSONFormatter = new function() {
    this.prototype = new IJSONFormatter();
    
    this.format = function(JSONStr) {
        if (!JSONStr)
            return "";
            
        var result = "";
        
        var indent = "";
        var startIndex = 0;
        var isInsideStringLiteral = false;
        
        while (JSONStr.length > startIndex) {
            var currentIndex = startIndex;
            
          
            while (JSONStr.length > currentIndex) {
                // skip escaped characters
                if (isInsideStringLiteral && JSONStr[currentIndex] == "\\") {
                    currentIndex += 2;
                    continue;
                }
                
                // check for string literal
                if (JSONStr[currentIndex] == "\"")
                    isInsideStringLiteral = !isInsideStringLiteral;
                
                // move cursor until first occurence of ',',  '{' or '}'
                if (!isInsideStringLiteral && ",{}".indexOf(JSONStr[currentIndex]) >= 0)
                    break;
                    
                currentIndex++;
            }
        
            result += JSONStr.substring(startIndex, currentIndex);
            startIndex = currentIndex;
            
            if (JSONStr.length <= startIndex)
                continue;
        
            switch(JSONStr[currentIndex]) {
                case ",":
                    result += JSONStr[currentIndex];
                    result += "\n" + indent;
                    
                    break;
                
                case "{":
                    indent += "\t";
                    
                    result += JSONStr[currentIndex];
                    result += "\n" + indent;
                    
                    break;
                
                case "}":
                    indent = indent.substring(0, indent.length-1);
                    result += "\n" + indent;
                    result += JSONStr[currentIndex];
                    
                    break;
            };
            
            startIndex++;
        };
        
        return result;
    };
};
var LeveledScore;

LeveledScore = function (scoreData) {
    this.prototype = new ILeveledScore(scoreData);
    
    this.setScoreData = function(scoreData) {
        this.scoreData = scoreData;
        
        if (this.scoreData == null) {
            this.scoreData = {
                lastSuccessScore:   null,
                lastSuccessTimestamp:  null
            };
        }
    };
        
    this.addSuccessfulAttempt = function(dateOfAttempt) {
        if (dateOfAttempt == null)
            dateOfAttempt = new Date();

        var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
        var lockHoursLeft = getLockHoursLeft(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, dateOfAttempt);
        
        if (lockHoursLeft > 0)
            return false;
        
        var lastScore = this.getScore(dateOfAttempt);
        
        this.scoreData.lastSuccessScore = lastScore+1;
        this.scoreData.lastSuccessTimestamp = dateOfAttempt.getTime();
        
        return true;
    };
    
    this.getFee = function(readDate) {
        if (this.scoreData.lastSuccessTimestamp == null)
            return 0;

        var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
        var feeHoursPassed = Math.floor(getFeeHoursPassed(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate));
        
        var fee = feeHoursPassed*this.feePerHour;
        
        if (fee > this.scoreData.lastSuccessScore)
            return this.scoreData.lastSuccessScore;
        
        return fee;
    };
    
    this.getScore = function(readDate) {
        if (this.scoreData.lastSuccessTimestamp == null)
            return 0;
        
        return this.scoreData.lastSuccessScore - this.getFee(readDate);
    };
    
    this.getLevel = function(readDate) {
        return getLevel(this.getScore(readDate));
    };
    
    this.getLockHoursLeft = function(readDate) {
        var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
        
        return getLockHoursLeft(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate);
    };
    
    this.getFeeHoursPassed = function(readDate) {
        var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
        
        return getFeeHoursPassed(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate);
    };
    
    var fib = function(i) {
        if (i==0)
            return 0;
        
        if (i==1)
            return 1;
        
        var a = 0;
        var b = 1;
        var fib_k = 1;
        
        for (var k=2; k<i; k++) {
            a = b;
            b = fib_k;
            fib_k = a + b;
        }

        return fib_k;
    };
    
    var fibinv = function(n) {
        if (n == 0)
            return 0;
        
        var k = 2;
        
        var a = 0;
        var b = 1;
        var fib_k = 1;
        
        while (fib_k <= n) {
            a = b;
            b = fib_k;
            
            fib_k = a + b;
            k++;
        }
        
        return k-1;
    };
    
    var getLevel = function(score) {
        if (score < 1 )
            return 1;

        return fibinv(score);
    };
    
    var getLockHours = function(level) {
        if (level <= 1)
            return 0;

        return fib(level);
    };
    
    var getFeePerHour = function(level) {
        if (level <= 1)
            return 0;

        return 1 / fib(level+1);
    };
    
    var getLockHoursLeft = function(level, lastSuccessDate, readDate) {
        var lockHours = getLockHours(level);
        
        if (!lastSuccessDate)
            return 0;
        
        var lockHoursLeft = lockHours - (readDate - lastSuccessDate)/(1000*60*60);
        if (!lockHoursLeft || lockHoursLeft < 0)
            lockHoursLeft = 0;

        return lockHoursLeft;
    };
    
    var getFeeHoursPassed = function(level, lastSuccessDate, readDate) {
        var lockHours = getLockHours(level);
        
        if (!lastSuccessDate)
            return 0;
        
        var feeHoursPassed = (readDate - lastSuccessDate)/(1000*60*60) - lockHours;
        if (!feeHoursPassed || feeHoursPassed < 0)
            feeHoursPassed = 0;

        return feeHoursPassed;
    };
    
    Object.defineProperties(
        this, 
        {
            "score": {
                get:    function() {
                            return this.getScore(new Date());
                        }
            },
            
            "fee": {
                get:    function() {
                            return this.getFee(new Date());
                        }
            },
            
            "lockHoursLeft": {
                get:    function() {
                            return this.getLockHoursLeft(new Date());
                        }
            },
            
            "feeHoursPassed": {
                get:    function() {
                            return this.getFeeHoursPassed(new Date());
                        }
            },
            
            "lockHours": {
                get:    function() {
                            var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                            return getLockHours(lastSuccessLevel);
                        }
            },
            
            "feePerHour": {
                get:    function() {
                            var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                            return getFeePerHour(lastSuccessLevel);
                        }
            },
                        
            "level": {
                get:    function() {
                            return this.getLevel(new Date());
                }
            }
        }
    );

    this.setScoreData(scoreData);
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var LeveledScoreFormatter;

LeveledScoreFormatter = function() {
    this.prototype = new ILeveledScoreFormatter();
    
    /*
     * returns a formatted string describing the status of the leveled score
     * (locked time, fee amount)
     */
    this.formatStatus = function(leveledScore) {
        if (leveledScore.fee)
            return this.formatFee(leveledScore) + " fee";

        if (leveledScore.lockHoursLeft)
            return "locked for " + formatTime(leveledScore.lockHoursLeft*60*60*1000);
    };
    
    
    /*
     * returns a formatted string describing score and level
     */
    this.formatLeveledScore = function(leveledScore) {
        return "Score " + this.formatScore(leveledScore) + " / Level " + this.formatLevel(leveledScore);
    };
    
    /*
     * returns a formatted string describing the score points
     */
    this.formatScore = function(leveledScore) {
        return Math.round(leveledScore.score*100)/100;
    };
    
    /*
     * returns a formatted string describing the fee points
     */
    this.formatFee = function(leveledScore) {
        return Math.round(leveledScore.fee*100)/100;
    };
    
    /*
     * returns a formatted string describing the level
     */
    this.formatLevel = function(leveledScore) {
        return leveledScore.level;
    };

    var formatTime = function(ms) {
        if (ms < 0)
            return "-" + formatTime(-ms);

        var years, days, hours, minutes, seconds;

        years = 0;
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;

        if (ms >= 1000*60*60*24*365) {
            years = Math.floor(ms / (1000*60*60*24*365));
            ms -= years * 1000*60*60*24*365;
        }

        if (ms >= 1000*60*60*24) {
            days = Math.floor(ms / (1000*60*60*24));
            ms -= days * 1000*60*60*24;        
        }

        if (ms >= 1000*60*60) {
            hours = Math.floor(ms / (1000*60*60));
            ms -= hours * 1000*60*60;
        }

        if (ms >= 1000*60) {
            minutes = Math.floor(ms / (1000*60));
            ms -= minutes * 1000*60;
        }

        if (ms >= 1000) {
            seconds = Math.floor(ms / 1000);
            ms -= seconds * 1000;
        }

        var string = "";

        if (years > 0)
            string += (string.length>0?" ":"") + years + "y";

        if (days > 0)
            string += (string.length>0?" ":"") + days + "d";

        if (hours > 0)
            string += (string.length>0?" ":"") + hours + "h";

        if (minutes > 0)
            string += (string.length>0?" ":"") + minutes + "m";

        if (seconds > 0 || string.length == 0)
            string += (string.length>0?" ":"") + seconds + "s";

        return string;
    };
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var MD5PasswordHasher = function(saltGenerator) {
    // unsalted md5 generator
    this.prototype = new IPasswordHasher(null);
    
    this.saltGenerator = new SaltGenerator(32, null);
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    this.generateSaltedHash = function(password, salt) {
        if (salt == null)
            salt = this.saltGenerator.generate();
        
        if (!salt)
            // backward compatibility - check unsalted hash
            return CryptoJS.MD5(password).toString();
        else
            return CryptoJS.MD5(password + salt).toString() + ":" + salt;
    };
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    this.parseSaltedHash = function(hash) {
        var index = null;
        if (hash && (index = hash.lastIndexOf(":")) >= 0 )
            return {salt: hash.substr(index+1), hash: hash.substring(0, index)};
        
        return {salt: "", hash: hash};
    };
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Notificator;
Notificator = function(window) {
    this.prototype = new INotificator(window);
    
    this.Notification = window.Notification;
    this.navigator = window.navigator;
    
    if (this.Notification)
        this.Notification.requestPermission();
    
    this.hasNotificationPermission = function() {
        if (!this.Notification)
            return false;
        
        if (this.Notification.permission != "granted")
            return false;
        
        return true;
    };

    this.hasVibrationPermission = function() {
        if (!this.navigator)
            return false;
        
        if (!this.navigator.vibrate)
            return false;
        
        return true;
    };
    
    this.notify = function(title, text, vibrationLengthInMs) {
        if (vibrationLengthInMs && this.hasVibrationPermission())
            this.navigator.vibrate(vibrationLengthInMs);
        
        if (this.hasNotificationPermission()) {
            try {
                // try deprecated way first
                return new this.Notification(title, { body: text });
            } catch (e) {
                // use future chrome implementation 
                if (ServiceWorkerRegistration && ServiceWorkerRegistration.showNotification)
                    return ServiceWorkerRegistration.showNotification(title, { body: text });
            }
        }
        
        return null;
    };
};var PasswordNotificator;

PasswordNotificator = function(passwordRegistrations, window) {
    this.prototype = new IPasswordNotificator(passwordRegistrations, window);
        
    this.passwordRegistrations = passwordRegistrations;
    this.notificator = new Notificator(window);
    
    this.activeNotifications = [];
    this.lastNotificationPasswordCount = null;
    
    this.notify = function() {
        var date = new Date();
        var readyPasswordDescs = gatherReadyPasswordDescriptions.call(this, date);

        // no pending passwords -> reset notifications
        if (!readyPasswordDescs.length) {
            resetNotifications(this.activeNotifications);
            this.lastNotificationPasswordCount = null;

            return;
        }

        // suppress creation of a new notification if password count lowers
        if (readyPasswordDescs.length <= this.lastNotificationPasswordCount) {
            this.lastNotificationPasswordCount = readyPasswordDescs.length;
            return;
        }

        // create new notification
        resetNotifications.call(this);
        var notification = this.notificator.notify("PasswordTrainer", readyPasswordDescs.length + " passwords are ready", [300, 100, 300, 100, 300]);
        this.activeNotifications.push(notification);
        this.lastNotificationPasswordCount = readyPasswordDescs.length;
    };
    
    var resetNotifications = function() {
        if (!this.activeNotifications)
            this.activeNotifications = [];
        
        while (this.activeNotifications.length > 0) {
            var notification = this.activeNotifications.pop();
            
            if (!notification)
                continue;
                
            notification.close();
        }
        
        if (this.activeNotifications.length > 0)
            return false;
        
        return true;
    };
    
    var gatherReadyPasswordDescriptions = function(date) {
        var readyPasswordDescs = [];

        if (!this.passwordRegistrations)
            return null;
        
        if (!this.passwordRegistrations.collection)
            return null;
        
        var passwordCollection = this.passwordRegistrations.collection;

        for (var desc in passwordCollection) {
            var passwordRegistration = passwordCollection[desc];

            if (!passwordRegistration)
                continue;

            if (!passwordRegistration.scoreData)
                continue;

            var leveledScore = new LeveledScore(passwordRegistration.scoreData);
            if (leveledScore.getLockHoursLeft(date) > 0)
                continue;

            readyPasswordDescs.push(desc);
        }

        return readyPasswordDescs;
    };
};
var PasswordRegistrationCollection;

PasswordRegistrationCollection = function(passwordHasher, scoreDataComparator) {
    this.prototype = new IPasswordRegistrationCollection(passwordHasher);
    
    this.passwordHasher = passwordHasher;
    this.scoreDataComparator = scoreDataComparator;

    this.collection = {};

    this.importJSON = function(json) {
        var passwordRegistrations = "";
        
        if (json)
            passwordRegistrations = JSON.parse(json);

        if (!isPasswordRegistrationIntegrityOk(passwordRegistrations))
            return false;

        this.collection = passwordRegistrations;

        return true;
    };

    this.exportJSON = function() {
        return JSON.stringify(this.collection);
    };

    this.add = function(description, password) {
        this.collection[description] =
        {
            description:    description,
            hash:           this.passwordHasher.generateSaltedHash(password, null),
            scoreData:      {
                lastSuccessScore:   null,
                lastSuccessTimestamp:  null
            }
        };
    };

    /*
     * recreate the hash for the given password without losing score info
     */
    this.rehash = function(description, password) {
        if (!this.collection[description])
            return false;
        
        var hash = this.collection[description].hash;
        var parsedHash = this.passwordHasher.parseSaltedHash(hash);
        
        // dont rehash if wrong password was given
        if (this.passwordHasher.generateSaltedHash(password, parsedHash.salt) != hash)
            return false;
        
        this.collection[description].hash = this.passwordHasher.generateSaltedHash(password, null);
        
        return true;
    };

    this.getMostRecentPasswordRegistration = function() {
        if (!this.scoreDataComparator)
            return null;
        
        var mostRecentInstance = null;

        // determine instance with max fee hours passed and minimal lock hours left
        for (var key in this.collection) {
            var passwordRegistration = this.collection[key];
            var scoreData  = passwordRegistration.scoreData;

            if (mostRecentInstance == null || this.scoreDataComparator.compare(scoreData, mostRecentInstance.scoreData) < 0)
                mostRecentInstance = passwordRegistration;
        }

        return mostRecentInstance;
    };

    /*
    * checks the given dictionary if it is a valid password registration container
    */
    var isPasswordRegistrationIntegrityOk = function(passwordRegistration) {
        if (!passwordRegistration)
                return false;

        for (var desc in passwordRegistration) {
                var currentRegistration = passwordRegistration[desc];

                if (!currentRegistration)
                        return false;

                if (currentRegistration.description != desc)
                        return false;

                if (!currentRegistration.scoreData)
                        return false;
        }

        return true;
    };
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ScoreDataFeeHoursAndLockHoursComparator;

ScoreDataFeeHoursAndLockHoursComparator = function() {
    this.prototype = new IComparator();
    
    this.compare = function(obj1, obj2) {
        if (obj1 == null)
            return -1;
        
        if (obj2 == null)
            return 1;
        
        var leveledScore1 = new LeveledScore();
        var leveledScore2 = new LeveledScore();
        
        // TODO: check why passing obj1 / obj2 to constructor does not work?!
        leveledScore1.setScoreData(obj1);
        leveledScore2.setScoreData(obj2);
        
        // maximum fee hours first
        if (leveledScore1.feeHoursPassed > leveledScore2.feeHoursPassed)
            return -1;
        
        if (leveledScore1.feeHoursPassed < leveledScore2.feeHoursPassed)
            return 1;
        
        // minimum lock hours first
        if (leveledScore1.lockHoursLeft < leveledScore2.lockHoursLeft)
            return -1;
        
        if (leveledScore1.lockHoursLeft > leveledScore2.lockHoursLeft)
            return 1;
        
        return 0;
    }
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SaltGenerator = function(length, charSet) {
    this.prototype = new ISaltGenerator(length, charSet);
    
    this.length = length;   // the desired length of the salt
    this.charSet = charSet;  // the desired charset

    if (!this.charSet)
        this.charSet = '!"§$%&/()=?`´+*#\'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    this.generate = function() {
        var salt = "";

        if (!charSet)
            charSet = '!"§$%&/()=?`´+*#\'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (var i=0;i<this.length;i++) {
            var rnd = Math.floor(Math.random()*charSet.length);

            salt += charSet[rnd]
        }

        return salt;
    };
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PagePasswordDialog;

(
    function($) {
        PagePasswordDialog = function(app) {
            this.prototype = new IPagePasswordDialog(app);
            
            this.appInstance = app;
            
            this.init = function() {
                var pageInstance = this;
                
                $('#passwordregistration').JQPasswordRegistration(
                    {
                        passwordDescription:            $('#passwordregistration .passworddescription'),
                        password:                       $('#passwordregistration .password'),
                        passwordRepeat:                 $('#passwordregistration .passwordrepeat'),
                    }
                );
                
                $('#passwordregistration').on('passwordEntered', 
                    function(e, desc, pwd) {
                        pageInstance.appInstance.addPasswordRegistration(desc, pwd);
                    }
                );
            };
        };
    }
)(jQuery);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var PageManagePasswords;

(
    function($) {
        PageManagePasswords = function(app) {
            this.prototype = new IPageManagePasswords(app);

            // app instance where this page is displayed in
            this.appInstance = app;

            /*
             * initialize jquery ui widgets
             */
            this.init = function() {
                var pageInstance = this;
                
                this.tableSelector = $('#pageManagePasswords .passwordTable');

                $('#pageManagePasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
            };

            /*
             * update page display
             */
            this.update = function() {
                updateTable(this.tableSelector, this.appInstance.passwordRegistrations);
            };

            var updateTable = function(tableSelector, passwordRegistrations) {
                var tableLineSkeleton = 
                        "<tr class=\"password\">\
                            <td class=\"passworddescription\"></td>\
                            <td>\
                                    <span class=\"passwordscore\"></span> / <span class=\"passwordlevel\"></span>\
                            </td>\
                            <td class=\"passwordstatus\"></td>\
                        </tr>";

                tableSelector.find('.password').remove();

                if (!passwordRegistrations)
                    return;

                var i=0;
                for (var desc in passwordRegistrations.collection) {
                    var passwordRegistration = passwordRegistrations.collection[desc];

                    var formatter = new LeveledScoreFormatter();
                    var leveledScore = new LeveledScore(passwordRegistration.scoreData);

                    tableSelector.JQPassword("init", {skeleton: tableLineSkeleton});
                    var passwordSelector = tableSelector.find('.password:last');
                    
                    passwordSelector.JQPassword("description", {value: desc});
                    passwordSelector.JQPassword("score", {value: formatter.formatScore(leveledScore)});
                    passwordSelector.JQPassword("level", {value: formatter.formatLevel(leveledScore)});
                    passwordSelector.JQPassword("status", {value: formatter.formatStatus(leveledScore)});
                }
            }
        };
    }
)(jQuery);/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 
var PageImportExport;

(
    function($) {
        PageImportExport = function(app) {
            this.prototype = new IPageImportExport(app);
            
            this.appInstance = app;
            
            this.init = function() {
                var pageInstance = this;
                
                $('#pageImportExport').on('pageshow',
                    function(e) {
                        pageInstance.exportPasswordRegistrations();
                    }
                );
                
                $('#pageImportExport').on('change',
                    function(e) {
                        pageInstance.importPasswordRegistrations();
                    }
                );
            };
            
            this.exportPasswordRegistrations = function() {
                var json = this.appInstance.exportJSON();
                json = JSONFormatter.format(json);
                
                $('#importexportfield').val(json);
            };
            
            this.importPasswordRegistrations = function() {
                var json = $('#importexportfield').val();
                
                this.appInstance.importJSON(json);
            };
        };
    }
)(jQuery);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var PagePasswordTrainer;

(
    function($) {
        PagePasswordTrainer = function(app) {
            this.prototype = new IPagePasswordTrainer(app);
            
            this.appInstance = app;
            this.currentPasswordRegistration;
            this.currentLeveledScore = new LeveledScore();
            
            this.intervalId = null;
            
            /*
             * initializes widgets and auto page update
             */
            this.init = function() {
                var pageInstance = this;
                
                $('#passwordtrainer .password').JQPasswordInput();
                $('#passwordtrainer .password').on('passwordEntered',
                    function(e, password) {
                        $(this).val("");
                        
                        interruptInterval(pageInstance, 1000);
                        var success = pageInstance.addPasswordAttempt(password);
                        updateWidgets.call(pageInstance, success);
                    }
                );
                
                $('#pageTrainPasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
                
                activateInterval(pageInstance);
            };
            
            this.setPasswordRegistration = function(passwordRegistration) {
                if (!passwordRegistration)
                    return false;
                
                this.currentPasswordRegistration = passwordRegistration;
                
                if (!this.currentPasswordRegistration)
                    this.currentLeveledScore.setScoreData(null);
                else
                    this.currentLeveledScore.setScoreData(this.currentPasswordRegistration.scoreData);
                
                updateWidgets.call(this, true);
                
                return true;
            };
            
            this.setMostRecentPasswordRegistration = function() {
                this.setPasswordRegistration(this.appInstance.getMostRecentPasswordRegistration());
            };
            
            this.addPasswordAttempt = function(password) {
                if (!this.appInstance)
                    return false;
                
                return app.addPasswordAttempt(this.currentPasswordRegistration.description, password);
            };
            
            this.update = function() {
                this.setMostRecentPasswordRegistration();
                updateWidgets.call(this);
                
                this.appInstance.passwordNotificator.notify();
            };
            
            var activateInterval = function(pageInstance) {
                pageInstance.intervalId = window.setInterval(
                    function() {
                        pageInstance.update();
                    },
                    1000
                );
            };
            
            var clearInterval = function(pageInstance) {
                if (!pageInstance.intervalId)
                    return false;
                
                window.clearInterval(pageInstance.intervalId);
                pageInstance.intervalId = null;
                
                return true;
            };
            
            var interruptInterval = function(pageInstance, interruptDurationMs) {
                if (!clearInterval(pageInstance))
                    return false;
                
                window.setTimeout(
                    function() {
                        activateInterval(pageInstance);
                    },
                    interruptDurationMs
                );
                
                return true;
            };

            var updateWidgets = function(successState) {
                updateWidgetDescription(this.currentPasswordRegistration);
                updateWidgetsSuccessColor((this.currentLeveledScore.lockHoursLeft > 0), successState);
                updateWidgetsStatus(this.currentLeveledScore);
            };
            
            var updateWidgetDescription = function(passwordRegistration) {
                if (!passwordRegistration)
                    $('#passwordtrainer').JQPasswordInput("description", {text: ""});
                else
                    $('#passwordtrainer').JQPasswordInput("description", {text: passwordRegistration.description});
            };
            
            var updateWidgetsSuccessColor = function(lockedState, successState) {
                $('#passwordtrainer').JQPasswordInput("successColor", {isSuccessful: successState});

                switch(successState) {
                    case false:
                    case true:
                        break;
                    
                    default:
                        $('#passwordtrainer').JQPasswordInput("lock", {isLocked: lockedState});
                        break;
                }
            };
            
            var updateWidgetsStatus = function(leveledScore) {
                var formatter = new LeveledScoreFormatter();
                var leveledScoreDisplay = formatter.formatLeveledScore(leveledScore);
                var statusDisplay = formatter.formatStatus(leveledScore);
                
                if (!statusDisplay)
                    $('#passwordtrainer').JQPasswordInput("status", {text: leveledScoreDisplay});
                else
                    $('#passwordtrainer').JQPasswordInput("status", {text: leveledScoreDisplay + " (" + statusDisplay + ")"});
            };
        };
    }(jQuery)
);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var App;

(
    function($) {
        App = function() {
            this.prototype = new IApp();
            
            this.passwordHasher = new MD5PasswordHasher();
            this.passwordRegistrations = new PasswordRegistrationCollection(this.passwordHasher, new ScoreDataFeeHoursAndLockHoursComparator());

            this.passwordNotificator = new PasswordNotificator(this.passwordRegistrations, window);
            
            this.pageTrainPasswords = new PagePasswordTrainer(this);
            this.pageImportExport = new PageImportExport(this);
            this.pagePasswordManagePasswords = new PageManagePasswords(this);
            
            this.pagePasswordDialog = new PagePasswordDialog(this);
            
            
            this.init = function() {
                var appInstance = this;

                this.pageTrainPasswords.init();
                this.pageImportExport.init();
                this.pagePasswordManagePasswords.init();
                
                this.pagePasswordDialog.init();
            };
            
            this.readPasswordRegistrationsFromLocalStorage = function() {
                this.passwordRegistrations.importJSON(localStorage['passwordRegistrations']);
            };
            
            this.writePasswordRegistrationsToLocalStorage = function() {
                localStorage['passwordRegistrations'] = this.passwordRegistrations.exportJSON();
            };
            
            this.importJSON = function(json) {
                if (this.passwordRegistrations.importJSON(json)) {
                    this.writePasswordRegistrationsToLocalStorage();
                    
                    this.pageTrainPasswords.update();
                    $.mobile.changePage('#pageTrainPasswords');
                }
            };

            this.exportJSON = function() {
                return this.passwordRegistrations.exportJSON();
            };
            
            this.addPasswordRegistration = function(description, password) {
                this.passwordRegistrations.add(description, password);
                this.writePasswordRegistrationsToLocalStorage();
            };
            
            this.addPasswordAttempt = function(desc, password) {
                if (!this.passwordRegistrations)
                    return false;
                
                if (!this.passwordRegistrations.collection)
                    return false;
                
                var passwordRegistration = this.passwordRegistrations.collection[desc];
                
                if (!passwordRegistration)
                    return false;
                
                var leveledScore = new LeveledScore(passwordRegistration.scoreData);
                
                // parse salt value from stored hash
                var saltedHash = this.passwordHasher.parseSaltedHash(passwordRegistration.hash);
                
                if (!saltedHash)
                    return false;
                
                var hash = this.passwordHasher.generateSaltedHash(password, saltedHash.salt);
                if (hash != passwordRegistration.hash)
                    return false;
                
                if (!leveledScore.addSuccessfulAttempt())
                    return false;
                
                // rehash with a new salt on every attempt
                this.passwordRegistrations.rehash(desc, password);
                    
                this.writePasswordRegistrationsToLocalStorage();
                
                return true;
            };
            
            
            this.getMostRecentPasswordRegistration = function() {
                if (!this.passwordRegistrations)
                    return null;
                
                return this.passwordRegistrations.getMostRecentPasswordRegistration();
            };
        };
    }(jQuery)
);
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(
    function($) {
        var app;
        
        $(document).ready(
            function() {
                app = new App();
                app.init();
                app.readPasswordRegistrationsFromLocalStorage();
            }
        );
    }(jQuery)
);
