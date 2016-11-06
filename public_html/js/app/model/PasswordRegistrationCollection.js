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
