// vi: ts=2 et

import { assert } from 'chai'
import { beforeEach, describe, it } from 'vitest'
import { MD5PasswordHasher } from '../../../../src/js/util/hash/MD5PasswordHasher.mjs'
import { SaltGenerator } from '../../../../src/js/util/hash/SaltGenerator.mjs'

const passwordEmpty = ''
const password1 = '12345'
const password2 = 'abcde'

let passwordHasher

describe('MD5PasswordHasher', function () {
  beforeEach(function () {
    let saltGenerator = new SaltGenerator(10)
    passwordHasher = new MD5PasswordHasher(saltGenerator)
  })
  ;[
    { description: 'unsalted', salt: '' },
    { description: 'salted', salt: 'anySalt' },
  ].forEach(({ description, salt }) => {
    describe('MD5PasswordHasher.generateSaltedHash() ' + description, function () {
      it('should generate hash for empty password', function () {
        var passwordEmptyHash = passwordHasher.generateSaltedHash(passwordEmpty, salt)
        assert.isOk(passwordEmptyHash.length > 0)
      })

      it('should not generate randomized hash for empty password', function () {
        var passwordEmptyHash = passwordHasher.generateSaltedHash(passwordEmpty, salt)
        assert.equal(passwordHasher.generateSaltedHash(passwordEmpty, salt), passwordEmptyHash)
      })

      it('should generate hash for non-empty password', function () {
        var password1Hash = passwordHasher.generateSaltedHash(password1, salt)
        assert.isOk(password1Hash.length > 0, 'hash value shall not be null')
      })

      it('should not generate randomized hash for non-empty password', function () {
        var password1Hash = passwordHasher.generateSaltedHash(password1, salt)
        assert.equal(passwordHasher.generateSaltedHash(password1, salt), password1Hash)
      })

      it('should generate different hashes for different passwords', function () {
        var password1Hash = passwordHasher.generateSaltedHash(password1, salt)
        var password2Hash = passwordHasher.generateSaltedHash(password2, salt)
        assert.isOk(password1Hash != password2Hash)
      })
    })
  })

  describe('MD5PasswordHasher.generateSaltedHash() salted', function () {
    it('should generate a salt', function () {
      var password1Hash = passwordHasher.generateSaltedHash(password1)
      var password1ParsedHash = passwordHasher.parseSaltedHash(password1Hash)
      assert.isOk(password1ParsedHash.salt.length > 0)
    })

    it('should generate a different salt each time', function () {
      var password1Hash = passwordHasher.generateSaltedHash(password1)
      assert.isOk(passwordHasher.generateSaltedHash(password1) != password1Hash)
    })
  })
})
