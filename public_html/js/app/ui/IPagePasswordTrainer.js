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

