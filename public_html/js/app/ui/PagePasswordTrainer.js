// vi: ts=4 et

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
            updateWidgetSelectionValues(this.appInstance.applicationModel.passwordRegistrations, this.currentPasswordRegistration, this.autoSwitchToMostRecentPasswordRegistration);
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

        class PagePasswordTrainer {
            constructor(app) {
                // app instance where this page is displayed in
                this.appInstance = app;

                // password registration instance which is currently shown
                this.currentPasswordRegistration = null;


                // leveled score instance of the password registration
                this.currentLeveledScore = new LeveledScore();

                // refresh interval id
                this.intervalId = null;

                this.mostRecentPasswordRegistration = null;
                this.autoSwitchToMostRecentPasswordRegistration = true;
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
