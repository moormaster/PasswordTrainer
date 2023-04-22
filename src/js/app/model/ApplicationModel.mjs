// vi: ts=2 et

export class ApplicationModel {
  constructor(passwordRegistrationCollection) {
    this.passwordRegistrations = passwordRegistrationCollection
  }

  /*
   * import password registrations from json string
   *
   * returns true if json string contains a valid persistence
   * of password registrations and import was successful.
   */
  importJSON(json) {
    var objectStructure = null

    if (json) objectStructure = JSON.parse(json)

    if (!this.import(objectStructure)) return false

    return true
  }

  /*
   * export password registrations to a json string
   *
   * returns the json string
   */
  exportJSON() {
    return JSON.stringify(this.export())
  }

  /*
   * import from object structure
   *
   * returns true if successful
   */
  import(object) {
    if (!this.passwordRegistrations.import(object)) return false

    return true
  }

  /*
   * export password registrations to an object structure
   *
   * returns the object structure
   */
  export() {
    var objectStructure = this.passwordRegistrations.export()

    return objectStructure
  }
}
