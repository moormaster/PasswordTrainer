var PasswordRegistrationCollection;

PasswordRegistrationCollection = function(passwordHasher) {
    this.prototype = new IPasswordRegistrationCollection(passwordHasher);
    
    this.passwordHasher = passwordHasher;

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
            return;
        
        this.collection[description].hash = this.passwordHasher.generateSaltedHash(password, null);
    };

    this.getMostRecentPasswordRegistration = function() {
        var maxHours = null;
        var mostRecentInstance = null;

        var leveledScore = new LeveledScore();

        // determine instance with max fee hours passed and minimal lock hours left
        for (var key in this.collection) {
            var passwordRegistration = this.collection[key];

            leveledScore.setScoreData(passwordRegistration.scoreData);

            var hours = leveledScore.feeHoursPassed - leveledScore.lockHoursLeft;

            if (maxHours == null || maxHours < hours) {
                maxHours = hours;
                mostRecentInstance = passwordRegistration;
            }
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
