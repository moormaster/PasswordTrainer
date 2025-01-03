// vi: ts=2 et

import { assert } from 'chai'
import { beforeEach, describe, it } from 'vitest'
import { SaltGenerator } from '../../../../src/js/util/hash/SaltGenerator.mjs'

let saltGenerator

describe('SaltGenerator', function () {
  ;[
    { length: 0, charSet: null, description: 'default-charset-0-len' },
    { length: 10, charSet: null, description: 'default-charset-10-len' },
    { length: 6, charSet: '0123456789ABCDEF', description: 'hex-charset-6-len' },
  ].forEach(({ length, charSet, description }) => {
    describe('SaltGenerator.generate() - ' + description, function () {
      beforeEach(function () {
        saltGenerator = new SaltGenerator(length, charSet)
      })

      it('should generate a random string of the correct length', function () {
        var salt = saltGenerator.generate()
        assert.equal(salt.length, length)
      })

      if (charSet) {
        it('should contain only characters from the defined charSet', function () {
          var salt = saltGenerator.generate()

          for (var c in salt)
            assert.isOk(
              charSet.indexOf(c) >= 0,
              "salt character '" + c + "' should be part of the char set",
            )
        })
      }
    })
  })
})
