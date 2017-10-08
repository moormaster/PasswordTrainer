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
                 * import from object structure
                 *
                 * returns true if successful
                 */
                import(passwordRegistrations) {
                    if (!isPasswordRegistrationIntegrityOk(passwordRegistrations))
                        return false;

                    this.collection = passwordRegistrations;

                    return true;
                }

                /*
                 * export password registrations to an object structure
                 *
                 * returns the object structure
                 */
                export() {
                    return this.collection;
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
