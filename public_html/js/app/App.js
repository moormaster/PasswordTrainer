var App = (
    function($) {
        class App extends IApp {
            constructor() {
                super();
            
                this.passwordHasher = new MD5PasswordHasher();
                
                var passwordRegistrations = new PasswordRegistrationCollection(new ScoreDataFeeHoursAndLockHoursComparator());
                this.applicationModel = new ApplicationModel(passwordRegistrations);
                
                this.passwordNotificator = new PasswordNotificator(passwordRegistrations, new NavigatorNotificator());
            
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
            
            readFromLocalStorage() {
                this.applicationModel.importJSON(localStorage['passwordRegistrations']);
            }
            
            writeToLocalStorage() {
                localStorage['passwordRegistrations'] = this.applicationModel.exportJSON();
            }
            
            importJSON(json) {
                if (this.applicationModel.importJSON(json)) {
                    this.writeToLocalStorage();
                    
                    this.pageTrainPasswords.update();
                    if ($)
                        $.mobile.changePage('#pageTrainPasswords');
                }
            }

            exportJSON() {
                return this.applicationModel.exportJSON();
            }
            
            addPasswordRegistration(description, password) {
                var hash = this.passwordHasher.generateSaltedHash(password, null)
                this.applicationModel.passwordRegistrations.add(description, hash);
                this.writeToLocalStorage();
            }
            
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
            
            getMostRecentPasswordRegistration() {
                if (!this.applicationModel)
                    return null;
                        
                if (!this.applicationModel.passwordRegistrations)
                    return null;
                
                return this.applicationModel.passwordRegistrations.getMostRecentPasswordRegistration();
            }
            
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
