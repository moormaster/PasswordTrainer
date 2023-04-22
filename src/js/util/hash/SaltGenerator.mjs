// vi: ts=2 et

export class SaltGenerator {
  constructor(length, charSet) {
    this.length = length // the desired length of the salt
    this.charSet = charSet // the desired charset

    if (!this.charSet)
      this.charSet =
        "!§$%&/()=?`´+*#'~0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }

  /*
   * Generates and returns a salt value (as specified by the constructor
   * parameters)
   */
  generate() {
    var salt = ''

    for (var i = 0; i < this.length; i++) {
      var rnd = Math.floor(Math.random() * this.charSet.length)

      salt += this.charSet[rnd]
    }

    return salt
  }
}
