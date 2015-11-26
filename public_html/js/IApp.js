var IApp = function() {
			// password registration dictionary
            this.passwordRegistrations = {};
            
			/* 
			 * page instances
			 */
            this.pageTrainPasswords = null;
            this.pageImportExport = null;

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
			 * import password registrations from json string
			 *
			 * returns true if json string contains a valid persistence
			 * of password registrations.
			 */
            this.importPasswordRegistrations = function(json) {};
            
			/*
			 * export password registrations to a json string
			 *
			 * returns the json string
			 */
            this.exportPasswordRegistrations = function() {};
            
			/*
			 * add new password registration
			 */
            this.addPasswordRegistration = function(description, password) {};
			
			/*
			 * add a password input attempt with the given password on the given password registration
			 */
			this.addPasswordAttempt = function(passwordRegistration, password) {};
        };
