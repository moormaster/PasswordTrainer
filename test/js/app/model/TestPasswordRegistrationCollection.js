// vi: ts=2 et

const assert = require('chai').assert
const PasswordRegistrationCollection =
  require('../../../../public/js/app/model/PasswordRegistrationCollection.js').PasswordRegistrationCollection

/*
 * scoreDataComparator which simply orders by timestamp
 */
class ScoreDataComparatorMock {
  constructor() {}

  compare(obj1, obj2) {
    if (obj1 == null) return -1

    if (obj2 == null) return 1

    if (obj1.lastSuccessTimestamp == null) return -1

    if (obj2.lastSuccessTimestamp == null) return 1

    if (obj1.lastSuccessTimestamp < obj2.lastSuccessTimestamp) return -1

    if (obj1.lastSuccessTimestamp > obj2.lastSuccessTimestamp) return 1

    return 0
  }
}

describe('PasswordRegistrationCollection', function () {
  beforeEach(function () {
    this.passwordRegistrationCollection = new PasswordRegistrationCollection(
      new ScoreDataComparatorMock(),
    )

    this.passwordRegistrationCollection.add('description1', 'abc')
    this.passwordRegistrationCollection.add('description2', 'cde')

    this.assertCollectionLength = function (assert, collection, expectedLength, message) {
      assert.equal(Object.keys(collection).length, expectedLength, message)
    }
  })

  describe('get()', function () {
    it('should return copies of password registration', function () {
      var originalRegistration = this.passwordRegistrationCollection.get('description1')
      var registration = this.passwordRegistrationCollection.get('description1')

      assert.isOk(originalRegistration !== registration)
    })

    it('should return registration for description1 if asked for', function () {
      var registration = this.passwordRegistrationCollection.get('description1')

      assert.isOk(registration.description == 'description1')
    })

    it('should return registration for description2 if asked for', function () {
      var registration = this.passwordRegistrationCollection.get('description2')

      assert.isOk(registration.description == 'description2')
    })
  })

  describe('getAll()', function () {
    it('should return a map containing all registrations', function () {
      var registrationsMap = this.passwordRegistrationCollection.getAll()

      assert.isOk(registrationsMap['description1'].description == 'description1')
      assert.isOk(registrationsMap['description2'].description == 'description2')
    })
  })

  describe('add()', function () {
    it('should have added 2 passwords', function () {
      this.assertCollectionLength(assert, this.passwordRegistrationCollection.getAll(), 2)
    })

    it('should not add an entry to the password collection when a password gets updated', function () {
      this.passwordRegistrationCollection.add('description1', 'different password')

      this.assertCollectionLength(assert, this.passwordRegistrationCollection.getAll(), 2)
    })

    it('should update the hash of the new password', function () {
      var hashBefore = this.passwordRegistrationCollection.get('description1').hash
      this.passwordRegistrationCollection.add('description1', 'different password')
      var hashAfter = this.passwordRegistrationCollection.get('description1').hash

      assert.isOk(hashBefore != hashAfter)
    })
  })

  describe('update()', function () {
    beforeEach(function () {
      this.passwordRegistrationCollection.add('rehash', 'hash:salt')
    })

    // 1) update the hash
    it('should update the password hash', function () {
      var originalRegistration = this.passwordRegistrationCollection.get('rehash')

      var registration = this.passwordRegistrationCollection.get('rehash')
      registration.hash = 'newhash:newsalt'

      this.passwordRegistrationCollection.update('rehash', registration)

      registration = this.passwordRegistrationCollection.get('rehash')

      assert.isOk(
        originalRegistration.description == registration.description,
        'description should not change',
      )
      assert.isOk(originalRegistration.hash != registration.hash, 'salted hash should have changed')
      assert.isOk(
        originalRegistration.scoreData.lastSuccessScore == registration.scoreData.lastSuccessScore,
        'rehash should not change scoreData',
      )
      assert.isOk(
        originalRegistration.scoreData.lastSuccessTimestamp ==
          registration.scoreData.lastSuccessTimestamp,
        'rehash should not change scoreData',
      )
    })

    // 2) update description
    it('should update the description', function () {
      var originalRegistration = this.passwordRegistrationCollection.get('rehash')

      var registration = this.passwordRegistrationCollection.get('rehash')
      registration.description = 'newdescription'

      this.passwordRegistrationCollection.update('rehash', registration)

      registration = this.passwordRegistrationCollection.get('newdescription')

      assert.isOk(
        originalRegistration.description != registration.description,
        'description should be changed',
      )
      assert.isOk(originalRegistration.hash == registration.hash, 'salted hash should not change')
      assert.isOk(
        originalRegistration.scoreData.lastSuccessScore == registration.scoreData.lastSuccessScore,
        'rehash should not change scoreData',
      )
      assert.isOk(
        originalRegistration.scoreData.lastSuccessTimestamp ==
          registration.scoreData.lastSuccessTimestamp,
        'rehash should not change scoreData',
      )
      assert.isOk(
        this.passwordRegistrationCollection.get('rehash') == null,
        'registration should have disappeared at description slot',
      )
    })
  })

  describe('getMostRecentPasswordRegistration()', function () {
    it('should return password registration for description2 as most recent after a successful attempt was made on the other password registration', function () {
      var passwordRegistration = this.passwordRegistrationCollection.get('description1')

      passwordRegistration.scoreData.lastSuccessScore = 1
      passwordRegistration.scoreData.lastSuccessTimestamp = new Date().getTime()

      this.passwordRegistrationCollection.update('description1', passwordRegistration)

      var mostRecent = this.passwordRegistrationCollection.getMostRecentPasswordRegistration()

      assert.equal(mostRecent.description, 'description2')
    })
  })
})
