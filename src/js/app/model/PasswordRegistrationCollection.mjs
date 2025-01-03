// vi: ts=2 et

export var PasswordRegistrationCollection = (function () {
  /*
   * checks the given dictionary if it is a valid password registration container
   */
  var isPasswordRegistrationIntegrityOk = function (passwordRegistration) {
    if (!passwordRegistration) return false

    for (var desc in passwordRegistration) {
      var currentRegistration = passwordRegistration[desc]

      if (!currentRegistration) return false

      if (currentRegistration.description != desc) return false

      if (!currentRegistration.scoreData) return false
    }

    return true
  }

  /*
   * Clones data of a password registration
   */
  var clonePasswordRegistrationData = function (sourceRegistration, targetRegistration) {
    targetRegistration.description = sourceRegistration.description
    targetRegistration.hash = sourceRegistration.hash
    targetRegistration.scoreData.lastSuccessScore = sourceRegistration.scoreData.lastSuccessScore
    targetRegistration.scoreData.lastSuccessTimestamp =
      sourceRegistration.scoreData.lastSuccessTimestamp
  }

  class PasswordRegistrationCollection {
    constructor(scoreDataComparator) {
      this.scoreDataComparator = scoreDataComparator

      this.collection = {}
    }

    /*
     * import from object structure
     *
     * returns true if successful
     */
    import(passwordRegistrations) {
      if (!isPasswordRegistrationIntegrityOk(passwordRegistrations)) return false

      this.collection = passwordRegistrations

      return true
    }

    /*
     * export password registrations to an object structure
     *
     * returns the object structure
     */
    export() {
      return this.collection
    }

    /*
     * add new password registration
     */
    add(description, hash) {
      this.collection[description] = {
        description: description,
        hash: hash,
        scoreData: {
          lastSuccessScore: null,
          lastSuccessTimestamp: null,
        },
      }
    }

    /*
     * deletes password registration having the given description
     */
    delete(description) {
      if (!this.collection[description]) return false

      delete this.collection[description]

      return true
    }
    /*
     * updates password registration from the given structure
     */
    update(description, registration) {
      if (!this.collection[description]) return false

      if (registration.description != description) {
        // description was changed

        // move registration to new slot
        this.collection[registration.description] = this.collection[description]
        delete this.collection[description]
      }

      // set new values
      var targetRegistration = this.collection[registration.description]
      clonePasswordRegistrationData(registration, targetRegistration)
    }

    /*
     * Resets score data on the given password registration
     */
    resetScoreData(description) {
      let existingRegistration = this.collection[description]

      if (!existingRegistration) return false

      existingRegistration.scoreData = {
        lastSuccessScore: null,
        lastSuccessTimestamp: null,
      }
    }

    /*
     * returns the cloned password registration for the given description
     */
    get(description) {
      if (!this.collection[description]) return null

      let registration = this.collection[description]
      if (registration == null) return null

      return {
        ...registration,
        scoreData: { ...registration.scoreData },
      }
    }

    /*
     * returns a map of all registrations
     */
    getAll() {
      var map = []

      for (var desc in this.collection) map[desc] = this.get(desc)

      return map
    }

    /*
     * find the password registration which is minimal according to the scoreDataComparator
     * (i.e. maximal feeHours or minimal lock hours)
     */
    getMostRecentPasswordRegistration() {
      if (!this.scoreDataComparator) return null

      var mostRecentInstance = null

      // determine instance with max fee hours passed and minimal lock hours left
      for (var key in this.collection) {
        var passwordRegistration = this.collection[key]
        var scoreData = passwordRegistration.scoreData

        if (
          mostRecentInstance == null ||
          this.scoreDataComparator.compare(scoreData, mostRecentInstance.scoreData) < 0
        )
          mostRecentInstance = passwordRegistration
      }

      if (mostRecentInstance == null) return null

      return {
        ...mostRecentInstance,
        scoreData: { ...mostRecentInstance.scoreData },
      }
    }
  }

  return PasswordRegistrationCollection
})()
