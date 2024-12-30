// vi: ts=2 et

import { PasswordNotificator } from './PasswordNotificator.mjs'
import { ScoreDataFeeHoursAndLockHoursComparator } from './comparator/ScoreDataFeeHoursAndLockHoursComparator.mjs'
import { ApplicationModel } from './model/ApplicationModel.mjs'
import { PasswordRegistrationCollection } from './model/PasswordRegistrationCollection.mjs'
import { LeveledScore } from './model/LeveledScore.mjs'
import { MD5PasswordHasher } from '../util/hash/MD5PasswordHasher.mjs'
import { NavigatorNotificator } from '../util/notification/NavigatorNotificator.mjs'
import { SaltGenerator } from '../util/hash/SaltGenerator.mjs'

export var App = (function () {
  class App {
    constructor() {
      var saltGenerator = new SaltGenerator(32, null)
      this.passwordHasher = new MD5PasswordHasher(saltGenerator)

      // storage i.e. of password registrations
      var passwordRegistrations = new PasswordRegistrationCollection(
        new ScoreDataFeeHoursAndLockHoursComparator(),
      )
      this.applicationModel = new ApplicationModel(passwordRegistrations)

      /*
       * password notificator
       */
      this.passwordNotificator = new PasswordNotificator(
        passwordRegistrations,
        new NavigatorNotificator(),
      )
    }

    /*
     * restore password registrations from localStorage
     */
    readFromLocalStorage() {
      this.applicationModel.importJSON(localStorage['passwordRegistrations'])
    }

    /*
     * persist password registration to local storage
     */
    writeToLocalStorage() {
      localStorage['passwordRegistrations'] = this.applicationModel.exportJSON()
    }

    /*
     * import password registrations from json string
     *
     * returns true if json string contains a valid persistence
     * of password registrations and import was successful.
     */
    importJSON(json) {
      if (this.applicationModel.importJSON(json)) {
        this.writeToLocalStorage()

        return true
      }

      return false
    }

    /*
     * export password registrations to a json string
     *
     * returns the json string
     */
    exportJSON() {
      return this.applicationModel.exportJSON()
    }

    /*
     * register a new password
     */
    addPasswordRegistration(description, password) {
      var hash = this.passwordHasher.generateSaltedHash(password, null)
      this.applicationModel.passwordRegistrations.add(description, hash)
      this.writeToLocalStorage()
    }

    /*
     * add a password input attempt with the given password on the given password registration
     */
    addPasswordAttempt(desc, password) {
      if (!this.applicationModel) return false

      if (!this.applicationModel.passwordRegistrations) return false

      var passwordRegistration = this.applicationModel.passwordRegistrations.get(desc)

      if (!passwordRegistration) return false

      var leveledScore = new LeveledScore(passwordRegistration.scoreData)

      if (!this.validatePassword(password, passwordRegistration.hash)) return false

      if (!leveledScore.addSuccessfulAttempt()) return false

      // rehash with a new salt on every attempt
      passwordRegistration.hash = this.passwordHasher.generateSaltedHash(password, null)
      this.applicationModel.passwordRegistrations.update(desc, passwordRegistration)

      this.writeToLocalStorage()

      return true
    }

    /*
     * Validates the given password against a stored hash value.
     */
    validatePassword(password, storedHash) {
      // parse salt value from stored hash
      var saltedHash = this.passwordHasher.parseSaltedHash(storedHash)

      if (!saltedHash) return false

      var hash = this.passwordHasher.generateSaltedHash(password, saltedHash.salt)
      if (hash != storedHash) return false

      return true
    }

    /*
     * deletes password registration having the given description
     */
    deletePasswordRegistration(description) {
      if (!this.applicationModel.passwordRegistrations.delete(description)) return false

      this.writeToLocalStorage()

      return true
    }

    /*
     * find the password registration with minimum lock time and maximum fee time
     */
    getMostRecentPasswordRegistration() {
      if (!this.applicationModel) return null

      if (!this.applicationModel.passwordRegistrations) return null

      return this.applicationModel.passwordRegistrations.getMostRecentPasswordRegistration()
    }

    /*
     * get password registration by description
     */
    getPasswordRegistrationByDescription(description) {
      if (!this.applicationModel) return null

      if (!this.applicationModel.passwordRegistrations) return null

      return this.applicationModel.passwordRegistrations.get(description)
    }

    /*
     * Update an existing password registration
     */
    updatePasswordRegistration(description, newDescription, newPassword) {
      let existingRegistration = this.applicationModel.passwordRegistrations.get(description)

      if (!existingRegistration) return false

      existingRegistration.description = newDescription

      let hasPasswordChanged =
        newPassword && !this.validatePassword(newPassword, existingRegistration.hash)
      if (hasPasswordChanged)
        existingRegistration.hash = this.passwordHasher.generateSaltedHash(newPassword, null)

      this.applicationModel.passwordRegistrations.update(description, existingRegistration)

      if (hasPasswordChanged)
        this.applicationModel.passwordRegistrations.resetScoreData(newDescription)

      this.writeToLocalStorage()

      return true
    }
  }

  return App
})()
