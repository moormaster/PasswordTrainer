// vi: ts=2 et

import { assert } from 'chai'
import { JSONFormatter } from '../../../../src/js/util/json/JSONFormatter.mjs'

describe('JSONFormatter', function () {
  beforeEach(function () {
    this.jsonFormatter = new JSONFormatter()
  })

  describe('JSONFormatter.formatJSONString()', function () {
    it('should format empty string', function () {
      assert.equal(this.jsonFormatter.format(''), '')
    })

    it('should format identifier', function () {
      assert.equal(this.jsonFormatter.format('abc'), 'abc')
    })

    it('should format string expression as single line', function () {
      assert.equal(this.jsonFormatter.format('"abc\\",{}"'), '"abc\\",{}"')
    })

    it('should format list entries on multiple lines', function () {
      assert.equal(this.jsonFormatter.format('abc,def'), 'abc,\ndef')
    })

    it('should indent object members', function () {
      assert.equal(this.jsonFormatter.format('{abc}'), '{\n\tabc\n}')
    })

    it('should indent nested objects', function () {
      assert.equal(this.jsonFormatter.format('{{abc}}'), '{\n\t{\n\t\tabc\n\t}\n}')
    })

    it('should put each object member on a new line', function () {
      assert.equal(this.jsonFormatter.format('{abc,def}'), '{\n\tabc,\n\tdef\n}')
    })
  })
})
