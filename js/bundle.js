class IApp {
    constructor() {
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
    }



    /*
     * initialize jquery widgets and pages
     */
    init() {}

    /*
     * restore password registrations from localStorage
     */
    readPasswordRegistrationsFromLocalStorage() {}

    /*
     * persist password registration to local storage
     */
    writePasswordRegistrationsToLocalStorage() {}
    
    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations.
     */
    importJSON(json) {}

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    exportJSON() {}
    
    /*
     * register a new password
     */
    addPasswordRegistration(description, password) {}
    
    /*
     * add a password input attempt with the given password on the given password registration
     */
    addPasswordAttempt(passwordRegistration, password) {}
    
    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    getMostRecentPasswordRegistration() {}
    
    /*
     * find password registration by description
     */
    getPasswordRegistrationByDescription(description) {}

};
class IPasswordNotificator {
    constructor(passwordRegistrations, notificator) {
        // App instance
        this.app = null;
    }

    /*
     * show notification about the number of ready password registrations
     */
    notify() {}
};
class IComparator{
    constructor() {}
    
    /*
     * compares obj1 to obj2
     * 
     * returns
     *      -1 if obj1 is null or obj1 < obj2
     *      0  if obj1 is equally to obj2
     *      1  if obj1 > obj2 or obj2 is null
     */
    compare(obj1, obj2) {}
}
class ILeveledScore {
    constructor(scoreData) {
        this.scoreData = null;
    }
    
    setScoreData(scoreData) {}
    
    /*
     * add successful password attempt to score
     */
    addSuccessfulAttempt(dateOfAttempt) {}
    
    getFee(readDate) {}
    getScore(readDate) {}
    getLevel(readDate) {}
    
    getLockHoursLeft(readDate) {}
    getFeeHoursPassed(readDate) {}

    /*
     * score properties by current date/time
     */
    get score() {}
    get fee() {}
    get lockHoursLeft() {}
    get feeHoursPassed() {}
    get lockHours() {}
    get feePerHour() {}
    get level() {}
};
class IPasswordRegistrationCollection {
    constructor(scoreDataComparator) {
        this.scoreDataComparator = null;
    }
    
    /*
     * add new password registration
     */
    add(description, hash) {}
    
    /*
     * updates password registration from the given structure
     */
    update(description, registration) {}
    
    /*
     * returns the cloned password registration for the given description
     */
    get(description) {}
    
    /*
     * returns a map of all registrations
     */
    getAll() {}
    
    /*
     * find the password registration which is minimal according to the scoreDataComparator
     * (i.e. maximal feeHours or minimal lock hours)
     */
    getMostRecentPasswordRegistration() {}
    
    /*
     * find password registration by description
     */
    getPasswordRegistrationByDescription(description) {}

    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations.
     */
    importJSON(json) {}

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    exportJSON() {}
};
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
class IPagePasswordDialog {
    constructor(app) {
        // app instance where this page is displayed in
        this.appInstance = null;
    }
    
    /*
     * initialize jquery ui widgets
     */
    init() {}
};
class IPageManagePasswords {
    constructor (app) {
        // app instance where this page is displayed in
        this.appInstance = null;
    }
    
    /*
     * initialize jquery ui widgets
     */
    init() {};
    
    /*
     * update page display
     */
    update() {};
};
class IPagePasswordTrainer {
    constructor(app) {
        // app instance where this page is displayed in
        this.appInstance = null;

        // password registration instance which is currently shown
        this.currentPasswordRegistration = null;

        // leveled score instance of the password registration
        this.currentLeveledScore = null;

        // refresh interval id
        this.intervalId = null;
    }

    /*
     * initializes jquery ui widgets and page
     */
    init() {}
    
    /*
     * changes the displayed password registration
     */
    setPasswordRegistration(passwordRegistration) {}

    /*
     * update page display
     */
    update() {}

    /*
     * add a password input attempt with the given password
     */
    addPasswordAttempt(password) {}
};

 
class IPageImportExport {
    constructor(app) {
        // app instance where this page is displayed in
        this.appInstance = null;
    }

    /*
     * initialize jquery ui widgets
     */
    init() {};

    /*
     * perform export of password registrations
     */
    exportPasswordRegistrations() {};

    /*
     * perform import of password registrations
     */
    importPasswordRegistrations() {};
};
class IPasswordHasher {
    constructor(saltGenerator) {
        // the salt generator which shall be used
        this.saltGenerator = null;                
    }
    
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    generateSaltedHash(password, salt) {}
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    parseSaltedHash(hash) {}
};

class ISaltGenerator {
    constructor (length, charSet) {
        this.length = null;   // the desired length of the salt
        this.charSet = null;  // the desired charset
    }
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    generate() {}
};
class IJSONFormatter {
    constructor() {}
    
    /*
     * pretty formats the given JSON string
     */
    format(JSONStr) {}
};
class INotificator {
    constructor() {}
    
    /*
     * returns true if application may send notifications
     */
    hasNotificationPermission() {};

    /*
     * returns true if application may vibrate
     */
    hasVibrationPermission() {};
    
    /*
     * sends a new notification and returns an notification instance
     */
    notify(title, text) {};
};
class MD5PasswordHasher extends IPasswordHasher {
    constructor(saltGenerator) {
        super(saltGenerator);
        this.saltGenerator = new SaltGenerator(32, null);
    }
    
    /*
     * generate salted hash from given password
     * If no salt is given then the saltGenerator will be used to generate one
     */
    generateSaltedHash(password, salt) {
        if (salt == null)
            salt = this.saltGenerator.generate();
        
        if (!salt)
            // backward compatibility - check unsalted hash
            return CryptoJS.MD5(password).toString();
        else
            return CryptoJS.MD5(password + salt).toString() + ":" + salt;
    }
    
    /*
     * From a given hash value parse the salt and the password hash
     */
    parseSaltedHash(hash) {
        var index = null;
        if (hash && (index = hash.lastIndexOf(":")) >= 0 )
            return {salt: hash.substr(index+1), hash: hash.substring(0, index)};
        
        return {salt: "", hash: hash};
    }
};

class SaltGenerator extends ISaltGenerator {
    constructor(length, charSet) {
        super(length, charSet);
    
        this.length = length;   // the desired length of the salt
        this.charSet = charSet;  // the desired charset

        if (!this.charSet)
            this.charSet = '!§$%&/()=?`´+*#\'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    /*
     * Generates and returns a salt value (as specified by the constructor 
     * parameters)
     */
    generate() {
        var salt = "";

        for (var i=0;i<this.length;i++) {
            var rnd = Math.floor(Math.random()*this.charSet.length);

            salt += this.charSet[rnd]
        }

        return salt;
    }
};
class JSONFormatter extends IJSONFormatter {
    constructor() {
        super();
    }
    
    format (JSONStr) {
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
    }
};
class NavigatorNotificator extends INotificator{
    constructor() {
        super();
        
        this.navigator = navigator;

        // use current window instance per default
        this.setWindow(window);

        if (this.Notification)
            this.Notification.requestPermission();
    }
    
    setWindow(window) {
        this.Notification = window.Notification;
    }
    
    hasNotificationPermission() {
        if (!this.Notification)
            return false;
        
        if (this.Notification.permission != "granted")
            return false;
        
        return true;
    }

    hasVibrationPermission() {
        if (!this.navigator)
            return false;
        
        if (!this.navigator.vibrate)
            return false;
        
        return true;
    }
    
    notify(title, text, vibrationLengthInMs) {
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
    }
};
class ScoreDataFeeHoursAndLockHoursComparator extends IComparator {
    constructor() {
        super();
    }
    
    compare(obj1, obj2) {
        if (obj1 == null)
            return -1;
        
        if (obj2 == null)
            return 1;
        
        var leveledScore1 = new LeveledScore(obj1);
        var leveledScore2 = new LeveledScore(obj2);
        
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
var LeveledScore = (
    function() {
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

        class LeveledScore extends ILeveledScore {
            constructor(scoreData) {
                super(scoreData);

                this.setScoreData(scoreData);
            }

            setScoreData(scoreData) {
                this.scoreData = scoreData;

                if (this.scoreData == null) {
                    this.scoreData = {
                        lastSuccessScore:   null,
                        lastSuccessTimestamp:  null
                    };
                }
            }

            addSuccessfulAttempt(dateOfAttempt) {
                if (dateOfAttempt == null)
                    dateOfAttempt = new Date().getTime();

                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
                var lockHoursLeft = getLockHoursLeft(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, dateOfAttempt);

                if (lockHoursLeft > 0)
                    return false;

                var lastScore = this.getScore(dateOfAttempt);

                this.scoreData.lastSuccessScore = lastScore+1;
                this.scoreData.lastSuccessTimestamp = dateOfAttempt;

                return true;
            }

            getFee(readDate) {
                if (this.scoreData.lastSuccessTimestamp == null)
                    return 0;

                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);
                var feeHoursPassed = Math.floor(getFeeHoursPassed(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate));

                var fee = feeHoursPassed*this.feePerHour;

                if (fee > this.scoreData.lastSuccessScore)
                    return this.scoreData.lastSuccessScore;

                return fee;
            }

            getScore(readDate) {
                if (this.scoreData.lastSuccessTimestamp == null)
                    return 0;

                return this.scoreData.lastSuccessScore - this.getFee(readDate);
            }

            getLevel(readDate) {
                return getLevel(this.getScore(readDate));
            }

            getLockHoursLeft(readDate) {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getLockHoursLeft(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate);
            }

            getFeeHoursPassed(readDate) {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getFeeHoursPassed(lastSuccessLevel, this.scoreData.lastSuccessTimestamp, readDate);
            }

            get score() {
                return this.getScore(new Date());
            }

            get fee() {
                return this.getFee(new Date());
            }

            get lockHoursLeft() {
                return this.getLockHoursLeft(new Date());
            }

            get feeHoursPassed() {
                return this.getFeeHoursPassed(new Date());
            }

            get lockHours() {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getLockHours(lastSuccessLevel);
            }

            get feePerHour() {
                var lastSuccessLevel = getLevel(this.scoreData.lastSuccessScore);

                return getFeePerHour(lastSuccessLevel);
            }

            get level() {
                return this.getLevel(new Date());
            }
        };
        
        return LeveledScore;
    }
)();
var PasswordRegistrationCollection = (
        function() {
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
            
            /*
             * Clones data of a password registration
             */
            var clonePasswordRegistrationData = function(sourceRegistration, targetRegistration) {
                targetRegistration.description = sourceRegistration.description;
                targetRegistration.hash = sourceRegistration.hash;
                targetRegistration.scoreData.lastSuccessScore = sourceRegistration.scoreData.lastSuccessScore;
                targetRegistration.scoreData.lastSuccessTimestamp = sourceRegistration.scoreData.lastSuccessTimestamp;

            };

            class PasswordRegistrationCollection extends IPasswordRegistrationCollection {
                constructor(scoreDataComparator) {
                    super(scoreDataComparator);

                    this.scoreDataComparator = scoreDataComparator;

                    this.collection = {};
                }

                /*
                 * import password registrations from json string
                 *
                 * returns true if json string contains a valid persistence
                 * of password registrations.
                 */
                importJSON(json) {
                    var passwordRegistrations = "";

                    if (json)
                        passwordRegistrations = JSON.parse(json);

                    if (!isPasswordRegistrationIntegrityOk(passwordRegistrations))
                        return false;

                    this.collection = passwordRegistrations;

                    return true;
                }

                /*
                 * export password registrations to a json string
                 *
                 * returns the json string
                 */
                exportJSON() {
                    return JSON.stringify(this.collection);
                }

                /*
                 * add new password registration
                 */
                add(description, hash) {
                    this.collection[description] =
                    {
                        description:    description,
                        hash:           hash,
                        scoreData:      {
                            lastSuccessScore:   null,
                            lastSuccessTimestamp:  null
                        }
                    };
                }
                
                /*
                * updates password registration from the given structure
                */
                update(description, registration) {
                    if (!this.collection[description])
                        return false;
                   
                    if (registration.description != description) {
                        // description was changed
                       
                        // check if slot for new description name is free
                        if (this.collection[registration.description])
                            return false;
                       
                        // move registration to new slot
                        this.collection[registration.description] = this.collection[description];
                        this.collection[description] = null;
                    }
                   
                    // set new values
                    var targetRegistration = this.collection[registration.description];
                    clonePasswordRegistrationData(registration, targetRegistration);
                }
                
                /*
                 * returns the cloned password registration for the given description
                 */
                get(description) {
                    if (!this.collection[description])
                        return null;
                    
                    var registration =  {
                                            description:    null,
                                            hash:           null,
                                            scoreData:      {
                                                lastSuccessScore:   null,
                                                lastSuccessTimestamp:  null
                                            }
                                        };

                    clonePasswordRegistrationData(this.collection[description], registration);
                    
                    return registration;
                }
                
                /*
                * returns a map of all registrations
                */
                getAll() {
                    var map = [];
                    
                    for (var desc in this.collection)
                        map[desc] = this.get(desc);
                    
                    return map;
                }

                getMostRecentPasswordRegistration() {
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
                }
                
                getPasswordRegistrationByDescription(description) {
                    return this.collection[description];
                }
            };
            
            return PasswordRegistrationCollection;
        }
)();
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
var LeveledScoreFormatter = (
    function() {
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
        
        class LeveledScoreFormatter extends ILeveledScoreFormatter {
            constructor() {
                super();
            }

            /*
             * returns a formatted string describing the status of the leveled score
             * (locked time, fee amount)
             */
            formatStatus(leveledScore) {
                if (leveledScore.fee)
                    return this.formatFee(leveledScore) + " fee";

                if (leveledScore.lockHoursLeft)
                    return "locked for " + formatTime(leveledScore.lockHoursLeft*60*60*1000);
            }

            /*
             * returns a formatted string describing score and level
             */
            formatLeveledScore(leveledScore) {
                return "Score " + this.formatScore(leveledScore) + " / Level " + this.formatLevel(leveledScore);
            }

            /*
             * returns a formatted string describing the score points
             */
            formatScore(leveledScore) {
                return Math.round(leveledScore.score*100)/100;
            }

            /*
             * returns a formatted string describing the fee points
             */
            formatFee(leveledScore) {
                return Math.round(leveledScore.fee*100)/100;
            }

            /*
             * returns a formatted string describing the level
             */
            formatLevel(leveledScore) {
                return leveledScore.level;
            }
        };

        return LeveledScoreFormatter;
    }
)();

var PagePasswordDialog = (
    function($) {
        class PagePasswordDialog extends IPagePasswordDialog{
            constructor(app) {
                super(app);
                
                this.prototype = new IPagePasswordDialog(app);
            
                this.appInstance = app;
            }
            
            init() {
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
            }
        };
        
        return PagePasswordDialog;
    }
)(jQuery);
var PageManagePasswords = (
    function($) {
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

            var passwordRegistrationsMap = passwordRegistrations.getAll();
            for (var desc in passwordRegistrationsMap) {
                var passwordRegistration = passwordRegistrationsMap[desc];

                var formatter = new LeveledScoreFormatter();
                var leveledScore = new LeveledScore(passwordRegistration.scoreData);

                tableSelector.JQPassword("init", {skeleton: tableLineSkeleton});
                var passwordSelector = tableSelector.find('.password:last');

                passwordSelector.JQPassword("description", {value: desc});
                passwordSelector.JQPassword("score", {value: formatter.formatScore(leveledScore)});
                passwordSelector.JQPassword("level", {value: formatter.formatLevel(leveledScore)});
                passwordSelector.JQPassword("status", {value: formatter.formatStatus(leveledScore)});
            }
        };

        class PageManagePasswords extends IPageManagePasswords {
            constructor(app) {
                super(app);
                
                this.prototype = new IPageManagePasswords(app);
                
                // app instance where this page is displayed in
                this.appInstance = app;
            }

            /*
             * initialize jquery ui widgets
             */
            init() {
                var pageInstance = this;
                
                this.tableSelector = $('#pageManagePasswords .passwordTable');

                $('#pageManagePasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
            }

            /*
             * update page display
             */
            update() {
                updateTable(this.tableSelector, this.appInstance.passwordRegistrations);
            }
        };
        
        return PageManagePasswords;
    }
)(jQuery);var PageImportExport = (
    function($) {
        class PageImportExport extends IPageImportExport {
            constructor(app) {
                super(app);
            
                this.appInstance = app;
            }
            
            init() {
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
            }
            
            exportPasswordRegistrations() {
                var json = this.appInstance.exportJSON();
                var formatter = new JSONFormatter();
                json = formatter.format(json);
                
                $('#importexportfield').val(json);
            }
            
            importPasswordRegistrations() {
                var json = $('#importexportfield').val();
                
                this.appInstance.importJSON(json);
            }
        };
        
        return PageImportExport;
    }
)(jQuery);
var PagePasswordTrainer = (
    function($) {
        var activateInterval = function(pageInstance) {
            if (pageInstance.intervalId)
                return false;
            
            pageInstance.intervalId = window.setInterval(
                function() {
                    pageInstance.update();
                },
                1000
            );
            
            return true;
        };

        var clearInterval = function(pageInstance) {
            if (!pageInstance.intervalId)
                return false;

            window.clearInterval(pageInstance.intervalId);
            pageInstance.intervalId = null;

            return true;
        };

        var interruptInterval = function(pageInstance, interruptDurationMs) {
            clearInterval(pageInstance);

            window.setTimeout(
                function() {
                    activateInterval(pageInstance);
                },
                interruptDurationMs
            );

            return true;
        };

        var updateWidgets = function(successState) {
            updateWidgetSelectionValues(this.appInstance.passwordRegistrations, this.currentPasswordRegistration, this.autoSwitchToMostRecentPasswordRegistration);
            updateWidgetDescription(this.currentPasswordRegistration);
            updateWidgetsSuccessColor((this.currentLeveledScore.lockHoursLeft > 0), successState);
            updateWidgetsStatus(this.currentLeveledScore);
        };
        
        var updateWidgetSelectionValues = function(availablePasswordRegistrationsCollection, currentPasswordRegistration, updateSelection) {
            var formatter = new LeveledScoreFormatter();
            
            var selectedKey = $('#pageTrainPasswords #select-password').val();
            if (updateSelection)
                selectedKey = currentPasswordRegistration.description;
            
            $('#pageTrainPasswords #select-password').find('option').remove();
            var availablePasswordRegistrations = availablePasswordRegistrationsCollection.getAll();
            for (var key in availablePasswordRegistrations) {
                var leveledScore = new LeveledScore(availablePasswordRegistrations[key].scoreData);
                var description  = availablePasswordRegistrations[key].description;
                
                var statusDisplay = formatter.formatStatus(leveledScore);
                var display = description;
                
                // password registrations which are locked are not part of the selection choice
                // unless they are selected
                if (key != currentPasswordRegistration.description && leveledScore.lockHoursLeft > 0)
                    continue;
                
                display = display;

                if (key == selectedKey)
                    $('#pageTrainPasswords #select-password').append("<option value=\"" + key + "\" selected=\"selected\">" + display + "</option>");
                else
                    $('#pageTrainPasswords #select-password').append("<option value=\"" + key + "\">" + display + "</option>");
            }
            

            
            $('#pageTrainPasswords #select-password').val(selectedKey);
            $('#pageTrainPasswords #select-password').selectmenu("refresh");
        }

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
        
        class PagePasswordTrainer extends IPagePasswordTrainer {
            constructor(app) {
                super(app);

                this.prototype = new IPagePasswordTrainer(app);

                this.appInstance = app;
                this.currentPasswordRegistration = null;
                this.mostRecentPasswordRegistration = null;
                this.currentLeveledScore = new LeveledScore();
                
                this.autoSwitchToMostRecentPasswordRegistration = true;

                this.intervalId = null;
            }
            
            /*
             * initializes widgets and auto page update
             */
            init() {
                var pageInstance = this;
                var appInstance = pageInstance.appInstance;
                
                $('#passwordtrainer .password').JQPasswordInput();
                $('#passwordtrainer .password').on('passwordEntered',
                    function(e, password) {
                        $(this).val("");
                        
                        interruptInterval(pageInstance, 1000);
                        var success = pageInstance.addPasswordAttempt(password);

                        pageInstance.autoSwitchToMostRecentPasswordRegistration = true;
                        updateWidgets.call(pageInstance, success);
                    }
                );
                
                $('#pageTrainPasswords #select-password').on('focus',
                    function(e) {
                        clearInterval(pageInstance);
                    }
                );
                
                $('#pageTrainPasswords #select-password').on('blur',
                    function(e) {
                        activateInterval(pageInstance);
                    }
                );
                
                $('#pageTrainPasswords #select-password').on('click',
                    function(e) {

                    }
                );
                
                $('#pageTrainPasswords #select-password').on('change',
                    function(e, currentPasswordRegistrationKey) {
                        pageInstance.autoSwitchToMostRecentPasswordRegistration = false;
                        pageInstance.setPasswordRegistration(appInstance.getPasswordRegistrationByDescription($('#pageTrainPasswords #select-password').val()));
                        updateWidgets.call(pageInstance, null);
                        
                        if (activateInterval(pageInstance))
                            $(e.target).blur();
                    }
                );
                
                $('#pageTrainPasswords').on('pageshow', 
                    function(e) {
                        pageInstance.update();
                    }
                );
                
                activateInterval(pageInstance);
            }
            
            setPasswordRegistration(passwordRegistration) {
                if (!passwordRegistration)
                    return false;
                
                this.currentPasswordRegistration = passwordRegistration;
                
                if (!this.currentPasswordRegistration)
                    this.currentLeveledScore.setScoreData(null);
                else
                    this.currentLeveledScore.setScoreData(this.currentPasswordRegistration.scoreData);
                
                updateWidgets.call(this, true);
                
                return true;
            }
            
            setMostRecentPasswordRegistration() {
                this.mostRecentPasswordRegistration = this.appInstance.getMostRecentPasswordRegistration();
            }
            
            addPasswordAttempt(password) {
                if (!this.appInstance)
                    return false;
                
                return this.appInstance.addPasswordAttempt(this.currentPasswordRegistration.description, password);
            }
            
            update() {
                this.setMostRecentPasswordRegistration();
                if (this.autoSwitchToMostRecentPasswordRegistration)
                    this.setPasswordRegistration(this.mostRecentPasswordRegistration);
                
                updateWidgets.call(this);
                
                this.appInstance.passwordNotificator.notify();
            }
        };
        
        return PagePasswordTrainer;
    }(jQuery)
);
var PasswordNotificator = (
    function() {
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

            var passwordRegistrationsMap = this.passwordRegistrations.getAll();

            for (var desc in passwordRegistrationsMap) {
                var passwordRegistration = passwordRegistrationsMap[desc];

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

        class PasswordNotificator extends IPasswordNotificator {
            constructor(passwordRegistrations, notificator) {
                super(passwordRegistrations, notificator);

                this.passwordRegistrations = passwordRegistrations;
                this.notificator = notificator;

                this.activeNotifications = [];
                this.lastNotificationPasswordCount = null;
            }

            notify() {
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
            }
        };

        return PasswordNotificator;
    }
)();var App = (
    function($) {
        class App extends IApp {
            constructor() {
                super();
            
                this.passwordHasher = new MD5PasswordHasher();
                this.passwordRegistrations = new PasswordRegistrationCollection(new ScoreDataFeeHoursAndLockHoursComparator());

                this.passwordNotificator = new PasswordNotificator(this.passwordRegistrations, new NavigatorNotificator());
            
                this.pageTrainPasswords = new PagePasswordTrainer(this);
                this.pageImportExport = new PageImportExport(this);
                this.pagePasswordManagePasswords = new PageManagePasswords(this);
            
                this.pagePasswordDialog = new PagePasswordDialog(this);
            }
                        
            init() {
                var appInstance = this;

                this.pageTrainPasswords.init();
                this.pageImportExport.init();
                this.pagePasswordManagePasswords.init();
                
                this.pagePasswordDialog.init();
            }
            
            readPasswordRegistrationsFromLocalStorage() {
                this.passwordRegistrations.importJSON(localStorage['passwordRegistrations']);
            }
            
            writePasswordRegistrationsToLocalStorage() {
                localStorage['passwordRegistrations'] = this.passwordRegistrations.exportJSON();
            }
            
            importJSON(json) {
                if (this.passwordRegistrations.importJSON(json)) {
                    this.writePasswordRegistrationsToLocalStorage();
                    
                    this.pageTrainPasswords.update();
                    if ($)
                        $.mobile.changePage('#pageTrainPasswords');
                }
            }

            exportJSON() {
                return this.passwordRegistrations.exportJSON();
            }
            
            addPasswordRegistration(description, password) {
                var hash = this.passwordHasher.generateSaltedHash(password, null)
                this.passwordRegistrations.add(description, hash);
                this.writePasswordRegistrationsToLocalStorage();
            }
            
            addPasswordAttempt(desc, password) {
                if (!this.passwordRegistrations)
                    return false;
                
                var passwordRegistration = this.passwordRegistrations.get(desc);
                
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
                passwordRegistration.hash = this.passwordHasher.generateSaltedHash(password, null);
                this.passwordRegistrations.update(desc, passwordRegistration);
                    
                this.writePasswordRegistrationsToLocalStorage();
                
                return true;
            }
            
            getMostRecentPasswordRegistration() {
                if (!this.passwordRegistrations)
                    return null;
                
                return this.passwordRegistrations.getMostRecentPasswordRegistration();
            }
            
            getPasswordRegistrationByDescription(description) {
                if (!this.passwordRegistrations)
                    return null;
                
                return this.passwordRegistrations.getPasswordRegistrationByDescription(description);
            }
        };
        
        return App;
    }(jQuery)
);
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
