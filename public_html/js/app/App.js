var App = (
    function($) {
        class App {
            constructor() {
                this.passwordHasher = new MD5PasswordHasher();
                
                // storage i.e. of password registrations
                var passwordRegistrations = new PasswordRegistrationCollection(new ScoreDataFeeHoursAndLockHoursComparator());
                this.applicationModel = new ApplicationModel(passwordRegistrations);
                
                /*
                 * password notificator
                 */
                this.passwordNotificator = new PasswordNotificator(passwordRegistrations, new NavigatorNotificator());
            
                /* 
                 * page instances
                 */
                this.pageTrainPasswords = new PagePasswordTrainer(this);
                this.pageImportExport = new PageImportExport(this);
                this.pagePasswordManagePasswords = new PageManagePasswords(this);
            
                this.pagePasswordDialog = new PagePasswordDialog(this);
            }
            
            /*
             * initialize jquery widgets and pages
             */
            init() {
                var appInstance = this;

                this.pageTrainPasswords.init();
                this.pageImportExport.init();
                this.pagePasswordManagePasswords.init();
                
                this.pagePasswordDialog.init();
            }
            
            /*
             * restore password registrations from localStorage
             */
            readFromLocalStorage() {
                this.applicationModel.importJSON(localStorage['passwordRegistrations']);
            }
            
            /*
             * persist password registration to local storage
             */
            writeToLocalStorage() {
                localStorage['passwordRegistrations'] = this.applicationModel.exportJSON();
            }
            
            /*
             * import password registrations from json string
             *
             * returns true if json string contains a valid persistence
             * of password registrations and import was successful.
             */
            importJSON(json) {
                if (this.applicationModel.importJSON(json)) {
                    this.writeToLocalStorage();
                    
                    this.pageTrainPasswords.update();
                    if ($)
                        $.mobile.changePage('#pageTrainPasswords');
                }
            }

            /*
             * export password registrations to a json string
             *
             * returns the json string
             */
            exportJSON() {
                return this.applicationModel.exportJSON();
            }
            
            /*
             * register a new password
             */
            addPasswordRegistration(description, password) {
                var hash = this.passwordHasher.generateSaltedHash(password, null)
                this.applicationModel.passwordRegistrations.add(description, hash);
                this.writeToLocalStorage();
            }
            
            /*
             * add a password input attempt with the given password on the given password registration
             */
            addPasswordAttempt(desc, password) {
                if (!this.applicationModel)
                    return false;
                
                if (!this.applicationModel.passwordRegistrations)
                    return false;
                
                var passwordRegistration = this.applicationModel.passwordRegistrations.get(desc);
                
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
                this.applicationModel.passwordRegistrations.update(desc, passwordRegistration);
                    
                this.writeToLocalStorage();
                
                return true;
            }
            
            /*
             * find the password registration with minimum lock time and maximum fee time
             */
            getMostRecentPasswordRegistration() {
                if (!this.applicationModel)
                    return null;
                        
                if (!this.applicationModel.passwordRegistrations)
                    return null;
                
                return this.applicationModel.passwordRegistrations.getMostRecentPasswordRegistration();
            }
            
            /*
             * find password registration by description
             */
            getPasswordRegistrationByDescription(description) {
                if (!this.applicationModel)
                    return null;
                    
                if (!this.applicationModel.passwordRegistrations)
                    return null;
                
                return this.applicationModel.passwordRegistrations.getPasswordRegistrationByDescription(description);
            }
        };
        
        return App;
    }(jQuery)
);
