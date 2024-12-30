// vi: ts=2 et

import { assert } from 'chai'
import { beforeEach, describe, it } from 'vitest'
import { PasswordRegistrationCollection } from '../../../../src/js/app/model/PasswordRegistrationCollection.mjs'

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

function assertCollectionLength(assert, collection, expectedLength, message) {
  assert.equal(Object.keys(collection).length, expectedLength, message)
}

let passwordRegistrationCollection

describe('PasswordRegistrationCollection', function () {
  beforeEach(function () {
    passwordRegistrationCollection = new PasswordRegistrationCollection(
      new ScoreDataComparatorMock(),
    )

    passwordRegistrationCollection.add('description1', 'abc')
    passwordRegistrationCollection.add('description2', 'cde')
  })

  describe('get()', function () {
    it('should return copies of password registration', function () {
      var originalRegistration = passwordRegistrationCollection.get('description1')
      var registration = passwordRegistrationCollection.get('description1')

      assert.isOk(originalRegistration !== registration)
    })

    it('should return registration for description1 if asked for', function () {
      var registration = passwordRegistrationCollection.get('description1')

      assert.isOk(registration.description == 'description1')
    })

    it('should return registration for description2 if asked for', function () {
      var registration = passwordRegistrationCollection.get('description2')

      assert.isOk(registration.description == 'description2')
    })
  })

  describe('getAll()', function () {
    it('should return copies of password registrations', function () {
      var originalRegistrations = passwordRegistrationCollection.getAll()
      var registrations = passwordRegistrationCollection.getAll()

      assert.isOk(originalRegistrations['description1'] !== registrations['description1'])
      assert.isOk(originalRegistrations['description2'] !== registrations['description2'])
    })

    it('should return a map containing all registrations', function () {
      var registrationsMap = passwordRegistrationCollection.getAll()

      assert.isOk(registrationsMap['description1'].description == 'description1')
      assert.isOk(registrationsMap['description2'].description == 'description2')
    })
  })

  describe('add()', function () {
    it('should have added 2 passwords', function () {
      assertCollectionLength(assert, passwordRegistrationCollection.getAll(), 2)
    })

    it('should not add an entry to the password collection when a password gets updated', function () {
      passwordRegistrationCollection.add('description1', 'different password')

      assertCollectionLength(assert, passwordRegistrationCollection.getAll(), 2)
    })

    it('should update the hash of the new password', function () {
      var hashBefore = passwordRegistrationCollection.get('description1').hash
      passwordRegistrationCollection.add('description1', 'different password')
      var hashAfter = passwordRegistrationCollection.get('description1').hash

      assert.isOk(hashBefore != hashAfter)
    })
  })

  describe('update()', function () {
    beforeEach(function () {
      passwordRegistrationCollection.add('rehash', 'hash:salt')
    })

    // 1) update the hash
    it('should update the password hash', function () {
      var originalRegistration = passwordRegistrationCollection.get('rehash')

      var registration = passwordRegistrationCollection.get('rehash')
      registration.hash = 'newhash:newsalt'

      passwordRegistrationCollection.update('rehash', registration)

      registration = passwordRegistrationCollection.get('rehash')

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
      var originalRegistration = passwordRegistrationCollection.get('rehash')

      var registration = passwordRegistrationCollection.get('rehash')
      registration.description = 'newdescription'

      passwordRegistrationCollection.update('rehash', registration)

      registration = passwordRegistrationCollection.get('newdescription')
      let registrationByDescription = passwordRegistrationCollection.getAll()

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

      assert.isFalse(
        'rehash' in registrationByDescription,
        'old registration key should have been removed',
      )
      assert.isOk(
        passwordRegistrationCollection.get('rehash') == null,
        'registration should have disappeared at description slot',
      )
    })
  })

  describe('getMostRecentPasswordRegistration()', function () {
    it('should return copies of password registration', function () {
      var passwordRegistration = passwordRegistrationCollection.get('description1')

      passwordRegistration.scoreData.lastSuccessScore = 1
      passwordRegistration.scoreData.lastSuccessTimestamp = new Date().getTime()

      passwordRegistrationCollection.update('description1', passwordRegistration)

      var originalRegistration = passwordRegistrationCollection.getMostRecentPasswordRegistration()
      var registration = passwordRegistrationCollection.getMostRecentPasswordRegistration()

      assert.isOk(originalRegistration !== registration)
    })

    it('should return password registration for description2 as most recent after a successful attempt was made on the other password registration', function () {
      var passwordRegistration = passwordRegistrationCollection.get('description1')

      passwordRegistration.scoreData.lastSuccessScore = 1
      passwordRegistration.scoreData.lastSuccessTimestamp = new Date().getTime()

      passwordRegistrationCollection.update('description1', passwordRegistration)

      var mostRecent = passwordRegistrationCollection.getMostRecentPasswordRegistration()

      assert.equal(mostRecent.description, 'description2')
    })
  })
})
